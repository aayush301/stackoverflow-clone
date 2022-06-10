import { React } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "../components/utils/Loader";
import EditAnswer from "../pages/EditAnswer";
import EditQuestion from "../pages/EditQuestion";
import Home from "../pages/Home";
import MyAnswers from "../pages/MyAnswers";
import MyQuestions from "../pages/MyQuestions";
import NotFound from "../pages/NotFound";
import PostQuestion from "../pages/PostQuestion";
import QuestionWithAnswers from "../pages/QuestionWithAnswers";
import UserDashboard from "../pages/UserDashboard";

const RouteProvider = () => {
  const authState = useSelector(state => state.authReducer);
  const { isLoggedIn } = authState;

  if (authState.loading) {
    return <div className='w-screen h-screen bg-white dark:bg-ui-dark-primary flex justify-center items-center'><Loader className='mx-auto' /></div>;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={isLoggedIn ? <UserDashboard /> : <NotFound />} />
          <Route path="/questions/ask" element={isLoggedIn ? <PostQuestion /> : <NotFound />} />
          <Route path="/questions/me" element={isLoggedIn ? <MyQuestions /> : <NotFound />} />
          <Route path="/questions/edit/:qid" element={isLoggedIn ? <EditQuestion /> : <NotFound />} />
          <Route path="/questions/:qslug" element={<QuestionWithAnswers />} />
          <Route path="/answers/me" element={isLoggedIn ? <MyAnswers /> : <NotFound />} />
          <Route path="/answers/edit/:ansid" element={isLoggedIn ? <EditAnswer /> : <NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default RouteProvider