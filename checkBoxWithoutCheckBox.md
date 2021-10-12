
checkBox는 ischeck로 boolean 결과를 받을 수 있는데 <br>
사용자 입장에서 더 선택하기 쉬운건 한 로우의 어떤 area영역을 클릭해도
선택할 수 있어야 한다

<h2><현재></h2>
<ul>
*&#60;tr&#62;* 태그 안에는 한 로우의 정보가 다 들어있다
`input type=checkbox`로 별도의 체크박스를 사용하고 있다
</ul>

<h2><변경 방향></h2>
<p>
<ul>
선택영역을 포괄하는 태그에 \`class='selected'\`속성을 추가하고 삭제하면서
checkbox의 기능을 구현한다<br>
돔으로 추가되는 로우이기 때문에 돔생성 부분에 속성을 추가해야 한다

  ```javascript
  td1_div_div_input.addEventListener("change", function(tr){
			return function(e){
			    e.stopPropagation();
				if(this.classList.contains("selected")){
					tr.classList.remove("selected");
				} else {
					tr.classList.add("selected");
				}
				qnaChecker();
			};
	}(tr));
```
  
\*\*\*  함수 안에 함수가 들어가 있는 경우에 인자를 바깥에 한번 더 넣어줘야한다\*\*\*
  >> 왜인지는 아직 모름 

