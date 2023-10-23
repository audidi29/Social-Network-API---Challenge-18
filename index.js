const express = require('express');
const userRoutes = require('./routes/userRoutes.js'); 
const thoughtRoutes = require('./routes/thoughtRoutes'); 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 3002; // Match the port number in server.js

mongoose.connect('mongodb://localhost/social_network_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());



app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);
// app.use('/', (req, res) => {
//   res.send("/");
// });
app.use('/',(req,res)=>{
  res.send(
    "/"
  )
})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

