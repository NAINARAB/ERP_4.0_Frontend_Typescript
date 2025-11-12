export type Product = {
    Product_Id: number;
    Product_Code: string | null;
    Product_Name: string | null;
    Short_Name: string | null;
    Product_Description: string | null;
    Brand: number | null;
    Product_Group: number | null;
    Pack_Id: number | null;
    UOM_Id: number | null;
    IS_Sold: number | null;
    Display_Order_By: number | null;
    Product_Image_Name: string | null;
    Product_Image_Path: string | null;
    HSN_Code: string | null;
    Gst_P: string | number | null;
    Cgst_P: string | number | null;
    Sgst_P: string | number | null;
    Igst_P: string | number | null;
    ERP_Id: number | null;
    Pos_Brand_Id: number | null;
    IsActive: number | null;
    Product_Rate: string | number | null;
    Max_Rate: string | number | null;
    Alter_Id: number | null;
    Created_By: number | null;
    Created_Time: string | null | Date;
    Alter_By: number | null;
    Alter_Time: string | null | Date;
};

export type Pack = {
    Pack_Id: number;
    Pack: string;
}