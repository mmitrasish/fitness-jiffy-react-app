import * as React from "react";
import { IFood } from "../models/food";
import editIcon from "../assets/images/edit.svg";
import deleteIcon from "../assets/images/delete.svg";
interface IFoodRowProps {
  food: IFood;
  deleteFood: (food: IFood) => void;
}
const FoodRow: React.FC<IFoodRowProps> = (props: IFoodRowProps) => {
  let deleteFoodItem = () => {
    props.deleteFood(props.food);
  };
  return (
    <tr>
      <th scope="col" style={{ width: 360 }}>
        {props.food.foodName}
      </th>
      <td>{props.food.serving}</td>
      <td>{props.food.size}</td>
      <td>{props.food.calories}</td>
      <td>{props.food.fat}</td>
      <td>{props.food.satfat}</td>
      <td>{props.food.sodium}</td>
      <td>{props.food.carb}</td>
      <td>{props.food.fiber}</td>
      <td>{props.food.sugar}</td>
      <td>{props.food.protein}</td>
      <td>{3.45}</td>
      <td>
        <img src={editIcon} alt="edit icon" style={{ height: 18, width: 18 }} />
      </td>
      <td>
        <img
          src={deleteIcon}
          alt="delete icon"
          style={{ height: 18, width: 18 }}
          onClick={deleteFoodItem}
        />
      </td>
    </tr>
  );
};
export default FoodRow;
