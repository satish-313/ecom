import fs from "node:fs/promises";

const wishlist = [];
let str = "INSERT INTO wishlist (product_id,customer_id,created_at) VALUES";
let map = new Map();
let us = new Set();
const users = 208;
const products = 194;

function createWishlist() {
    for (let i = 0; i < 70; i++) {
        let c = getRandomNumber(users, us);
        let up = new Set();
        for (let j = 0; j < Math.floor(Math.random() * 8) + 1; j++) {
            let p = getRandomNumber(products, up);
            let t = `\n("${p}","${c}","${randomDateGenerator()}")`
            wishlist.push(t)
        }
    }
}
createWishlist();

fs.writeFile("./db/wishlist.sql", str + wishlist.join(","), (err) => {
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
