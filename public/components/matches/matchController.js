var app = angular.module('sc2-stats', []);

app.controller('MatchController', ['$scope', function ($scope) {
    $scope.matches = [
        'match1',
        'match2'
    ];
}]);
