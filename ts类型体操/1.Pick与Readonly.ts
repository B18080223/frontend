// 1、实现 Pick<T, K> 的泛型

// T是目标泛型，K是需要的属性
// K extends keyof T 保证K是T的属性,此时K是一个联合类型
// [key in K] 生成新的属性，key是K的属性，T[key]是T的属性值
// 参考https://github.com/type-challenges/type-challenges/issues/13427
type MyPick<T, K extends keyof T> = {
  [key in  K] : T[key]
}

// ============ 测试用例 ============

interface Todo {
  title: string
  description: string
  completed: boolean
}

// 基本用法：选取单个属性
type TodoTitle = MyPick<Todo, 'title'>
const titleCase: TodoTitle = { title: '学习 TypeScript' }

// 选取多个属性
type TodoPreview = MyPick<Todo, 'title' | 'completed'>
const previewCase: TodoPreview = { title: '学习 TypeScript', completed: false }

// 选取所有属性（等价于原类型）
type TodoAll = MyPick<Todo, keyof Todo>
const allCase: TodoAll = { title: '学习 TypeScript', description: '学习泛型', completed: true }

// 编译错误验证（取消注释以下行应报错）：
// const err1: TodoTitle = { title: 'test', description: 'extra' }  // 多余属性报错
// const err2: TodoTitle = {}  // 缺少属性报错
// type Err3 = MyPick<Todo, 'nonexistent'>  // 不存在的属性报错


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
