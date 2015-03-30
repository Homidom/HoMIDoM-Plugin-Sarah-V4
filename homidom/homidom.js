var moment = require('moment');
moment.locale('fr');

var action = exports.action = function(data, callback, config, SARAH){

  // CONFIG
  config = config.modules.homidom;
  if (!config.ip || !config.port || !config.idserveur){
    console.log("HoMIDoM : Config error");
    return;
  } 

  // SET
  if (data.type == "value"){
	get(data, callback, config, SARAH);
  } 
  else {
	set(data, callback, config, SARAH);
  }
}

// ==========================================
//  GET
// ==========================================

var get = function(data, callback, config, SARAH){ 

  // Build URL HoMIDoM WebAPI
  
  var url = 'http://'+config.ip;
  url += ':'+config.port;
  url += '/api/'+config.idserveur;
  url += '/'+data.type;
  url += '/'+data.device;
  url += '/'+data.id_device;
  url += '/'+data.command;
  
  console.log('url :'+url);
  
  // Send Request
  var request = require('request');
  request({ 'uri': url }, function (err, response, json){
    
    if (err || response.statusCode != 200) {
      callback({'tts': "L'action a échoué"});
	  console.log('err :'+err);
      return;
}
      ttsEnd = parseFloat(json).toString().replace("."," virgule ");
    
    var tts = data.ttsTmp + " " + ttsEnd + " " + data.ttsDeg;
  callback({'tts': tts });
  
  });

}

// ==========================================
//  SET
// ==========================================

var set = function(data, callback, config, SARAH){

  // Build URL HoMIDoM WebAPI
  
  var url = 'http://'+config.ip;
  url += ':'+config.port;
  url += '/api/'+config.idserveur;
  url += '/'+data.type;
  url += '/'+data.device;
  url += '/'+data.id_device;
  url += '/'+data.command;
  if (data.command == "DIM") {
  url += '?'+data.param;
  }
  console.log('url :'+url);
  
  // Send Request
  var request = require('request');
  request({ 'uri': url, }, function (err, response, json){
    
    if (err || response.statusCode != 200) {
      callback({'tts': "L'action a échoué"});
	  console.log('err :'+err);
      return;
    }
      
    // Callback with TTS
    var tts = data.ttsAction + " " + data.ttsDevice;
    callback({'tts': tts });
  });

}

