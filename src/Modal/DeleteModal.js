import React from "react";
import "./DeleteModal.css";

const DeleteModal = ({ selectedCar, onConfirm, onClose }) => {
    const handleDelete = () => {
        console.log("Selected car:", selectedCar);
        console.log(
            "Selected car ID:",
            selectedCar ? selectedCar.id : undefined
        );
        if (selectedCar) {
            onConfirm(selectedCar);
        }
    };

    const handleNo = () => {
        onClose();
    };

    return (
        <div className="modal">
            <div className="overlay" onClick={onClose}></div>
            <div className="modal__content">
                <p>
                    Are you sure you want to delete this car info from the list?
                </p>
                <button className="yes-modal" onClick={handleDelete}>
                    Yes
                </button>
                <button className="no-modal" onClick={handleNo}>
                    No
                </button>
            </div>
        </div>
    );
};

export default DeleteModal;
