import React, { useEffect, useState } from 'react';
import { Link,useNavigate} from 'react-router-dom'

import { Dropdown, Modal } from 'react-bootstrap';
import swal from "sweetalert";
import { nanoid } from 'nanoid';
import axios from 'axios';
//Images
//import data from './../Boltz/Task/Postpage.json';
// import card1 from './../../../images/task/img1.jpg';

import user from './../../../images/task/user.jpg';










const PostPage = () => {
	const [users, setUsers] = useState([]);


	const CardListBlog = [
		{
			id: 1, Cust_Id: "01234", Date_Join: "19/02/2023",
			Cust_Name: "Munaroh Steffani", Location: "India"
		}

	];

	const navigate = useNavigate();




	useEffect(() => {
		const fetchUsers = async () => {
			try {
				// Make a request to your server to fetch all users
				const response = await axios.get(`http://localhost:5000/users`);
				const fetchedUsers = response.data.users; // adjust the property name based on your server response

				// Update the state with the fetched users



				setUsers(fetchedUsers);
				console.log(fetchedUsers);
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		};

		fetchUsers();

	}, []);
	const [postModal, setPostModal] = useState(false);
	const [contacts, setContacts] = useState(CardListBlog);
	// delete data  
	const handleDeleteClick = async (userId) => {
		try {
			const response=await axios.delete(`http://localhost:5000/deleteuser/${userId}`);
			console.log('User deleted successfully:');

			window.location.reload();

			// Handle success, e.g., update your UI or perform additional actions
		} catch (error) {
			if (error.response && error.response.status === 404) {
				console.log('User not found:', error.response.data.error);
				// Handle case where user was not found
			} else {
				console.error('Error in handleDeleteClick:', error);
				// Handle unexpected errors, e.g., show a generic error message
			}
		}
	};
	

	//Add data 






	const [editModal, setEditModal] = useState(false);

		// Edit function editable page loop

		// Edit function button click to edit
		const handleEditClick = (event, contact, index) => {
			event.preventDefault();
			console.log(index)
			setcustid(contact._id)
			setname(contact.name)
			setemail(contact.email)

			//   setform(contact)
			console.log(contact)
			setEditModal(true);
		};


		// edit  data  




		const [showineditfrom, setform] = useState();


		const [custid, setcustid] = useState();
		const [custname, setname] = useState();
		const [custemail, setemail] = useState();

		//update data function




		const submiteditteddata = async (userId) => {
			console.log(userId);
			try {
				// Create an object with the updated data
				const updatedData = {
					userId: userId, // Use the correct property name (userId instead of id)
					name: custname,
					email: custemail,
					// Add other properties as needed
				};

				// Send a POST request to update the data on the backend
				const response = await axios.post(`http://localhost:5000/edituser/${userId}`, updatedData);

				// Handle the response as needed (e.g., show a success message)
				console.log('Data updated successfully:', response.data);

				// Close the modal after successful update
				setEditModal(false);
			} catch (error) {
				// Handle errors (e.g., show an error message)
				console.error('Error updating data:', error);
			}
		};

		// edit form data submit


		//For Image upload in ListBlog


		return (
			<>

				<div className="mb-sm-5 mb-3 d-flex flex-wrap align-items-center text-head">
					{/* <!-- Modal --> */}

					<Modal className="modal fade" show={editModal} onHide={setEditModal} >
						<div className="" role="document">
							<div className="">
								<form >
									<div className="modal-header">
										<h4 className="modal-title fs-20">Edit Task</h4>
										<button type="button" className="btn-close" onClick={() => setEditModal(false)}>

										</button>
									</div>
									<div className="modal-body">
										<i className="flaticon-cancel-12 close" data-dismiss="modal"></i>
										<div className="add-contact-box">
											<div className="add-contact-content">

												<div className="form-group mb-3">
													<label className="text-black font-w500">Customer Name</label>
													<div className="contact-name">
														<input
															type="text"
															className="form-control"
															autoComplete="off"
															name="Cust_Name"
															required="required"
															value={custname}
															onChange={(e) => setname(e.target.value)}
														/>
														<span className="validation-text"></span>
													</div>
												</div>

												<div className="form-group mb-3">
													<label className="text-black font-w500">Customer Email</label>
													<div className="contact-name">
														<input
															type="text"
															className="form-control"
															autoComplete="off"
															name="Cust_Email"
															required="required"
															value={custemail}
															onChange={(e) => setemail(e.target.value)}
														/>
														<span className="validation-text"></span>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className="modal-footer">
										<button type="submit" className="btn btn-primary" onClick={() => {
											submiteditteddata(custid)
										}}>Save</button>
										<button type="button" onClick={() => setEditModal(false)} className="btn btn-danger"> <i className="flaticon-delete-1" /> Discard</button>
									</div>
								</form>

							</div>
						</div>
					</Modal>

				</div>
				<div className="row">
					{users.map((contact, index) => (
						<div className="col-xl-3 col-xxl-4 col-lg-6 col-md-6 col-sm-6" key={index}>
							<div className="card project-boxed">


								<div className="card-header align-items-start">
									<div>
										{/* <p className="fs-14 mb-2 text-primary">#{contact._id}</p> */}
										<h6 className="fs-18 font-w500 mb-3"><Link to={"#"} className="text-black user-name">{contact.name}</Link></h6>
										{/* <div className="text-dark fs-14 text-nowrap"><i className="fas fa-calendar me-3" />Created on Oct 8th, 2023</div> */}
									</div>
									<Dropdown className="">
										<Dropdown.Toggle variant="" as="div" className="btn-link i-false" >
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#342E59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
												<path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#342E59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
												<path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#342E59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
											</svg>                                    </Dropdown.Toggle>
										<Dropdown.Menu alignRight={true} className="dropdown-menu-right">
											<Dropdown.Item
												onClick={(event) => handleEditClick(event, contact, contact._id)}
											>Edit
											</Dropdown.Item>
											<Dropdown.Item className="text-danger"
												onClick={() => handleDeleteClick(contact._id)}
											>Delete
											</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								</div>
								<div className="card-body p-0 pb-3">
									<ul className="list-group list-group-flush">


										<li className="list-group-item">
											<span className="text-black mb-0 title">Email</span> :
											<span className=" desc-text ms-2">{contact.email}</span>
										</li>
									</ul>
								</div>

							</div>
						</div>
					))}
				</div>
			</>
		);
	}

	export default PostPage;