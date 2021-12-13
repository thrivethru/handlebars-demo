import express from "express";
import favicon from "serve-favicon";
import Handlebars from "handlebars";
import expressHandlebars from "express-handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";

import initializeDb from "./config/initialize-db.js";
import routes from "./routes.js";

initializeDb();

const app = express();

const handlebars = expressHandlebars.create({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("views", "./src/web/views");

app.use(favicon("./src/web/public/favicon.ico"));
app.use("/static", express.static("./src/web/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", routes);

export default app;
