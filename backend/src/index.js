const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const mongo_uri = process.env.MONGO_URI;
const authRoutes = require('./routes/auth');
const port = process.env.PORT || 3000;

mongoose.connect("mongodb+srv://rehanemigan:Rehane22@readtime.kwbygcq.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

mongoose.connection.on('connected',()=>{
  console.log("connected to mongo")
})
mongoose.connection.on('error',(error)=>{
  console.log("Not connected to mongo", error )
})

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});