const a = 'hello world';

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

console.log(a.capitalize());