/**
 * 
 */
 $(window).on('pageshow', function(e) {
	onLoaded(e);
});

function onLoaded() {
//	pollStageEvent();
	getPoll();

}

function pollStageEvent(){

	var current_fs, next_fs, previous_fs; // fieldsets
	var opacity;
	var current = 1;
	var steps = $("fieldset").length;
	setProgressBar(current);
	
	$(".next").click( 
			function() { 
				current_fs = $(this).parent();
				next_fs = $(this).parent().next();

				$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

				next_fs.show();
				current_fs.animate({
					opacity : 0
				}, {
					step : function(now) {
						opacity = 1 - now;

						current_fs.css({
							'display' : 'none',
							'position' : 'relative'
						});
						next_fs.css({
							'opacity' : opacity
						});
					},
					duration : 500
				});
				setProgressBar(++current);
			}
	);

	// 달력 팝업창
	$(".previous").click(
			function() {

				current_fs = $(this).parent();
				previous_fs = $(this).parent().prev();

				// Remove class active
				$("#progressbar li").eq($("fieldset").index(current_fs))
						.removeClass("active");

				// show the previous fieldset
				previous_fs.show();

				// hide the current fieldset with style
				current_fs.animate({
					opacity : 0
				}, {
					step : function(now) {
						// for making fielset appear animation
						opacity = 1 - now;

						current_fs.css({
							'display' : 'none',
							'position' : 'relative'
						});
						previous_fs.css({
							'opacity' : opacity
						});
					},
					duration : 500
				});
				setProgressBar(--current);
			}
		);
		
	function setProgressBar(curStep) {
		var percent = parseFloat(100 / steps) * curStep;
		percent = percent.toFixed();
		$(".progress-bar").css("width", percent + "%")
	}
	$(".submit").click(function() {
		return false;
	});
}

function getPoll(){
	let address = window.location.pathname.split("/")[window.location.pathname.split("/").length-1].split(".do")[0];

	jQuery.ajax({
	    url : "/getSurveyByMemberAndPollId.do",
	    method : "POST",
	    data :{
	    	"address" : address
	    },
	    contentType: "application/x-www-form-urlencoded; charset=UTF-8",  
	    dataType: "JSON", // 옵션
	    complete : function(data) {
	    	data = data.responseJSON;
	    	console.log(data);
	    	
	    	if(checkCookie(data)){

		    	let questions = data.questions;
		    	
		    	writeTitle(data.title, data.content)					// 설문 제목, 설문 설명 화면에 띄우기
		    	
		    	for(let i = 0; i < questions.length; i++){     // 하나씩 돌면서 화면에 띄우자 
		    		addQuestionDOM(questions[i], i+1);  		//  Q index 는 1부터 
		    	}
		    	console.log("마지막 문항 출력완료")
		    	
		    	// 제출 버튼
		    	document.querySelector(".btn-submit").addEventListener("click", submitEvent(data));
	    	}
	    	console.log(data)
			Q = data;
//			addSubmitEvent(data.responseJSON);
	    },
	    error : function(xhr, status, error) {
	  	  console.log("status : " + status + ", xhr : " + xhr + ", error : "+ error);
	    }
	});
}





function writeTitle(title, content) {
	let wrapper = document.querySelector(".container-fluid");
	let surveyTitle = title;
	let surveyContent = content;
	
	let row = document.createElement("div");
	row.classList.add("row");
	let row_div = document.createElement("div");
	row_div.classList.add("Survey_Title")
	wrapper.appendChild(row);
	row.appendChild(row_div);
	
	let headForTitle = document.createElement("h4");
	headForTitle.innerHTML = surveyTitle;
	let pForContent = document.createElement("p");
	pForContent.innerHTML = surveyContent;
	row_div.appendChild(headForTitle)
	row_div.appendChild(pForContent)
	
}


