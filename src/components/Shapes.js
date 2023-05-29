import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import './Shapes.css'


const Shapes = () => {
  const selectedPlace = {
    name : "잠실 관광특구"
  }

  return (
    <div className="content">
      <h1 className="text-effect">사람 적은 곳이 궁금하다면?</h1>
      <Card sx={{ width: '50%' }}>
        <CardActionArea component="a" href='./place' target="_blank">
          <CardMedia
            component="img"
            width="100%"
            src={'https://data.seoul.go.kr/resources/img/guide/hotspot/' 
            + selectedPlace.name + '.jpg'} 
            alt={selectedPlace.name} 
          />
          <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Typography sx={{ fontFamily: 'hanna_air', fontSize: 14 }} color="text.secondary" gutterBottom>
              오늘의 추천 지역 보기 
            </Typography>
            <Typography variant="h5" component="div" style={{ fontFamily: 'hanna_air', fontSize: 40, textAlign: 'left' }}>
              <span style={{ fontWeight: 'bold' }}>붐</span>비지 않는 지역 <br />
              <span style={{ fontWeight: 'bold' }}>바</span>로 <br />
              <span style={{ fontWeight: 'bold' }}>여</span>기야 
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
            </Typography>
            <Typography variant="body2" style={{ fontFamily: 'hanna_air'}}>
              더 많은 정보를 보고 싶다면? 
              <br />
              {'지금 바로 클릭!'}
          </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <h1 className="text-effect">오늘 뭐하고 놀지 모르겠다면?</h1>
      <Card sx={{ width: '50%' }}>
        <CardActionArea component="a" href='./things' target="_blank">
          <CardMedia
            component="img"
            width="100%"
            src={'../img/content.jpg'} 
            alt={'content'} 
          />
          <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Typography sx={{ fontFamily: 'hanna_air', fontSize: 14 }} color="text.secondary" gutterBottom>
              오늘의 추천 활동 보기 
            </Typography>
            <Typography variant="h5" component="div" style={{ fontFamily: 'hanna_air', fontSize: 40, textAlign: 'left' }}>
              <span style={{ fontWeight: 'bold' }}>볼</span>만한 전시 <br />
              <span style={{ fontWeight: 'bold' }}>빨</span>리<br />
              <span style={{ fontWeight: 'bold' }}>간</span>단히 검색
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
          
            </Typography>
            <Typography variant="body2" style={{ fontFamily: 'hanna_air'}}> 
              더 많은 정보를 보고 싶다면?
              <br />
              {'지금 바로 클릭!'}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

    
    </div>
  );
};

export default Shapes;
