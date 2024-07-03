const aa = {
    a: 1,
    b: 'hello'
}
const bb = {
    a: true,
    c: new Date()
}

type Overwrite<A, B> = Omit<A, keyof B> & B

const z: Overwrite<typeof aa, typeof bb> = {
    a: true,
    b: 'hello',
    c: new Date()
}