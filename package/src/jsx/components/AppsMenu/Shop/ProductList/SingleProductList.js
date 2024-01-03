import React,{useState} from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

// images
import avatar1 from "../../../../..//images/avatar/1.jpg";

const SingleProductList = (props) => {
   const {
      previewImg,
      price,
      rating,
      availability,
      productCode,
      brand,
      des,
   } = props.product;
   const [reviewModal, setReviewModal] = useState(false);
   return (
      <>
         <div className="col-lg-12 col-xl-6">
            <div className="card">
               <div className="card-body">
                  <div className="row m-b-30">
                     <div className="col-md-5 col-xxl-12">
                        <div className="new-arrival-product mb-4 mb-xxl-4 mb-md-0">
                           <div className="new-arrivals-img-contnent">
                              <img className="img-fluid" src={previewImg} alt="" />
                           </div>
                        </div>
                     </div>
                     <div className="col-md-7 col-xxl-12">
                        <div className="new-arrival-content position-relative">
                           <h4>
                              <Link to="/ecom-product-detail">
                                 Solid Women's V-neck Dark T-Shirt
                              </Link>
                           </h4>
                           <div className="comment-review star-rating">
                              {rating}
                              <span className="review-text">(34 reviews) / </span>
                              <Link className="product-review" to="#" onClick={() => setReviewModal(true)}>
                                 Write a review?
                              </Link>
                              <p className="price">${price}</p>
                           </div>
                           <p>
                              Availability:{" "}
                              <span className="item">
                                 {availability}{" "}
                                 <i className="fa fa-check-circle text-success"></i>
                              </span>
                           </p>
                           <p>
                              Product code:{" "}
                              <span className="item">{productCode}</span>
                           </p>
                           <p>
                              Brand: <span className="item">{brand}</span>
                           </p>
                           <p className="text-content">{des}</p>
                           
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <Modal show={reviewModal} onHide={setReviewModal} className="modal fade" id="reviewModal" centered>
          <>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Review</h5>
                <button
                  type="button"
                  className="btn-close"                  
                  onClick={() => setReviewModal(false)}
                >
                  
                </button>
              </div>
              <div className="modal-body">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setReviewModal(false);
                  }}
                >
                  <div className="text-center mb-4">
                    <img
                      className="img-fluid rounded"
                      width={78}
                      src={avatar1}
                      alt="DexignZone"
                    />
                  </div>
                  <div className="form-group">
                    <div className="rating-widget mb-4 text-center">
                      
                      <div className="rating-stars">
                        <ul
                          id="stars"
                          className="d-flex justify-content-center align-items-center"
                        >
                          <li className="star" title="Poor" data-value={1}>
                            <i className="fa fa-star fa-fw" />
                          </li>
                          <li className="star" title="Fair" data-value={2}>
                            <i className="fa fa-star fa-fw" />
                          </li>
                          <li className="star" title="Good" data-value={3}>
                            <i className="fa fa-star fa-fw" />
                          </li>
                          <li className="star" title="Excellent" data-value={4}>
                            <i className="fa fa-star fa-fw" />
                          </li>
                          <li className="star" title="WOW!!!" data-value={5}>
                            <i className="fa fa-star fa-fw" />
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      placeholder="Comment"
                      rows={5}
                      defaultValue={""}
                    />
                  </div>
                  <button className="btn btn-primary btn-block">RATE</button>
                </form>
              </div>
            </div>
          </>
        </Modal>
      </>
   );
};

export default SingleProductList;
