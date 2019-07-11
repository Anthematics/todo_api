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

app.post('/api/v1/thermostats/',(req,res) => {
  if (!req.body.deviceName) {
    return res.status(400).send({
      success: 'false',
      message: 'no device name specified'
    });
    } else if (!req.body.deviceType) {
      return res.status(400).send({
        success: 'false',
        message: 'no device type specified'
      });
    } else if (!req.body.modelNumber) {
      return res.status(400).send({
        success: 'false',
        message: 'no model number specified'
      });
    } else if (!req.body.productCode) {
      return res.status(400).send({
        success: 'false',
        message: 'No given product code'
      })
    } else if (!req.body.serialNumber) {
      return res.status(400).send({
        success:'false',
        message: 'No given serial number'
      })
    } else if (!req.body.registered) {
      return res.status(400).send({
        success: 'false',
        message: 'unsure if registered'
      })
    } else if (!req.body.room) {
      return res.status(400).send({
        success: 'false',
        message: 'not given a room'
      })
    } else if (!req.body.address) {
      return res.status(400).send({
        success: 'false',
        message: 'please provide address'
      })
    } else if (!req.body.postalCode) {
      return res.status(400).send({
        success: 'false',
        message: 'no postal code / zip code given'
      })
    }
    const thermostat = {
      id: db.length +1,
      deviceName: req.body.deviceName,
      modelNumber: req.body.modelNumber,
      productCode: req.body.productCode,
      serialNumber: req.body.serialNumber,
      registered: req.body.registered,
      room: req.body.room,
      address: req.body.address,
      postalCode: req.body.postalCode
    }
  db.push(thermostat);
  return res.status(201).send({
    success: 'true',
    message: 'thermostat added successfully',
    thermostat
  })
  });


// deviceName: "Jason's ecobee the first.",
// deviceType: "thermostat",
// modelNumber: "APOLLO_SMART",
// productCode: "1H",
// serialNumber: "511898777555",
// registered: true,
// room: "Kitchen",
// address: "235 Acton Avenue",
// postalCode: "M3H4H9"


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
