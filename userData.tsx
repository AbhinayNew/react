import 'react-data-grid/lib/styles.css';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Loader from '../loader.tsx';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../redux/userReducer';

const API = "https://jsonplaceholder.typicode.com/users";

const UserDataList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editIndex, setEditIndex] = useState(-1);
    const [editedName, setEditedName] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const res = await fetch(API);
            const data = await res.json();
            if (data.length > 0) {
                setUsers(data);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEditClick = (index, name) => {
        setEditIndex(index);
        setEditedName(name);
    };

    const handleSaveClick = (index) => {
        const updatedUsers = [...users];
        updatedUsers[index].name = editedName; // Update the name
        setUsers(updatedUsers);
        setEditIndex(-1); // Exit edit mode
    };

    const handleEdit = (curUser) => {
        dispatch(addUser(curUser));
        navigate(`/userInfo/${curUser.id}`);
    };

    const lists = users.map((item, index) => (
        <tr key={item.id}>
            <td>
                {editIndex === index ? (
                    <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                    />
                ) : (
                    item['name']
                )}
            </td>
            <td>{item.email}</td>
            <td>{item.address.city}</td>
            <td>{item.company.name}</td>
            <td>
                {editIndex === index ? (
                    <button className='button-primary' onClick={() => handleSaveClick(index)} style={{ marginLeft: '8%' }}>
                        Save
                    </button>
                ) : (
                    <button className='button-primary' onClick={() => handleEditClick(index, item.name)} style={{ marginLeft: '8%' }}>
                        Edit 
                    </button>
                )}
            </td>
            <td>
                <button className='button-primary' onClick={() => handleEdit(item)} style={{ marginLeft: '8%' }}>
                    View
                </button>
            </td>
        </tr>
    ));

    return (
        <Loader loading={loading}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Email</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>City</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Company</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Edit</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>View</th>
                    </tr>
                </thead>
                <tbody>
                    {lists}
                </tbody>
            </table>
        </Loader>
    );
};

export default UserDataList;
