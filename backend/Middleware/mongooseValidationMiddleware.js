// Requiring ObjectId from mongoose npm package
const ObjectId = require("mongoose").Types.ObjectId;

// Validator function
function isValidObjectId(id) {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
}

const mongooseValidationMiddleware = (req, res, next) => {
  var objectId = null;

  if (req.originalUrl.includes("project")) {
    objectId = req.params.projectId;
  } else {
    objectId = req.params.productId;
  }

  if (!isValidObjectId(objectId)) {
    res.status(404).send({ error: "Invalid Id! Item not found." });
  }

  next();
};

module.exports = mongooseValidationMiddleware;
