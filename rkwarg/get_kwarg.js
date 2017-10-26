var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var moment = require('moment');

mongoose.Promise = require('bluebird');

var _db = (function () {
    var db = mongoose.connection;
    db.on('error', function(e) {
        console.error(e);
    });

    db.once('open', function() {
        console.log('connected to mongod server.');
    });

    var promise = mongoose.connect('mongodb://localhost/keywords', {
        useMongoClient: true
    });
})();

var models = (function() {

    var Schema = mongoose.Schema;

    var KeywordSchema = new Schema({
        'date': Date,
        'data': Array
    });

    var Keyword = mongoose.model('n_keyword', KeywordSchema);
    return {
        'keyword': Keyword
    };
})();

var _req = request('http://datalab.naver.com/', function (e, r, b) {
    var $ = cheerio.load(b);

    var kwargs = $('div.keyword_rank.select_date li.list > a.list_area').map(function(i, _elem) {
        var elem = $(this);
        var name = elem.find('span.title').text();
        var rank = elem.find('em.num').text();

        return {'name': name, 'rank': rank};
    }).get();

    var date_str = $('div.keyword_rank.select_date strong.rank_title').text();
    var di = date_str.match(/\d+/g);

    var result = {
        'date': moment(`${di[0]}-${di[1]}-${di[2]} ${di[3]}:${di[4]}:${di[5]}`).format(),
        'data': kwargs
    };
    console.log(result);

    var save_data = new models.keyword(result);

    var promise = save_data.save();
    promise.then(function(c) {
        mongoose.connection.close();
    });
    
});
