import React, { Fragment, useEffect, useState } from "react";
import { Link,useParams } from "react-router-dom";
import profileImage from "../../../../../images/avatar/1.jpg";

import { Dropdown } from "react-bootstrap";
import PageTitle from "../../../../layouts/PageTitle";

const Sentmessagedetail = () => {
   const [openMailBar, setOpenMailBar] = useState();
   const [emailMessages, setEmailMessages] = useState([]);
   const [useremail, setuseremail] = useState();
   const [message, setmessage] = useState();

   const { id } = useParams();


   const send=async()=>{
      try {


         console.log(useremail,message)
         const response = await fetch("http://localhost:5000/sendemail", {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({ message, useremail }),
         });
     
         const data = await response.json();
         console.log(data);
       } catch (error) {
         console.error("Error sending email:", error);
       }
   }
   useEffect(() => {
      // Fetch email messages from the backend
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/emails/${id}`);
          const data = await response.json();
          setEmailMessages(data);
          setuseremail(data.from)
  
          console.log(data);
        } catch (error) {
          console.error("Error fetching email messages:", error);
        }
      };
  
      fetchData();
    }, []); 

   return (
      <Fragment>
         <PageTitle activeMenu="Read" motherMenu="Email" />
         <div className="row">
            <div className="col-lg-12">
               <div className="card">
                  <div className="card-body">
                     <div className="row">
                        <div className={`col-lg-3 email-left-body ${openMailBar ? "active" : " "}`}>
                           <div className="email-left-box generic-width px-0 mb-5">
                              <div className="p-0">
                               
                              </div>
                              <div className="mail-list mt-4 rounded">
                                 <Link
                                    to="/email-inbox"
                                    className="list-group-item active"
                                 >
                                    <i className="fa fa-inbox font-18 align-middle me-2"></i>
                                    Messages
                                   
                                 </Link>
                               
                                
                              </div>
                              
                           </div>
                        </div>
                        <div class="col-lg-9">
                           <div className="email-right-box ">
                              <div className={`email-tools-box float-end ${openMailBar ? "active" : " "}`} onClick={()=>setOpenMailBar(!openMailBar)}>	
                                 <i class="fa-solid fa-list-ul" />
                              </div>
                              <div className="right-box-padding">
                                 <div className="toolbar mb-4" role="toolbar">
                                    <div className="btn-group mb-1">
                                       <button
                                          type="button"
                                          className="btn btn-primary light px-3"
                                       >
                                          <i className="fa fa-archive"></i>
                                       </button>
                                      
                                      
                                    </div>
                                   
                               
                                   
                                 </div>
                                 <div className="read-content">
                                    <div className="media pt-3">
                                       <img
                                          className="me-3 rounded"
                                          width="70"
                                          alt=""
                                          src='data:image/png;base64,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'
                                       />
                                       <div className="media-body me-2">
                                          <h5 className="text-primary mb-0 mt-1">
                                             {emailMessages&&emailMessages.from}
                                          </h5>
                                          <p className="mb-0"> {emailMessages&&emailMessages.timestamp}</p>
                                       </div>
                                      
                                     
                                    </div>
                                    <hr />
                                    <div className="media mb-2 mt-3">
                                       <div className="media-body">
                                          <span className="pull-right">
                                          </span>
                                          <h5 className="my-1 text-primary">
                                             {emailMessages&&emailMessages.subject}
                                          </h5>
                                        
                                       </div>
                                    </div>
                                    <div className="read-content-body">
                                       <p className="mb-2">
                                           {emailMessages&&emailMessages.body}
                                       </p>
                                      
                                      
                                       <hr />
                                    </div>
                                    <hr />
                                  
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

export default Sentmessagedetail;
