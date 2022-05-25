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
  // Izmantojam useDispatch lai varētu mijiedarboties ar stāvokļiem
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Palaižam mājaslapas datu ielādēšanos
    setLoading(true);
    (async () => {
      // Novērotājs (Observer), kas pārbauda vai lietotājs veiksmīgi ir autorizēts
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          // Izvelkam datus par lietotāja id
          dispatch(setUser(await getData("users", user.uid)));
          // Lietotājs ir autorizējies
          dispatch(setIsAuthenticated(true));
          // Nav jārāda autorizēšanās logs(Modal)
          dispatch(setShowModal(false));
        }
        // Beidzam mājaslapas datu ielādēšanu
        setLoading(false);
      });
    })();
    // Funkcija tiek izmantota kad veiktas izmaiņas dispatch
  }, [dispatch]);
  return (
    <div>
      {/* Ja dati vēl nav ielādējušies parādam tekstu "Please Wait ..." */}
      {false ? (
        <Loader />
      ) : (
        <div>
          {/* Vienmēr kad mājaslapa tiek ielādēta, lietotāja skats tiek tiek pievērsts uz augšu */}
          <ScrollToTop />

          <Routes>
            {/* Ceļvedis uz sākumlapu */}
            <Route path="/" element={<Home />} />
            {/* Ceļvedis uz vingrojumu un ēdienu lapu */}
            <Route
              path="/exercise-diets"
              element={
                <PrivateRoute redirectTo="/">
                  <ExerciseDiets />
                </PrivateRoute>
              }
            />
            {/* Ceļvedis uz vingrojumu un ēdienu apakšgrupām */}
            <Route
              path="/exercise-diets-list/:collectionType/:id"
              element={
                <PrivateRoute redirectTo="/">
                  <ExerciseDietsList />
                </PrivateRoute>
              }
            />
            {/* Ceļvedis uz vingrojumu un ēdienu apakšgrupu elementiem */}
            <Route
              path="/exercise-diets-detail/:collectionType/:documentId/:groupId"
              element={
                <PrivateRoute redirectTo="/">
                  <ExerciseDietsDetail />
                </PrivateRoute>
              }
            />
            {/* Ceļvedis uz grafiku sadaļu */}
            <Route
              path="/data"
              element={
                <PrivateRoute redirectTo="/">
                  <Data />
                </PrivateRoute>
              }
            />
            {/* Ceļvedis uz kalendāra sadaļu */}
            <Route
              path="/calendar"
              element={
                <PrivateRoute redirectTo="/">
                  <Calender />
                </PrivateRoute>
              }
            />
            {/* Ceļvedis uz lietotāja rekomendācijām */}
            <Route
              path="/recommended-detail"
              element={
                <PrivateRoute redirectTo="/">
                  <RecommendedDetail />
                </PrivateRoute>
              }
            />
            {/* Ceļvedis uz lietotāja profila sadaļu */}
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

// Funkcija kas ļauj lietotājam pārvietoties pa mājaslapas lapām, tikai ja viņš ir autorizējies 
function PrivateRoute({ children, redirectTo }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

export default App;
