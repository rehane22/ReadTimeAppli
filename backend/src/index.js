const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const mongo_uri = process.env.MONGO_URI;
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/book');
const personalLibraryRoutes = require('./routes/personalLibrary');


const port = process.env.PORT || 3000;

mongoose.connect(mongo_uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

mongoose.connection.on('connected',()=>{
  console.log(process.env.FRONT_END)
  console.log("connected to mongo")
})
mongoose.connection.on('error',(error)=>{
  console.log("Not connected to mongo", error )
})

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/book", bookRoutes);
app.use("/personalLibrary", personalLibraryRoutes); 

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});