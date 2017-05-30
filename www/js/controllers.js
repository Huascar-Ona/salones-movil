angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, API, userService, $rootScope) {

  $rootScope.$broadcast('restorestate');

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // determina si mostramos o no el login en el menu
  $scope.showLogin = true;

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


})

.controller('LoginCtrl', function($scope, $auth, $location, $ionicPopup, API, userService, $rootScope, $ionicModal) {
  // Perform the login action when the user submits the login form

  $rootScope.$broadcast('restorestate');

  // determina si mostramos o no el login en el menu
  $scope.showLogin = true;

  // Form data for the login modal
  $scope.loginData = {};

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.doLogin = function() {

    API.post('api-token-auth/', '', {
      username: $scope.loginData.username,
      password: $scope.loginData.password
    }).then(function successCallback(response) {

      userService.model.token = response.data.token;
      userService.model.username = $scope.loginData.username;

      $ionicPopup.alert({
         title: "Bienvenido " + $scope.loginData.username + ".",
         template: ''
      }).then(function(res) {
        $location.path('/app/galerias');
      });

      $scope.showLogin = false;
      $rootScope.$broadcast('savestate');

    }, function errorCallback(response) {

      $ionicPopup.alert({
         title: 'No se pudo iniciar sesión con el usuario y contraseña proporcionados.',
         template: ''
      }).then(function(res) {
          $location.path('/app/galerias');
      });

    });

  };
})


.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Servicios', id: 1 },
    { title: 'Galerias', id: 2 },
    { title: 'Locales', id: 3 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('GaleriasCtrl', function($scope, API) {
  $scope.galerias = [];

  API.get('galerias/').then(function(response) {
    $scope.galerias = [];
    angular.forEach(response.data.data, function(value, key){
      $scope.galerias.push({src: value.attributes.imagen, sub: value.attributes.descripcion})
    });
  });
})

.controller('ServicioCtrl', function($scope, $stateParams, API, $ionicPopup, CurrencyService, $rootScope, $location) {

  $scope.reserva = {};

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


    function datetime(fecha, hora) {
      var fecha = new Date(fecha);
      var hora = new Date(hora);

      return new Date(fecha.getTime() + hora.getTime());
    };

    $scope.crearReserva = function(local, empleado) {


      var date2 = new Date($scope.reserva.fecha);
      var date3 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate()
      var date = new Date($scope.reserva.hora);
      var time = date.toTimeString().split(' ')[0].split(':');
      var dateTime = date3 + "T" + time[0]+':'+time[1];

      var resevaAttr = {
        servicio: JSON.stringify({id: $stateParams.servicioId, type: 'Servicios'}),
        fecha: dateTime,
        local: JSON.stringify({id: local, type: 'Local'}),
      };

      if(typeof empleado !== 'undefined') {
        resevaAttr['empleado'] = JSON.stringify({id: empleado, type: 'Empleado'});
      }

      $scope.validated = true;
      API.post('reservas/create/', '', resevaAttr, true).then(function successCallback(response) {
        $ionicPopup.confirm({
           title: "Reservacion creada exitosamente.",
        });
      }, function errorCallback(response) {
        $ionicPopup.confirm({
           title: response.data.errors[0].detail,
           buttons: [{
              text: 'Login',
              onTap: function(e) {
                $location.path('/login');
              }
            }]

        });
      });
    };

})

.controller('ServiciosCtrl', function($scope, API, CurrencyService) {
  $scope.reserva = {};
  $scope.currencySymbol = CurrencyService.currency_symbol;
  API.get('servicios/categorias/').then(function(response) {
    $scope.serviciosCategorias = response.data.data;
    console.log($scope.serviciosCategorias[0])
  });
})

.controller('ProductoCtrl', function($scope, $stateParams, API, CurrencyService) {
  $scope.currencySymbol = CurrencyService.currency_symbol;
  API.get('productos/detail/' + $stateParams.productoId + '/').then(function(response) {
    $scope.producto = response.data.data;
    console.log($scope.producto)
  });
})

.controller('ProductosCtrl', function($scope, $stateParams, API, CurrencyService) {
  $scope.currencySymbol = CurrencyService.currency_symbol;
  API.get('productos/categorias/').then(function(response) {
    $scope.productosCategorias = response.data.data;
    console.log(response.data.data[0])
  });
})

.controller('LocalCtrl', function($scope, $stateParams, API) {
  API.get('locales/detail/' + $stateParams.localId + '/').then(function(response) {
    $scope.local = response.data.data;
    console.log($scope.local)
  });
})

.controller('LocalesCtrl', function($scope, $stateParams, API) {
  $scope.locales = [];

  API.get('locales/').then(function(response) {
    $scope.locales = [];
    console.log(response.data.data);
    angular.forEach(response.data.data, function(value, key){
      $scope.locales.push({
        imagen: value.attributes.imagen,
        direccion: value.attributes.direccion,
        nombre: value.attributes.nombre,
        telefono: value.attributes.telefono
      })
    });
  });

})

.controller('ReservasCtrl', function($scope, $stateParams, API) {

  API.get('reservas/user/', '', true).then(function(response) {
    $scope.reservas = [];

    angular.forEach(response.data.data, function(value, key){
      $scope.reservas.push({
        fecha: value.attributes.fecha,
        direccion_local: value.attributes.local.direccion,
        nombre_local: value.attributes.local.nombre,
        empleado: value.attributes.empleado,
        servicio: value.attributes.servicio
      })
    });

  });

});
