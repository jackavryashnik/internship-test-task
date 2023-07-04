import DeleteModal from "./Modal/DeleteModal";

const renderSelectedAction  = (event) => {
    const selectedAction = event;

    if (selectedAction === "edit") {
        console.log("Edit action selected");
    } else if (selectedAction === "delete") {
        console.log("Delete action selected");
        return <DeleteModal />;
    }

    return null;
};

export default renderSelectedAction;
