const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "..", ".tmp", "data.db");
const db = new Database(dbPath, { readonly: true });

const users = db
  .prepare(
    "SELECT id, email, username, system_role, confirmed, blocked FROM up_users LIMIT 10",
  )
  .all();
console.log("users:", JSON.stringify(users, null, 2));

try {
  const perms = db
    .prepare(
      `SELECT p.action, r.type AS role_type, r.name
       FROM up_permissions p
       JOIN up_permissions_role_lnk prl ON p.id = prl.permission_id
       JOIN up_roles r ON r.id = prl.role_id
       WHERE p.action LIKE '%user%' OR p.action LIKE '%me%'`,
    )
    .all();
  console.log("user-related perms:", JSON.stringify(perms, null, 2));
} catch (e) {
  console.log("perm query failed", e.message);
}

db.close();
