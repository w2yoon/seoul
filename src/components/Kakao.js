import React, { useEffect, useState } from 'react';
import { Button, Grid, Popover, CircularProgress } from '@mui/material';
import { useFetchData } from '../useFetchData';
import './Kakao.css';
import Modal from './Modal';
import './style.css'

const { kakao } = window;

const Kakao = () => {
  const placeData = useFetchData('place');
  const [map, setMap] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverData, setPopoverData] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (placeData) setLoading(false); 
  }, [placeData]);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.5511, 126.9909),
      level: 8,
    };

    const createdMap = new kakao.maps.Map(container, options);
    setMap(createdMap);
  }, []);

  useEffect(() => {
    if (!map || !placeData) return;

    placeData.forEach((place) => {
      const markerPosition = new kakao.maps.LatLng(place.lat, place.lng);

      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(map);

      kakao.maps.event.addListener(marker, 'click', () => {
        setSelectedPlace(place);
        setModalVisible(true);
      });
    });
  }, [map, placeData]);

  const handleButtonClick = (event, region) => {
    const filteredPlaces = placeData.filter((place) => place.gu_name === region);
    setAnchorEl(event.currentTarget);
    setPopoverData(filteredPlaces);
  };

  const handlePlaceClick = (place) => {
    const position = new kakao.maps.LatLng(place.lat, place.lng);
    map.setCenter(position);
    setSelectedPlace(place);
    setModalVisible(true);
    setAnchorEl(null); // Close the popover when a place is clicked
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPlace(null);
    setAnchorEl(null);
  };

  const regions = [
    '강남구', '중구', '용산구',
    '송파구', '종로구', '마포구',
    '금천구', '광진구', '서초구',
    '구로구', '관악구', '은평구',
    '성동구', '도봉구', '동작구', 
    '강북구', '영등포구','과천시',
  ];

  return (
    <div style={{backgroundColor: "rgba(188, 188, 188, 0.5)", height: "530px"}}>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <div id="map" className="map" />
        </Grid>
        <Grid item xs={4}>
          <div className="side-panel">
            <Grid container spacing={1}>
              {regions.map((region, index) => (
                <Grid item xs={4} key={index}>
                  <Button
                    variant="text"
                    style={{ color: "black", width: "100%" }}
                    onClick={(event) => handleButtonClick(event, region)}
                    disabled={loading}  // 로딩 중일 때 버튼 비활성화
                  >
                    {loading ? <CircularProgress size={20} /> : `#${region}`} 
                    {/* 로딩 중일 때는 CircularProgress 로딩 인디케이터를 보여주고, 아니면 지역명 표시 */}
                  </Button>
                </Grid>
              ))}
            </Grid>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={closeModal}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              {popoverData.map((place, index) => (
                <Button 
                  key={index}
                  variant="text" 
                  style={{ color: "black", width: "100%" }}
                  onClick={() => handlePlaceClick(place)}
                >
                  {place.name}
                </Button>
              ))}
            </Popover>
          </div>
        </Grid>
      </Grid>

      {modalVisible && <Modal selectedPlace={selectedPlace} closeModal={closeModal} />}
    </div>
  );
}

export default Kakao;
