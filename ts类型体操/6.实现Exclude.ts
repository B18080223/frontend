// 条件分发
// 当 泛型 T 是联合类型时，条件类型会自动分发到每个成员：
// MyExclude<'a' | 'b' | 'c', 'a'>
// 展开为：
// 'a' extends 'a' ? never : 'a'  → never
// 'c' extends 'a' ? never : 'c'  → 'c'
// 结果：'b' | 'c'
type MyExclude<T, U> = T extends U ? never : T;
type Result = MyExclude<"a" | "b" | "c", "a">; // 'b' | 'c'

// type MyExclude<T, U> = T extends U ? never : T
// type A = 's' | 'n' | 'q'
// type B = 's' | 'n'
// type C = A extends B ? never : A // 's' | 'n' | 'q'
// type D = MyExclude<A, B> // 'q'
