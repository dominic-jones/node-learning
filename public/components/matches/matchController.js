'use strict';

var app = angular.module('sc2-stats', []);

app.controller('MatchController', ['$scope', '$http', function ($scope, $http) {

    $http.get('/api/matches')
        .success(function (data) {
            $scope.raceData = data.raceData;
        })
        .error(function (data) {
        });
}]);
