const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "../")));
// __dirname: 현재 폴더
// 현재 폴더의 한단계 밖 (../)을 사용
// /index.html 요청 시에는 /index.html이 응답됨

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

// 어떤 경로로 요청하든 index.html 전송
app.get("/*any", (req, res) => {
  // 구체적인 파일 작성
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
