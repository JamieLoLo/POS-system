let count = 3
let sum = 0

let arr = [180, 40, 200, 180]
let filterArr = arr.sort(function (a, b) {
  return a - b
})

function test() {
  for (let i = filterArr.length - 1; i >= 0; i--) {
    if (filterArr[i] >= 200) {
      count--
      i--
      if (count === 0) {
        return true
      }
    }
    for (let j = 0; j < filterArr.length; j++) {
      if (filterArr[i] + filterArr[j] > 200) {
        i--
        j++
        count--
        if (count === 0) {
          return true
        }
        if (i === j && filterArr[i] > 200) {
          count--
          if (count === 0) {
            return true
          }
        }
      }
      if (filterArr[i] + filterArr[j] < 200) {
        sum = filterArr[i] + filterArr[j]
        j++
        sum += filterArr[j]
        if (sum > 200) {
          count--
          if (count === 0) {
            return true
          }
        }
        if (j + 1 === i) {
          return false
        }
      }
    }
  }
}
console.log(test())
