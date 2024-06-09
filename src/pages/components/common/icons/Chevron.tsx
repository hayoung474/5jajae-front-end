import ChevronDownSVGIcon from '@public/svg/icons/icon_chevron_down.svg';
import ChevronUpSVGIcon from '@public/svg/icons/icon_chevron_up.svg';
import ChevronRightSVGIcon from '@public/svg/icons/icon_chevron_right.svg';
import ChevronLeftSVGIcon from '@public/svg/icons/icon_chevron_left.svg';

import { ColorsType, theme } from '~/style/theme';

interface IconProps {
  direction: 'up' | 'down' | 'left' | 'right';
  size?: string;
  color?: keyof ColorsType;
}
const Chevron = ({ direction, size, color }: IconProps) => {
  const width = size ?? '24px';
  const height = size ?? '24px';
  const fill = theme.colors[color ?? 'black'];

  if (direction === 'up') {
    return <ChevronUpSVGIcon width={width} height={height} fill={fill} />;
  }
  if (direction === 'down') {
    return <ChevronDownSVGIcon width={width} height={height} fill={fill} />;
  }
  if (direction === 'right') {
    return <ChevronRightSVGIcon width={width} height={height} fill={fill} />;
  }
  if (direction === 'left') {
    return <ChevronLeftSVGIcon width={width} height={height} fill={fill} />;
  }
};

export default Chevron;
