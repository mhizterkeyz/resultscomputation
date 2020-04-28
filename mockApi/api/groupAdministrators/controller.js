var Invites = require("../models/invitesModel");
var Users = require("../models/usersModel");
var Lecturers = require("../models/lecturersModel");
var Group = require("../models/institutionalGroupsModel");
var GroupOptions = require("../models/groupOptionsModel");
var Course = require("../models/coursesModel");
var Students = require("../models/StudentsModel");
var GroupCourse = require("../models/groupCoursesModel");
var Utils = require("../../utils/util");
var SignToken = require("../../auth/auth").signToken;
var _ = require("lodash");

/**
 * Inviting new administrators...
 */
exports.getInvites = function (req, res, next) {
  Invites.find({ $or: [{ role: "lecturer" }, { role: "student" }] }).then(
    function (invites) {
      var invite = invites.map(function (elem) {
        return elem.toJson();
      });
      res.status(200).json({
        message: "",
        data: invite,
      });
    },
    function (err) {
      next(err);
    }
  );
};
exports.newInvite = function (req, res, next) {
  if (
    !req.validate({
      type: "required|boolean",
    })
  )
    return;
  var inviteType = req.body.type ? "student" : "lecturer";
  Invites.create({ role: inviteType, created_at: Date.now().toString() }).then(
    function (saved) {
      res.status(200).json({
        message: "Invite Created!",
        data: saved.toJson(),
      });
    },
    function (err) {
      next(err);
    }
  );
};
exports.deleteInvite = function (req, res, next) {
  var id = req.params.invite_id;
  Invites.findByIdAndDelete(id, function (err, removed) {
    if (err) return next(err);
    if (removed)
      return res.status(200).json({
        message: "Invite deleted!",
        data: removed,
      });
    return res.status(404).json({
      message: "Could not find invite",
      data: {},
    });
  });
};
exports.getOneInvite = function (req, res, next) {
  var id = req.params.invite_id;
  Invites.findById(id, function (err, invite) {
    if (err) return next(err);
    if (invite)
      return res.status(200).json({
        message: "",
        data: invite.toJson(),
      });
    return res.status(404).json({
      message: "Could not find invite",
      data: {},
    });
  });
};
exports.updateInvite = function (req, res, next) {
  if (
    !req.validate({
      type: "required|boolean",
    })
  )
    return;
  var id = req.params.invite_id;
  if (req.body.id) delete req.body.id;
  if (req.body.created_at) delete req.body.created_at;
  req.body.role = req.body.type ? "student" : "lecturer";
  if (req.body.type) delete req.body.type;
  Invites.findById(id, function (err, invite) {
    if (err) return next(err);
    if (invite) {
      _.merge(invite, req.body);
      return invite.save(function (err, saved) {
        if (err) return next(err);
        return res.status(200).json({
          message: "Invite updated!",
          data: saved,
        });
      });
    }
    return res.status(404).json({
      message: "Could not find invite.",
      data: {},
    });
  });
};

/**
 * Group Operations
 */
