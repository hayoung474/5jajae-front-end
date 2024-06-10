import ShareSVGIcon from '@public/svg/icons/icon_share.svg';
import { ColorsType, theme } from '~/style/theme';

interface IconProps {
  size?: string;
  color?: keyof ColorsType;
}
const Share = ({ size, color }: IconProps) => {
  const width = size ?? '24px';
  const height = size ?? '24px';
  const fill = theme.colors[color ?? 'black'];
  return <ShareSVGIcon width={width} height={height} fill={fill} />;
};

export default Share;
