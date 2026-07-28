require("dotenv").config();

const cloudinary = require("./config/cloudinary");

async function test() {
    try {
        console.log("Cloudinary Config:", cloudinary.config());

        const result = await cloudinary.api.ping();

        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

test();