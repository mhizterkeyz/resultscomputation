var Student = require("../models/StudentsModel");
var Invites = require("../models/invitesModel");
var Users = require("../models/usersModel");
var Course = require("../models/groupCoursesModel");
var SignToken = require("../../auth/auth").signToken;
var _ = require("lodash");

/**
 * Operation on self
 */
exports.createStudent = function (req, res, next) {
  if (
    !req.validate({
      name: "required|string",
      username: "required|string",
      email: "required|string",
      invite_token: "required|string",
      password: "required|string",
      matric: "required|string",
      entry_year: "required|number",
      student_set: "required|number",
      faculty: "required|string",
      department: "required|string",
    })
  )
    return;
  var user = req.body;
  Invites.findById(req.body.invite_token, function (err, invite) {
    if (err)
      return res
        .status(400)
        .json({ message: "Invalid invite token!", data: {} });
    if (invite) {
      if (invite.role !== "student")
        return res
          .status(400)
          .json({ message: "Invalid invite token!", data: {} });
      user.user_role = invite.role;
      user.group = req.group._id;
      return Student.findOne({ matric: user.matric })
        .then(function (student) {
          if (student) {
            res
              .status(400)
              .json({ message: "Account already exists!", data: {} });
            return false;
          }
          return true;
        })
        .then(function (truth) {
          if (truth)
            Users.create(user, function (err, created) {
              if (err) return next(err);
              req.result = _.merge(
                { personal_data: created.toJson() },
                {
                  access_token: SignToken(created._id),
                  group: {
                    _id: user.group,
                    faculty: user.faculty,
                    department: user.department,
                  },
                }
              );
              user.personal_data = created._id;
              Student.create(user, function (err, created) {
                if (err) return next(err);
                var c = created.toObject();
                delete c.group;
                delete c.personal_data;
                req.result = _.merge(c, req.result);
                invite.remove();
                return res
                  .status(200)
                  .json({ message: "signup successful!", data: req.result });
              });
            });
        })
        .catch(function (err) {
          next(err);
        });
    }
    return res.status(400).json({ message: "Invalid invite token!", data: {} });
  });
};
exports.me = function (nexted = false, attachToReq = false) {
  return function (req, res, next) {
    Student.findOne({ personal_data: req.user._id })
      .populate("personal_data", "_id name email username")
      .populate("group", "_id faculty department")
      .then(function (student) {
        if (attachToReq) {
          req.student = student;
          return next();
        }
        res
          .status(200)
          .json({ message: nexted ? "Account updated!" : "", data: student });
      })
      .catch(function (err) {
        next(err);
      });
  };
};
exports.updateStudent = function (req, res, next) {
  if (req.body.id) delete req.body.id;
  if (req.body.user_role) delete req.body.user_role;
  _.merge(req.user, req.body);
  req.user.save(function (err, saved) {
    if (err) return next(err);
    return next();
  });
};

/**
 * Operation on course
 */
exports.courses = function (attachToReq = false) {
  return function (req, res, next) {
    if (req.query.course_type)
      req.query.course_type = req.query.course_type === "CORE" ? true : false;
    var courseTypeArgument =
      req.query.course_type !== undefined
        ? { course_type: req.query.course_type }
        : {};
    var searchQuery = _.merge({
      student_set: req.query.student_set || req.student.student_set,
      ...courseTypeArgument,
      group: req.student.group._id,
    });
    Course.find(searchQuery)
      .populate("course", "_id course units level semester")
      .populate("group", "_id faculty department")
      .exec(function (err, courses) {
        if (err) return next(err);
        if (attachToReq) {
          req.courses = courses;
          return next();
        }
        var result = [];
        courses.forEach(function (course) {
          var reqCourse;
          if (req.query.course)
            req.query.course = req.query.course.toUpperCase();
          reqCourse = req.query.course;
          req.query.level = req.query.level
            ? parseInt(req.query.level)
            : req.query.level;
          req.query.semester = req.query.semester
            ? parseInt(req.query.semester)
            : req.query.semester;
          if (
            course.course.course === (reqCourse || course.course.course) &&
            course.course.semester ===
              (req.query.semester || course.course.semester) &&
            course.course.level === (req.query.level || course.course.level)
          )
            result.push(course.toJson());
        });
        res.status(200).json({ message: "", data: result });
      });
  };
};
