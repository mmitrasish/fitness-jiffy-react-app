import * as React from "react";
import FitBodyService from "../services/fitbodyservice";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

interface IValidateRegister {
  value: string;
  isValid: boolean;
  message: string;
}

interface IRegisterState {
  email: IValidateRegister;
  password: IValidateRegister;
}

class RegisterComponent extends React.Component<
  RouteComponentProps,
  IRegisterState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: {
        value: "",
        isValid: true,
        message: "Please choose a email."
      },
      password: {
        value: "",
        isValid: true,
        message: "Please choose a password."
      }
    };
  }
  loadEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      email: {
        value: event.target.value,
        isValid: true,
        message: "Please choose a email."
      }
    });
  };
  loadPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: {
        value: event.target.value,
        isValid: true,
        message: "Please choose a password."
      }
    });
  };

  registerUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (this.state.email.value === "") {
      this.setState({
        email: {
          value: "",
          isValid: false,
          message: "Please choose a email."
        }
      });
    } else if (this.state.password.value === "") {
      this.setState({
        password: {
          value: "",
          isValid: false,
          message: "Please choose a password."
        }
      });
    } else {
      FitBodyService.postUserProfile({
        email: this.state.email.value,
        password: this.state.password.value,
        firstname: "",
        lastname: "",
        gender: "",
        birthday: "",
        height: 0,
        activity: "",
        weight: [],
        bmi: 0,
        calories: 0,
        points: 0,
        foodEaten: [],
        exerciseDone: []
      }).subscribe(() => {
        console.log("User Post Done....");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("loggedEmail", this.state.email.value);
        this.props.history.push("/");
      });
    }
  };
  render() {
    return (
      <div className="d-flex justify-content-center">
        <form onSubmit={this.registerUser} className="col-md-4">
          <div
            style={{ marginTop: "5em", padding: "4em" }}
            className="rounded-lg shadow border bg-secondary text-white"
          >
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className={
                  "form-control " +
                  (this.state.email.isValid ? null : "is-invalid")
                }
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={this.state.email.value}
                onChange={this.loadEmail}
              />
              <div className="invalid-feedback">{this.state.email.message}</div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className={
                  "form-control " +
                  (this.state.password.isValid ? null : "is-invalid")
                }
                id="password"
                placeholder="Password"
                aria-describedby="paswordHelp"
                value={this.state.password.value}
                onChange={this.loadPassword}
              />
              <div className="invalid-feedback">
                {this.state.password.message}
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-dark px-4 mt-2">
                Register
              </button>
            </div>
            <hr className="bg-white" />
            <div className="text-center">
              <span>
                Already have an account?{" "}
                <Link to="/login" className="text-white">
                  Login
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(RegisterComponent);
