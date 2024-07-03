const pause = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));
/**
 * Коды телефонных сигналов
 * @enum {Number}
 */
const BEEP_CODES = {
    SUCCESS: 1,
    ERROR: 2,
    FATAL: 3
};
const lineIsUnreachable = false;
/**
 * @typedef {Object} PhoneInitParams
 * @property {String} data начальное значение в хранилище
 */
/**
 * @interface Phone
 */
/**
 * Открывает соединение, позволяя вызывать dial для совершения звонков
 * @function
 * @name Phone#connect
 * @returns {Promise<void>}
 */
/**
 * Совершает звонок
 * @function
 * @name Phone#dial
 * @param {Number} number номер для набора
 * @returns {Promise<void>}
 */
/**
 * Бибикает телефоном
 * @function
 * @name Phone#beep
 * @param {BEEP_CODES} code
 * @returns {Promise<void>}
 */
/**
 * Возвращает данные из хранилища
 * @function
 * @name Phone#getData
 * @returns {Promise<String>}
 */
/**
 * Записывает данные в хранилище
 * @function
 * @name Phone#setData
 * @param {String} value
 * @returns {Promise<void>}
 */
/**
 * Функция создания инстанса объекта управления телефоном
 * @param {PhoneInitParams} params параметры инициализации
 * @returns {Phone}
 */
const createPhone = ({ data = '' } = {}) => {
    let _storage = data;
    let _connected = false;
    return {
        async connect () {
            // в редких случаях телефон не может подключиться к линии и ему требуется перезагрузка
            if (lineIsUnreachable) {
                throw new Error('unable to connect');
            }
            await pause(Math.random() * 100); // Подключение занимает какое-то время
            _connected = true;
        },
        async dial (number) {
            if (!_connected) {
                throw new Error('Not connected');
            }
            if (typeof number !== 'number') {
                throw new Error(`Invalid number: ${number}`);
            }
            await pause(50); // Emulating calling
        },
        async beep (code) {
            await pause(50); // Emulating beeping
        },
        async getData () {
            await pause(Math.random() * 100); // Emulating retrieving
            return _storage;
        },
        async setData (value) {
            await pause(Math.random() * 50); // Emulating storing
            _storage = value;
        }
    };
};
module.exports = {
    createPhone,
    BEEP_CODES
};
