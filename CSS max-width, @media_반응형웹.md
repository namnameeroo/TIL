<H1>단말기 유형에 따라 웹화면의 레이아웃을 조정하기 위해 필요한 css속성</br>미디어쿼리와 최대크기 설정</H1>
<H3><문제상황></H3>
<ul> 크롬 개발자모드에서 모바일환경으로 설정했을 때 하단잘림 현상 발생, footer도 잘림</ul>

  <H3><반응형 웹사이트 크기설정></H3>
 <li>
    <ol>
0. max-width 란? : max-width CSS 속성은 요소의 최대 너비를 설정합니다. 설정한 값 이상의 너비로 키워지지 않는다
  
 속성값 예시 : 
  3.5em; / 75%; / 
  <ul> max-width: none; </ul>
  <ul> max-width: max-content; </ul>
  <ul> max-width: min-content; </ul>
  <ul> max-width: fit-content; </ul>
  <ul> max-width: fill-available; </ul>
  <br>
  <ul> max-width: inherit; </ul>
  <ul> max-width: initial; </ul>
  <ul> max-width: unset; </ul>
 
  
 
1. desktop :
```css
A
@media ( max-width: 1023px ) {
// 가로폭이 1023 이상인 경우에 적용하겠다
  B
}
@media ( max-width: 767px ) {
  C
}
```
2. mobile :
```css
A
@media ( min-width: 768px ) {
  B
}
@media ( min-width: 1024px ) {
  C
}
```
      </li>

* @media 로 시작하는 것은
미디어 쿼리라고 하고, 단말기 유형에 따라 웹이나 앱의 스타일을 수정할 수 있다
    
* 심화
    https://sir.kr/bbs/board.php?bo_table=pb_lecture&wr_id=133&sca=%EB%B0%98%EC%9D%91%ED%98%95%EC%9B%B9
    반응형웹 이해하기
