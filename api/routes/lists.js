const router = require("express").Router();
const Lists = require("../model/Lists");
const verify = require("../verifyToken");

//CREATE

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newLists = new Lists(req.body);
    try {
      const savedLists = await newLists.save();
      res.status(201).json(savedLists);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});
// UPDATE

router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedList = await Lists.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      res.status(201).json(updatedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//DELETE
router.delete("/delete/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Lists.findByIdAndDelete(req.params.id);
      res.status(201).json("The list has been delete...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//GET
router.get("/", verify, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];

  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await Lists.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await Lists.aggregate([{ $sample: { size: 10 } }, { $match: { type: typeQuery } }]);
      }
    } else {
      list = await Lists.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
