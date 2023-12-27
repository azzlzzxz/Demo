// mock一个测试用户：李雷
const user = {
  // 姓名
  name: "Li Lei",
  // 喜欢列表
  likedLessons: [],
  // 注册列表
  registeredLessons: [],
  // VIP 标识
  isVIP: false,
};
// mock一套测试课程
const myLessons = [
  {
    teacher: "John",
    title: "advanced English",
  },
  {
    teacher: "John",
    title: "advanced Spanish",
  },
];

// ”喜欢课程“功能函数
function likeLessons(user, lessons) {
  const updatedLikedLessons = user.likedLessons.concat(lessons);
  return Object.assign({}, user, { likedLessons: updatedLikedLessons });
}

// “注册课程”功能函数
function registerLessons(user) {
  return {
    ...user,
    registeredLessons: user.likedLessons,
  };
}

// “清空喜欢列表”功能函数
function emptyUserLiked(user) {
  return {
    ...user,
    likedLessons: [],
  };
}

// “检查是否 VIP”功能函数
function isVIP(user) {
  let isVIP = false;
  if (user.registeredLessons.length > 10) {
    isVIP = true;
  }
  return {
    ...user,
    isVIP,
  };
}

// 注意，这个 pipe 函数和 14 节中的有些区别，这也是一种常见的实现思路
const pipe = (...funcs) => {
  console.log("funcs", funcs);
  funcs.reduce(
    // 同样是基于 reduce 实现，主要的区别在于对组合链入参的处理不同
    (f, g) => {
      (...args) => {
        g(f(...args));
      };
    }
  );
};

const resilt = pipe(
  likeLessons,
  registerLessons,
  emptyUserLiked,
  isVIP
  // 这个 pipe 竟然可以接收多个入参，为什么呢？当然是因为“对组合链入参的处理不同”啦！
)(user, myLessons);

console.log(resilt);
