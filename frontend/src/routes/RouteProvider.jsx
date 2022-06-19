import { React } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "../components/utils/Loader";
import AccountActivation from "../pages/auth/AccountActivation";
import ResetPassword from "../pages/auth/ResetPassword";
import EditAnswer from "../pages/userPages/EditAnswer";
import EditQuestion from "../pages/userPages/EditQuestion";
import Home from "../pages/Home";
import MyAnswers from "../pages/userPages/MyAnswers";
import MyQuestions from "../pages/userPages/MyQuestions";
import NotFound from "../pages/NotFound";
import PostQuestion from "../pages/userPages/PostQuestion";
import QuestionWithAnswers from "../pages/QuestionWithAnswers";
import UserDashboard from "../pages/userPages/UserDashboard";
import MyProfile from "../pages/userPages/MyProfile";

const RouteProvider = () => {
  const authState = useSelector(state => state.authReducer);
  const { isLoggedIn } = authState;

  if (authState.loadingInitial) {
    return <div className='w-screen h-screen bg-white dark:bg-ui-dark-primary flex justify-center items-center'><Loader className='mx-auto' /></div>;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/auth/activate-account/:activationToken" element={<AccountActivation />} />
          <Route path="/auth/reset-password/:accessToken" element={<ResetPassword />} />

          <Route path="/dashboard" element={isLoggedIn ? <UserDashboard /> : <NotFound />} />
          <Route path="/profile" element={isLoggedIn ? <MyProfile /> : <NotFound />} />

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