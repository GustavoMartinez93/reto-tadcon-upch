import React, { useState } from 'react';
import EditModal from './modals/EditModal';
import DeleteModal from './modals/DeleteModal';

function UserList({ users, onEditSave, onDeleteUser }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    const handleDeleteClick = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const closeModals = () => {
        setShowEditModal(false);
        setShowDeleteModal(false);
        setSelectedUser(null);
    };

    return (
        <div className="card border rounded-2" style={{ background: '#f8f8f8' }}>
        <div className="card-body">
            <table className="table table-hover table-light" id="example">
            <thead>
                <tr>
                <th><i className="bi bi-check-lg"></i></th>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Genero</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Edad</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                <tr key={user.id}>
                    <td><input type="checkbox" /></td>
                    <td><img src={user.image} alt={user.firstName} className="img-thumbnail" /></td>
                    <td>{user.firstName}</td>
                    <td>{user.gender}</td>
                    <td>{user.address.address}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td style={{display:'flex'}}>
                    <button 
                        className="btn btn-sm btn-outline-primary me-2" 
                        onClick={() => handleEditClick(user)}
                    >
                        Editar
                    </button>
                    <button 
                        className="btn btn-sm btn-outline-danger" 
                        onClick={() => handleDeleteClick(user)}
                    >
                        Eliminar
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
            <EditModal 
            show={showEditModal} 
            user={selectedUser} 
            onClose={closeModals} 
            onSave={(updatedUser) => {
                onEditSave(updatedUser);
                closeModals();
            }}
            />
            <DeleteModal 
            show={showDeleteModal} 
            user={selectedUser} 
            onClose={closeModals} 
            onDelete={() => {
                onDeleteUser(selectedUser);
                closeModals();
            }}
            />
        </div>
        </div>
    );
}

export default UserList;
