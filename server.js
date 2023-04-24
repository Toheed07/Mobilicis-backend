const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const fs = require("fs");
const rawData = fs.readFileSync("./sample_data.json");
// const data = JSON.parse(rawData);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Models
const User = require("./models/user");

// data.forEach((item) => {
//   const newData = new User({
//     id: item.id,
//     first_name: item.first_name,
//     last_name: item.last_name,
//     email: item.email,
//     gender: item.gender,
//     income: item.income,
//     city: item.city,
//     car: item.car,
//     quote: item.quote,
//     phone_price: item.phone_price,
//   });

//   newData.save((err) => {
//     console.log("users added")
//       if (err) {
//           console.error(err);
//       }
//   });
// });

let data = [];

app.get("/users", async (req, res) => {
  try {
    data = await User.find();
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/users/income-bmw-mercedes", (req, res) => {
  const filteredUsers = data.filter((user) => {
    const income = parseFloat(user.income.replace("$", ""));
    return income < 5 && (user.car === "BMW" || user.car === "Mercedes");
  });
  res.json(filteredUsers);
});

app.get("/users/male-phone-price", (req, res) => {
  const filteredUsers = data.filter((user) => {
    return user.gender === "Male" && user.phone_price > 10000;
  });
  res.json(filteredUsers);
});

app.get("/users/last-name-quote-email", (req, res) => {
  const filteredUsers = data.filter((user) => {
    return (
      user.last_name.toLowerCase().startsWith("m") &&
      user.quote.length > 15 &&
      user.email.toLowerCase().includes(user.last_name.toLowerCase())
    );
  });
  res.json(filteredUsers);
});

app.get("/users/car-brand-email", (req, res) => {
  const filteredUsers = data.filter((user) => {
    const carBrands = ["BMW", "Mercedes", "Audi"];
    const regex = /\d/;
    return carBrands.includes(user.car) && !regex.test(user.email);
  });
  res.json(filteredUsers);
});

app.get("/users/top-cities", (req, res) => {
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
  "mongodb://localhost/mobilicis-DB",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => {
    console.log("connected to DB");
  }
);

app.listen(3001, () => {
  console.log("Server is live");
});
