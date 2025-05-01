import { Server } from "http";
import app from "./app";

const port = 5000;

app.listen(port, () => {
  console.log("GreeM server is listening on port", port);
});

async function main() {
  const server: Server = app.listen(port, () => {
    console.log("GreeM Server is running on port", port);
  });
}

main();
