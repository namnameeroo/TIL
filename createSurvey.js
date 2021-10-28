
// 설문지 테이블 업데이트
updateSurveyTable()
function updateSurveyTable(dataSet){
	if (!dataSet){
        dataSet = []
        for (let i=0; i<10; i++){
            ele = {"poll_id":53+i}
            dataSet.push(ele)
        }
        console.log("newDataSet")
    };
    
    document.querySelector("#div_poll_count").innerText = dataSet.length;
	
	let table = document.querySelector("#table_mysurvey");
	let tbody = table.querySelector("tbody");
	tbody.innerHTML = "";
	
	for(let i =0; i < dataSet.length; i++){
		let data = dataSet[i];
		
		let tr = document.createElement("tr");
		tr.dataset.id = data.poll_id;
		tr.dataset.connect = data.connect ? data.connect : "";
		tr.id = "clickable-row";
		
		// 클릭 이벤트 (checkbox대체)
        /*
		tr.addEventListener("click", function(tr){
			return function(e){
				if($(this).attr('class') != "selected"){
					tr.classList.add("selected");
					console.log("selected", $(this))
				} else {
					tr.classList.remove("selected");
					console.log("unselected", $(this))
				}
				qnaChecker();
			};
		}(tr));
        */
		
		
		tbody.appendChild(tr);
		let td1 = document.createElement("td");
		td1.innerText = i + 1;
		tr.appendChild(td1);
		
		
		let td2 =  document.createElement("td");
		td2.innerText = data.title;
		tr.appendChild(td2);
		
		let td3 =  document.createElement("td");
		td3.innerText = data.content;
		tr.appendChild(td3);
		
		let td4 =  document.createElement("td");
		let size = data.size == 0 ? "무제한" : data.size + "명";
		td4.innerText = size;;
		tr.appendChild(td4);
		
		let td5 =  document.createElement("td");
		td5.innerText = data.member_name;;
		tr.appendChild(td5);
				
		let td6 =  document.createElement("td");
		td6.innerText = data.update_at.split(" ")[0];
		tr.appendChild(td6);
				
		let td7 =  document.createElement("td");
		td7.style.display = "flex";
		td7.style.justifyContent = "space-evenly";
		tr.appendChild(td7);
		
		// 설문 행 수정 버튼 생성
		let td7_btn1 =  document.createElement("button");
		td7_btn1.type = "button";
		td7_btn1.title = "수정";
		td7_btn1.classList.add("btn-shadow", "btn", "btn-outline-success");
		td7.appendChild(td7_btn1);
		let td7_btn_i1 = document.createElement("i");
		td7_btn_i1.classList.add("fa", "fa-edit");
		td7_btn1.appendChild(td7_btn_i1);

		td7_btn1.addEventListener("click", function(data, id){
			return function(e){
				pollDialogOpen(data, id);
			}
		}(data,  data.poll_id));
		
		// 설문 행 삭제 버튼 생성
		let td7_btn2 =  document.createElement("button");
		td7_btn2.type = "button";
		td7_btn2.title = "삭제";
		td7_btn2.classList.add("btn-shadow", "btn", "btn-outline-danger");
		td7.appendChild(td7_btn2);
		let td7_btn2_i2 = document.createElement("i");
		td7_btn2_i2.classList.add("fa", "fa-trash");
		td7_btn2.appendChild(td7_btn2_i2);

		td7_btn2.addEventListener("click", function(data, id){
			return function(e){
				// ToDo remove Q
				if (confirm("삭제 하시겠습니까?") == true) {
					removePoll(id);
		        } else {
		            // 거절
		        }
			}
		}(data,  data.poll_id));
		
		// url 생성 버튼
		let sLocation = window.location.origin + "/survey/" +  btoa(unescape(encodeURIComponent(data.member_name + "," + user_id + "," + data.poll_id))) + ".do";
		let td7_btn3 =  document.createElement("button");
		td7_btn3.type = "button";
		td7_btn3.title = "주소복사: " + sLocation;
		td7_btn3.classList.add("btn-shadow", "btn", "btn-outline-info");
		td7.appendChild(td7_btn3);
		let td7_btn3_i2 = document.createElement("i");
		td7_btn3_i2.classList.add("fa", "fa-clipboard");
		td7_btn3.appendChild(td7_btn3_i2);

		let td7_btn3_dummy = document.createElement("input");
		td7_btn3_dummy.type = "text";
		td7_btn3_dummy.value = sLocation;
		td7_btn3_dummy.classList.add("td7_btn3_dummy");
		td7_btn3.appendChild(td7_btn3_dummy);

		td7_btn3.addEventListener("click", function(data, id, td7_btn3_dummy){
			return function(e){
				td7_btn3_dummy.style.visibility = "inherit";
				td7_btn3_dummy.select();
				td7_btn3_dummy.setSelectionRange(0, 99999);
				document.execCommand('copy');
				td7_btn3_dummy.setSelectionRange(0, 0);
				console.log(td7_btn3_dummy.value);
				td7_btn3_dummy.style.visibility = "";
				alert("주소가 복사되었습니다.");
			}
		}(data,  data.poll_id, td7_btn3_dummy));
		
	}
}


function requestSelected(tableId){
    let selectedIdList = [];
    let table = document.querySelector(`#${tableId}`);     // #table_myquestion
    let tbody = table.querySelector("tbody");
    let tr = tbody.querySelector("tr");
    let trLength = tbody.querySelectorAll("tr").length;

    for (let i = 0; i < trLength; i++){
        if (tr.classList.contains("selected")) {
            let oneId = tr.dataset.id
            selectedIdList.push(oneId)
        }
    }

console.log(selectedIdList)
return selectedIdList
}
