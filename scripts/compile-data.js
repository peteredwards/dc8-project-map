/**
 * 
 */
const fs = require('fs');
const path = require('path');

var files = fs.readdirSync( path.resolve( __dirname, '../data' ), { encoding: 'utf8' } );
if (files.length) {
    var nuts = {};
    var used_nuts = [];
    files.forEach( filename => {
        if ( filename !== '.' && filename !== '..' ) {
            if ( filename.indexOf('nuts') !== -1 ) {
                let jsonfile = fs.readFileSync( path.resolve( __dirname, '../data/', filename ) );
                let jsonobj  = JSON.parse(jsonfile);
                jsonobj.features.forEach( fobj => {
                    if ( fobj.properties ) {
                        if ( fobj.properties.NUTS112CD ) {
                            nuts[fobj.properties.NUTS112CD] = fobj;
                        } else if ( fobj.properties.NUTS212CD ) {
                            nuts[fobj.properties.NUTS212CD] = fobj;
                        } else if ( fobj.properties.NUTS312CD ) {
                            nuts[fobj.properties.NUTS312CD] = fobj;
                        }
                    }
                });
            }
            if ( filename.indexOf('decarbon8') !== -1 ) {
                let jsonfile = fs.readFileSync( path.resolve( __dirname, '../data/', filename ) );
                let jsonobj  = JSON.parse(jsonfile);
                jsonobj.forEach( pobj => {
                    pobj.NUTS.forEach( nut => {
                        if ( used_nuts.indexOf(nut) === -1 ) {
                            used_nuts.push(nut);
                        }
                    })
                });              
            }
        }
    });
    nutsjson = [];
    used_nuts.forEach( nut => {
        nutsjson.push( nuts[nut] );
    });
    fs.writeFileSync(path.resolve(__dirname, '../data/nuts.json'), JSON.stringify(nutsjson), err => {
        if (err) {
            console.error(err);
            return;
        }
    });
}
