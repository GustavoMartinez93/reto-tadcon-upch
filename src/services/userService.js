const BASE_URL = 'https://dummyjson.com';

export async function getUsersByFilters(age, gender) {
  try {
    const response = await fetch(`${BASE_URL}/users/filter?key=age&value=${age}`);
    const data = await response.json();
    
    const filteredUsers = data.users?.filter(user => user.gender.toLowerCase() === gender.toLowerCase()) || [];

    return filteredUsers;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

export async function getAgesByUsers() {
  try {
    const response = await fetch(`${BASE_URL}/users?select=age`);
    const data = await response.json();

    let agesUsers = [];
    for (const user of data.users) {
      let d = agesUsers.find((ageUser) => user.age === ageUser)
      if (!d) {
        agesUsers.push(user.age);
      }
    }
    agesUsers.sort((a, b) => a - b);
    return agesUsers;
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