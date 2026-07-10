// 9. Promise调度器
// 一个个去添加任务 add方法
// 添加任务后会触发 执行函数run
// 最多并发执行maxCount个任务
class Scheduler {
  constructor(maxCount = Infinity) {
    this.queue = []; //任务队列，里面存储Promise对象
    this.maxCount = maxCount; //最多允许有maxCount 数量在任务队列里
    this.runningCount = 0; // 当前正在执行的任务数量
  }
  //@params task为入队的任务
  add(task) {
    // 将task包装成Promise
    let res = null;
    let rej = null;
    let myPromise = new Promise((resolve, reject) => {
      res = resolve;
      rej = reject;
    });
    // 惰性执行，shift弹出之后才会执行
    this.queue.push({
      curTask: task,
      taskResolve: res,
      taskReject: rej,
    });
    this.run(); //触发run去执行任务
    return myPromise;
  }
  run() {
    // 控制队列的数量
    if (!this.queue.length || this.runningCount >= this.maxCount) return;
    this.runningCount++;
    const curTaskObj = this.queue.shift();
    const { curTask, taskResolve, taskReject } = curTaskObj;
    Promise.resolve(typeof curTask === "function" ? curTask() : curTask)
      .then((data) => {
        taskResolve(data);
      })
      .catch((error) => {
        taskReject(error);
      })
      .finally(() => {
        this.runningCount--;
        this.run(); // 无论执行成功还是失败，腾出空位给下一个执行
      });
  }
}

// ==================== Scheduler 测试用例 ====================
const scheduler = new Scheduler(2);

const log = (id, time) => () =>
  new Promise((r) => {
    console.log(`${id} 开始`);
    setTimeout(() => {
      console.log(`${id} 完成`);
      r(id);
    }, time);
  });

console.log("=== 调度器测试: maxCount=2 ===");
scheduler.add(log("任务A", 300));
scheduler.add(log("任务B", 200));
scheduler.add(log("任务C", 100));
scheduler.add(log("任务D", 150));

// 预期输出顺序：
// > "任务A 开始"
// > "任务B 开始"
// > "任务B 完成"
// > "任务C 开始"
// > "任务A 完成"
// > "任务D 开始"
// > "任务C 完成"
// > "任务D 完成"
