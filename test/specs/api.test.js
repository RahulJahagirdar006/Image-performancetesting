const axios = require('axios');
const assert = require('assert');

describe('API Tests for Reqres.in', () => {
  const apiUrl = 'https://reqres.in/api/users';

  it('should retrieve user information via GET request', async () => {
    const response = await axios.get(`${apiUrl}/1`);
    assert.equal(response.status, 200);
    assert.equal(response.data.data.id, 1);
    console.log('User retrieved:', response.data.data);
  });

  it('should create a new user via POST request', async () => {
    const newUser = {
      name: 'John Doe',
      job: 'QA Engineer'
    };

    const response = await axios.post(apiUrl, newUser);
    assert.equal(response.status, 201);
    console.log('New user created:', response.data);
  });

  it('should update user information via PUT request', async () => {
    const updatedUser = {
      name: 'Jane Doe',
      job: 'Software Engineer'
    };

    const response = await axios.put(`${apiUrl}/2`, updatedUser);
    assert.equal(response.status, 200);
    console.log('User updated:', response.data);
  });

  it('should delete a user via DELETE request', async () => {
    const response = await axios.delete(`${apiUrl}/3`);
    assert.equal(response.status, 204);
    console.log('User deleted:', response.status);
  });

  it('should handle invalid endpoint in GET request', async () => {
    try {
      const response = await axios.get(`${apiUrl}/invalid`);
      assert.fail('Expected GET request to fail with 404 status');
    } catch (error) {
      assert.equal(error.response.status, 404);
      console.log('GET request with invalid endpoint handled:', error.response.data);
    }
  });

  it('should handle invalid data format in POST request', async () => {
    const invalidUser = {
      name: 'John Doe',
      // Missing 'job' property
    };
  
    try {
      const response = await axios.post(apiUrl, invalidUser);
      assert.fail('Expected POST request to fail with 400 status');
    } catch (error) {
      assert.equal(error.response.status, 400);
      console.log('POST request with invalid data format handled:', error.response.data);
    }
  });

  it('should handle invalid user ID in PUT request', async () => {
    const updatedUser = {
      name: 'Jane Doe',
      job: 'Software Engineer'
    };
  
    try {
      const response = await axios.put(`${apiUrl}/999`, updatedUser);
      assert.fail('Expected PUT request to fail with 404 status');
    } catch (error) {
      assert.equal(error.response.status, 404);
      console.log('PUT request with invalid user ID handled:', error.response.data);
    }
  });
    
  it('should handle invalid user ID in DELETE request', async () => {
    try {
      const response = await axios.delete(`${apiUrl}/999`);
      assert.fail('Expected DELETE request to fail with 404 status');
    } catch (error) {
      assert.equal(error.response.status, 404);
      console.log('DELETE request with invalid user ID handled:', error.response.data);
    }
  });
  
  
});
