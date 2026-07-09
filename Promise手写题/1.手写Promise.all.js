// 手写Promise.all函数
// @params [promise1, promise2, ...]
// @return promise 里面是个数组
Promise.myAll = (params) => {
  let res = null;
  let rej = null;
  let result = [];
  let myPromise = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  if (params.length === 0) res(result); // 如果传入的数组为空，直接返回一个空数组
  // 遍历数组
  let count = 0; // 计数器
  for (let i = 0; i < params.length; i++) {
    // 统一包装成Promise结构
    Promise.resolve(params[i])
      .then((data) => {
        result[i] = data;
        count++;
        if (count === params.length) res(result);
      })
      .catch(rej); //有一个失败就直接reject
  }
  return myPromise;
};

Promise.myAll([
  Promise.resolve(1),
  Promise.reject("错误信息"),
  Promise.resolve(3),
]).then(
  (res) => console.log("不应到达这里"),
  (err) => {
    console.log("捕获错误:", err); // '错误信息'
    console.log("✓ 测试通过");
  }
);
