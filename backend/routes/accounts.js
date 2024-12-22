const express = require("express");
const { authenticateToken } = require("../middleware");
const { Account } = require("../db");
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
  const account = await Account.findOne({userId: req.userId},{session})
  if(!account || account.balance < amount || amount<0){
    await session.abortTransaction();
    return res.status(400).json({msg:'Sorry balance is too low', balance: account.balance})
  }
  const toPerson = await Account.findOne({ userId: to }, { session });
  if(!toPerson){
    await session.abortTransaction();
    return res.status(400).json({msg:'Account not found'})
  }

  await Account.updateOne({userId: req.userId,},{$inc : {balance: -amount}},{session})
  await Account.updateOne({userId: to,},{$inc: {balance: amount}},{session})
  await session.commitTransaction();
  res.status(200).json({msg:'Transfered successfully'})
})

module.exports = router;