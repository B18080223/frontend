// Promise 超时控制
// @params 最多对fn请求函数等待time秒
// @return promise 响应结果
const overTime = (fn, time) => {
  let res = null;
  let rej = null;
  let myPromise = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  // 进入微任务队列
  Promise.resolve(fn)
    .then((data) => res(data))
    .catch((err) => rej(err));
  // 放入计时任务队列，超时后直接执行拒绝函数
  setTimeout(() => {
    rej(`超过${time}豪秒后仍未响应`);
  }, time);
  return myPromise;
};

// ==================== overTime 测试用例 ====================

// 测试: 慢Promise，超时
console.log("测试: 超时");
const slowTask = new Promise((r) =>
  setTimeout(() => r("不应该到这里"), 1000000)
);
overTime(slowTask, 2000).then(
  () => console.log("不应到达这里"),
  (err) => {
    console.log("错误:", err); // "超过2000豪秒后仍未响应"
    console.assert(err === "超过2000豪秒后仍未响应", "测试失败");
    console.log("✓ 测试通过");
  }
);
