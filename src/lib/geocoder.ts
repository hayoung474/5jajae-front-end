const geocoder = (address: string) => {
  return new Promise<naver.maps.Service.AddressItemV2>((resolve, reject) => {
    naver.maps.Service.geocode(
      {
        query: address,
      },
      function (status, response) {
        if (status !== naver.maps.Service.Status.OK) {
          reject(new Error('Geocode was not successful for the following reason: ' + status));
        }

        const result = response.v2;
        const item = result.addresses[0]; // 가장 가까운 검색결과를 사용

        resolve(item);
      },
    );
  });
};

export default geocoder;
