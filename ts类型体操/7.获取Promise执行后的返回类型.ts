// 递归处理嵌套的promise
// 中间加一层是为了防止MyAwaited对入参类型报错
type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer R>
  ? R extends PromiseLike<any>
    ? MyAwaited<R>
    : R
  : never;

// 没对入参检查
// type MyAwaited<T> = T extends PromiseLike<infer R> ? MyAwaited<R> : T;

type ExampleType = PromiseLike<string>;
type Result = MyAwaited<ExampleType>; // string
type Result4 = MyAwaited<Promise<Promise<Promise<boolean>>>>; // boolean
