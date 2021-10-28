clickable 만들기 수정중 
$('#clickable-row').on('click', function(){
	console.log(sele)
	let checkbox = $(this).find('.custom-control-label');
	if (checkbox.selected) {
		console.log("selected")
	} else {
		console.log("unchecked")
	}
    checkbox.prop("checked", !checkbox.prop("checked"));
});
