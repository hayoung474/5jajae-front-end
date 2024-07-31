import MinusSVGIcon from '@public/svg/icons/icon_minus.svg';
import { ColorsType, theme } from '~/style/theme';

interface IconProps {
  size?: string;
  color?: keyof ColorsType;
}
const Minus = ({ size, color }: IconProps) => {
  const width = size ?? '16px';
  const height = size ?? '16px';
  const fill = theme.colors[color ?? 'black'];
  return <MinusSVGIcon width={width} height={height} fill={fill} />;
};

export default Minus;
