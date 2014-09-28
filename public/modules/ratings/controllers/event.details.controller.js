'use strict';

angular.module('ratings').controller('EventDetailsController',
  ['$scope', 'EventsService', controller]);

function controller($scope, EventsService){
  $scope.loading = true;

  $scope.getEvent = function(id){
    EventsService.getSingleEvent(id)
    .then(function(detail){
      $scope.eventDetails = detail;
    })
    .finally(function(){
      $scope.loading = false;
    });
  };
}
