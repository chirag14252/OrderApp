import userModal from "../modals/userDetailsModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


const tokenGeneration = (user_id) => {
    const token = jwt.sign({ data: user_id }, 'secret', { expiresIn: '1hr' });
    return token;
  }
  
const loginController = async (req,res)=>{
    console.log(req.body);
  const username = req.body?.name;
  const password = req.body?.password;
  if (!username) {
    return res.status(400).json({
      message: "pls fill the detail properly"
    })
  }

  userModal.findOne({ name: username }).then((data, err) => {
    if (data) {
      const isPassword = bcrypt.compareSync(password, data.password);
      if (isPassword) {
        return res.status(200).json({
          message: "you are login successfully",
          token:tokenGeneration(data._id)
        })
      }
      else {
        return res.status(400).json({
          messsge: "invalid password"
        })
      }
    }
    else {
      return res.status(400).json({
        message: "invalid username"
      })
    }
  })
}

export default loginController;