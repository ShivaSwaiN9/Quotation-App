require("dotenv").config();
const express = require ("express");
const cors = require("cors");
// const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/db.config");
const connection = require("./config/db.config");
const sequelize = require("./config/db.config");


const app = express();
const PORT = process.env.PORT || 9876;

app.use(cors({
  origin: true,
  credentials: true
})); // Allowing cross origin access...

// app.use(cors({
//   origin: (origin, callback) => {
//     callback(null, true);
//   },
//   credentials: true
// })); // Allowing cross origin access...
app.use(express.json({ limit: '20mb' })); // Converting data to json format...
app.use(cookieParser()) // To parse cookie...
// app.use(bodyparser());
// app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

// -------------------------------------------------------

app.get("/",(req, resp)=>{
  resp.send('Welcome to Utkal Payroll API, GET method...')
})
.post("/", (req, resp)=>{
  resp.send({msg:"Welcome to Utkal Payroll API, POST method..."})
});
// Home page route above..
// ------------------------------------------------------w

app.use("/api/v1/inquiry", require("./routes/inquiry.route"));
app.use("/api/v1/customer", require("./routes/customer.route"));
app.use("/api/v1/quotation", require("./routes/quotation.route"));
// app.use("/api/v1/email", require("./routes/email.route"));



// ------------------------------------------------------

try {
  // -----Below code to connect mongoDB--------

  // dbConnect()
  // .then(()=>{
  //   app.listen(PORT, ()=>{
  //     console.log(`Server started on port http://localhost:${PORT}`);
  //   })
  // })

// -----Above code to connect mongoDB--------


//-------Below code to connect SQL--------

  // connection;
  // app.listen(PORT, ()=>{
  //   console.log(`Server started on port http://localhost:${PORT}`);
  // })

//-------Above code to connect SQL--------


// sequelize.authenticate()
// .then(()=>{
  // app.listen(PORT, ()=>{
  //   console.log(`Server started on port http://localhost:${PORT}`);
  // })
// })

} catch (error) {
  console.log(error);
}

const initiateConnection = async ()=>{
  try {
  // await sequelize.sync({ alter: true })
  await sequelize.sync({alter: true})
  .then(()=>{
    console.log('Connection has been established successfully.');
    app.listen(PORT, ()=>{
    console.log(`Server started on port http://localhost:${PORT}`);
  })
  })
  
 } catch (error) {
   console.error('Unable to connect to the database:', error);
 }
}

initiateConnection();