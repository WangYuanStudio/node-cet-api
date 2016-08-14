const rp = require('request-promise');
var cheerio = require('cheerio');
const rnd = function (start, end) {
  return Math.floor(Math.random() * (end - start) + start);
}
/**
 * 通过准考证获取成绩
 * @param {String} ticket 准考证号
 * @param {String} name   考生名称
 * @return {Promise} 返回一个包含考生信息的返回值
 */
GetScore = function (ticket, name) {
  let ip = rnd(0, 255) + "." + rnd(0, 255) + "." + rnd(0, 255) + "." + rnd(0, 255);
  let options = {
    method: 'POST',
    uri: 'http://www.chsi.com.cn/cet/query',
    qs: {
      zkzh: ticket,
      xm: name
    },
    transform: function (body) {
      if (body) {
        return cheerio.load(body);
      } else {
        return false;
      }
    },
    headers: {
      'Referer': 'http://www.chsi.com.cn/cet/',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
      "X-Forwarded-For": ip
    }
  };
  return rp(options)
    .then(function ($) {
      var info = [];
      var score = [];
      var $cet_info = $(".cetTable td")
      if (!$cet_info.text()) {
        return false;
      }
      $cet_info.each(function (i, e) {
        var text = $(this).text();
        if (i == 5) {
          var grade_str = text;
          score = grade_str.match(/[\d]+/gi);
        } else {
          info[i] = text;
        }
      });
      var data = {
        'name': info[0],
        'college': info[1],
        'type': info[2],
        'id': info[3],
        'time': info[4],
        'score': {
          'all': score[0],
          'listen': score[1],
          'read': score[2],
          'write': score[3]
        }
      };
      return data
    })
}

module.exports = GetScore;