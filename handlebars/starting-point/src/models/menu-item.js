import pkg from "sequelize";
import db from "../config/db.js";

const { DataTypes, Model } = pkg;

class MenuItem extends Model {}

MenuItem.init(
  {
    name: DataTypes.STRING,
    price: DataTypes.NUMBER,
  },
  {
    sequelize: db,
    timestamps: false,
  }
);

export default MenuItem;
