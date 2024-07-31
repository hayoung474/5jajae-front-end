import RefreshSVGIcon from '@public/svg/icons/icon_refresh.svg';
import { ColorsType, theme } from '~/style/theme';

interface IconProps {
  size?: string;
  color?: keyof ColorsType;
}
const Refresh = ({ size, color }: IconProps) => {
  const width = size ?? '24px';
  const height = size ?? '24px';
  const fill = theme.colors[color ?? 'black'];
  return <RefreshSVGIcon width={width} height={height} fill={fill} />;
};

export default Refresh;
