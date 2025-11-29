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

  return {
    goTo,
    goToLogin,
    goToRegister,
    goHome,
    goMainContent,
    goQuestionPage,
  };
};

export default useNavigateTo;
