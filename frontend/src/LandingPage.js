import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LandingPage = () => {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8000/api/items/?search=${filter}`)
            .then(response => setItems(response.data))
            .catch(error => console.error(error));
    }, [filter]);

    return (
        <div>
            <h1>Item List</h1>
            <input type="text" placeholder="Filter by name" onChange={(e) => setFilter(e.target.value)} />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LandingPage;
