import LogoImg from "../assets/logo.jpg"
import Button from "./UI/Button";
const Header = ()=>{
    return(
   
       <header id = "main-header">
        <div id="title">
        <img src={LogoImg}/>
        <h1>GharKaJayeka</h1>
        </div>
         <nav>
           <Button textOnly>Cart</Button>
         </nav>
       </header>
    )
}

export default Header;