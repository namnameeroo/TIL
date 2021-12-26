let p;
let pt;

// createDom

/*let inputBtn = document.querySelector("input[type='radio']");
inputBtn.addEventListener("click",(e)=>{
    p = e;
    pt = e.target;
    //label.add.classList="check";
    if (e.target.nextElementSibling.classList.contains("check")) {
        e.target.checked = false;
        e.target.nextElementSibling.classList ="";
    } else {
        e.target.checked = true;
        e.target.nextElementSibling.classList ="check";
    }
});
inputBtn.addEventListener("change",(e)=>radioChecker(e));
*/

function radioChecker(e) {
    //p = e;
    //pt = e.target;
    //label.add.classList="check";
    console.log(e.target.id);
    //return;
    
    if (e.target.checked == true) {
        console.log("true", e.target.checked);
        e.target.nextElementSibling.classList ="check";
        
    } 
    
    else {
        console.log("false",e.target.checked);
        e.target.nextElementSibling.classList ="";
    }
    // if (e.target.nextElementSibling.classList.contains("check")) {
    //     e.target.checked = false;
    // } else {
    //     e.target.checked = true;
    // }
}

//$(":checked").next().addClass("check");
let main_body = document.querySelector("body");
let div_1 = document.createElement("div");
div_1.classList = "survey";
main_body.appendChild(div_1);
let div_2 = document.createElement("div");
div_2.classList = "mr-30 col-grid d-flex form-center";
div_1.appendChild(div_2);

let questionCnt =prompt();
for (let c=0; c<questionCnt; c++){
    let ansCnt = prompt();
    createRadioDiv(c, ansCnt);
}

function createRadioDiv(q_id , cnt) {
    let question_id = "question-"+q_id;
    let div_3 = document.createElement("div");
    div_3.classList = "question-container";
    div_3.id = question_id;
    div_2.appendChild(div_3);

    
    let div_con = document.createElement("div");
    div_con.classList="container";
    div_3.appendChild(div_con);
    
    let div_nps = document.createElement("div");
    div_nps.classList="nps-col-text-container";
    div_con.appendChild(div_nps);
    let div_left = document.createElement("div");
    div_left.classList="question-body-font-theme nps-col-text-left";
    div_left.innerText = "안좋아";
    div_nps.appendChild(div_left);
    let div_right = document.createElement("div");
    div_right.classList="question-body-font-theme nps-col-text-right";
    div_right.innerText = "좋아";
    div_nps.appendChild(div_right);

    let radio_table = document.createElement("table");
    div_con.appendChild(radio_table);

    let tbody = document.createElement("tbody");
    radio_table.appendChild(tbody);
    let tr = document.createElement("tr");
    tbody.appendChild(tr);
    for (let i=0; i <cnt; i++) {
        let td = document.createElement("td");
        tr.appendChild(td);
        
        let td_div = document.createElement("div");
        td_div.classList = "radio-container";
        td.appendChild(td_div);
        
        let td_input = document.createElement("input");
        td_input.id = question_id +"-"+ i;
        td_input.type = "radio";
        td_input.name = question_id;
        td_input.addEventListener("change",(e)=>radioChecker(e));
        td_div.appendChild(td_input);

        
        let td_label = document.createElement("label");
        td_label.for = question_id +"-"+ i;
        td_div.appendChild(td_label);
        let td_label_span = document.createElement("span");
        td_label_span.innerText = parseInt(i)+1;
        td_label.appendChild(td_label_span);
        
        // td_input.appendChild(td_div);

    }
    
}


// let labels = document.querySelectorAll("input[type=radio]+label");
// labels.forEach((v,i)=>{v.addEventListener("change", labelChecker(v));
// })
// function labelChecker (e) {
//     //e = label
//     p = e;
//     pt = e.target;
//     //label.add.classList="check";
//     if (e.previousElementSibling.checked) {
//         e.target.classList = 'check';
//     } else {
//         e.target.classList ="";

//     }
// }
