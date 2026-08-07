// 不使用 `ReturnType` 实现 TypeScript 的 `ReturnType<T>` 泛型
type MyReturnType<T extends (...args: any[]) => unknown> = T extends (
  ...args: any[]
) => infer U
  ? U
  : never;

const fn = (v: boolean) => {
  if (v) return 1;
  else return 2;
};

type a = MyReturnType<typeof fn>; // 应推导出 "1 | 2"

// 函数入参的逆变性
// 如果要求函数接收 unknown[]（任意类型参数），那你的函数必须能接受任何参数
// 但是type Fn2 = (x: string) => void只接受string 不满足条件
type Fn1 = (x: unknown) => void;
type Fn2 = (x: string) => void;
type Test1 = Fn1 extends Fn2 ? true : false; // ✅ true
type Test2 = Fn2 extends Fn1 ? true : false; // ❌ false

// 函数返回值的协变性
// 约束写 () => unknown
// 含义：要求【你的函数返回的东西，可以安全当成 unknown 使用】
