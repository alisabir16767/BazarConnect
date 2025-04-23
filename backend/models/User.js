const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const validator = require("validator");

// USER SCHEMA
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username cannot exceed 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    role: {
      type: String,
      enum: ["customer", "seller", "admin"],
      default: "customer",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    zip_code: {
      type: String,
      required: [true, "Zip code is required"],
      trim: true,
      validate: {
        validator: function (v) {
          return (
            /^\d{5}(-\d{4})?$/.test(v) || // US ZIP
            /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(v) || // Canadian
            /^\d{6}$/.test(v) // Indian PIN code
          );
        },
        message: "Invalid zip/postal code format",
      },
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
    lastLogin: Date,
    created_at: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.hash;
        delete ret.salt;
        delete ret.loginAttempts;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.hash;
        delete ret.salt;
        delete ret.loginAttempts;
        return ret;
      },
    },
  }
);

// Virtual for full address
userSchema.virtual("fullAddress").get(function () {
  return `${this.address}, ${this.city}, ${this.state} ${this.zip_code}, ${this.country}`;
});

// Pre-save hook to update timestamps
userSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

// Plugin configuration
userSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
  usernameLowerCase: true,
  limitAttempts: true,
  maxAttempts: 5,
  errorMessages: {
    MissingPasswordError: "No password was given",
    AttemptTooSoonError: "Account is currently locked. Try again later",
    TooManyAttemptsError:
      "Account locked due to too many failed login attempts",
    NoSaltValueStoredError: "Authentication not possible. No salt value stored",
    IncorrectPasswordError: "Password or username are incorrect",
    IncorrectUsernameError: "Password or username are incorrect",
    MissingUsernameError: "No username was given",
    UserExistsError: "A user with the given username is already registered",
  },
});

module.exports = mongoose.model("User", userSchema);
