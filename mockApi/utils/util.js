exports.validateGradeSystem = function (gs = "") {
  gs = gs.split(",");
  var invalid = false;
  var result = {};
  gs.map(function (elem) {
    elem = elem.split("|");
    if (elem.length !== 4) {
      invalid = true;
      return false;
    }
    if (
      typeof elem[0] !== "string" ||
      isNaN(parseInt(elem[1])) ||
      isNaN(parseInt(elem[2])) ||
      isNaN(elem[3])
    ) {
      invalid = true;
      return false;
    }
    result[elem[0].toString().toLowerCase()] = {
      grade: elem[0],
      points: parseInt(elem[1]),
      min: parseInt(elem[2]),
      max: parseInt(elem[3]),
    };
    return result[elem[0].toString().toLowerCase()];
  });
  if (invalid) return false;
  return result;
};
