var mongoose = require('../config/db'),
    Schema = mongoose.Schema;

var schemeSchema = new Schema({
    modelid: String,//模型id
    data: String,
});

module.exports = mongoose.model('scheme',schemeSchema);