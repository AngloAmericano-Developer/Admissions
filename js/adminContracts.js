function checkService(id_student,service,status,class_check) {
	var checked = (status == 1)?'checked="checked"':'';
	var checkbox = '<label class="checkbox centerItem"><input type="checkbox" class="btn btn-sm '+class_check+'" data-student="'+id_student+'" data-service="'+service+'" '+checked+'/><span class="primary"></span></label>';
	return checkbox;
}

function selectGroup(id_student,selected) {
	// var array_ = {1:"Grupo 1",2:"Grupo 2",3:"Virtual",4:"Todos los días"};
	var array_ = {3:"Virtual",4:"Todos los días"};
	var select = "<select class='form-control novelty form-control-sm groupAlter' data-student='"+id_student+"'>";
	select += (selected == null)?"<option value='--' selected>--</option>":"";
    $.each(array_, function(key, value) {
        selected_ = (selected == key && selected != "--")?"selected":"";
        select = select + '<option class="temp" value="'+key+'" '+selected_+'>'+value+'</option>';
    });
    select =select + "</select>";
    return select;
}

function loadTableContractsServices(infoUser,arrayStudents) {
	var num = 1;
	var date = new Date();
	var year_current = date.getFullYear();
	var year_ant = date.getFullYear()-1;
	var optionServices = {1:"Grupo 1",2:"Grupo 2",3:"Virtual",4:"Todos los días"};
	var table = "<table class = 'table table-responsive table-sm table-bordered table-striped table-hover animated fadeIn' id='table_docs' style='font-size:14px;'><thead class='thead-active text-center'><tr><th class='title' rowspan='2' scope='col' style='text-align: center; vertical-align: middle;'>#</th><th class='title' rowspan='2' scope='col' style='text-align: center; vertical-align: middle;'>Codigo</th><th class='title' rowspan='2' scope='col' style='text-align: center; vertical-align: middle;'>Estudiante</th><th class='title' rowspan='2' scope='col' style='text-align: center; vertical-align: middle;'>Curso</th><th class='title' colspan='3' scope='col' style='text-align: center; vertical-align: middle;'>Servicios "+year_ant+"</th><th class='title' colspan='3' scope='col' style='text-align: center; vertical-align: middle;'>Servicios "+year_current+"</th><th class='title' rowspan='2' scope='col' style='text-align: center; vertical-align: middle;'>Modalidad</th><th class='title' rowspan='2' scope='col' style='text-align: center; vertical-align: middle;'>Módulo Act. Datos</th></tr><tr><th class='title' scope='col' style='text-align: center; vertical-align: middle;'>M.N</th><th class='title' scope='col' style='text-align: center; vertical-align: middle;'>ALM</th><th class='title' scope='col' style='text-align: center; vertical-align: middle;'>TRANS</th><th class='title' scope='col' style='text-align: center; vertical-align: middle;'>M.N</th><th class='title' scope='col' style='text-align: center; vertical-align: middle;'>ALM</th><th class='title' scope='col' style='text-align: center; vertical-align: middle;'>TRANS</th></tr></thead><tbody>";
	// var table = "<table class = 'table table-responsive table-sm table-bordered table-striped table-hover animated fadeIn' id='table_docs' style='font-size:14px;'><thead class='thead-active text-center'><tr><th class='title' rowspan='2' scope='col' style='text-align: center; vertical-align: middle;'>#</th><th class='title' rowspan='2' scope='col' style='text-align: center; vertical-align: middle;'>Codigo</th><th class='title' rowspan='2' scope='col' style='text-align: center; vertical-align: middle;'>Estudiante</th><th class='title' rowspan='2' scope='col' style='text-align: center; vertical-align: middle;'>Curso</th><th class='title' colspan='3' scope='col' style='text-align: center; vertical-align: middle;'>Servicios "+year_ant+"</th><th class='title' colspan='3' scope='col' style='text-align: center; vertical-align: middle;'>Servicios 1° Sem.</th><th class='title' colspan='3' scope='col' style='text-align: center; vertical-align: middle;'>Servicios 2° Sem. Circ N° 146</th><th class='title' rowspan='2' scope='col' style='text-align: center; vertical-align: middle;'>Grupo 1° Sem.</th><th class='title' rowspan='2' scope='col' style='text-align: center; vertical-align: middle;'>Grupo 2° Sem.</th><th class='title' rowspan='2' scope='col' style='text-align: center; vertical-align: middle;'>Módulo Act. Datos</th></tr><tr><th class='title' scope='col' style='text-align: center; vertical-align: middle;'>M.N</th><th class='title' scope='col' style='text-align: center; vertical-align: middle;'>ALM</th><th class='title' scope='col' style='text-align: center; vertical-align: middle;'>TRANS</th><th class='title' scope='col' style='text-align: center; vertical-align: middle;'>M.N</th><th class='title' scope='col' style='text-align: center; vertical-align: middle;'>ALM</th><th class='title' scope='col' style='text-align: center; vertical-align: middle;'>TRANS</th><th class='title' scope='col' style='text-align: center; vertical-align: middle;'>M.N</th><th class='title' scope='col' style='text-align: center; vertical-align: middle;'>ALM</th><th class='title' scope='col' style='text-align: center; vertical-align: middle;'>TRANS</th></tr></thead><tbody>";
	$.each(arrayStudents, function(index, val) {
		var half_nines_ant = ((val["half_nines_ant"] == 1)?'Si':'No');
		var launch_ant = ((val["launch_ant"] == 1)?'Si':'No');
		var transport_ant = ((val["transport_ant"] == 1)?'Si':'No');
		var half_nines_first = ((val["half_nines_first"] == 1)?'Si':'No');
		var launch_first = ((val["launch_first"] == 1)?'Si':'No');
		var transport_first = ((val["transport_first"] == 1)?'Si':'No');
		var half_nines_actual = ((val["half_nines_actual"] == 1)?'Si':'No');
		var launch_actual = ((val["launch_actual"] == 1)?'Si':'No');
		var transport_actual = ((val["transport_actual"] == 1)?'Si':'No');
		var half_nines = checkService(val["id_student"],1,val["half_nines_contract"],"checkService");
		var half_nines_other_yes = checkService(val["id_student"],1,val["half_nines_other_yes"],"checkOther");
		var launch = checkService(val["id_student"],2,val["launch_contract"],"checkService");
		var launch_other_yes = checkService(val["id_student"],2,val["launch_other_yes"],"checkOther");
		var transport = checkService(val["id_student"],3,val["transport_contract"],"checkService");
		var transport_other_yes = checkService(val["id_student"],3,val["transport_other_yes"],"checkOther");
		var informed_consent = checkService(val["id_student"],'informed_consent',val["informed_consent"],"checkOther");
		var act_module = checkService(val["id_student"],'act_module',val["act_module"],"checkOther");
		var alternation = checkService(val["id_student"],'alternation',val["alternation"],"checkService");
		var group_alternation = (infoUser["ID"] == 20171289 || infoUser["ID"] == 212121)?selectGroup(val["id_student"],val["group_alternation"]):optionServices[val["group_alternation"]];
		var group_alternation_prev = optionServices[val["group_alternation_prev"]];
		// table += "<tr><td class='celValue text-center' width='1px'>"+num+"</td><td class='celValue text-center'>"+val["id_student"]+"</td><td class='celValue'>"+val["names"]+"</td><td class='celValue text-center'>"+val["course"]+"</td><td class='celValue text-center'>"+half_nines_ant+"</td><td class='celValue text-center'>"+launch_ant+"</td><td class='celValue text-center'>"+transport_ant+"</td><td class='celValue text-center'>"+half_nines_first+"</td><td class='celValue text-center'>"+launch_first+"</td><td class='celValue text-center'>"+transport_first+"</td><td class='celValue text-center'>"+half_nines_actual+"</td><td class='celValue text-center'>"+launch_actual+"</td><td class='celValue text-center'>"+transport_actual+"</td><td class='celValue text-center'>"+half_nines+"</td><td class='celValue text-center'>"+half_nines_other_yes+"</td><td class='celValue text-center'>"+launch+"</td><td class='celValue text-center'>"+launch_other_yes+"</td><td class='celValue text-center'>"+transport+"</td><td class='celValue text-center'>"+transport_other_yes+"</td><td class='celValue text-center'>"+alternation+"</td><td class='celValue text-center'>"+group_alternation_prev+"</td><td class='celValue text-center'>"+group_alternation+"</td><td class='celValue text-center'>"+informed_consent+"</td><td class='celValue text-center'>"+registration_sheet+"</td></tr>";
		table += "<tr><td class='celValue text-center' width='1px'>"+num+"</td><td class='celValue text-center'>"+val["id_student"]+"</td><td class='celValue'>"+val["names"]+"</td><td class='celValue text-center'>"+val["course"]+"</td><td class='celValue text-center'>"+half_nines_ant+"</td><td class='celValue text-center'>"+launch_ant+"</td><td class='celValue text-center'>"+transport_ant+"</td><td class='celValue text-center'>"+half_nines_actual+"</td><td class='celValue text-center'>"+launch_actual+"</td><td class='celValue text-center'>"+transport_actual+"</td><td class='celValue text-center'>"+group_alternation+"</td><td class='celValue text-center'>"+act_module+"</td></tr>";
		num++;
	});
	table += "</tbody></table>";
	return table;
}

