const validator = require("validator");

const validateSignUpUser = (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Fields cannot be empty");
  }

  if (email.length > 254) {
    throw new Error("Email address is too long");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email format. Please enter a valid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must be at least 8 characters include one uppercase letter, one number, and one special character"
    );
  }
};

module.exports = { validateSignUpUser };
