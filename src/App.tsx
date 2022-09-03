import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { About } from "./pages/About";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Store } from "./pages/Store";
import { Navbar } from "./components/Navbar";
import { ShopingContextProvider } from "./context/ShoppingCartContext";

function App() {
  return (
    <ShopingContextProvider>
      <Navbar />
      <Container className="mt-2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </ShopingContextProvider>
  );
}

export default App;
