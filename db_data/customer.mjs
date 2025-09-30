import fs from "node:fs/promises";

let cus = `INSERT INTO customers (user_name,first_name,last_name,gender,email,password,avatar) VALUES`;
const c = [];
const cLoop = [
    "username",
    "firstName",
    "lastName",
    "gender",
    "email",
    "password",
    "image",
];
async function fetchdata() {
    const data = await fs.readFile("./customers.json");
    const res = await JSON.parse(data);

    for (let item of res) {
        let temp = `\n(`;
        for (let i = 0; i < cLoop.length; i++) {
            if (i != cLoop.length - 1) temp += `'${item[cLoop[i]]}',`;
            else temp += `'${item[cLoop[i]]}'`;
        }
        temp += ")";
        c.push(temp);
    }
}

await fetchdata();

fs.appendFile("customer.sql", cus + c.join(","), (err) => {
    console.log(err);
});
