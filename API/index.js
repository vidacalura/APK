const routes = require("./routes/routes");

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors({ origin: [ "https://apk.onrender.com/", "http://localhost:5000" ] }));

app.use("/api", routes);


app.listen(port);