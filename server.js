const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');
const app = express();
const port = 8080;
var cors = require('cors')

app.use(cors())

//장소 이름 리스트
place_names = ['강남 MICE 관광특구',
  '동대문 관광특구',
  '명동 관광특구',
  '이태원 관광특구',
  '잠실 관광특구',
  '종로·청계 관광특구',
  '홍대 관광특구',
  '경복궁·서촌마을',
  '광화문·덕수궁',
  '창덕궁·종묘',
  '가산디지털단지역',
  '강남역',
  '건대입구역',
  '고속터미널역',
  '교대역',
  '구로디지털단지역',
  '서울역',
  '선릉역',
  '신도림역',
  '신림역',
  '신촌·이대역',
  '역삼역',
  '연신내역',
  '용산역',
  '왕십리역',
  'DMC(디지털미디어시티)',
  '창동 신경제 중심지',
  '노량진',
  '낙산공원·이화마을',
  '북촌한옥마을',
  '가로수길',
  '성수카페거리',
  '수유리 먹자골목',
  '쌍문동 맛집거리',
  '압구정로데오거리',
  '여의도',
  '영등포 타임스퀘어',
  '인사동·익선동',
  '국립중앙박물관·용산가족공원',
  '남산공원',
  '뚝섬한강공원',
  '망원한강공원',
  '반포한강공원',
  '북서울꿈의숲',
  '서울대공원',
  '서울숲공원',
  '월드컵공원',
  '이촌한강공원',
  '잠실종합운동장',
  '잠실한강공원',
  ]

  //구 이름 리스트
  gu_names = ['강남구',
    '중구',
    '중구',
    '용산구',
    '송파구',
    '종로구',
    '마포구',
    '종로구',
    '중구',
    '종로구',
    '금천구',
    '강남구',
    '광진구',
    '서초구',
    '서초구',
    '구로구',
    '용산구',
    '강남구',
    '구로구',
    '관악구',
    '마포구',
    '강남구',
    '은평구',
    '용산구',
    '성동구',
    '은평구',
    '도봉구, 노원구',
    '동작구',
    '종로구',
    '종로구',
    '강남구',
    '성동구',
    '강북구',
    '도봉구',
    '강남구',
    '영등포구',
    '영등포구',
    '종로구',
    '용산구',
    '중구',
    '광진구',
    '마포구',
    '서초구',
    '강북구',
    '과천시',
    '성동구',
    '마포구',
    '용산구',
    '송파구',
    '송파구'
    ]

    //위도 리스트
    latitudes = [37.511168,
      37.567631,
      37.566936,
      37.534984,
      37.512556,
      37.569723,
      37.557195,
      37.578711,
      37.57223,
      37.579296,
      37.57223,
      37.497826,
      37.540324,
      37.504582,
      37.493748,
      37.485335,
      37.556312,
      37.504634,
      37.50888,
      37.29032,
      37.555024,
      37.500754,
      37.618786,
      37.529745,
      37.561213,
      37.576377,
      37.653362,
      37.513778,
      37.580468,
      37.579007,
      37.517307,
      37.542866,
      37.640039,
      37.648938,
      37.526758,
      37.521587,
      37.516866,
      37.574335,
      37.523808,
      37.550955,
      37.529138,
      37.555318,
      37.510674,
      37.621474,
      37.427499,
      37.544388,
      37.563899,
      37.516886,
      37.515888,
      37.517887
      ]

    //경도 리스트
    longitudes = [127.059917,
      127.01228,
      126.981809,
      126.992819,
      127.104436,
      126.976529,
      126.923657,
      126.973606,
      126.976649,
      126.990957,
      126.976649,
      127.027754,
      127.06948,
      127.005081,
      127.013994,
      126.901249,
      126.972177,
      127.049234,
      126.891376,
      126.55469,
      126.936861,
      127.036723,
      126.921016,
      126.96475,
      127.03845,
      126.900958,
      127.055823,
      126.944732,
      127.007534,
      126.984733,
      127.022559,
      127.056568,
      127.026798,
      127.033815,
      127.03904,
      126.924102,
      126.903752,
      126.989566,
      126.980669,
      126.991098,
      127.069908,
      126.895112,
      126.996279,
      127.04092,
      127.017299,
      127.037619,
      126.893721,
      126.971793,
      127.073392,
      127.086933
      ]

    app.get('/api', async (req, res) => {
      try {
        const response = await axios.get(`http://openapi.seoul.go.kr:8088/736673424c6b746d363258656f594e/xml/citydata/1/5/강남역`);
    
        xml2js.parseString(response.data, (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send('Error occurred while parsing XML');
            return;
          }
    
         
          res.json(result);
        });
      } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while fetching data');
      }
    });
    

    app.get('/api/place', async (req, res) => {
      try {
        let API_KEY = '736673424c6b746d363258656f594e';
    
        const promises = place_names.map(async (place, index) => {
          let url = `http://openapi.seoul.go.kr:8088/${API_KEY}/xml/citydata/1/5/${place}`;
          const response = await axios.get(url);
    
          return new Promise((resolve, reject) => {
            xml2js.parseString(response.data, (err, result) => {
              if (err) {
                reject('Error occurred while parsing XML');
                return;
              }
    
              const data = result['SeoulRtd.citydata'].CITYDATA;
    
              const areaName = data[0].AREA_NM[0];
              const areaCongestionLevel = data[0].LIVE_PPLTN_STTS[0].LIVE_PPLTN_STTS[0].AREA_CONGEST_LVL[0];
              const areaCongestionMsg = data[0].LIVE_PPLTN_STTS[0].LIVE_PPLTN_STTS[0].AREA_CONGEST_MSG[0];
              const populationTime = data[0].LIVE_PPLTN_STTS[0].LIVE_PPLTN_STTS[0].PPLTN_TIME[0];
              const guName = gu_names[index];
              const latitude = latitudes[index];
              const longitude = longitudes[index];
    
              const filteredData = {
                name : areaName,
                congest_lvl: areaCongestionLevel,
                update_time: populationTime,
                congest_msg : areaCongestionMsg,
                gu_name : guName,
                lat : latitude,
                lng : longitude
              };
    
              resolve(filteredData);
            });
          });
        });
    
        Promise.all(promises)
          .then(results => res.json(results))
          .catch(error => {
            console.error(error);
            res.status(500).send('Error occurred while fetching data');
          });
      } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while fetching data');
      }
    });
    
    

