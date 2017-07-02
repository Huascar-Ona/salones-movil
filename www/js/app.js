// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ng-token-auth', 'LocalStorageModule',
              'starter.controllers', 'starter.services', 'ion-gallery'])

.run(function($ionicPlatform, $http, $rootScope) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  delete $http.defaults.headers['get']["If-Modified-Since"]
  delete $http.defaults.headers['post']["If-Modified-Since"]

  $http.defaults.headers.post['Content-Type'] = 'application/vnd.api+json';
  $http.defaults.headers.common.Authorization = 'Token 8faca8709720bda7de2edce7e8553d6355132204';
})

.config(function(
  $stateProvider, $authProvider, $urlRouterProvider,
  APIConfig, localStorageServiceProvider, localStorageServiceProvider) {

  localStorageServiceProvider
    .setPrefix('starter')
    .setStorageType('sessionStorage');

  $authProvider.configure({
    apiUrl: APIConfig.PREFIX
  });

  $stateProvider

  .state('login', {
    url: '/',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.servicios', {
    url: '/servicios',
    views: {
      'menuContent': {
        templateUrl: 'templates/servicios.html',
        controller: 'ServiciosCtrl'
      }
    }
  })

  .state('app.servicio', {
    cache: false,
    url: '/servicios/:servicioId',
    views: {
      'menuContent': {
        templateUrl: 'templates/servicio.html',
        controller: 'ServicioCtrl'
      }
    }
  })

  .state('app.productos', {
    url: '/productos',
    views: {
      'menuContent': {
        templateUrl: 'templates/productos.html',
        controller: 'ProductosCtrl'
      }
    }
  })

  .state('app.producto', {
    cache: false,
    url: '/productos/:productoId',
    views: {
      'menuContent': {
        templateUrl: 'templates/producto.html',
        controller: 'ProductoCtrl'
      }
    }
  })

  .state('app.galerias', {
      cache: false,
      url: '/galerias',
      views: {
        'menuContent': {
          templateUrl: 'templates/galerias.html',
          controller: 'GaleriasCtrl'
        }
      }
    })

  .state('app.locales', {
    url: '/locales',
    views: {
      'menuContent': {
        templateUrl: 'templates/locales.html',
        controller: 'LocalesCtrl'
      }
    }
  })

  .state('app.local', {
    cache: false,
    url: '/locales/:localId',
    views: {
      'menuContent': {
        templateUrl: 'templates/local.html',
        controller: 'LocalCtrl'
      }
    }
  })

  .state('app.reservas', {
    cache: false,
    url: '/reservas',
    views: {
      'menuContent': {
        templateUrl: 'templates/reservas.html',
        controller: 'ReservasCtrl'
      }
    }
  })

  .state('app.ofertas', {
    url: '/ofertas',
    views: {
      'menuContent': {
        templateUrl: 'templates/ofertas.html',
        controller: 'OfertasCtrl'
      }
    }
  })

  .state('app.oferta', {
    cache: false,
    url: '/ofertas/:ofertaId',
    views: {
      'menuContent': {
        templateUrl: 'templates/oferta.html',
        controller: 'OfertaCtrl'
      }
    }
  })

  .state('app.empleados', {
    url: '/empleados',
    views: {
      'menuContent': {
        templateUrl: 'templates/empleados.html',
        controller: 'EmpleadosCtrl'
      }
    }
  })

  .state('app.empleado', {
    cache: false,
    url: '/empleados/:empleadoId',
    views: {
      'menuContent': {
        templateUrl: 'templates/empleado.html',
        controller: 'EmpleadoCtrl'
      }
    }
  })

  .state('app.playlists', {
    url: '/playlists',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlists.html',
        controller: 'PlaylistsCtrl'
      }
    }
  })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
});
