/*
  16 - 排除最后一项
  -------
  by Anthony Fu (@antfu) #中等 #array

  ### 题目

  > 在此挑战中建议使用TypeScript 4.0

  实现一个泛型`Pop<T>`，它接受一个数组`T`，并返回一个由数组`T`的前 N-1 项（N 为数组`T`的长度）以相同的顺序组成的数组。

  例如

  ```ts
  type arr1 = ['a', 'b', 'c', 'd']
  type arr2 = [3, 2, 1]

  type re1 = Pop<arr1> // expected to be ['a', 'b', 'c']
  type re2 = Pop<arr2> // expected to be [3, 2]
  ```

  **额外**：同样，您也可以实现`Shift`，`Push`和`Unshift`吗？

  > 在 Github 上查看：https://tsch.js.org/16/zh-CN
*/

/* _____________ 你的代码 _____________ */

type Pop<T extends any[]> = T extends [...infer L, infer _] ? L : never;

/* _____________ 测试用例 _____________ */
type arr1 = ["a", "b", "c", "d"];
type arr2 = [3, 2, 1];

type re1 = Pop<arr1>; // expected to be ['a', 'b', 'c']
type re2 = Pop<arr2>; // expected to be [3, 2]
