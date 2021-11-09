import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "react-js-pagination";
import {Loader,ProductCard} from '../';
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import {getProduct} from "../../redux/actions/product.action"
import numeral from 'numeral'
import './style.css'

const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
];



const data = [0,0,0,0,0,0,0,0,0,0,0,0,];

function Products({match}) {
    
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 250000000]);
    const [category, setCategory] = useState("");

    const [ratings, setRatings] = useState(0);

    const {
        products,
        loading,
        error,
        productsCount,
        resultPerPage,
        // filteredProductsCount,
    } = useSelector((state) => state.products);


    const keyword = match.params.keyword;

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    // let count = filteredProductsCount;

    useEffect(() => {
        dispatch(getProduct(keyword, currentPage, price, category, ratings));
    }, [dispatch, keyword, currentPage, price, category, ratings, error]);


    return (
        <Fragment>
            {loading ? (

                <Loader />
            ) : (
                <Fragment>
                    <h2 className="productsHeading">Products</h2>

                    <div className="products">
                        {products &&  
                            products.map((product) => (
                                <ProductCard  product={product}/>
                            ))
                        }
                    </div>

                    <div className="filterBox">
                        <Typography>Price</Typography>
                            <Slider 
                                value={price}
                                onChange={priceHandler}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                min={0}
                                max={250000}
                            />
                        
                        <Typography>Categories</Typography>
                        <ul className="categoryBox">
                            {
                                categories.map((category) => (
                                    <li
                                        className="category-link"
                                        key={category}
                                        onClick={() => setCategory(category)}
                                    >
                                        {category}
                                    </li>
                                ))
                            }
                        </ul>
                        <fieldset>
                            <Typography component="legend">Rating Above</Typography>
                            <Slider 
                                value={ratings}
                                onChange={(e, newRating) => {
                                    setRatings(newRating);
                                }}
                                aria-labelledby="continuous-slider"
                                valueLabelDisplay="auto"
                                min={0}
                                max={5}
                            />
                        </fieldset>
                    </div>

                    {
                        (
                            <div className="paginationBox">
                                <Pagination 
                                    activePage={currentPage}
                                    itemsCountPerPage={resultPerPage}
                                    totalItemsCount={productsCount}
                                    onChange={setCurrentPageNo}
                                    nextPageText="Next"
                                    prevPageText="Prev"
                                    firstPageText="1st"
                                    lastPageText="Last"
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activeClass="pageItemActive"
                                    activeLinkClass="pageLinkActive"
                                />
                            </div>
                        )
                    }
                </Fragment>
            )
                
            }
        </Fragment>
    )
}

export default Products

