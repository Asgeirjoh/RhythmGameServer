const express = require('express')
const app = express()
const mongoClient = require('mongodb').MongoClient
const session = require('express-session')

const url = "mongodb://localhost:27017"

app.use(express.json())

app.use(session({
	secret: 'secret boya',
	resave: true,
	saveUninitialized: true
}))
/*
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
*/

mongoClient.connect(url, (err, db) => {

    if (err) {
        console.log("Error while connecting mongo client")
    } else {

        const myDb = db.db('myDb')
        const collection = myDb.collection('myTable')
<<<<<<< HEAD
        var sess

=======
        
        // Signup post-request
        // Saves name,email and password in database
>>>>>>> ee4c6d6875c1953c803645753d56f5e969dbd117
        app.post('/signup', (req, res) => {

            const newUser = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            const query = { email: newUser.email }

            collection.findOne(query, (err, result) => {

                if (result == null) {
                    collection.insertOne(newUser, (err, result) => {
                        res.status(200).send()
                    })
                } else {
                    res.status(400).send()
                }

            })

        })

        // Login post-request
        // Checks if name and password is in database(login)
        app.post('/login', (req, res) => {

            const query = {
                name: req.body.name, 
                password: req.body.password
            }

            collection.findOne(query, (err, result) => {

                if (result != null) {
                    sess = req.session
                    sess.username = result.name
                    sess.loggedin = true
                    
                    const objToSend = {
                        name: result.name,
                        email: result.email
                    }

                    res.status(200).send(JSON.stringify(objToSend))

                } else {
                    res.status(404).send()
                }

            })

        })

        app.get('/logout', (req, res) => {
            sess.username = null
            sess.loggedin = false
            res.status(200).send()
            console.log("logged out")
        })

        app.get('/usercheck', (req, res) => {
            if (typeof sess !== 'undefined') {
                if (sess.loggedin) {
                    res.status(200).send()
                    console.log("user logged in")
                }
                else {
                    console.log("user logged out")
                }
            }
            else {
                console.log("user logged out")
            }
        })
    }

})

app.listen(3000, () => {
    console.log("Listening on port 3000...")
})
