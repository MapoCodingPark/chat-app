import { memo } from 'react';
import styled from '@emotion/styled';

type HeaderProps = {
  title: string;
  onClick?: () => void;
};

const Header = memo(({ title, onClick }: HeaderProps) => {
  return <HeaderButton onClick={onClick}>{title}</HeaderButton>;
});

Header.displayName = 'Header';
export default Header;

const HeaderButton = styled.button`
  margin: 0;
  padding: 0.5rem;
`;
