const express = require("express");
const app = express();

const PORT = 4005;

//Middleware to recieve JSON data
app.use(express.json());

let bags = [
  {
    id: 1,
    name: "Gucci bag",
    color: "Brown",
    country: "Brazil",
    year_made: "1990",
  },

  {
    id: 2,
    name: "Coach bag",
    color: "Pink",
    country: "United Kingdom",
    year_made: "2025",
  },

  {
    id: 3,
    name: "Fred Perry bag",
    color: "Frozen blue",
    country: "Nigeria",
    year_made: "1894",
  },
];
//GET request to fetch all trees
app.get("/api/bags", (req, res) => {
  res.status(200).json({
    success: true,
    message: "All the Bags",
  });
});

//GET a single bag by ID
app.get("/api/bags/:id", (req, res) => {
  const id = Number(req.params.id);
  const bag = bags.find((bag) => bag.id === id);
  if (!bag) {
    return res.status(404).json({
      success: false,
      message: "bag not found",
    });
  }
  res.status(200).json({
    success: true,
    message: "bag found",
    data: bag,
  });
});

//POST request to add a new tree
app.post("/api/bags", (req, res) => {
  const { name, color, country, year_made } = req.body;
  const newBag = {
    id: bags.length + 1,
    name,
    color,
    country,
    year_made,
  };
  bags.push(newBag);
  res.status(201).json({
    success: true,
    message: "Bag added successfully",
    data: newBag,
  });
});
//PUT request to update a tree by ID
app.put("/api/bags/:id", (req, res) => {
  const id = Number(req.params.id);
  const bag = bags.find((bag) => bag.id === id);
  if (!bag) {
    return res.status(404).json({
      success: false,
      message: "bag not found",
    });
  }
  const { year_made } = req.body;

  if (!year_made) {
    return res.status(400).json({
      success: true,
      message: " provide a new bag.",
    });
  }

  bag.year_made = year_made;

  res.status(200).json({
    success: true,
    message: "bag updated in success",
    data: bag,
  });
});

// PATCH - edit everything in the json data
app.patch("/api/bags/:id", (req, res) => {
  const id = Number(req.params.id);
  const bag = bags.find((bag) => bag.id === id);
  if (!bag) {
    return res.status(404).json({
      success: false,
      message: "bag not found",
    });
  }
  Object.assign(bag, req.body);
  res.status(200).json({
    success: true,
    message: "bag updated successfully",
    data: bag,
  });
});

//DELETE -delete tree from the JSON
app.delete("/api/bags/:id", (req, res) => {
  const bagId = parseInt(req.params.id);
  const bagIndex = bags.findIndex((bag) => bag.id === bagId);

  if (bagIndex !== -1) {
    bags.splice(bagIndex, 1);
    res.status(200).json({
      success: true,
      message: `bag with ID ${bagId} deleted successfully`,
      data: bags,
    })
  }
  else {
    res.status(404).json({
      success: false,
      message: `bag with ID ${bagId} not found`,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});