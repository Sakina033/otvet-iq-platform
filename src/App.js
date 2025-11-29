import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/Home";
import QuestionPage from "./pages/QuestionPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchQuestionsFromFirestore } from "./store/slices/questionsSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuestionsFromFirestore());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/questionPage" element={<QuestionPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
