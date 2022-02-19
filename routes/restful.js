const express = require("express");
const bodyParser = require('body-parser');
const axios = require('axios');
const CircularJSON = require('circular-json');
const request = require('request');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// request param X, response O
app.get("/park/list", (req, res) => {
  const urls = "http://52.78.242.19:3000/park/list";

  request(urls, {json: true}, (err, result, body) => {
     if (err) { return console.log(err); }
     console.log(body);
     var template = `
     <!doctype html>
     <html>
     <head>
       <title>Result</title>
       <meta charset="utf-8">
       <style type="text/css">
       .tg  {border-collapse:collapse;border-color:#bbb;border-spacing:0;}
      .tg td{background-color:#E0FFEB;border-color:#bbb;border-style:solid;border-width:1px;color:#594F4F;
        font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;}
      .tg th{background-color:#9DE0AD;border-color:#bbb;border-style:solid;border-width:1px;color:#493F3F;
        font-family:Arial, sans-serif;font-size:14px;font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
      .tg .tg-baqh{text-align:center;vertical-align:top}
      .tg .tg-c3ow{border-color:inherit;text-align:center;vertical-align:top}
      .tg .tg-0pky{border-color:inherit;text-align:left;vertical-align:top}
      .heading {
        border-left: 20px solid white;
        border-right: 20px solid white;
        border-top: 20px solid #333;
        border-bottom: 20px solid #333;
        color: #323232;
        font-size: 32px;
        font-weight: bold;
        text-align: center;
      }
      .background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 1000;

        /* 숨기기 */
        z-index: -1;
        opacity: 0;
      }

      .show {
        opacity: 1;
        z-index: 1000;
        transition: all 0.5s;
      }

      .window {
        position: relative;
        width: 100%;
        height: 100%;
      }

      .popup {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #ffffff;
        box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);

        /* 임시 지정 */
        width: 300px;
        height: 300px;

        /* 초기에 약간 아래에 배치 */
        transform: translate(-50%, -40%);
      }

      .show .popup {
        transform: translate(-50%, -50%);
        transition: all 0.5s;
      }
      </style>
     </head>
     <body>
     <div class="heading">
       강남구 주차장 전체목록
  </div>
     <center>
     <table class="tg">
      <thead>
       <tr>
         <th class="tg-name">주차장명</th>
         <th class="tg-type">주차장구분</th>
         <th class="tg-place">도로명</th>
         <th class="tg-dong">동</th>
         <th class="tg-num">주차대수</th>
         <th class="tg-disablednum">장애인 주차</th>
         <th class="tg-wpp">여성전용주차</th>
         <th class="tg-bpt">기본 주차 시간</th>
         <th class="tg-bpf">기본 요금</th>
         <th class="tg-mpf">한달 주차 요금</th>
       </tr>
      </thead>`
        console.log(body);
                  for(var i=0; i<body.length; i++){
                    template +=

                     `

                  <tr>
                    <th><button id="show" onclick="show(this.id)">${body[i]['name']}</button></th>
                      <div class="background">
                        <div class="window">
                          <div class="popup">
                          <p class="abc">운영요일 : ${body[i]['opday']}</p>
                          <p class="abc">평일시작 : ${body[i]['wds']}</p>
                          <p class="abc">평일마감 : ${body[i]['wde']}</p>
                          <p class="abc">주말시작 : ${body[i]['hds']}</p>
                          <p class="abc">주말마감 : ${body[i]['hde']}</p>
                          <script>
                          let jb = document.querySelectorAll( '.abc' );
                          jb[3].style.color = 'red';
                          jb[4].style.color = 'red';
                          </script>
                            <button id="close">팝업닫기</button>
                            </div>
                          </div>
                    </div>

                    <th>${body[i]['type']}</th>
                    <th>${body[i]['place']}</th>
                    <th>${body[i]['dong']}</th>
                    <th>${body[i]['num']}</th>
                    <th>${body[i]['disablednum']}</th>
                    <th>${body[i]['wpp']}</th>
                    <th>${body[i]['bpt']}</th>
                    <th>${body[i]['bpf']}</th>
                    <th>${body[i]['mpf']}</th>
                  </tr>`
                }
                 template +=`</table>
                 </center>
                 <script>

             function show() {
             document.querySelector(".background").className = "background show";
             }

             function close() {
             document.querySelector(".background").className = "background";
             }

             document.querySelector("#show").addEventListener("click", show);
             document.querySelector("#close").addEventListener("click", close);
             </script>
               </body>
               </html>
              `;
              res.end(template);
    // res.send(CircularJSON.stringify(body.parks))
   });
})

