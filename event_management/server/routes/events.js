const express = require('express');
const router = express.Router();
const { getEvents, getEventById, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const { protect, admin } = require('../middleware/auth');
const upload = require("../middleware/upload");

//Get All Events
router.get('/', getEvents);
//Get Event by ID
router.get('/:id', getEventById);
//Create Event (Admin Only)
router.post(
    '/',
    protect,
    admin,
    upload.single("bannerImage"),
    createEvent
);
//Update Event (Admin Only)
router.put(
    '/:id',
    protect,
    admin,
    upload.single("bannerImage"),
    updateEvent
);
//Delete Event (Admin Only)
router.delete('/:id', protect, admin, deleteEvent);

module.exports = router;