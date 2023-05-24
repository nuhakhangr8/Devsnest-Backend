const {Sequelize} = require("sequelize");

const createDB = new Sequelize ("test-db", "user","password" ,{
    dialect:"sqlite",
    host:"./config/db.sqlite"
})

const connectToDB =()=> {
    createDB.sync().then((res)=>{
    console.log("connected to DB")
})
.catch((e)=>{
    console.log("db connection failed",e)})
};

module.exports = {createDB, connectToDB};

    
