import { React } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import MyQuestions from "../pages/MyQuestions";
import NotFound from "../pages/NotFound";
import PostQuestion from "../pages/PostQuestion";
import QuestionWithAnswers from "../pages/QuestionWithAnswers";
import UserDashboard from "../pages/UserDashboard";

const RouteProvider = () => {
  const authState = useSelector(state => state.authReducer);
  const { isLoggedIn, loading } = authState;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={isLoggedIn || loading ? <UserDashboard /> : <NotFound />} />
          <Route path="/questions/ask" element={isLoggedIn || loading ? <PostQuestion /> : <NotFound />} />
          <Route path="/questions/me" element={isLoggedIn || loading ? <MyQuestions /> : <NotFound />} />
          <Route path="/questions/:qslug" element={<QuestionWithAnswers />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default RouteProvider