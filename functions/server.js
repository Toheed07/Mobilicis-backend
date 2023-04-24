const express = require("express");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const cors = require("cors");
const serverless = require('serverless-http');
const router = express.Router();

// Models
const User = require("../models/user");

let data = [];

router.get("/users", async (req, res) => {
  try {
    data = await User.find();
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

router.get("/users/income-bmw-mercedes", (req, res) => {
  const filteredUsers = data.filter((user) => {
    const income = parseFloat(user.income.replace("$", ""));
    return income < 5 && (user.car === "BMW" || user.car === "Mercedes");
  });
  res.json(filteredUsers);
});

router.get("/users/male-phone-price", (req, res) => {
  const filteredUsers = data.filter((user) => {
    return user.gender === "Male" && user.phone_price > 10000;
  });
  res.json(filteredUsers);
});

router.get("/users/last-name-quote-email", (req, res) => {
  const filteredUsers = data.filter((user) => {
    return (
      user.last_name.toLowerCase().startsWith("m") &&
      user.quote.length > 15 &&
      user.email.toLowerCase().includes(user.last_name.toLowerCase())
    );
  });
  res.json(filteredUsers);
});

router.get("/users/car-brand-email", (req, res) => {
  const filteredUsers = data.filter((user) => {
    const carBrands = ["BMW", "Mercedes", "Audi"];
    const regex = /\d/;
    return carBrands.includes(user.car) && !regex.test(user.email);
  });
  res.json(filteredUsers);
});

router.get("/users/top-cities", (req, res) => {
  const cityCounts = {};
  const cityIncomes = {};
  data.forEach((user) => {
    if (cityCounts[user.city]) {
      cityCounts[user.city]++;
      cityIncomes[user.city] += parseFloat(user.income.replace("$", ""));
    } else {
      cityCounts[user.city] = 1;
      cityIncomes[user.city] = parseFloat(user.income.replace("$", ""));
    }
  });

  const topCities = Object.keys(cityCounts)
    .sort((a, b) => cityCounts[b] - cityCounts[a])
    .slice(0, 10);

  const cityData = topCities.map((city) => ({
    city,
    users: cityCounts[city],
    avgIncome: cityIncomes[city] / cityCounts[city],
  }));
  
  res.json(cityData);
});

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => {
    console.log("connected to DB");
  }
);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/.netlify/functions/server', router);

module.exports.handler = serverless(app, {
  requestTimeout: 30000
});