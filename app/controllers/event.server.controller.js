'use strict';

var mongoose = require('mongoose'),
  EventModel = mongoose.model('Event');

exports.getAllEvents = function(req, res){
  EventModel.find(function(err, data){
    if(err){
      res.send(500);
    } else{
      res.send(200, data);
    }
  });
};
