import Badge from './components/common/Badge';
import Text from './components/common/Text';
import SolidButton from './components/common/buttons/SolidButton';
import { Pin, Search } from './components/common/icons';

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

      <SolidButton size='large'>지도 검색</SolidButton>
      <SolidButton size='large' disabled>
        지도 검색
      </SolidButton>
      <SolidButton size='medium'>지도 검색</SolidButton>
      <SolidButton size='medium' backgroundColor='violet_950'>
        지도 검색
      </SolidButton>
      <SolidButton size='medium' disabled>
        지도 검색
      </SolidButton>
      <SolidButton size='medium' disabled>
        <Pin size='16px' />
        지도 검색
      </SolidButton>
      <Badge>각재</Badge>
      <Badge>스터드런너</Badge>
    </div>
  );
}
