app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/cv.html',
      name: 'About me',
      icon: 'person-running'
    })
    .when('/projects', {
      templateUrl: 'partials/projects.html',
      name: 'Projects',
      icon: 'claw-hammer'
    })
    .otherwise({
      redirectTo: '/'
    });
});

app.controller('NavCtrl', function($scope, $route, $location, $translate, PrinterService) {

  $scope.pages = [];
  angular.forEach($route.routes, function(route, path) {
    if(route.name != null) {
      $scope.pages.push(angular.extend({
        isActive: function() {
          return path == $location.path();
        },
        activate: function() {
          $location.path(path);
        }
      }, route))
    }
  });

  $scope.navZone = PrinterService.isPrinterView();
  $scope.hoverNavZone = false;
  $scope.togglePrinterVersion = function() {
    $scope.navZone = false;
    $scope.hoverNavZone = false;
    var state = !PrinterService.isPrinterView();
    PrinterService.setPrinterView(state);
  };
  $scope.enableNavZone = function() {
    $scope.navZone = true;
  };
  $scope.enterNavZone = function() {
    if($scope.navZone)
      $scope.hoverNavZone = true;
  };
  $scope.leaveNavZone = function() {
    if($scope.navZone)
      $scope.hoverNavZone = false;
  };

  $scope.languages = {
    en: 'English',
    zh: 'Chinese'
  };
  $scope.selectedLanguage = $translate.use();
  $scope.selectLanguage = function(langKey) {
    $scope.selectedLanguage = langKey;
    $translate.use($scope.selectedLanguage);
  }

});