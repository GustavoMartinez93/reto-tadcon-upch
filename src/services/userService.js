const BASE_URL = 'https://dummyjson.com';

export async function getUsersByFilters(age, gender) {
  try {
    console.log(gender);
    const response = await fetch(`${BASE_URL}/users/filter?key=age&value=${age}`);
    const data = await response.json();
    
    const filteredUsers = data.users?.filter(user => user.gender.toLowerCase() === gender.toLowerCase()) || [];

    return filteredUsers;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

export async function updateUser(userId, updatedData) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    });
    const data = await response.json();
    console.log('Usuario actualizado:', data);
    return data;
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
}

export async function deleteUser(userId) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log('Usuario eliminado:', data);
    return data;
  } catch (error) {
    console.error('Error deleting user:', error);
    return null;
  }
}