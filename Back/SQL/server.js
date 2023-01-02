// ?? Dependencias
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const myconn = require('express-myconnection');
const fs = require('fs');
const multer = require('multer');

app.use(cors());

// ?? Inicializar Server
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(express.json({limit: '16mb'}));
app.use(express.urlencoded({limit: '16mb'}));

const port = process.env.PORT || 3000;
var jsonParser = bodyParser.json();

app.listen(port, () => {
    console.log('Running on port:', port);
});

app.get('/', (req, res) => {
    res.send({
        data: '200: Running...'
    })
});

// ?? MySQL Auth
const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1610',
    database: 'scale_market'
}

app.use(myconn(mysql, dbOptions, 'single'));

// ?? CRUD ################################################
// ** Users
app.get('/users', (req, res) => { // !! All users
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query('SELECT * FROM users', (err, rows)=>{
            if(err) return res.send(err);
            res.json(rows)
        });
    });
});

app.get('/users/safe', (req, res) => { // !! All users safe
    req.getConnection((err,conn) => {
        if(err) return res.send(err); 

        conn.query('SELECT * FROM users', (err, rows)=>{
            if(err) return res.send(err);
            var safeRows = rows.map(function(obj) {
                delete obj.password;
                delete obj.faceID;
                delete obj.profileImg;
                delete obj.isAdmin;
                return obj;
            });
            res.json(safeRows);
        });
    });
});

