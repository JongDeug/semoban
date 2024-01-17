## 🏴‍☠️ 프로젝트명
세모반(세상 모든 반려견, semoban) [2022.10 ~ 2022.12]  
<br/>

## 🏴‍☠️ 프로젝트 소개
반려동물의 정보를 공유하고, 반려동물에 대해 궁금한 점을 질문하고 답변받는 등 반려동물에 대한 정보를 효율적으로 찾아볼 수 있는 웹 커뮤니티 사이트이다.  
<br/>

[시연영상](https://github.com/JongDeug/semoban/assets/99215801/71d2d8d0-efe7-4b57-88a5-a123a60e283c)  
<br/>

## ⚙ 기술 스택
- Node(express)
- React
- MongoDB
<br/>

## 📙 기능 리스트

|  	 구분명 	         |  	 구분 식별자 	 |  	 기능명 	                |  	 식별자 	 |  	 행위자 	       |
|-------------------|----------------|--------------------------|-----------|-----------------|
|  	 회원 관리 	      |  	 UD-01 	       |  	 로그인 	                |  	 UC-001 	 |  	 회원, 관리자 	 |
|                   |                |  	 로그아웃 	              |  	 UC-002 	 |  	 회원, 관리자 	 |
|                   |                |  	 회원가입 	              |  	 UC-003 	 |  	 회원 	         |
|                   |                |  	 비밀번호 변경 	         |  	 UC-004 	 |  	 회원 	         |
|                   |                |  	 회원정보 수정 	         |  	 UC-005 	 |  	 회원 	         |
|                   |                |  	 아이디 찾기 	           |  	 UC-006 	 |  	 회원 	         |
|                   |                |  	 비밀번호 찾기 	         |  	 UC-007 	 |  	 회원 	         |
|                   |                |  	 회원 탈퇴 	             |  	 UC-008 	 |  	 회원 	         |
|  	 회원 활동 관리 	 |  	 UD-02 	       |  	 작성한 댓글 조회 	      |  	 UC-101 	 |  	 회원 	         |
|                   |                |  	 작성한 게시글 조회 	    |  	 UC-102 	 |  	 회원 	         |
|                   |                |  	 좋아요 한 게시글 조회 	 |  	 UC-103 	 |  	 회원 	         |
|  	 게시판 관리 	    |  	 UD-03 	       |  	 추천 게시글 조회 	      |  	 UC-201 	 |  	 회원 	         |
|                   |                |  	 인기 게시글 조회 	      |  	 UC-202 	 |  	 회원 	         |
|                   |                |  	 게시글 목록 조회 	      |  	 UC-203 	 |  	 회원 	         |
|                   |                |  	 게시글 상세 조회 	      |  	 UC-204 	 |  	 회원 	         |
|                   |                |  	 게시글 등록 	           |  	 UC-205 	 |  	 회원, 관리자 	 |
|                   |                |  	 게시글 수정 	           |  	 UC-206 	 |  	 회원, 관리자 	 |
|                   |                |  	 게시글 삭제 	           |  	 UC-207 	 |  	 회원, 관리자 	 |
|                   |                |  	 게시글 추천 	           |  	 UC-208 	 |  	 회원 	         |
|                   |                |  	 게시글 검색 	           |  	 UC-209 	 |  	 회원 	         |
|                   |                |  	 댓글 작성 	             |  	 UC-210 	 |  	 회원 	         |
|                   |                |  	 댓글 조회 	             |  	 UC-211 	 |  	 회원 	         |
|                   |                |  	 댓글 수정 	             |  	 UC-212 	 |  	 회원 	         |
|                   |                |  	 댓글 삭제 	             |  	 UC-213 	 |  	 회원, 관리자 	 |
|  	 뉴스 관리 	      |  	 UD-04 	       |  	 뉴스 목록 조회 	        |  	 UC-301 	 |  	 회원 	         |
|                   |                |  	 뉴스 기사 상세 조회 	   |  	 UC-302 	 |  	 회원 	         |
|                   |                |  	 뉴스 영상 상세 조회 	   |  	 UC-303 	 |  	 회원 	         |
|  	 알림 관리 	      |  	 UD-05 	       |  	 댓글 알림 목록 조회 	   |  	 UC-401 	 |  	 회원 	         |
|                   |                |  	 댓글 알림 항목 삭제 	   |  	 UC-402 	 |  	 회원 	         |  
<br/>

## 👨‍👩‍👧‍👦 담당 파트

백엔드 
- [회원 관리 UD-01] 모두
- [회원 활동 관리 UD-02] 좋아요한 게시글 조회
- [게시판 관리 UD-03] 댓글 기능 제외 모두
- [알림 관리UD-05] 모두
<br/>

## 🎉 프로젝트하면서 배운 점, 보완해야 할 것
- 이론으로 공부하는 거랑 직접 만들어보는 거랑 큰 차이가 있음을 느꼈다.
- 코드가 많아지고, 시간이 지날수록 내가 짠 코드를 이해하지 못하는 경우가 종종 있었는데 이때 주석의 필요성을 깨달았다.
- 서버에 이미지를 올리는 과정이 꽤나 까다롭다는 것을 알게 됐고 보완이 필요하다.
- 알림 관리 같은 경우 Real-Time이 아니라 페이지 새로고침을 해야 되는데 다음번엔 Real-Time으로 만들어봐야겠다.
