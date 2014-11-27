'use strict';

var controller = require('../../controllers/event.server.controller.js'),
  mongoose = require('mongoose'),
  EventModel = mongoose.model('Event');

describe('Event Controller', function(){
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

      EventModel.create = function(){
        statusCode = 403;
      }
    });

  describe('When fetching all events', function(){
    beforeEach(function(){
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

  describe('When fetching single event', function(){
    beforeEach(function(){
      req = {
        params: {
          id: 1
        }
      };
    });

    it('should return 404 when not found', function(){
      EventModel.findById = function(id, callback){
        callback(undefined, undefined);
      };

      controller.findSingle(req, res);

      statusCode.should.equal(404);
    });

    it('should return 500 when find errors', function(){
      EventModel.findById = function(id, callback){
        callback({err:1}, undefined);
      };

      controller.findSingle(req, res);
      statusCode.should.equal(500);
    });

    it('should return data when successful', function(){
      EventModel.findById = function(id, callback){
        callback(undefined, {id: id, name: 'Test Event'});
      };

      controller.findSingle(req, res);
      sentData.id.should.equal(1);
    });
  });

  describe('When adding an event', function(){
    it('Should return 403 when name is not specified', function(){
      req = {
        body: {
          name: 'test event'
        }
      };

      controller.addEvent(req, res);
    });

    it('Should return 403 when event type 1 has no freq', function(){
      req = {
        body: {
          name: 'test event',
          eventType: 2
        }
      };

      controller.addEvent(req, res);
      statusCode.should.equal(403);
    });
  });

  describe('When updating an event', function(){
    it('Should return 500 if save fails', function(){
      EventModel.findById = function(callback){
        callback();
      };

      EventModel.save = function(callback){
        callback({e: 1}, undefined);
      }

      req = {
        params: {
          id: 1
        }
      };

      controller.updateEvent(req, res);

      statusCode.should.equal(500);
    });
  });
});
