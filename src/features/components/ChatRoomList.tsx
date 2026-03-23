import styled from '@emotion/styled';
import { useChatStore } from '../store/chatStore.ts';

type ListWrapperProps = {
  roomSelected: boolean;
};

const ChatRoomList = () => {
  const selectedRoomId = useChatStore((state) => state.selectedRoomId);

  return <ListWrapper roomSelected={!!selectedRoomId}>ho</ListWrapper>;
};

export default ChatRoomList;

const ListWrapper = styled.div<ListWrapperProps>`
  width: ${({ roomSelected }) => (roomSelected ? '10%' : '70%')};
  height: 100%;
  background-color: white;
`;
