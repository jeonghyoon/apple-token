require("dotenv").config();
const axios = require("axios");
const querystring = require("querystring");
const generateClientSecret = require("./1_client_secret"); // client_secret 가져오기

const getAccessToken = async (
  teamId = process.env.TEAM_ID,
  clientId = process.env.CLIENT_ID,
  keyId = process.env.KEY_ID,
  keyFile = process.env.KEY_FILE
) => {
  try {
    const clientSecret = generateClientSecret(teamId, clientId, keyId, keyFile); // client_secret 요청

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

const accessToken = getAccessToken();
console.log("🚀 client_secret.js ~ accessToken:", accessToken);

module.exports = getAccessToken;
