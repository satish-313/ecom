import fs from "node:fs/promises";

const add = `INSERT INTO address (customer_id,place_name,address_line1,state,city,pincode,statecode,country) VALUES \n`;
let address = "";
const list = ["address", "city", "state", "stateCode", "postalCode", "country"];
const placeName = [
    "home",
    "office",
    "farm house",
    "temp house",
    "coaching house",
    "in-law house",
    "enemy house",
    "ex house",
    "friend house",
];
const tadd = [];
const se = new Set();


async function fetchdata() {
    const data = await fs.readFile("./customers.json");
    const res = await JSON.parse(data);
    for (let r of res) {
        let arr = [];
        const a = r.address;
        for (let k of list) {
            arr.push(a[k]);
        }
        tadd.push(arr);
    }
    for (let i = 0; i < 130; i++) {
        let houses = getRandomNumber(3) + 1;
        let customer = getCustomer(tadd.length - 5);
        let [p, tA] = getRandomHouse(houses);

        for (let h = 0; h < houses; h++) {
            let temp = "";
            if (i != 129) temp = `('${customer}','${p[h]}',${tA[h]}),\n`;
            else temp = `('${customer}','${p[h]}',${tA[h]})\n`;
            address += temp;
        }
    }
}

await fetchdata();
fs.appendFile("address.sql", add + address, (err) => {
    console.log(err);
});

function getRandomNumber(n) {
    return Math.floor(Math.random() * n);
}
function getCustomer(n) {
    let rn = getRandomNumber(n);
    while (se.has(rn)) {
        rn = getRandomNumber(n);
    }
    se.add(rn);
    return rn;
}

function getRandomHouse(t) {
    let places = util(t, placeName);
    let tcus = util(t, tadd);
    let r = [];
    for (let t of tcus) {
        let temp = ``;
        for (let i = 0; i < t.length; i++) {
            if (i >= t.length - 1) temp += `'${t[i]}'`;
            else temp += `'${t[i]}',`;
        }
        r.push(temp);
    }
    return [places, r];
}

function util(t, arr) {
    let s = new Set();
    let p = [];

    while (t > p.length) {
        let n = Math.floor(Math.random() * arr.length);

        if (!s.has(n)) {
            p.push(arr[n]);
        }
    }
    return p;
}
