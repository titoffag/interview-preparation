const express = require('express');
const { BEEP_CODES } = require('@yandex-blitz/phone');

const createApp = ({ phone }) => {
    const app = express();
    let lock = Promise.resolve(); // Блокировка для предотвращения гонок

    // звонит по номеру записанному в "быстром наборе" под цифрой digit
    app.get("/speeddial/:digit", (req, res) => {
        lock = lock.then(async () => {
            try {
                await phone.connect();
            
                const value = await phone.getData();
                const speeddialDict = JSON.parse(value);

                if (!speeddialDict[req.params.digit]) {
                    await phone.beep(BEEP_CODES.ERROR);
                    return res.sendStatus(404);
                }
                await phone.dial(speeddialDict[req.params.digit]);
                res.sendStatus(200);
            } catch (error) {
                if (error.message === 'unable to connect') {
                    await phone.beep(BEEP_CODES.FATAL);
                } else {
                    await phone.beep(BEEP_CODES.ERROR);
                }
                res.sendStatus(500);
            }
        }).catch(async () => {
            await phone.beep(BEEP_CODES.ERROR);
            res.sendStatus(500);
        });
    });

    // записывает в "быстрый набор" под цифру digit номер phonenumber
    app.post("/speeddial/:digit/:phonenumber", (req, res) => {
        lock = lock.then(async () => {
            try {
                const value = await phone.getData();
                const speeddialDict = JSON.parse(value) || {};
                speeddialDict[req.params.digit] = Number(req.params.phonenumber);

                await phone.setData(JSON.stringify(speeddialDict));
                await phone.beep(BEEP_CODES.SUCCESS);
                res.sendStatus(200);
            } catch (error) {
                await phone.beep(BEEP_CODES.ERROR);
                res.sendStatus(500);
            }
        }).catch(async () => {
            await phone.beep(BEEP_CODES.ERROR);
            res.sendStatus(500);
        });
    });

    return app;
};

exports.createApp = createApp;