import * as React from "react";
import { IFood } from "../models/food";
import add from "../assets/images/add.svg";

interface IFoodSearchModalProps {
  filteredFoods: IFood[];
  addFood: (food: IFood) => void;
}
class FoodSearchModal extends React.Component<IFoodSearchModalProps, {}> {
  constructor(props: IFoodSearchModalProps) {
    super(props);
    this.state = {};
  }
  addFoodItem = (food: IFood) => {
    this.props.addFood(food);
  };

  render() {
    return (
      <div
        className="modal fade bd-example-modal-lg"
        id="searchFoodModal"
        role="dialog"
        aria-labelledby="searchFoodModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="searchFoodModalLabel">
                Add Food
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
                <table className="table table-striped table-borderless">
                  <tbody>
                    {this.props.filteredFoods.map(food => (
                      <tr>
                        <td>{food.foodName}</td>
                        <td className="text-right">
                          <img
                            src={add}
                            alt="add food"
                            style={{ height: 18, width: 18 }}
                            onClick={e => this.addFoodItem(food)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default FoodSearchModal;
