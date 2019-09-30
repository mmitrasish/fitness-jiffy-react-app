import * as React from "react";
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
interface IFoodModalState {
  foodName: IValidateProfileString;
  servingType: IValidateProfileString;
  servingQty: IValidateProfileNumber;
  calories: IValidateProfileNumber;
  fat: IValidateProfileNumber;
  satFat: IValidateProfileNumber;
  carb: IValidateProfileNumber;
  fiber: IValidateProfileNumber;
  sugar: IValidateProfileNumber;
  protien: IValidateProfileNumber;
  sodium: IValidateProfileNumber;
}
class FoodCreateModal extends React.Component<{}, IFoodModalState> {
  private modal: any;
  constructor(props: any) {
    super(props);
    this.state = {
      foodName: {
        value: "",
        isValid: true,
        message: "Please choose a name."
      },
      servingType: {
        value: "ounce",
        isValid: true,
        message: "Please choose a serving type."
      },
      servingQty: {
        value: 0,
        isValid: true,
        message: "Please choose a serving quantity."
      },
      calories: {
        value: 0,
        isValid: true,
        message: "Please choose a calories."
      },
      fat: {
        value: 0,
        isValid: true,
        message: "Please choose a fat."
      },
      satFat: {
        value: 0,
        isValid: true,
        message: "Please choose a saturated fat."
      },
      carb: {
        value: 0,
        isValid: true,
        message: "Please choose a carbs."
      },
      fiber: {
        value: 0,
        isValid: true,
        message: "Please choose a fiber."
      },
      sugar: {
        value: 0,
        isValid: true,
        message: "Please choose a sugar."
      },
      protien: {
        value: 0,
        isValid: true,
        message: "Please choose a protien."
      },
      sodium: {
        value: 0,
        isValid: true,
        message: "Please choose a sodium."
      }
    };
  }

