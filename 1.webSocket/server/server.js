const WebSocket = require("ws");
const http = require("http");
const port = 1024; // 端口号
const pathname = "/ws/"; // 路径
const server = http.createServer();

new WebSocket.Server({ port }, function () {
  console.log("webSocket服务开启");
}).on("connection", connectHandler);

function connectHandler(ws) {
  // 连接成功
  console.log("客户端连接成功");
  ws.on("error", errorHandler);
  ws.on("close", closeHandler);
  ws.on("message", messageHandler);
}

function errorHandler(err) {
  // 连接错误
  console.log("连接错误", err);
}

function closeHandler() {
  // 连接关闭
  console.log("连接关闭");
}

function messageHandler(data) {
  // 接收消息
  console.log("接收消息", data);
}
