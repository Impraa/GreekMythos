const express = require("express");
const app = express();
const path = require("path");
const GreekMyth = require("greek-mythology-data");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/home", (req, res) => {
  res.render("home", { GreekMyth });
});

app.get("/home/majorOlympians", (req, res) => {
  res.render("majorOlympians", { GreekMyth });
});

app.get("/home/twelveTitan", (req, res) => {
  res.render("twelveTitans", { GreekMyth });
});

app.get("/home/overview", (req, res) => {
  let godName = req.query;
  let notFound = 0;
  console.log(GreekMyth.allCollection[16]);
  for (let i = 0; i < GreekMyth.allCollection.length; i++) {
    if (Object.values(GreekMyth.allCollection[i]).includes(godName.name)) {
      const god = GreekMyth.allCollection[i];
      res.render("overview", { god });
    }
    notFound++;
  }
  if (notFound === 1718) {
    res.render("notfound");
  }
});
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
