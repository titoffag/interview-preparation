const updatesQueue = [];
let lastAppliedUpdateId = 0;
const messages = {}; // {[chatId: number]: Message[]}
const storageKey = 'chatMessages';

if (localStorage.getItem(storageKey)) {
    Object.assign(messages, JSON.parse(localStorage.getItem(storageKey)));
}

function saveState() {
    localStorage.setItem(storageKey, JSON.stringify(messages));
}

function renderMessages(messages) {
    console.log(JSON.stringify(messages, null, 2));
}

function processUpdates() {
    while (updatesQueue.length && updatesQueue[0].id === lastAppliedUpdateId + 1) {
        const update = updatesQueue.shift();
        const { id, type, message } = update;

        if (!messages[message.chatId]) {
            messages[message.chatId] = [];
        }

        switch (type) {
            case 'new':
                if (!messages[message.chatId].some(m => m.id === message.id)) {
                    messages[message.chatId].push(message);
                }
                break;
            case 'updated':
                const msgIndex = messages[message.chatId].findIndex(m => m.id === message.id);
                if (msgIndex !== -1) {
                    messages[message.chatId][msgIndex] = message;
                }
                break;
            case 'deleted':
                messages[message.chatId] = messages[message.chatId].filter(m => m.id !== message.id);
                break;
        }

        lastAppliedUpdateId = id;
    }

    saveState();
    renderMessages(messages);
}

function callback(update) {
    const updateId = update.id;
    if (updateId === lastAppliedUpdateId + 1) {
        updatesQueue.unshift(update);
        processUpdates();
    } else {
        const index = updatesQueue.findIndex(u => u.id > updateId);
        if (index === -1) {
            updatesQueue.push(update);
        } else {
            updatesQueue.splice(index, 0, update);
        }
    }
}

const chat = new Chat(callback);

processUpdates();
