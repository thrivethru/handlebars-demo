import db from "../src/config/db.js";
import fs from "fs/promises";
import initializeDb from "../src/config/initialize-db.js";
import Restaurant from "../src/models/restaurant.js";
import Menu from "../src/models/menu.js";
import MenuItem from "../src/models/menu-item.js";

async function populateDb() {
  await initializeDb();
  await db.sync({ force: true });
  const buffer = await fs.readFile(
    new URL("restaurants.json", import.meta.url)
  );
  const restaurants = JSON.parse(String(buffer));
  for (const restaurantData of restaurants) {
    const restaurant = await Restaurant.create(restaurantData);
    for (const menuData of restaurantData.menus) {
      const menu = await Menu.create(menuData);
      await restaurant.addMenu(menu);
      for (const menuItemData of menuData.items) {
        const menuItem = await MenuItem.create(menuItemData);
        await menu.addMenuItem(menuItem);
      }
    }
  }
}

populateDb();
