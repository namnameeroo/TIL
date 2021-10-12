
checkBox는 ischeck로 boolean 결과를 받을 수 있는데 <br>
사용자 입장에서 더 선택하기 쉬운건 한 로우의 어떤 area영역을 클릭해도
선택할 수 있어야 한다

###<현재>
<ul>
`<tr>` 태그 안에는 한 로우의 정보가 다 들어있다
`input type=checkbox`로 별도의 체크박스를 사용하고 있다
</ul>

###<변경>
<ul>
선택영역을 포괄하는 태그에 `class='selected'`속성을 추가한다
