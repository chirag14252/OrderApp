import fs from 'node:fs/promises';
import bodyParser from 'body-parser';
import express from "express";
import path from "path";
import cors from "cors";
import shortid from "shortid";
import razorpay from "razorpay";
import jwt from "jsonwebtoken";
import bcrypt, { compareSync } from "bcrypt"
import { fileURLToPath } from "url";
import { dirname } from "path";
import mongoose from 'mongoose';
import userModal from './modals/userDetailsModal.js';
import loginController from './controller/loginController.js';
import payment from './controller/payment.js';
import register from './controller/register.js';

const app = express();
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.json());
app.use(express.static('public'));
mongoose.connect("mongodb+srv://USER:X4YtymbjdkRYcfT5@atlascluster.nilxnts.mongodb.net/OrderApp?retryWrites=true&w=majority").then((res, err) => {
  if (res) {
    console.log("database connected");
  }
})



//initialize the credentials

const razorpayInstance = new razorpay({
  key_id: "rzp_test_4Eo3nivh6HgiYl",
  key_secret: "3FVTfpUpdhl024q35LUCzgFW"
});

app.get("/logo.png", async (req, res) => {
  try {
    // Use import.meta.url to get the current file's URL,
    // then convert it to the file path using fileURLToPath.
    const currentFilePath = fileURLToPath(import.meta.url);

    // Get the directory name using the dirname function.
    const currentDir = dirname(currentFilePath);

    // Create the path to the logo.png file.
    const imagePath = path.join(currentDir, "logo.jpg");

    // Send the file as a response
    res.sendFile(imagePath);
  } catch (error) {
    console.error("Error serving logo.png:", error);
    res.status(500).send("Internal Server Error");
  }
});


//register
//logic should be handled
app.post("/register",register)

 
//creating middlewares





const tokenGeneration = (user_id) => {
  const token = jwt.sign({ data: user_id }, 'secret', { expiresIn: '1hr' });
  return token;
}



//verify token
const verifyToken = (req,res,next)=>{
      //how to user verify token
       const tokenBearer = req.headers['Authorization'];
       const token = tokenBearer.split(' ')[1];
       jwt.verify(token,'secret',(err,decoded)=>{
        if(decoded){
            next();
        }
        if(err){
          return res.status(500).json({
            message:"some error occured"
          })
        }
       })
}






//each order will be associated with user_id for storin the data and unique 
// searching for that data.

app.post("/order",verifyToken,(req,res)=>{
  
return res.status(200).json({
  message: "data receieved"
})

})


//login
app.post("/login", loginController);
//payment 
app.post("/razorpay",payment)

app.get('/meals', async (req, res) => {
  const meals = await fs.readFile('./data/available-meals.json', 'utf8');
  res.json(JSON.parse(meals));
});

app.post('/orders', async (req, res) => {
  const orderData = req.body.order;

  if (orderData === null || orderData.items === null) {
    return res
      .status(400)
      .json({ message: 'Missing data.' });
  }

  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes('@') ||
    orderData.customer.name === null ||
    orderData.customer.name.trim() === '' ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === '' ||
    orderData.customer['postal-code'] === null ||
    orderData.customer['postal-code'].trim() === '' ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ''
  ) {
    return res.status(400).json({
      message:
        'Missing data: Email, name, street, postal code or city is missing.',
    });
  }

  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };
  const orders = await fs.readFile('./data/orders.json', 'utf8');
  const allOrders = JSON.parse(orders);
  allOrders.push(newOrder);
  await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
  res.status(201).json({ message: 'Order created!' });
});

app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Not found' });
});

app.listen(3000, () => {
  console.log("server is running at port : 3000")
});
