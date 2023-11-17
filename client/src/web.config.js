const path = require('path')
module.exports = {
    mode: "development",
    entry: './scr/App.js',
    devServer:{
        contentBase:path.join(__dirname,'build'),
        compress:true,
        port:3000
    }
}