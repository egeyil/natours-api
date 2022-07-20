const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  if (parseInt(val) > tours.length || parseInt(val) < 0) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body || !req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "Missing request parameters",
    });
  }
  next();
};

// Route Handlers
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.lengthf,
    data: {
      tours: tours,
    },
  });
};

exports.getTour = (req, res) => {
  const tour = tours.find((el) => el.id === parseInt(req.params.id));

  res.status(200).json({
    status: "success",
    data: {
      tours: tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  // Create new Obj by merging two existing ones
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      // 201 stands for created
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour: "Updated tour goes here",
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
  });
};
