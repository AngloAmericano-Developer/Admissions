function loadTableDocs(arrayStudents) {
	var num = 1;
	var table = "<table class = 'table table-responsive table-sm table-bordered table-striped animated fadeIn' id='table_docs' style='font-size:14px;'><thead class='thead-active text-center'><tr><th class='title' scope='col' style='text-align: center; vertical-align: middle;'>#</th><th class='title' scope='col' style='text-align: center; vertical-align: middle;'>Estudiante</th><th class='title' scope='col' style='text-align: center; vertical-align: middle;'>Curso</th><th class='title' scope='col' style='text-align: center; vertical-align: middle;'>Link Documento</th></tr></thead><tbody>";
	$.each(arrayStudents, function(index, val) {
		var link_docs = (val["link_docs"] != null)?"<a href='"+val["link_docs"]+"' target='_blank'>Ver Documentos</a>":"Sin registro";
		table += "<tr><td class='celValue text-center' width='1px'>"+num+"</td><td class='celValue'>"+val["names"]+"</td><td class='celValue text-center'>"+val["course"]+"</td><td class='celValue text-center'>"+link_docs+"</td></tr>";
		num++;
	});
	table += "</tbody></table>";
	return table;
}

function viewListDocs(){
	let list_courses;
	list_courses = getCourses();
	$.when(list_courses).done(function(respCourses){
		$("#content").load("views/listedDocuments.html?v=6.1", function(){
			$("#selectCourse").append(createSelect(respCourses["response"],"selectCourse",1,false));
			$("#btnListed").click(function(e) {
				var course = $(".selectCourse").val();
				var names = $("#names").val();
				var last_names = $("#last_names").val();
				var filter = ($("#filter").prop('checked') == true)?1:0;
				console.log(course);
				console.log(names);
				console.log(last_names);
				console.log(filter);
				actionEntry = getListedDocs(course,last_names,names,filter);
				if (course != "--" || names != "" || last_names != "") {
					$("#btnListed").html("Cargando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
					// $("#btnListed").attr('disabled', true);
					$.when(actionEntry).done(function(response){
						console.log(response);
						$("#div_listedDocs").children().remove();
						if (response["code"] == 200) {
							$("#div_listedDocs").append(loadTableDocs(response["response"]));
						}
						/*else if (response["code"] == 200 && response["response"][0] == 500) {
							$("#btnListed").removeAttr('disabled');
							$("#btnListed").html('Cargar Documentos <i class="fa fa-upload" aria-hidden="true"></i>');
						}*/
						$("#btnListed").removeAttr('disabled');
						$("#btnListed").html('Consultar <i class="fa fa-check" aria-hidden="true"></i>');
					}).fail(function(response){
						console.log("fail Entry");
						console.log(response);
					});
				}
				else {
					var toastMessage_ = {"service":"Mensaje","200":"200", "400":"Error 400.","500":"Seleccione alguno de los filtros."};
		            toastr_message(500,toastMessage_);
				}
				e.preventDefault();
			});
		});	
	}).fail(function(response){
		console.log("fail Entry");
		console.log(response);
	});

}