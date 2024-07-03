declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

/** 성공 응답 */
type ResponseDTO<T = void> = {
  status: string;
  message?: string;
  data: T;
};

/** map */
type NaverMap = naver.maps.Map;
type NaverMapMarker = naver.maps.Marker;
type Coordinates = { lat: number; lng: number };
