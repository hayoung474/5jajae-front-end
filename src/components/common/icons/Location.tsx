import LocationSVGIcon from '@public/svg/icons/icon_location.svg';
import { ColorsType, theme } from '~/style/theme';

interface IconProps {
  size?: string;
  color?: keyof ColorsType;
}
const Location = ({ size, color }: IconProps) => {
  const width = size ?? '24px';
  const height = size ?? '24px';
  const fill = theme.colors[color ?? 'black'];
  return <LocationSVGIcon width={width} height={height} fill={fill} />;
};

export default Location;
