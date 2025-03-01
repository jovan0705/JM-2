const router = require("express").Router();
const employeeController = require("../controller/employeeController");

router.get("/report", employeeController.employeeReport);
router.get("/", employeeController.getAllEmployee);
router.get("/:id", employeeController.getEmployee);
router.post("/", employeeController.createEmployee);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;
