angular.module('starter.services', [])

.constant('APIConfig', {
  PREFIX: 'http://' + 'salones.pe:8069' + '/api/'
})

.service('API', function($http, APIConfig) {
  function url(resource, params) {
    var url = APIConfig.PREFIX + resource;
    if (params && params.id) {
      url += '/' + params.id;
    }

    return url;
  }

  function get(resource, params) {
    return $http({
      method: 'GET',
      url:    url(resource, params),
      params: params
    });
  }

  function post(resource, params, data) {
    return $http({
        method: 'POST',
        url: url(resource, params),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
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
