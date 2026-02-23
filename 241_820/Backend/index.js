const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mysql = require('mysql2/promise'); 
const port = 8000;

app.use(bodyParser.json());

let conn = null;


const initMysql = async () => {
    try {
        conn = await mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'root',
            database: 'webdb', 
            port: 8820         
        });
        console.log('MySQL Connected');
    } catch (error) {
        console.error('MySQL Connection Error:', error.message);
    }
}

// 1. GET /users - ดึงข้อมูลทั้งหมดจากตาราง 'user'
app.get('/users', async (req, res) => {
    try {
        const [results] = await conn.query('SELECT * FROM user'); 
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});

// 2. POST /users - เพิ่ม User ใหม่
app.post('/users', async (req, res) => {
    try {
        const { firstname, lastname, age, gender, interests, description } = req.body;
        
        const [result] = await conn.query(
            'INSERT INTO user (firstname, lastname, age, gender, interests, description) VALUES (?, ?, ?, ?, ?, ?)',
            [firstname, lastname, age, gender, interests, description]
        );
        res.json({
            message: 'User created successfully',
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});

// 3. GET /users/:id - ดึงข้อมูลรายบุคคล
app.get('/users/:id', async (req, res) => {
    try {
        const [results] = await conn.query('SELECT * FROM user WHERE id = ?', [req.params.id]);
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(results[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
});

// 4. PUT /users/:id - แก้ไขข้อมูลทั้งหมดของ User
app.put('/users/:id', async (req, res) => {
    try {
        const { firstname, lastname, age, gender, interests, description } = req.body;
        const [result] = await conn.query(
            'UPDATE user SET firstname=?, lastname=?, age=?, gender=?, interests=?, description=? WHERE id=?',
            [firstname, lastname, age, gender, interests, description, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
});

// 5. DELETE /users/:id - ลบ User
app.delete('/users/:id', async (req, res) => {
    try {
        const [result] = await conn.query('DELETE FROM user WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
});

app.listen(port, async () => {
    await initMysql();
    console.log(`Server running on port ${port}`);
});
