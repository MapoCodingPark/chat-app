import { memo } from 'react';
import styled from '@emotion/styled';

type CountBadgeProps = {
  count: number;
  maxCount?: number;
};

const CountBadge = memo(({ count, maxCount = 99 }: CountBadgeProps) => {
  if (count <= 0) {
    return null;
  }

  const displayCount = count > maxCount ? `${maxCount}+` : count;

  return <BadgeWrapper>{displayCount}</BadgeWrapper>;
});

CountBadge.displayName = 'CountBadge';
export default CountBadge;

const BadgeWrapper = styled('span')`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 15px;
  height: 16px;
  padding: 2px 4px;
  border-radius: 999px;
  background-color: #a3130f;
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  white-space: nowrap;
`;
