import fs from "node:fs/promises";

const cart = [];
let str =
    "INSERT INTO cart (product_id,customer_id,quantity,create_at,update_at) VALUES";
let map = new Map();
let us = new Set();
const users = 208;
const products = 194;
const quantity = 15;

function createcart() {
    for (let i = 0; i < 70; i++) {
        let c = getRandomNumber(users, us);
        let up;
        if (map.has(c)) {
            up = new Set([...map.get(c)]);
            console.log(up);
        } else up = new Set();

        for (let j = 0; j < Math.floor(Math.random() * 8) + 1; j++) {
            let p = getRandomNumber(products, up);
            let rd = randomDateGenerator();
            let t = `\n("${p}","${c}","${random()}","${rd}","${randomDateInitial(
                rd
            )}")`;
            cart.push(t);
        }
    }
}

async function readWishlist() {
    let data = await fs.readFile("./wishlist.json");
    let res = await JSON.parse(data);
    let wh = res.wishlist;
    for (let i = 0; i < wh.length; i++) {
        if (map.has(wh[i].customer_id)) {
            let arr = map.get(wh[i].customer_id);
            arr.push(wh[i].product_id);
        } else {
            let arr = [wh[i].product_id];
            map.set(wh[i].customer_id, arr);
        }
    }
}
await readWishlist();
createcart();

fs.writeFile("./db/cart.sql", str + cart.join(","), (err) => {
    console.log(err);
});

function getRandomNumber(n, s) {
    let rn = Math.floor(Math.random() * n) + 1;
    while (s.has(rn)) {
        rn = Math.floor(Math.random() * n) + 1;
    }
    s.add(rn);
    return rn;
}

function random() {
    return Math.floor(Math.random() * quantity) + 1;
}

function randomDateGenerator() {
    const today = new Date();
    const tYears = new Date(
        today.getFullYear() - 2,
        today.getMonth(),
        today.getDate()
    );
    let diff = today.getTime() - tYears.getTime();
    let randomTime = tYears.getTime() + Math.floor(Math.random() * diff);
    return randomTime;
}

function randomDateInitial(t) {
    const diff = 15827425133;
    t += Math.floor(Math.random() * diff);
    return t;
}
