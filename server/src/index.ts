// src/index.ts
import DBConnect from "./config/db";
import app from "./app";

if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT || 5002;
  DBConnect().then(() => {
    app.listen(port, () =>
      console.log(`Jabb server running on http://localhost:${port}`)
    );
  });
}
