function requestSelected(tableId){
    let selectedIdList = [];
    let table = document.querySelector("#"+"tableId");     // #table_myquestion
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
