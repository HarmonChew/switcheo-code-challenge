//basic for loop
var sum_to_n_a = function (n) {
  let sum = 0;
  let number = Math.abs(n);

  for (let i = 0; i <= number; i++) {
    sum += i;
  }

  if (n >= 0) {
    //for positive integers
    return sum;
  } else {
    //for negative integers
    return -sum;
  }
};

// Using sum of integers
var sum_to_n_b = function (n) {
  //for positive integers
  if (n >= 0) {
    return (n * (n + 1)) / 2;
  } else {
    //for negative integers
    return -((n * (n - 1)) / 2);
  }
};

//using recursion
let sumC = 0;

var sum_to_n_c = function (n) {
  let number = Math.abs(n);

  sumC += number;

  const nextNumber = number - 1;

  if (nextNumber > 0) {
    sum_to_n_c(nextNumber);
  }

  if (n >= 0) {
    return sumC;
  } else {
    return -sumC;
  }
};
