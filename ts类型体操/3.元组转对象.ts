/*
  11 - 元组转换为对象
  -------
  by sinoon (@sinoon) #简单 #object-keys

  ### 题目

  将一个元组类型转换为对象类型，这个对象类型的键/值和元组中的元素对应。

  例如：

  ```ts
  const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

  type result = TupleToObject<typeof tuple> // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
  ```

  > 在 Github 上查看：https://tsch.js.org/11/zh-CN
*/

/* _____________ 你的代码 _____________ */

// ：元组元素既做 key 又做 value
// T[number] 获取元组所有元素类型
// P in T[number] 遍历这些元素
// P: P 让 key 和 value 类型
type TupleToObject<T extends readonly any[]> = {
  [P in T[number]]: P
}

// 测试
const result: TupleToObject<[1, 2, 3]> = { 1: 1, 2: 2, 3: 3 }


// 声明一个元组并初始化：

// let mytuple: [number, string];
