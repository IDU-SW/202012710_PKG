202012710 박경근
===
서비스 작성하고 사용하기
===

#### 개인별 서비스 작성

##### - REST 기반

##### - 통신 규약 작성(엑셀 혹은 README.md)

##### - github Organizations(IDU-SW/2020-1)에 Repositories 생성 후 올리기

##### - gitignore 작성 (node_modules 포함하지 말것)

##### - gitignore.io 참고

#### 팀원의 다른 서비스 사용하기

##### - 팀원의 서비스 다운로드

##### - 서비스 동작시키기

##### - 통신규약을 보고 서비스 사용해보기

##### - 사용 내역 3장 이상 캡쳐(요청/응답이 보이도록, 서로 다른 메소드와 URL)

--------------

- ### 요청목록


| 업무 구분 |        항목        |       URL       | METHOD |
| :-------: | :----------------: | :-------------: | :----: |
|   목록    | 음악 목록 전체보기 |     /music     |  GET   |
|   CRUD    | 음악 정보 상세보기 |   /music/:musicid|  GET   |
|           |   음악 정보 추가   |     /music     |  POST  |

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

