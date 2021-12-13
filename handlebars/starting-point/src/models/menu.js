import pkg from "sequelize";
import db from "../config/db.js";

const { DataTypes, Model } = pkg;

class Menu extends Model {}

Menu.init(
  {
    title: DataTypes.STRING,
  },
  {
    sequelize: db,
    timestamps: false,
  }
);

export default Menu;