app.get('/api/content', async (req, res) => {
  try {
    const response = await axios.get(`http://openapi.seoul.go.kr:8088/76765977646b746d36305643796f77/xml/culturalEventInfo/1/300/`);

    xml2js.parseString(response.data, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error occurred while parsing XML');
        return;
      }

      const eventsData = result.culturalEventInfo.row;
      const dataToReturn = eventsData.map(event => {
        return {
          CODENAME: event.CODENAME[0],
          GUNAME: event.GUNAME[0],
          TITLE: event.TITLE[0],
          STARTDATE: event.STRTDATE[0],
          END_DATE: event.END_DATE[0],
          HOMEPAGE: event.ORG_LINK[0],
          IMG : event.MAIN_IMG[0]
        };
      });
      res.json(dataToReturn);
      //res.json(result);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while fetching data');
  }
});

app.get('/api/spaceInfo', async (req, res) => {
  try {
    // 1부터 10까지의 페이지를 요청합니다.
    const promises = [];

    for (let i = 1; i <= 816; i = i + 5) {
      const apiUrl = `http://openapi.seoul.go.kr:8088/48656646456b746d3539624a78694b/xml/culturalSpaceInfo/${i}/${i+5}/`;
      promises.push(axios.get(apiUrl));
    }

    // 모든 요청이 완료될 때까지 기다립니다.
    const responses = await Promise.all(promises);

    
    const parsedResponses = responses.map(response => {
      return new Promise((resolve, reject) => {
        xml2js.parseString(response.data, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    });

    const results = await Promise.all(parsedResponses);

    // 필요한 데이터만 추출합니다.
    const filteredResults = results.map(result => {
      return result.culturalSpaceInfo.row.filter(spaceInfo => {
        return spaceInfo.SUBJCODE[0] === "미술관" || spaceInfo.SUBJCODE[0] === "박물관";
      });
    });

    const finalResults = filteredResults.map(result => {
      return result.map(spaceInfo => {
        return {
          SUBJCODE: spaceInfo.SUBJCODE[0],
          FAC_NAME: spaceInfo.FAC_NAME[0],
          ADDR: spaceInfo.ADDR[0],
          HOMEPAGE: spaceInfo.HOMEPAGE[0]
        };
      });
    });

    // 빈 배열 제거
    const filteredFinalResults = finalResults.filter(result => result.length > 0);
    
    res.json(filteredFinalResults);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while fetching data');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});