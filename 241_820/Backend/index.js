const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

let conn = null;

const initMySQL = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8820
    });
};


// ====================== GET ALL USERS ======================
app.get('/users', async (req, res) => {
    try {
        const [results] = await conn.query('SELECT * FROM users');
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const validateData = (userData) => {
    let errors = [];
    if (!userData.firstName) {
        errors.push('กรุณากรอกชื่อ');
    }
    if (!userData.lastName) {
        errors.push('กรุณากรอกนามสกุล');
    }
    if (!userData.age) {
        errors.push('กรุณากรอกอายุ');
    }
    if (!userData.gender) {
        errors.push('กรุณาเลือกเพศ');
    }
    if (!userData.interests) {
        errors.push('กรุณาเลือกงานอดิเรก');
    }
    if (!userData.description) {
        errors.push('กรุณากรอกคำอธิบาย');
    }
    return errors;
}

// ====================== POST CREATE USER ======================
app.post('/users', async (req, res) => {
    try {
        let user = req.body;
        const errors = validateData(user);
        if(errors.length > 0) {
            throw{
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                errors: errors
            }
        }
        
        const [result] = await conn.query(
            'INSERT INTO users SET ?',
            user
        );

        res.json({
            message: 'User created successfully',
            user: {
                id: result.insertId,
                ...user
            }
        });

    } catch (error) {
        const errorMessage = error.message || 'Error creating user'
        const errors = error.errors || [];
        
        console.error(error);
        res.status(500).json({
            message: 'Error creating user',
            error: error.message
        });
    }
});


// ====================== GET USER BY ID ======================
app.get('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const [results] = await conn.query(
            'SELECT * FROM users WHERE id = ?',
            [id]
        );

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(results[0]);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// ====================== UPDATE USER ======================
app.put('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let updatedUser = req.body;

        const [result] = await conn.query(
            'UPDATE users SET ? WHERE id = ?',
            [updatedUser, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            message: 'User updated successfully',
            user: { id, ...updatedUser }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// ====================== DELETE USER ======================
app.delete('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;

        const [result] = await conn.query(
            'DELETE FROM users WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.listen(port, async () => {
    await initMySQL();
    console.log(`Server running at http://localhost:${port}`);
});
