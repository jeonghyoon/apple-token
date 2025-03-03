require("dotenv").config();
const axios = require("axios");
const querystring = require("querystring");
const generateClientSecret = require("./1_client_secret"); // client_secret 가져오기

const clientId = process.env.CLIENT_ID;

const getAccessToken = async () => {
  try {
    const clientSecret = generateClientSecret(); // client_secret 요청

    const response = await axios.post(
      "https://appleid.apple.com/auth/token",
      querystring.stringify({
        grant_type: "client_credentials",
        scope: "user.migration",
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log(
      "🚀 access_token.js ~ getAccessToken ~ response.data:",
      response.data
    );
    return response.data.access_token;
  } catch (error) {
    console.error(
      "❌ access_token.js ~ getAccessToken ~ error:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};

// ✅ 함수 내보내기
module.exports = getAccessToken;
