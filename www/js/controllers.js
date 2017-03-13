angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Servicios', id: 1 },
    { title: 'Galerias', id: 2 },
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('GaleriasCtrl', function($scope, API) {
  API.get('galerias/').then(function(response) {
    $scope.galerias = response.data.data;
    console.log($scope.galerias[0].type)
  });
})

.controller('ServicioCtrl', function($scope, $stateParams, API) {
  API.get('servicios/detail/' + $stateParams.servicioId + '/').then(function(response) {
    $scope.servicio = response.data.data;
    console.log($stateParams.servicioId)
  });
})

.controller('ServiciosCtrl', function($scope, API) {
  API.get('servicios/').then(function(response) {
    $scope.servicios = response.data.data;
    console.log($scope.servicios[0].type)
  });
});