const express = require("express");
const { connectDB } = require("./utils/db");
const dotenv = require("dotenv");
const indexRouter = require("./routes/index.routes");
const apiRouter = require("./routes/api.routes");

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use("/", indexRouter);
app.use("/api", apiRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectDB();  // Llamamos a la conexión a la base de datos antes de arrancar el servidor
  console.log(`Server listening on port ${PORT}`);
});
