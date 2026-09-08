const express = require('express');
const fs = require('fs');

const app = express();

app.set('view engine', 'ejs')

app.get('/users', (req, res) => {
    const data = fs.readFileSync('users.json', 'utf-8')
    const users = JSON.parse(data)
    res.render('users', {
        users: users
    })

})

app.listen(3000, () => {
    console.log('Server Berjalan di http://localhost:3000')
})