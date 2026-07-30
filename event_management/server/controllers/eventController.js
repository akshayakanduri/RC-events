const Event = require('../models/Event');
const cloudinary = require("../config/cloudinary");
const fs = require("fs-extra");

exports.getEvents = async (req, res) => {
  try {

    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.search) {
      filter.title = {
        $regex: req.query.search,
        $options: "i",
      };
    }

    const events = await Event.find(filter);

    res.json(events);

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    return res.json(event);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.createEvent = async (req, res) => {

    try {
        let image = "";

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "eventmanagement/events",
            });

            image = result.secure_url;
            await fs.remove(req.file.path);
        }


console.log("Data being saved:");
console.log({
    title: req.body.title,
    category: req.body.category,
    location: req.body.location,
    mapLink: req.body.mapLink,
    date: req.body.date,
    time: req.body.time,
    payment: req.body.payment,
    vacancies: req.body.vacancies,
    dressCode: req.body.dressCode,
    description: req.body.description,
    image,
    status: req.body.status,
});

const event = await Event.create({
    title: req.body.title,
    category: req.body.category,
    location: req.body.location,
    mapLink: req.body.mapLink,
    date: req.body.date,
    time: req.body.time,
    payment: req.body.payment,
    vacancies: req.body.vacancies,
    dressCode: req.body.dressCode,
    description: req.body.description,
    image,
    // status: Number(req.body.vacancies) > 0 ? "Open" : "Closed",
    status: "Open",
});

console.log("MongoDB document created successfully");


        return res.status(201).json({
            message: "Event Created Successfully",
            event,
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message,
        });
    }
};

// exports.createEvent = async (req, res) => {
//   try {
//     let image = "";

    // if (req.file) {
    //   const result = await cloudinary.uploader.upload(req.file.path, {
    //     folder: "eventmanagement/events",
    //   });

    //   image = result.secure_url;

    //   await fs.remove(req.file.path);
    // }

    // const {
    //   title,
    //   category,
    //   location,
    //   mapLink,
    //   date,
    //   time,
    //   payment,
    //   vacancies,
    //   dressCode,
    //   description,
    //   status,
    // } = req.body;

//     if (
//     !title ||
//     !category ||
//     !location ||
//     !date ||
//     !time ||
//     !payment ||
//     vacancies == null
// ) {
//     return res.status(400).json({
//         message: "Please fill all required fields."
//     });
// }

// if (vacancies < 1) {
//     return res.status(400).json({
//         message: "Vacancies must be at least 1."
//     });
// }

    // const event = await Event.create({
    //   title,
    //   category,
    //   location,
    //   mapLink,
    //   date,
    //   time,
    //   payment,
    //   vacancies,
    //   dressCode,
    //   description,
    //   image,
    //   status,
    // });

    // return res.status(201).json({
//       message: "Event Created Successfully",
//       event,
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       message: error.message,
//     });
//   }
// };

exports.updateEvent = async (req, res) => {
    try {
        const {
    title,
    category,
    location,
    mapLink,
    date,
    time,
    payment,
    vacancies,
    dressCode,
    description,
    status,
} = req.body;

const updatedData = {
    title,
    category,
    location,
    mapLink,
    date,
    time,
    payment,
    vacancies,
    dressCode,
    description,
    status: Number(vacancies) > 0 ? "Open" : "Closed",
};

const event = await Event.findByIdAndUpdate(
    req.params.id,
    updatedData,
    {
        new: true,
        runValidators: true,
    }
);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        return res.json(event);
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        return res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};