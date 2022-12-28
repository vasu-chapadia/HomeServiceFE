import React from "react";
import GlobalStyles from "styles/GlobalStyles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/store/store";
import tw from "twin.macro";

import LandingPage from "LandingPage.js";
import Login from "../src/pages/Login";
import SignUp from "pages/Signup";
import CategoriesPage from "pages/CategoriesPage";
import SingleCategoryPage from "pages/SingleCategoryPage";
import MainHeader from "components/headers/main";
import MiniCenteredFooter from "components/footers/MiniCenteredFooter";
import AboutUs from "pages/AboutUs";
import ContactUs from "pages/ContactUs";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const Container = tw.div`relative -mx-8 -mt-8 mr-8 xl:pl-10 pt-12`;

//Frontend endPoint
export default function App() {
  return (
    <>
      <GlobalStyles />
      <Provider store={store}>
        <Container>
          <MainHeader />
        </Container>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/category/:id" element={<SingleCategoryPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </Router>
        <MiniCenteredFooter />
      </Provider>
    </>
  );
}
