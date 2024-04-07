import { pool } from "../database/index.js";

async function createPost(content, user_id) {
  const query = {
    text: "INSERT INTO posts(content, user_id) VALUES($1, $2) returning *",
    values: [content, user_id],
  };

  const result = await pool.query(query);

  return result;
}

async function getPosts() {
  const result = await pool.query(
    "select u.name, u.lastname, p.* from posts p inner join users u on p.user_id=u.id order by p.creation_date "
  );

  return result.rows;
}

async function updatePost(id, userId, data) {
  let keys = [];
  let values = [];
  let count = 1;
  for (let g in data) {
    keys.push(`${g}=$${count}`);
    values.push(data[g]);
    count++;
  }

  const query = {
    // give the query a unique name
    name: "update-post",
    text: `UPDATE posts SET ${keys.join(",")} WHERE id = $${
      values.length + 1
    } AND user_id=$${values.length + 2} RETURNING *`,
    values: [...values, id, userId],
  };

  const result = await pool.query(query);

  return result;
}

async function deletePost(id, userId) {
  const query = {
    name: "delete-post",
    text: "DELETE FROM posts WHERE id = $1 and user_id = $2",
    values: [id, userId],
  };

  const result = await pool.query(query);

  return result;
}

export default { createPost, getPosts, deletePost, updatePost };
