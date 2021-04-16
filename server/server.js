const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
const port = process.env.PORT || 5000

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const pool = mysql.createPool({
    connectionLimit : 10,
    host: "127.0.0.1",
    user: "root",
    database: "smarthouse",
    password: "root"
})

app.get('/', (req, res) => {
    res.send("Hello api")
})

app.post('/register', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        const params = req.body
        console.log(req.body.params.homeID, req.body.params.code, req.body.params.name)
        let sql = 'INSERT INTO `users` (`homeID`, `code`, `name`) VALUES (?, ?, ?)';
        let data = [req.body.params.homeID, req.body.params.code, req.body.params.name];
        connection.query(sql,data, (err, rows) => {
            connection.release()
            if(!err) {
                res.send(`success`)
            } else {
                res.send(err.sqlMessage);
                console.log(err)
            }
        })
    })
})

app.post('/login', function(request, response) {
    let homeID = request.body.params.homeID;
    let code = request.body.params.code;
    if (homeID && code) {
        pool.query('SELECT * FROM users WHERE homeID = ? AND code = ?', [homeID, code], function(error, results, fields) {
            if (results.length > 0) {
                response.send("success")
            } else {
                response.send('Incorrect HomeID and/or Code!');
            }
            response.end();
        });
    } else {
        response.send('Please enter HomeID and Code!');
        response.end();
    }
});


app.post('/getName', function(request, response) {
    let homeID = request.body.params.homeID;
    if (homeID) {
        pool.query('SELECT * FROM users WHERE homeID = ?', [homeID], function(error, results, fields) {
            if (results.length > 0) {
                console.log(results);
                response.send(results)
            } else {
                response.send('Incorrect HomeID and/or Code!');
            }
            response.end();
        });
    } else {
        response.send('Please enter HomeID and Code!');
        response.end();
    }
});


app.post('/device', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        const params = req.body
        console.log(req.body.params.homeID, req.body.params.code, req.body.params.name)
        let sql = 'INSERT INTO `devices` (`deviceID`, `homeID`, `category`, `name`, `state`, `value`) VALUES (?, ?, ?, ?, ?, ?)';
        let data = [req.body.params.deviceId, req.body.params.homeID, req.body.params.category, req.body.params.name, req.body.params.state,req.body.params.value ];
        connection.query(sql,data, (err, rows) => {
            connection.release()
            if(!err) {
                res.send(`success`)
            } else {
                res.send(err.sqlMessage);
                console.log(err)
            }
        })
    })
})


app.post('/getDevice', function(request, response) {
    let homeID = request.body.params.homeID;
    let category = request.body.params.category;
    if (homeID && category) {
        pool.query('SELECT * FROM devices WHERE homeID = ? AND category = ?', [homeID, category], function(error, results, fields) {
            if (results.length > 0) {
                response.send(results)

            } else {
                response.send('empty');
            }
            response.end();
        });
    } else {
        response.send('Please enter HomeID and Code!');
        response.end();
    }
});


app.put('/update', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        let deviceID = req.body.params.deviceID
        let state = req.body.params.state
        connection.query('UPDATE devices SET state = ? WHERE deviceID = ?', [state, deviceID] , (err, rows) => {
            connection.release() // return the connection to pool
            if(!err) {
                res.send("Success")
            } else {
                console.log(err)
            }
        })
        console.log(req.body)
    })
})

app.put('/setValue', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        let deviceID = req.body.params.deviceID
        let value = req.body.params.value
        connection.query('UPDATE devices SET value = ? WHERE deviceID = ?', [value, deviceID] , (err, rows) => {
            connection.release() // return the connection to pool
            if(!err) {
                res.send("Success")
            } else {
                console.log(err)
            }
        })
        console.log(req.body)
    })
})



app.listen(port, () => console.log(`Listen on port ${port}`))
