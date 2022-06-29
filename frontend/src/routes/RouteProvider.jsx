import { React } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AccountActivation from "../pages/auth/AccountActivation";
import Home from "../pages/Home";
import ResetPassword from "../pages/auth/ResetPassword";
import Loader from "../components/utils/Loader";
import MyActivities from "../pages/userPages/MyActivities";
import MyAnswers from "../pages/userPages/MyAnswers";
import MyBookmarks from "../pages/userPages/MyBookmarks";
import MyLikes from "../pages/userPages/MyLikes";
import MyProfile from "../pages/userPages/MyProfile";
import MyQuestions from "../pages/userPages/MyQuestions";
import EditQuestion from "../pages/userPages/EditQuestion";
import EditAnswer from "../pages/userPages/EditAnswer";
import PostQuestion from "../pages/userPages/PostQuestion";
import UserDashboard from "../pages/userPages/UserDashboard";
import NotFound from "../pages/NotFound";
import QuestionWithAnswers from "../pages/QuestionWithAnswers";
import Questions from "../pages/Questions";

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

          <Route path="/questions" element={<Questions />} />
          <Route path="/questions/ask" element={isLoggedIn ? <PostQuestion /> : <NotFound />} />
          <Route path="/questions/me" element={isLoggedIn ? <MyQuestions /> : <NotFound />} />
          <Route path="/questions/edit/:qid" element={isLoggedIn ? <EditQuestion /> : <NotFound />} />
          <Route path="/questions/:qslug" element={<QuestionWithAnswers />} />

          <Route path="/answers/me" element={isLoggedIn ? <MyAnswers /> : <NotFound />} />
          <Route path="/answers/edit/:ansid" element={isLoggedIn ? <EditAnswer /> : <NotFound />} />

          <Route path="/bookmarks/me" element={isLoggedIn ? <MyBookmarks /> : <NotFound />} />
          <Route path="/likes/me" element={isLoggedIn ? <MyLikes /> : <NotFound />} />
          <Route path="/activities/me" element={isLoggedIn ? <MyActivities /> : <NotFound />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default RouteProvider