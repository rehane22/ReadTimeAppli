const request = require('supertest');
const express = require('express');
const app = express();
const authController = require('../controllers/authController');

// Mock the User model (You may need to adjust this based on your actual model)
jest.mock('../models/userModels', () => ({
  findOne: jest.fn(),
  save: jest.fn(),
}));

// Use supertest for making HTTP requests to your Express app
const supertest = require('supertest');
const api = supertest(app);

// Mock Express request and response objects
const req = {};
const res = {
  status: jest.fn(() => res),
  json: jest.fn(),
};

// Test signup controller
describe('Signup Controller', () => {
  it('should create a new user and return a success message', async () => {
    req.body = { username: 'testuser', email: 'test@example.com', password: 'testpassword' };

    // Mock the findOne method to simulate an existing user
    authController.findOne = jest.fn(() => null);

    // Mock the bcrypt hash method
    jest.mock('bcrypt', () => ({
      hash: jest.fn(() => 'hashedPassword'),
    }));

    await authController.signup(req, res);

    // Expect the response to have a 201 status and a success message
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'User registered successfully' });
  });

  it('should return an error if the username or email already exists', async () => {
    req.body = { username: 'existinguser', email: 'existing@example.com', password: 'testpassword' };

    // Mock the findOne method to simulate an existing user
    authController.findOne = jest.fn(() => ({ username: 'existinguser' }));

    await authController.signup(req, res);

    // Expect the response to have a 400 status and an error message
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Username or email already exists' });
  });
});

// Test login controller
describe('Login Controller', () => {
  it('should return a JWT token on successful login', async () => {
    req.body = { username: 'testuser', password: 'testpassword' };

    // Mock the findOne method to simulate an existing user
    authController.findOne = jest.fn(() => ({
      username: 'testuser',
      password: '$2b$10$S1iQ5I6izsH2ph8rcIjXxuIlFjvBLAAIUk.2CBZgsSdb1Z9MoxQrK', // Mocked hashed password
    }));

    // Mock the bcrypt compare method
    jest.mock('bcrypt', () => ({
      compare: jest.fn(() => true),
    }));

    // Mock the jwt sign method
    jest.mock('jsonwebtoken', () => ({
      sign: jest.fn(() => 'mockedJWTToken'),
    }));

    await authController.login(req, res);

    // Expect the response to have a JSON object with a token property
    expect(res.json).toHaveBeenCalledWith({ token: 'mockedJWTToken' });
  });

  it('should return an error if the user is not found or the password is incorrect', async () => {
    req.body = { username: 'nonexistentuser', password: 'incorrectpassword' };

    // Mock the findOne method to simulate a non-existing user
    authController.findOne = jest.fn(() => null);

    await authController.login(req, res);

    // Expect the response to have a 401 status and an error message
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });

    // Reset the mock for findOne to simulate a user, but with incorrect password
    authController.findOne = jest.fn(() => ({
      username: 'existinguser',
      password: '$2b$10$S1iQ5I6izsH2ph8rcIjXxuIlFjvBLAAIUk.2CBZgsSdb1Z9MoxQrK', // Mocked hashed password
    }));

    await authController.login(req, res);

    // Expect the response to have a 401 status and an error message
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
  });
});
