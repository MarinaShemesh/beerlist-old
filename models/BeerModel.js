var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var beerSchema = new Schema({
  name: { type: String },
  style: { type: String },
  image_url: { type: String },
  abv: {type: Number},
  rating: [{ type: Number}],
  average: {type: Number}
});

var Beer = mongoose.model("Beer", beerSchema);
module.exports = Beer;
