// 手写Promise.allSettled函数,不管成功或失败 都返回一个数组
// @params [promise1, promise2, ...]
// @return promise 里面是个数组
Promise.myAllSettled = (params) => {
  let res = null;
  let rej = null;
  let result = [];
  let myPromise = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  let n = params.length;
  if (n === 0) return res(result); // 如果传入的数组为空，直接返回一个空数组
  // 遍历数组
  let count = 0; // 计数器
  for (let i = 0; i < n; i++) {
    Promise.resolve(params[i])
      .then((data) => {
        result[i] = data;
      })
      .catch((data) => {
        result[i] = data;
      })
      .finally(() => {
        count++;
        if (count === n) {
          res(result);
        }
      });
  }
  return myPromise;
};

// 测试: 混合 resolve 和 reject
console.log("测试: 混合 resolve 和 reject");
Promise.myAllSettled([
  Promise.resolve("成功1"),
  Promise.reject("失败1"),
  Promise.resolve("成功2"),
  Promise.reject("失败2"),
]).then((res) => {
  console.log("结果:", res); // ["成功1", "失败1", "成功2", "失败2"]
  console.assert(res[0] === "成功1", "测试失败: 第1个");
  console.assert(res[1] === "失败1", "测试失败: 第2个");
  console.assert(res[2] === "成功2", "测试失败: 第3个");
  console.assert(res[3] === "失败2", "测试失败: 第4个");
  console.assert(res.length === 4, "测试失败: 长度");
  console.log("✓ 测试通过");
});
