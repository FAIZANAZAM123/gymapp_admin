import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";


import { Modal , Nav, Tab} from "react-bootstrap";

/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";

import menus5 from "../../../../images/menus/5.png";
import menus6 from "../../../../images/menus/6.png";
import menus7 from "../../../../images/menus/7.png";
import menus4 from "../../../../images/menus/4.png";
import avatar34 from "../../../../images/avatar/34.png";
import avatar31 from "../../../../images/avatar/31.png";
import avatar32 from "../../../../images/avatar/32.png";
import avatar33 from "../../../../images/avatar/33.png";

import axios from "axios";


const DietMenus = ({ onClick }) => {


  const [modalToggle, setModalToggle] = useState(false);
  const [modalFilter, setModalFilter] = useState(false);
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getAllTrainers");

        setTrainers(response.data.trainers);

        console.log(response.data.trainers);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    };

    // Call the fetchTrainers function
    fetchTrainers();
  }, []);

  const [refreshToggle, setRefreshToggle] = useState(false);
  const [data, setData] = useState([
   
  ]);

  const deletetrainer = async (trainerId) => {
    try {

      console.log(trainerId);
      const response = await axios.delete(`http://localhost:5000/deletetrainer/${trainerId}`);
  
      // Check if the deletion was successful
      if (response.status === 200) {
        console.log(`Trainer with ID ${trainerId} deleted successfully.`);


        window.alert("trainer Successfully deleted");
        window.location.reload();
      } else {
        console.log('Failed to delete trainer.');
      }
    } catch (error) {
      console.error("Error deleting trainer:", error);
      // Handle error, show error message, etc.
    }
  };
  



  const hendelClick = () => {
    setRefreshToggle(true);
    setTimeout(() => {
      setData([
        ...data,
        data[Math.floor(Math.random() * Math.floor(data.length - 1))],
      ]);
      setRefreshToggle(false);
    }, 1000);
  };
  return (
    <Fragment>
      <div
        className="card-body loadmore-content dz-scroll height750"
        id="DietMenusContent"
      >
        {trainers && trainers.map((d, i) => (
          <div
            className="media border-bottom mb-3 pb-3 d-lg-flex d-block menu-list"
            key={i}
          >
              <img
                className="rounded me-3 mb-md-0 mb-3"
                src={`http://localhost:5000/${d.image}`}
                // src={d.image}
                alt="The image "
                width={120}
              />
            <div className="food-default-flex col-lg-8 ps-0">
              <h6 className="fs-16 font-w600">
                <Link to="/ecom-product-detail" className="text-black">
                  {d.name}
                </Link>
              </h6>
              <p className="fs-14">{d.description}</p>
              <div className="d-flex flex-wrap align-items-center">

                <ul className="d-flex flex-wrap mb-sm-0 mb-2">

                  <li className="text-nowrap mb-2">
                    <i className="fa-regular fa-star me-2 scale3 text-warning" />
                    <span className="text-nowrap fs-14 text-black font-w500">
                      {d.rating}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <Link to={`/edittrainer/${d._id}`}
              
              className="btn btn-primary light btn-md ms-auto"
            >
              <i className="fa fa-plus scale5 me-3" />
              Edit
            </Link>
            
            <span onClick={()=>{
                deletetrainer(d._id)
              }}
              
              className="btn btn-primary light btn-md ms-2"
            >
              <i  className="fa fa-plus scale5 me-3" />
              Delete
            </span>
          </div>
        ))}
      </div>
      <div className="card-footer style-1 text-center border-0 pt-0 pb-4">
        <div
          className="text-primary dz-load-more custom-box"
          onClick={() => hendelClick()}
        >
          <Link
            className="text-primary dz-load-more fa fa-chevron-down"
            // id="DietMenus"
            to="/food-menu"
          // rel="ajax/food-menu-list"
          >
            {refreshToggle && <i className="fa fa-refresh"></i>}
          </Link>
        </div>
      </div>

      
    </Fragment>
  );
};

export default DietMenus;