// 문항추가 dom
function addQuestionDOM(question, num){
	let wrapper = document.querySelector(".container-fluid");
	let type = question.type;
//	let type = "3";
	let title =  (num) + ". " + question.content; // num= idx+1
//	let q_id = question.question_id;
	let q_num = "question_" + num ;				 // id도 1부터 시작함
		
	let row = document.createElement("div");
	row.classList.add("row");
	wrapper.appendChild(row);
	
	let row_div = document.createElement("div");
	row_div.classList.add("input-field", "col", "s12", q_num);
	row.appendChild(row_div);
	
	let p_title = document.createElement("p");
	p_title.innerText = title;
	p_title.classList.add("question-title")
	row_div.appendChild(p_title);
	
	if(type == "1"){   //단답형
		
		let input = document.createElement("input");
		input.id = q_num;
		input.name = q_num;
		input.type = "text";
		input.classList.add("validate");
//		input.required = true;
		row_div.appendChild(input);
		
		/* 움직이는 제목
		let label = document.createElement("label");
		label.htmlFor = "question_" + idx;
		label.innerText = title;
		row_div.appendChild(label);
		*/
		console.log(q_num, type)
		
		
	} else if(type == "2") { //체크박스(다중)
		
		let as = question.answers;
		if (as.length==0 || as==undefined){
			console.log(q_num,"문항에 오류가 있습니다.")
		} else{
			
			for(let i = 0; i < as.length; i++){
				let p = document.createElement("p");
				p.htmlFor = q_num;
				row_div.appendChild(p);
				
				let input = document.createElement("input");
				input.type = "checkbox";
				input.name = q_num;
				input.id = q_num + "_" + (i + 1); // 보기id도 1부터
//			input.required = true;
				p.appendChild(input);
				
				let label = document.createElement("label");
				label.htmlFor = q_num + "_" + (i + 1);
				label.innerText = as[i].content;
				p.appendChild(label);
			
		}

			
		}
		
	} else if(type == "3"){ //라디오(단일답변)
		
		let as = question.answers;
		if (as.length==0 || as==undefined){
			console.log(q_num,"문항에 오류가 있습니다.")
		} else{
			for(let i = 0; i < as.length; i++){
				let p = document.createElement("p");
				p.htmlFor = q_num;
				row_div.appendChild(p);
				
				let input = document.createElement("input");
				input.type = "radio";
				input.name = q_num;
				inputId = q_num + "_" + (i + 1);
				input.id = inputId;
//			input.required = true;
				p.appendChild(input);
				
				let label = document.createElement("label");
				label.setAttribute("for", inputId);
				label.innerText = as[i].content;
				p.appendChild(label);
			}
			
		}
		
	} else if(type == "4") { //순위형
//		let p_title = document.createElement("p");
//		p_title.innerText = title;
//		row_div.appendChild(p_title);
		let as = question.answers;
		if (as.length<=1 || as==undefined){
			console.log(q_num,"문항에 오류가 있습니다.")
		};
		
		let sort_form = document.createElement("form");
		sort_form.id = "sort-it";
		row_div.appendChild(sort_form)
		
		let form_ol = document.createElement("ol")
		sort_form.appendChild(form_ol)
		let answers = question.answers;
		for (let i = 0; i < answers.length; i++){
			let li = document.createElement("li");
			
			li.htmlFor = q_num;
			li.innerText = answers[i].content;
			li.id = "answer-id-"+answers[i].number;   // 보기 ID
			form_ol.appendChild(li);

			let label = document.createElement("label");
			input_id = q_num + "_" + (i + 1);
			label.htmlFor = input_id;
			li.appendChild(label);
			
			let rank_input = document.createElement("input");
			rank_input.name = q_num;
			rank_input.id = input_id;
			rank_input.type = "number" ;
			rank_input.min ="1";
			li.appendChild(rank_input);
			
			console.log(q_num, answers[i].content, ", 번호:", answers[i].number)


		}
		
		$('#sort-it ol').sortable({
			onDrop: function(item) {
				$(item).removeClass("dragged").removeAttr("style");
				$("body").removeClass("dragging");

				getInitialOrder('#sort-it li');
			}
		});
        
//		getInitialOrder('#sort-it li');
     
		//bind stuff to number inputs
		$('#sort-it ol input[type="number"]').focus(function(){
			$(this).select();	
		}).change(function(){
			updateAllNumbers($(this), '#sort-it input');
		}).keyup(function(){
			updateAllNumbers($(this), '#sort-it input');
		});
  
	    //bind to form submission
	    $('#sort-it').submit(function(e){
	      reorderItems('#sort-it li', '#sort-it ol');
	      e.preventDefault();
	    });
        
        function getInitialOrder(obj){
    		var num = 1;
    		$(obj).each(function(){
           //set object initial order data based on order in DOM
    			$(this).find('input[type="number"]').val(num).attr('data-initial-value', num); 
    			num++;
    		});
          $(obj).find('input[type="number"]').attr('max', $(obj).length); //give it an html5 max attr based on num of objects
        }
    	
	    function updateAllNumbers(currObj, targets){
	            var delta = currObj.val() - currObj.attr('data-initial-value'), //if positive, the object went down in order. If negative, it went up.
	                    c = parseInt(currObj.val(), 10), //value just entered by user
	                    cI = parseInt(currObj.attr('data-initial-value'), 10), //original object val before change
	                    top = $(targets).length;
	            
	            //if the user enters a number too high or low, cap it
	            if(c > top){
	                currObj.val(top);
	            }else if(c < 1){
	                currObj.val(1);
	            }
	            
	    		$(targets).not($(currObj)).each(function(){ //change all the other objects
	    			var v = parseInt($(this).val(), 10); //value of object changed		
	    				
	    			if (v >= c && v < cI && delta < 0){ //object going up in order pushes same-numbered and in-between objects down
	    				$(this).val(v + 1);
	    			} else if (v <= c && v > cI && delta > 0){ //object going down in order pushes same-numbered and in-between objects up
	    				$(this).val(v - 1);
	    			}
	    		}).promise().done(function(){
	    			//after all the fields update based on new val, set their data element so further changes can be tracked 
	    			//(but ignore if no value given yet)
	    			$(targets).each(function(){
	    				if($(this).val() !== ""){
	    					$(this).attr('data-initial-value', $(this).val());
	    				}
	    			});
	    		});
	    }

	    function reorderItems(things, parent){
	      for(var i = 1; i <= $(things).length; i++){
	        $(things).each(function(){
	          var x = parseInt($(this).find('input').val(), 10);
	          if(x === i){
	            $(this).appendTo(parent);
	          }
	        });
	      }
	    }
		
	} else if(type == "5"){ //파일
		row_div.classList.add("file-field");

		let btn = document.createElement("div");
		btn.classList.add("btn");
		row_div.appendChild(btn);
		
		let btn_span = document.createElement("span");
		btn_span.innerText = "파일선택";
		btn.appendChild(btn_span);
		
		let btn_input = document.createElement("input");
		btn_input.type = "file";
		btn_input.id = "user-file";
		btn_input.accept = "image/*";   // accept 파일 조건추가
		btn_input.setAttribute("multiple", true);   // accept 파일 조건추가
//		btn_input.required = true;
		btn.appendChild(btn_input);
		
		let filePathWrapper = document.createElement("div");
		filePathWrapper.classList.add("file-path-wrapper");
		row_div.appendChild(filePathWrapper);
		
		let filePathWrapper_input = document.createElement("input");
		filePathWrapper_input.classList.add("file-path", "validate");
		filePathWrapper_input.type = "text";
		filePathWrapper_input.placeholder = "png, jpg 등 사진파일만 가능합니다.";
		filePathWrapper.appendChild(filePathWrapper_input);
		
		let input_field = document.createElement("div");
		input_field.classList.add("input-field");   // input_field 였는데 스타일 적용이 누락된 게 보여서 변경해봄 test
		row_div.appendChild(input_field);
		
		document.querySelector("#user-file").addEventListener("input", handleImgFileSelect)
		
//		let fileName = fn_submit(q_num);
//		console.log(q_num, type)

	} else if(type == "6") { //날짜
		 
		console.log(`type= ${type}, 날짜형 문항, ${num} `)
		
		/*
		let label = document.createElement("label");
		label.htmlFor =  "question_" + idx;
		label.innerText = 
		row_div.appendChild(label);*/
		
		let input_date = document.createElement("input");
		input_date.type = "date";
		input_date.classList.add("datepicker");
		input_date.id = q_num;
		input_date.setAttribute("data-error","#e5");
		input_date.placeholder = "클릭하시면 날짜를 선택할 수 있습니다.";
		row_div.appendChild(input_date);
		
	  $("#question_" + num).pickadate({
		    selectMonths: true, 
		    selectYears: 15
		  });
	  
		console.log(q_num, type)

	} else if(type == "7") { // 시간
		console.log(q_num, type)
		
	} else {
		console.log(num, type, "확인되지 않은 type")

		let answers = question.answers;
		for(let i = 0; i < answers.length; i++){
			let p = document.createElement("p");
			p.htmlFor = q_num;
			row_div.appendChild(p);
			
			let input = document.createElement("input");
			input.type = "checkbox";
			input.name =q_num;
			input.id = q_num + "_" + (i + 1);     // 문항번호 1부터
//			input.required = true;
			p.appendChild(input);
			
			let label = document.createElement("label");
			label.htmlFor = q_num + "_" + i;
			label.innerText = answers[i].content;
			p.appendChild(label);
		}
		
		
	}
	
}

