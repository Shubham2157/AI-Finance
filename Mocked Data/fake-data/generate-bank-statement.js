// generate-bank-statement.js
// Generates fake monthly bank statement data matching your table schema.
// Usage: node generate-bank-statement.js [year] [recordsPerMonth]
// eg: node generate-bank-statement.js 2024

const fs = require("fs");
const path = require("path");
const { faker } = require("@faker-js/faker");

const year = process.argv[2] ? parseInt(process.argv[2], 10) : new Date().getFullYear();
const recordsPerMonth = process.argv[3] ? parseInt(process.argv[3], 10) : 80; // default 80 per month
const outputDir = path.join(process.cwd(), `bank_statements_${year}`);
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

// Helper: random number
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper: random date within month
function randomDateInMonth(year, month) {
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0);
  const ts = randomInt(start.getTime(), end.getTime());
  return new Date(ts);
}

function formatDateISO(d) {
  return d.toISOString().slice(0, 10);
}

// Main function to create monthly data
function generateMonthData(year, monthIndex, startId) {
  const txs = [];
  const banks = ["HDFC Bank", "ICICI Bank", "SBI", "Axis Bank", "Kotak Mahindra", "Union Bank"];
  const categories = {
    Groceries: ["Supermarket", "Vegetables", "Fruits", "Dairy"],
    Dining: ["Restaurant", "Cafe", "Fast Food", "Snacks"],
    Salary: ["Monthly Salary", "Bonus"],
    Rent: ["House Rent", "Office Rent"],
    Utilities: ["Electricity", "Water", "Internet", "Mobile Bill"],
    Entertainment: ["Movies", "Music", "Games", "Streaming"],
    Travel: ["Taxi", "Flight", "Train", "Bus"],
    Shopping: ["Clothes", "Electronics", "Online Order"],
    Health: ["Medicine", "Doctor Visit", "Gym"],
    Fuel: ["Petrol", "Diesel", "CNG"],
    Transfer: ["NEFT", "IMPS", "UPI"],
    Insurance: ["Life Insurance", "Car Insurance"],
  };

  let idCounter = startId;

  for (let i = 0; i < recordsPerMonth; i++) {
    const category = faker.helpers.arrayElement(Object.keys(categories));
    const subCategory = faker.helpers.arrayElement(categories[category]);
    const bank = faker.helpers.arrayElement(banks);
    const date = randomDateInMonth(year, monthIndex);
    const type = faker.helpers.arrayElement(["CREDIT", "DEBIT"]);

    // amount logic (salary credits are higher)
    let amount;
    if (category === "Salary") amount = faker.number.float({ min: 2000, max: 8000, precision: 0.01 });
    else if (type === "CREDIT") amount = faker.number.float({ min: 50, max: 1000, precision: 0.01 });
    else amount = faker.number.float({ min: 10, max: 2000, precision: 0.01 });

    const description =
      type === "CREDIT"
        ? `${subCategory} - ${faker.company.name()}`
        : `${faker.company.name()} - ${subCategory}`;

    txs.push({
      id: idCounter++,
      transaction_date: formatDateISO(date),
      description,
      amount: amount.toFixed(2),
      type,
      bank,
      category,
      sub_category: subCategory,
    });
  }

  // Sort by transaction date
  txs.sort((a, b) => new Date(a.transaction_date) - new Date(b.transaction_date));

  return txs;
}

// Generate per month and output
let id = 1;
const allTx = [];

for (let m = 0; m < 12; m++) {
  const monthName = new Date(year, m, 1).toLocaleString("en-US", { month: "long" });
  const txs = generateMonthData(year, m, id);
  id += txs.length;

  const filePath = path.join(outputDir, `${year}-${String(m + 1).padStart(2, "0")}-${monthName}.json`);
  fs.writeFileSync(filePath, JSON.stringify(txs, null, 2));
  console.log(`✅ Created: ${filePath} (${txs.length} records)`);

  allTx.push(...txs);
}

// Also create a CSV for SQL import
const csvHeader = ["id", "transaction_date", "description", "amount", "type", "bank", "category", "sub_category"];
const csvRows = [csvHeader.join(",")];

for (const t of allTx) {
  const row = [
    t.id,
    t.transaction_date,
    `"${t.description.replace(/"/g, '""')}"`,
    t.amount,
    t.type,
    `"${t.bank}"`,
    t.category,
    `"${t.sub_category}"`,
  ].join(",");
  csvRows.push(row);
}

const csvPath = path.join(outputDir, `bank_statements_${year}.csv`);
fs.writeFileSync(csvPath, csvRows.join("\n"));
console.log(`\n📄 Combined CSV created at: ${csvPath}`);
console.log("Done!");
