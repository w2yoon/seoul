import React from 'react';
import { ImageList, ImageListItem, ImageListItemBar, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useFetchData } from '../useFetchData'; 
import './ImageGrid.css';

const ImageGrid = () => {
  const contentData = useFetchData('content');
  
  if (!contentData) {
    return <div>Loading...</div>;
  }

  // 오늘날짜 기준으로 종료된거 필터링 
  const currentDate = new Date();

  const filteredContentData = contentData.filter(content => {
    const endDate = new Date(content.END_DATE);
    return endDate >= currentDate;
  });

  const types = ['클래식', '영화', '콘서트', '축제-문화/예술', '무용', '뮤지컬/오페라', '연극', '국악', '전시/미술','축제-기타','교육/체험', '기타'];

  const typeSelectedData = types.map(type => {
    return filteredContentData.find(item => item.CODENAME === type);
  }).filter(item => item); // null or undefined items filter out

  return (
    <div className="shape">
      <ImageList variant="masonry" cols={3} gap={8} sx={{width: '50%'}}>
        {typeSelectedData.map((item) => (
          <ImageListItem key={item.IMG} onClick={() => window.open(item.HOMEPAGE, '_blank')}>
            <img
              src={item.IMG}
              srcSet={`${item.IMG}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.TITLE}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.CODENAME}
              subtitle={item.TITLE}
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${item.TITLE}`}
                >
                <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default ImageGrid;
