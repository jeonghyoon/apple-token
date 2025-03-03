require("dotenv").config();
const axios = require("axios");
const querystring = require("querystring");
const getAccessToken = require("./2_access_token"); // access_token 가져오기
const generateClientSecret = require("./1_client_secret"); // client_secret 가져오기

const requestTransferMigrationInfo = async (transferSub) => {
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
      transfer_sub: transferSub,
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
      "🚀 transfer_migration_info.js ~ requestTransferMigrationInfo ~ response.data:",
      response.data
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ transfer_migration_info.js ~ requestTransferMigrationInfo ~ error:",
      error.response ? error.response.data : error.message
    );
  }
};

// 함수 실행 예시
const transferSub = "001313.rcd5d2de6e3b44bc7ace55e7a2a521725"; // 이전 Apple 계정의 정보 식별자
requestTransferMigrationInfo(transferSub);
