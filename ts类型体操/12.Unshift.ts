/* _____________ 你的代码 _____________ */
// 实现类型版本的 ```Array.unshift```
// readonly 是修饰符，必须放在被修饰的类型前面
// readonly unknown[]  // ✅ 正确：只读数组
// unknown readonly[]  // ❌ 错误：语法不合法
type Unshift<T extends readonly unknown[], U> = [U, ...T];
type test = Unshift<["1", 2, "3"], boolean>
