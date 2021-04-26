const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const app = express();
app.use(express.json());
const port = 9000;

mongoose.connect('mongodb://localhost:27017/stockmarket', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })

const Schema = new mongoose.Schema({
    name: {
        type: String
    },
    symbol: {
        type: String
    },
    market_cap: {
        type: String
    },
    current_price: {
        type: String
    }
}, { versionKey: false });

const stockModel = mongoose.model('stockModel', Schema);

app.post('/savedElements', async (req, res) => {
    try {
        const addstock = new stockModel({
            name: req.body.name,
            symbol: req.body.symbol,
            market_cap: req.body.market_cap,
            current_price: req.body.current_price
        });
        const savedstock = await addstock.save();
        console.log(savedstock);
        res.json({ result: 'Success' })
    } catch (err) {
        console.log(err);
    }
})

app.get('/getstockdata', (req, res) => {
    stockModel.find().then((response) => {
        res.json(response)
    })
})

app.delete('/deletestock', (req, res) => {
    stockModel.deleteOne({ _id: req.body._id }).then((response) => {
        console.log(response);
        res.json(response)
    })
})


app.listen(port, () => {
    console.log("server is runnig on", port);
})