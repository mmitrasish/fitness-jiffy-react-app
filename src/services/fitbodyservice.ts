import { Observable, defer, from } from "rxjs";
import { IUserProfile } from "../models/userprofile";
import { IFood } from "../models/food";

class FitBodyService {
  public getUserProfiles = (): Observable<IUserProfile[]> => {
    return defer(() =>
      // for lazy loading
      {
        return from<Promise<IUserProfile[]>>( // generic type coversion of promise to observable
          fetch(`http://localhost:3500/userprofile`)
            .then(r => r.json())
            .then(this.mapToUserProfiles)
        );
      }
    );
  };

  public getFoods = (): Observable<IFood[]> => {
    return defer(() =>
      // for lazy loading
      {
        return from<Promise<IFood[]>>( // generic type coversion of promise to observable
          fetch(`http://localhost:4000/foods`)
            .then(r => r.json())
            .then(this.mapToFoods)
        );
      }
    );
  };

  public getUserProfile = (email: string | null): Observable<IUserProfile> => {
    return defer(() =>
      // for lazy loading
      {
        return from<Promise<IUserProfile>>( // generic type coversion of promise to observable
          fetch(`http://localhost:3500/userprofile/${email}`).then(r =>
            r.json()
          )
        );
      }
    );
  };

  public postUserProfile = (userprofile: IUserProfile): Observable<any> => {
    return defer(() => {
      return from<Promise<any>>(
        fetch(`http://localhost:3500/userprofile`, {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          method: "POST",
          body: JSON.stringify(userprofile)
        })
      );
    });
  };

  public postFood = (food: IFood): Observable<any> => {
    return defer(() => {
      return from<Promise<any>>(
        fetch(`http://localhost:4000/foods`, {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          method: "POST",
          body: JSON.stringify(food)
        })
      );
    });
  };

  public updateUserProfile = (
    update: any,
    email: string | null
  ): Observable<any> => {
    return defer(() => {
      return from<Promise<any>>(
        fetch(`http://localhost:3500/userprofile/${email}`, {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          method: "PUT",
          body: JSON.stringify(update)
        })
      );
    });
  };

  private mapToUserProfiles = (
    userprofiles: IUserProfile[]
  ): IUserProfile[] => {
    return userprofiles.map(this.mapToUserProfile);
  };

  private mapToUserProfile(userprofile: IUserProfile): IUserProfile {
    return {
      email: userprofile.email,
      password: userprofile.password,
      firstname: userprofile.firstname,
      lastname: userprofile.lastname,
      gender: userprofile.gender,
      birthday: userprofile.birthday,
      height: userprofile.height,
      activity: userprofile.activity,
      weight: userprofile.weight,
      bmi: userprofile.bmi,
      calories: userprofile.calories,
      points: userprofile.points,
      foodEaten: userprofile.foodEaten,
      exerciseDone: userprofile.exerciseDone
    };
  }

  private mapToFoods = (foods: IFood[]): IFood[] => {
    return foods.map(this.mapToFood);
  };

  private mapToFood(food: IFood): IFood {
    return {
      foodName: food.foodName,
      serving: food.serving,
      size: food.size,
      calories: food.calories,
      fat: food.fat,
      satfat: food.satfat,
      carb: food.carb,
      fiber: food.fiber,
      sugar: food.sugar,
      protein: food.protein,
      sodium: food.sodium
    };
  }
}

export default new FitBodyService();
