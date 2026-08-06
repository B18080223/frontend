// 在类型系统里实现 JavaScript 的 `Array.includes` 方法，这个类型接受两个参数，返回的类型要么是 `true` 要么是 `false`。


// 递归遍历
// 第1步：T[number] 获取所有元素的联合类型
// type T = readonly [1, 2, 3]
// type Elements = T[number]  // 1 | 2 | 3

// 第2步：[P in T[number]]: true 构建一个映射对象
// type Obj = {
//   [P in 1 | 2 | 3]: true
// }
// 等价于：
// type Obj = {
//   1: true
//   2: true
//   3: true
// }

// 第3步：Obj[U] 取值
// type R1 = Obj[2]      // true（2 存在于元组中）
// type R2 = Obj[4]      // never（4 不存在）

// 第4步：判断是否 extends true
// true extends true ? true : false   // true
// never extends true ? true : false  // false


type Includes<T extends readonly any[], U> = {
  [K in T[number]]: true;
}[U] extends true
  ? true
  : false;

type test = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Kars">;
