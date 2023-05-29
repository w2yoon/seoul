import React, { useEffect, useState } from 'react';
import { Button, Slider } from '@mui/material';
import './Kakao.css'
import './style.css'

const { kakao } = window;

const congestionMarks = [
  { value: 12.5, label: '여유' },
  { value: 37.5, label: '보통' },
  { value: 62.5, label: '약간 붐빔' },
  { value: 87.5, label: '붐빔' },
];

const congestionValues = {
    '여유': 12.5,
    '보통': 37.5,
    '약간 붐빔': 62.5,
    '붐빔': 87.5,
  };

const Modal = ({ selectedPlace, closeModal }) => {
  const [address, setAddress] = useState('');

  useEffect(() => {
    var geocoder = new kakao.maps.services.Geocoder();

    var coord = new kakao.maps.LatLng(selectedPlace.lat, selectedPlace.lng);
    var callback = function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            setAddress(result[0].address.address_name);
        }
    };

    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  }, [selectedPlace]);

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-top">
            <img 
              className="place-image" 
              src={'https://data.seoul.go.kr/resources/img/guide/hotspot/' 
                + selectedPlace.name + '.jpg'} 
              alt={selectedPlace.name} 
            />
            <h2 className="place-name">{selectedPlace.name}</h2>
            <h3 className="place-title">{selectedPlace.update_time}</h3>
            <div className="place-info">
              <Slider
                className="congestion-slider"
                defaultValue={congestionValues[selectedPlace.congest_lvl]}
                step={null}
                marks={congestionMarks}
                disabled
              />
            </div>
        </div>
        <div className="modal-bottom">
            <p>{selectedPlace.congset_msg}</p>
        </div>
        <div className="modal-address">
            <p>위치: {address}</p>
        </div>
        <Button onClick={closeModal}>Close</Button>
      </div>
    </div>
  );
}

export default Modal;
