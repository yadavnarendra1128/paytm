const express = require("express");
const { authenticateToken } = require("../middleware");
const { Account,User } = require("../db");
const { mongoose } = require("mongoose");

const router = express.Router();

router.get("/balance", authenticateToken, async (req, res) => {
  const account = await Account.findOne({userId: req.userId,});
  res.json({
    balance: account.balance,
  });
});

router.post('/transfer', authenticateToken, async (req,res)=>{
  const session = await mongoose.startSession();

  session.startTransaction();
  const {amount, to} = req.body;
  const account = await Account.findOne({ userId: req.userId }).session(session);
  if(!account || account.balance < amount || amount<0){
    await session.abortTransaction();
    return res.status(400).json({msg:'Sorry balance is too low', balance: account.balance})
  }
  const toPerson = await Account.findOne({ userId: to }).session(session);
  const toPersonInfo = await User.findOne({ _id: to }).session(session);
  if(!toPerson){
    await session.abortTransaction();
    return res.status(400).json({msg:'Account not found'})
  }

  await Account.updateOne({userId: req.userId,},{$inc : {balance: -amount}}).session(session)
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);
  await session.commitTransaction();
  const acc = await Account.findOne({ userId: req.userId })
  res
    .status(200)
    .json({
      msg: "Transfered successfully",
      toEmail: toPersonInfo.username,
      to: toPersonInfo.firstName + " " + toPersonInfo.lastName,
      balance: acc.balance})
})

module.exports = router;