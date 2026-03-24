# 📌 실시간 채팅 웹 애플리케이션

## 1. 프로젝트 소개

여러 채팅방에서 메시지를 주고받을 수 있는 **실시간 채팅 웹 애플리케이션**입니다.
서버 없이도 동작하도록 mock 데이터를 기반으로 구현했으며,
메시지 전송/수신, unread 처리, 채팅방 정렬 등 실제 채팅 서비스에서 필요한 상태 흐름을 중심으로 설계했습니다.

---

## 2. 기술 스택

* React
* TypeScript
* Zustand (전역 상태 관리)
* Emotion (스타일링)
* Vite

---

## 3. 실행 방법

```bash
npm install
npm run dev
```

---

## 4. 프로젝트 구조

```txt
src/
  pages/
    ChatPage.tsx                # 전체 채팅 화면

  features/                    # 페이지를 구성하는 UI 단위
    chatRoomList/
      ChatRoomList.tsx
      ChatRoomListItem.tsx

    chatPanel/
      ChatPanel.tsx
      MessageItem.tsx
      MessageInput.tsx

  store/
    chatStore.ts               # 전역 상태 관리 (Zustand)

  mock/
    chatMock.ts                # 초기 mock 데이터
    chatMockMessageStream.ts   # 메시지 수신 시뮬레이션

  types/
    chat.ts                    # 도메인 타입 정의

  styles/
    token.ts                   # 디자인 토큰
```

---

## 5. 구조 설계 의도

### 5.1 Feature 기반 UI 분리

`features`는 페이지를 구성하는 UI 단위로 분리했습니다.

* `chatRoomList`: 채팅방 목록 영역
* `chatPanel`: 메시지 영역 및 입력창

UI와 상태 로직을 분리하여 **컴포넌트 책임을 명확하게 유지**했습니다.

---

### 5.2 상태 관리 (Zustand)

채팅과 관련된 상태를 `chatStore`에서 일관되게 관리합니다.

주요 상태:

* `chatRooms`: 채팅방 목록 (unread, lastMessage 포함)
* `messagesByRoomId`: 채팅방별 메시지 목록
* `selectedRoomId`: 현재 선택된 채팅방
* `usersById`: 사용자 정보

주요 액션:

* `selectRoom`
* `sendMessage`
* `receiveMessage`

---

### 5.3 파생 상태 관리 전략

채팅방 목록에서 빠른 렌더링과 정렬을 위해
다음 정보를 `ChatRoom`에 포함시켰습니다.

* `lastMessage`
* `unreadCount`

이를 통해:

* 채팅방 목록 렌더링 시 추가 계산 없이 바로 사용 가능
* 최근 메시지 기준 정렬을 효율적으로 처리

---

### 5.4 메시지 처리 로직 통합

메시지 전송과 수신 모두 동일한 흐름으로 처리하기 위해
공통 로직을 분리했습니다.

* 메시지 추가
* 채팅방 lastMessage 갱신
* unreadCount 처리
* 채팅방 정렬

이를 통해 **중복 로직을 제거하고 상태 일관성을 유지**했습니다.

---

### 5.5 Mock 기반 실시간 처리

서버 없이도 동작할 수 있도록
`setInterval` 기반 메시지 수신 시뮬레이션을 구현했습니다.

* 임의의 채팅방에 메시지 생성
* 현재 방 여부에 따라 unread 처리
* 채팅방 정렬 갱신

---

## 6. 주요 기능

### 채팅방 목록

* 채팅방 이름, 마지막 메시지, 시간, unreadCount 표시
* 최근 메시지 기준 자동 정렬
* 채팅방 클릭 시 메시지 목록 표시

---

### 메시지 목록

* 보낸 사람 / 받은 사람 구분 UI
* 메시지 시간 표시
* 최신 메시지 기준 렌더링

---

### 메시지 전송

* Enter로 전송
* Shift + Enter로 줄바꿈
* 빈 메시지 전송 방지
* 전송 후 입력창 초기화

---

### 메시지 수신

* mock 기반 실시간 메시지 생성
* 현재 방이 아닐 경우 unreadCount 증가
* 채팅방 목록 자동 정렬

---

## 7. 구현 범위

### 완료

* 채팅방 목록
* 메시지 목록
* 메시지 전송
* mock 메시지 수신
* unread 처리
* 채팅방 정렬

---

### 추가 고려 (시간 부족으로 미구현)

* 자동 스크롤 (현재 위치 기반)
* 새 메시지 도착 배너
* 메시지 날짜 그룹핑
* 채팅방 검색
* 반응형 UI

---

## 8. 개선 방향

* 메시지 리스트 virtualization 적용
* websocket 기반 실시간 처리로 확장
* optimistic UI 적용
* 에러 처리 및 재시도 UX 개선
* 컴포넌트 단위 테스트 추가

---

## 9. 회고

상태 관리 구조와 UI를 분리하면서
채팅 애플리케이션에서 발생하는 상태 변화 흐름을 명확하게 설계하는 데 집중했습니다.

특히 메시지 전송과 수신을 동일한 흐름으로 처리하면서
상태의 일관성과 확장 가능성을 고려했습니다.
