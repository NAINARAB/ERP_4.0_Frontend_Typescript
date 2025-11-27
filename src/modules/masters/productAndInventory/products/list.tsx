import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Button } from "@mui/material";
import { Edit } from "@mui/icons-material";
import type { PageProps } from "../../../../routes/indexRouter";
import { listProduct } from "./api";
import DataTable, { createCol } from "../../../../components/dataTable";
import { type ProductAttributes } from "./variables";
import { useNavigate } from "react-router-dom";

const ProductList: React.ComponentType<PageProps> = ({
    loadingOff, loadingOn
}) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<ProductAttributes[]>([]);
    const [dialog, setDialog] = useState({
        createDialog: false,
        deleteDialog: false,
    });

    async function fetchProductData(): Promise<ProductAttributes[] | any> {
        try {
            const res = await listProduct({ loadingOn, loadingOff });
            setProducts(res);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchProductData();
    }, []);

    // const closeDialog = () => {
    //     setDialog(pre => ({ ...pre, createDialog: false, deleteDialog: false }));
    //     setPack(productInitialValue);
    // }

    // const onSuccess = () => {
    //     closeDialog();
    //     fetchProductData();
    // }

    // const saveProduct = async () => {
    //     if (!pack.Product) return toast.warn('Enter Product');

    //     await (toNumber(pack.Product_Id) !== 0
    //         ? updateProduct({
    //             id: pack.Product_Id,
    //             bodyData: pack,
    //             loadingOn,
    //             loadingOff,
    //             onSuccess
    //         })
    //         : createProduct({
    //             bodyData: pack,
    //             loadingOn,
    //             loadingOff,
    //             onSuccess
    //         }));
    // }

    return (
        <>
            <DataTable
                title="Packs"
                EnableSerialNumber
                dataArray={products}
                columns={[
                    createCol('Product_Name', 'string', 'Product'),
                    createCol('Product_Code', 'string', 'Product Code'),
                    {
                        isVisible: 1,
                        ColumnHeader: 'Actions',
                        align: 'center',
                        verticalAlign: 'center',
                        // isCustomCell: true,
                        // Cell: ({ row }) => (
                        //     <>
                        //         <IconButton onClick={() => {
                        //             setPack(row);
                        //             setDialog(pre => ({ ...pre, createDialog: true }));
                        //         }}>
                        //             <Edit />
                        //         </IconButton>
                        //     </>
                        // )

                    }
                ]}
                ButtonArea={
                    <>
                        <Button onClick={() => {
                            navigate('create');
                        }}>Add</Button>
                    </>
                }
            />

            {/* <Dialog
                open={dialog.createDialog}
                onClose={closeDialog}
                maxWidth='sm' fullWidth
            >
                <DialogTitle>Add New Pack</DialogTitle>
                <DialogContent>
                    <label>Pack</label>
                    <input
                        className="cus-inpt"
                        type="text"
                        value={pack.Pack}
                        onChange={(e) => setPack({ ...pack, Pack: e.target.value })}
                        placeholder="Enter Pack"
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={closeDialog}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={savePack}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog> */}
        </>
    )
}

export default ProductList;