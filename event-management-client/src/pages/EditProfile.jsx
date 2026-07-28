import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

function EditProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
  });

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setForm({
        name: res.data.name || "",
        phone: res.data.phone || "",
        location: res.data.location || "",
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

  const handleImage = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const data = new FormData();

      data.append("name", form.name);
      data.append("phone", form.phone);
      data.append("location", form.location);

      if (profileImage) {
        data.append("profileImage", profileImage);
      }

      const res = await API.put("/auth/profile", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          _id: res.data.user._id,
          name: res.data.user.name,
          email: res.data.user.email,
          role: res.data.user.role,
          profileImage: res.data.user.profileImage,
        })
      );
                        

      toast.success("Profile Updated Successfully");

      navigate("/profile");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div
      className="container py-5"
      style={{ maxWidth: "700px" }}
    >
      <div className="card shadow-lg border-0 rounded-4">

        <div className="card-body p-5">

          <h2
            className="text-center mb-4"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: "48px",
            }}
          >
            Edit Profile
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="mb-4">
              <label className="form-label fw-semibold">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                className="form-control"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                className="form-control"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">
                Location
              </label>

              <input
                type="text"
                name="location"
                className="form-control"
                value={form.location}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">
                Profile Image
              </label>

              <input
                type="file"
                className="form-control"
                onChange={handleImage}
              />
            </div>

            <button
              className="btn w-100 py-3 fw-bold"
              style={{
                background: "#C69345",
                color: "white",
                borderRadius: "50px",
              }}
            >
              Save Changes
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}

export default EditProfile;