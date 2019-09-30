import * as React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import App from "../App";
import LoginComponent from "../pages/logincomponent";
import RegisterComponent from "../pages/registercomponent";
import ProfileComponent from "../pages/profilecomponent";
import FoodComponent from "../pages/foodcomponent";

const AppRouter: React.FC = () => {
  let renderComponent = (component: any) => {
    return () =>
      localStorage.getItem("isLoggedIn") === "true" ? (
        component
      ) : (
        <Redirect to="/login" />
      );
  };
  return (
    <Router>
      <App>
        <Route
          path="/login"
          render={() =>
            localStorage.getItem("isLoggedIn") === "true" ? (
              <Redirect to="/profile" />
            ) : (
              <LoginComponent />
            )
          }
        />
        <Route
          path="/register"
          render={() =>
            localStorage.getItem("isLoggedIn") === "true" ? (
              <Redirect to="/profile" />
            ) : (
              <RegisterComponent />
            )
          }
        />
        <Route path="/profile" render={renderComponent(<ProfileComponent />)} />
        <Route path="/food" render={renderComponent(<FoodComponent />)} />
        <Route
          exact
          path="/"
          render={() =>
            localStorage.getItem("isLoggedIn") === "true" ? (
              <Redirect to="/profile" />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      </App>
    </Router>
  );
};
export default AppRouter;
