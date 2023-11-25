import mongoose from "mongoose";
import app from "./app";
import config from "./config";

main().catch((err) => console.log(err));

async function main() {
  try {
    const response = await mongoose.connect(`${config.database_url}`);

    app.listen(config.port, () => {
      console.log(response, "response");
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
