/*
  14 - 第一个元素
  -------
  by Anthony Fu (@antfu) #简单 #array

  ### 题目

  实现一个`First<T>`泛型，它接受一个元组`T`并返回它的第一个元素的类型。

  例如：

  ```ts
  type arr1 = ['a', 'b', 'c']  这是个元组
  type arr2 = [3, 2, 1]

  type head1 = First<arr1> // 应推导出 'a'
  type head2 = First<arr2> // 应推导出 3
  ```

  > 在 Github 上查看：https://tsch.js.org/14/zh-CN
*/

/* _____________ 你的代码 _____________ */

// 空元组 T[0] 是 undefined，不是 never
// First的入参是类型 而不是一个值
// type First<T extends any[]> = T extends [] ? never : T[0]
// type Result1 = First<[1, 2, 3]>

type First<T extends any[]> = T extends [infer First, ...any[]] ? First : never
type Result1 = First<[string, number, 3]>
