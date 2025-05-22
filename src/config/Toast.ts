import { toast } from "react-toastify";

export const notify = (type: "success" | "error" | "info" | "warn", msg: string) => {
    if (type === "success") toast.success(msg);
    else if (type === "error") toast.error(msg);
    else if (type === "info") toast.info(msg);
    else if (type === "warn") toast.warn(msg);
};