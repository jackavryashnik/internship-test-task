import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import FetchData from "./FetchData";
import DeleteModal from "./Modal/DeleteModal";
import EditModal from "./Modal/EditModal";
import CreateModal from "./Modal/CreateModal";
import { useLocalStorage } from "./useLocalStorage";

function RenderCars() {
    const [cars, setCars] = useLocalStorage("cars", []);
    const [selectedAction, setSelectedAction] = useState("");
    const [search, setSearch] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 20;

    const handleDataFetched = (data) => {
        setCars(data);
    };

    const handleAction = (event) => {
        const selectedAction = event.target.value;
        setSelectedAction(selectedAction);

        if (selectedAction === "delete") {
            const carId = parseInt(event.target.parentNode.parentNode.id, 10);
            const selectedCarData = cars.find((car) => car.id === carId);
            setSelectedCar(selectedCarData);
            setShowDeleteModal(true);
        } else if (selectedAction === "edit") {
            const carId = parseInt(event.target.parentNode.parentNode.id, 10);
            const selectedCarData = cars.find((car) => car.id === carId);
            setSelectedCar(selectedCarData);
            setShowEditModal(true);
        }
    };

    const handleAddNewCar = () => {
        setShowCreateModal(true);
    };

    const closeModal = () => {
        setSelectedAction("");
        setShowCreateModal(false);
        setShowDeleteModal(false);
        setShowEditModal(false);
        setSelectedCar(null);
    };

    useEffect(() => {
        fetch("https://myfakeapi.com/api/cars/")
            .then((response) => response.json())
            .then((data) => {
                handleDataFetched(data.cars);
            })
            .catch((error) => console.log("error", error));
        if (showDeleteModal || showEditModal) {
            document.body.classList.add("active-modal");
        } else {
            document.body.classList.remove("active-modal");
        }
    }, [showDeleteModal, showEditModal]);

    const handleDelete = (car) => {
        setCars((prevCars) => prevCars.filter((c) => c.id !== car.id));
        closeModal();
    };

    const handleSaveCar = (newCar) => {
        setCars((prevCars) => [...prevCars, newCar]);
        closeModal();
    };

    const filteredCars = cars.filter((car) => {
        const searchValue = search.toLowerCase();
        const carName = car.car ? car.car.toLowerCase() : "";
        const carModel = car.car_model ? car.car_model.toLowerCase() : "";
        const carVin = car.car_vin ? car.car_vin.toLowerCase() : "";
        const carColor = car.car_color ? car.car_color.toLowerCase() : "";

        return (
            searchValue === "" ||
            carName.includes(searchValue) ||
            carModel.includes(searchValue) ||
            carVin.includes(searchValue) ||
            carColor.includes(searchValue)
        );
    });

    const pageCount = Math.ceil(filteredCars.length / itemsPerPage);

    const displayedCars = filteredCars.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );
    console.log(cars);

    return (
        <div className="table-container">
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleAddNewCar}>Add new car</button>
            <table>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Model</th>
                        <th>VIN</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Price</th>
                        <th>Availability</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedCars.map((car) => (
                        <tr key={car.id}>
                            <td>{car.car}</td>
                            <td>{car.car_model}</td>
                            <td>{car.car_vin}</td>
                            <td>{car.car_color}</td>
                            <td>{car.car_model_year}</td>
                            <td>{car.price}</td>
                            <td>{`${car.availability}`}</td>
                            <td>
                                <select defaultValue="" onChange={handleAction}>
                                    <option disabled value="">
                                        Select Action
                                    </option>
                                    <option value="edit">Edit</option>
                                    <option value="delete">Delete</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={({ selected }) => setCurrentPage(selected)}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
            />
            {showDeleteModal && (
                <DeleteModal
                    onConfirm={handleDelete}
                    selectedCar={selectedCar}
                    onClose={closeModal}
                />
            )}

            {showEditModal && (
                <EditModal car={selectedCar} onClose={closeModal} />
            )}
            {showCreateModal && (
                <CreateModal onSave={handleSaveCar} onClose={closeModal} />
            )}
        </div>
    );
}

export default RenderCars;
