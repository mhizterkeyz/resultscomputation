var morgan = require("morgan");
var bodyParser = require("body-parser");

module.exports = function (app) {
  app.use(morgan("dev"));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(function (req, res, next) {
    req.validate = function (props) {
      var response = {};
      Object.keys(props).forEach(function (key) {
        var fieldProp = props[key].split("|");
        if (
          fieldProp.indexOf("required") !== -1 &&
          !req.body.hasOwnProperty(key)
        ) {
          response[key] = response.hasOwnProperty(key)
            ? " and is required"
            : `${key} is required`;
        }
        if (fieldProp.indexOf("required") !== -1)
          fieldProp.splice(fieldProp.indexOf("required"), 1);
        fieldProp.forEach(function (prop) {
          if (
            req.body.hasOwnProperty(key) &&
            typeof req.body[key] !== prop.toLowerCase()
          )
            response[key] = response.hasOwnProperty(key)
              ? `${response[key]} and must be ${
                  prop.toLowerCase() === "object" ? "an" : "a"
                } ${prop}`
              : `${key} must be ${
                  prop.toLowerCase() === "object" ? "an" : "a"
                } ${prop}`;
        });
      });
      if (Object.keys(response).length > 0) {
        res.status(400).json({
          message: "Invalid input!",
          data: response,
        });
        return false;
      }
      return true;
    };
    next();
  });
};
