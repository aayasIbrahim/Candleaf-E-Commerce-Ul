
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";


export default function MainLayOut() {
  return (
    <>
      <Navbar/>
      <main >
        <Outlet />
      </main>
      <Footer/>
    </>
  );
}