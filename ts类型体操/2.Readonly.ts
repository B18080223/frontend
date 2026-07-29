// 2、对象属性只读

type MyReadonly<T> = {
  readonly [key in keyof T] : T[key]
}
// 测试代码
interface User {
  name: string
  age: number
}

type ReadonlyUser = MyReadonly<User>

const user: ReadonlyUser = {
  name: '张三',
  age: 25
}

// ✅ 可以读取
console.log(user.name)  // 张三

// ❌ 不能修改（取消注释会报错）
user.name = '李四'  // Error
user.age = 30       // Error
