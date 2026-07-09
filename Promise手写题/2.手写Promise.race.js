// 手写Promise.race函数 返回最先改变状态的那个Promise
// @params [promise1, promise2, ...]
// @return promise
Promise.myRace = (params) => {
  let res = null;
  let rej = null;
  let myPromise = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  let n = params.length;
  // 谁先完成就直接 resolve/reject，后续的调用无效（promise 只能改变一次状态）
  for (let i = 0; i < n; i++) {
    // 统一包装成Promise结构
    Promise.resolve(params[i])
      .then((data) => {
        res(data);
      })
      .catch((data) => {
        rej(data);
      });
  }
  return myPromise;
};

// 测试: 最快的 reject 先返回
console.log("测试: 最快的 reject 先返回");
Promise.myRace([
  new Promise((r) => setTimeout(() => r(1), 300)),
  new Promise((_, j) => setTimeout(() => j("失败"), 100)), // 最快，失败
  new Promise((r) => setTimeout(() => r(3), 500)),
]).then(
  () => console.log("不应到达这里"),
  (err) => {
    console.log("错误:", err); // "失败"
    console.assert(err === "失败", "测试失败");
    console.log("✓ 测试通过");
  }
);
