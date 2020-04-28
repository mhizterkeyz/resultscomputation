var router = require("express").Router();
var controller = require("./controller");

router.use(controller.me(false, true));

/**
 * Course Operations
 */
router.route("/courses").get(controller.courses());

/**
 * Operation on self
 */
router
  .route("/me")
  .get(controller.me())
  .put(controller.updateStudent, controller.me(true));

module.exports = router;
