import pkg from "sequelize";
import db from "../config/db.js";

const { DataTypes, Model } = pkg;

class Restaurant extends Model {}

Restaurant.init(
  {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    sequelize: db,
    timestamps: false,
  }
);

export default Restaurant;
