import { app, client } from "./app.js";
const port = 3001;

async function main() {
  await client.connect();
  app.listen(port, () => {
    console.log("example app listen: ", port);
  });
}

main();
