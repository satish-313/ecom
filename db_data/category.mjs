import fs from "node:fs/promises";

let categories = `INSERT INTO category (name) VALUES \n`;
let tc = [];
let set = new Set();

async function fetchdata() {
    const data = await fs.readFile("../products.json");
    const res = await JSON.parse(data);

    for (let item of res) {
        if (!item.tags.includes(item.category)) {
            item.tags.push(item.category);
        }
        for (let t of item.tags) {
            if (!set.has(t)) {
                let temp = `("${t}"),\n`;
                set.add(t);
                tc.push(temp);
            }
        }
    }
}

await fetchdata();
fs.writeFile("./category.sql", categories + tc.join(""), (err) => {
    console.log(err);
});
