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

const validateStudentData = (req) => {
  const { name, college, status, dsaScore, webDScore, reactScore } = req.body;

  // Validate required fields
  if (!name || !college || !status) {
    throw new Error("Fields cannot be empty");
  }

  // Define scores in an object to loop through
  const scores = { DSA: dsaScore, WebD: webDScore, React: reactScore };

  // Loop through each score and validate if provided
  for (const [subject, score] of Object.entries(scores)) {
    if (score !== undefined && (score < 0 || score > 100)) {
      throw new Error(`${subject} score should be between 0 and 100`);
    }
  }
};

module.exports = { validateSignUpUser, validateStudentData };
