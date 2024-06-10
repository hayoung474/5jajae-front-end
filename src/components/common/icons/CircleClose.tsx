import CircleCloseSVGIcon from '@public/svg/icons/icon_circle_close.svg';
import { ColorsType, theme } from '~/style/theme';

interface IconProps {
  size?: string;
  color?: keyof ColorsType;
}
const CircleClose = ({ size, color }: IconProps) => {
  const width = size ?? '20px';
  const height = size ?? '20px';
  const fill = theme.colors[color ?? 'black'];
  return <CircleCloseSVGIcon width={width} height={height} fill={fill} />;
};

export default CircleClose;
