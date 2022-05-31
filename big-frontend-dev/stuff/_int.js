// for (var i=1; i<=10; i++) {
//   function consoleLog(j) {console.log(j);}
//   setTimeout(() => consoleLog(), i*1000);
// }
// console.log('start');

// this.state.a.b

// shouldComponentUpdate(nextProps, nextState) {
//   return !_.isEqual(this.state.a?.b, nextState.a?.b);
// }

async function fetchByArray(urls) {
  const requests = urls.map(url => fetch(url));
  return Promise.all(requests);
}

let result;
fetchByArray(['1', '2']).then(res => { result = res; console.log(res) });
// console.log(result);