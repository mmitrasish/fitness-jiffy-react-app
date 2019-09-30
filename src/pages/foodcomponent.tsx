import * as React from "react";
import { IFood } from "../models/food";
import { IUserProfile } from "../models/userprofile";
import FitBodyService from "../services/fitbodyservice";
import FoodRow from "../components/foodrow";
import calendar from "../assets/images/calendar.svg";
import FoodSearchModal from "../components/foodsearchmodal";
import FoodCreateModal from "../components/foodcreatemodal";
interface IFoodState {
  foodLists: IFood[];
  foodEaten: IFood[];
  date: string;
  foodToAdd: string;
  foodSearch: string;
  userProfile: IUserProfile;
}

export default class FoodComponent extends React.Component<{}, IFoodState> {
  constructor(props: any) {
    super(props);
    this.state = {
      foodLists: [],
      foodEaten: [],
      date: "",
      foodToAdd: "",
      foodSearch: "",
      userProfile: {
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
  loadDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      date: event.target.value
    });
  };
  loadFoodToAdd = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      foodToAdd: event.target.value
    });
  };
  loadFoodSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      foodSearch: event.target.value
    });
  };
  addFood = () => {
    if (this.state.date !== "") {
      let food = this.state.foodLists.filter(
        food => food.foodName === this.state.foodToAdd
      )[0];
      this.state.foodEaten.push(food);
      this.setState({ foodEaten: this.state.foodEaten });
      this.updateFoodInDb();
    }
  };
  addFoodItem = (food: IFood) => {
    if (this.state.date !== "") {
      this.state.foodEaten.push(food);
      this.setState({ foodEaten: this.state.foodEaten });
      this.updateFoodInDb();
    }
  };

  updateFoodInDb = () => {
    let userProfile = this.state.userProfile;
    let present = false;
    userProfile.foodEaten.forEach(foodeaten => {
      if (foodeaten.date === this.state.date) {
        foodeaten.foods = this.state.foodEaten;
        present = true;
      }
    });
    if (!present) {
      userProfile.foodEaten.push({
        date: this.state.date,
        foods: this.state.foodEaten
      });
    }
    let email: string | null = localStorage.getItem("loggedEmail");
    FitBodyService.updateUserProfile(userProfile, email).subscribe(
      (userprofile: IUserProfile) => {
        console.log(userprofile);
        this.componentDidMount();
      }
    );
  };
  deleteFoodItem = (food: IFood) => {
    console.log("food deleted: " + food.foodName);
    this.setState({
      foodEaten: this.state.foodEaten.splice(
        this.state.foodEaten.indexOf(food),
        1
      )
    });
    this.updateFoodInDb();
  };
  componentDidMount() {
    let email: string | null = localStorage.getItem("loggedEmail");
    FitBodyService.getUserProfile(email).subscribe(
      (userprofile: IUserProfile) => {
        this.setState({
          userProfile: userprofile,
          date: userprofile.foodEaten[userprofile.foodEaten.length - 1].date
        });
        this.updateFoodEatenByDate();
      }
    );
    FitBodyService.getFoods().subscribe((foods: IFood[]) => {
      this.setState({ foodLists: foods });
    });
  }
  updateFoodEatenByDate = () => {
    this.setState({
      foodEaten:
        this.state.userProfile.foodEaten.filter(
          foodeaten => foodeaten.date === this.state.date
        )[0] === undefined
          ? []
          : this.state.userProfile.foodEaten.filter(
              foodeaten => foodeaten.date === this.state.date
            )[0].foods
    });
  };

  render() {
    return (
      <div className="container-fluid py-3 px-4">
        <div className="card shadow">
          <div className="card-header bg-secondary text-white">
            <b>Food Eaten</b>
          </div>
          <div className="card-body table-responsive" style={{ padding: 0 }}>
            <div className="container-fluid d-flex justify-content-center align-items-center py-3">
              <span className="font-weight-bold mr-3">Foods Eaten On: </span>
              <span>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.date}
                  onChange={this.loadDate}
                  onBlur={this.updateFoodEatenByDate}
                />
              </span>
              <span className="ml-2">
                <img
                  src={calendar}
                  alt="calendar icon"
                  style={{ height: 24, width: 24 }}
                />
              </span>
            </div>
            <div className="row container-fluid">
              <div className="col-md-4">
                <div className="px-3 py-1 font-weight-bold">
                  Recently Eaten Foods
                </div>
                <div className="row px-3">
                  <div className="col-md-6">
                    <select
                      className="form-control"
                      id="foodList"
                      value={this.state.foodToAdd}
                      onChange={this.loadFoodToAdd}
                    >
                      {this.state.foodLists.map(food => (
                        <option value={food.foodName} key={food.foodName}>
                          {food.foodName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <button className="btn btn-primary" onClick={this.addFood}>
                      Add Food
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="px-3 py-1 font-weight-bold">
                  Search Eaten Foods
                </div>
                <div className="row px-3">
                  <div className="col-md-6">
                    <input
                      className="form-control"
                      id="foodList"
                      value={this.state.foodSearch}
                      onChange={this.loadFoodSearch}
                    ></input>
                  </div>
                  <div className="col-md-6">
                    <button
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target="#searchFoodModal"
                    >
                      Search Food
                    </button>
                  </div>
                  <FoodSearchModal
                    filteredFoods={this.state.foodLists.filter(
                      food =>
                        food.foodName
                          .toLocaleLowerCase()
                          .indexOf(
                            this.state.foodSearch.toLocaleLowerCase()
                          ) !== -1
                    )}
                    addFood={this.addFoodItem}
                  />
                </div>
              </div>
              <div className="col-md-4 text-center">
                <button
                  className="btn btn-primary mt-4"
                  data-toggle="modal"
                  data-target="#createFoodModal"
                >
                  Create Food Item
                </button>
                {/* Modal */}
                <FoodCreateModal />
              </div>
            </div>
            <table
              className="table table-striped table-borderless"
              style={{ margin: 0 }}
            >
              <thead>
                <tr>
                  <th scope="col" style={{ width: 300 }}>
                    Food
                  </th>
                  <th scope="col"># of Servings</th>
                  <th scope="col">Serving Size</th>
                  <th scope="col">Calories</th>
                  <th scope="col">Fat</th>
                  <th scope="col">Sat. Fat</th>
                  <th scope="col">Sodium</th>
                  <th scope="col">Carbs</th>
                  <th scope="col">Fiber</th>
                  <th scope="col">Sugar</th>
                  <th scope="col">Protien</th>
                  <th scope="col">Points</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.foodEaten.map((food: IFood) => (
                  <FoodRow
                    food={food}
                    key={food.foodName}
                    deleteFood={this.deleteFoodItem}
                  />
                ))}
                <tr>
                  <th scope="col" style={{ width: 360 }}>
                    Total
                  </th>
                  <td></td>
                  <td></td>
                  <th>
                    {this.state.foodEaten.length === 0
                      ? 0
                      : this.state.foodEaten
                          .map(food => food.calories)
                          .reduce((tot, amt) => tot + amt)
                          .toFixed(2)}
                  </th>
                  <th>
                    {this.state.foodEaten.length === 0
                      ? 0
                      : this.state.foodEaten
                          .map(food => food.fat)
                          .reduce((tot, amt) => tot + amt)
                          .toFixed(2)}
                  </th>
                  <th>
                    {this.state.foodEaten.length === 0
                      ? 0
                      : this.state.foodEaten
                          .map(food => food.satfat)
                          .reduce((tot, amt) => tot + amt)
                          .toFixed(2)}
                  </th>
                  <th>
                    {this.state.foodEaten.length === 0
                      ? 0
                      : this.state.foodEaten
                          .map(food => food.sodium)
                          .reduce((tot, amt) => tot + amt)
                          .toFixed(2)}
                  </th>
                  <th>
                    {this.state.foodEaten.length === 0
                      ? 0
                      : this.state.foodEaten
                          .map(food => food.carb)
                          .reduce((tot, amt) => tot + amt)
                          .toFixed(2)}
                  </th>
                  <th>
                    {this.state.foodEaten.length === 0
                      ? 0
                      : this.state.foodEaten
                          .map(food => food.fiber)
                          .reduce((tot, amt) => tot + amt)
                          .toFixed(2)}
                  </th>
                  <th>
                    {this.state.foodEaten.length === 0
                      ? 0
                      : this.state.foodEaten
                          .map(food => food.sugar)
                          .reduce((tot, amt) => tot + amt)
                          .toFixed(2)}
                  </th>
                  <th>
                    {this.state.foodEaten.length === 0
                      ? 0
                      : this.state.foodEaten
                          .map(food => food.protein)
                          .reduce((tot, amt) => tot + amt)
                          .toFixed(2)}
                  </th>
                  <td>{}</td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