//제출버튼 => 문항마다 돌면서 입력값 받기 => 넘기기
function submitEvent(data){
	let poll_id = data.poll_id;
	let questions = data.questions
	let user_id = data.host_id

	new Promise(function(resolve, reject){
		let responses = [];
		for (let i = 0; i < questions.length; i++) {
			
			let q = questions[i];    // poll 의 문항1, 문항2,
			let type = q.type;       // 문항별 타입 : 단답식, 쳌박, 라디오, 순위형, 파일형, 날짜형, 시간형
			let as = q.answers      // 문항별 보기
			let num = i + 1
			let q_num = "question_" + num
			let q_area = document.querySelector('div.input-field.col.s12.'+ q_num) // 영역한정
			let user_input = "";
			
			if (type == '1') {    // 단답식 document.querySelector("#question_0").value
				user_input = document.querySelector("input#"+ q_num).value
				
			} else if(type == '2' || type == '3'){   //객관식 (체크/라디오)
				let as = q.answers;
				for (j=0; j < as.length; j++){
					input_cheked = document.querySelector('input#'+q_num+'_' + (j+1) + ':checked');
					if (!input_cheked) {
						continue
					} else {
						user_input = (user_input=='') ? as[j].number : user_input + "," + as[j].number;
					}
				};
				
				
			} else if (type == '4'){ // 순위형, 보기고유값id : answer-id-3 
				let as = q.answers;
				for (j=0;  j < as.length; j++){
					
					answerId =  q_area.querySelectorAll("li")[j].id.slice(10);
					user_input += answerId
					console.log(user_input)
				}
				
			} else if (type == '5'){   // 파일형
				
				fn_submit()
//				.then(function(result){
					console.log(q_num, result, "RESULT")
					console.log(q_num, user_input, "USER_INPUT")
//					user_input = result;
//				})
//				.catch(
//						function(reason){
//							console.log('promise 거부됨')	
//							user_input = "imgError"
//						})
				console.log("fn_upload 종료")
				
			} else{						// 날짜형, 시간형
				user_input = "2011-12-13";
			};
			
			responses.push(user_input);
			console.log(i, user_input);
			console.log(responses);
			
		};
		resolve(responses);
		
	})
	.then (function(result){
		
		// 1021 기준 DB에 answer_id, user_id, ip_address, type 안들어가고 있음
		console.log("AJAX 제출 요청")
		jQuery.ajax({
			url : "/submitSurvey.do",
			method : "POST",
			data :  {
				"poll_id" : poll_id,
				"questions": JSON.stringify(data.questions),
				"vote" : JSON.stringify(result),
				"userAgent": window.navigator.userAgent
			},
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",  
			dataType: 'text',       // json 에서 txt로 변경(java변경X)
			complete : function(result) {
				console.log(data);
				alert("설문이 완료되었습니다.");
				CloseWindow();
				setCookie("lastSurvey_sd", data.poll_id);
			},
			error : function(xhr, status, error) {
				console.log("status : " + status + ", xhr : " + xhr + ", error : "+ error);
			}
		});
		
		
	})
	.catch(
			consol.log("submit error"))
}