function loadTableContractsServicesAlter(arrayStudents) {
	var num = 1;
	var date = new Date();
	var year_current = date.getFullYear();
	var year_ant = date.getFullYear()-1;
	// var optionServices = {1:"Grupo 1",2:"Grupo 2",3:"Virtual",4:"Todos los días"};
	var optionServices = {3:"Virtual",4:"Todos los días"};
	var table = "<table class = 'table table-responsive table-sm table-bordered table-striped table-hover animated fadeIn' id='table_docs' style='font-size:14px;'><thead class='thead-active text-center'><tr><th class='title' rowspan='2' scope='col' style='text-align: center; vertical-align: middle;'>#</th><th class='title' rowspan='2' scope='col' style='text-align: center; vertical-align: middle;'>Codigo</th><th class='title' rowspan='2' scope='col' style='text-align: center; vertical-align: middle;'>Estudiante</th><th class='title' rowspan='2' scope='col' style='text-align: center; vertical-align: middle;'>Curso</th><th class='title' colspan='3' scope='col' style='text-align: center; vertical-align: middle;'>Servicios "+year_ant+"</th><th class='title' colspan='3' scope='col' style='text-align: center; vertical-align: middle;'>Servicios "+year_current+"</th><th class='title' rowspan='2' scope='col' style='text-align: center; vertical-align: middle;'>Alternancia</th><th class='title' rowspan='2' scope='col' style='text-align: center; vertical-align: middle;'>Grupo</th></tr><tr><th class='title' scope='col' style='text-align: center; vertical-align: middle;'>M.N</th><th class='title' scope='col' style='text-align: center; vertical-align: middle;'>ALM</th><th class='title' scope='col' style='text-align: center; vertical-align: middle;'>TRANS</th><th class='title' scope='col' style='text-align: center; vertical-align: middle;'>M.N</th><th class='title' scope='col' style='text-align: center; vertical-align: middle;'>ALM</th><th class='title' scope='col' style='text-align: center; vertical-align: middle;'>TRANS</th></tr></thead><tbody>";
	$.each(arrayStudents, function(index, val) {
		var half_nines_ant = ((val["half_nines_ant"] == 1)?'Si':'No');
		var launch_ant = ((val["launch_ant"] == 1)?'Si':'No');
		var transport_ant = ((val["transport_ant"] == 1)?'Si':'No');
		var half_nines = checkService(val["id_student"],1,val["half_nines_actual"],"checkService");
		var launch = checkService(val["id_student"],2,val["launch_actual"],"checkService");
		var transport = checkService(val["id_student"],3,val["transport_actual"],"checkService");
		var alternation = checkService(val["id_student"],'alternation',val["alternation"],"checkService");
		var group_alternation = selectGroup(val["id_student"],val["group_alternation"]);
		table += "<tr><td class='celValue text-center' width='1px'>"+num+"</td><td class='celValue text-center'>"+val["id_student"]+"</td><td class='celValue'>"+val["names"]+"</td><td class='celValue text-center'>"+val["course"]+"</td><td class='celValue text-center'>"+half_nines_ant+"</td><td class='celValue text-center'>"+launch_ant+"</td><td class='celValue text-center'>"+transport_ant+"</td><td class='celValue text-center'>"+half_nines+"</td><td class='celValue text-center'>"+launch+"</td><td class='celValue text-center'>"+transport+"</td><td class='celValue text-center'>"+alternation+"</td><td class='celValue text-center'>"+group_alternation+"</td></tr>";
		num++;
	});
	table += "</tbody></table>";
	return table;
}

