import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Main from "./components/Main";
import Signup from "./components/Signup";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import AddStudent from "./components/AddStudent";
import AddInterview from "./components/AddInterview";
import AssignInterview from "./components/AssignInterview";
import AddResults from "./components/AddResults";

const App = () => {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/student" element={<AddStudent />} />
              <Route path="/interview" element={<AddInterview />} />
              <Route path="/assign-interview" element={<AssignInterview />} />
              <Route path="/update-results" element={<AddResults />} />
              <Route path="/" element={<Main />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
