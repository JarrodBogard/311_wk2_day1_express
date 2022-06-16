const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
console.log({port})

const users = require('./state')

app.use(bodyParser.json())
// app.use(express.json()

app.get("/users", (req, res) => {
  res.json(users)
  
})

app.get("/users/:id/", (req, res) => {
  const user = users.find(user => user._id === Number(req.params.id))
  res.json(user)
})

// hard-coded add a user example ////////////////////////////////////////////////////
// let newUser = {
  //   "_id": users.length + 1,
  //   "name": "Jane Smith",
  //   "occupation": "UFO Agent",
  //   "avatar": "https://pbs.twimg.com/profile_images/718881904834056192/WnMTb__R.jpg"
  // }
  /////////////////////////////////////////////////////////////////////////
  
app.post("/users/", (req, res) => {
  const newUser = {
    "_id": users.length + 1,
    ...req.body
  }
  users.push(newUser)
  res.json(users)

  // users.push(newUser) //hard-coded add a user example //
})

app.put("/users/:id", (req, res) => {
  const id = req.params.id
  const user = users.find(user => user._id === Number(id))
  const foundUser = users.findIndex(user => user._id === Number(id))

  const newUser = {
    ...user,
    ...req.body
  }

  users.splice(foundUser, 1, newUser)
  res.json(newUser)
})

app.delete("/users/:id/", (req, res) => {
  const id = req.params.id
  const user = users.find(user => user._id === Number(id))
  const foundUser = users.findIndex(user => user._id === Number(id))

  const delUser = {
    // ...user,
    "_id": user._id,
    "isActive": false
  }
  
  users.splice(foundUser, 1, delUser)
  console.log({ users })
  res.json({message: `Deleted user with id: ${id}`})
})

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))