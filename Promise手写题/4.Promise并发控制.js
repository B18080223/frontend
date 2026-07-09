// Promise并发控制
// @param [promise1, promise2, ...]
// @param maxConcurrency 最大并发数
// @return promise 里面是个数组,存储结果
const limitPromise = (params, maxCount) => {
  let res = null;
  let rej = null;
  let result = []; //存储结果
  let count = 0; // 已完成的数量
  let queue = [...params]; // 任务队列
  let n = params.length;
  let index = 0; // 当前任务的索引
  let myPromise = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  if (n === 0) res([]); // 如果传入的数组为空，直接返回一个空数组
  // 一个个的执行任务
  const next = () => {
    if (count === n) {
      res(result);
      return;
    }
    let curIndex = index;
    index++;
    if (queue.length === 0) return; // 如果已经执行完所有任务，直接返回,等待微任务队列里面完成
    const curTask = queue.shift(); //取出任务
    Promise.resolve(typeof curTask === "function" ? curTask() : curTask)
      .then((data) => {
        result[curIndex] = data;
      })
      .catch((data) => {
        result[curIndex] = data;
      })
      .finally(() => {
        count++;
        //任务执行完毕了，再执行下一个
        next();
      });
  };
  // 最开始入队的数量
  let min = Math.min(maxCount, n);
  for (let i = 0; i < min; i++) {
    next(); //初始时塞满并发池，后面再一个个塞入
  }
  return myPromise;
};

// 创建5个异步任务，每个耗时不同，并发限制为2
const createTask = (id, time) => () =>
  new Promise((r) => {
    console.log(`任务${id}开始`);
    setTimeout(() => {
      console.log(`任务${id}完成`);
      r(id);
    }, time);
  });

const tasks = [
  createTask(1, 300),
  createTask(2, 100),
  createTask(3, 200),
  createTask(4, 150),
  createTask(5, 250),
];

console.log("=== 并发限制为2 ===");
limitPromise(tasks, 2).then((res) => {
  console.log("结果:", res); // [1, 2, 3, 4, 5]
  console.assert(res.length === 5, "结果长度应为5");
  console.assert(res[0] === 1 && res[4] === 5, "结果顺序应正确");
  console.log("✓ 测试通过");
});
