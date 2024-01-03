import React, { Fragment, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import PageTitle from "../../../../layouts/PageTitle";

const Inbox = () => {


  const [emailMessages, setEmailMessages] = useState([]);
  const [openMailBar, setOpenMailBar] = useState(false);



  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/emails");
      const data = await response.json();
      setEmailMessages(data);

      console.log(data);
    } catch (error) {
      console.error("Error fetching email messages:", error);
    }
  };
  useEffect(() => {
    // Fetch email messages from the backend
   

    fetchData();
  }, []); 



  



  
  const [data, setData] = useState(
    document.querySelectorAll(".email-right-box .email-list .message")
  );
  const sort = 10;
  const activePag = useRef(0);
  const [test, settest] = useState(0);

  // Active data
  const chageData = (frist, sec) => {
    for (var i = 0; i < data.length; ++i) {
      if (i >= frist && i < sec) {
        data[i].classList.remove("d-none");
      } else {
        data[i].classList.add("d-none");
      }
    }
  };
  // use effect
  useEffect(() => {
    setData(document.querySelectorAll(".email-right-box .email-list .message"));
    chackboxFun();
  }, [test]);
  // Active pagginarion
  activePag.current === 0 && chageData(0, sort);
  // paggination
  let paggination = Array(Math.ceil(data.length / sort))
    .fill()
    .map((_, i) => i + 1);

  // Active paggination & chage data
  const onClick = (i) => {
    activePag.current = i;
    chageData(activePag.current * sort, (activePag.current + 1) * sort);
    settest(i);
  };
  const chackbox = document.querySelectorAll(".message input");
  const motherChackBox = document.querySelector("#checkbox1");
  // console.log(document.querySelectorAll(".sorting_1 input")[0].checked);
  const chackboxFun = (type) => {
    for (let i = 0; i < chackbox.length; i++) {
      const element = chackbox[i];
      if (type === "all") {
        if (motherChackBox.checked) {
          element.checked = true;
        } else {
          element.checked = false;
        }
      } else {
        if (!element.checked) {
          motherChackBox.checked = false;
          break;
        } else {
          motherChackBox.checked = true;
        }
      }
    }
  };

   useEffect(()=>{
      const  starticon = document.querySelectorAll(".checkstar");  
      starticon.forEach((ele, ind)=>{
         ele.addEventListener('click', function(){         
            starticon[ind].classList.toggle('yellow')
         })
      })  
   })

   return (
    <Fragment>
      <PageTitle activeMenu="Inbox" motherMenu="Email" pageContent="Email" />

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className={`col-lg-3 email-left-body ${openMailBar ? "active" : " "}`}>
                  <div className="email-left-box">
                    <div className="p-0">
                    
                    </div>
                    <div className="mail-list mt-4 rounded">
                      <Link to="/email-inbox" className="list-group-item active">
                        <i className="fa fa-inbox font-18 align-middle me-2"></i>
                        Inbox
                        <span className="badge badge-secondary  badge-sm float-end">
                          {emailMessages.length}
                        </span>
                      </Link>
                   
                      
                    
                     
                    </div>

                    <div className="mail-list mt-4 rounded">
                      <Link to="/email-send" className="list-group-item active">
                        <i className="fa fa-inbox font-18 align-middle me-2"></i>
                        Sent
                        <span className="badge badge-secondary  badge-sm float-end">
                          {emailMessages.length}
                        </span>
                      </Link>
                   
                      
                    
                     
                    </div>
                    
                 
                  </div>
                </div>
                  <div className="col-lg-9">
                    <div className="email-right-box">
                      <div role="toolbar" className="toolbar d-flex align-items-center">
                        <div className="btn-group mb-1 ">
                          <div className="form-check custom-checkbox ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="checkbox1"
                              onClick={() => chackboxFun("all")}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="checkbox1"
                            ></label>
                          </div>
                        </div>
                        <div className="btn-group mb-1">
                          <button
                            className="btn btn-primary light px-3"
                            type="button"
                          >
                            <i onClick={()=>{
                             fetchData()
                            }}  className="ti-reload"></i>
                          </button>
                        </div>
                     
                        <div className={`email-tools-box ${openMailBar ? "active" : " "}`} onClick={()=>setOpenMailBar(!openMailBar)}>
                          <i className="fa-solid fa-list-ul"></i>
                        </div>
                       
                      </div>
                      {/** Single Message */}
                      <div className="email-list mt-3">
        {emailMessages.map((message, index) => (
          <div className="message" key={index}>
            <div>
              <div className="d-flex message-single">
                <div className="pl-1 align-self-center">
                  <div className="form-check custom-checkbox">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      onClick={() => chackboxFun()}
                      id={`checkbox${index}`}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`checkbox${index}`}
                    />
                  </div>
                </div>
                <div className="ms-2">
                  <button className="border-0 bg-transparent align-middle p-0">
                    <i className="fa fa-star checkstar" />
                  </button>
                </div>
              </div>
              <Link to={`/email-read/${message.id}`} className="col-mail col-mail-2">
                <div className="subject">{message.subject}</div>
                <div className="date">{message.date}</div>
              </Link>
            </div>
          </div>
        ))}
      </div>

                      <div className="row mt-4">
                        <div className="col-12 pl-3">
                          <nav>
                            <ul className="pagination pagination-gutter pagination-primary pagination-sm no-bg">
                              <li className="page-item page-indicator">
                                <Link
                                  className="page-link"
                                  to="/email-inbox"
                                  onClick={() =>
                                    activePag.current > 0 &&
                                    onClick(activePag.current - 1)
                                  }
                                >
                                  <i className="la la-angle-left"></i>
                                </Link>
                              </li>
                              {paggination.map((number, i) => (
                                <li
                                  key={i}
                                  className={`page-item  ${
                                    activePag.current === i ? "active" : ""
                                  } `}
                                  onClick={() => onClick(i)}
                                >
                                  <Link className="page-link" to="/email-inbox">
                                    {number}
                                  </Link>
                                </li>
                              ))}

                              <li className="page-item page-indicator">
                                <Link
                                  className="page-link"
                                  to="/email-inbox"
                                  onClick={() =>
                                    activePag.current + 1 < paggination.length &&
                                    onClick(activePag.current + 1)
                                  }
                                >
                                  <i className="la la-angle-right"></i>
                                </Link>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Inbox;