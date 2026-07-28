import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

function EditEvent() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    category: "",
    location: "",
    mapLink: "",
    date: "",
    time: "",
    payment: "",
    vacancies: "",
    dressCode: "",
    description: "",
  });

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {

      const res = await API.get(`/events/${id}`);

      setForm({
        title: res.data.title,
        category: res.data.category,
        location: res.data.location,
        mapLink: res.data.mapLink,
        date: res.data.date,
        time: res.data.time,
        payment: res.data.payment,
        vacancies: res.data.vacancies,
        dressCode: res.data.dressCode,
        description: res.data.description,
      });

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
        const token = localStorage.getItem("token");

        await API.put(
  `/events/${id}`,
  form,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

        toast.success("Event updated successfully!");

        setTimeout(() => {
          navigate("/admin");
        }, 1800);

      } catch (err) {
        console.log(err);

        toast.error("Failed to update event");
      }
    };

  return (
  <div className="container py-5">
    <form onSubmit={handleSubmit}>

    <h2>Edit Event</h2>

    <div className="mb-3">
      <label>Title</label>

      <input
        type="text"
        className="form-control"
        name="title"
        value={form.title}
        onChange={handleChange}
      />
    </div>

    <div className="mb-3">
  <label>Category</label>

  <select
    className="form-control"
    name="category"
    value={form.category}
    onChange={handleChange}
  >
    <option value="">Select Category</option>
    <option value="Anchor">Anchor</option>
    <option value="Singer">Singer</option>
    <option value="Dancer">Dancer</option>
    <option value="DJ">DJ</option>
    <option value="Photographer">Photographer</option>
    <option value="Decorator">Decorator</option>
  </select>
</div>

    <div className="mb-3">
      <label>Location</label>

      <input
        className="form-control"
        name="location"
        value={form.location}
        onChange={handleChange}
      />
    </div>

    <div className="mb-3">
  <label>Google Maps Link</label>

  <input
    type="text"
    className="form-control"
    name="mapLink"
    value={form.mapLink}
    onChange={handleChange}
  />
</div>

    <div className="mb-3">
      <label>Payment</label>

      <input
        type="number"
        className="form-control"
        name="payment"
        value={form.payment}
        onChange={handleChange}
      />
    </div>

    <div className="mb-3">
  <label>Date</label>

  <input
    type="date"
    className="form-control"
    name="date"
    value={form.date}
    onChange={handleChange}
  />
</div>

<div className="mb-3">
  <label>Time</label>

  <input
    type="text"
    className="form-control"
    name="time"
    value={form.time}
    onChange={handleChange}
  />
</div>

<div className="mb-3">
  <label>Vacancies</label>

  <input
    type="number"
    className="form-control"
    name="vacancies"
    value={form.vacancies}
    onChange={handleChange}
  />
</div>

<div className="mb-3">
  <label>Dress Code</label>

  <input
    type="text"
    className="form-control"
    name="dressCode"
    value={form.dressCode}
    onChange={handleChange}
  />
</div>

<div className="mb-3">
  <label>Description</label>

  <textarea
    rows="5"
    className="form-control"
    name="description"
    value={form.description}
    onChange={handleChange}
  />
</div>

    <button
      type="submit"
      className="btn btn-warning mt-3"
    >
      Update Event
    </button>

  </form>

  </div>
);
}

export default EditEvent;