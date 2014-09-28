'use strict';

angular.module('ratings').config(['$stateProvider', ratingsRoutes]);

function ratingsRoutes($stateProvider){
  $stateProvider
  .state('events', {
    url: '/EventRatings',
    templateUrl: 'modules/ratings/views/event.list.html',
    controller: 'EventListController'
  })
  .state('eventsDetail', {
    url: '/EventRatings/:eventId',
    templateUrl: 'modules/ratings/views/event.detail.html',
    controller: 'EventDetailController'
  });
}
