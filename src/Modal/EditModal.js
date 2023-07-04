import React, { useState } from "react";
import "./EditModal.css";

const EditModal = ({ car }) => {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add("active-modal");
    } else {
        document.body.classList.remove("active-modal");
    }

    return (
        <>
            {modal && (
                <div className="modal">
                    <div className="overlay" onClick={toggleModal}></div>
                    <div className="modal__content">
                        <h3>Update current info about car</h3>
                        <input type="text" disabled value={car.car} />
                        <input type="text" disabled value={car.car_model} />
                        <input type="text" disabled value={car.car_vin} />
                        <input type="text" defaultValue={car.car_color} />
                        <input
                            type="text"
                            disabled
                            value={car.car_model_year}
                        />
                        <input type="text" defaultValue={car.price} />
                        <input type="text" defaultValue={car.availability} />
                        <button className="yes-modal" onClick={toggleModal}>
                            Edit
                        </button>
                        <button className="no-modal" onClick={toggleModal}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditModal;
