import CloseSVGIcon from '@public/svg/icons/icon_close.svg';
import { ColorsType, theme } from '~/style/theme';

interface IconProps {
  size?: string;
  color?: keyof ColorsType;
}
const Close = ({ size, color }: IconProps) => {
  const width = size ?? '24px';
  const height = size ?? '24px';
  const fill = theme.colors[color ?? 'black'];
  return <CloseSVGIcon width={width} height={height} fill={fill} />;
};

export default Close;
