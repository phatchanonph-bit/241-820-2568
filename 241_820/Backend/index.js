const express = require('express');
const bodyParser = require('body-parser');
const { use } = require('react');
const app = express();
const port = 8000;

app.use(bodyParser.text());

let users = [];
let counter = 1;

//path = /get
app.get('/get', (req, res) => {
    res.json(users);
});

// path = /
app.get('/test', (req, res) => {
    let user = {
        name: 'John Doe',
        age: 30,
        email: 'john.doe@example.com'
    };
    res.json(user);
});

// path = post /user
app.post('/add', (req, res) => {
    let user = req.body;
    user.id = counter++;
    users.push(user);
    res.json({ message: 'User added successfully', user: user });
});

//path = push /user/id
app.put('/user/:id', (req, res) => {
    let id = req.params.id;
    let updatedUser = req.body;
    // หา user ที่มี id ตรงกับที่ส่งมา
    let selectedindex = users.findIndex(user => user.id == id);
      

    // อัพเดตข้อมูลของ user นั้น
    if (updatedUser.name) {
        users[selectedindex].name = updatedUser.name;
    }
    if (updatedUser.age) {
        users[selectedindex].age = updatedUser.age;
    }

    users[selectedindex].name = updatedUser.name || users[selectedindex].name;
    users[selectedindex].age = updatedUser.age || users[selectedindex].age;
    
    // ส่ง response กลับไปว่าอัพเดตสำเร็จหรือไม่
    res.json({
        message: 'User updated successfully',
        data : {
            user : updatedUser,
            indexUpdated : selectedindex
        }
    })

});

// delete user
app.delete('/user/:id', (req, res) => {
    let id = req.params.id;
    let selectedindex = users.findIndex(user => user.id == id);
    if (selectedindex !== -1) {
        users.splice(selectedindex, 1);
        res.json({ message: 'User deleted successfully',data : {
            indexDeleted : selectedindex
        } } );
    } else {
        res.status(404).json({ message: 'User not found' });
    }   
});




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
