import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool();

try {
  const res = await pool.query("SELECT NOW()");

  console.log(res.rows, "database connected");
} catch (error) {
  console.log(error);
}
