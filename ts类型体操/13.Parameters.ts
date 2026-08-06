//  实现内置的 Parameters<T> 类型，而不是直接使用它，可参考[TypeScript官方文档](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype)。

type MyParameters<T extends (...args: any[]) => any> = T extends ( ...args:infer U) => any ? U:never

function foo(arg1: string, arg2: number): void {}
type test = MyParameters<typeof foo>
