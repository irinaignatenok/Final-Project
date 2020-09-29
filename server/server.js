/*

Routes:

/ --> res = this is working

/signin --> POST  success/fail

/register --> POST = user

/profile/:userId --> GET = user


*/

const express = require('express');

const bodyParser = require('body-parser');

const bcrypt = require('bcrypt-nodejs');

const cors = require('cors');

const knex = require('knex');


const app = express();


app.use(bodyParser.json());

app.use(cors());


//CONNECT TO LOCAL POSTGRESQL DATABASE
const db =knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port: '5432',
    user : 'postgres',
    password : 'V8VcgPjA',
    database : 'FinalProject'
  }
});

  //Test DB Connection
  //console.log(db.select('*').from('users'));

  //Get Users data from Database
  db.select('*').from('users').then(data => {
    console.log('Users:', data);
  });


//Root Route
app.get('/', (req, res) => {

     res.send('this is working');

    //response with the users database
    //res.send(db.users);
})



//Check the input from the frontend sign in from with the user data from the database
app.post('/signin', (req, res) => {


    db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      // console.log(isValid);
      if(isValid){
       return db.select('*').from('users')
        .where('email', '=', req.body.email)
        .then(user => {
          res.json(user[0])
        })
         .catch(err => res.status(400).json('unable to get user'))
      } else {
        res.status(400).json("wrong credentials")
      }
    })
     .catch(err => res.status(400).json('wrong credentials'))



})
//Check input from the frontend register form with the data in the database, insert the data in the database
app.post('/register', (req, res) => {

    //Destructure the request from the body
    const { email, name, password } = req.body;

    //Security in server
    if(!email || !name || !password){
      return res.status(400).json('incorrect form submission');
    }

    //Bcrypt Hash
    const hash = bcrypt.hashSync(password);

    db.transaction(trx => {
        trx.insert({
          hash: hash,
          email: email
    
        })
         .into('login')
         .returning('email')
         .then(loginEmail => {
           return  trx('users')
           .returning('*')
           .insert({
             email: loginEmail[0],
             name: name,
             joined: new Date()
           })
            .then(user => {
              res.json(user[0]);
            })
         })
         .then(trx.commit)
         .catch(trx.rollback)
      })
    
    
       .catch(err => res.status(400).json('unable to register'));
})


//Profile params Route
app.get('/profile/:id', (req, res)=> {

    const { id } = req.params;

    db.select('*').from('users').where({id})
  .then(user => {
    if(user.length){
      res.json(user[0]);
    } else{
      res.status(400).json('Not found')
    }
  })
   .catch(err => res.status(400).json('Error getting user'))
})
//TEST ON BROWSER: http://localhost:3001/profile/1

app.post('/buyhouse', (req, res)=> {
  console.log(req.body)
  db('favorites')
  .insert({
    users_id: req.body.user.id,
    house_id: req.body.favorite.house_id,
    price: req.body.favorite.price,
    details: req.body.favorite.details,
    address: req.body.favorite.address,
    image: req.body.favorite.image,
    contactagent: req.body.favorite.ContactAgent
  })
  .then(data => {
    res.send({message: 'house has been added'})
  })
  .catch(err => {
    console.log(err)
    res.send({message:'err'})
  })
})

app.post('/savehouse', (req, res)=> {
  console.log('This is req.body', req.body.user.id)
  console.log('This is my id');
  db('favorites').where('users_id', '=', req.body.user.id)
  .returning('*')
  .then(data =>{
    console.log(data)
    res.send(data)
    
  })
  .catch(err => {
    console.log('This is an error', err)
  })
})

app.post('/deletehouse', (req, res)=> {
  console.log('This is req.body', req.body.e.id)
  console.log('This is my id');
  db('favorites').where('id', '=', req.body.e.id)
  .del({
    users_id:req.body.e.users_id,
  house_id: req.body.e.house_id,
  price: req.body.e.price,
  details: req.body.e.details,
  address: req.body.e.address,
  image: req.body.e.image,
  contactagent: req.body.e.ContactAgent
  })
  .returning('*')
  .then(data =>{
    console.log(data)
    res.send(data)
    
  })
  .catch(err => {
    console.log('This is an error', err)
  })
})



app.listen(9000, ()=> {
    console.log('app is running on port 9000')
})