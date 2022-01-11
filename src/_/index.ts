type Constructor<T, K extends unknown[]> = new (...args: K) => T;

class A {
  p1: string;
  constructor(s: string) {}
}

let a: Constructor<A, unknown[]> = class {
  p1: string;
  constructor(n: string) {}
};
