const taskBlocks = [
    [
        '197. The chessboard logo\\Front-end\\Front-end\\ Back to the Chessboard logo problem.',
        '201. To make up the layout\\Average Frontend\\ Go to the task of Making up the layout.'
    ],
    [
        "206. The misadventures of Adolf\\Average Frontend\\Go to the task of the Misadventures of Adolf.",
        "208. npm install\\Difficult Frontend\\ Go to the task of npm install.",
        "217. Asynchronous data acquisition\\Average Frontend\\Move to the task Asynchronous data acquisition.",
        "218. Yandex Soup\\Complex Frontend\\Move to the task Yandex Soup.",
        "228. Search for numbers in an array with a certain amount\\Plegkafrontend\\ Go to the task of Searching for numbers in an array with a certain amount.",
        "236. Find errors in the code\\Plegkafrontend\\ Go to the task of Finding errors in the code.",
        "241. Countdown\\Plegkayafrontend\\ Go to the Countdown task.",
        "244. New Yandex Taxi logo\\Plegkayafrontend\\The new Yandex Taxi logo is ready for the task.",
        "250. Interspace\\Pleg Frontend\\Go to the task Interspace.",
        "256. Test files\\Average Frontend\\Go to the task Test files."
    ],
    [
        "261. Concert of the orchestra\\Plegkayafrontend\\The task of the Concert of the orchestra.",
        "265. Yandex Snake\\Complex Frontend\\ Go to the Yandex Snake task.",
        "269. Yandex Cart on CSS\\Average Frontend\\ Go to the Yandex Cart on CSS task.",
        "275. Sorting through the shelves \\Complex Frontend\\ Getting to the task, Sorting through the shelves.",
        "278. Need help with CSS. Urgently!\\Plegkayafrontend\\The task needs help with CSS. Urgent!.",
        "285. Dungeon\\Average Frontend\\Move to the Dungeon task.",
        "292. Captcha\\Complex Frontend\\Move to the Captcha task.",
        "296. Are we related?\\Average Frontend\\Move to the task Are we relatives?.",
        "299. Fast five\\Average Frontend\\ Move to the task Fast Five.",
        "311. Expansion of the transport system\\Average Frontend\\ Move on to the task of Expanding the transport system."
    ],
    [
        "315. The problem of the digital nomad Joe\\Average Frontend\\Go to the problem of the digital nomad Joe.",
        "320. Substitution cipher\\Plegkayafrontend\\Go to the problem Substitution cipher.",
        "321. Demonstration of adaptive font\\Average Frontend\\Go to the problem Demonstration of adaptive font.",
        "326. Missed plane\\Plegkayafrontend\\ Go to the Missed plane task.",
        "329. Dungeon. Morse Code\\Plegkayafrontend\\ Go to the Dungeon task. Morse code.",
        "334. Alien calendar\\Plegkayafrontend\\ Go to the Alien Calendar task.",
        "335. Twirly numbers\\Averagefrontend\\Go to the task Twirly numbers.",
        "338. Sum, except for some\\Plegkafrontend\\Go to the task Sum, except for some.",
        "362. List of goods\\Plegkafrontend\\Go to the task List of goods.",
        "363. Zoom layout\\Averagefrontend\\Go to the task Zoom layout."
    ],
    [
        "364. Figma to HTML\\Complex Frontend\\ Move on to the Figma to HTML task.",
        "365. Apply Styles\\Complex Frontend\\Move to the task Apply styles.",
        "366. Drag and Drop\\Complex Frontend\\Move to the task Drag and Drop."
    ]
];

// Объединяем все блоки задач в один массив
const allTasks = [].concat(...taskBlocks);

// Функция для преобразования названия задачи в имя файла
function toFileName(task) {
    // Извлекаем ID и название задачи
    const [id, name] = task.split('. ');
    // Преобразуем название задачи в нижний регистр и заменяем пробелы и спецсимволы на дефисы
    const fileName = name.split('\\')[0].replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    return `_` + id.trim() + '-' + fileName + '.js';
}

// Создаем команды для создания файлов
const commands = allTasks.map(task => {
    const fileName = toFileName(task);
    return `touch ${fileName}`;
});

// Выводим команды
commands.forEach(command => console.log(command));

