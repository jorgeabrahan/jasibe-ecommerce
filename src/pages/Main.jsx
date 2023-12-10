import { Outlet } from "react-router-dom";
import { Navbar } from "../global/Navbar";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { getCategories, getTargetAudiences } from "../cosmic";
import { productStore } from "../stores";
import { getMostRecentProducts, getProducts } from "../cosmic/products";

export const Main = () => {
  const { setRecentProducts, setCategories, setTargetAudiences, setProducts } = productStore(store => store)
  useEffect(() => {
    getCategories().then((categories) => setCategories(categories))
    getTargetAudiences().then((targetAudiences) => setTargetAudiences(targetAudiences))
    getProducts().then(products => setProducts(products))
    getMostRecentProducts().then(recentProducts => setRecentProducts(recentProducts))
  }, [setCategories, setTargetAudiences, setProducts, setRecentProducts])
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Navbar />
      <Outlet />
    </>
  );
}
