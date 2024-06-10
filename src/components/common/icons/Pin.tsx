import PinSVGIcon from '@public/svg/icons/icon_pin.svg';
import { ColorsType, theme } from '~/style/theme';

interface IconProps {
  size?: string;
  color?: keyof ColorsType;
}
const Pin = ({ size, color }: IconProps) => {
  const width = size ?? '20px';
  const height = size ?? '20px';
  const fill = theme.colors[color ?? 'black'];
  return <PinSVGIcon width={width} height={height} fill={fill} />;
};

export default Pin;
