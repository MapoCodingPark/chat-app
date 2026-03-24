import ChatPage from './pages/ChatPage.tsx';
import { useEffect } from 'react';
import { startMockMessageStream } from './mock/mockMessageStream.ts';

const App = () => {
  useEffect(() => {
    const endMockMessageStream = startMockMessageStream();
    return endMockMessageStream;
  }, []);

  return (
    <>
      <ChatPage />
    </>
  );
};

export default App;
