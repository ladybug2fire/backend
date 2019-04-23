var treeData = require("../models/treeData.js");
var express = require('express')
var router = express.Router()

// 查询当前用户的订单
router.get('/get', function(req, res){
    Order.find().sort({"_id":-1}).exec(function(err, result){
        if(err){
            res.json({
                code: 500,
                msg: err,
            })
        }else{
            res.json({
                code: 200,
                msg: '获取成功',
                data: result,
            })
        }
        
    })
})

// 下单
router.post('/save', function(req, res) {
    console.log(req.body)
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
})



module.exports = router;