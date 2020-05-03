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

    return {setKeyword, autocompleteResult, status};
}