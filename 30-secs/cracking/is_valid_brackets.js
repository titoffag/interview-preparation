// Реализовать функцию, которая проверяет на валидность скобки. 
// ()() - валидно
// ()(() - невалидно
const mapping = {
    ")": "(",
};
function isValidBrackets(string) {
	const stack = [];
    for (let char of string) {
        if (Object.keys(mapping).includes(char)) {
            const topElement = stack.pop();
            
            if (mapping[char] !== topElement) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}
console.log(isValidBrackets('()()'));
console.log(isValidBrackets('()(()'));
