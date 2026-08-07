// 不使用 `Omit` 实现 TypeScript 的 `Omit<T, K>` 泛型。
// `Omit` 会创建一个省略 `K` 中字段的 `T` 对象。

// 第1步：keyof T 获取所有属性名
// type T = { a: string, b: number, c: boolean }
// type Keys = keyof T  // 'a' | 'b' | 'c'

// 第2步：U in keyof T 遍历所有属性
// 遍历 'a' | 'b' | 'c'
// 第一次：U = 'a'
// 第二次：U = 'b'
// 第三次：U = 'c'

// 第3步：as U extends K ? never : U 决定保留还是排除
//  假设 K = 'a' | 'b'
// U = 'a'：'a' extends 'a' | 'b' → true → 返回 never（排除）
// U = 'b'：'b' extends 'a' | 'b' → true → 返回 never（排除）
// U = 'c'：'c' extends 'a' | 'b' → false → 返回 'c'（保留）

// 第4步：T[U] 获取属性类型
// U = 'c'：T['c'] = boolean

/* _____________ 你的代码 _____________ */
type MyOmit<T, K> = {
  [U in keyof T as U extends K ? never : U]: T[U];
};

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyOmit<Todo, "description" | "title">;
