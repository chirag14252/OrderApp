

const register = async (req,res)=>{
    console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password, 10);
    const passLen = req.body.password.length;
    if (!name || !email || !passLen) {
      return res.status(400).json({
        message: "fill all the details properly"
      })
    }
    //already present email
  
    userModal.findOne({ name: name }).
      then((data, err) => {
        if (data) {
          //if already present , data is returned
          return res.json({
            message: "this user is unavailable"
          })
        }
        else {
          userModal.create({
            name: name,
            email: email,
            password: password
          }).then((data, err) => {
            if (data) {
              return res.status(201).json({
                message: "user successfully registered",
                data: data
              })
            }
          })
        }
      })
}

export default register;