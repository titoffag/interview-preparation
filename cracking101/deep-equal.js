// Реализовать метод deepEqual для объектов без JSON.Stringify 
let obj1 = {
  a: 1,
  b: {
    c: 2
  }
}
let obj2 = {
  a: 1,
  b: {
    c: 2
  }
}

function deepEqual(obj1, obj2){
  function isObject(obj) {
  	return typeof obj === "object" && obj != null;
  }

	if (obj1 === obj2) {
  	return true;
  } else if (isObject(obj1) && isObject(obj2)) {
  	if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    	return false;
    }
    for (let prop in obj1) {
    	if (!deepEqual(obj1[prop], obj2[prop])) {
      	return false;
      }
    }
  	return true;
  }
}

console.log( deepEqual(obj1, obj2) ); //true
