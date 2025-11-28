import React, { useState, useEffect } from "react";
import { IconButton, Button } from "@mui/material";
import { Edit } from "@mui/icons-material";
import type { PageProps } from "../../../../routes/indexRouter";
import type { Pack } from "./variable";
import { getPacks } from "./api";
import DataTable, { createCol } from "../../../../components/dataTable";
import PackCreationForm from "./createForm";

const PackList: React.ComponentType<PageProps> = ({
    loadingOff, loadingOn
}) => {
    const [packs, setPacks] = useState<Pack[]>([]);
    const [pack, setPack] = useState<Pack | null>(null);
    const [dialog, setDialog] = useState({
        createDialog: false,
        deleteDialog: false,
    });

    async function fetchPackData(): Promise<Pack[] | any> {
        try {
            const res = await getPacks({ loadingOn, loadingOff });
            setPacks(res);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchPackData();
    }, []);

    const setPackDetails = (row: Pack) => {
        setPack(row);
        setDialog(pre => ({ ...pre, createDialog: true }));
    }

    const closeDialog = () => {
        setDialog(pre => ({ ...pre, createDialog: false, deleteDialog: false }));
        setPack(null);
    }

    const onSuccess = () => {
        closeDialog();
        fetchPackData();
    }

    return (
        <>
            <DataTable
                title="Packs"
                EnableSerialNumber
                dataArray={packs}
                columns={[
                    createCol('Pack', 'string', 'Pack'),
                    {
                        isVisible: 1,
                        ColumnHeader: 'Actions',
                        align: 'center',
                        verticalAlign: 'center',
                        isCustomCell: true,
                        Cell: ({ row }) => (
                            <>
                                <IconButton onClick={() => setPackDetails(row)}>
                                    <Edit />
                                </IconButton>
                            </>
                        )

                    }
                ]}
                ButtonArea={
                    <>
                        <Button onClick={() => {
                            setPack(null);
                            setDialog(pre => ({ ...pre, createDialog: true }));
                        }}>Add</Button>
                    </>
                }
            />

            <PackCreationForm 
                editValue={pack}
                open={dialog.createDialog}
                onSuccess={onSuccess}
                onClose={closeDialog}
                loadingOff={loadingOff}
                loadingOn={loadingOn}
            />
        </> 
    )
}

export default PackList;