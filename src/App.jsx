import { Navigate, Route, Routes } from "react-router-dom";
import HomeLayout from "@/layouts/HomeLayout";
import ProtectedApp from "@/routes/ProtectedApp";
import HomePage from "@/pages/HomePage";
import UpcomingPage from "@/pages/UpcomingPage";
import PreviousPage from "@/pages/PreviousPage";
import RecordingsPage from "@/pages/RecordingsPage";
import PersonalRoomPage from "@/pages/PersonalRoomPage";
import MeetingPage from "@/pages/MeetingPage";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
const App = () => {
    return (<Routes>
      <Route path="/sign-in/*" element={<SignInPage />}/>
      <Route path="/sign-up/*" element={<SignUpPage />}/>

      <Route element={<ProtectedApp />}>
        <Route element={<HomeLayout />}>
          <Route index element={<HomePage />}/>
          <Route path="/upcoming" element={<UpcomingPage />}/>
          <Route path="/previous" element={<PreviousPage />}/>
          <Route path="/recordings" element={<RecordingsPage />}/>
          <Route path="/personal-room" element={<PersonalRoomPage />}/>
        </Route>

        <Route path="/meeting/:id" element={<MeetingPage />}/>
      </Route>

      <Route path="*" element={<Navigate to="/" replace/>}/>
    </Routes>);
};
export default App;
