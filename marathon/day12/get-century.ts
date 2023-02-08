function getCentury(year: number) {
  return Math.floor((year - 1) / 100) + 1;
}

console.log(getCentury(1901)); // 20