app.get("/park/find", (req, res) => {
  const urls = "http://52.79.187.69:3000/park/find";

  request(urls, {json: true}, (err, result, body) => {
     if (err) { return console.log(err); }
     console.log(body);
     var template = `
     <!doctype html>
     <html>
     <head>
       <title>Result</title>
       <meta charset="utf-8">
       <style type="text/css">
       .tg  {border-collapse:collapse;border-color:#bbb;border-spacing:0;}
      .tg td{background-color:#E0FFEB;border-color:#bbb;border-style:solid;border-width:1px;color:#594F4F;
        font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;}
      .tg th{background-color:#9DE0AD;border-color:#bbb;border-style:solid;border-width:1px;color:#493F3F;
        font-family:Arial, sans-serif;font-size:14px;font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
      .tg .tg-baqh{text-align:center;vertical-align:top}
      .tg .tg-c3ow{border-color:inherit;text-align:center;vertical-align:top}
      .tg .tg-0pky{border-color:inherit;text-align:left;vertical-align:top}
      .heading {
        border-left: 20px solid white;
        border-right: 20px solid white;
        border-top: 20px solid #333;
        border-bottom: 20px solid #333;
        color: #323232;
        font-size: 32px;
        font-weight: bold;
        text-align: center;
      }
      button {
  height: 2.5em;
  cursor: pointer;
}

#popup {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .7);
  z-index: 1;
}

#popup.hide {
  display: none;
}

#popup.has-filter {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

#popup .content {
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, .3);
}
      </style>
     </head>
     <body>
     <div class="heading">
       강남구
  </div>
     <center>
     <table class="tg">
      <thead>
       <tr>
         <th class="tg-name">주차장명</th>
         <th class="tg-type">주차장구분</th>
         <th class="tg-place">도로명</th>
         <th class="tg-dong">동</th>
         <th class="tg-num">주차대수</th>
         <th class="tg-disablednum">장애인 주차</th>
         <th class="tg-wpp">여성전용주차</th>
         <th class="tg-opday">운영요일</th>
         <th class="tg-wds">평일시작</th>
         <th class="tg-wde">평일마감</th>
         <th class="tg-hds">주말 시작</th>
         <th class="tg-hde">주말 마감</th>
         <th class="tg-bpt">기본 주차 시간</th>
         <th class="tg-bpf">기본 요금</th>
         <th class="tg-mpf">한달 주차 요금</th>
       </tr>
      </thead>`
                  for(var i=0; i<body.length; i++){
                    template += `
                  <tr>
                    <th>${body[i]['name']}</th>
                    <th>${body[i]['type']}</th>
                    <th>${body[i]['place']}</th>
                    <th>${body[i]['dong']}</th>
                    <th>${body[i]['num']}</th>
                    <th>${body[i]['disablednum']}</th>
                    <th>${body[i]['wpp']}</th>
                    <th>${body[i]['opday']}</th>
                    <th>${body[i]['wds']}</th>
                    <th>${body[i]['wde']}</th>
                    <th>${body[i]['hds']}</th>
                    <th>${body[i]['hde']}</th>
                    <th>${body[i]['bpt']}</th>
                    <th>${body[i]['bpf']}</th>
                    <th>${body[i]['mpf']}</th>
                  </tr>`
                }
                 template +=`</table>
                 </center>
               </body>
               </html>
              `;
              res.end(template);
    // res.send(CircularJSON.stringify(body.parks))
   });
})

app.get("/api/parks/park", (req, res) => {
  const urls = "http://52.78.242.19:3000/api/parks/park?park_id="+req.query.park_id;
  request(urls, { json: true }, (err, result, body) => {
    if (err) { return console.log("해당 정보를 찾을 수 없습니다."); }
    var template = `
              <!doctype html>
              <html>
              <head>
                <title>Result</title>
                <meta charset="utf-8">
              </head>
              <body>
              <center>
               <table border="1" margin: auto; text-align: center;>
                 <tr>
                   <th> 동 </th>
                   <th> 주소 </th>
                 </tr>`;
                 for(var i=0; i<body['parks'].length; i++){
                   template += `
                 <tr>
                   <th>${body['parks'][i]['dong']}</th>
                   <th>${body['parks'][i]['name']}</th>
                 </tr>`
               }
                template +=`</table>
                </center>
              </body>
              </html>
             `;
             res.end(template);
  //  res.send(CircularJSON.stringify(body.parks))
  });
})

/*app.post("/api/parks/parkBody", (req, res) => {
  const urls = "http://52.78.242.19:3000/api/parks/parkBody";
  request(urls, {json: true}, (err, result, body) => {
     if (err) { return console.log(err); }
     var template = `
               <!doctype html>
               <html>
               <head>
                 <title>Result</title>
                 <meta charset="utf-8">
               </head>
               <body>
               <center>
                <table border="1" margin: auto; text-align: center;>
                  <tr>
                    <th> 동 </th>
                    <th> 주소 </th>
                  </tr>`;
                  for(var i=0; i<body['parks'].length; i++){
                    template += `
                  <tr>
                    <th>${body['parks'][i]['dong']}</th>
                    <th>${body['parks'][i]['name']}</th>
                  </tr>`
                }
                 template +=`</table>
                 </center>
               </body>
               </html>
              `;
              res.end(template);
    // res.send(CircularJSON.stringify(body.parks))
   });
})*/

app.post("/api/parks/parkBody", (req, res) => {
  const urls = "http://52.79.187.69:3000/api/parks/parkBody";
  request(urls, { json: true }, (err, result, body) => {
    if (err) { return console.log("해당 정보를 찾을 수 없습니다."); }
    var template = `
              <!doctype html>
              <html>
              <head>
                <title>Result</title>
                <meta charset="utf-8">
              </head>
              <body>
              <center>
               <table border="1" margin: auto; text-align: center;>
                 <tr>
                   <th> 동 </th>
                   <th> 주소 </th>
                 </tr>`;
                 for(var i=0; i<body['parks'].length; i++){
                   template += `
                 <tr>
                   <th>${body['parks'][i]['dong']}</th>
                   <th>${body['parks'][i]['name']}</th>
                 </tr>`
               }
                template +=`</table>
                </center>
              </body>
              </html>
             `;
             res.end(template);
  //  res.send(CircularJSON.stringify(body.parks))
  });
})

module.exports = app;
