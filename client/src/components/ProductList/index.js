import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from '../Dashboard/SideBar';
import {getAdminProduct, deleteProduct} from '../../redux/actions/product.action';
import {DELETE_PRODUCT_RESET} from '../../redux/actionTypes';
import './style.css';


function ProductList({history}) {
    const dispatch = useDispatch();
    const { error, products } = useSelector((state) => state.products);
    
    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.product
    );

    useEffect(() => {
        dispatch(getAdminProduct());
    },[dispatch,history,error]);
    
    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    };
    const columns = [
        {field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5},
        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },
    
        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                    <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                        <EditIcon />
                    </Link>
        
                    <Button
                        onClick={() =>
                            deleteProductHandler(params.getValue(params.id, "id"))
                        }
                    >
                        <DeleteIcon />
                    </Button>
                    </Fragment>
                );
            },
        },
    ]

    const rows = [];
    
    products &&
    products.forEach((item) => {
        rows.push({
            id: item._id,
            stock: item.Stock,
            price: item.price,
            name: item.name,
        });
    });
    
    return (
        <Fragment>
            <div className="dashboard">
                <SideBar />
                    <div className="productListContainer">
                    <h1 id="productListHeading">ALL PRODUCTS</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                    </div>
            </div>
        </Fragment>
    )
}


export default ProductList
