import { useEffect, useState } from "react";
import API from "../services/api";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
const [editName, setEditName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data);
    } catch (err) {
  alert(err.response?.data?.message || "Failed to load categories");
}
  };

  const addCategory = async () => {
    if (!name.trim()) {
      return alert("Enter category name");
    }

    try {
      const token = localStorage.getItem("token");

await API.post(
  "/categories",
  { name },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      setName("");
      fetchCategories();

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Failed to create category"
      );
    }
  };

const deleteCategory = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this category?"
  );

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    await API.delete(`/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchCategories();

    alert("Category deleted successfully.");

  } catch (err) {
    alert(
      err.response?.data?.message ||
      "Delete failed"
    );
  }
};

const updateCategory = async () => {
  try {
    const token = localStorage.getItem("token");

    await API.put(
      `/categories/${editingCategory._id}`,
      {
        name: editName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setEditingCategory(null);
    setEditName("");

    fetchCategories();

    alert("Category updated successfully.");

  } catch (err) {
    alert(
      err.response?.data?.message ||
      "Update failed"
    );
  }
};

  return (
    <div className="container py-5">

      <h2 className="fw-bold mb-4">
        Category Management
      </h2>

      <div className="card shadow border-0 rounded-4 mb-4">
        <div className="card-body">

          <div className="row">

            <div className="col-md-9">
              <input
                className="form-control"
                placeholder="Enter category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <button
                className="btn btn-primary w-100"
                onClick={addCategory}
              >
                Add Category
              </button>
            </div>

          </div>

        </div>
      </div>

      <div className="card shadow border-0 rounded-4">

        <div className="card-body">

          <table className="table table-hover align-middle">

            <thead>
                <tr>
                    <th>#</th>
                    <th>Category</th>
                    <th>Created</th>
                    <th className="text-center">Actions</th>
                </tr>
            </thead>

            <tbody>

{categories.map((category, index) => (

<tr key={category._id}>

<td>{index + 1}</td>

<td>
  <strong>{category.name}</strong>
</td>

<td>
  {new Date(category.createdAt).toLocaleDateString()}
</td>

<td className="text-center">

<button
  className="btn btn-warning btn-sm me-2"
  onClick={() => {
    setEditingCategory(category);
    setEditName(category.name);
  }}
>
  Edit
</button>

<button
  className="btn btn-danger btn-sm"
  onClick={() => deleteCategory(category._id)}
>
  Delete
</button>

</td>

</tr>

))}

</tbody>

          </table>

        </div>

      </div>

      {editingCategory && (
  <div
    className="modal fade show"
    style={{
      display: "block",
      backgroundColor: "rgba(0,0,0,0.5)",
    }}
  >
    <div className="modal-dialog">
      <div className="modal-content">

        <div className="modal-header">
          <h5 className="modal-title">
            Edit Category
          </h5>

          <button
            className="btn-close"
            onClick={() => setEditingCategory(null)}
          ></button>
        </div>

        <div className="modal-body">

          <input
            className="form-control"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />

        </div>

        <div className="modal-footer">

          <button
            className="btn btn-secondary"
            onClick={() => setEditingCategory(null)}
          >
            Cancel
          </button>

          <button
            className="btn btn-primary"
            onClick={updateCategory}
          >
            Save Changes
          </button>

        </div>

      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default AdminCategories;