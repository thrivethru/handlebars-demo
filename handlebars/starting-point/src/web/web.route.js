import express from "express";
import Restaurant from "../models/restaurant.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const restaurants = await Restaurant.findAll();
  res.render("home", { home: true, restaurants });
});

router.get("/:id", async (req, res) => {
  const restaurants = await Restaurant.findAll();
  const restaurant = await Restaurant.findByPk(req.params.id, {
    include: { all: true, nested: true },
  });

  restaurant.Menus.forEach((menu) =>
    menu.MenuItems.forEach((item) => {
      item.price = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(item.price);
    })
  );
  res.render("restaurant", { restaurants, restaurant });
});

export default router;