function setCookie(cname, cvalue) {
	  var d = new Date();
	  d.setTime(d.getTime() + (30*60*1000)); // 30분
	  var expires = "expires="+ d.toUTCString();
	  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
} 
function getCookie(cname) {
	  var name = cname + "=";
	  var decodedCookie = decodeURIComponent(document.cookie);
	  var ca = decodedCookie.split(';');

	  for(var i = 0; i <ca.length; i++) {
	    var c = ca[i];
	    while (c.charAt(0) == ' ') {
	      c = c.substring(1);
	    }
	    if (c.indexOf(name) == 0) {
	      return c.substring(name.length, c.length);
	    }
	  }

	  return "";
} 

function checkCookie(data) {
	return true // 임시로 풀어놓기 쿠키
	
	  var lastCookie = getCookie("lastSurvey_sd");
	  if (lastCookie == null || lastCookie == "" || lastCookie == "undefined") {
	  } else if(lastCookie == data.poll_id + ""){
		   alert("설문조사를 이미 완료하셨습니다.");
		   window.location.href = 'http://www.google.com/';
		   return false;
	  } 
	  return true
	  
	  console.log("설문조사 시작");
	  
	   //username = prompt("이름을 입력해주세요.:", "");
}

// input 클릭할 때 changeEvent발생할때 그때 딱 사진입력할때
function handleImgFileSelect(e) {
    var files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);

    var reg = /(.*?)\/(jpg|jpeg|png|bmp)$/; // 여기에 허용확장자입니다 나미씨

    filesArr.forEach(function(f) {
        if (!f.type.match(reg)) {
            alert("확장자는 이미지 확장자만 가능합니다.");
            e.target.value = null // 입력값 초기화 어떻게?
//            return false;
        }

        sel_file = f;

        var reader = new FileReader();
        reader.onload = function(e) {
            $("#img").attr("src", e.target.result);
        }
        reader.readAsDataURL(f);
    });
}


