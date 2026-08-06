//  在类型系统里实现通用的 ```Array.push```
/* _____________ 你的代码 _____________ */
// 为什么用unknown不用any，因为unknown和any一样都代表所有值，但是更安全，因为不允许对unknown类型进行"二次操作"
// 看官网解释https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown
type Push<T extends readonly unknown[], U> = [...T, U];
// type test = Push<[], 1>
type test = Push<[1], 1>;
