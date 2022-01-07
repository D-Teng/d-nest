interface a<T, U = never> {
  name: T;
  id: U;
}

class B {}

class A<T, U = never> implements a<T, U> {
  name: T;
  id: U;
  constructor(name: T, id: U) {
    this.name = name;
    this.id = id;
  }
}

let a = new A('3', 4);
console.log(a.id);
