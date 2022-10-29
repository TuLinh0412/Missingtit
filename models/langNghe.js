const mongoose = require("mongoose");

/**
 * @typedef {Object} langNghe Làng nghề
 * @property {String} name tên làng nghề
 * @property {String} history lịch sử làng nghề
 * @property {Date} founded_date thời gian hình thành
 * @property {String} origin nguồn gốc, tổ nghề
 * @property {String} golden_era giai đoạn nổi bật
 * @property {String} product sản phẩm
 */
langNgheSchema = new mongoose.Schema({
  _id: String,
  name: { type: String, required: true },
  address: { type: String, required: true },
  history: String,
  product: String,
  introduction: String,
  link1: String,
  link2: String,
  link3: String,
});
const LangNghe = mongoose.model("LangNghe", langNgheSchema);

// module.exports = LangNghe;
