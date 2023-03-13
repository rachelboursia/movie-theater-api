const express = require("express");
const app = express();
const {db} = require("./db");
const seedData = require("./seed");

const showsRoute = require("./routes/shows");
const usersRoute = require("./routes/users");

const port = 3000;

app.use(express.json());

app.use("/shows", showsRoute);
app.use("/users", usersRoute);

seedData();

app.listen(port, () => {
    db.sync();
    console.log(`Listening on port ${port}`);
});