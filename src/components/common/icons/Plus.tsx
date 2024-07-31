import PlusSVGIcon from '@public/svg/icons/icon_plus.svg';
import { ColorsType, theme } from '~/style/theme';

interface IconProps {
  size?: string;
  color?: keyof ColorsType;
}
const Plus = ({ size, color }: IconProps) => {
  const width = size ?? '16px';
  const height = size ?? '16px';
  const fill = theme.colors[color ?? 'black'];
  return <PlusSVGIcon width={width} height={height} fill={fill} />;
};

export default Plus;
