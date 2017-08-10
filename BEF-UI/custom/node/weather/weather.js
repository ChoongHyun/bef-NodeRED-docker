var request = require('request');


module.exports = function(RED) {
    function Weather(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var temp = {};
        node.on('input', function(msg) {


            request({
                url: 'http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b1b15e88fa797225412429c1c50c122a1',
                method: 'GET',
            }, function (error, response, body){

                temp = JSON.parse(body);
                console.log(temp.wind.speed);
                msg.payload = temp.wind.speed;
                node.send(msg);

            });
        });
    }
    RED.nodes.registerType("weather",Weather);
}
