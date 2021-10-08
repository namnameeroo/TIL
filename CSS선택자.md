# CSS 선택자

### CSS는 HTML의 스타일을 입히는 일을 한다.
### HTML파일 안에서 정확히 어떤 놈의 스타일을 바꿔줄지
### 정확히 짚어주는 게 `선택자`이다


```
<html 예시>
	<div class="dialog_line_input" >
		<div id="dialog_linkedanswer_box" class="card-body" style="width:670px; height: 350px; overflow: auto;">
				<table style="width: 100%;" id="table_mylinkedanswer" class="table table-hover table-striped table-bordered">
					<thead>
						<tr>
							<th>번호</th>
							<th>내용</th>
							<th>타입</th>
							<th>삭제</th>
						</tr>
					</thead>
					<tbody>
						
					</tbody>
				</table>
		</div>
	</div>
```

## 기본 선택자
*  전체 선택자는 모든 영역에 스타일을 적용한다 `*`<br>
  예시 : `* { margin: 0 auto; }`
  
* 태그의 이름을 사용할때는 아무기호없이 쓴다<br>
  예시 : `div { color: red; }`
 
* `.dialog_line_input`
* `.클래스명` class이름이 같은 태그에 모두 적용된다<br>

* `#dialog_linkedanswer_box`
* `.ID명` id가 같은 태그에 모두 적용된다.<br>

## 복합 선택자<br>
1. 하위 선택자 (아래에 있는 전부, 자식을 포함)<br>
  `  `공백을 사용해 표시
  `section ul {margin: 0px; }`

2. 자식 선택자 (바로 아래의 요소: 자식)<br>
  `>` 기호를 사용해 표시
  `section > ul {margin: 0px; }`
 
 <a link="https://ssungkang.tistory.com/entry/css-css-%EC%84%A0%ED%83%9D%EC%9E%90selector-%EC%9D%98-%EC%A2%85%EB%A5%98%EC%99%80-%EC%98%88%EC%8B%9C"/>
