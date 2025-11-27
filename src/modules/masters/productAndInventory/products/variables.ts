

export interface ProductAttributes {
    Product_Id: number;
    Product_Code: string | null;
    Product_Name: string;
    Short_Name: string | null;
    Product_Description: string | null;
    Brand: number;
    Product_Group: number;
    Pack_Id: number;
    UOM_Id: number;
    IS_Sold: number | null;
    Display_Order_By: number | null;
    Product_Image_Name: string | null;
    Product_Image_Path: string | null;
    HSN_Code: string | null;
    Gst_P: number;
    Cgst_P: number;
    Sgst_P: number;
    Igst_P: number;
    ERP_Id: number | null;
    Pos_Brand_Id: number | null;
    IsActive: number;
    Product_Rate: number;
    Max_Rate: number;
    Alter_Id: number;
    Created_By: number;
    Created_Time: Date;
    Alter_By: number | null;
    Alter_Time: Date | null;
}

export const productInitialValue: ProductAttributes = {
    Product_Id: 0,
    Product_Code: '',
    Product_Name: '',
    Short_Name: '',
    Product_Description: '',
    Brand: 0,
    Product_Group: 0,
    Pack_Id: 0,
    UOM_Id: 0,
    IS_Sold: 1,
    Display_Order_By: 1,
    Product_Image_Name: '',
    Product_Image_Path: '',
    HSN_Code: '',
    Gst_P: 0,
    Cgst_P: 0,
    Sgst_P: 0,
    Igst_P: 0,
    ERP_Id: 0,
    Pos_Brand_Id: 0,
    IsActive: 0,
    Product_Rate: 0,
    Max_Rate: 0,
    Alter_Id: 0,
    Created_By: 0,
    Created_Time: new Date(),
    Alter_By: 0,
    Alter_Time: new Date(),
}