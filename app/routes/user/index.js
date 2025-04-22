const express = require("express");
const app = express.Router();


app.use("/", require("./user.pages.routes"));
app.use("/contact",require("./contacts"))
app.use("/auth",require("./uaerauth.routes"))



// export the router
module.exports = app;