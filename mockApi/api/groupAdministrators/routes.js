var router = require("express").Router();
var Controller = require("./controller");

router.use(Controller.getAssignedGroups(true), Controller.EFAD());

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
 * Group Routes
 */
router.route("/groups").get(Controller.getAssignedGroups());
router
  .route("/groups/courses")
  .get(Controller.getGroupCourses)
  .post(Controller.extractCourse(), Controller.createGroupCourse);
router
  .route("/groups/courses/:id")
  .get(Controller.getOneGroupCourse())
  .delete(Controller.getOneGroupCourse(true), Controller.deleteGroupCourse)
  .put(
    Controller.extractCourse(),
    Controller.getOneGroupCourse(true),
    Controller.updateGroupCourse
  );
router.route("/groups/:id").get(Controller.getOneGroup);
router
  .route("/groups/groupoptions/:id")
  .get(Controller.groupRoute, Controller.getGroupDefault())
  .put(
    Controller.groupRoute,
    Controller.getGroupDefault(true),
    Controller.updateGroupDefault
  );

/**
 * Lecturer Operations
 */
router.route("/lecturers").get(Controller.getLecturers);
router
  .route("/lecturers/:id")
  .get(Controller.getOneLecturer)
  .delete(
    Controller.deleteLecturerChainUser,
    Controller.deleteLecturerChainLecturer,
    Controller.deleteLecturer
  );

/**
 * Student Operations
 */
router.route("/students").get(Controller.getStudents);
router
  .route("/students/:id")
  .get(Controller.studentParamRoute, Controller.getOneStudent)
  .delete(Controller.studentParamRoute, Controller.deleteStudent);

/**
 * Course Operations
 */
router.route("/courses").get(Controller.getCourses).post(Controller.addCourse);
router
  .route("/courses/:id")
  .get(Controller.getOneCourse())
  .delete(Controller.getOneCourse(true), Controller.deleteCourse)
  .put(Controller.getOneCourse(true), Controller.updateCourse);

/**
 * Group Administrator's Routes
 */
router
  .route("/me")
  .get(function (req, res) {
    res.status(200).json({
      message: "",
      data: req.user.toJson(),
    });
  })
  .put(Controller.updateAdmin);

module.exports = router;
