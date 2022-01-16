new Promise((resolve, reject) => {
  resolve(1)
  resolve(2)
  reject('error')
}).then((value) => {
  console.log(value)
}, (error) => {
  console.log('error')
})

// console log -> 1 once 
// because promise's internal state is not changed after resolved or rejected status
