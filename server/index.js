const express = require('express');
const app = express();
const db = require('./models');
const orderRouter = require('./routes/maintblroute');
const adminRouter = require('./routes/adminRoute');
const remarkRouter = require('./routes/remarkRoute');
const mailSendService = require('./services/front/mailSendService');

const cors = require('cors');
const coreOptions = {
  origin: "*",
}
app.use(express.json());
app.use(cors(coreOptions));
app.use(express.urlencoded({ extended: false, parameterLimit: 100000 }));
app.set('port', (process.env.PORT || 3001));

app.use(function(req,res,err,next){
  // res.statusCode = 200;
  res.locals.error = err;
  const status = err.status || 200;
  res.status(status);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  next();
});
app.options('/api/admin/', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.end();
});

app.options('/api/order/', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.end();
});


app.use('/api/order/', orderRouter);
// Admin Login route.
app.use('/api/admin/', adminRouter);

// Remark route.
app.use('/api/', remarkRouter);
// app.use('/api/order/', docUploadRouter);
app.use('/docs/', orderRouter);
app.get('/api/mailsend', mailSendService.mailSend)
// app.use('/api/order/', docUploadRouter);
db.sequelize.sync({force:false}).then(() => {
  app.listen(app.get('port'), () => {
    console.log("Node server running at port 3001")
  })
})
