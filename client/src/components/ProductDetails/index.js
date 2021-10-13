import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import {Loader} from '../';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import {NEW_REVIEW_RESET} from '../../redux/actionTypes';
import profile from '../../images/profile.png';
import cover from '../../images/cover.jpg';
import logo from '../../images/logo.png';
import productPic from '../../images/product.jpg';
import './style.css';

let product = {
    _id: "adegwe2f",
    name: "Product",
    price: 23.545,
    numOfReviews: 23456,
    images : [profile,cover, logo,productPic],
    description: "this product is just for website demo.This is not an actual product, please do toke buy it."

}

function ProductDetails({match}) {
    
    const dispatch = useDispatch();
    const options = {
        size: "large",
        value: 4,
        readOnly: true,
        precision: 0.5,
    };

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () => {
        
    }

    const decreaseQuantity = () => {
    
    };

    const addToCartHandler = () => {
        
    };

    const submitReviewToggle = () => {
        
    };

    const reviewSubmitHandler = () => {
        
    };

    return (
        <Fragment>
            {false ? (
                <Loader />
            ) : (
                <Fragment>
                    <div className="productdetails_main">
                        <div>
                            <Carousel>
                                {
                                    product.images && 
                                        product.images.map((item, i) => (
                                            <img 
                                                className="carousel_image"
                                                key={i}
                                                src={item}
                                                alt={`${i} Slide`}
                                            />
                                        ))
                                }
                            </Carousel>
                        </div>


                        <div>
                            <div className="detailsblock_1">
                                <h2>{product.name}</h2>
                                <p>Product #{product._id}</p>
                            </div>
                            <div className="detailsblock_2">
                                <Rating {...options}/>
                                <span className="detailsblock_2-span">
                                    {" "}
                                    ({product.numOfReviews} Reviews)
                                </span>
                            </div>
                            <div className="detailsblock_3">
                                <h1>{`₹${product.price}`}</h1>
                                <div className="detailsblock_3-1">
                                <div className="detailsblock_3-1-1">
                                    <button onClick={decreaseQuantity}>-</button>
                                    <input readOnly type="number" value={quantity} />
                                    <button onClick={increaseQuantity}>+</button>
                                </div>
                                <button
                                    disabled={product.Stock < 1 ? true : false}
                                    onClick={addToCartHandler}
                                >
                                    Add to Cart
                                </button>
                            </div>

                            <p>
                                Status:
                                <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                </b>
                            </p>
                        </div>
                        

                        <div className="detailsblock_4">
                            Description: <p>{product.description}</p>
                        </div>

                        <button onClick={submitReviewToggle} className="submitReview">
                            Submit Review
                        </button>
                    </div>
                </div>

                <h3 className="reviewsHeading">REVIEWS</h3>
                <Dialog
                    aria-labelledby="simple-dialog-title"
                    open={open}
                    onClose={submitReviewToggle}
                >
                    <DialogTitle>Submit Review</DialogTitle>
                    <DialogContent className="submitDialog">
                    <Rating
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                        size="large"
                    />

                    <textarea
                        className="submitDialogTextArea"
                        cols="30"
                        rows="5"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={submitReviewToggle} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={reviewSubmitHandler} color="primary">
                        Submit
                    </Button>
                    </DialogActions>
                </Dialog>

                {product.reviews && product.reviews[0] ? (
                    <div className="reviews">
                        {product.reviews &&
                            product.reviews.map((review) => (
                                <h4>Review</h4>
                        ))}
                    </div>
                    ) : (
                        <p className="noReviews">No Reviews Yet</p>
                )}

            </Fragment>
            )}
        </Fragment>
    )
}

export default ProductDetails