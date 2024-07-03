function User(name, lname, age) {
    this.name = name
    this.lname = lname
    this.age = age
}

User.prototype.has18 = function () {
    return this.age >= 18
}

User.prototype.sayName = function () {
    return `${this.name} ${this.lname}`
}

class User {
    constructor(name, lname, age) {
        this.name = name
        this.lname = lname
        this.age = age
    }

    has18() {
        return this.age >= 18
    }

    sayName() {
        return `${this.name} ${this.lname}`
    }
}