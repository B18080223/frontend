// 2.手写Promise.race函数 返回最先改变状态的那个Promise
// @params [promise1, promise2, ...]
// @return promise

Promise.myRace = (params) => {
  let resolve = null;
  let reject = null;
  let myPromise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  let n = params.length;
  for (let i = 0; i < n; i++) {
    Promise.resolve(params[i])
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  }
  return myPromise;
};


// 测试2: 最快的 reject 先返回
console.log("\n测试2: 最快的 reject 先返回");
Promise.myRace([
  new Promise((r) => setTimeout(() => r(1), 300)),
  new Promise((_, j) => setTimeout(() => j("失败"), 100)), // 最快，失败
  new Promise((r) => setTimeout(() => r(3), 500)),
]).then(
  () => console.log("不应到达这里"),
  (err) => {
    console.log("错误:", err); // "失败"
    console.assert(err === "失败", "测试2失败");
    console.log("✓ 测试2通过");
  }
);
