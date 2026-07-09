// 串行执行
// Promise.all 一般是并行发起请求，请求结果按照顺序返回
// 现在要求请求也是同步顺序发起的，前一个发起并执行完毕后（得到结果） 再发起下一个

// @params Array<fn> 队列的形式
// @return Array<promise>
const handleByOrder = (params) => {
  let res = null;
  let rej = null;
  let promise = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  //没有任务时，输出空数组
  if (params.length === 0) return res([]);
  let result = []; // 存储结果
  // 执行函数
  const run = () => {
    if (!params.length) {
      res(result);
      return;
    }
    const task = params.shift();
    Promise.resolve(typeof task === "function" ? task() : task)
      .then((data) => {
        result.push(data); // 同步执行 可以push
        run(); //取下一个任务执行(递归)
      })
      .catch((err) => {
        rej(err);
        return; // reject后停止，不再执行后续任务
      });
  };
  run();
  return promise;
};

// ==================== handleByOrder 测试用例 ====================
const delay = (id, time, result) => () =>
  new Promise((r) => {
    console.log(`任务${id}开始`);
    setTimeout(() => {
      console.log(`任务${id}完成`);
      r(result);
    }, time);
  });

// 测试: 串行执行，前一个完成后才执行下一个
console.log("测试: 串行执行");
handleByOrder([
  delay(1, 200, "结果1"),
  delay(2, 100, "结果2"),
  delay(3, 150, "结果3"),
]).then((res) => {
  console.log("结果:", res); // ["结果1", "结果2", "结果3"]
  console.assert(res.length === 3, "测试失败: 长度");
  console.assert(res[0] === "结果1" && res[2] === "结果3", "测试失败: 顺序");
  console.log("✓ 测试通过: 串行执行，结果按顺序返回");
});
