import CopySVGIcon from '@public/svg/icons/icon_copy.svg';
import { ColorsType, theme } from '~/style/theme';

interface IconProps {
  size?: string;
  color?: keyof ColorsType;
}
const Copy = ({ size, color }: IconProps) => {
  const width = size ?? '16px';
  const height = size ?? '16px';
  const fill = theme.colors[color ?? 'black'];
  return <CopySVGIcon width={width} height={height} fill={fill} />;
};

export default Copy;
