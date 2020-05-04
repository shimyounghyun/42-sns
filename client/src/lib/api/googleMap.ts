import { useState, createRef, useCallback, useEffect } from 'react';
import 'googlemaps';
export const usePlaceAutocomplete = () => {
    const [keyword, setKeyword]:any = useState(null);
    const [autocompleteResult, setAutocompleteResult]:any = useState(null);
    const [ref, setRef]:any = useState(null);
    const [status, setStatus]:any = useState(null);

    const init = useCallback(() => {
        const {google} = window;
        const placesLib = google?.maps?.places;
        if (!placesLib) {
          return;
        }
        setRef(new placesLib.AutocompleteService());
      }, []);
    
    useEffect(()=>{
        init();
    },[]);
    useEffect(()=>{        
        const fetch = () =>{ 
            ref.getPlacePredictions({input:keyword},(result:any,status:any)=>{
                setAutocompleteResult(result);
                setStatus(status);
            });
        }
        if (keyword){
            setStatus(null);
            fetch();
        }
    },[keyword]);

    return {keyword,setKeyword, autocompleteResult, status};
}


type GeoArgs = google.maps.GeocoderRequest;
type GeocodeResult = google.maps.GeocoderResult;
type GeoReturn = Promise<GeocodeResult[]>;

export const getGeocode = (args: GeoArgs): GeoReturn => {
  const geocoder = new window.google.maps.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.geocode(args, (results, status) => {
      if (status !== 'OK') reject(status);
      if (!args.address && args.componentRestrictions) {
        resolve(results);
      }
      resolve(results);
    });
  });
};

export type LatLng = { lat: number; lng: number };
type LatLngReturn = Promise<LatLng>;

export const getLatLng = (result: GeocodeResult): LatLngReturn =>
  new Promise((resolve, reject) => {
    try {
      const { lat, lng } = result.geometry.location;

      resolve({ lat: lat(), lng: lng() });
    } catch (error) {
      reject(error);
    }
  });