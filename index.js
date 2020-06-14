const app = require('./app');
const express = require('express');
app.use(express.static(__dirname + '/public'));
app.listen(3000);