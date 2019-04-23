var mongoose = require('../config/db'),
    Schema = mongoose.Schema;

var treeSchema = new Schema({
    modelid: String,
    treeData: String, //转成String  方便处理 
});

module.exports = mongoose.model('treeData',treeSchema);