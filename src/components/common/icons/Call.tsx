import CallSVGIcon from '@public/svg/icons/icon_call.svg';
import { ColorsType, theme } from '~/style/theme';

interface IconProps {
  size?: string;
  color?: keyof ColorsType;
}
const Call = ({ size, color }: IconProps) => {
  const width = size ?? '24px';
  const height = size ?? '24px';
  const fill = theme.colors[color ?? 'black'];
  return <CallSVGIcon width={width} height={height} fill={fill} />;
};

export default Call;
