const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    mapLink: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    payment: {
      type: Number,
      required: true,
      min: 0,
    },

    vacancies: {
      type: Number,
      required: true,
      default: 0,
    },

    dressCode: {
      type: String,
      trim: true,
      maxlength: 50,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 2000,
    },  

    image: {
      type: String,
      maxlength: 500,
    },

    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);