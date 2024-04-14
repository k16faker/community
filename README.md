
## 인터넷 커뮤니티 만들어보기

# 기술
- React, Firebase, TailwindCSS

# 목표
- 글 작성 / 글 확인 / 글 수정 / 글 삭제 (수정 및 삭제에는 기존에 첫 작성시 만든 비밀번호 필요)

- 댓글 작성 기능

- 말머리에 따른 분류

- 로그인 기능, 글 검색기능

- 글 목록 클릭시 자세한 글 내용 확인 기능, 글 좋아요/싫어요 기능


# 기능별 구현 방법
- 글 작성 및 확인 및 분류 : firebase에 데이터 업로드 - 컬렉션 이름을 id, 컬렉션 속 문서 이름을 no(랜덤 소수)로 하고, 문서 속 필드에 글 관련 데이터 저장. 불러온 이후 id와 no를 이용해 filtering해서 분류

- 글 수정 및 삭제 : 삭제는 firestore의 deleteDoc 기능으로 구현. 수정은 modify 페이지를 따로 만든 후 기존 글 내용을 받아와서 수정 후
updateDoc을 이용해 업데이트.

- 글 목록 클릭시 자세한 글 내용 확인 : 글의 no를 이용해 클릭시 firebase에 해당 no의 글 데이터 요청 -> DetailPage에서 해당 글 로드

- 좋아요/싫어요 기능 : 글을 작성할 때 문서 필드에 좋아요/싫어요 0으로 작성, 이후 좋아요/싫어요를 한번 누르면 숫자 상승 & localStorage에 글 no+good/bad 저장. 다시한번 누르면 localstorage 확인 후 누른 기록이 있으면 반영 x.

- 로그인 기능 : Firebase Authentication을 이용해 email 회원가입 및 로그인. 로그인 상태는 contextAPI로 구현. user의 uid에 따른 닉네임 확인 기능 추가예정

- 댓글 기능 : firestore의 글 데이터에 comments 배열 추가. 해당 배열 아래에 replies라는 배열을 추가함으로서 대댓글 기능도 추가예정



# 호스팅 주소
- https://mycommunity-rho.vercel.app/
