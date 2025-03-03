require("dotenv").config();
const axios = require("axios");
const querystring = require("querystring");
const getAccessToken = require("./2_access_token"); // access_token 가져오기
const generateClientSecret = require("./1_client_secret"); // client_secret 가져오기

const requestUserMigrationInfo = async (sub, recipientTeamId) => {
  try {
    const accessToken = await getAccessToken(); // access_token 요청
    const clientSecret = generateClientSecret(); // client_secret 요청

    console.log("🔍 accessToken:", accessToken);
    console.log("🔍 clientSecret:", clientSecret);

    if (!accessToken || !clientSecret) {
      throw new Error("accessToken 또는 clientSecret이 생성되지 않았습니다.");
    }

    const clientId = process.env.CLIENT_ID;

    const data = querystring.stringify({
      sub: sub,
      target: recipientTeamId,
      client_id: clientId,
      client_secret: clientSecret,
    });

    const response = await axios.post(
      "https://appleid.apple.com/auth/usermigrationinfo",
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(
      "🚀 usermigration_info.js ~ requestUserMigrationInfo ~ response.data:",
      response.data
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ usermigration_info.js ~ requestUserMigrationInfo ~ error:",
      error.response ? error.response.data : error.message
    );
  }
};

// 함수 실행 예시
const sub = "001313.abc8e9c4508b467db189cd0c3e11e9a4.0417"; // Apple 계정의 고유 식별자
const recipientTeamId = process.env.RECIPIENT_TEAM_ID; // 변경 팀 ID
requestUserMigrationInfo(sub, recipientTeamId);
