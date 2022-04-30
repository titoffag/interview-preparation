// 0
function findAppearedNumberAt(p, q, r) {
    let res = -1;
    let i = 0, j = 0, k = 0;
    while (i < p.length && j < q.length && k < r.length) {
        if (p[i] == q[j] && q[j] == r[k]) {
            return p[i];
        }
        if (p[i] < r[k]) {
            i++;
        } else {
            k++;
        }
        if (p[i] < q[j]) {
            i++;    
        } else {
            j++;        
        }
    }

    return -1;
}

function fn(arr, target) {
  const seen = new Map();
  for (let item of arr) {
      const diff = target - item;
      if (seen.has(diff)) {
          return [diff, item];
      }
      seen.set(item, true); 
  }
  return null;
}

// 1
function reverseString(str) {
  return str.split('').reverse().join('');
}

function reverseStringAlt(str) {
  return str.split('').reduceRight((acc, cur) => acc += cur, '');
}

function reverseStringAlt2(str) {
  let res = '';
  for (let i = str.length - 1; i > -1; i--) {
    res += str[i];
  }
  return res;
}

// 2
function unionTwoArrays(arr1, arr2) {
  const res = [];

  const sortedArr1 = arr1.sort();
  const sortedArr2 = arr2.sort();

  let i = 0, j = 0;
  while (i < sortedArr1.length && j < sortedArr2.length) {
    if (sortedArr1[i] == sortedArr2[j]) {
      res.push(sortedArr1[i]);
      i++;
    }
    if (sortedArr1[i] < sortedArr2[j]) {
      i++;
    } else {
      j++;
    }
  }

  return res;
}

// 3 - перестановки граф с листьями
// 4 - слайдинг
// 5 - слайдинг или сортировка и потом проход пока next val + 1 > prev val
// 6 - проход с подсчетом мейби с конца
// 7 - сортировка и слияние отрезков с перекидываем конца одного с поглощением другого
// 8 - сортировка и наложение ??
// 9 - 2 указателя и внимание на удаление как правило на ошибку
// 11 - похожая на литкод с движением 2 указателей слайдинга
// 13 - палиндром 2 указателя и сравнение пока 2 указателя не встретятся
// 19 - граф интересная задача

// 14
function checkArrayMonotonicity(nums) {
  let dir = {
    up: 1,
    down: -1,
  };
  // while nums[i] == nums[i+1] do i++ until nums[i] > nums[i+1] => dir up 
  // or nums[i] < nums[i+1] => dir down plus throw Error for like [0,0,0] arr 
  let curDir;
  if (nums[1] > nums[0]) {
    curDir = dir.up;
  } else {
    curDir = dir.down;
  }

  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] * curDir > nums[i + 1]) {
      return false;
    }
  }

  return true;
}