exports.groupRoute = function (req, res, next) {
  Group.findOne({ _id: req.params.id, group_admin: req.user._id })
    .then(function (group) {
      if (group) {
        req.group = group;
        return next();
      }

      res.status(404).json({
        message: "No group with that ID was assigned to you.",
        data: {},
      });
    })
    .catch(function (err) {
      next(err);
    });
};
exports.getAssignedGroups = function (attachToReq = false) {
  return function (req, res, next) {
    Group.find({ group_admin: req.user._id })
      .then(function (groups) {
        var result = groups.map(function (group) {
          var g = group.toObject();
          delete g.group_admin;
          return g;
        });
        if (attachToReq) {
          req.assigned_groups = result || {};
          return next();
        }
        res.status(200).json({
          message: "",
          data: result,
        });
      })
      .catch(function (err) {
        next(err);
      });
  };
};
exports.getOneGroup = function (req, res, next) {
  var id = req.params.id;
  Group.findOne({ _id: id, group_admin: req.user._id })
    .then(function (group) {
      if (group) {
        var g = group.toObject();
        delete g.group_admin;
        return res.status(200).json({
          message: "",
          data: g,
        });
      }
      return res
        .status(404)
        .json({ message: "Could not find group.", data: {} });
    })
    .catch(function (err) {
      next(err);
    });
};
exports.getGroupDefault = function (attachToReq = false) {
  return function (req, res, next) {
    req.validate({ set: "required|number" }) &&
      GroupOptions.find({ group: req.group._id })
        .populate("group", "_id faculty department")
        .exec()
        .then(function (options) {
          if (options) {
            var opt = _.find(options, { set: req.body.set });
            if (opt) {
              if (attachToReq) {
                req.group_defaults = opt;
                next();
              } else {
                res.status(200).json({ message: "", data: opt });
              }
              return false;
            }
          }
          return GroupOptions.create({
            set: req.body.set,
            group: req.group._id,
          });
        })
        .then(function (created) {
          if (created) {
            var result = created.toObject();
            result.group = {
              _id: req.group._id,
              faculty: req.group.faculty,
              department: req.group.department,
            };
            if (attachToReq) {
              created.group = {
                _id: req.group._id,
                faculty: req.group.faculty,
                department: req.group.department,
              };
              req.group_defaults = created;
              next();
            } else {
              res.status(200).json({
                message: "",
                data: result,
              });
            }
          }
        })
        .catch(function (err) {
          next(err);
        });
  };
};
exports.updateGroupDefault = function (req, res, next) {
  if (
    !req.validate({
      grade_system: "string",
      levels: "number",
      reg_cap: "number",
      reg_norm: "number",
      reg_min: "number",
    })
  )
    return;
  if (
    req.body.grade_system &&
    !Utils.validateGradeSystem(req.body.grade_system)
  )
    return res
      .status(400)
      .json({ message: "Invalid grade system format", data: {} });
  if (req.body.group) delete req.body.group;
  if (req.body._id) delete req.body._id;
  _.merge(req.group_defaults, req.body);
  req.group_defaults.save(function (err, saved) {
    if (err) return next(err);
    return res.status(200).json({
      message: "Group options updated!",
      data: saved,
    });
  });
};

/**
 * Lecturer Operations
 */
exports.getLecturers = function (req, res, next) {
  Users.find({ user_role: "lecturer" })
    .then(function (users) {
      var lecturerPromises = users.map(function (user) {
        return Lecturers.find({ personal_info: user._id })
          .populate("personal_info", "name _id email")
          .populate("courses_assigned", "course _id")
          .populate("group", "faculty department _id")
          .exec();
      });
      return Promise.all(lecturerPromises);
    })
    .then(function (lecturers) {
      var result = [];
      lecturers.forEach(function (elem) {
        if (_.find(req.assigned_groups, { _id: elem.group._id }))
          result.push(elem);
      });
      res.status(200).json({
        message: "",
        data: result,
      });
    })
    .catch(function (err) {
      return next(err);
    });
};
exports.getOneLecturer = function (req, res, next) {
  var id = req.params.id;
  Users.findById(id)
    .then(function (user) {
      if (user)
        return Lecturers.find({ personal_info: user._id })
          .populate("personal_info", "name email _id")
          .populate("courses_assigned", "course _id")
          .populate("group", "faculty department _id")
          .exec();
      res.status(404).json({ message: "Lecturer not found!", data: {} });
      return false;
    })
    .then(function (lecturer) {
      if (lecturer)
        res.status(200).json({
          message: "",
          data: lecturer,
        });
    })
    .catch(function (err) {
      return next(err);
    });
};
exports.deleteLecturerChainUser = function (req, res, next) {
  var id = req.params.id;
  Users.findById(id)
    .then(function (user) {
      if (user) {
        req.lecturer_user = user;
        return next();
      }
      return res.status(404).json({ message: "Lecturer not found!", data: {} });
    })
    .catch(function (err) {
      return next(err);
    });
};
exports.deleteLecturerChainLecturer = function (req, res, next) {
  Lecturers.findOne({ personal_info: req.lecturer_user._id })
    .populate("personal_info", "name _id")
    .populate("courses_assigned", "course")
    .populate("group", "faculty department _id")
    .exec()
    .then(function (lecturer) {
      if (
        lecturer &&
        _.find(req.assigned_groups, { _id: lecturer.group._id })
      ) {
        req.lecturer = lecturer;
        return next();
      }
      res
        .status(403)
        .json({ message: "You can't remove this lecturer.", data: {} });
      return false;
    })
    .catch(function (err) {
      return next(err);
    });
};
exports.deleteLecturer = function (req, res, next) {
  Course.find({ lecturer: req.lecturer._id })
    .then(function (courses) {
      courses.forEach(function (elem) {
        elem.lecturer = null;
        elem.save();
      });
      req.lecturer_user.remove();
      req.lecturer.remove(function (err, removed) {
        if (err) return next(err);
        res.status(200).json({
          message:
            "Lecturer has been removed and all associated courses have no lecturer now.",
          data: {},
        });
      });
    })
    .catch(function (err) {
      next(err);
    });
};

