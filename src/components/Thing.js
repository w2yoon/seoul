import React, { useState } from 'react';
import { TextField, Stack, Autocomplete, Card, CardContent, Typography,CardActionArea } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { useFetchData } from '../useFetchData'; 
import './Thing.css'

const regions = [
  '전체',
  '강남구', '중구', '용산구',
  '송파구', '종로구', '마포구',
  '금천구', '광진구', '서초구',
  '구로구', '관악구', '은평구',
  '성동구', '도봉구', '동작구', 
  '강북구', '영등포구','과천시',
];

const types = ['전체','클래식', '영화', '콘서트', '축제-문화/예술', '무용', '뮤지컬/오페라', '연극', '국악', '전시/미술','축제-기타','교육/체험', '기타'];

const Thing = () => {
  const contentData = useFetchData('content');
  const [date, setDate] = useState('');
  const [region, setRegion] = useState('');
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);

  if (!contentData) {
    return <div>Loading...</div>;
  }

  // 필터링
  const filteredContentData = contentData.filter(content => {
    const startDate = new Date(content.STARTDATE);
    const endDate = new Date(content.END_DATE);
    const selectedDate = new Date(date);

    return (
      (date ? (selectedDate >= startDate && selectedDate <= endDate) : true) &&
      (region !== '전체' ? content.GUNAME === region : true) &&
      (type !== '전체' ? content.CODENAME === type : true)
    );
  });

  // 페이지네이션
  const itemsPerPage = 5;
  const pageCount = Math.ceil(filteredContentData.length / itemsPerPage);
  const itemsOnPage = filteredContentData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div style={{ backgroundColor: 'white', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Stack spacing={2} style={{ minWidth: '300px', marginBottom: '20px'}}>
        <TextField
          id="date"
          label="날짜"
          type="date"
          defaultValue={date}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event) => setDate(event.target.value)}
        />
        <Autocomplete
          options={regions}
          renderInput={(params) => <TextField {...params} label="지역" />}
          onChange={(event, newValue) => setRegion(newValue)}
        />
        <Autocomplete
          options={types}
          renderInput={(params) => <TextField {...params} label="유형" />}
          onChange={(event, newValue) => setType(newValue)}
        />
      </Stack>
      {itemsOnPage.map((content, index) => (
        <Card className="content-card" variant="outlined">
          <CardActionArea component="a" href={content.HOMEPAGE} target="_blank">
            <CardContent>
              <img className="card-image" src={content.IMG} alt={content.TITLE} />
              <Typography gutterBottom variant="h5" component="div">
                {content.TITLE}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {content.GUNAME}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {content.STARTDATE} - {content.END_DATE}
              </Typography>
            </CardContent>
          </CardActionArea>
      </Card>
      ))}
      <Pagination count={pageCount} page={page} onChange={(event, value) => setPage(value)} />
    </div>
  );
};

export default Thing;
