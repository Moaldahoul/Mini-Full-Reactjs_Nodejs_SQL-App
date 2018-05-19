const express = require('express');
const fs = require('fs');
const cors = require('cors');
const mysql = require('mysql');

const config = JSON.parse(fs.readFileSync("config/config.json"));

const app = express();

const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM products';

const connection = mysql.createConnection({
            host    : config.host,
            user    : config.user,
            password: config.password,
            port    : config.port,
            database: config.database
});

connection.connect(err =>{
    if(err){
        return err;
    }
});


app.use(cors());

app.get('/', (req, res)=>{
    res.send('go to /products to see the items'); 
});

app.get('/products/add', (req, res)=>{
    const { name, price } = req.query;
    const INSERT_PRODUCTS_QUERY = `INSERT INTO products (name, price) VALUES('${name}', ${price})`;
    connection.query(INSERT_PRODUCTS_QUERY, (err, results)=>{
        if(err){
            return res.send(err)
        }else{
            return res.send('successfully added product');
        }
    })    
})

app.get('/products',(req, res)=>{
    connection.query(SELECT_ALL_PRODUCTS_QUERY, (err, results)=>{
        if(err){
            return res.send(err);
        }else{
            return res.json({
                data: results
            })
        }
    })
});

app.listen(4000, ()=>{
    console.log(`Server listening on Port 4000`);    
});