require("dotenv").config();
const fs = require("fs");
const jwt = require("jsonwebtoken");

const keyFile = process.env.KEY_FILE;
const teamId = process.env.TEAM_ID;
const clientId = process.env.CLIENT_ID;
const keyId = process.env.KEY_ID;
const privateKey = fs.readFileSync(keyFile, "utf8");

// JWT 생성 (client_secret 역할)
const generateClientSecret = () => {
  return jwt.sign(
    {
      iss: teamId,
      iat: Math.floor(Date.now() / 1000), // 현재 시간 (초)
      exp: Math.floor(Date.now() / 1000) + 86400 * 180, // 180일 유효
      aud: "https://appleid.apple.com",
      sub: clientId,
    },
    privateKey,
    {
      algorithm: "ES256",
      keyid: keyId,
    }
  );
};

const clientSecret = generateClientSecret();
console.log("🚀 client_secret.js ~ clientSecret:", clientSecret);

// ✅ 함수 내보내기
module.exports = generateClientSecret;
