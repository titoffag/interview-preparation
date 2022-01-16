console.log(1) // sync JS

// promise run constructor function
// because here resolve is not async, then still in sequence to run
const promise = new Promise((resolve) => {
  console.log(2)
  resolve() // only mark the promise's internal state to be "fulfilled"
  console.log(3) // still run to the end of this callback function
})

console.log(4) // continue to run sequentially

// console log -> 1 2 3 4

// async: job queue for promise
promise.then(() => {
  console.log(5)
}).then(() => {
  console.log(6)
})

// sync: should be run immediately compared to async
console.log(7)

// async: event loop & callback queue for Web API
setTimeout(() => {
  console.log(8)
}, 10)

// async: event loop & callback queue for Web API
setTimeout(() => {
  console.log(9)
}, 0) // even though time is 0, still an async call

// 1st: sync code
// 2nd: async for job queue -> process promise
// 3rd: async for callback queue -> process web api call

// console log
// 7 - sync code
// 5 - job queue
// 6 - job queue
// 9 - callback queue 0s
// 8 - callback queue 10s

/**
 * 1
 * 2
 * 3
 * 4
 * promise handlers are added to the microTask queue and will run async
 * microTasks = [promise.then]
 * 7
 * macroTasks = [setTimeout[10]]
 * macroTasks = [setTimeout[0], setTimeout[10]]
 * current task (run script) is done, it's time to run all micro tasks
 * 5
 * microTasks = [promise.then.then] 
 * note: microTasks can add more microTasks and they will be picked up in the current
 * loop effectively delaying macroTasks (chrome has ways to address task starvation)
 * 6
 * when all micro tasks are done, then it picks the next macro
 * 9
 * there are no microTasks available, so picking up the next macro
 * 8
 */
