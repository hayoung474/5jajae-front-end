import ChevronRightTightSVGIcon from '@public/svg/icons/icon_chevron_right_tight.svg';
import { ColorsType, theme } from '~/style/theme';

interface IconProps {
  size?: string;
  color?: keyof ColorsType;
}
const ChevronRightTight = ({ size, color }: IconProps) => {
  const width = size ?? '16px';
  const height = size ?? '24px';
  const fill = theme.colors[color ?? 'black'];
  return <ChevronRightTightSVGIcon width={width} height={height} fill={fill} />;
};

export default ChevronRightTight;
