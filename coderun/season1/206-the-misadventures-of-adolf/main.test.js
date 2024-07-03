const assert = require('assert');
const { tests } = require('mocha-runkit');
const request = require('supertest');
const sinon = require('sinon');
const { createPhone } = require('@yandex-blitz/phone');

await tests({
    'после записи в "быстрый набор" можно позвонить по записанному номеру': async () => {
        const phone = createPhone({ data: '{}' });

        sinon.spy(phone, 'dial');

        const app = createApp({ phone });

        await request(app).post('/speeddial/1/635889');
        await request(app).get('/speeddial/1');

        const number = phone.dial.args[0][0];

        assert.equal(number, 635889, 'номер должен совпадать с желаемым');
    },

    'телефон должен бибикнуть ошибкой при быстром наборе номера, которого нет в словаре': async () => {
        const phone = createPhone({ data: '{}' });
        sinon.spy(phone, 'beep');

        const app = createApp({ phone });

        await request(app).get('/speeddial/1');

        const code = phone.beep.args[0][0];

        assert.equal(code, BEEP_CODES.ERROR);
    },

    'при невозможности подключиться к линии телефон должен бибикнуть фатальной ошибкой': async () => {
        const phone = createPhone({ data: '{}' });
        sinon.spy(phone, 'beep');
        sinon.stub(phone, 'connect').rejects(new Error('unable to connect'));

        const app = createApp({ phone });

        await request(app).get('/speeddial/1');

        const code = phone.beep.args[0][0];

        assert.equal(code, BEEP_CODES.FATAL);
    },

    'при записи двух подряд номеров в быстрый набор должны сохраниться оба номера': async () => {
        const phone = createPhone({ data: '{}' });
        sinon.spy(phone, 'dial');

        const app = createApp({ phone });

        await Promise.all([
            request(app).post('/speeddial/1/635889'),
            request(app).post('/speeddial/2/241983')
        ]);

        await request(app).get('/speeddial/1');

        assert.equal(phone.dial.args[0][0], 635889);

        await request(app).get('/speeddial/2');

       assert.equal(phone.dial.args[1][0], 241983);
        
    }
});