/**
 * Student Operations
 */
exports.getStudents = function (req, res, next) {
  var findQuery = req.query;
  Students.find(findQuery)
    .populate("personal_data", "name email _id")
    .populate("group", "faculty department _id")
    .exec()
    .then(function (students) {
      var result = [];
      students.forEach(function (student) {
        if (_.find(req.assigned_groups, { _id: student.group._id }))
          result.push(student);
      });
      res.status(200).json({ message: "", data: result });
    })
    .catch(function (err) {
      return next(err);
    });
};
exports.studentParamRoute = function (req, res, next) {
  var id = req.params.id;
  Students.findById(id)
    .populate("personal_data", "name email _id")
    .populate("group", "faculty department _id")
    .exec()
    .then(function (student) {
      if (student) {
        req.student = student;
        return next();
      }
      return res.status(404).json({ message: "Student not found!", data: {} });
    })
    .catch(function (err) {
      return next(err);
    });
};
exports.getOneStudent = function (req, res, next) {
  return res.status(200).json({ message: "", data: req.student });
};
exports.deleteStudent = function (req, res, next) {
  Users.findByIdAndRemove(req.student.personal_data._id)
    .then(function (removed) {
      return req.student.remove();
    })
    .then(function (removed) {
      res
        .status(200)
        .json({ message: "Student removed successfully!", data: removed });
    })
    .catch(function (err) {
      return next(err);
    });
};

/**
 * Course Operations
 */
