import { memo } from 'react';
import styled from '@emotion/styled';
import { useChatStore } from '../../store/chatStore.ts';

type HeaderProps = {
  title: string;
};

const Header = memo(({ title }: HeaderProps) => {
  const unselectRoom = useChatStore((state) => state.unselectRoom);
  return <HeaderButton onClick={unselectRoom}>{title}</HeaderButton>;
});

Header.displayName = 'Header';
export default Header;

const HeaderButton = styled.button`
  margin: 0;
  padding: 0.5rem;
`;