//파일 업로드
function fn_submit(q_num){		
	    let userFiles = document.querySelector("."+q_num+" #user-file");
	    let userFileList = [];
	    
	    // document.querySelector(".question_3 #user-file").files[0]
	    // uploadFile = $("."+q_num+" #user-file")[0].files[0];
	    
	    for (i = 0; i < userFiles.files.length; i++) {
	    	let uploadFile = userFiles.files[i];
	    	
	    	if (!uploadFile || uploadFile==undefined) {
	    		console.log("file undefined")
	    		reject()
	    		
	    	} else {
	    		let form = new FormData();   // 여기서 파일 입력 예외처리
	    		let newName = getCurrentDate() +"_"+ i;
	    		form.append('svName', newName);    // 변경할 fileName
	    		form.append( "file1", uploadFile );
	    		console.log("AJAX 요청")

	    		jQuery.ajax({
	    			url : "/survey/fileUpload.do",
	    			type : "POST",
	    			processData : false,
	    			contentType : false,
	    			dataType : "text",
	    			data : form,
	    			success: function (res)
	    	        {
	    				console.log("file upload success", res)
	    	            userFileList.push(res);
	    	        },
	    			error: function(jqXHR, exception) {
	    				console.log(error);
	    			}
	    		});

	    	} //else
	    }
	    (userFileList)
		

};



/* 




new promise function (resolve, reject){
return {
	if (input==1){

}
}

}
	resolve()
} else {
	reject()
}

document.querySelector("#input-0").addEventListener("click", plus)
function plus = () => {
	return
}


const func = () => {
	return () => {
	  console.log('hello');
	};
  };

const func = () => {
	console.log('hello');
};



///////////////////////
*/

