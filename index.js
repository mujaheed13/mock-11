const express = require("express");
const cors = require("cors");
const { connection } = require("./configs/mongoose.connection.js");
const { noticeRouter } = require("./routes/notice.route.js");
require("dotenv").config();

const app = express();


app.use(cors());
app.use(express.json());
app.use("/notice", noticeRouter);

app.get("/", (req, res)=>{
    res.send("Trello Board");
})

const PORT = process.env.PORT || 5050;

app.listen(PORT, async ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log("Error while connecting to DB", error);
    }
})