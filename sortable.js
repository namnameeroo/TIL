// codepen 에서  src 링크 들어가서 코드 나오는거 복붙해서 
// 별도의 폴더(파일)에 저장하구, ex.extern폴더 > sortable.js
// input_tag.classList.add("classname")
// 

/*

<ul id="sortable">
  <li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>Item 1</li>
  <li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>Item 2</li>
  <li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>Item 3</li>
  <li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>Item 4</li>
  <li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>Item 5</li>
  <li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>Item 6</li>
  <li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>Item 7</li>
</ul>

*/

 function deleteEx(idx){
    console.log(idx);
    if(confirm('운동을 삭제하시겠습니까?')){
      $('li[data-idx='+idx+']').remove();
      sortInit();
    }
  }
