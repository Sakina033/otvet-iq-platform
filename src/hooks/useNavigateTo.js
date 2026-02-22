import { useNavigate } from "react-router-dom";

const useNavigateTo = () => {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const goToRegister = () => {
    navigate("/register");
  };

  const goHome = () => {
    navigate("/");
  };

  const goMainContent = () => {
    navigate("/mainContent");
  };

  const goQuestionPage = () => {
    navigate("/questionPage");
  };

  const goAllQuestionsPage = () => {
    navigate("/allquestions");
  };

  const goProfilePage = () => {
    navigate('/profile');
  }

  return {
    goTo,
    goToLogin,
    goToRegister,
    goHome,
    goMainContent,
    goQuestionPage,
    goAllQuestionsPage,
    goProfilePage,
  };
};

export default useNavigateTo;
