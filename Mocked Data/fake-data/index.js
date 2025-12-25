// server.js
// Enhanced Express API to serve fake bank statement data (Faker.js generated)

const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// === CONFIG ===
const BASE_DIR = process.cwd(); // Root directory where folders like bank_statements_2025 exist

// === Utility: Get available years ===
function getAvailableYears() {
  return fs
    .readdirSync(BASE_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory() && dirent.name.startsWith("bank_statements_"))
    .map((dirent) => dirent.name.replace("bank_statements_", ""));
}

// === Utility: Get months for a given year ===
function getAvailableMonths(year) {
  const folder = path.join(BASE_DIR, `bank_statements_${year}`);
  if (!fs.existsSync(folder)) return [];
  return fs
    .readdirSync(folder)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""));
}

// === Utility: Read month file ===
function readMonthFile(year, monthIndex) {
  const folder = path.join(BASE_DIR, `bank_statements_${year}`);
  if (!fs.existsSync(folder)) throw new Error(`Data not found for year ${year}`);

  const monthFiles = fs
    .readdirSync(folder)
    .filter((f) => f.startsWith(`${year}-${String(monthIndex).padStart(2, "0")}`));

  if (monthFiles.length === 0) throw new Error(`No data found for month ${monthIndex}`);
  const filePath = path.join(folder, monthFiles[0]);
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return { filePath, data };
}

// === ROUTES ===

// Root
app.get("/", (req, res) => {
  res.json({
    message: "🏦 Welcome to the Bank Statement API",
    available_routes: {
      years: "/api/years",
      months: "/api/months/:year",
      month_data: "/api/transactions/:year/:monthIndex",
      year_data: "/api/all/:year",
    },
  });
});

// Get all available years
app.get("/api/years", (req, res) => {
  try {
    const years = getAvailableYears();
    if (years.length === 0) return res.status(404).json({ message: "No year data found." });
    res.json({ available_years: years });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch available years" });
  }
});

// Get months for a specific year
app.get("/api/months/:year", (req, res) => {
  const { year } = req.params;
  try {
    const months = getAvailableMonths(year);
    if (months.length === 0)
      return res.status(404).json({ message: `No months found for year ${year}` });
    res.json({ year, available_months: months });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch months" });
  }
});

// Get transactions for specific month (with optional filters)
app.get("/api/transactions/:year/:monthIndex", (req, res) => {
  const { year, monthIndex } = req.params;
  const { category, type, bank, minAmount, maxAmount } = req.query;

  try {
    const { filePath, data } = readMonthFile(year, monthIndex);

    // Filtering
    let filtered = data;
    if (category)
      filtered = filtered.filter(
        (t) => t.category.toLowerCase() === category.toLowerCase()
      );
    if (type)
      filtered = filtered.filter((t) => t.type.toLowerCase() === type.toLowerCase());
    if (bank)
      filtered = filtered.filter((t) => t.bank.toLowerCase() === bank.toLowerCase());
    if (minAmount)
      filtered = filtered.filter((t) => parseFloat(t.amount) >= parseFloat(minAmount));
    if (maxAmount)
      filtered = filtered.filter((t) => parseFloat(t.amount) <= parseFloat(maxAmount));

    res.json({
      file: path.basename(filePath),
      year,
      monthIndex,
      total_transactions: filtered.length,
      filters_applied: { category, type, bank, minAmount, maxAmount },
      transactions: filtered,
    });
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ error: err.message });
  }
});

// Get all transactions for a year
app.get("/api/all/:year", (req, res) => {
  const { year } = req.params;
  try {
    const folder = path.join(BASE_DIR, `bank_statements_${year}`);
    if (!fs.existsSync(folder)) throw new Error(`Data not found for year ${year}`);

    const files = fs.readdirSync(folder).filter((f) => f.endsWith(".json"));
    if (files.length === 0) throw new Error(`No transaction files found for ${year}`);

    let allTx = [];
    files.forEach((file) => {
      const data = JSON.parse(fs.readFileSync(path.join(folder, file), "utf8"));
      allTx.push(...data);
    });

    res.json({
      year,
      total_months: files.length,
      total_transactions: allTx.length,
      transactions: allTx,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

// === Start server ===
app.listen(PORT, () => {
  console.log(`✅ Bank Statement API running on http://localhost:${PORT}`);
});
