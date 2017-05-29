angular.module('starter.services', [])

.constant('APIConfig', {
  PREFIX: 'http://' + 'salones.pe:8069' + '/api/',
  DEV_PREFIX: 'http://' + 'salones.pe:8069' + '/api/',
})

.constant('Modes', {
  DEV_MODE: 0,
  PROD_MODE: 1,
})

.service('AppModeService', function(Modes) {
  return {
      MODE: Modes.DEV_MODE,
  }
})

.service('userService', function($rootScope, localStorageService) {

    var service = {

        model: {
            username: null,
            token: null
        },

        SaveState: function () {
            localStorageService.set('userModel', angular.toJson(service.model));
        },

        RestoreState: function () {
            var userModel = localStorageService.get('userModel');
            if(userModel !== null) {
              service.model = angular.fromJson(userModel);
            }
            console.log(service.model)
        }
    }

    $rootScope.$on("savestate", service.SaveState);
    $rootScope.$on("restorestate", service.RestoreState);

    return service;
})

.service('API', function($http, APIConfig, AppModeService, Modes, userService) {

  function getHeaders(useUserToken, isPost) {
    headers = {};

    if(isPost) {
       headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    if(useUserToken) {
      if(userService.model.token !== null) {
        headers['Authorization'] = 'Token ' + userService.model.token;
      }
    }

    return headers;
  }

  function url(resource, params) {
    var url;
    if(AppModeService.MODE === Modes.DEV_MODE) {
       url = APIConfig.DEV_PREFIX + resource;
    } else if (AppModeService.MODE === Modes.PROD_MODE) {
       url = APIConfig.PREFIX + resource;
    }

    if (params && params.id) {
      url += '/' + params.id;
    }

    return url;
  }

  function get(resource, params, useUserToken) {

    if(typeof useUserToken === 'undefined') {
      useUserToken = false;
    }

    return $http({
      method: 'GET',
      url:    url(resource, params),
      headers: getHeaders(useUserToken, false),
      params: params
    });
  }

  function post(resource, params, data, useUserToken) {

    if(typeof useUserToken === 'undefined') {
      useUserToken = false;
    }

    return $http({
        method: 'POST',
        url: url(resource, params),
        headers: getHeaders(useUserToken, true),
        transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        },
        data: data
    });
    // Ahi esta para que hagas otro request que envie un payload
    //return $http.post(url(resource), params);
  }

  function put(resource, id, params) {
    return $http.put(url(resource, { id: id }), params);
  }

  function del(resource, id, params) {
    return $http.delete(url(resource, { id: id }));
  }

  return {
    get:    get,
    post:   post,
    put:    put,
    delete: del
  };
})

.service('CurrencyService', function() {
  /**
   * Actualmente hardcoded para usar soles. A futuro esta informacion vendra del API tambien
   */
  return {
      currency_symbol: 'S/.'
  }
});
