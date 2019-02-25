import _ from 'lodash';
import {createClient} from '@google/maps';
const googleMapsClient = createClient({key:"AIzaSyD5kYQt-5AWnQi-CKkPJIP0S3GBBdyhNGc",Promise: Promise});
export const googleMapGeocode =  (address)=>{
    let filtedStr = _.chain(address).replace(/[^A-Za-z0-9]/ig," ").lowerCase().split(' ').compact().uniq().join('+').value();
    let results = googleMapsClient.geocode({
        address: filtedStr,
        components:{country:"CA"}
    }).asPromise().then( (response)=>{
        return response.json.results;
        }).catch( (err)=>console.log(err));
    return results;
}

export const convertPostAddress = (results)=>{
    let _result = {};
    if(!_.isEmpty(results)){
        const {address_components=[],formatted_address="",geometry={}} = results[0]
        if(!_.isEmpty(address_components)){
            address_components.map( ({types,short_name})=>{
                if(types[0]=="administrative_area_level_1" && short_name=="BC"){
                    console.log("in BC");
                    const addressComponent = JSON.stringify(address_components);
                    
                    _result.formattedAddress = formatted_address;
                    _result.addressComponent = addressComponent;
                    _result.lat = geometry.location.lat;
                    _result.lng = geometry.location.lng; 
                    
                    return
                }
                else if(types[0]=="administrative_area_level_1" ){
                    console.log("not in BC");
                    console.log(types[0]);
                    console.log(short_name)
                    console.log(response.json.results);
                    _result = {}
                }
                
            } );
        }
    }
    return _result
}