exports.getCourses = function (req, res, next) {
  Course.find(req.query)
    .populate("added_by", "faculty department _id")
    .populate("lecturer", "personal_info")
    .populate("personal_info", "name _id email")
    .exec()
    .then(function (courses) {
      res.status(200).json({ message: "", data: courses });
    })
    .catch(function (err) {
      return next(err);
    });
};
exports.addCourse = function (req, res, next) {
  req.validate({
    course: "string|required",
    units: "number|required",
    faculty: "string|required",
    department: "string|required",
    semester: "number|required",
    level: "number|required",
    lecturer: "string",
  }) &&
    Group.findOne({
      faculty: req.body.faculty,
      department: req.body.department,
    })
      .then(function (group) {
        if (group) {
          req.body.course = req.body.course.toUpperCase();
          req.body.added_by = group._id;
          return group;
        }
        res.status(404).json({
          message: "Invalid faculty or department provided",
          data: {},
        });
      })
      .then(function (group) {
        if (group) return Course.create(req.body);
      })
      .then(function (created) {
        res.status(200).json({ message: "Course created!", data: created });
      })
      .catch(function (err) {
        return next(err);
      });
};
exports.getOneCourse = function (attachToReq = false) {
  return function (req, res, next) {
    var id = req.params.id;
    Course.findById(id)
      .populate("added_by", "faculty department _id")
      .populate("lecturer", "personal_info")
      .populate("personal_info", "name _id email")
      .exec(function (err, course) {
        if (err) return next(err);
        if (course && attachToReq) {
          req.course = course;
          return next();
        }
        if (course) return res.status(200).json({ message: "", data: course });
        return res
          .status(404)
          .json({ message: "Could not find course!", data: {} });
      });
  };
};
exports.deleteCourse = function (req, res, next) {
  req.course.remove(function (err, removed) {
    if (err) return next(err);
    return res.status(200).json({ message: "Course deleted!", data: removed });
  });
};
exports.updateCourse = function (req, res, next) {
  if (
    !req.validate({
      course: "string",
      units: "number",
      faculty: "string",
      department: "string",
      semester: "number",
      level: "number",
      lecturer: "string",
    })
  )
    return;
  if (req.body._id) delete req.body._id;
  req.body.course = req.body.course
    ? req.body.course.toUpperCase()
    : req.body.course;
  if (req.body.faculty && req.body.department) {
    return Group.findOne({
      faculty: req.body.faculty,
      department: req.body.department,
    })
      .then(function (group) {
        if (group) {
          req.body.added_by = group._id;
          return group;
        }
        res.status(404).json({
          message: "Invalid faculty or department provided",
          data: {},
        });
      })
      .then(function (group) {
        if (group) {
          _.merge(req.course, req.body);
          return req.course.save();
        }
      })
      .then(function (saved) {
        res.status(200).json({ message: "Course updated!", data: saved });
      })
      .catch(function (err) {
        return next(err);
      });
  }

  _.merge(req.course, req.body);
  req.course.save(function (err, saved) {
    if (err) return next(err);
    return res.status(200).json({ message: "Course updated!", data: saved });
  });
};

/**
 * Group Courses' Operations
 */
exports.getGroupCourses = function (req, res, next) {
  if (req.query.course_type)
    req.query.course_type = req.query.course_type.toUpperCase() === "CORE";
  GroupCourse.find(req.query)
    .populate("course", "course _id units level semester lecturer")
    .populate("lecturer", "name _id email")
    .populate("group", "_id faculty department")
    .exec(function (err, courses) {
      if (err) return next(err);
      var results = [];
      courses.forEach(function (course) {
        if (_.find(req.assigned_groups, { _id: course.group._id }))
          results.push(course.toJson());
      });
      return res.status(200).json({ message: "", data: results });
    });
};
exports.createGroupCourse = function (req, res, next) {
  if (
    !req.validate({
      course: "string|required",
      course_type: "boolean|required",
      faculty: "string|required",
      department: "string|required",
      student_set: "number|required",
    })
  )
    return;
  GroupCourse.findOne({
    course: req.course._id,
    student_set: req.body.student_set,
    group: req.group._id,
  })
    .then(function (course) {
      if (course) {
        res.json({ message: "Course already exists!", data: {} }).status(400);
        return false;
      }
      return GroupCourse.create({
        course: req.course._id,
        course_type: req.body.course_type,
        group: req.group._id,
        student_set: req.body.student_set,
      });
    })
    .then(function (created) {
      if (created)
        return res
          .status(200)
          .json({ message: "Group course added!", data: created.toJson() });
    })
    .catch(function (err) {
      return next(err);
    });
};
exports.getOneGroupCourse = function (attachToReq = false) {
  return function (req, res, next) {
    var id = req.params.id;
    GroupCourse.findById(id)
      .populate("course", "_id course units semester level")
      .populate("group", "_id faculty department")
      .exec(function (err, course) {
        if (err) return next(err);
        if (course) {
          if (_.find(req.assigned_groups, { _id: course.group._id })) {
            if (attachToReq) {
              req.group_course = course;
              return next();
            }
            return res.status(200).json({ message: "", data: course.toJson() });
          }
          return res
            .status(403)
            .json({ message: "You don't the permissions for this.", data: {} });
        }
        return res.status(200).json({ message: "Course not found!", data: {} });
      });
  };
};
exports.deleteGroupCourse = function (req, res, next) {
  req.group_course.remove(function (err, deleted) {
    if (err) return next(err);
    return res
      .status(200)
      .json({ message: "Course deleted!", data: deleted.toJson() });
  });
};
exports.updateGroupCourse = function (req, res, next) {
  if (req.body.group) delete req.body.group;
  if (req.body.course) delete req.body.course;
  req.body.course = req.body.course ? req.course._id : req.body.course;
  if (req.group) req.body.group = req.group._id;
  GroupCourse.findOne({
    course: req.body.course || req.group_course.course._id,
    group: req.body.group || req.group_course.group._id,
    student_set: req.body.student_set || req.group_course.student_set,
  })
    .then(function (course) {
      if (
        course &&
        course.toObject()._id.toString() !==
          req.group_course.toObject()._id.toString()
      ) {
        return res.status(400).json({
          message: "Can't update. Course already exists with the same data!",
          data: {},
        });
      }
      _.merge(req.group_course, req.body);
      return req.group_course.save();
    })
    .then(function (saved) {
      res
        .status(200)
        .json({ message: "Course updated!", data: saved.toJson() });
    })
    .catch(function (err) {
      return next();
    });
};

