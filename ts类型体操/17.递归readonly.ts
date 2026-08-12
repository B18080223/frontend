/*   ### 题目

  实现一个泛型 `DeepReadonly<T>`，它将对象的每个参数及其子对象递归地设为只读。

  您可以假设在此挑战中我们仅处理对象。不考虑数组、函数、类等。但是，您仍然可以通过覆盖尽可能多的不同案例来挑战自己。

  例如 */

/* _____________ 你的代码 _____________ */

// type DeepReadonly<T> = {
//   readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
// };

// type DeepReadonly<T> = T extends object
//   ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
//   : T;

//  keyof T 判断这个对象是否有属性，有属性代表是对象
type DeepReadonly<T> = keyof T extends never
  ? T
  : { readonly [K in keyof T]: DeepReadonly<T[K]> };

type X = {
  x: {
    a: 1;
    b: "hi";
  };
  y: "hey";
};

type Expected = {
  readonly x: {
    readonly a: 1;
    readonly b: "hi";
  };
  readonly y: "hey";
};

type Todo = DeepReadonly<X>; // should be same as `Expected`
const todo: Todo = {
  x: { a: 1, b: "hi" },
  y: "hey",
};
todo.x.a = 2; // ❌ Error: 只读
todo.y = "no"; // ❌ Error: 只读
