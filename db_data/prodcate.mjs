import fs from "node:fs/promises";

const prodcate = [];
let str = "INSERT INTO prodcategory (product_id,category_id) VALUES";
let map = new Map();

async function categoryId() {
    const data = await fs.readFile("./category.json");
    const cate = await JSON.parse(data);
    for (let item of cate.category) {
        map.set(item.name, item.category_id);
    }
}

async function fetchdata() {
    const data = await fs.readFile("./products.json");
    const res = await JSON.parse(data);

    for (let i = 0; i < res.length; i++) {
        let r = res[i];
        if (!r.tags.includes(r.category)) {
            r.tags.push(r.category);
        }
        for (let c of r.tags) {
            let temp = `\n("${i + 1}","${map.get(c)}")`;
            prodcate.push(temp);
        }
    }
}

await categoryId();
await fetchdata();

fs.writeFile("./db/prodcate.sql", str + prodcate.join(","), (err) => {
    console.log(err);
});
