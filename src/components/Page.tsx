import { ErrorBoundary } from 'react-error-boundary';
import { Suspense, useEffect, useState } from 'react';
import { useTestSuspenseQuery } from '~/api/testQueries';
import Text from './common/Text';
import { Pin, Search } from './common/icons';
import SolidButton from './common/buttons/SolidButton';
import Badge from './common/Badge';

export default function Page() {
  return (
    <div>
      <Text variant="body_1" weight="bold" color="violet_700" truncateLines={1} style={{ width: '300px' }}>
        hello world! hello world! hello world! hello world! hello world!
      </Text>
      <Search size="50px" color="violet_600" />

      <SolidButton size="large">지도 검색</SolidButton>
      <SolidButton size="large" disabled>
        지도 검색
      </SolidButton>
      <SolidButton size="medium">지도 검색</SolidButton>
      <SolidButton size="medium" backgroundColor="violet_950">
        지도 검색
      </SolidButton>
      <SolidButton size="medium" disabled>
        지도 검색
      </SolidButton>
      <SolidButton size="medium" disabled>
        <Pin size="16px" />
        지도 검색
      </SolidButton>
      <Badge>각재</Badge>
      <Badge>스터드런너</Badge>

      <Suspense fallback={<div>loading!</div>}>
        <ErrorBoundary fallback={<div>error!</div>}>
          <TestComp />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}

const TestComp = () => {
  const testQuery = useTestSuspenseQuery();
  return <div>{testQuery.data.value}</div>;
};
