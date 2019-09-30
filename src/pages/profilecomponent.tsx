import * as React from "react";
import { IUserProfile } from "../models/userprofile";
import FitBodyService from "../services/fitbodyservice";

interface IValidateProfileString {
  value: string;
  isValid: boolean;
  message: string;
}
interface IValidateProfileNumber {
  value: number;
  isValid: boolean;
  message: string;
}

interface IProfileState {
  email: IValidateProfileString;
  password: IValidateProfileString;
  newPassword: IValidateProfileString;
  reEnteredPassword: IValidateProfileString;
  firstname: IValidateProfileString;
  lastname: IValidateProfileString;
  gender: IValidateProfileString;
  birthday: IValidateProfileString;
  height: IValidateProfileNumber;
  activity: IValidateProfileString;
  updateDate: IValidateProfileString;
  updateWeight: IValidateProfileNumber;
  user: IUserProfile;
}

class ProfileComponent extends React.Component<{}, IProfileState> {
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
      },
      newPassword: {
        value: "",
        isValid: true,
        message: "Please choose a new password."
      },
      reEnteredPassword: {
        value: "",
        isValid: true,
        message: "Please enter the new password."
      },
      firstname: {
        value: "",
        isValid: true,
        message: "Please choose a firstname."
      },
      lastname: {
        value: "",
        isValid: true,
        message: "Please choose a lastname."
      },
      gender: {
        value: "",
        isValid: true,
        message: "Please choose a gender."
      },
      birthday: {
        value: "",
        isValid: true,
        message: "Please choose a birthday."
      },
      height: {
        value: 0,
        isValid: true,
        message: "Please choose a height."
      },
      activity: {
        value: "",
        isValid: true,
        message: "Please choose a activity level."
      },
      updateDate: {
        value: "",
        isValid: true,
        message: "Please choose a date."
      },
      updateWeight: {
        value: 0,
        isValid: true,
        message: "Please enter a current weight."
      },
      user: {
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        gender: "",
        birthday: "",
        height: 0,
        activity: "",
        weight: [
          {
            date: "",
            weight: 0
          }
        ],
        bmi: 0,
        calories: 0,
        points: 0,
        foodEaten: [],
        exerciseDone: []
      }
    };
  }

  componentDidMount() {
    let email: string | null = localStorage.getItem("loggedEmail");
    FitBodyService.getUserProfile(email).subscribe(
      (userprofile: IUserProfile) => {
        console.log(userprofile);
        this.setState({
          user: userprofile,
          email: {
            value: userprofile.email,
            isValid: true,
            message: "Please choose a email."
          },
          password: {
            value: userprofile.password,
            isValid: true,
            message: "Please choose a password."
          },
          firstname: {
            value: userprofile.firstname,
            isValid: true,
            message: "Please choose a firstname."
          },
          lastname: {
            value: userprofile.lastname,
            isValid: true,
            message: "Please choose a lastname."
          },
          gender: {
            value: userprofile.gender,
            isValid: true,
            message: "Please choose a gender."
          },
          birthday: {
            value: userprofile.birthday,
            isValid: true,
            message: "Please choose a birthday."
          },
          height: {
            value: userprofile.height,
            isValid: true,
            message: "Please choose a height."
          },
          activity: {
            value: userprofile.activity,
            isValid: true,
            message: "Please choose a activity."
          }
        });
      }
    );
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
  loadNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newPassword: {
        value: event.target.value,
        isValid: true,
        message: "Please choose a new password."
      }
    });
  };
  loadReEnteredPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      reEnteredPassword: {
        value: event.target.value,
        isValid: true,
        message: "Please enter the new password."
      }
    });
  };
  loadFirstname = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      firstname: {
        value: event.target.value,
        isValid: true,
        message: "Please choose a firstname."
      }
    });
  };
  loadLastname = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      lastname: {
        value: event.target.value,
        isValid: true,
        message: "Please choose a lastname."
      }
    });
  };
  loadGender = (event: React.ChangeEvent<any>) => {
    this.setState({
      gender: {
        value: event.target.value,
        isValid: true,
        message: "Please choose a gender."
      }
    });
  };
  loadBirthday = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      birthday: {
        value: event.target.value,
        isValid: true,
        message: "Please choose a birthday."
      }
    });
  };
  loadHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      height: {
        value: Number.parseInt(
          event.target.value === "" ? "0" : event.target.value
        ),
        isValid: true,
        message: "Please choose a height."
      }
    });
  };
  loadActivity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      activity: {
        value: event.target.value,
        isValid: true,
        message: "Please choose a activity."
      }
    });
  };
  loadUpdateDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      updateDate: {
        value: event.target.value,
        isValid: true,
        message: "Please choose a date."
      }
    });
  };
  loadUpdateWeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      updateWeight: {
        value: Number.parseInt(
          event.target.value === "" ? "0" : event.target.value
        ),
        isValid: true,
        message: "Please enter a current weight."
      }
    });
  };

  editUser = (event: React.FormEvent<HTMLFormElement>) => {
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
          message: "Please enter the current password."
        }
      });
    } else if (this.state.password.value !== this.state.user.password) {
      this.setState({
        password: {
          value: "",
          isValid: false,
          message: "Please enter correct current passsword."
        }
      });
    } else if (this.state.firstname.value === "") {
      this.setState({
        firstname: {
          value: "",
          isValid: false,
          message: "Please choose a firstname."
        }
      });
    } else if (this.state.lastname.value === "") {
      this.setState({
        lastname: {
          value: "",
          isValid: false,
          message: "Please choose a lastname."
        }
      });
    } else if (this.state.gender.value === "") {
      this.setState({
        gender: {
          value: "",
          isValid: false,
          message: "Please choose a gender."
        }
      });
    } else if (this.state.birthday.value === "") {
      this.setState({
        birthday: {
          value: "",
          isValid: false,
          message: "Please choose a birthday."
        }
      });
    } else if (this.state.height.value === 0) {
      this.setState({
        height: {
          value: 0,
          isValid: false,
          message: "Please enter a height."
        }
      });
    } else if (this.state.activity.value === "") {
      this.setState({
        activity: {
          value: "",
          isValid: false,
          message: "Please choose a activity level."
        }
      });
    } else {
      let user = this.state.user;
      user.email = this.state.email.value;
      user.password = this.state.password.value;
      user.firstname = this.state.firstname.value;
      user.lastname = this.state.lastname.value;
      user.gender = this.state.gender.value;
      user.birthday = this.state.birthday.value;
      user.height = this.state.height.value;
      user.activity = this.state.activity.value;
      FitBodyService.updateUserProfile(user, user.email).subscribe(() => {
        console.log(user);
        console.log("User profile updated...");
        this.componentDidMount();
      });
    }
  };

  updateWeight = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.state.updateDate.value === "") {
      this.setState({
        updateDate: {
          value: "",
          isValid: false,
          message: "Please choose a date."
        }
      });
    } else if (this.state.updateWeight.value === 0) {
      this.setState({
        updateWeight: {
          value: 0,
          isValid: false,
          message: "Please enter a current weight."
        }
      });
    } else {
      let user = this.state.user;
      user.weight.push({
        date: this.state.updateDate.value,
        weight: this.state.updateWeight.value
      });
      FitBodyService.updateUserProfile(user, user.email).subscribe(() => {
        console.log(user);
        console.log("User profile updated...");
        this.componentDidMount();
      });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row my-3">
          <form onSubmit={this.editUser} className="col-md-6">
            <div className="border rounded-lg shadow bg-secondary text-white px-5 py-4">
              <div className="text-center">
                <h4>User Profile</h4>
              </div>
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
                  placeholder="Enter email name"
                  value={this.state.email.value}
                  onChange={this.loadEmail}
                />
                <div className="invalid-feedback">
                  {this.state.email.message}
                </div>
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
                  aria-describedby="passwordHelp"
                  placeholder="Enter password"
                  value={this.state.password.value}
                  onChange={this.loadPassword}
                />
                <div className="invalid-feedback">
                  {this.state.password.message}
                </div>
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  className={
                    "form-control " +
                    (this.state.newPassword.isValid ? null : "is-invalid")
                  }
                  id="newPassword"
                  aria-describedby="newPasswordHelp"
                  placeholder="Enter new Password"
                  value={this.state.newPassword.value}
                  onChange={this.loadNewPassword}
                />
                <div className="invalid-feedback">
                  {this.state.newPassword.message}
                </div>
              </div>
              <div className="form-group">
                <label>Re-enter New Password</label>
                <input
                  type="password"
                  className={
                    "form-control " +
                    (this.state.reEnteredPassword.isValid ? null : "is-invalid")
                  }
                  id="reEnteredPassword"
                  aria-describedby="reEnteredPasswordHelp"
                  placeholder="Re-enter new Password"
                  value={this.state.reEnteredPassword.value}
                  onChange={this.loadReEnteredPassword}
                />
                <div className="invalid-feedback">
                  {this.state.reEnteredPassword.message}
                </div>
              </div>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  className={
                    "form-control " +
                    (this.state.firstname.isValid ? null : "is-invalid")
                  }
                  id="firstname"
                  aria-describedby="firstnameHelp"
                  placeholder="Enter first name"
                  value={this.state.firstname.value}
                  onChange={this.loadFirstname}
                />
                <div className="invalid-feedback">
                  {this.state.firstname.message}
                </div>
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  className={
                    "form-control " +
                    (this.state.lastname.isValid ? null : "is-invalid")
                  }
                  id="lastname"
                  aria-describedby="lastnameHelp"
                  placeholder="Enter last name"
                  value={this.state.lastname.value}
                  onChange={this.loadLastname}
                />
                <div className="invalid-feedback">
                  {this.state.lastname.message}
                </div>
              </div>
              <div className="form-group">
                <label>Gender</label>
                <div>
                  <input
                    className={
                      "form-check-input" +
                      (this.state.gender.isValid ? null : "is-invalid")
                    }
                    type="radio"
                    id="male"
                    value="Male"
                    checked={this.state.gender.value === "Male"}
                    onChange={this.loadGender}
                  />
                  <label className="form-check-label pl-2">Male</label>
                </div>
                <div>
                  <input
                    className={
                      "form-check-input" +
                      (this.state.gender.isValid ? null : "is-invalid")
                    }
                    type="radio"
                    id="Female"
                    value="Female"
                    checked={this.state.gender.value === "Female"}
                    onChange={this.loadGender}
                  />
                  <label className="form-check-label pl-2">Female</label>
                </div>
                <div className="invalid-feedback">
                  {this.state.gender.message}
                </div>
              </div>
              <div className="form-group">
                <label>Birthday</label>
                <input
                  type="text"
                  className={
                    "form-control " +
                    (this.state.birthday.isValid ? null : "is-invalid")
                  }
                  id="birthday"
                  placeholder="Your Birthday"
                  value={this.state.birthday.value}
                  onChange={this.loadBirthday}
                />
                <div className="invalid-feedback">
                  {this.state.birthday.message}
                </div>
              </div>
              <div className="form-group">
                <label>Height (in Inches)</label>
                <input
                  type="text"
                  className={
                    "form-control " +
                    (this.state.height.isValid ? null : "is-invalid")
                  }
                  id="height"
                  placeholder="Your Height"
                  value={this.state.height.value}
                  onChange={this.loadHeight}
                />
                <div className="invalid-feedback">
                  {this.state.height.message}
                </div>
              </div>
              <div className="form-group">
                <label>Activity Level</label>
                <select
                  className={
                    "form-control " +
                    (this.state.activity.isValid ? null : "is-invalid")
                  }
                  id="activity"
                  onChange={this.loadActivity}
                  value={this.state.activity.value}
                >
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Light</option>
                  <option value="moderate">Moderate</option>
                  <option value="veryActive">Very Active</option>
                  <option value="extremelyActive">Extremely Active</option>
                </select>
                <div className="invalid-feedback">
                  {this.state.activity.message}
                </div>
              </div>
              <div>
                <label>Current weight: </label>{" "}
                {
                  this.state.user.weight[this.state.user.weight.length - 1]
                    .weight
                }
              </div>
              <div>
                <label>BMI: </label> {this.state.user.bmi}
              </div>
              <div>
                <label>Calories needed to maintain weight: </label>{" "}
                {this.state.user.calories}
              </div>
              <div>
                <label>Daily Points: </label> {this.state.user.points}
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-dark px-4 mt-2">
                  Update Profile
                </button>
              </div>
            </div>
          </form>
          <form onSubmit={this.updateWeight} className="col-md-6">
            <div className="border rounded-lg shadow bg-secondary text-white px-5 py-4">
              <div className="text-center">
                <h4>Update Weight</h4>
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="text"
                  className={
                    "form-control " +
                    (this.state.updateDate.isValid ? null : "is-invalid")
                  }
                  id="updateDate"
                  aria-describedby="updateDateHelp"
                  placeholder="Enter date"
                  value={this.state.updateDate.value}
                  onChange={this.loadUpdateDate}
                />
                <div className="invalid-feedback">
                  {this.state.updateDate.message}
                </div>
              </div>
              <div className="form-group">
                <label>Current Weight</label>
                <input
                  type="text"
                  className={
                    "form-control " +
                    (this.state.updateWeight.isValid ? null : "is-invalid")
                  }
                  id="updateWeight"
                  aria-describedby="updateWeightHelp"
                  placeholder="Enter your current weight"
                  value={this.state.updateWeight.value}
                  onChange={this.loadUpdateWeight}
                />
                <div className="invalid-feedback">
                  {this.state.updateWeight.message}
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-dark px-4 mt-2">
                  Update Weight For Date
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default ProfileComponent;
