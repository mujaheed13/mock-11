const express = require("express");
const { NoticeModel } = require("../models/notice.model.js");
const noticeRouter = express.Router();

noticeRouter.get("/", async (req, res)=>{
    try {
        const notices = await NoticeModel.find();
        res.status(200).send(notices);
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: error.message || error});
    }
})

noticeRouter.post("/", async (req, res)=>{
    const {authorName, noticeTitle, noticeDescription} = req.body;
    const date = new Date;
    try {
        if(!authorName || !noticeTitle || !noticeDescription){
            res.status(400).send({msg: "Some fields are missing"});
            return;
        }
        const notice = new NoticeModel({authorName, noticeTitle, noticeDescription, date})
        await notice.save();
        res.status(201).send({msg: "Notice added"});
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: error.message || error});
    }
})

noticeRouter.patch("/:id", async (req, res)=>{
    const {id} = req.params;
    const payload = req.body;
    try {
        await NoticeModel.findByIdAndUpdate(id, payload);
        res.status(200).send({msg: "Notice updated"});
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: error.message || error});
    }
})

noticeRouter.delete("/:id", async (req, res)=>{
    const {id} = req.params;
    try {
        await NoticeModel.findByIdAndDelete(id);
        res.status(200).send({msg: "Notice deleted"});
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: error.message || error});
    }
})

module.exports = { noticeRouter }