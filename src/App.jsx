import Header from "./component/Header";
import Food from "./component/Food";
import {CardContextProvider} from "./store/CartContext.jsx"
import { userProgressContextProvider } from "./store/userProgressContext";
import Cart from "./component/Cart";

function App() {
  return (
     <userProgressContextProvider>
     <CardContextProvider>
      <Header/>
      <Food/>
      <Cart/>
      </CardContextProvider>
     </userProgressContextProvider>
  );
}

export default App;