  loadFoodName = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      foodName: {
        value: event.target.value,
        isValid: true,
        message: "Please choose a name."
      }
    });
    // console.log(this.state.foodName.value);
  };
  loadServingType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      servingType: {
        value: event.target.value,
        isValid: true,
        message: "Please choose a serving type."
      }
    });
  };
  loadServingQty = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      servingQty: {
        value: Number.parseInt(
          event.target.value === "" ? "0" : event.target.value
        ),
        isValid: true,
        message: "Please choose a serving quantity."
      }
    });
  };
  loadCalories = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      calories: {
        value: Number.parseInt(
          event.target.value === "" ? "0" : event.target.value
        ),
        isValid: true,
        message: "Please choose a calories."
      }
    });
  };
  loadFat = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      fat: {
        value: Number.parseInt(
          event.target.value === "" ? "0" : event.target.value
        ),
        isValid: true,
        message: "Please choose a fat."
      }
    });
  };
  loadSatFat = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      satFat: {
        value: Number.parseInt(
          event.target.value === "" ? "0" : event.target.value
        ),
        isValid: true,
        message: "Please choose a saturated fat."
      }
    });
  };
  loadCarb = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      carb: {
        value: Number.parseInt(
          event.target.value === "" ? "0" : event.target.value
        ),
        isValid: true,
        message: "Please choose a carb."
      }
    });
  };
  loadFiber = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      fiber: {
        value: Number.parseInt(
          event.target.value === "" ? "0" : event.target.value
        ),
        isValid: true,
        message: "Please choose a fiber."
      }
    });
  };
  loadSugar = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      sugar: {
        value: Number.parseInt(
          event.target.value === "" ? "0" : event.target.value
        ),
        isValid: true,
        message: "Please choose a sugar."
      }
    });
  };
  loadProtien = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      protien: {
        value: Number.parseInt(
          event.target.value === "" ? "0" : event.target.value
        ),
        isValid: true,
        message: "Please choose a protien."
      }
    });
  };
  loadSodium = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      sodium: {
        value: Number.parseInt(
          event.target.value === "" ? "0" : event.target.value
        ),
        isValid: true,
        message: "Please choose a sodium."
      }
    });
  };

  addFood = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // if (this.state.foodName.value === "") {
    //   this.setState({
    //     foodName: {
    //       value: "",
    //       isValid: true,
    //       message: "Please choose a name."
    //     }
    //   });
    // } else if (this.state.servingType.value === "") {
    //   this.setState({
    //     servingType: {
    //       value: "",
    //       isValid: true,
    //       message: "Please choose a serving type."
    //     }
    //   });
    // } else if (this.state.servingQty.value === 0) {
    //   this.setState({
    //     servingQty: {
    //       value: 0,
    //       isValid: true,
    //       message: "Please choose a serving quantity."
    //     }
    //   });
    // } else if (this.state.calories.value === 0) {
    //   this.setState({
    //     calories: {
    //       value: 0,
    //       isValid: true,
    //       message: "Please choose a calories."
    //     }
    //   });
    // } else if (this.state.fat.value === 0) {
    //   this.setState({
    //     fat: {
    //       value: 0,
    //       isValid: true,
    //       message: "Please choose a fat."
    //     }
    //   });
    // } else if (this.state.satFat.value === 0) {
    //   this.setState({
    //     satFat: {
    //       value: 0,
    //       isValid: true,
    //       message: "Please choose a saturated fat."
    //     }
    //   });
    // } else if (this.state.carb.value === 0) {
    //   this.setState({
    //     carb: {
    //       value: 0,
    //       isValid: true,
    //       message: "Please choose a carbs."
    //     }
    //   });
    // } else if (this.state.fiber.value === 0) {
    //   this.setState({
    //     fiber: {
    //       value: 0,
    //       isValid: true,
    //       message: "Please choose a fiber."
    //     }
    //   });
    // } else if (this.state.sugar.value === 0) {
    //   this.setState({
    //     sugar: {
    //       value: 0,
    //       isValid: true,
    //       message: "Please choose a sugar."
    //     }
    //   });
    // } else if (this.state.protien.value === 0) {
    //   this.setState({
    //     protien: {
    //       value: 0,
    //       isValid: true,
    //       message: "Please choose a protien."
    //     }
    //   });
    // } else if (this.state.sodium.value === 0) {
    //   this.setState({
    //     sodium: {
    //       value: 0,
    //       isValid: true,
    //       message: "Please choose a sodium."
    //     }
    //   });
    // } else {
    //   console.log("It works");

    // }

    FitBodyService.postFood({
      foodName: this.state.foodName.value,
      serving: this.state.servingQty.value,
      size: this.state.servingType.value,
      calories: this.state.calories.value,
      fat: this.state.fat.value,
      satfat: this.state.satFat.value,
      carb: this.state.carb.value,
      fiber: this.state.fiber.value,
      sugar: this.state.sugar.value,
      protein: this.state.protien.value,
      sodium: this.state.sodium.value
    }).subscribe(data => {
      console.log(data);
      this.setState({
        foodName: {
          value: "",
          isValid: true,
          message: "Please choose a name."
        },
        servingType: {
          value: "ounce",
          isValid: true,
          message: "Please choose a serving type."
        },
        servingQty: {
          value: 0,
          isValid: true,
          message: "Please choose a serving quantity."
        },
        calories: {
          value: 0,
          isValid: true,
          message: "Please choose a calories."
        },
        fat: {
          value: 0,
          isValid: true,
          message: "Please choose a fat."
        },
        satFat: {
          value: 0,
          isValid: true,
          message: "Please choose a saturated fat."
        },
        carb: {
          value: 0,
          isValid: true,
          message: "Please choose a carbs."
        },
        fiber: {
          value: 0,
          isValid: true,
          message: "Please choose a fiber."
        },
        sugar: {
          value: 0,
          isValid: true,
          message: "Please choose a sugar."
        },
        protien: {
          value: 0,
          isValid: true,
          message: "Please choose a protien."
        },
        sodium: {
          value: 0,
          isValid: true,
          message: "Please choose a sodium."
        }
      });
    });
  };

  render() {
    return (
      <div
        ref={ref => (this.modal = ref)}
        className="modal fade bd-example-modal-lg"
        id="createFoodModal"
        role="dialog"
        aria-labelledby="createFoodModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <form onSubmit={this.addFood}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="createFoodModallLabel">
                  Create New Food
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="px-5 py-4">
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label text-right">
                      Name
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className={
                          "form-control " +
                          (this.state.foodName.isValid ? null : "is-invalid")
                        }
                        id="name"
                        aria-describedby="nameHelp"
                        placeholder="Enter food name"
                        value={this.state.foodName.value}
                        onChange={this.loadFoodName}
                      />
                      <div className="invalid-feedback">
                        {this.state.foodName.message}
                      </div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label text-right">
                      Default Serving Type
                    </label>
                    <div className="col-sm-8">
                      <select
                        className={
                          "form-control " +
                          (this.state.servingType.isValid ? null : "is-invalid")
                        }
                        id="servingType"
                        value={this.state.servingType.value}
                        onChange={this.loadServingType}
                      >
                        <option value="ounce">Ounce</option>
                        <option value="cup">Cup</option>
                        <option value="tablespoon">Tablespoon</option>
                        <option value="custom">Custom</option>
                      </select>

                      <div className="invalid-feedback">
                        {this.state.servingType.message}
                      </div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label text-right">
                      Default Serving Qty
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className={
                          "form-control " +
                          (this.state.servingQty.isValid ? null : "is-invalid")
                        }
                        id="servingQty"
                        aria-describedby="servingQtyHelp"
                        placeholder="Enter serving quantity"
                        value={this.state.servingQty.value}
                        onChange={this.loadServingQty}
                      />

                      <div className="invalid-feedback">
                        {this.state.servingQty.message}
                      </div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label text-right">
                      Calories
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className={
                          "form-control " +
                          (this.state.calories.isValid ? null : "is-invalid")
                        }
                        id="calories"
                        aria-describedby="caloriesHelp"
                        placeholder="Enter calories"
                        value={this.state.calories.value}
                        onChange={this.loadCalories}
                      />

                      <div className="invalid-feedback">
                        {this.state.calories.message}
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label text-right">
                      Fat
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className={
                          "form-control " +
                          (this.state.fat.isValid ? null : "is-invalid")
                        }
                        id="fat"
                        aria-describedby="fatHelp"
                        placeholder="Enter fat"
                        value={this.state.fat.value}
                        onChange={this.loadFat}
                      />
                      <div className="invalid-feedback">
                        {this.state.fat.message}
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label text-right">
                      Saturated Fat
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className={
                          "form-control " +
                          (this.state.satFat.isValid ? null : "is-invalid")
                        }
                        id="saturatedFat"
                        aria-describedby="saturatedFatHelp"
                        placeholder="Enter saturated fat"
                        value={this.state.satFat.value}
                        onChange={this.loadSatFat}
                      />
                      <div className="invalid-feedback">
                        {this.state.satFat.message}
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label text-right">
                      Carbs
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className={
                          "form-control " +
                          (this.state.carb.isValid ? null : "is-invalid")
                        }
                        id="carbs"
                        aria-describedby="carbsHelp"
                        placeholder="Enter carbs"
                        value={this.state.carb.value}
                        onChange={this.loadCarb}
                      />
                      <div className="invalid-feedback">
                        {this.state.carb.message}
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label text-right">
                      Fiber
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className={
                          "form-control " +
                          (this.state.fiber.isValid ? null : "is-invalid")
                        }
                        id="fiber"
                        aria-describedby="fiberHelp"
                        placeholder="Enter fiber"
                        value={this.state.fiber.value}
                        onChange={this.loadFiber}
                      />
                      <div className="invalid-feedback">
                        {this.state.fiber.message}
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label text-right">
                      Sugar
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className={
                          "form-control " +
                          (this.state.sugar.isValid ? null : "is-invalid")
                        }
                        id="sugar"
                        aria-describedby="sugarHelp"
                        placeholder="Enter sugar"
                        value={this.state.sugar.value}
                        onChange={this.loadSugar}
                      />
                      <div className="invalid-feedback">
                        {this.state.sugar.message}
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label text-right">
                      Protien
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className={
                          "form-control " +
                          (this.state.protien.isValid ? null : "is-invalid")
                        }
                        id="protien"
                        aria-describedby="protienHelp"
                        placeholder="Enter protien"
                        value={this.state.protien.value}
                        onChange={this.loadProtien}
                      />
                      <div className="invalid-feedback">
                        {this.state.protien.message}
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label text-right">
                      Sodium
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className={
                          "form-control " +
                          (this.state.sodium.isValid ? null : "is-invalid")
                        }
                        id="sodium"
                        aria-describedby="sodiumHelp"
                        placeholder="Enter sodium"
                        value={this.state.sodium.value}
                        onChange={this.loadSodium}
                      />
                      <div className="invalid-feedback">
                        {this.state.sodium.message}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default FoodCreateModal;
