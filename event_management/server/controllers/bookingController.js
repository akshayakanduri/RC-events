const Booking = require("../models/booking");
const Event = require("../models/Event");
const {
  sendBookingEmail,
  sendRejectionEmail,
} = require("../utils/email");

// User applies for an event
exports.bookEvent = async (req, res) => {
  try {
    const { eventId } = req.body;

    // Check if event exists
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    // Check if user already applied
    const alreadyBooked = await Booking.findOne({
      user: req.user._id,
      event: eventId,
    });

    if (alreadyBooked) {
      return res.status(400).json({
        message: "You have already applied for this event.",
      });
    }

    // Create booking
    const booking = await Booking.create({
      user: req.user._id,
      event: eventId,
    });

    res.status(201).json({
      message: "Applied successfully!",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Logged in user's bookings
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user._id,
    })
      .populate("event")
      .sort({ createdAt: -1 });

    res.json(bookings);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin - all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("event")
      .sort({ createdAt: -1 });

    res.json(bookings);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
  .populate("user", "name email")
  .populate("event");


    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // Only the booking owner or an admin can cancel it
    if (
      booking.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Not authorized to cancel this booking",
      });
    }

    await booking.deleteOne();

    return res.json({
      message: "Booking cancelled successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


// Reject Booking
exports.rejectBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
    .populate("user", "name email")
      .populate("event");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    booking.status = "Rejected";

    await booking.save();
    console.log("Sending rejection email...");

    res.json({
      message: "Booking Rejected",
      booking,
    });

    sendRejectionEmail(
      booking.user.email,
      booking.user.name,
      booking.event.title
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Approve Booking
exports.approveBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
  .populate("user", "name email")
  .populate("event");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // Already approved
    if (booking.status === "Approved") {
      return res.status(400).json({
        message: "Booking already approved",
      });
    }

    // Find event
    const event = booking.event;

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    // Event is already full
    if (event.status === "Closed" || event.vacancies <= 0) {
      return res.status(400).json({
        message: "This event is closed.",
      });
    }

    // Approve booking
    booking.status = "Approved";

    // Reduce vacancy
    event.vacancies = event.vacancies - 1;

    // If no vacancies left, close event
    if (event.vacancies <= 0) {
      event.vacancies = 0;
      event.status = "Closed";
    }

    await booking.save();
    await event.save();

    res.json({
      message: "Booking Approved",
    });

  sendBookingEmail(
  booking.user.email,
  booking.user.name,
  booking.event
);
  }  catch (error) {
  res.status(500).json({
    message: error.message,
  });
}
};
