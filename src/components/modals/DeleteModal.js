import React from 'react';
import { deleteUser } from '../../services/userService';

function DeleteModal({ show, user, onClose, onDelete }) {
  const handleDelete = async () => {
    const deletedUser = await deleteUser(user.id);
    if (deletedUser) {
      onDelete(deletedUser);
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Eliminar Usuario</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>¿Estás seguro de que deseas eliminar a {user?.firstName}?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;