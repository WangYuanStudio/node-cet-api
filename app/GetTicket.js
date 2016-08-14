const decoder = require('ling-cet-decoder');
const rp = require('request-promise');
const rnd = function (start, end) {
  return Math.floor(Math.random() * (end - start) + start);
}
/**
 * 获取准考证函数
 * @author J3n5en
 * @param {Number} cetType 1/2 Ps:1=>四级 2=> 六级
 * @param {type} school  学校名称 ex: '韶关学院'
 * @param {type} name    考生名称 ex:'吴霸粑'
 * @return {promise} 返回一个包含准考证(或空)字符串的Promise对象
 */
GetTicket = function (cetType, school, name) {
// 生成随机IP 
  let ip = rnd(0, 255) + "." + rnd(0, 255) + "." + rnd(0, 255) + "." + rnd(0, 255);
  let options = {
    method: 'POST',
    uri: 'http://find.cet.99sushe.com/search',
    body: decoder.getEncryptReqBody(cetType, school, name),
    headers: {
      'Referer': 'http://find.cet.99sushe.com',
      'X-Forwarded-For': ip,
      'User-Agent': 'J3n5en'
    },
    encoding: null,
  };
  return rp(options).then(body => decoder.decryptResBody(body))
}

module.exports = GetTicket;