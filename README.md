## 이관 전

**1. client_secret 조회**

   - `node 1_client_secret.js`

**2. access_token 조회**

   - `node 2_access_token.js`

     ```markdown
     # Request

     - POST https://appleid.apple.com/auth/token
     - Content-Type: application/x-www-form-urlencoded
     - grant_type=client_credentials&
       scope=user.migration&
       client_id={client_id}&
       client_secret={client_secret}

     # Response

     {
     "access_token": "adg6105ed7a44303887def17c2b32adec.0.nx.20LreF67Or9",
     "token_type": "Bearer",
     "expires_in": 3600
     }
     ```

**3. transfer_sub 조회**

   - `node 3_transfer_sub.js`

     ```markdown
     # Request

     - POST https://appleid.apple.com/auth/usermigrationinfo
     - Content-Type: application/x-www-form-urlencoded
     - Authorization: Bearer {access_token}
     - sub={sub}&
       target={recipient_team_id}&
       client_id={client_id}&
       client_secret={client_secret}

     # Response

     { "transfer_sub": "417607.e68ba878e1be1652bbf12acbcd492d8a.1827" }
     ```

## 이관 후

**4. new_sub 조회**

   - `node 4_new_sub.js`

     ```markdown
     # Request

     - POST https://appleid.apple.com/auth/usermigrationinfo
     - Content-Type: application/x-www-form-urlencoded
     - Authorization: Bearer {access_token}
     - transfer_sub={transfer_sub}&
       client_id={client_id}&
       client_secret={client_secret}

     # Response

     {
     "sub": "041827.bc78e1be15ac668ba852d4faa3292d8a.0219",
     "email": "xxxxxxxxx@privaterelay.appleid.com",
     "is_private_email": true
     }
     ```
