// Promise 并发缓存去重
// @params url,fetcher(可以是自己封装的请求函数)
// @return promise
let myMap = new Map(); // key:url , value: promise 结果
const deduplication = (url, fetcher) => {
  if (myMap.has(url)) return myMap.get(url);
  let res = null;
  let rej = null;
  let promise = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  fetcher(url)
    .then((data) => {
      res(data);
    })
    .catch((data) => {
      rej(data);
    })
    .finally(() => {
      myMap.delete(url);
    });
  myMap.set(url, promise);
  return promise;
};

// ==================== deduplication 测试用例 ====================
let requestCount = 0;
const mockFetcher = (url) => {
  requestCount++;
  console.log(`发起请求: ${url} (第${requestCount}次)`);
  return new Promise((r) => setTimeout(() => r(`数据-${url}`), 100));
};

console.log("=== 并发去重测试 ===");
// 同一个url同时发起3次请求，应该只真正请求1次
const p1 = deduplication("/api/user", mockFetcher);
const p2 = deduplication("/api/user", mockFetcher);
const p3 = deduplication("/api/user", mockFetcher);

Promise.all([p1, p2, p3]).then((res) => {
  console.log("结果:", res); // ["数据-/api/user", "数据-/api/user", "数据-/api/user"]
  console.assert(res.length === 3, "应返回3个结果");
  console.assert(requestCount === 1, `请求次数应为1，实际为${requestCount}`);
  console.log("✓ 测试通过: 3次调用只发了1次请求");
});

// 第二次调用应该也只发1次请求（因为第一次完成后map已清空）
setTimeout(() => {
  requestCount = 0;
  deduplication("/api/user", mockFetcher).then((res) => {
    console.assert(
      requestCount === 1,
      `第二次请求次数应为1，实际为${requestCount}`
    );
    console.log("✓ 测试通过: 第二次调用正常发起新请求");
  });
}, 300);
