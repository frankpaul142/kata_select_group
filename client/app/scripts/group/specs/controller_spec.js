'use strict';

describe('Controller: select group', function () {

  beforeEach(module('Group'));

  var controller;
  var scope;

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    controller = $controller('group', { $scope: scope });
  }));

  describe('On instance', function () {
    it('should set "controller_loaded" variable in scope', function () {
      expect(scope.controller_loaded).toContain('loaded');
    });
  });

  describe('Get min members', function () {
    it('should return an array with 2011', function () {
      var groups = [
        {
            id: '1009',
            group: 1
        }, {
            id: '2011',
            group: 1
        }, {
            id: '1017',
            group: 2
        }, {
            id: '2011',
            group: 2
        }
      ];
      var result=scope.getMembers(groups);
      expect(result).toEqual(['2011']);
    });
    it('should return an array with 1009, 2002', function () {
      var groups = [
        {
            id: '1009',
            group: 1
        }, {
            id: '2000',
            group: 1
        }, {
            id: '1009',
            group: 2
        }, {
            id: '2001',
            group: 2
        }, {
            id: '1002',
            group: 3
        }, {
            id: '2002',
            group: 3
        }, {
            id: '1003',
            group: 4
        }, {
            id: '2002',
            group: 4
        }
      ];
      var result=scope.getMembers(groups);
      expect(result).toEqual(['1009','2002']);
    });
  });

  describe('when going to /group', function () {

    var route, location, rootScope, httpBackend;

    beforeEach(inject(function ($route, $location, $rootScope, $httpBackend) {
      route = $route;
      location = $location;
      rootScope = $rootScope;
      httpBackend = $httpBackend;

      httpBackend.when('GET', 'scripts/group/views/group.html').respond('<div></div>');
    }));

    afterEach(function () {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('should use minesweeper.html and controller', function () {
      expect(route.current).toBeUndefined();

      location.path('/group');

      httpBackend.flush();

      expect(route.current.templateUrl).toBe('scripts/group/views/group.html');
      expect(route.current.controller).toBe('group');
    });
  });

});
