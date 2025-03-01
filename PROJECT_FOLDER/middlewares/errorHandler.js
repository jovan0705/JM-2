const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case "EMPLOYEE_NOT_FOUND":
      res.status(400).json({ message: "Employee not found" });
      break;

    case "SequelizeValidationError":
      res.status(400).json({ message: err.errors[0].message });
      break;

    case "SequelizeDatabaseError": {
      res.status(400).json({ message: err.errors});
      break;
    }
    default:
      res.status(500).json(err);
      break;
  }
};

module.exports = { errorHandler };
