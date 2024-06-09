import Text from './components/common/Text';
import { Search } from './components/common/icons';

export default function Home() {
  return (
    <div>
      <Text
        variant='body_1'
        weight='bold'
        color='violet_700'
        truncateLines={1}
        style={{ width: '300px' }}
      >
        hello world! hello world! hello world! hello world! hello world!
      </Text>
      <Search size='50px' color='violet_600' />
    </div>
  );
}
