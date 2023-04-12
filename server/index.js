const express = require('express');
const app = express();
const db = require('./models')
const orderRouter = require('./router/route')
const adminRouter = require('./router/adminRoute')
const cors = require('cors');

app.use(express.json());
app.use(cors({origin:['http://localhost:3001']}));
app.use(express.urlencoded({ extended: false, parameterLimit: 100000 }));
app.set('port', (process.env.PORT || 3001));
app.use('/api/order/', orderRouter);

app.use(function(req,res,next){
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  next();
});

// Admin Login route.
app.use('/api/admin/', adminRouter);

db.sequelize.sync({force:false}).then(() => {
  app.listen(app.get('port'), () => {
    console.log("Node server running at port 3001")
  })
})
