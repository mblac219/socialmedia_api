const { Schema, model } = require('mongoose');


// Schema to create Post model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      require: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Must be a valid email address" ]
    },
    thoughts: [
      {
      type: Boolean,
      ref: "Thought",
      },
    ],
    friends: [
      {
      type: Schema.Types.ObjectId,
      ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `getTags` that gets the amount of tags associated with an application
userSchema
  .virtual("friendCount")
  // Getter
  .get(function () {
    return this.friends.length;
  });

// Initialize our Application model
const User = model("User", userSchema);

module.exports = User;
