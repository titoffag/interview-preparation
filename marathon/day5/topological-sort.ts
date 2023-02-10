type TNode<T> = {
  value: T;
  dependencies: string[];
  marked: boolean;
};

function sort<T>(
  array: Array<T>,
  comparator: (obj: T) => [key: string, dependencies: string[] | undefined]
): Array<T> {
  const map = new Map(
    array.map((value) => {
      const [key, dependencies = []] = comparator(value);

      return [
        key,
        {
          value,
          dependencies,
          marked: false,
        },
      ];
    })
  );

  const queue: T[] = [];
  (function traverse(obj: Map<string, TNode<T>>) {
    obj.forEach((el) => {
      console.log(el);

      if (el.marked) {
        return;
      }

      if (el.dependencies.length > 0) {
        traverse(
          new Map(
            el.dependencies
              .map((key) => [
                key, 
                map.get(key)!
              ])
          )
        );
      }

      el.marked = true;
      queue.push(el.value);
    });
  })(map);

  array.forEach((_, i) => {
    array[i] = queue[i];
  });

  return array;
}

const skills = [
  {
    name: "fireball",
    need: ["firehands", "magicspell"],
  },

  {
    name: "firehands",
  },

  {
    name: "magicspell",
  },

  {
    name: "inferno",
    need: ["fireball", "crazymind"],
  },

  {
    name: "crazymind",
    need: ["magicspell"],
  },
];

/*
[
  {
    name: 'firehands'
  },

  {
    name: 'magicspell'
  },

  {
    name: 'crazymind',
    need: ['magicspell']
  }

  {
    name: 'fireball',
    need: ['firehands', 'magicspell']
  },

  {
    name: 'inferno',
    need: ['fireball', 'crazymind']
  }
]
*/
console.log(sort(skills, ({ name, need }) => [name, need]));

type Ticket = {from: string, to: string};

// начало - Miami, конец - Monaco
const ticketsList: Ticket[] = [
  // 1
  { from: "Miami", to: "Seattle" },
  // 2
  { from: "Moscow", to: "Istanbul" },
  // 3
  { from: "Seattle", to: "London" },
  // 4
  { from: "NY", to: "Moscow" },
  // 5
  { from: "Istanbul", to: "Monaco" },
  // 6
  { from: "London", to: "NY" },
];

function findPath(list: Ticket[]) {
  const result: Ticket[] = [],
    tickets = new Map<string, {to: string, value: Ticket}>(),
    transferCities = new Set<string>();

  for (const value of list) {
    const {from, to} = value;
    tickets.set(from, { to, value });
    transferCities.add(to);
  }

  let {from: city} = list.find(({ from }) => !transferCities.has(from)) ?? {};

  while (city) {
    const {to: nextCity, value} = tickets.get(city) ?? {};
    if (nextCity && value) {
      result.push(value);
    }
    city = nextCity;
  }

  return result;
}

console.log(findPath(ticketsList));
