const haversine = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const radians = (degrees: number) => {
    return (degrees * Math.PI) / 180;
  };
  const R = 6371000; // 지구의 반지름 (미터)

  // 위도와 경도를 라디안으로 변환
  const lat1Rad = radians(lat1);
  const lon1Rad = radians(lon1);
  const lat2Rad = radians(lat2);
  const lon2Rad = radians(lon2);

  // 위도와 경도의 차이 계산
  const deltaLat = lat2Rad - lat1Rad;
  const deltaLon = lon2Rad - lon1Rad;

  // Haversine 공식 계산
  const a = Math.sin(deltaLat / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // 두 지점 사이의 거리 계산
  const distance = R * c;

  return distance;
};

export default haversine;
