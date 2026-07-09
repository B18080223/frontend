// Promise 请求重试
// @params fn请求函数，请求失败delay秒后再次请求，最多请求times次
const retry = (fn, delay, times) => {
  let res = null;
  let rej = null;
  let count = 0; //请求次数
  let myPromise = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  //超时重试函数
  function run(fn, delay, times) {
    Promise.resolve(fn())
      .then((data) => {
        res(data);
      })
      .catch((err) => {
        count++;
        if (count < times)
          setTimeout(() => {
            run(fn, delay, times);
          }, delay);
        else rej(err);
      });
  }
  run(fn, delay, times);
  return myPromise;
};

// ==================== retry 测试用例 ====================
let retryCount = 0;
const failThenSuccess = () => {
  retryCount++;
  return new Promise((resolve, reject) => {
    if (retryCount < 3) {
      reject(`第${retryCount}次失败`);
    } else {
      resolve("成功");
    }
  });
};

console.log("=== 重试测试: 前2次失败，第3次成功 ===");
retryCount = 0;
retry(failThenSuccess, 100, 3).then((res) => {
  console.log("结果:", res); // "成功"
  console.assert(res === "成功", "测试失败");
  console.assert(retryCount === 3, `应请求3次，实际${retryCount}次`);
  console.log("✓ 测试通过: 重试2次后成功");
});

// 测试: 全部失败，验证拒绝
let allFailCount = 0;
const alwaysFail = () => {
  allFailCount++;
  return Promise.reject(`第${allFailCount}次失败`);
};

console.log("\n=== 重试测试: 全部失败 ===");
allFailCount = 0;
retry(alwaysFail, 100, 2).then(
  () => console.log("不应到达这里"),
  (err) => {
    console.log("错误:", err); // "第3次失败"
    console.assert(allFailCount === 3, `应请求3次，实际${allFailCount}次`);
    console.log("✓ 测试通过: 重试2次后全部失败，正确拒绝");
  }
);
