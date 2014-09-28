'use strict';

describe('Event List Controller', function(){
  var EventService,
    $q,
    $rootScope,
    serviceSpy,
    deferred,
    scope;

  beforeEach(module(ApplicationConfiguration.applicationModuleName));

  beforeEach(module(function($provide){
    EventService = {
      getAllEvents: function(){}
    };

    $provide.value('EventsService', EventService);
  }));

  beforeEach(inject(function(_$rootScope_, $controller, _$q_){
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();

    $q = _$q_;

    deferred = $q.defer();

    spyOn(EventService, 'getAllEvents').and.returnValue(deferred.promise);

    $controller('EventListController', {
      $scope: scope
    });
  }));

  describe('Fetching events', function(){
    function sendDataFromService(){
      deferred.resolve([{name: 'event test'}]);

      $rootScope.$digest();
    }

    it('Should populate events list from service', function(){

      scope.getAllEvents();

      sendDataFromService();

      expect(scope.events[0].name).toEqual('event test');
    });

    it('Should set loading to false when data comes back', function(){
      scope.getAllEvents();

      scope.loading = true;

      sendDataFromService();

      expect(scope.loading).toBeFalsy();
    });

    it('Should set loading to false when service fails', function(){
      scope.getAllEvents();
      scope.loading = true;

      deferred.reject();
      $rootScope.$digest();

      expect(scope.loading).toBeFalsy();
    });
  });

  describe('Controller Scope', function(){
    it('Should initialize loading to true', function(){
      expect(scope.loading).toBeTruthy();
    });
  });

  describe('When loading controller', function(){
    it('Should fetch events', function(){
      expect(EventService.getAllEvents).toHaveBeenCalled();
    });
  });
});
