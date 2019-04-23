var mongoose = require('../config/db'),
    Schema = mongoose.Schema;

var modelSchema = new Schema({
    modelid: String,
    name: String, 
    createTime: Date,
});

module.exports = mongoose.model('model',modelSchema);