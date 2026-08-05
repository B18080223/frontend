/*
  18 - 获取元组长度
  -------
  by sinoon (@sinoon) #简单 #tuple

  ### 题目

  创建一个`Length`泛型，这个泛型接受一个只读的元组，返回这个元组的长度。

  例如：

  ```ts
  type tesla = ['tesla', 'model 3', 'model X', 'model Y']
  type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

  type teslaLength = Length<tesla> // expected 4
  type spaceXLength = Length<spaceX> // expected 5
  ```

  > 在 Github 上查看：https://tsch.js.org/18/zh-CN
*/

/* _____________ 你的代码 _____________ */

// type Length<T extends any[]> = T["length"];
type Length<T extends readonly any[]> = T extends {'length':infer L} ? L :never

type tesla = ["tesla", "model 3", "model X", "model Y"];
type teslaLength = Length<tesla> // expected 4
