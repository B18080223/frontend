/*
  10 - 元组转合集
  -------
  by Anthony Fu (@antfu) #中等 #infer #tuple #union

  ### 题目

  实现泛型`TupleToUnion<T>`，它返回元组所有值的合集。

  例如

  ```ts
  type Arr = ['1', '2', '3']

  type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
  ```

  > 在 Github 上查看：https://tsch.js.org/10/zh-CN
*/

/*
 元组转合集
  ### 题目
  实现泛型`TupleToUnion<T>`，它返回元组所有值的合集。
  例如
  ```ts
  type Arr = ['1', '2', '3']
  type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
  ```
*/
/* _____________ 你的代码 _____________ */

type TupleToUnion<T extends readonly any[]> = T[number]

// [2,3,1,1,4]
/**
 * @param {number[]} nums
 * @return {number}
 */
type Arr = ['1', '2', '3']
type Test = TupleToUnion<Arr>
