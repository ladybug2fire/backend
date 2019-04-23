var TreeData = require("../models/treeData.js");
var Model = require("../models/model.js");
var Scheme = require("../models/scheme.js");
var Matrix = require("../models/matrix.js");
var express = require("express");
var router = express.Router();

// 查询当前用户的订单
router.get("/get", async function(req, res) {
  if (req.query.id) {
      const id = req.query.id;
      const matrix = await Matrix.find({modelid: id})
      const scheme = await Scheme.find({modelid: id})
      const treeData = await TreeData.find({modelid: id})
      const model = await Model.find({modelid: id})
      res.json({
          code: 200,
          data:{
              model,
              scheme,
              matrix,
              treeData,
          }
      })
  } else {
    const result = await Model.find()
      .sort({ _id: -1 })
      .exec();
    res.json({
      code: 200,
      data: result
    });
  }
});

// 下单
router.post("/save", async function(req, res) {
  const body = req.body;
  const isFind = await Model.findOne({ modelid: body.modelid });
  if (!isFind) {
    res.json({
      code: 500,
      msg: "已经有了"
    });
  }
  let tree = new TreeData({
    modelid: body.modelid,
    data: body.treeData
  });
  let model = new Model({
    modelid: body.modelid,
    name: body.name
  });
  let scheme = new Scheme({
    modelid: body.modelid,
    data: body.scheme
  });
  let matrix = new Matrix({
    modelid: body.modelid,
    data: body.matrix
  });
  try {
    const result = await Promise.all([
      tree.save(),
      model.save(),
      scheme.save(),
      matrix.save()
    ]);
    res.json({
      code: 200,
      msg: "保存成功"
    });
  } catch (err) {
    console.log(err);
    res.json({
      code: 500,
      msg: err
    });
  }

  // let order = new Order(req.body);
  // console.log(order);
  // order.save(function(err, result2) {
  //     if (err) {
  //         res.json({
  //         code: 500
  //         });
  //     } else {
  //         res.json({
  //         code: 200,
  //         msg: "下单成功"
  //         });
  //     }
  // });
});

module.exports = router;
