/*
  15 - 最后一个元素
  -------
  by Anthony Fu (@antfu) #中等 #array

  ### 题目

  > 在此挑战中建议使用TypeScript 4.0

  实现一个`Last<T>`泛型，它接受一个数组`T`并返回其最后一个元素的类型。

  例如

  ```ts
  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]

  type tail1 = Last<arr1> // 应推导出 'c'
  type tail2 = Last<arr2> // 应推导出 1
  ```

  > 在 Github 上查看：https://tsch.js.org/15/zh-CN
*/

/* _____________ 你的代码 _____________ */

type Last<T extends any[]> = T extends [...infer _, infer L] ? L : never;
// type Last<T extends any[]> = [any, ...T][T["length"]];

/* _____________ 测试用例 _____________ */
type test = [1, "two", true, null];
type res = Last<test>;
