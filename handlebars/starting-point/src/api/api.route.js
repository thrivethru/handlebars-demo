import express from "express";
import { check, validationResult } from "express-validator";
import Restaurant from "../models/restaurant.js";
import Menu from "../models/menu.js";
import MenuItem from "../models/menu-item.js";

const router = express.Router();

const restaurantChecks = [
  check("name").not().isEmpty().trim().escape(),
  check("image").isURL(),
  check("name").isLength({ max: 50 }),
];

router.get("/restaurants", async (req, res) => {
  const restaurants = await Restaurant.findAll();
  res.json(restaurants);
});

router.get("/restaurants/:id", async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.params.id, {
    include: {
      model: Menu,
      include: MenuItem,
    },
  });
  res.json(restaurant);
});

router.post("/restaurants", restaurantChecks, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const restaurant = await Restaurant.create(req.body);
  res.json(restaurant);
  res.sendStatus(201);
});

router.delete("/restaurants/:id", async (req, res) => {
  await Restaurant.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.sendStatus(200);
});

router.put("/restaurants/:id", restaurantChecks, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const restaurant = await Restaurant.findByPk(req.params.id);
  await restaurant.update(req.body);
  res.sendStatus(200);
  res.json(restaurant);
});

router.patch("/restaurants/:id", async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.params.id);
  await restaurant.update(req.body);
  res.sendStatus(200);
  res.json(restaurant);
});

export default router;
