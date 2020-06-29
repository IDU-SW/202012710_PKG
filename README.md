202012710 박경근 NODEJS 기말 프로젝트
===

<http://54.180.108.251:3000/>

===

--------------

- ### 요청목록


|        항목        |       URL       | METHOD |
| :----------------: | :-------------: | :----: |
| 메인 페이지   |     /       |  GET   |
| 회원가입 |     /member     |  POST   |
| 로그인 |     /login     |  POST   |
| 회원정보 조회 |     /member-edit-form     |  GET   |
| 회원정보 수정 |     /member-edit     |  POST   |
| 음악 리스트 |     /music     |  GET   |
| 음악 조회 |     /music-update     |  GET   |
| 음악 추가 |     /music     |  POST   |
| 음악 삭제 |     /music-delete/:musicId     |  GET   |
| 음악 수정 |     /music-update     |  POST   |


--------------

- ### 회원가입

#### 요청

|    업무     | 회원가입 |
| :---------: | ------------------ |
|     URL     | /member            |
| 요청 메소드 | POST                |
| 컨텐츠 타입 | application/json    |
| 메세지 구조 | memberid    |
|  | name    |
|  | password    |
|  | memberid    |
|  | memberimage    |


#### 응답

| 컨텐트 타입 | JSON                                                         |
| :---------: | ------------------------------------------------------------ |
| 메세지 구조 | - id : 음악 ID<br />- singer : 가수<br />- song : 노래<br />- genre : 음악 장르<br /> |
|  메세지 예  | {"data":[ <br/>{"id":0,"singer":"weekend","song":"Blinding Lights","genre":"POP"}, <br/>{"id":1,"singer":"Dua Lipa","song":"Physical","genre":"POP"}, <br/>{"id":2,"singer":"JACKBOYS","song":"OUT WEST","genre":"Hip Hop"}, <br/>{"id":3,"singer":"SZA, Justin Timberlake","song":"The Other Side","genre":"POP"}, <br/>{"id":4,"singer":"Arizona Zervas","song":"ROXANNE","genre":"Hip Hop"}], <br/>"count":5}}

--------------

--------------

- ### 음악 목록 전체보기

#### 요청

|    업무     | 음악 목록 전체보기 |
| :---------: | ------------------ |
|     URL     | /music            |
| 요청 메소드 | GET                |

#### 응답

| 컨텐트 타입 | JSON                                                         |
| :---------: | ------------------------------------------------------------ |
| 메세지 구조 | - id : 음악 ID<br />- singer : 가수<br />- song : 노래<br />- genre : 음악 장르<br /> |
|  메세지 예  | {"data":[ <br/>{"id":0,"singer":"weekend","song":"Blinding Lights","genre":"POP"}, <br/>{"id":1,"singer":"Dua Lipa","song":"Physical","genre":"POP"}, <br/>{"id":2,"singer":"JACKBOYS","song":"OUT WEST","genre":"Hip Hop"}, <br/>{"id":3,"singer":"SZA, Justin Timberlake","song":"The Other Side","genre":"POP"}, <br/>{"id":4,"singer":"Arizona Zervas","song":"ROXANNE","genre":"Hip Hop"}], <br/>"count":5}}

--------------

- ### 음악 정보 상세보기

#### 요청

|     업무      | 음악 정보 상세보기                                           |
| :-----------: | ------------------------------------------------------------ |
|      URL      | /music/:musicid                                                   |
|  요청 메소드  | GET                                                          |

#### 응답

| 컨텐트 타입 | JSON                                                         |
| :---------: | ------------------------------------------------------------ |
| 메세지 구조 | - id : 음악 ID<br />- singer : 가수<br />- song : 노래<br />- genre : 음악 장르<br /> |
|  메세지 예  | {"id":1,"singer":"Dua Lipa","song":"Physical","genre":"POP"}

--------------

- ### 음악 정보 추가

#### 요청

| 업무          | 음악 정보 추가                                               |
| ------------- | ------------------------------------------------------------ |
| URL           | /music                                                      |
| 요청 메소드   | POST                                                         |
| 콘텐트 타입   | content-type:x-www-form-urlencoded                           |
| 메세지 구조   | - **singer : 가수**<br />- song : 노래<br />- genre : 장르<br /> |
| 요청메세지 예 | { <br/> "singer" : "아이유",<br/> "song" : "좋은날",<br/> "genre" : "발라드"<br/>} |

#### 응답

| 컨텐트 타입 | JSON                                                         |
| ----------- | ------------------------------------------------------------ |
| 메세지 구조 | - msg : 성공/실패 메세지<br />- data<br />-- id : 음악 ID<br />-- singer : 가수<br />-- song : 음악<br />-- genre : 장르<br /> |
| 메세지 예   | {<br/>    "msg": "SUCCESS",<br/>    "data": {<br/>        "id": 6,<br/>        "singer": 아이유",<br/>        "song": "좋은날",<br/>        "genre": "발라드",<br/>}<br/>} |

--------------

- ### 음악 정보 수정

#### 요청

| 업무          | 음악 정보 수정                                               |
| ------------- | ------------------------------------------------------------ |
| URL           | /music                                                      |
| 요청 메소드   | PUT                                                         |
| 콘텐트 타입   | content-type:x-www-form-urlencoded                           |
| 메세지 구조   | - **id : 노래 id**<br />- singer : 가수<br />- song : 노래<br />- genre : 장르<br /> |
| 요청메세지 예 | { "id" : "4" <br/> "singer" : "아이유",<br/> "song" : "좋은날",<br/> "genre" : "발라드"<br/>} |

#### 응답

| 컨텐트 타입 | JSON                                                         |
| ----------- | ------------------------------------------------------------ |
| 메세지 구조 | - msg : 성공/실패 메세지<br />- data<br />-- id : 음악 ID<br />-- singer : 가수<br />-- song : 음악<br />-- genre : 장르<br /> |
| 메세지 예   | {<br/>    "msg": "SUCCESS",<br/>    "data": {<br/>        "musicID": 4,<br/>        "singer": 아이유",<br/>        "song": "좋은날",<br/>        "genre": "발라드",<br/>}<br/>} |

--------------

- ### 음악 정보 수정

#### 요청

| 업무          | 음악 정보 삭제                                               |
| ------------- | ------------------------------------------------------------ |
| URL           | /music/:musicID                                                      |
| 요청 메소드   | DELETE                                                         |

#### 응답

| 컨텐트 타입 | JSON                                                         |
| ----------- | ------------------------------------------------------------ |
| 메세지 구조 | - msg : 성공/실패 메세지<br />- data<br />-- id : 음악 ID<br />-- singer : 가수<br />-- song : 음악<br />-- genre : 장르<br /> |
| 메세지 예   | {<br/>    "msg": "SUCCESS",<br/>    "data": {<br/>        "musicID": 4,<br/>        "singer": 아이유",<br/>        "song": "좋은날",<br/>        "genre": "발라드",<br/>}<br/>} |
--------------
양식출처 -202012707 김다영-
