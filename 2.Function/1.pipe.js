function add4(x) {
  return x + 4;
}

function multiply2(x) {
  return x * 2;
}

function divide2(x) {
  return x / 2;
}

function pipe(...fns) {
  function callback(input, fun) {
    return fun(input);
  }

  return function (param) {
    return fns.reduce(callback, param);
  };
}

function pipe2(...fns) {
  return function (param) {
    return fns.reduce((acc, cur) => cur(acc), param);
  };
}

function compose(...fns) {
  return function (param) {
    return fns.reduceRight((acc, cur) => cur(acc), param);
  };
}

const pipeResult = pipe(add4, multiply2, divide2)(3);
console.log(pipeResult); // 7