app.get('/user/:id', (req, res) => { // !! One user
    req.getConnection((err,conn)=>{
        if(err) return res.send(err);

        conn.query(`SELECT * FROM users WHERE id = ${req.params.id}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.get('/user/safe/:id', (req, res) => { // !! One user safe
    req.getConnection((err,conn)=>{
        if(err) return res.send(err);

        conn.query(`SELECT * FROM users WHERE id = ${req.params.id}`, (err, rows) => {
            if(err) return res.send(err);
            var safeRows = rows.map(function(obj) {
                delete obj.password;
                delete obj.faceID;
                delete obj.profileImg;
                delete obj.isAdmin;
                return obj;
            });
            res.json(safeRows);
        });
    });
});

app.post('/user', jsonParser, (req, res) => { // !! Add user
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query('INSERT INTO users set ?', [req.body], (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.put('/add/user/information/:id', jsonParser, (req, res) => { // !! Add user sensitive info.
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query(`UPDATE users SET faceID = ${req.body.faceID}, status = ${req.body.status}, location = ${req.body.location} WHERE id = ${req.params.id}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.put('/update/user/location/:id', jsonParser, (req, res) => { // !! Update location
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query(`UPDATE users SET location = ${req.body.location} WHERE id = ${req.params.id}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.put('/update/user/status/:id', jsonParser, (req, res) => { // !! Update status
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query(`UPDATE users SET status = ${req.body.status} WHERE id = ${req.params.id}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.put('/update/user/description/:id', jsonParser, (req, res) => { // !! Update description
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query(`UPDATE users SET description = ${req.body.description} WHERE id = ${req.params.id}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.put('/update/user/transactions/:id', jsonParser, (req, res) => { // !! Update transactions
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query(`UPDATE users SET transactions = ${req.body.transactions} WHERE id = ${req.params.id}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.put('/update/user/strikes/:id', jsonParser, (req, res) => { // !! Update strikes
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query(`UPDATE users SET strikes = ${req.body.strikes} WHERE id = ${req.params.id}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

// ** Ban List
app.get('/users/banned', (req, res) => { // !! All users banned
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query('SELECT * FROM banlist', (err, rows)=>{
            if(err) return res.send(err);
            res.json(rows)
        });
    });
});

app.post('/user/banned', jsonParser, (req, res) => { // !! Add user
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query('INSERT INTO banlist set ?', [req.body], (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});


//** Community
app.get('/communities', (req, res) => { // !! All communities
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query('SELECT * FROM community', (err, rows)=>{
            if(err) return res.send(err);
            res.json(rows)
        });
    });
});

app.get('/community/:id', (req, res) => { // !! One community
    req.getConnection((err,conn)=>{
        if(err) return res.send(err);

        conn.query(`SELECT * FROM community WHERE id = ${req.params.id}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.post('/community', jsonParser, (req, res) => { // !! Add community
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query('INSERT INTO community set ?', [req.body], (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.put('/update/community/description/:id', jsonParser, (req, res) => { // !! Change community description
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query(`UPDATE community SET description = ${req.body.description} WHERE id = ${req.params.id}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

//** Members
app.get('/members', (req, res) => { // !! All members
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query('SELECT * FROM member', (err, rows)=>{
            if(err) return res.send(err);
            res.json(rows)
        });
    });
});

app.get('/user/member/:userID', (req, res) => { // !! User members
    req.getConnection((err,conn)=>{
        if(err) return res.send(err);

        conn.query(`SELECT * FROM member WHERE userID = ${req.params.userID}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.get('/community/members/:communityID', (req, res) => { // !! Members of community
    req.getConnection((err,conn)=>{
        if(err) return res.send(err);

        conn.query(`SELECT * FROM member WHERE communityID = ${req.params.communityID}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.post('/member', jsonParser, (req, res) => { // !! Add member
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query('INSERT INTO member set ?', [req.body], (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

//** Casting
app.get('/castings', (req, res) => { // !! All castings
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query('SELECT * FROM casting', (err, rows)=>{
            if(err) return res.send(err);
            res.json(rows)
        });
    });
});

app.get('/castings/verified', (req, res) => { // !! All castings for view
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query('SELECT * FROM casting WHERE verify = 1', (err, rows)=>{
            if(err) return res.send(err);
            res.json(rows)
        });
    });
});

app.get('/casting/:id', (req, res) => { // !! One casting
    req.getConnection((err,conn)=>{
        if(err) return res.send(err);

        conn.query(`SELECT * FROM casting WHERE id = ${req.params.id}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.post('/casting', jsonParser, (req, res) => { // !! Add casting
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query('INSERT INTO casting set ?', [req.body], (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.put('/update/casting/verify/correction/:id', jsonParser, (req, res) => { // !! Add update
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query(`UPDATE casting SET name = ${req.body.name}, brand = ${req.body.brand}, paint = ${req.body.paint}, wheels = ${req.body.wheels}, oddity = ${req.body.oddity}, material = ${req.body.material}, year = ${req.body.year}, madeIn = ${req.body.madeIn}, card = ${req.body.card}, type = ${req.body.type}, variant = ${req.body.variant}, color = ${req.body.color}, setBelong = ${req.body.setBelong}, tampo = ${req.body.tampo}, baseCode = ${req.body.baseCode}, verify = ${req.body.verify} WHERE id = ${req.params.id}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.put('/update/casting/verify/:id', jsonParser, (req, res) => { // !! Verify casting
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query(`UPDATE casting SET verify = ${req.body.verify} WHERE id = ${req.params.id}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.delete('/delete/casting/:id', (req, res) => { // !! Remove casting
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query(`DELETE FROM casting WHERE id = ${req.params.id}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

//** Pack
app.get('/packs', (req, res) => { // !! All packs
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query('SELECT * FROM pack', (err, rows)=>{
            if(err) return res.send(err);
            res.json(rows)
        });
    });
});

app.get('/packs/verified', (req, res) => { // !! All packs for view
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query('SELECT * FROM pack WHERE verify = 1', (err, rows)=>{
            if(err) return res.send(err);
            res.json(rows)
        });
    });
});

app.get('/pack/:id', (req, res) => { // !! One pack
    req.getConnection((err,conn)=>{
        if(err) return res.send(err);

        conn.query(`SELECT * FROM pack WHERE id = ${req.params.id}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.post('/pack', jsonParser, (req, res) => { // !! Add pack
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query('INSERT INTO pack set ?', [req.body], (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.put('/update/pack/verify/correction/:id', jsonParser, (req, res) => { // !! Update pack
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query(`UPDATE pack SET name = ${req.body.name}, year = ${req.body.year}, contents = ${req.body.contents}, pieces = ${req.body.pieces}, edition = ${req.body.edition}, verify = ${req.body.verify} WHERE id = ${req.params.id}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.put('/update/pack/verify/:id', jsonParser, (req, res) => { // !! Verify casting
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query(`UPDATE pack SET verify = ${req.body.verify} WHERE id = ${req.params.id}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.delete('/delete/pack/:id', (req, res) => { // !! Remove pack
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query(`DELETE FROM pack WHERE id = ${req.params.id}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

//** Warehouse
app.get('/warehouse', (req, res) => { // !! All warehouse not sold out
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query('SELECT * FROM warehouse WHERE soldOut = 0', (err, rows)=>{
            if(err) return res.send(err);
            res.json(rows)
        });
    });
});

app.get('/all/warehouse', (req, res) => { // !! All warehouse
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query('SELECT * FROM warehouse', (err, rows)=>{
            if(err) return res.send(err);
            res.json(rows)
        });
    });
});

app.get('/warehouse/shop', (req, res) => { // !! Warehouse to buy
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query('SELECT * FROM warehouse WHERE toStoreOrSell = 1', (err, rows)=>{
            if(err) return res.send(err);
            res.json(rows)
        });
    });
});

app.get('/warehouse/store', (req, res) => { // !! Warehouse to store
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query('SELECT * FROM warehouse WHERE toStoreOrSell = 0', (err, rows)=>{
            if(err) return res.send(err);
            res.json(rows)
        });
    });
});

app.get('/warehouse/trade', (req, res) => { // !! Warehouse to trade
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query('SELECT * FROM warehouse WHERE trade = 1', (err, rows)=>{
            if(err) return res.send(err);
            res.json(rows)
        });
    });
});

app.get('/warehouse/packs', (req, res) => { // !! Warehouse packs
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query('SELECT * FROM warehouse WHERE type = pack', (err, rows)=>{
            if(err) return res.send(err);
            res.json(rows)
        });
    });
});

app.get('/warehouse/castings', (req, res) => { // !! Warehouse castings
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query('SELECT * FROM warehouse WHERE type = castings', (err, rows)=>{
            if(err) return res.send(err);
            res.json(rows)
        });
    });
});

app.get('/warehouse/loose', (req, res) => { // !! Warehouse without blister
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query('SELECT * FROM warehouse WHERE blister = 0', (err, rows)=>{
            if(err) return res.send(err);
            res.json(rows)
        });
    });
});

app.get('/warehouse/user/:id', (req, res) => { // !! User warehouse
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query(`SELECT * FROM warehouse WHERE userID = ${req.params.id}`, (err, rows)=>{
            if(err) return res.send(err);
            res.json(rows)
        });
    });
});

app.get('/warehouse/item/:type/:id', (req, res) => { // !! Item warehouse
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query(`SELECT * FROM warehouse WHERE itemID = ${req.params.id} AND type = ${req.params.type}`, (err, rows)=>{
            if(err) return res.send(err);
            res.json(rows)
        });
    });
});

app.post('/warehouse/item', jsonParser, (req, res) => { // !! Add warehouse item
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query('INSERT INTO warehouse set ?', [req.body], (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.put('/update/warehouse/restock/:id', jsonParser, (req, res) => { // !! Warehouse restock item
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query(`UPDATE warehouse SET dateStock = ${req.body.dateStock}, quantity = ${req.body.quantity}, soldOut = 0 WHERE id = ${req.params.id}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.put('/update/warehouse/image/:id', jsonParser, (req, res) => { // !! Warehouse add image
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        console.log(req.params.id);
        conn.query("UPDATE warehouse SET refImg = CHAR(" + req.body.buffer + ") WHERE id = " + req.params.id, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.put('/update/warehouse/soldOut/:id', jsonParser, (req, res) => { // !! Warehouse sold out
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query(`UPDATE warehouse SET soldOut = 1, quantity = 0 WHERE id = ${req.params.id}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.put('/update/warehouse/stock/quantity/:id', jsonParser, (req, res) => { // !! Warehouse update quantity
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query(`UPDATE warehouse SET quantity = ${req.body.quantity} WHERE id = ${req.params.id}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.put('/update/warehouse/negotiable/:id', jsonParser, (req, res) => { // !! Warehouse negotiable band
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query(`UPDATE warehouse SET negotiable = ${req.body.negotiable} WHERE id = ${req.params.id}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.put('/update/warehouse/trade/:id', jsonParser, (req, res) => { // !! Warehouse trade band
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query(`UPDATE warehouse SET trade = ${req.body.trade} WHERE id = ${req.params.id}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.put('/update/warehouse/toStoreOrSell/:id', jsonParser, (req, res) => { // !! Warehouse to Store or sell band
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query(`UPDATE warehouse SET toStoreOrSell = ${req.body.toStoreOrSell} WHERE id = ${req.params.id}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

//** Tradewish
app.get('/all/tradewishes', (req, res) => { // !! All tradewishes
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query('SELECT * FROM tradewish', (err, rows)=>{
            if(err) return res.send(err);
            res.json(rows)
        });
    });
});

app.get('/tradewish/item/:tradeItemID', (req, res) => { // !! All tradewishes
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query(`SELECT * FROM tradewish WHERE tradeItemID = ${req.params.tradeItemID}`, (err, rows)=>{
            if(err) return res.send(err);
            res.json(rows)
        });
    });
});

app.post('/tradewish', jsonParser, (req, res) => { // !! Add tradewish
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query('INSERT INTO tradewish set ?', [req.body], (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

//** Prospects Tmp
app.get('/prospects/item/:itemID', (req, res) => { // !! Prospects by item
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query(`SELECT * FROM prospectstmp WHERE itemID = ${req.params.itemID}`, (err, rows)=>{
            if(err) return res.send(err);
            res.json(rows)
        });
    });
});

app.get('/prospects/user/:prospectID', (req, res) => { // !! Prospects by prospect user
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query(`SELECT * FROM prospectstmp WHERE prospectID = ${req.params.prospectID}`, (err, rows)=>{
            if(err) return res.send(err);
            res.json(rows)
        });
    });
});

app.get('/prospects/user/owner/:ownerID', (req, res) => { // !! Prospects by owner
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query(`SELECT * FROM prospectstmp WHERE ownerID = ${req.params.ownerID}`, (err, rows)=>{
            if(err) return res.send(err);
            res.json(rows)
        });
    });
});

app.post('/prospect', jsonParser, (req, res) => { // !! Add prospect
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query('INSERT INTO prospectstmp set ?', [req.body], (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.put('/update/prospect/turn/:prospectID', jsonParser, (req, res) => { // !! Update turn
    req.getConnection((err, conn) => {
        if(err) return res.send(err);

        conn.query(`UPDATE prospectstmp SET turn = ${req.body.turn} WHERE prospectID = ${req.params.id}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.delete('/delete/prospectstmp/turn/:prospectID', (req, res) => { // !! Remove turn
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query(`DELETE FROM prospectstmp WHERE prospectID = ${req.params.prospectID}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

app.delete('/delete/prospectstmp/item/:itemID', (req, res) => { // !! Remove item turns
    req.getConnection((err,conn) => {
        if(err) return res.send(err);

        conn.query(`DELETE FROM prospectstmp WHERE itemID = ${req.params.itemID}`, (err, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    });
});

