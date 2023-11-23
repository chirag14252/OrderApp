import axios from "axios"
const submitHndler = async (e)=>{
e.preventDefault();
 const fd = new FormData(e.target);
 const reqBody = Object.fromEntries(fd.entries());
 const resp = await axios.post("http://localhost:3000/register",reqBody);
 console.log(resp);
}
const Register = ()=>{
    return(
      <form onSubmit={submitHndler}>
       <label htmlFor="name">Name:</label>
       <input type="text" id="name" name="name"/>
       <label htmlFor="email">Email:</label>
       <input type="email" id="email" name="email"/>
       <label htmlFor="password">Password:</label>
       <input type="text" id="password" name="password"/>
       <button type="submit">Submit</button>
      </form>
    )
}

export default Register;