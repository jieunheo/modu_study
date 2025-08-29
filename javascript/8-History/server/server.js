const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "../")));
// public 폴더를 정적 파일 제공용 루트로 설정
// 요청 경로와 public 내부 파일명을 매칭해 자동 응답 (예: /style.css → public/style.css)
// /index.html 요청 시에는 public/index.html이 응답됨

// 어떤 경로로 요청하든 index.html 전송
app.get("/*any", (req, res) => {
  // 구체적인 파일 작성
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
