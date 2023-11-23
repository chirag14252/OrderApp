import axios from "axios"


const submitHndler = (e)=>{
    e.preventDefault();
    const fd = new FormData(e.target);
    const reqBody = Object.fromEntries(fd.entries());
    
}

const Login=()=>{
    return(
        <form onSubmit={submitHndler}>
           




        </form>

    )
}