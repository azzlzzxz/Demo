type Func<T extends any[], R> = (...a: T) => R;

// 7个函数重栽
console.log(compose()("sxx"));
function add1(str: string) {
  return str + "1";
}
console.log(compose(add1)("sxx"));
function add2(str: string) {
  return str + "2";
}
console.log(compose<string, any[], string>(add1, add2)("sxx"));

/* zero functions */
export default function compose(): <R>(a: R) => R; // a是'sxx' R string

/* one functions */
export default function compose<F extends Function>(f: F): F; // f是add1 返回add1 add1('sxx')

/* two functions */
// compose是个函数接受f1，f2（add1，add2）两个参数，传了3个泛型A，T，R
export default function compose<A, T extends any[], R>(
  f1: (a: A) => R, // R是f1的返回值 也就是字符串 A=sxx2 R=sxx21
  f2: Func<T, A> // T是f2的参数 A是f2的返回值 T=sxx A=sxx2
): Func<T, R>; // R是最终返回值 T=sxx R=sxx21

/* three functions */
export default function compose<A, B, T extends any[], R>(
  f1: (b: B) => R,
  f2: (a: A) => B,
  f3: Func<T, A>
): Func<T, R>;

/* four functions */
export default function compose<A, B, C, T extends any[], R>(
  f1: (c: C) => R,
  f2: (b: B) => C,
  f3: (a: A) => B,
  f4: Func<T, A>
): Func<T, R>;

// 为啥就写了4个往后都是rest，redux中间件就4，5个（promise，thunk，logger），写多了性能不好

/* rest */
export default function compose<R>(
  f1: (a: any) => R,
  ...funcs: Function[]
): (...args: any[]) => R;

export default function compose<R>(...funcs: Function[]): (...args: any[]) => R;

export default function compose(...funcs: Function[]) {
  // 函数实现
  if (funcs.length === 0) {
    // 对应 zero functions
    return <T>(arg: T) => arg;
  }

  if (funcs.length === 1) {
    // 对应 one functions
    return funcs[0];
  }

  return funcs.reduce(
    (a, b) =>
      (...args: any) =>
        a(b(...args))
  );
}
