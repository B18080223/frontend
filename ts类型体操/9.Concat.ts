// 在类型系统里实现 JavaScript 内置的 `Array.concat` 方法，这个类型接受两个参数，返回的新数组类型应该按照输入参数从左到右的顺序合并为一个新的数组。
// any会放弃状态检查，unknown比any更安全
type Concat<T extends readonly unknown[], U extends readonly unknown []> = [...T, ...U];
// /* _____________ 测试用例 _____________ */
const tuple = [1] as const
type Result = Concat<typeof tuple, typeof tuple> // expected to be [1, 2]
type ResultB =Concat<[1, 2], [3, 4]>  // [1,2,3,4]
