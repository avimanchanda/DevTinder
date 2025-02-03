const mongoose = require('mongoose');

async function connectdb() {
    await mongoose.connect('mongodb+srv://avimanchanda0802:Aarav1234@cluster0.ra17tsp.mongodb.net/devTinder')

}


module.exports = {
    connectdb: connectdb
}