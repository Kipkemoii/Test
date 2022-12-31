const vault = require("node-vault")({
    apiVersion: "v1",
    endpoint: "http://127.0.0.1:8200",
});

// const roleId = process.env.ROLE_ID;
// const secretId = process.env.SECRET_ID;
const roleId = "8a61ecc7-e12a-5cae-a6b9-8d1d112a5cd2";
const secretId = "8da927c2-141d-958d-ac14-b0546ae5b1dc";
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

    const databaseName = data.db_name;
    const username = data.username;
    const password = data.password;

    console.log({
        databaseName,
        username,
        password
    });

    // console.log("Attempt to delete the secret");

    // await vault.delete("kv/mysql/webapp");
};
run();
