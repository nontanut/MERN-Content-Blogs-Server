const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");

require("dotenv").config();
const blogRoute = require("./routes/blog");
const authRoute = require("./routes/auth");
const uploadRoute = require("./routes/upload");

const app = express();

//connect cloude database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser:true,
    useUnifiedTopology:false
}).then(() => console.log("เชื่อมต่อเรียบร้อย"))
.catch((err) => console.log(err));

// middleware
app.use(express.json()); // ส่งjson กับไปหา client
app.use(cors());
app.use(morgan("dev"));
app.use(fileUpload({useTempFiles: true}));

// route
app.use("/api", blogRoute);
app.use("/api", authRoute);
app.use("/api", uploadRoute);

const port = process.env.PORT || 8080;
app.listen(port,() => console.log(`start server in port ${port}`));