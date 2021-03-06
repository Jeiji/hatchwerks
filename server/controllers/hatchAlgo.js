const gpix = require('get-pixels');



function hatchAlgo(){
  //RandInt
  function randInt( min , max ){
      if ( !max ){
        max = min;
        min = 0;
      }
      return ( Math.floor( Math.random() * ( ( max ) - min ) + min ) )
  }

  // Create random character
  function randoChar(){
    // const chars = ['@','?','$','%','&','&#x25B2','&#x0411','&#x0414','&#x042F','&#x0429','&#x0416','&#x042D'];
    const chars = ['@','#','$','%','&','Y','E','S','H','U','A','&#x25B2'];
    // const chars = ['@','H','T','C','H','H@ATCH_','@','H','T','C','H','@','H','T','C','H','@','H','T','C','H','@','H','T','C','H'];
    // const chars = ['@','#','$','%','&','W','M','G','K','X','R','8','を','ち','ぞ','あ','ば','ほ','チ','ヲ','ジ','ツ'];
    // const chars = ['&#xFF75','&#xFF81' , '&#xFF82' , '&#xFFA6' , '&#xFFAC' , '&#xFFBE'];
    return chars[ randInt( chars.length ) ]
  }

  function randoMid(){
    // const chars = ['@','?','$','%','&','&#x25B2','&#x0411','&#x0414','&#x042F','&#x0429','&#x0416','&#x042D'];
    const chars = ['+','-','*'];
    // const chars = ['@','H','T','C','H','H@ATCH_','@','H','T','C','H','@','H','T','C','H','@','H','T','C','H','@','H','T','C','H'];
    // const chars = ['@','#','$','%','&','W','M','G','K','X','R','8','を','ち','ぞ','あ','ば','ほ','チ','ヲ','ジ','ツ'];
    // const chars = ['&#xFF75','&#xFF81' , '&#xFF82' , '&#xFFA6' , '&#xFFAC' , '&#xFFBE'];
    return chars[ randInt( chars.length ) ]
  }

  // Check for bein' logged in
  function ifLogged( req , res ){
    if( !req.session.usr ){
      res.redirect('/');
    }
  }
  this.hatchwerk = function( file , detail , callback ){
    console.log(file);
    gpix( file.buffer, file.mimetype , function(err, pixels) {
      if(err) {
        console.log("Bad image path");
        console.log(err);
        return
      }
      // console.log("got pixels", pixels.shape.slice())
      // console.log(pixels.data.slice() );

      var flatArray = [],
          avgs = [],
          asciiPic = '<p>',
          sqVal = parseInt(detail),
          heightRedux = Math.ceil( sqVal * 1.4 ), // Account for ASCII char height
          xStart = 0,
          yStart = 0;



      // console.log(pixels.data.length);


      while( (pixels.get( 0 , yStart+( sqVal-1 ) , 0 )) != undefined ){
        for (var y = yStart; y < yStart+heightRedux; y+=heightRedux){
          for (var x = xStart; x < xStart+sqVal; x+=sqVal){
            // console.log(x , y);
            for (var z = 0; z < 4; z++){
              flatArray.push(pixels.get(x, y, z));
              // console.log(pixels.get(x, y, z));
            }
            // console.log(flatArray);
            avgs.push(
              (flatArray[0] + flatArray[1] + flatArray[2]) / 3
            );
            // console.log(avgs);
            flatArray = []
          }
        }

        // console.log('\nfinish square' ,` starting from ( ${ xStart } , ${ yStart } ) down to ( ${ x-1  } , ${ y-1  } ) `);
        // console.log(sqVal);
        if (sqVal > 100) {
          console.log('GARBAGE');
          if( findAvg( avgs ) < 170 && findAvg( avgs ) > 85 ){
            asciiPic += '-'
          }else if ( findAvg( avgs ) <= 85 ) {
            asciiPic += randoChar();
          }else{
            asciiPic += '&nbsp;'
          }
        }else {
          if( findAvg( avgs ) <= 191.25 && findAvg( avgs ) > 127.5 ){
            asciiPic += randoMid();
          }else if( findAvg( avgs ) <= 127.5 && findAvg( avgs ) > 63.75 ){
            asciiPic += '-'
          }else if ( findAvg( avgs ) <= 63.75 ) {
            asciiPic += '&nbsp';
          }else{
            asciiPic += randoChar();
          }
        }
        avgs = [];




        //Check to see if there is space to run another square by seeing if you can run the length of x
        if ( pixels.get( x , ( pixels.shape[1] - 1 ) , z ) == undefined ) {
          // console.log('Next row');
          yStart = y;
          xStart = 0;
          asciiPic += '</p><p>';
        }else{
          // console.log('Keep on same row');
          yStart = y - heightRedux;
          xStart = x
        }
        // console.log(xStart , yStart);
        // console.log(pixels.get( 21 , 8 , 0 ));
      }


      asciiPic += '</p>'
      console.log(asciiPic);
      console.log(Math.floor( Math.sqrt(pixels.shape[1]) ));
      if(callback) callback( asciiPic );
    })

  }

  function findAvg( r ){
    let sum = 0,
        avg = 0;
    for (let i = 0; i < r.length; i++) {
      sum += r[i]
    }
    avg = sum / r.length;
    return avg;
  };


}
module.exports = new hatchAlgo;
