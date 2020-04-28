var router = require("express").Router();
var Controller = require("./administratorController");

/**
 * Invites routes
 */
router.route("/invites").get(Controller.getInvites).post(Controller.newInvite);
router
  .route("/invites/:invite_id")
  .get(Controller.getOneInvite)
  .delete(Controller.deleteInvite)
  .put(Controller.updateInvite);

/**
 * GroupRoutes
 */
router.route("/groups/admins").get(Controller.getGroupAdmins);
router
  .route("/groups/admins/:id")
  .get(
    Controller.adminRoute,
    Controller.routeProtect("groupAdministrator"),
    Controller.getOneAdmin
  )
  .delete(
    Controller.adminRoute,
    Controller.routeProtect("groupAdministrator"),
    Controller.deleteAdmin
  );
router.route("/groups").get(Controller.getGroups).post(Controller.addGroup);
router
  .route("/groups/:id")
  .get(Controller.groupRoute, Controller.getOneGroup)
  .put(Controller.groupRoute, Controller.updateGroup)
  .delete(Controller.groupRoute, Controller.deleteGroup);

/**
 * Administrator Routes
 */
router.route("/").get(Controller.getAppAdmins);
router
  .route("/me")
  .get(function (req, res) {
    res.status(200).json({
      message: "",
      data: req.user.toJson(),
    });
  })
  .put(Controller.updateAdmin);
router
  .route("/:id")
  .get(
    Controller.adminRoute,
    Controller.routeProtect("administrator"),
    Controller.getOneAdmin
  );

module.exports = router;
