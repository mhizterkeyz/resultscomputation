var Users = require("../models/usersModel");
var InstitutionalGroups = require("../models/institutionalGroupsModel");
var _ = require("lodash");
var Invites = require("../models/invitesModel");
var SignToken = require("../../auth/auth").signToken;

/**
 * Inviting new administrators...
 */
exports.getInvites = function (req, res, next) {
  Invites.find({
    $or: [{ role: "administrator" }, { role: "groupAdministrator" }],
  }).then(
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
  var inviteType = req.body.type ? "administrator" : "groupAdministrator";
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
    return res.status(404).jsonn({
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
  req.body.role = req.body.type ? "administrator" : "groupAdministrator";
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
 * Operation on App's Administrator
 */
exports.adminRoute = function (req, res, next) {
  var id = req.params.id;
  Users.findById(id).then(
    function (user) {
      if (!user || user.user_role === "student")
        return next(new Error("No admin with that id"));
      req.user = user.toJson();
      next();
    },
    function (err) {
      next(err);
    }
  );
};
exports.getAppAdmins = function (req, res, next) {
  Users.find({ user_role: "administrator" }).then(
    function (admins) {
      var data = admins.map(function (elem) {
        return elem.toJson();
      });
      res.status(200).json({
        message: "",
        data,
      });
    },
    function (err) {
      next(err);
    }
  );
};
exports.createAppAdmin = function (req, res, next) {
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
      if (invite.role !== "administrator")
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
          message: "Administrator created!",
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
      message: "Administrator updated",
      data: saved.toJson(),
    });
  });
};

/**
 * Operations on Institutional Groups
 */
exports.groupRoute = function (req, res, next) {
  var id = req.params.id;
  InstitutionalGroups.findById(id)
    .populate("group_admin", "_id name email")
    .exec()
    .then(
      function (group) {
        if (!group) return next(new Error("No group with that id"));
        req.group = group;
        next();
      },
      function (err) {
        next(err);
      }
    );
};
exports.getGroupAdmins = function (req, res, next) {
  Users.find({ user_role: "groupAdministrator" }).then(
    function (admins) {
      var result = admins.map(function (admin) {
        return admin.toJson();
      });
      res.status(200).json({
        message: "",
        data: result,
      });
    },
    function (err) {
      next(err);
    }
  );
};
exports.getOneAdmin = function (req, res, next) {
  var admin = req.user;
  return res.status(200).json({
    message: "",
    data: admin,
  });
};
exports.getGroups = function (req, res, next) {
  InstitutionalGroups.find({})
    .populate("group_admin", "_id name email")
    .exec()
    .then(
      function (group) {
        res.status(200).json({
          message: "",
          data: group,
        });
      },
      function (err) {
        next(err);
      }
    );
};
exports.getOneGroup = function (req, res, next) {
  var group = req.group;
  return res.status(200).json({
    message: "",
    data: group,
  });
};
exports.deleteAdmin = function (req, res, next) {
  InstitutionalGroups.find({ group_admin: req.user.id })
    .then(function (groups) {
      var savePromises = groups.map(function (elem) {
        elem.group_admin = null;
        return elem.save();
      });
      return Promise.all(savePromises);
    })
    .then(function (...promises) {
      return req.user.remove();
    })
    .then(function (removed) {
      return res.status(200).json({
        message:
          "Administrator deleted and all related Academic groups have no administrator now.",
        data: removed,
      });
    })
    .catch(function (err) {
      next(err);
    });
};
exports.addGroup = function (req, res, next) {
  var newGroup = _.merge(req.body, {
    faculty: req.body.faculty.toLowerCase(),
    department: req.body.department.toLowerCase(),
  });
  if (
    !req.validate({
      faculty: "required|string",
      department: "required|string",
      group_admin: "string",
    })
  )
    return;
  InstitutionalGroups.findOne({
    faculty: req.body.faculty.toLowerCase(),
    department: req.body.department.toLowerCase(),
  })
    .then(function (group) {
      if (group) {
        res.status(400).json({
          message: "A group already exists with the same credentials!",
          data: {},
        });
        return false;
      }
      return true;
    })
    .then(function (goAhead) {
      if (goAhead) return InstitutionalGroups.create(newGroup);
    })
    .then(function (group) {
      res.status(200).json({
        message: "Group created",
        data: group,
      });
    })
    .catch(function (err) {
      next(err);
    });
};
exports.updateGroup = function (req, res, next) {
  var group = req.group;
  var update = req.body;
  if (update.faculty) update.faculty = update.faculty.toLowerCase();
  if (update.department) update.department = update.department.toLowerCase();
  var newGroup = _.merge(group.toObject(), update);
  InstitutionalGroups.findOne({
    faculty: newGroup.faculty,
    department: newGroup.department,
  })
    .then(function (exitingGroup) {
      if (
        exitingGroup &&
        exitingGroup.toObject()._id.toString() !== newGroup._id.toString()
      )
        return res.status(400).json({
          message: "A group already exists with the same credentials!",
          data: {},
        });
      if (update.id) delete update.id;
      _.merge(group, update);
      group.save(function (err, save) {
        if (err) return next(err);
        return res.status(200).json({
          message: "Group updated!",
          data: save,
        });
      });
    })
    .catch(function (err) {
      next(err);
    });
};
exports.deleteGroup = function (req, res, next) {
  var group = req.group;
  group.remove(function (err, deleted) {
    if (err) return next(err);
    return res.status(200).json({
      message: "Group deleted!",
      data: deleted,
    });
  });
};

exports.routeProtect = function (criteria) {
  return function (req, res, next) {
    if (req.user.user_role !== criteria)
      return res
        .status(400)
        .json({ message: "No admin with that id!", data: {} });
    next();
  };
};
