const Item = require("./Item")
const Trade = require("./Trade")
const User = require("./User")

User.hasMany(Trade, {

})

module.exports = {User, Item, Trade}