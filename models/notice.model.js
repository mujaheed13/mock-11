const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
    authorName: String,
    noticeTitle: String,
    noticeDescription: String,
    date: Date
});

const NoticeModel = mongoose.model("notice", noticeSchema);

module.exports = { NoticeModel }