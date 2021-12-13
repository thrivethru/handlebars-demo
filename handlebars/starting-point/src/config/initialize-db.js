import Restaurant from "../models/restaurant.js";
import Menu from "../models/menu.js";
import MenuItem from "../models/menu-item.js";
import db from "./db.js";

async function initializeDb() {
  Restaurant.hasMany(Menu);
  Menu.belongsTo(Restaurant);
  Menu.hasMany(MenuItem);
  MenuItem.belongsTo(Menu);
  await db.sync();
}

export default initializeDb;
