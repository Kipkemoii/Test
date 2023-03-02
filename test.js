process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const vault = require("node-vault")({
  // apiVersion: "v1",
  endpoint: "https://stg.brn:8200",
});

// const roleId = process.env.ROLE_ID;
// const secretId = process.env.SECRET_ID;
const roleId = "8591ce96-d33a-60ba-1490-ab05fec8005d";
const secretId = "6743cd4e-991f-d5d0-6c06-16bc3c25d6a6";
// const run = () => {
//     console.log(roleId);
//     console.log(secretId);
// }
const run = async () => {
  const result = await vault.approleLogin({
    role_id: roleId,
    secret_id: secretId,
  });

  vault.token = result.auth.client_token;
  const { data } = await vault.read("kv/mysql/webapp");

  //const databaseName = data.db_name;
  const username = data.username;
  const password = data.password;
  const db_name = data.db_name;
  console.log({
    //databaseName,
    username,
    password,
    db_name,
  });

  // console.log("Attempt to delete the secret");

  // await vault.delete("kv/mysql/webapp");
};
run();