function loadTableContractsModality(arrayStudents) {
	var num = 1;
	var date = new Date();
	var year_current = date.getFullYear();
	var year_ant = date.getFullYear()-1;
	var optionServices = {1:"Grupo 1",2:"Grupo 2",3:"Virtual",4:"Todos los días"};
	var table = "<table class = 'table table-responsive table-sm table-bordered table-striped table-hover animated fadeIn' id='table_docs' style='font-size:14px;'><thead class='thead-active text-center'><tr><th class='title' rowspan='2' scope='col' style='text-align: center; vertical-align: middle;'>#</th><th class='title' rowspan='2' scope='col' style='text-align: center; vertical-align: middle;'>Codigo</th><th class='title' rowspan='2' scope='col' style='text-align: center; vertical-align: middle;'>Estudiante</th><th class='title' rowspan='2' scope='col' style='text-align: center; vertical-align: middle;'>Curso</th><th class='title' colspan='2' scope='col' style='text-align: center; vertical-align: middle;'>1er Semestre</th><th class='title' colspan='2' scope='col' style='text-align: center; vertical-align: middle;'>2do Semestre</th></tr><tr><th class='title' scope='col' style='text-align: center; vertical-align: middle;'>Alternancia</th><th class='title' scope='col' style='text-align: center; vertical-align: middle;'>Grupo</th><th class='title' scope='col' style='text-align: center; vertical-align: middle;'>Alternancia</th><th class='title' scope='col' style='text-align: center; vertical-align: middle;'>Grupo</th></tr></thead><tbody>";
	$.each(arrayStudents, function(index, val) {
		var half_nines_ant = ((val["half_nines_ant"] == 1)?'Si':'No');
		var launch_ant = ((val["launch_ant"] == 1)?'Si':'No');
		var transport_ant = ((val["transport_ant"] == 1)?'Si':'No');
		var half_nines = checkService(val["id_student"],1,val["half_nines_actual"],"checkService");
		var launch = checkService(val["id_student"],2,val["launch_actual"],"checkService");
		var transport = checkService(val["id_student"],3,val["transport_actual"],"checkService");
		var alternation = checkService(val["id_student"],'alternation',val["alternation"],"checkService");
		var group_alternation = selectGroup(val["id_student"],val["group_alternation"]);
		var group_alternation_prev = (val["group_alternation_prev"] == null)?"Virtual":optionServices[val["group_alternation_prev"]];
		table += "<tr><td class='celValue text-center' width='1px'>"+num+"</td><td class='celValue text-center'>"+val["id_student"]+"</td><td class='celValue'>"+val["names"]+"</td><td class='celValue text-center'>"+val["course"]+"</td><td class='celValue text-center'>"+((val["alternation_prev"] == 1)?"Si":"No")+"</td><td class='celValue text-center'>"+group_alternation_prev+"</td><td class='celValue text-center'>"+alternation+"</td><td class='celValue text-center'>"+group_alternation+"</td></tr>";
		num++;
	});
	table += "</tbody></table>";
	return table;
}

