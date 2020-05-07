import * as React from 'react';
import styled from 'styled-components';
import LabelInput from '../common/LabelInput';
import SelectableList from '../common/SelectableList';
import {MdRoom} from 'react-icons/md';
import {debounce} from 'throttle-debounce';
import useInput from '../../lib/hooks/useInput';
import {usePlaceAutoComplete2, getGeocode, getLatLng} from '../../lib/api/googleMap';
import {AddPlaceMutationArgs} from '../../lib/graphql/trip';

const {useState,useMemo, useEffect, useCallback} = React;

interface RegisterPlaceProps {
     changePlace : (place: AddPlaceMutationArgs | null) => void;
     place :AddPlaceMutationArgs | null;
}
const RegisterPlace: React.FC<RegisterPlaceProps> = ({
    changePlace,
    place
}) => {
    const [keyword, setKeyword] = useInput((place && place.name) || '');
    const [selectedId, setSelectedId] = useState((place && place.placeId) || '');
    const [result, fetch] = usePlaceAutoComplete2();
    
    const debouncedSearch = useMemo(() => {
        return debounce(300, (keyword: string) => {
            fetch(keyword);
            changePlace(null);
        });
    },[]);

    useEffect(()=>{
        if (!keyword)
            return;
        debouncedSearch(keyword);
    },[keyword]);

    const onChangeId = useCallback((id, item)=>{
        let data = {
            name: item.text.props.children[1],
            lat: 0,
            lng: 0,
            address: '',
            isFav: false,
            placeId : id
        }
        getGeocode({placeId:id})
        .then((r)=>{
            data.address = r[0].formatted_address;
            return getLatLng(r[0]);
        })
        .then((r)=>{
            const {lat, lng} = r;
            data.lat = lat;
            data.lng = lng;
            console.log(data);
        })

        changePlace(data);
        setSelectedId(id);
    },[]);

    return (
        <PlaceBlock>
            <LabelInput
            name="place"
            label="주소, 랜드마크, 도시를 입력해주세요"
            placeholder="서울 강남구"
            value={keyword}
            onChange={setKeyword}
            autoComplete="off"
            className="item-list"
            />
            {result 
            ? (                
                <SelectableList
                    list={
                        result.map((r)=>{return {
                            id:r.place_id,
                            text:<><MdRoom style={{marginRight:'0.6rem'}}/>{r.description}</>
                        }})
                    }
                    selectedId={selectedId}
                    onChangeId={onChangeId}
                    className="item-list"
                />
            )
            :
            null
            }
        </PlaceBlock>
    );
}

const PlaceBlock = styled.div`
    .item-list {
        width:28rem;
        overflow:hidden;
    }
`;
export default RegisterPlace;