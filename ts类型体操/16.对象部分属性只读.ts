// 实现一个泛型`MyReadonly2<T, K>`，它带有两种类型的参数`T`和`K`。
// 类型 `K` 指定 `T` 中要被设置为只读 (readonly) 的属性。如果未提供`K`，则应使所有属性都变为只读( 默认值、= keyof T)，就像普通的`Readonly<T>`一样。
/* _____________ 你的代码 _____________ */

type MyReadonly2<T, K extends keyof T = keyof T> = Readonly<Pick<T, K>> &
  Omit<T, K>;

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

const todo: MyReadonly2<Todo, "title" | "description"> = {
  title: "Hey",
  description: "foobar",
  completed: false,
};

todo.title = "Hello"; // Error: cannot reassign a readonly property
todo.description = "barFoo"; // Error: cannot reassign a readonly property
todo.completed = true; // OK
