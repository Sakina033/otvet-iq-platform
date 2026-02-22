import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/Home";
import QuestionPage from "./pages/QuestionPage";
import AllQuestionPage from "./pages/AllQuestionsPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const getUserFromLS = () => {
    try {
      const item = localStorage.getItem("user");
      return item ? JSON.parse(item) : null;
    } catch (e) {
      return null;
    }
  };
  
  const user = getUserFromLS();

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/allQuestions" replace /> : <Home />} />
        <Route path="/login" element={user ? <Navigate to="/allQuestions" replace /> : <LoginPage />} />
        <Route path="/register" element={user ? <Navigate to="/allQuestions" replace /> : <RegisterPage />} />
        <Route path="/questionPage" element={user ? <QuestionPage /> : <Navigate to="/" replace />} />
        <Route path="/allQuestions" element={user ? <AllQuestionPage /> : <Navigate to="/" replace />} />
        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;