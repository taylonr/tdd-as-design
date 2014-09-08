'use strict';

require('should');

var Model = require('../../models/event.js');

describe('Event Model', function(){
  it('should have a ratings array', function(){
    var event = new Model();
    event.ratings.should.not.equal(undefined);
  });

  describe('When saving events', function(){
    it('should calculate the average rating', function(){
      Model.prototype.save = function(callback){
        callback();
      };

      var event = new Model({
        ratings: [{
          rating: 1
        }, {
          rating: 2
        }]
      });

      event.save(function(){
        event.averageRating.should.equal(1.5);
      });
    });
  });
});
