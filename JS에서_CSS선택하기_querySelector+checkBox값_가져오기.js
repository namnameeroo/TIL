
// 제출버튼 => 문항마다 돌면서 입력값 받기 => 넘기기
function submitEvent(data){ 
	return function(e){
		// 문항 data
		let poll_id = data.poll_id;
		let questions = data.questions
		let user_id = data.host_id
		let responses = [];

		// 입력 data
		// 개별 문항
		for (let i = 0; i < questions.length; i++) { // data.questions[i].question_id => 53

			let q = questions[i];    // poll 의 문항1, 문항2,
			let type = q.type;       // 문항별 타입 : 단답식, 쳌박, 라디오, 순위형, 파일형, 날짜형, 시간형
			let as = q.answers      // 문항별 보기
			let num = i + 1
			let q_num = "question_" + num
			let q_area = document.querySelector('div.input-field.col.s12.'+ q_num) // 영역한정
			let user_input = "";
			
			
			if (type == '1') {    // 단답식 document.querySelector("#question_0").value
				user_input = document.querySelector("input#"+ q_num).value
//				response.push(user_input)

			} else if(type == '2' || type == '3'){   //객관식 (체크/라디오)

				let as = q.answers;
				for (j=0; j < as.length; j++){
					input_cheked = document.querySelector('input#'+q_num+'_' + (j+1) + ':checked');
					if (!input_cheked) {
						continue
						
					} else {
						user_input = (user_input=='') ? as[j].number : user_input + "," + as[j].number;
					}
				}

				
			}  else if (type == '4'){ // 순위형
				user_input = "12543"
				
			} else if (type == '5'){   // 파일형
				user_input = "img"
				
			} else{						// 날짜형, 시간형
				user_input = "2011-12-13"
			};

			responses.push(user_input);
			console.log(responses)
			

		}
		
		// 1021 기준 DB에 answer_id, user_id, ip_address, type 안들어가고 있음
		
		jQuery.ajax({
		    url : "/submitSurvey.do",
		    method : "POST",
		    data :  {
		    	"poll_id" : poll_id,
		    	"questions": JSON.stringify(data.questions),
		    	"vote" : JSON.stringify(responses),
		    	"userAgent": window.navigator.userAgent
			},
		    contentType: "application/x-www-form-urlencoded; charset=UTF-8",  
		    dataType: "JSON", // 옵션
		    complete : function(result) {
		    	console.log(data);
		    	setCookie("lastSurvey_sd", data.poll_id);
		    },
		    error : function(xhr, status, error) {
		  	  console.log("status : " + status + ", xhr : " + xhr + ", error : "+ error);
		    }
		});
	}
};

