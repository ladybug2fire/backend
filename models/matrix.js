var mongoose = require('../config/db'),
    Schema = mongoose.Schema;

var matrixSchema = new Schema({
    modelid: String,
    data: String, 
});

module.exports = mongoose.model('matrix',matrixSchema);