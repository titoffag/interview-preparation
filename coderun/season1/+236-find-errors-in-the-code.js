// bug
module.exports = function (participants, sports) {
  /**
   * Подобно оператору new создает экземпляр объекта,
   * используя функцию-конструктор и параметры для нее
   */
  function constructFrom(fnConstructor, params) {
    const res = {};

    fnConstructor.bind(res).call(params);

    Object.setPrototypeOf(res, fnConstructor);

    return res;
  }

  /**
   * Создает пары вида ["вид спорта", "имя участника"],
   * где первому виду спорта соответствует последний участник
   */
  function assignParicipants() {
    const participants = this.participants;
    const sports = this.sports;
    const orderIndexes = [];
    let i = sports.length;

    while (i--) {
      orderIndexes.push(function () {
        return i;
      });
    }

    return orderIndexes.map((getSportIndex, i) => [
      sports[i],
      participants[getSportIndex()],
    ]);
  }

  function Contest(participants, sports) {
    this.participants = participants;
    this.sports = sports;
  }

  Contest.prototype.assignParicipants = assignParicipants;

  const contest = constructFrom(Contest, participants, sports);

  return contest.assignParicipants();
};


// solution
module.exports = function (input) {
  /**
   * Подобно оператору new создает экземпляр объекта,
   * используя функцию-конструктор и параметры для нее
   */
  function constructFrom(fnConstructor, params) {
    const res = Object.create(fnConstructor.prototype);
    fnConstructor.apply(res, params);
    return res;
  }

  /**
   * Создает пары вида ["вид спорта", "имя участника"],
   * где первому виду спорта соответствует последний участник
   */
  function assignParticipants() {
    const participants = this.participants;
    const sports = this.sports;
    const orderIndexes = [];
    let i = sports.length;

    while (i--) {
      orderIndexes.push(i);
    }

    return orderIndexes.map((getSportIndex, i) => [
      sports[i],
      participants[getSportIndex],
    ]);
  }

  function Contest(participants, sports) {
    this.participants = participants;
    this.sports = sports;
  }

  Contest.prototype.assignParticipants = assignParticipants;

  const contest = constructFrom(Contest, [input.participants, input.sports]);

  return contest.assignParticipants();
};
