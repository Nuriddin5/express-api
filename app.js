const express = require('express')
const app = express()
const port = 3000
// JSON body o‘qish uchun middleware
app.use(express.json());


const users = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret'
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette'
  }
];


app.get('/', (req, res) => {
  res.send('First Express.js API in Qadam AYTI')
})

app.get('/users', (req, res) => {
    res.json(users)
})

//todo add post endpoint for adding user
app.post('/users', (req, res) =>{
    //user qo'shish
    console.log(req.body)
    // const {name, username} = req.body
    // console.log("ism: ", name)
    // console.log("nik", username);
    const ism = req.body.name
    const nik = req.body.username

    console.log("ism: ", ism)
    console.log("nik", nik);

    //todo username bo'lsa qo'shmaslik
    let isUsernameExists = users.some(u => u.username === nik)
    if (isUsernameExists === true){
        return res.status(400).json({message : 'Bu username bor, boshqa tanla'})
    }
    let yangiId = users.push({id: users.length + 1,name: ism, username: nik})
    res.status(200).json({message: `${yangiId} lik user qo'shildi`})
})

// Single user by id
app.get('/users/:id', (req, res) => {
    console.log("req params",req.params)

  const son = parseInt(req.params.id)   // URL’dan id ni olish
  const user = users.find(u => u.id === son)
    console.log(user);
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.json(user)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})