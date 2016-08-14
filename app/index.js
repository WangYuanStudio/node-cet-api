var express = require('express');
var GetScore = require('./GetScore');
var GetTicket = require('./GetTicket');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/**
 * 通过准考证获取成绩
 * @param {String} ticket 准考证号
 * @param {String} name   考生名称
 * @return {json} 包含考生信息
 * @return {String} name 考生姓名
 * @return {String} college 所在学校
 * @return {String} type 四/六级
 * @return {String} time 考试时间
 * @return {String} score 考试成绩 
 * @return {String} score.all 总分
 * @return {String} score.listen 听力
 * @return {String} score.read 阅读
 * @return {String} score.write 写作
 * @return {String} status 'succ'/'fail' 成功/失败
 */
app.post('/getScore',function (req,res) {
  var name=req.body.name;
  var ticket=req.body.ticket;
  GetScore(ticket, name).then(data=>{
    if(data){
      data.status = 'succ'
      res.jsonp(data)
    } else {
      res.jsonp({'status': 'fail'})
    }
  })
});
/**
 * 获取准考证
 * @param {String} name 考生姓名
 * @param {String} college 所在学校
 * @param {String} type 四/六级
 * @return {String} ticket 准考证
 * @return {String} status 'succ'/'fail' 成功/失败
 */
app.post('/getTicket',function (req,res) {
  var cetType = req.body.type;
  var school=req.body.college;
  var name=req.body.name;
  GetTicket(cetType, school, name)
    .then(data=>{
      if(data){
        res.json({
          status: 'succ',
          ticket: data
        })
      } else {
        res.json({'status': 'fail'})
      }
    })
});
app.all('*',(req,res)=>{
  res.send('Hello!We Are Wyer!!')
})
// var server = 
app.listen(308);