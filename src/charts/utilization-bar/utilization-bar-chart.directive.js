/**
 * @ngdoc directive
 * @name patternfly.charts.directive:pfUtilizationBarChart
 *
 * @description
 *   Directive for rendering a utilization bar chart
 *   There are three possible fill colors for Used Percentage, dependent on whether or not there are thresholds:<br/>
 *   <ul>
 *   <li>When no thresholds exist, or if the used percentage has not surpassed any thresholds, the indicator is blue.
 *   <li>When the used percentage has surpassed the warning threshold, but not the error threshold, the indicator is orange.
 *   <li>When the used percentage has surpassed the error threshold, the indicator is is red.
 *   </ul>
 *
 * @param {object} chartData the data to be shown in the utilization bar chart<br/>
 * <ul style='list-style-type: none'>
 * <li>.used   - number representing the amount used
 * <li>.total  - number representing the total amount
 * </ul>
 *
 * @param {object=} description chart description
 * @param {string=} layout Various alternative layouts the utilization bar chart may have:<br/>
 * <ul style='list-style-type: none'>
 * <li>'regular' (default) displays the standard chart layout.
 * <li>'inline' displays a smaller, inline layout.</li>
 * </ul>
 * @param {string=} label-format The label at the end of the bar chart may be:<br/>
 * <ul style='list-style-type: none'>
 * <li>'actual' (default) displays the standard label of '(n) of (m) (units) Used'.
 * <li>'percent' displays a percentage label of '(n)% Used'.</li>
 * </ul>
 * @param {object=} units to be displayed on the chart
 * @param {object=} thresholds warning and error percentage thresholds used to determine the Usage Percentage fill color
 *
 * @example
 <example module="patternfly.example">
   <file name="index.html">
     <div ng-controller="ChartCtrl">
       <div pf-utilization-bar-chart chart-data=data1 description=title1 units=units1></div>
       <hr>
       <div pf-card head-title="Utilization Bar Chart">
         <div pf-utilization-bar-chart chart-data=data2 description=title2 units=units2 thresholds=thresholds></div>
         <div pf-utilization-bar-chart chart-data=data3 description=title3 units=units3 thresholds=thresholds></div>
         <div pf-utilization-bar-chart chart-data=data4 description=title4 units=units4 thresholds=thresholds></div>
         <div pf-utilization-bar-chart chart-data=data5 description=title5 units=units5 thresholds=thresholds></div>
       </div>

       <hr>
       <label><strong>layout='inline', label-format='percent'</strong></label>
       <div pf-card head-title="Utilization Bar Chart">
         <div pf-utilization-bar-chart chart-data=data2 description=title2 layout='inline' label-format='percent' units=units2 thresholds=thresholds></div>
         <div pf-utilization-bar-chart chart-data=data3 description=title3 layout='inline' label-format='percent' units=units3 thresholds=thresholds></div>
         <div pf-utilization-bar-chart chart-data=data4 description=title4 layout='inline' label-format='percent' units=units4 thresholds=thresholds></div>
         <div pf-utilization-bar-chart chart-data=data5 description=title5 layout='inline' label-format='percent' units=units5 thresholds=thresholds></div>
       </div>
     </div>
   </file>

   <file name="script.js">
   angular.module( 'patternfly.example', ['patternfly.charts', 'patternfly.card']);

   angular.module( 'patternfly.example' ).controller( 'ChartCtrl', function( $scope ) {

    $scope.thresholds = {'warning':'60','error':'85'};

    $scope.title1 = 'RAM Usage';
    $scope.units1 = 'MB';

    $scope.data1 = {
      'used': '8',
      'total': '24'
    };

    $scope.title2 = 'Memory';
    $scope.units2 = 'GB';

    $scope.data2 = {
      'used': '25',
      'total': '100'
    };

    $scope.title3 = 'CPU Usage';
    $scope.units3 = 'MHz';

    $scope.data3 = {
      'used': '420',
      'total': '500',
    };

    $scope.title4 = 'Disk Usage';
    $scope.units4 = 'TB';
    $scope.data4 = {
      'used': '350',
      'total': '500',
    };

    $scope.title5 = 'Disk I/O';
    $scope.units5 = 'I/Ops';
    $scope.data5 = {
      'used': '450',
      'total': '500',
    };
   });
   </file>
 </example>
*/

angular.module('patternfly.charts').directive('pfUtilizationBarChart',
  function ($timeout) {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        chartData: '=',
        description: '=',
        units: '=',
        thresholds: '=?',
        labelFormat: '@?',
        layout: '@?'
      },
      replace: true,
      templateUrl: 'charts/utilization-bar/utilization-bar-chart.html',
      link: function (scope) {

        scope.$watch('chartData', function (newVal, oldVal) {
          if (typeof(newVal) !== 'undefined') {
            //Calculate the percentage used
            scope.chartData.percentageUsed = Math.round(100 * (scope.chartData.used / scope.chartData.total));

            //Get the color class for the chart
            scope.isError = (scope.thresholds && scope.chartData.percentageUsed > scope.thresholds.error);
            scope.isWarn  = (scope.thresholds &&
                            (scope.chartData.percentageUsed > scope.thresholds.warning &&
                             scope.chartData.percentageUsed < scope.thresholds.error));
            scope.isOk    = (scope.thresholds &&
                            (scope.chartData.percentageUsed < scope.thresholds.warning));

            //Animate in the chart load.
            scope.animate = true;
            $timeout(function () {
              scope.animate = false;
            }, 0);
          }
        });


      }
    };
  }
);
