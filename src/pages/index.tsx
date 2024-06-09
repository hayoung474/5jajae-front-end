import Text from './components/common/Text';

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
    </div>
  );
}
