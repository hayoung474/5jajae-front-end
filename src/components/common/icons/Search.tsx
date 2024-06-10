import SearchSVGIcon from '@public/svg/icons/icon_search.svg';
import { ColorsType, theme } from '~/style/theme';

interface IconProps {
  size?: string;
  color?: keyof ColorsType;
}
const Search = ({ size, color }: IconProps) => {
  const width = size ?? '24px';
  const height = size ?? '24px';
  const fill = theme.colors[color ?? 'black'];
  return <SearchSVGIcon width={width} height={height} fill={fill} />;
};

export default Search;
