import TimeSVGIcon from '@public/svg/icons/icon_time.svg';
import { ColorsType, theme } from '~/style/theme';

interface IconProps {
  size?: string;
  color?: keyof ColorsType;
}
const Time = ({ size, color }: IconProps) => {
  const width = size ?? '20px';
  const height = size ?? '20px';
  const fill = theme.colors[color ?? 'black'];
  return <TimeSVGIcon width={width} height={height} fill={fill} />;
};

export default Time;
