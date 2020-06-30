202012710 박경근 NODEJS 기말 프로젝트
===

<http://54.180.108.251:3000/>

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
| 음악 리스트 검색 |     /music-search     |  GET   |
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
| 메세지 구조 | memberid    |
|  | name    |
|  | password    |
|  | memberid    |
|  | memberimage    |

##### 요청 메시지

``` json
{
    "memberid":"admin",
    "name": "관리자",
    "password": "1234",
    "memberimage": "https://idu-2020-0710.s3.ap-northeast-2.amazonaws.com/upload/21function%20getMinutes%28%29%20%7B%20%5Bnative%20code%5D%20%7D39513KakaoTalk_20200626_144943005_04.jpg"
}
```

#### 응답
    
``` json
{
    "msg": "success",
    "data": {
        "memberid":"admin",
        "name": "관리자",
        "password": "1234",
        "memberimage": "https://idu-2020-0710.s3.ap-northeast- 2.amazonaws.com/upload/21function%20getMinutes%28%29%20%7B%20%5Bnative%20code%5D%20%7D39513KakaoTalk_20200626_144943005_04.jpg"
     }
}
```

--------------

- ### 로그인

#### 요청

|    업무     | 로그인 |
| :---------: | ------------------ |
|     URL     | /login             |
| 요청 메소드  | POST               |

##### 테스트 유저
memberid : admin
password : 1234

OR

memberid : liu5396
password : 1234

##### 요청 메시지
세션값을 이용하여 요청
``` json
{
    "memberid":"admin",
    "password": "1234",
}
```

#### 응답
    
``` json
{
    "memberid":"admin",
    "name": "관리자",
    "password": "1234",
    "memberimage": "https://idu-2020-0710.s3.ap-northeast- 2.amazonaws.com/upload/21function%20getMinutes%28%29%20%7B%20%5Bnative%20code%5D%20%7D39513KakaoTalk_20200626_144943005_04.jpg"
}
```

--------------

- ### 회원정보 조회

#### 요청

|    업무     |  회원정보 조회            |
| :---------: | ------------------ |
|     URL     | /member-edit-form  |
| 요청 메소드  | GET                |
| 메세지 구조  | memberid           |

##### 요청 메시지

``` json
{
    "memberid":"admin"
}
```

#### 응답
    
``` json
{
    "memberid":"admin",
    "name": "관리자",
    "password": "1234",
    "memberimage": "https://idu-2020-0710.s3.ap-northeast- 2.amazonaws.com/upload/21function%20getMinutes%28%29%20%7B%20%5Bnative%20code%5D%20%7D39513KakaoTalk_20200626_144943005_04.jpg"
}
```

--------------

- ### 회원정보 수정

#### 요청

|    업무     | 회원정보 수정            |
| :---------: | ------------------ |
|     URL     | /member-edit       |
| 요청 메소드  | POST               |
| 메세지 구조  | id                 |
|             | memberid           |
|             | name               |
|             | password           |

##### 요청 메시지

``` json
{
    "id":1,
    "memberid":"admin1",
    "name":"관리자1",
    "password":"2222",
}
```

#### 응답
    
``` json
{
    "msg": "success",
    "data": {
        "memberid":"admin1",
        "name": "관리자1",
        "password": "2222",
        "memberimage": "https://idu-2020-0710.s3.ap-northeast- 2.amazonaws.com/upload/21function%20getMinutes%28%29%20%7B%20%5Bnative%20code%5D%20%7D39513KakaoTalk_20200626_144943005_04.jpg"
     }
}
```

--------------

- ### 음악 목록 전체보기

#### 요청

|    업무     | 음악 목록 전체보기 |
| :---------: | ------------------ |
|     URL     | /music            |
| 요청 메소드 | GET                |

#### 응답
    
``` json
{
    {
        "musicid":1,
        "title": "빈집",
        "artist": "기리보이",
        "soundcloudid": "3463464",
        "genre":"HipHop"
     },
    {
        "musicid":2,
        "title": "호구",
        "artist": "기리보이",
        "soundcloudid": "9483587",
        "genre":"HipHop"
     },
     ....
}
``` 

--------------

- ### 음악 목록 검색

#### 요청

|    업무     | 음악 목록 검색 |
| :---------: | ------------------ |
|     URL     | /music            |
| 요청 메소드 | GET                |
| 메시지 구조 | keyword                |

#### 요청 메시지
``` json
{
    "keyword":"빈집"
}
``` 

#### 응답
    
``` json
{
    {
        "musicid":1,
        "title": "빈집",
        "artist": "기리보이",
        "soundcloudid": "3463464",
        "genre":"HipHop"
     }
}
``` 

--------------

- ### 음악 조회

#### 요청

|     업무      | 음악 조회                                           |
| :-----------: | ------------------------------------------------------------ |
|      URL      | /music-update                                                   |
|  요청 메소드  | GET                                                          |
| 메세지 구조  | musicid                 |

#### 요청 메시지

#### 응답
    
``` json
{
    "musicid":1,
    "title": "빈집",
    "artist": "기리보이",
    "soundcloudid": "3463464",
    "genre":"HipHop"
}

``` 

--------------

- ### 음악 정보 추가

#### 요청

| 업무          | 음악 정보 추가                                               |
| ------------- | ------------------------------------------------------------ |
| URL           | /music                                                      |
| 요청 메소드   | POST                                                         |
| 메세지 구조  | title                 |
|             | artist           |
|             | soundcloudid               |
|             | genre           |


##### 요청 메시지

``` json
{
    "title":"붐바야",
    "artist":"블랙핑크",
    "soundcloudid":"5456321",
    "genre":"Idol"
}
```

#### 응답
    
``` json
{
    "msg": "success",
    "data": {
        "musicid":11,
        "title":"붐바야",
        "artist": "블랙핑크",
        "soundcloudid": "5456321",
        "genre": "Idol"
     }
}
```

--------------

- ### 음악 삭제

#### 요청

| 업무          | 음악 삭제                                               |
| ------------- | ------------------------------------------------------------ |
| URL           | /music-delete/:musicId                                                     |
| 요청 메소드   | GET                                                         |
| 메세지 구조  | musicid                 |


--------------

- ### 음악 수정

#### 요청

| 업무          | 음악 수정                                               |
| ------------- | ------------------------------------------------------------ |
| URL           | /music-update                                                      |
| 요청 메소드   | POST                                                         |
| 메세지 구조  | musicid                 |
|             | title           |
|             | artist           |
|             | soundcloudid               |
|             | genre           |


##### 요청 메시지

``` json
{
    "musicid":10,
    "title":"붐바야",
    "artist":"블랙핑크",
    "soundcloudid":"5456321",
    "genre":"Idol"
}
```

#### 응답
    
``` json
{
    "msg": "success",
    "data": {
        "musicid":10,
        "title":"붐바야",
        "artist": "블랙핑크",
        "soundcloudid": "5456321",
        "genre": "Idol"
     }
}
```

--------------
