function foo() { console.log(1) }
var foo = 2
function foo() { console.log(3) }
foo()

// Solution: Error

// Reason:

// Line 1: Hoisting will take place, Function declaration will be hoisted and in the global object foo will be equal to a function.

// Line 2: foo variable will be hoisted. Now since foo keyword is already present in the global object as a function it will get replaced by foo variable (foo=2).

// Why did this happen?

// Because variable assignment has more importance than function declaration (when the name of variable and function are the same)

// Order of Precedence: variable Assigment > function declaration > variable declaration

// Line 3: It will have no effect due to the above-mentioned rule.

// Line 4: Since foo is not a function it will throw an error.
