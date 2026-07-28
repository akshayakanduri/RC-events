import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import API from "../services/api";

function CreateEvent() {

  const [form, setForm] = useState({
    title: "",
    category: "",
    location: "",
    googleMapLink: "",
    date: "",
    time: "",
    payment: "",
    vacancies: "",
    dressCode: "",
    description: "",
    bannerImage: null,
  });
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
  fetchCategories();
}, []);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");

      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("location", form.location);
    formData.append("mapLink", form.googleMapLink);
    formData.append("date", form.date);
    formData.append("time", form.time);
    formData.append("payment", form.payment);
    formData.append("vacancies", form.vacancies);
    formData.append("dressCode", form.dressCode);
    formData.append("description", form.description);
    formData.append("status", "Open");

    if (form.bannerImage) {
      formData.append("bannerImage", form.bannerImage);
    }

    const token = localStorage.getItem("token");

    await API.post(
  "/events",
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  }
);

        alert("Event Created Successfully!");

        navigate("/events");

      } catch (err) {
    console.log("Full error:", err);

    if (err.response) {
        console.log("Status:", err.response.status);
        console.log("Response:", err.response.data);
    }

    alert("Failed to create event");
}
    };
  return (
    <div className="container py-5">

      <div className="card shadow border-0">

        <div className="card-body p-5">

          <h2 className="mb-4">
            Create Event
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label>Event Title</label>

                <input
                  type="text"
                  name="title"
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">

                <label>Category</label>

                <select
                  className="form-control"
                  name="category"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>

                  {categories.map((cat) => (
                    <option
                      key={cat._id}
                      value={cat.name}
                    >
                      {cat.name}
                    </option>
                  ))}

                </select>

              </div>

            </div>

            <div className="mb-3">

              <label>Location</label>

              <input
                type="text"
                className="form-control"
                name="location"
                onChange={handleChange}
                required
              />

            </div>

            <div className="mb-3">

              <label>Google Maps Link</label>

              <input
                type="text"
                className="form-control"
                name="mapLink"
                onChange={handleChange}
              />

            </div>

            <div className="row">

              <div className="col-md-6 mb-3">

                <label>Date</label>

                <input
                  type="date"
                  className="form-control"
                  name="date"
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="col-md-6 mb-3">

                <label>Time</label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="3 PM - 6 PM"
                  name="time"
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            <div className="row">

              <div className="col-md-4 mb-3">

                <label>Payment</label>

                <input
                  type="number"
                  className="form-control"
                  name="payment"
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="col-md-4 mb-3">

                <label>Vacancies</label>

                <input
                  type="number"
                  className="form-control"
                  name="vacancies"
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="col-md-4 mb-3">

                <label>Dress Code</label>

                <input
                  type="text"
                  className="form-control"
                  name="dressCode"
                  onChange={handleChange}
                />

              </div>

            </div>

            <div className="mb-3">

              <label>Description</label>

              <textarea
                rows="5"
                className="form-control"
                name="description"
                onChange={handleChange}
              />

            </div>

            <div className="mb-4">

              <label>Banner Image</label>

              <input
                type="file"
                className="form-control"
                onChange={(e) =>
                  setForm({
                    ...form,
                    bannerImage: e.target.files[0],
                  })
                }
              />

              {/* Image Preview */}
              {form.bannerImage && (
                <img
                  src={URL.createObjectURL(form.bannerImage)}
                  alt="Preview"
                  style={{
                    width: "300px",
                    marginTop: "15px",
                    borderRadius: "10px",
                  }}
                />
              )}

            </div>

            <button
              type="submit"
              className="btn btn-warning btn-lg"
            >
              Publish Event
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default CreateEvent;