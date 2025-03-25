require("dotenv").config();
const fs = require("fs");
const jwt = require("jsonwebtoken");

const generateClientSecret = (
  teamId = process.env.TEAM_ID,
  clientId = process.env.CLIENT_ID,
  keyId = process.env.KEY_ID,
  keyFile = process.env.KEY_FILE
) => {
  const privateKey = fs.readFileSync(keyFile, "utf8");
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

module.exports = generateClientSecret;
