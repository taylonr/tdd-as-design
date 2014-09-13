'use strict';

var controller = require('../../controllers/event.server.controller.js'),
  mongoose = require('mongoose'),
  EventModel = mongoose.model('Event');

describe('Event Controller', function(){
  describe('When fetching all events', function(){
    var req,
      res,
      statusCode,
      sentData;

    beforeEach(function(){
      res = {
        send: function(code, data){
          statusCode = code;
          sentData = data;
        }
      };

      EventModel.find = function(callback){
        callback(null, [{name: 'event1'}]);
      };
    });

    it('should return 200', function(){
      controller.getAllEvents(req, res);
      statusCode.should.equal(200);
    });

    it('should send back data', function(){
      controller.getAllEvents(req, res);
      sentData[0].name.should.equal('event1');
    });

    it('should return 500 when find errors', function(){
      EventModel.find = function(callback){
        callback({err: 1}, null);
      };

      controller.getAllEvents(req, res);
      statusCode.should.equal(500);
    });
  });
});
