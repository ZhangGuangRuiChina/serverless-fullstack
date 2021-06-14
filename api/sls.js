'use strict';

const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '.env'),
});

const express = require('express');
const cors = require('cors');
const UserController = require('./controller/user');
const cheerio = require("cheerio");
const request = require('request');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send(
    JSON.stringify({
      code: 0,
      message: `Server time: ${new Date().toString()}`,
    }),
  );
});

app.get('/serverless/getData', (req, res) => {
  const {keyword, page} = req.query;
  const url = `http://search.jd.com/Search?keyword=${encodeURIComponent(keyword)}&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&offset=5&page=${page}&s=1&click=0`;
  const options = {
    url: url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.80 Safari/537.36'
    }
  };
  let itemList = [];
  request(options, (err, response, body) => {
    const $ = cheerio.load(body);
    $('#J_goodsList ul li').each((i, ele) => {
      var tmp = {};
      tmp.id = $(ele).attr('data-sku');
      if (tmp.id) {
        tmp.url = $(ele).find('.p-img a img').attr('data-lazy-img');
        tmp.title = $(ele).find('.p-name em').html();
        tmp.price = $(ele).find('.p-price i').text();
        tmp.shopName = $(ele).find('.p-shop a').text();
        itemList.push(tmp);
      }
    });
    res.end(JSON.stringify(itemList));
  });
})

// app.get('/flush', async (req, res) => {
//   const data = await UserController.deleteEmptyName();
//   res.send(
//     JSON.stringify({
//       code: 0,
//       data,
//       message: 'Flush database Success',
//     }),
//   );
// });

// get user list
// app.get('/user', async (req, res) => {
//   const data = await UserController.getUserList();
//   res.send(
//     JSON.stringify({
//       code: 0,
//       data,
//     }),
//   );
// });

// add new user
// app.post('/user', async (req, res) => {
//   let result = '';
//   try {
//     const user = req.body;
//     const data = await UserController.createUser(user);
//     result = {
//       code: 0,
//       data,
//       message: 'Insert Success',
//     };
//   } catch (e) {
//     result = {
//       code: e.code,
//       message: `Insert Fail: ${e.message}`,
//     };
//   }

//   res.send(JSON.stringify(result));
// });

// delete user
// app.delete('/user/:id', async (req, res) => {
//   let result = '';
//   try {
//     const { id } = req.params;
//     const data = await UserController.deleteUserId(id);
//     result = {
//       code: 0,
//       data,
//       message: 'Delete Success',
//     };
//   } catch (e) {
//     result = {
//       code: 1002,
//       data: e,
//       message: 'Delete Fail',
//     };
//   }

//   res.send(JSON.stringify(result));
// });

if (process.env.SERVERLESS) {
  module.exports = app;
} else {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server start on http://localhost:${PORT}`);
  });
}
