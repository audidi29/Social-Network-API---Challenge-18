// const express = require('express');
// const mongoose = require('mongoose');
// const express = require('express');
// const db = require('./config/connection');
// const routes = require("./routes")
// const app = express();
// const port = process.env.PORT || 3002;

// // Connect to MongoDB 
// mongoose.connect('mongodb://localhost/social_network_db', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
// })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('MongoDB connection error:', error);
//   });

// // Middleware to parse JSON requests
// app.use(express.json());

// // Import your routes
// const thoughtRoutes = require('./routes/thoughtRoutes'); // Adjust the path accordingly
// const userRoutes = require('./routes/userRoutes'); // Adjust the path accordingly

// // Use the imported routes
// app.use('/thoughts', thoughtRoutes); // Prefix thought routes with '/thoughts'
// app.use('/users', userRoutes); // Prefix user routes with '/users'
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(routes);
// app.get("/ping", (req, res)=> {res.status(200).json({})})

// db.once('open', () => {
//     app.listen(PORT, () => {
//       console.log(`API server running on port ${PORT}!`);
//     });
//   });

// // Start the server
// // app.listen(port, () => {
// //   console.log(`Server is running on port ${port}`);
// // });

const express = require('express');
const db = require('./config/connection');
const routes = require("./routes")


const PORT = 3002;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.get("/ping", (req, res)=> {res.status(200).json({})})

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });
  