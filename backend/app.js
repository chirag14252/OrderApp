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
import getLogo from './controller/getLogo.js';
import dotenv from "dotenv";
import { orderRoute } from './Route/orderRouter.js';
dotenv.config();

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


//getting logo for payment
app.get("/logo.png",getLogo);


//register
app.post("/register",register)

 


//creating middlewares




//token generation



//verify token
const verifyToken = (req,res,next)=>{
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

//API  for crud operation in order details.
app.use("/order-details",orderRoute)







app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Not found' });
});

app.listen(3000, () => {
  console.log("server is running at port : 3000")
});


