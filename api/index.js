var TreeData = require("../models/treeData.js");
var Model = require("../models/model.js");
var Scheme = require("../models/scheme.js");
var Matrix = require("../models/matrix.js");
var express = require("express");
var router = express.Router();

router.get("/get", async function(req, res) {
  if (req.query.id) {
    const id = req.query.id;
    try {
      const matrix = await Matrix.findOne({ modelid: id });
      const scheme = await Scheme.findOne({ modelid: id });
      const treeData = await TreeData.findOne({ modelid: id });
      const model = await Model.findOne({ modelid: id });
      res.json({
        code: 200,
        data: {
          model,
          scheme,
          matrix,
          treeData
        }
      });
    } catch (err) {
      res.json({
        code: 500,
        msg: err.message
      });
    }
  } else {
    try {
      const result = await Model.find()
        .sort({ _id: -1 })
        .exec();
      res.json({
        code: 200,
        data: result
      });
    } catch (err) {
      res.json({
        code: 500,
        msg: err.message
      });
    }
  }
});

router.get('/del', async function(req, res){
  const id = req.query.id;
  try {
    await Promise.all([
      TreeData.remove({modelid: id}),
      Model.remove({modelid: id}),
      Scheme.remove({modelid: id}),
      Matrix.remove({modelid: id}), 
    ])
    res.json({
      code: 200,
    });
  }catch(err){
    console.log(err)
    res.json({
      code: 500,
      msg: err
    });
  }
})

router.post("/save", async function(req, res) {
  const body = req.body;
  const isFind = await Model.findOne({ modelid: body.modelid });
  if (isFind) {
    await Promise.all([
        TreeData.remove({modelid: body.modelid}),
        Model.remove({modelid: body.modelid}),
        Scheme.remove({modelid: body.modelid}),
        Matrix.remove({modelid: body.modelid}),
    ])
  }
  let tree = new TreeData({
    modelid: body.modelid,
    data: body.treeData
  });
  let model = new Model({
    modelid: body.modelid,
    name: body.name,
    createTime: new Date(),
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
});

module.exports = router;
