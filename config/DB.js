const {connect} = require("mongoose");
exports.dbConnection = ()=>{
  connect(process.env.MONGO_URL).then((connect)=>{
    console.log(`Success connect to database: ${connect.connection.host}`);
  })
}