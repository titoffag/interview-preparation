type Params = {
  name: string;
  age: number;
  skills: string[];
};

class User {
  static state: Params;
  name: string;
  age: number;
  skills: string[];

  constructor(params: Params) {
    this.name = params.name;
    this.age = params.age;
    this.skills = params.skills;
  }

  static setName(name: string) {
    const { state } = this;
    return class User extends this {
      static state: Params = { ...state, name };
    };
  }

  static setAge(age: number) {
    const { state } = this;
    return class User extends this {
      static state: Params = { ...state, age };
    };
  }

  static setSkills(skills: string[]) {
    const { state } = this;
    return class User extends this {
      static state: Params = { ...state, skills };
    };
  }

  static create() {
    const { state } = this;
    return new User(state);
  }
}

const bob = User.setName("Bob")
  .setAge(47)
  .setSkills(["Coding"]);

const alex = User.setName("Bob")
  .setAge(47)
  .setSkills(["Coding"])
  .setSkills(["Coding", "Loving"])
  .setAge(10)
  .setName("Alex");

console.log(
  bob.create(),
  alex,
); // User({name: 'Bob', age: 47, skills: ['Coding']})
