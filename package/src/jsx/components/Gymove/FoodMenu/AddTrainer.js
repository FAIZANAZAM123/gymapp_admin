import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AddTrainer = ({ onClick }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    // Handle image change, if needed
    const file = e.target.files[0];
    setImage(file);
  };

  const addTrainer = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("rating", rating);
      formData.append("image", image);

      await axios.post("http://localhost:5000/addtrainer", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Trainer added successfully!");
    } catch (error) {
      // Handle error, show error message, etc.
      console.error("Error adding trainer:", error);
    }
  };

  return (
    <div className="card-body col-lg-12 loadmore-content dz-scroll height750" id="DietMenusContent">
      <div className="media border-bottom mb-3 pb-3 d-lg-flex d-block menu-list">
          <div className="mb-3 col-lg-12">
            <label className="form-label">Image:</label>
            <input type="file" accept="image/*" className="form-control" onChange={handleImageChange} />
          </div>
       
      </div>



      <div className="food-default-flex col-lg-12 ps-0">
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description:</label>
            <textarea
              className="form-control"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="d-flex flex-wrap align-items-center">
            <ul className="d-flex flex-wrap mb-sm-0 mb-2">
              <li className="text-nowrap mb-2">
                <label className="form-label">Rating:</label>
                <input
                  type="text"
                  className="form-control"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
              </li>
            </ul>
          </div>
        </div>
        <Link to="/food-menu" onClick={addTrainer} className="btn btn-primary light btn-md ms-auto">
          <i className="fa fa-plus scale5 me-3" />
          Add Trainer
        </Link>
    </div>



  );
};

export default AddTrainer;
