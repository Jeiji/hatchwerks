app.controller('dshbrdCtrl' , ['$scope' , '$location' , 'bcktFctry' , 'prdctFctry' , 'usrFctry' ,  function( scope , location , of , pf , uf ) {

  const idxUsrs = function(){
    uf.idx( function( allUsrs ){
      scope.usrs = allUsrs
    });
  };
  idxUsrs();


  scope.usrLogin = function( usr ){
    uf.logUsr( usr , function( res ){
      location.url('/buckets')
    });
  };

  scope.usrRegister = function( usr ){
    uf.regUsr( usr , function( res ){
      console.log(`\n\n!!**!!**!!**!!**!!**!!**!!** should return user or not...`,res);
      if( res.data.name ){
        location.url('/buckets')
      };

    });
  };

  

}]);
