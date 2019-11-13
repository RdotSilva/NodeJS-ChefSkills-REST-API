const path = require("path");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc      Register user
// @route     GET /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Create User
  const user = await user.create({
    name,
    email,
    password,
    role
  });

  res.status(200).json({ success: true });
});
