# AJAX 요청 코드조각

작성일: October 15, 2021 3:08 PM

```jsx
function requestPollListById() {
	jQuery.ajax({
          url : "/getPollListByMemberId.do",
          method : "POST",
          data : "member_id=" + user_id,
          dataType: "JSON", // 옵션
          success : function(data) {
      	  		polls = data;
                updateSurveyTable(data);
          },
          error : function(xhr, status, error) {
        	  console.log("status : " + status + ", xhr : " + xhr + ", error : "+ error);
          }
    });
//생략
}
```

# AJAX 요청

: `Asynchronous JavaScript and XML`

: 새로고침없이 서버에 데이터를 교환할 수 있게 도와주는 것으로 빠르게 동작하는 동적인 웹페이지를 만들기 위한 개발 기법 중 하나이다. 백그라운드에서 서버와 통신해 페이지의 일부만을 갱신할 수 있다.

- AJAX요청에는 url이랑 type이 명시되어야한다
- 콜백이 여기서 나오는구나 (반환된 데이터 받을 때 사용해씅ㅁ)
- 요청 형식

```jsx
$.ajax({
	url: "어쩌구",
	type: "get",
}).done(function(데이터){console.log(데이터}); //callback
```

- ajax와 기존 웹응용 프로그램의 원리 비교
- ajax
1. [웹브라우저] 이벤트 발생
2. [웹브라우저] 자바스크립트 호출
3. [웹브라우저] XMLHttpRequest객체 생성 및요청
4. [서버] Ajax 요청 처리
5. [서버] 응답생성
6. [서버] HTML, XML 또는 JSON 데이터 반환
7. [웹브라우저] HTML및 CSS 데이터로 변환(반환) _ javascript
8. [웹브라우저] 웹페이지 **일부로딩**

- 기존
1. [웹브라우저] 이벤트발생
2. [웹브라우저] HttpRequest 생성 및 요청
3. [서버] HttpRequest 처리
4. [서버] 응답 생성
5. [서버] HTML 및 CSS데이터
6. [웹브라우저] 웹페이지 **전체 re로딩**

![Untitled](AJAX%20%E1%84%8B%E1%85%AD%E1%84%8E%E1%85%A5%E1%86%BC%20%E1%84%8F%E1%85%A9%E1%84%83%E1%85%B3%E1%84%8C%E1%85%A9%E1%84%80%E1%85%A1%E1%86%A8%207f3a71743aef42b2912a39a40c21be7f/Untitled.png)

- 참고 사이트 임베드

[https://codingapple.com/unit/jquery-29-ajax/](https://codingapple.com/unit/jquery-29-ajax/)

[코딩교육 티씨피스쿨](http://tcpschool.com/ajax/ajax_intro_basic)
