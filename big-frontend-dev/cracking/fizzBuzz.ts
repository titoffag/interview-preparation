function fizzBuzz(n: number): string[] {
    const result: string[] = [],
        fizzBuzzDictionary: Map<number, string> = new Map([
        [3, 'Fizz'],
        [5, 'Buzz'],
    ]);

    for (let i = 1; i <= n; i++) {
        let answer: string = '';

        for (let key of fizzBuzzDictionary.keys()) {
            if (i % key === 0) {
                answer += fizzBuzzDictionary.get(key);
            }
        }
        
        if (answer === '') {
            answer += i;   
        }
        
        result.push(answer);
    }
    
    return result;
};
