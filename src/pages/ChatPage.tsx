import styled from '@emotion/styled';
import ChatRoomList from '../features/components/ChatRoomList.tsx';
import ChatPanel from '../features/components/ChatPanel.tsx';

const ChatPage = () => {
  return (
    <>
      <PageLayout>
        <ChatRoomList />
        <ChatPanel />
      </PageLayout>
    </>
  );
};

export default ChatPage;

const PageLayout = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
`;
