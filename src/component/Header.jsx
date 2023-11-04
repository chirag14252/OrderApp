import LogoImg from "../assets/logo.jpg"
const Header = ()=>{
    return(
   
       <header id = "main-header">
        <div id="title">
        <img src={LogoImg}/>
        <h1>GharKaJayeka</h1>
        </div>
         <nav>
            <button>Cart (0)</button>
         </nav>
       </header>
    )
}

export default Header;