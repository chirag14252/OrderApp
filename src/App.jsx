import Header from "./component/Header";
import Food from "./component/Food";
import {CardContextProvider} from "./store/CartContext.jsx"
import { UserProgressContextProvider } from "./store/userProgressContext";
import Cart from "./component/Cart";

function App() {
  return (
     <UserProgressContextProvider>
     <CardContextProvider>
      <Header/>
      <Food/>
      <Cart/>
      </CardContextProvider>
     </UserProgressContextProvider>
  );
}

export default App;
