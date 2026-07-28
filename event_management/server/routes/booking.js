const express = require("express");
const router = express.Router();

const {
  bookEvent,
  getMyBookings,
  getAllBookings,
  cancelBooking,
  approveBooking,
  rejectBooking,
} = require("../controllers/bookingController");

const { protect, admin } = require("../middleware/auth");

// User applies for an event
router.post("/", protect, bookEvent);

// Logged in user's bookings
router.get("/my", protect, getMyBookings);

// Admin - all bookings
router.get("/", protect, admin, getAllBookings);

router.put("/:id/approve", protect, admin, approveBooking);

router.put("/:id/reject", protect, admin, rejectBooking);

// Cancel booking
router.delete("/:id", protect, cancelBooking);


module.exports = router;