import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main, Account, Login, Home, Contact, Cart, ProductView, Conditions } from "./pages";

export const JasibeAppRouter = () => {
  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route element={<Main />}>
                <Route path="/iniciar-sesion" element={<Login />} exact />
                <Route path="/cuenta" element={<Account />} exact />
                <Route path="/contacto" element={<Contact />} exact />
                <Route path="/carrito" element={<Cart />} exact />
                <Route path="/terminos-y-condiciones" element={<Conditions />} exact />
                <Route path="/:product_slug" element={<ProductView />} exact />
                <Route path="/" element={<Home />} />
            </Route>
        </Routes>
    </BrowserRouter>
    </>
  );
}
