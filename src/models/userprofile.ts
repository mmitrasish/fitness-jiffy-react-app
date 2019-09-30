import { IFood } from "./food";
import { IExercise } from "./exercise";

export interface IWeight {
  date: string;
  weight: number;
}
export interface IFoodEaten {
  date: string;
  foods: IFood[];
}
export interface IExerciseDone {
  date: string;
  exercises: IExercise[];
}
export interface IUserProfile {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  gender: string;
  birthday: string;
  height: number;
  activity: string;
  weight: IWeight[];
  bmi: number;
  calories: number;
  points: number;
  foodEaten: IFoodEaten[];
  exerciseDone: IExerciseDone[];
}
