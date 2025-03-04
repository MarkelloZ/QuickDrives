import React, { useEffect, useState } from "react";
import { getAllReservations, deleteReservation } from "../services/api";

const AdminReservations = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const token = localStorage.getItem("token");
                const data = await getAllReservations(token);
                setReservations(data);
            } catch (error) {
                console.error("Σφάλμα:", error);
            }
        };
        fetchReservations();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await deleteReservation(id, token);
            setReservations(reservations.filter(r => r.id !== id));
        } catch (error) {
            console.error("Σφάλμα:", error);
        }
    };

    return (
        <div>
            <h2>Διαχείριση Κρατήσεων</h2>
            <ul>
                {reservations.map(res => (
                    <li key={res.id}>
                        {res.full_name} - {res.car.brand} {res.car.model} ({res.total_price}€)
                        <button onClick={() => handleDelete(res.id)}>Διαγραφή</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminReservations;