/**
 * Operation on Group's Administrator
 */
exports.createGroupAdmin = function (req, res, next) {
  if (
    !req.validate({
      name: "required|string",
      username: "required|string",
      email: "required|string",
      invite_token: "required|string",
      password: "required|string",
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
      if (invite.role !== "groupAdministrator")
        return res
          .status(400)
          .json({ message: "Invalid invite token!", data: {} });
      user.user_role = invite.role;
      return Users.create(user, function (err, created) {
        if (err) return next(err);
        var access_token = SignToken(created._id);
        user = _.merge(created.toJson(), { access_token });
        invite.remove();
        return res.status(200).json({
          message: "Signup successful!",
          data: user,
        });
      });
    }
    return res.status(400).json({ message: "Invalid invite token!", data: {} });
  });
};
exports.updateAdmin = function (req, res, next) {
  if (req.body.id) delete req.body.id;
  if (req.body.user_role) delete req.body.user_role;
  _.merge(req.user, req.body);
  req.user.save(function (err, saved) {
    if (err) return next(err);
    res.status(200).json({
      message: "Account updated!",
      data: saved.toJson(),
    });
  });
};

/**
 * Make My Life Easy Please
 */
exports.EFAD = function (attachToReq = false) {
  return function (req, res, next) {
    if (req.body.faculty && req.body.department) {
      req.body.faculty = req.body.faculty.toLowerCase();
      req.body.department = req.body.department.toLowerCase();
      return Group.findOne({
        faculty: req.body.faculty,
        department: req.body.department,
      })
        .populate("group_admin", "name _id email")
        .exec(function (err, group) {
          if (err) return next(err);
          if (group) {
            if (
              _.find(req.assigned_groups, { _id: group._id }) ||
              attachToReq
            ) {
              req.group = group;
              return next();
            }
            return res.status(200).json({
              message: "Faculty and department is not assigned to you",
              data: {},
            });
          }
          return res.status(404).json({
            message: "Invalid faculty or department provided",
            data: {},
          });
        });
    }
    next();
  };
};
exports.extractCourse = function () {
  return function (req, res, next) {
    if (req.body.course) {
      var searchQuery = { course: req.body.course.toUpperCase() };
      return Course.findOne(searchQuery)
        .populate("added_by", "department _id faculty")
        .populate("lecturer", "personal_info")
        .populate("personal_info", "name _id email")
        .exec(function (err, course) {
          if (err) return next(err);
          if (course) {
            req.course = course;
            return next();
          }
          return res
            .status(200)
            .json({ message: "Could not find course!", data: {} });
        });
    }
    return next();
  };
};
