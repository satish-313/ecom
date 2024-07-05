import fs from "node:fs/promises";

const list = [
    "title",
    "description",
    "price",
    "discountPercentage",
    "stock",
    "brand",
    "weight",
    "dimensions",
    "shippingInformation",
    "returnPolicy",
    "thumbnail",
];
const products = [];
let str =
    "INSERT INTO products (title,description,price,discount_percentage,stock,brand,weight,dimensions,shipping_information,return_policy,thumbnail) VALUES";

async function fetchdata() {
    const data = await fs.readFile("./products.json");
    const res = await JSON.parse(data);

    for (let r of res) {
        let temp = `\n(`;
        for (let i = 0; i < list.length; i++) {
            let l = list[i];
            if (l === "dimensions") {
                temp += `"${makeDim(r[l])}",`;
                continue;
            }
            if (i != list.length - 1) temp += `"${r[l]}",`;
            else temp += `"${r[l]}")`;
        }
        products.push(temp);
    }
}

await fetchdata();
fs.writeFile("./db/products.sql", str + products.join(","), (err) => {
    console.log(err);
});

function makeDim(o) {
    let str = "";
    let arr = ["width", "height", "depth"];

    for (let i = 0; i < arr.length - 1; i++) {
        str += `${o[arr[i]]}x`;
    }
    str += `${o[arr[arr.length - 1]]}`;
    return str;
}
