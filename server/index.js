const express = require('express');
const app = express();
const db = require('./models')
const orderRouter = require('./router/route')
const adminRouter = require('./router/adminRoute')
const cors = require('cors');
var corsOption = {
  origin: 'http://localhost:3001'
}
app.use(cors(corsOption));
app.use(express.urlencoded({ extended:true }));
app.use(express.json());

app.set('port', (process.env.PORT || 3001));

app.use('/api/order/', orderRouter);

// Admin Login route.
app.use('/api/admin/', adminRouter);

db.sequelize.sync({force:false}).then(() => {
  app.listen(app.get('port'), () => {
    console.log("Node server running at port 3001")
  })
})
