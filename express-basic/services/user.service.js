import { pool } from "../database/index.js";

async function createUser(name, lastname, email, password_hash, id_google) {
  const query = {
    text: "INSERT INTO users(name, lastname, email, password_hash, id_google) VALUES($1, $2, $3, $4, $5) returning *",
    values: [name, lastname, email, password_hash, id_google],
  };

  const result = await pool.query(query);

  return result.rows[0];
}

async function getOneUser(email, id) {
  const query = {
    name: "fetch-user",
    text: "SELECT id ,name, lastname, email FROM users WHERE email = $1 OR id = $2",
    values: [email, id],
  };

  const result = await pool.query(query);

  return result.rows[0];
}

export default { createUser, getOneUser };
