import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import ScrollToTop from "./ScrollToTop";
import RecommendedDetail from "./Components/Recommendations/RecommendDetail";
import {
  Calender,
  Data,
  Home,
  Profile,
  ExerciseDiets,
  ExerciseDietsList,
  ExerciseDietsDetail,
} from "./Pages";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "./Components/Shared";
import { auth } from "./Config/Firebase";
import { getData } from "./Config/Services";
import { setUser } from "./Store/Slices/UserSlice";
import { setIsAuthenticated } from "./Store/Slices/AuthSlice";
import { setShowModal } from "./Store/Slices/ModalSlice";
import { AddData } from "./Config/Services";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    (async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          dispatch(setUser(await getData("users", user.uid)));
          dispatch(setIsAuthenticated(true));
          dispatch(setShowModal(false));
        }
        setLoading(false);
      });
    })();
  }, [dispatch]);
  return (
    <div>
      {false ? (
        <Loader />
      ) : (
        <div>
          <ScrollToTop />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/exercise-diets"
              element={
                <PrivateRoute redirectTo="/">
                  <ExerciseDiets />
                </PrivateRoute>
              }
            />
            <Route
              path="/exercise-diets-list/:collectionType/:id"
              element={
                <PrivateRoute redirectTo="/">
                  <ExerciseDietsList />
                </PrivateRoute>
              }
            />
            <Route
              path="/exercise-diets-detail/:collectionType/:documentId/:groupId"
              element={
                <PrivateRoute redirectTo="/">
                  <ExerciseDietsDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/data"
              element={
                <PrivateRoute redirectTo="/">
                  <Data />
                </PrivateRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <PrivateRoute redirectTo="/">
                  <Calender />
                </PrivateRoute>
              }
            />
            <Route
              path="/recommended-detail"
              element={
                <PrivateRoute redirectTo="/">
                  <RecommendedDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute redirectTo="/">
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      )}
    </div>
  );
}

function PrivateRoute({ children, redirectTo }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

export default App;
