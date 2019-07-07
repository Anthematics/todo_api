import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.get('/api/v1/thermostats',(req,res) => {
  res.status(200).send({
    success:'true',
    message: 'Thermostats retrieved successfully',
    thermostats: db
  })
})

app.get('/api/v1/thermostats/:id', (req,res) => {
  const id = parseInt(req.params.id,10)

  db.map((thermostat) => {
    if (thermostat.id === id) {
      return res.status(200).send({
        success: 'true',
        message: 'successful',
        thermostat
      });
    }
  });
  return res.status(404).send({

    success: 'false',
    message: 'does not exist in the system'
  });
});



app.delete('/api/v1/thermostats/:id', (req,res) => {
const id = parseInt(req.params.id,10)

db.map((thermostat,index) => {
  if (thermostat.id === id) {
    db.splice(index, 1);
    return res.status(200).send({
      success: 'true',
      message: 'Thermostat removed'
    })
  }
});
  return res.status(404).send({
    success: 'false',
    message: 'thermostat not found'
  })

})


const PORT = 5000

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})

/*Now we can go to postman and test our endpoint, postman is an application we use to test our endpoints. you can download postman here.
To test the endpoint we’ll go to localhost:5000/api/v1/todos. */