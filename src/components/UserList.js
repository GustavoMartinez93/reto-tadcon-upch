import React, { useState } from 'react';
import EditModal from './modals/EditModal';
import DeleteModal from './modals/DeleteModal';

function UserList({ users, onEditSave, onDeleteUser }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const usersPerPage = 5;

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(users.length / usersPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                {currentUsers.map((user) => (
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
            
            {/* Paginación */}
            <div className="pagination mt-3">
                <button 
                    className="btn btn-outline-secondary" 
                    onClick={() => paginate(currentPage - 1)} 
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                {[...Array(totalPages).keys()].map((number) => (
                    <button
                        key={number}
                        className={`btn btn-outline-secondary mx-1 ${currentPage === number + 1 ? 'active' : ''}`}
                        onClick={() => paginate(number + 1)}
                    >
                        {number + 1}
                    </button>
                ))}
                <button 
                    className="btn btn-outline-secondary" 
                    onClick={() => paginate(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                >
                    Siguiente
                </button>
            </div>
        </div>
        </div>
    );
}


export default UserList;