function viewAdminContracts(){
	let list_courses, infoUser;
	infoUser = userInfo();
	list_courses = getCourses();
	$.when(infoUser,list_courses).done(function(respUser,respCourses){
		$("#content").load("views/adminContracts.html?v=6.2", function(){
			$("#selectCourse").append(createSelect(respCourses[0]["response"],"selectCourse",1,false));
			console.log(respUser[0]);
			$("#btnListed").click(function(e) {
				var course = $(".selectCourse").val();
				var names = $("#names").val();
				var last_names = $("#last_names").val();
				var filter = ($("#filter").prop('checked') == true)?1:0;
				console.log(course);
				console.log(names);
				console.log(last_names);
				console.log(filter);
				actionEntry = getInfoContracts(course,last_names,names,filter);
				if (course != "--" || names != "" || last_names != "") {
					$("#btnListed").html("Cargando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
					// $("#btnListed").attr('disabled', true);
					$.when(actionEntry).done(function(response){
						console.log(response);
						$("#div_listedDocs").prev().remove();
						$("#div_listedDocs").next().remove();
						$("#div_listedDocs").removeClass("col-sm-10");
						$("#div_listedDocs").addClass("col-sm-12");
						$("#div_listedDocs").children().remove();
						if (response["code"] == 200 && response["response"][0] != 300) {
							if (respUser[0]["response"][0]["ID_TU"] == 8) {
								$("#div_listedDocs").append(loadTableContractsModality(response["response"]));
							}
							else{
								$("#div_listedDocs").append(loadTableContractsServices(respUser[0]["response"][0],response["response"]));
							}
						}
						else if (response["code"] == 200 && response["response"][0] == 300) {
							var toastMessage_ = {"service":"Alerta","200":"Cambio Exitoso","300":"No hay ningún resultado","400":"Error 400","500":"Error 500"};
							toastr_message(response["response"][0],toastMessage_);
						}
						$("tr").each(function() {
							// $(this).children("th:nth-child(14)").addClass('d-none');
							// $(this).children("td:nth-child(14)").addClass('d-none');
						});
						$("#btnListed").removeAttr('disabled');
						$("#btnListed").html('Consultar <i class="fa fa-check" aria-hidden="true"></i>');
						$(".checkService").click(function() {
							var id_student = $(this).data('student');
							var service = $(this).data('service');
							var status = ($(this).prop('checked') == true)?1:0;
							actionService = updateService(id_student,service,status);
							$.when(actionService).done(function(respDone){
								console.log(respDone);
								var toastMessage_ = {"service":"Alerta","200":"Cambio Exitoso","300":"No se pudo ejecutar el cambio","400":"Error 400","500":"Error 500"};
								toastr_message(respDone["response"][0],toastMessage_);
							}).fail(function(respFail){
								console.log(respFail);
							});
						});
						$(".checkOther").click(function() {
							var id_student = $(this).data('student');
							var service = $(this).data('service');
							var status = ($(this).prop('checked') == true)?1:0;
							actionService = updateOther(id_student,service,status);
							$.when(actionService).done(function(respDone){
								console.log(respDone);
								var toastMessage_ = {"service":"Alerta","200":"Cambio Exitoso","300":"No se pudo ejecutar el cambio","400":"Error 400","500":"Error 500"};
								toastr_message(respDone["response"][0],toastMessage_);
							}).fail(function(respFail){
								console.log(respFail);
							});
						});
						$(".groupAlter").change(function() {
							if ($(this).val() != "--") {
								var id_student = $(this).data('student');
								var status = $(this).val();
								console.log("Entro al cambio");
								actionGroup = updateGroupAlternation(id_student,status);
								$.when(actionGroup).done(function(respDone){
									console.log(respDone);
									var toastMessage_ = {"service":"Alerta","200":"Cambio Exitoso","300":"No se pudo ejecutar el cambio","400":"Error 400","500":"Error 500"};
									toastr_message(respDone["response"][0],toastMessage_);
								}).fail(function(respFail){
									console.log(respFail);
								});
							}
						});
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