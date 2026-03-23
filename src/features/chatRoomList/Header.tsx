import { memo } from 'react';
import styled from '@emotion/styled';

type HeaderProps = {
  title: string;
};

const Header = memo(({ title }: HeaderProps) => {
  return <HeaderWrapper>{title}</HeaderWrapper>;
});

Header.displayName = 'Header';
export default Header;

const HeaderWrapper = styled.h4`
  margin: 0;
`;
