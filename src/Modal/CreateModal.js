import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./CreateModal.css";

const CreateModal = ({ onSave, onClose }) => {
    const [car, setCar] = useState("");
    const [car_model, setCarModel] = useState("");
    const [car_vin, setCarVin] = useState("");
    const [car_color, setCarColor] = useState("");
    const [car_model_year, setCarModelYear] = useState("");
    const [price, setPrice] = useState("");
    const [availability, setAvailability] = useState("");

    const handleSave = () => {
        const newCar = {
            id: uuidv4(),
            car,
            car_model,
            car_vin,
            car_color,
            car_model_year,
            price,
            availability,
        };

        onSave(newCar);
        onClose();
    };

    return (
        <div className="modal">
            <div className="overlay" onClick={onClose}></div>
            <div className="modal-content-wrapper">
                <div className="modal-content">
                    <h2>Create New Car</h2>
                    <div>
                        <label htmlFor="company">Company:</label>
                        <input
                            type="text"
                            id="company"
                            value={car}
                            onChange={(e) => setCar(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="model">Model:</label>
                        <input
                            type="text"
                            id="model"
                            value={car_model}
                            onChange={(e) => setCarModel(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="vin">VIN:</label>
                        <input
                            type="text"
                            id="vin"
                            value={car_vin}
                            onChange={(e) => setCarVin(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="color">Color:</label>
                        <input
                            type="text"
                            id="color"
                            value={car_color}
                            onChange={(e) => setCarColor(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="year">Year:</label>
                        <input
                            type="text"
                            id="year"
                            value={car_model_year}
                            onChange={(e) => setCarModelYear(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="price">Price:</label>
                        <input
                            type="text"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="availability">Availability:</label>
                        <input
                            type="text"
                            id="availability"
                            value={availability}
                            onChange={(e) => setAvailability(e.target.value)}
                        />
                    </div>
                    <div className="modal-actions">
                        <button onClick={handleSave}>Save</button>
                        <button onClick={onClose}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateModal;
