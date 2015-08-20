'use strict';

var underscore = angular.module('underscore', []);
underscore.factory('_', ['$window', function ($window) {
    return $window._;
}]);

var app = angular.module('sc2-stats', ['ui.bootstrap.tabs', 'ui.bootstrap.tpls', 'angularCharts', 'underscore']);

function hourOfDay(match) {
    return new Date(match.date).getHours();
}

function toChartData(matches, hour) {
    var matchResult = _.countBy(matches, function (match) {
        return match.result;
    });
    return {
        x: hour,
        y: [matchResult.Win || 0, matchResult.Loss || 0]
    };
}

function buildChartData(matchesByRace) {
    var chartData = _.chain(matchesByRace)
        .groupBy(hourOfDay)
        .map(toChartData)
        .value();

    populateMissingHours(chartData);

    return _.sortBy(chartData, 'x');
}

function populateMissingHours(chartData) {
    return _.chain(_.range(24))
        .filter(function (hour) {
            return !(hour in chartData);
        })
        .forEach(function (hour) {
            chartData[hour] = {
                x: hour,
                y: [0, 0]
            }
        })
        .value();
}

function updateChart($scope, data) {
    $scope.chartData.data = buildChartData(data.matches);
}

app.controller('StatisticsController', ['$scope', '$http', '_', function ($scope, $http, _) {

    $http.get('/api/statistics')
        .success(function (data) {
            $scope.raceData = data.raceData;

            var matchesByRace = _.indexBy(data.raceData, 'race');

            $scope.chartData = {
                series: ['Wins', 'Losses'],
            };

            $scope.chartConfig = {
                tooltips: false,
                legend: {
                    display: true
                }
            };

            $scope.changeTab = function (race) {
                updateChart($scope, matchesByRace[race]);
            }
        })
        .error(function (data) {
            $scope.message = data;
        });
}]);
