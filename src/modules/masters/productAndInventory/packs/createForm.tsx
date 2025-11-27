import { toNumber } from "../../../../utils/helper";
import { createPack, updatePack, type Pack } from "./api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { initialPackState } from "./variable";
import AppDialog from "../../../../components/appDialog";

const PackCreationForm: React.FC<{
    loadingOff: () => void,
    loadingOn: () => void,
    onSuccess: () => void,
    open: boolean,
    editValue?: Pack | null | undefined,
    onClose: () => void
}> = ({
    loadingOff,
    loadingOn,
    onSuccess,
    onClose,
    open = false,
    editValue
}) => {
        const [pack, setPack] = useState<Pack>(initialPackState);

        useEffect(() => {
            if (editValue) {
                setPack(editValue);
            } else {
                setPack(initialPackState);
            }
        }, [editValue, open]);

        const closeDialog = () => {
            setPack(initialPackState);
            onClose()
        }

        const savePack = async () => {
            if (!pack.Pack) return toast.warn('Enter Pack');
            const isEdit = toNumber(pack.Pack_Id) !== 0;

            if (isEdit) {
                await updatePack({
                    id: pack.Pack_Id,
                    bodyData: pack,
                    loadingOn,
                    loadingOff,
                    onSuccess
                })
            } else {
                createPack({
                    bodyData: pack,
                    loadingOn,
                    loadingOff,
                    onSuccess
                })
            }
        }

        return (
            <>
                <AppDialog
                    open={open}
                    onClose={closeDialog}
                    title={editValue ? 'Update Pack' : 'Add New Pack'}
                    onSubmit={savePack}
                    submitText={'save'}
                    closeText="cancel"
                >
                    <label>Pack</label>
                    <input
                        className="cus-inpt"
                        type="text"
                        value={pack.Pack}
                        onChange={(e) => setPack({ ...pack, Pack: e.target.value })}
                        placeholder="Enter Pack"
                    />
                </AppDialog>
            </>
        )
    }

export default PackCreationForm;