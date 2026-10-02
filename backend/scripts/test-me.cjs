require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
if (!secret) {
  console.error("No JWT_SECRET in .env");
  process.exit(1);
}

const token = jwt.sign({ id: 1 }, secret, { expiresIn: "30d" });

async function main() {
  const res = await fetch("http://127.0.0.1:1337/api/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const text = await res.text();
  console.log("status", res.status);
  console.log("body", text);
}

main().catch(console.error);
