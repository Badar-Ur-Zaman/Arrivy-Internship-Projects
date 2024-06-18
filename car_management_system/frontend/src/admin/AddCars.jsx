import React, { useState } from "react";

function AddCars() {
    //States for getting, setting rows in brands table

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/add_car', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ model, year, make, engine, fuelType }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const jsonData = await response.json();
            console.log(jsonData);

            if (jsonData.message === 'Car added successfully.') {
                // Clear form or show success message
            } else {
                console.error('Failed to add car:', jsonData.message);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h2>Add a New Car</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} required />
                <input type="number" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} required />
                <input type="text" placeholder="Make" value={make} onChange={(e) => setMake(e.target.value)} required />
                <input type="text" placeholder="Engine" value={engine} onChange={(e) => setEngine(e.target.value)} required />
                <input type="text" placeholder="Fuel Type" value={fuelType} onChange={(e) => setFuelType(e.target.value)} required />
                <button type="submit">Add Car</button>
            </form>
        </div>
    );
}

export default AddCars;
