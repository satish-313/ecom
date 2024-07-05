import fs from "node:fs/promises";
import crypto from "node:crypto";

const orders = [];
const orderDetails = [];
const payments = [];
let orderStr =
    "INSERT INTO orders (customer_id,address_id,order_date,payment_status,payment_id,total_amount) VALUES";
let orderDetailStr = `
    INSERT INTO order_details(order_id,product_id,product_name,product_qnt,product_cost,order_status) VALUES
`;
let paymentsStr = `
    INSERT INTO payment (customer_id,payment_signature,amount,created_at) VALUES
`;
const orderStatus = [
    "pick & packing",
    "shipped",
    "out of delivery",
    "delivery attempt",
    "delivered",
    "return requested",
    "return approved",
    "return rejected",
    "order cancel",
];
const paymentStatus = ["payment received", "payment failed"];

const cart = 7;
const qnt = 12;
const multilOrder = 3;
const product = 194;

/* customer with addres id */
const customerMap = new Map();

async function createUserMap() {
    let raw = await fs.readFile("./customeradd.json");
    let data = await JSON.parse(raw);

    for (let item of data.data) {
        if (customerMap.has(item.customer_id)) {
            let arr = customerMap.get(item.customer_id);
            arr.push(item.id);
        } else {
            customerMap.set(item.customer_id, [item.id]);
        }
    }
}
await createUserMap();
// createOrders();

for (let i = 0; i < 10; i++) {
    console.log(crypto.randomUUID());
}
function createOrders() {
    for (let u of customerMap) {
    }
}

function createOrderDetails(oId) {
    let rn = rnGen(cart);
    for (let i = 0; i < rn; i++) {
        console.log();
    }
}

/* Random date */
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

/* Random number in between a number */
function rnGen(n) {
    return crypto.randomInt(n) + 1;
}
