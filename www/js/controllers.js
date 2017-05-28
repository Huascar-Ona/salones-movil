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
    { title: 'Locales', id: 3 },
    { title: 'Ofertas', id: 4 },
    { title: 'Empleados', id: 5 }
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

.controller('ServicioCtrl', function($scope, $stateParams, API, $ionicPopup) {

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
      var dateTime = date3 + "T" + time[0]+':'+time[1]

      var resevaAttr = {
                          servicio: JSON.stringify({id: empleado, type: 'Servicios'}),
                          fecha: dateTime,
                          local: JSON.stringify({id: local, type: 'Local'}),

                        };
      $scope.validated = true;
      API.post('reservas/create/', '', resevaAttr).then(function successCallback(response) {
        $ionicPopup.confirm({
           title: "Reservacion creada exitosamente.",
        });
      }, function errorCallback(response) {
        $ionicPopup.confirm({
           title: response.data.errors[0].detail,
        });
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
        telefono: value.attributes.telefono,
        horario: value.attributes.horario
      })
    });
  });
})

.controller('OfertaCtrl', function($scope, $stateParams, API) {
  API.get('ofertas/detail/' + $stateParams.ofertaId + '/').then(function(response) {
    $scope.oferta = response.data.data;
    console.log($scope.oferta)
  });
})

.controller('OfertasCtrl', function($scope, $stateParams, API) {
  $scope.ofertas = [];

  API.get('ofertas/').then(function(response) {
    $scope.ofertas = [];
    console.log(response.data.data);
    angular.forEach(response.data.data, function(value, key){
      $scope.ofertas.push({
        imagen: value.attributes.imagen, 
        servicio: value.attributes.servicio,
        nombre: value.attributes.nombre,
        descripcion: value.attributes.descripcion,
        estatus: value.attributes.estatus,
        fecha_vencimiento: value.attributes.fecha_vencimiento,
        descuento: value.attributes.descuento
      })
    });
  });
})

.controller('EmpleadoCtrl', function($scope, $stateParams, API) {
  API.get('empleados/detail/' + $stateParams.empleadoId + '/').then(function(response) {
    $scope.empleado = response.data.data;
    console.log($scope.empleado)
  });
})

.controller('EmpleadosCtrl', function($scope, $stateParams, API) {
  $scope.empleados = [];

  API.get('empleados/').then(function(response) {
    $scope.empleados = [];
    console.log(response.data.data);
    angular.forEach(response.data.data, function(value, key){
      $scope.empleados.push({
        imagen: value.attributes.imagen, 
        estatus: value.attributes.estatus,
        nombre: value.attributes.nombre,
        rol: value.attributes.rol,
        local: value.attributes.local,
        receso: value.attributes.receso,
        direccion_email: value.attributes.direccion_email,
        primer_nombre: value.attributes.primer_nombre,
        segundo_nombre: value.attributes.segundo_nombre,
        apellido_paterno: value.attributes.apellido_paterno,
        horario: value.attributes.horario
      })
    });
  });
})





;
