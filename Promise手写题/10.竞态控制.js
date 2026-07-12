// 10. 竞态控制，执行最后一个请求
// @params promise对象
const raceHandler = (task) => {
  let currentId = 0; //闭包，记录最新请求的id，每次请求都会被全局+1
  const fun = (task) => {
    currentId++;
    let id = currentId; //本次请求id会被注册至微任务队列
    let res = null;
    let rej = null;
    let myPromise = new Promise((resolve, reject) => {
      res = resolve;
      rej = reject;
    });
    // 包装成promise对象
    Promise.resolve(task)
      .then((data) => {
        if (id === currentId) res(data);
        else rej("请求被取消");
      })
      .catch((err) => {
        if (id === currentId) rej(err);
        else rej("请求被取消");
      });
    return myPromise;
  };
  return fun;
};

// 测试用例
const race = raceHandler();

// 连续3个，只返回最后一个
console.log("\n=== 测试3：3个请求只取最后一个 ===");
const p4 = race(new Promise((r) => setTimeout(() => r("A"), 50)));
const p5 = race(new Promise((r) => setTimeout(() => r("B"), 100)));
const p6 = race(new Promise((r) => setTimeout(() => r("C"), 150)));
p4.catch((e) => console.log("p4 reject:", e));
p5.catch((e) => console.log("p5 reject:", e));
p6.then((d) => console.log("p6 resolve:", d)).catch((e) =>
  console.log("p6 reject:", e)
);
