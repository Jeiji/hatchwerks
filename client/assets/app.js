var app = angular.module('app' , [ 'ngRoute' , 'ngMessages', 'ngMaterial'] );
app.config(function ($routeProvider) {
  $routeProvider
  .when( '/' , {
    templateUrl : 'dashboard.html',
    controller : 'dshbrdCtrl'
  })
  .when( '/customers' , {
    templateUrl : 'customers.html',
    controller : 'cstmrCtrl'
  })
  .when( '/buckets' , {
    templateUrl : 'buckets.html',
    controller : 'bcktCtrl'
  })
  .when( '/orders' , {
    templateUrl : 'orders.html',
    controller : 'ordrCtrl'
  })
  .when( '/dashboard' , {
    templateUrl : 'dashboard.html',
    controller : 'dshbrdCtrl'
  })
  .when( '/friends' , {
    templateUrl : 'friends.html',
    controller : 'bcktCtrl'
  })
  .otherwise({
    redirectTo : '/'
  });
});
