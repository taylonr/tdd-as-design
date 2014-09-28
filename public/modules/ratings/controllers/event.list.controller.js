'use strict';

var app = angular.module('ratings');

app.controller('EventListController',
  ['$scope', 'EventsService', controller]);

function controller($scope, eventService){
  $scope.loading = true;

  $scope.getAllEvents = function(){
    eventService.getAllEvents().then(function(events){
      $scope.events = events;
    }).finally(function(){
      $scope.loading = false;
    });
  };

  $scope.getAllEvents();
}
