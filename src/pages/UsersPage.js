import React, { useState, useEffect } from 'react';
import Filter from '../components/Filter';
import UserList from '../components/UserList';
import { getUsersByFilters, getAgesByUsers } from '../services/userService';

function UsersPage() {
  const [ages, setAges] = useState([]);
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetchAges();
    fetchUsers();
  }, []);

  const fetchUsers = async (age, gender) => {
    const filteredUsers = await getUsersByFilters(age, gender);
    setUsers(filteredUsers);
  };

  const fetchAges = async () => {
    const filteredAges = await getAgesByUsers();
    setAges(filteredAges);
  };

  const handleEditSave = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
  };

  const handleDeleteUser = (deletedUser) => {
    setUsers(users.filter(user => user.id !== deletedUser.id));
  };

  return (
    <div className="container pt-5">
      <Filter ages={ages} onSearch={fetchUsers} />
      <UserList 
        users={users} 
        onEditSave={handleEditSave} 
        onDeleteUser={handleDeleteUser} 
      />
    </div>
  );
}

export default UsersPage;