/*
// callback 필요
function AjaxRequest(address, inputData) {
	jQuery.ajax({
		url : address,
		type : "POST",
		processData : false,
		contentType : false,
		dataType: JSON,
		data : inputData, 
		success: function (json, aJaxtatus)
        {
            //var imageUploadJson = $.trim(json) ;
            var imageUploadJson = JSON.parse(json);
            if (imageUploadJson.status == "OK") {
                mainImageUrl = imageUploadJson.url.slice(9, imageUploadJson.url.length);
                // ajaxMainImg(mainImageUrl);
            } else {
                //alert(imageUploadJson.status);
            }
            a=imageUploadJson;
        },
		error: function(jqXHR, exception) {
			if (jqXHR.status === 0) {
				alert('Not connect.\n Verify Network.');
			} 
			else if (jqXHR.status == 400) {
				alert('Server understood the request, but request content was invalid. [400]');
			} 
			else if (jqXHR.status == 401) {
				alert('Unauthorized access. [401]');
			} 
			else if (jqXHR.status == 403) {
				alert('Forbidden resource can not be accessed. [403]');
			} 
			else if (jqXHR.status == 404) {
				alert('Requested page not found. [404]');
			} 
			else if (jqXHR.status == 500) {
				alert('Internal server error. [500]');
			} 
			else if (jqXHR.status == 503) {
				alert('Service unavailable. [503]');
			} 
			else if (exception === 'parsererror') {
				alert('Requested JSON parse failed. [Failed]');
			} 
			else if (exception === 'timeout') {
				alert('Time out error. [Timeout]');
			} 
			else if (exception === 'abort') {
				alert('Ajax request aborted. [Aborted]');
			} 
			else {
				alert('Uncaught Error.n' + jqXHR.responseText);
			}
		}
	});
	return a
};
*/
/*
jQuery.ajax({
	url : "/survey/fileUpload.do",
	type : "POST",
	processData : false,
	contentType : false,
	data : form, 
	success: function(data) {
		console.log(data, "FILE 변수 OK, success RTN 안에다 리턴");
		
	},
	error: function(jqXHR, exception) {
		if (jqXHR.status === 0) {
			alert('Not connect.\n Verify Network.');
		} 
		else if (jqXHR.status == 400) {
			alert('Server understood the request, but request content was invalid. [400]');
		} 
		else if (jqXHR.status == 401) {
			alert('Unauthorized access. [401]');
		} 
		else if (jqXHR.status == 403) {
			alert('Forbidden resource can not be accessed. [403]');
		} 
		else if (jqXHR.status == 404) {
			alert('Requested page not found. [404]');
		} 
		else if (jqXHR.status == 500) {
			alert('Internal server error. [500]');
		} 
		else if (jqXHR.status == 503) {
			alert('Service unavailable. [503]');
		} 
		else if (exception === 'parsererror') {
			alert('Requested JSON parse failed. [Failed]');
		} 
		else if (exception === 'timeout') {
			alert('Time out error. [Timeout]');
		} 
		else if (exception === 'abort') {
			alert('Ajax request aborted. [Aborted]');
		} 
		else {
			alert('Uncaught Error.n' + jqXHR.responseText);
		}
	}
});
*/
    
//     document.querySelector(".question_3 #user-file").files[0]
//    uploadFile = $("."+q_num+" #user-file")[0].files[0];

//    	alert("파일이 존재하지 않습니다.");
    	
//    	for 
    	
    	




// 1025
function CloseWindow() {
	self.opener = self;
	window.close()
}


//파일명 변경
function getCurrentDate() {  // 현재 시간으로 일련번호 생성하기
 var date = new Date();
 var year = date.getFullYear().toString();

 var month = date.getMonth() + 1;
 month = month < 10 ? '0' + month.toString() : month.toString();

 var day = date.getDate();
 day = day < 10 ? '0' + day.toString() : day.toString();

 var hour = date.getHours();
 hour = hour < 10 ? '0' + hour.toString() : hour.toString();

 var minites = date.getMinutes();
 minites = minites < 10 ? '0' + minites.toString() : minites.toString();

 var seconds = date.getSeconds();
 seconds = seconds < 10 ? '0' + seconds.toString() : seconds.toString();
 
 var milliseconds = date.getSeconds();
 milliseconds = milliseconds < 10 ? '0' + milliseconds.toString() : milliseconds.toString();

 return year + month + day + hour + minites + seconds + milliseconds;
}
