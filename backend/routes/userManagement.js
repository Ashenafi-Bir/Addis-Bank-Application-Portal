const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Import the User model

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    const { firstName, lastName, username, employeeId, department, password, confirmPassword, role } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            firstName,
            lastName,
            username,
            employeeId,
            department,
            password: hashedPassword,
            role: role || 'user', // Use provided role or fallback to 'user'
        });

        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Get all users (for admin purposes)
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params; // Get user ID from the URL

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user); // Return the found user
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Update a user
router.put('/:id', async (req, res) => {
    const { id } = req.params; // Get user ID from the URL
    const { firstName, lastName, username, employeeId, department, role, password } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user fields
        user.firstName = firstName;
        user.lastName = lastName;
        user.username = username;
        user.employeeId = employeeId;
        user.department = department;
        user.role = role;

        // Hash the password if it's provided
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save(); // Save the updated user
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    const { id } = req.params; // Get user ID from the URL

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy(); // Delete the user
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
router.put('/:id/change-password', async (req, res) => {
    const { id } = req.params; // Get user ID
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare current password with the stored hash
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect current password' });
        }

        // Hash the new password and update the user record
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save(); // Save the updated user

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error('Error updating password:', err);
        res.status(500).send('Server error');
    }
});


module.exports = router;
