import React, { useState, useEffect } from 'react';
import { updateUser } from '../../services/userService';

function EditModal({ show, user, onClose, onSave }) {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    gender: '',
    address: {
      address: '',
    },
    phone: '',
    age: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user?.firstName || '',
        email: user?.email || '',
        gender: user?.gender || '',
        address: {
          address: user?.address?.address || '',
        },
        phone: user?.phone || '',
        age: user?.age || '',
      });
    }
  }, [user]);


  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id.includes('address')) {
      setFormData(prevFormData => ({
        ...prevFormData,
        address: {
          ...prevFormData.address,
          [id.split('.')[1]]: value
        }
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [id]: value
      }));
    }
  };

  const handleSave = async () => {
    const updatedUser = await updateUser(user.id, formData);
    if (updatedUser) {
      onSave(updatedUser);
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Usuario</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="editNombre" className="form-label">Nombre</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="firstName" 
                  defaultValue={formData.firstName} 
                  onChange={handleChange} 
                  required />
              </div>
              <div className="mb-3">
                <label htmlFor="editGenero" className="form-label">Género</label>
                <select 
                  className="form-select" 
                  id="gender"
                  value={formData.gender} 
                  onChange={handleChange} 
                  required
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>
              <div className="mb-3 col-sm-12">
                  <label htmlFor="editDireccion" className="form-label">Dirección</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="address.address" 
                    defaultValue={formData.address.address} 
                    onChange={handleChange}  />
              </div>
              <div className="mb-3 col-sm-12">
                  <label htmlFor="editTelefono" className="form-label">Teléfono</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="phone" 
                    value={formData.phone} 
                    onChange={handleChange} />
              </div>
              <div className="mb-3 col-sm-12">
                  <label htmlFor="editCorreo" className="form-label">Correo electrónico</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    defaultValue={formData.email} 
                    onChange={handleChange} 
                    required />
              </div>
              <div className="mb-3 col-sm-12">
                  <label htmlFor="editEdad" className="form-label">Edad</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="age" 
                    defaultValue={formData?.age} 
                    onChange={handleChange} 
                    required />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditModal;