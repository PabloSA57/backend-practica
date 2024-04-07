import { pool } from "../database";

const findAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

const createUser = async (data) => {
  await pool.query("INSERT INTO ");
};

export const modelUsers = {
  findAllUsers,
};
