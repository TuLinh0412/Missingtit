const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
// const LangNghe = require("./models/langNghe");
// const compression = require("compression");
// const helmet = require("helmet");
// const ErrorHandle = require("./ErrorHandle");

//bao ve khoi mot vai nguy hiem co ban
// app.use(helmet());
//nen file cho load nhanh hon
// app.use(compression());
//rút gọn đường dẫn đến thư mục
app.set("views", path.join(__dirname, "views"));
//lựa chọn cách kết xuất file (quên rồi, để search lại)
app.set("view engine", "ejs");
// lấy thông tin từ form (req.body)
app.use(express.urlencoded({ extended: true }));
//phải serve các file tĩnh như css như thế này thì mới được
// app.use('/public', express.static('public'));
app.use(express.static(__dirname + "/public"));

var uri =
  "mongodb+srv://quang:As12345678!@cluster0.ls4d36u.mongodb.net/langNghe?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.log.bind(console, "Mongodb connection error: "));

// mongoose
//   .connect("mongodb://localhost:27017/langNghe")
//   .then(() => {
//     console.log("mongo connected");
//   })
//   .catch((err) => {
//     console.log("OH nooo, error");
//     console.log(err);
//   });

const langNgheSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    address: { type: String, required: true },
    history: String,
    product: String,
    introduction: String,
    link1: String,
    link2: String,
    link3: String,
  },
  { collection: "langnghes" }
);
const LangNghe = mongoose.model("LangNghe", langNgheSchema);

// hàm xử lý async
function catchAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((e) => next(e));
  };
}

//home page
app.get(
  "/",
  catchAsync(async (req, res, next) => {
    const langNghes = await LangNghe.find().exec();
    console.log(langNghes);
    res.render("home", { langNghes: langNghes });
    // })
    // (req, res) => {
    //   LangNghe.find({}).then((langNghes) => {
    //     res.render("home", { langNghes });
    //   })
    //   .catch ((e)=> {
    //     console.log(e);
    //     res.send("error")
  })
  // }
);
//new page
app.get("/new", (req, res) => {
  res.render("new");
});

app.get(
  "/show/:id",
  catchAsync(async (req, res, next) => {
    const langNghes = await LangNghe.find();
    const { id } = req.params;
    const langNghe = await LangNghe.findById(id);
    if (!langNghe) {
      throw new Error("khong tim thay lang nghe");
    }
    res.render("show", { langNghe: langNghe, langNghes: langNghes });
  })
);

// tạo làng mới
app.post(
  "/",
  catchAsync(async (req, res, next) => {
    console.log(req.body);
    const newVillage = new LangNghe(req.body);
    await newVillage.save();
    res.redirect(`/${newVillage._id}`);
  })
);
//show 1 làng
// app.get(
//   "/:id",
//   catchAsync(async (req, res, next) => {
//     const { id } = req.params;
//     const village = await LangNghe.findById(id);
//     if (!village) {
//     //   throw new ErrorHandle("Khong tim thay lang nghe, 404");
//     }
//     res.render("show", { village });
//   })
// );

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

module.exports = app;
