import fs from 'node:fs/promises';
import bodyParser from 'body-parser';
import express from "express";
import path from "path";
import cors from "cors";
import shortid from "shortid";
import razorpay from "razorpay";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());



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

app.post("/razorpay",async (req,res)=>{
  const payment_capture = 1;
  const amount = 2;
  const currency = 'INR';
const option = {
  amount: amount *100,
  currency:currency,
  receipt: shortid.generate(),
  payment_capture
};
  try{
   const response = await razorpayInstance.orders.create(option);
   console.log(response);
     res.json({
      id:response.id,
      currency:response.currency,
      amount:response.amount
     })
  }
  catch(error){
   console.log (error);
  }

})

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/meals', async (req, res) => {
  const meals = await fs.readFile('./data/available-meals.json', 'utf8');
  res.json(JSON.parse(meals));
});

app.post('/orders', async (req, res) => {
  const orderData = req.body.order;

  if (orderData === null || orderData.items === null ) {
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

app.listen(3000,()=>{
  console.log("server is running at port : 3000")
});
