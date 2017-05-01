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
  $scope.galerias = [];

  API.get('galerias/').then(function(response) {
    $scope.galerias = [];
    console.log(response.data.data)
    angular.forEach(response.data.data, function(value, key){
      $scope.galerias.push({src: value.attributes.imagen, sub: value.attributes.descripcion})
    });
  });
})

.controller('ServicioCtrl', function($scope, $stateParams, API) {

  API.get('empleados/').then(function(response) {
    $scope.empleados = response.data.data;
    console.log($scope.empleados)
  });
  API.get('locales/').then(function(response) {
    $scope.locales = response.data.data;
    console.log($scope.locales)
  });
  API.get('servicios/detail/' + $stateParams.servicioId + '/').then(function(response) {
    $scope.servicio = response.data.data;
    console.log($scope.servicio)
  });


      var resevaAttr = { data: {
                          servicio: JSON.stringify({id: 1, type: 'Servicios'}),
                          fecha: '2017-04-30T16:00',
                          local: JSON.stringify({id: 1, type: 'Locales'})
                         }
                        };

    $scope.crearReserva = function() {
      API.post('reservas/create/', resevaAttr).then(function(response) {
        console.log('ola');
      });
    };

})

.controller('ServiciosCtrl', function($scope, API) {
  $scope.reserva = {};
  API.get('servicios/categorias/').then(function(response) {
    $scope.serviciosCategorias = response.data.data;
    console.log($scope.serviciosCategorias[0])
  });
})

.controller('ProductoCtrl', function($scope, $stateParams, API) {
  API.get('productos/detail/' + $stateParams.productoId + '/').then(function(response) {
    $scope.producto = response.data.data;
    console.log($scope.producto)
  });
})

.controller('ProductosCtrl', function($scope, $stateParams, API) {
  API.get('productos/categorias/').then(function(response) {
    $scope.productosCategorias = response.data.data;
    console.log(response.data.data[0])
  });
});
