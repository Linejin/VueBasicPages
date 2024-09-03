# VueBasicPages

## Description
기본 기능들이 구현된 Vue Project

## Setup
```
npm install
```

## Run
```
npm run serve
```

## Pages List
### Home
기본적인 첫 화면을 구성하는 page로 vue의 기본 페이지로 구성
### Popup
popup 기능이 구현된 page
### CountingBtn
입력된 숫자를 2배씩 키우는 page
- counting Btn : 입력된 숫자를 2배
- save : DB에 현재 숫자 값을 저장
- load : DB에 저장했던 숫자 값을 로드하여 반영
### InputBoxes
option selector와 check box로 이루어진 page
최근의 선택값들이 DB에 저장되어 유지되는 구조
### FileuploadPage
File을 업로드 하고 다운로드 할 수 있는 page
같은 이름의 파일 업로드시 임의의 값을 뒤에 이어 붙여 업로드
가장 최근의 파일만 다운로드 가능
- 제한사항 : 1MB
### RegisterPage
ID와 Password를 입력하여 회원가입 or 로그인을 할 수 있는 page
coockie에 대한 처리는 아직 되어있지 않아 로그인을 유지, 로그아웃할 수 있는 기능은 빠져있는 상태
### ImageuploadPage
Image를 upload하여 확인할 수 있는 page
- 사용 가능한 확장자 : jpg, jpeg, png
### CommentPage
댓글 기능이 들어간 page
등록했던 Comment 들을 전부 확인이 가능
- 추가 예정 기능 : 댓글 수정 및 삭제, Pagenation
### MapPage
Kakao Map으로 구성된 page
화면의 중앙에 pin이 배치되며, 해당 page를 다시 진입해도 해당 pin을 중심으로 지도가 보여지도록 구성