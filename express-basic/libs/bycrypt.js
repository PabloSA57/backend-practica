import bcrypt from "bcrypt";

export async function isValidPassword(password, passwordHash) {
  return await bcrypt.compare(password, passwordHash);
}

export function passwordHash(password) {
  return bcrypt.hashSync(password, Number.parseInt(10));
}
