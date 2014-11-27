'use strict';

var mongoose = require('mongoose'),
  EventModel = mongoose.model('Event');

var sendBackData = function(res, err, data){
  if(err){
    res.send(500);
  } else {
    if(data){
      res.send(200, data);
    } else {
      res.send(404);
    }
  }
};

exports.getAllEvents = function(req, res){
  EventModel.find(function(err, data){
    sendBackData(res, err, data);
  });
};

exports.findSingle = function(req, res){
  EventModel.findById(req.params.id, function(err, data){
    sendBackData(res, err, data);
  });
};

exports.addEvent = function(req, res){
  if(!req.body.name){
    res.send(403);
  }

  if(req.body.eventType === 1 && !req.body.frequency){
    res.send(403);
  }

  var promise = EventModel.create(req.body, function(err, data){
    if(err){
      res.send(500);
    } else {
      res.send(200);
    }
  });
}

exports.updateEvent = function(req, res){
  EventModel.findById(req.params.id, function(err, data){
    data.name = req.body.name;
    data.descripiton = req.body.description;
    data.frequency = req.body.frequency;

    data.save(function(e, eventModel, numberAffected){
      if(err){
        res.send(500);
      } else {
        res.send(200, eventModel);
      }
    })
  });
}
