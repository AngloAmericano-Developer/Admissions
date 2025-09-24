function loadCountrysSpecial(selectCountry,country_sel="--",disabled=false){
	country_sel = (country_sel == "" || country_sel == "0")?"--":country_sel;
	getCountrys().done(function(response){
		$("#"+selectCountry).append(createSelect(response["response"],selectCountry,1,false,country_sel));
		$("#"+selectCountry).off("change");
		$("#"+selectCountry+" select").change( function(){
           ////console.log($("#"+selectCountry+" option:selected"));
           optionSelectSpecial($(this));
       });
		$("."+selectCountry).css('height', 'auto');
		$("."+selectCountry).attr('disabled', disabled);
	}).fail(function(response){
		//console.log(response);
	});
}

function loadDeptosSpecial(selectDepto,dept_sel="--",disabled=false){
	dept_sel = (dept_sel == "" || dept_sel == "0" || dept_sel == null)?"--":dept_sel;
	getDeptos().done(function(response){
		$("#"+selectDepto).append(createSelect(response["response"],selectDepto,1,false,dept_sel));
		$("#"+selectDepto).off("change");
		$("#"+selectDepto+" select").change( function(){
           ////console.log($("#"+selectDepto+" option:selected"));
           optionSelectSpecial($(this));
       });
		$("."+selectDepto).css('height', 'auto');
		$("."+selectDepto).attr('disabled', disabled);
        ////console.log("Attr "+disabled);
    }).fail(function(response){
    	//console.log(response);
    });
}

function loadCitysSpecial(selectCity,city_sel="--",id_country,id_dpto,disabled=false){
	city_sel = (city_sel == "" || city_sel == "0" || city_sel == null)?"--":city_sel;
	getCitys(id_country,id_dpto).done(function(response){
		$("#"+selectCity).append(createSelect(response["response"],selectCity,1,false,city_sel));
		$("#"+selectCity).off("change");
		$("#"+selectCity+" select").change( function(){
           ////console.log($("#"+selectCity+" option:selected"));
           optionSelectSpecial($(this));
       });
		$("."+selectCity).css('height', 'auto');
		$("."+selectCity).attr('disabled', disabled);
        ////console.log("Attr "+disabled);
    }).fail(function(response){
    	//console.log(response);
    });
}

function loadTypeDocSpecial(selectType,type_sel="--",disabled=false){
	type_sel = (type_sel == "" || type_sel == "0" || type_sel == null)?"--":type_sel;
	getTypeDocs().done(function(response){
		$("#"+selectType).append(createSelect(response["response"],selectType,1,false,type_sel));
		$("#"+selectType).off("change");
		$("#"+selectType+" select").change( function(){
           ////console.log($("#"+selectType+" option:selected"));
           optionSelectSpecial($(this));
       });
		$("."+selectType).css('height', 'auto');
		$("."+selectType).attr('disabled', disabled);
	}).fail(function(response){
		//console.log(response);
	});
}

function optionSelectSpecial(object){
	////console.log("Entro a Select");
	////console.log(object);
	if (object.hasClass('selectTypeDoc')) {
		////console.log("Entro a Tipo Documento");
		if (object.val() == "--") {
			$("#selectDeptoExp").children().remove();
			loadDeptosSpecial("selectDeptoExp");
			$("#selectCityExp").children().remove();
			loadCitysSpecial("selectCityExp","--","CO","",true);
			$("#infoDocAdditional").addClass('d-none');
			$("#infoDocAdditional").find('input').val("");;
			$("#number_visa").attr('disabled', true);
			$("#date_visa_exp").attr('disabled', true);
			$("#date_visa_venc").attr('disabled', true);
			$("#label_selectDeptoExp").children().remove();
			$("#label_selectDeptoExp").append('<span class="" style="font-size: 10px">(Departamento)</span>');
		}
		else if (object.val() == "8" || object.val() == "9") {
			$("#selectDeptoExp").children().remove();
			loadCountrysSpecial("selectDeptoExp");
			$("#selectCityExp").children().remove();
			loadCitysSpecial("selectCityExp","--","CO","",true);
			$("#infoDocAdditional").removeClass('d-none');
			$("#number_visa").removeAttr('disabled');
			$("#date_visa_exp").removeAttr('disabled');
			$("#date_visa_venc").removeAttr('disabled');
			$("#label_selectDeptoExp").children().remove();
			$("#label_selectDeptoExp").append('<span class="" style="font-size: 10px">(País)</span>');

		}
		else {
			$("#selectDeptoExp").children().remove();
			loadDeptosSpecial("selectDeptoExp");
			$("#selectCityExp").children().remove();
			loadCitysSpecial("selectCityExp","--","CO","",true);
			$("#infoDocAdditional").addClass('d-none');
			$("#infoDocAdditional").find('input').val("");
			$("#number_visa").attr('disabled', true);
			$("#date_visa_exp").attr('disabled', true);
			$("#date_visa_venc").attr('disabled', true);
			$("#label_selectDeptoExp").children().remove();
			$("#label_selectDeptoExp").append('<span class="" style="font-size: 10px">(Departamento)</span>');
		}
	}
	else if (object.hasClass('selectDeptoExp')) {
		////console.log("Entro a Depto Expedicion");
		if (object.val() == "--") {
			$("#selectCityExp").children().remove();
			loadCitysSpecial("selectCityExp","--","CO","",true);
		}
		else if (object.val() != "--" && ($(".selectTypeDoc").val() != "8" && $(".selectTypeDoc").val() != "9")) {
			////console.log("Entro a Option Depto");
			$("#selectCityExp").children().remove();
			loadCitysSpecial("selectCityExp","--","CO",object.val());
		}
		else if (object.val() != "--") {
			////console.log("Entro a Option Pais");
			$("#selectCityExp").children().remove();
			loadCitysSpecial("selectCityExp","--",object.val(),"");
		}
	}
	else if (object.hasClass('selectCityExp')) {
		////console.log("Entro a Ciudad Expedicion");
	}
}

function showSelectorsSpecial(student){
	/* En el caso que el tipo de Documento sea Pasaporte(8) en lugar de traer los departamentos se traerá la ciudad, si es algún otro tipo de Documento traerá el selector con departamentos */
	loadTypeDocSpecial("selectTypeDoc",student["Type_Doc"]);
	if (student["Type_Doc"] != "0") {
		if (student["Type_Doc"] == "8" || student["Type_Doc"] == "9") {
			loadCountrysSpecial("selectDeptoExp",student["Dpto_Doc"]);
			$("#infoDocAdditional").removeClass('d-none');
			$("#number_visa").removeAttr('disabled');
			$("#date_visa_exp").removeAttr('disabled');
			$("#date_visa_venc").removeAttr('disabled');
		}
		else if (student["Type_Doc"] != "8" && student["Type_Doc"] != "9") {
			loadDeptosSpecial("selectDeptoExp",student["Dpto_Doc"]);
		}
	} 
	else if (student["Type_Doc"] == "0") {
		loadDeptosSpecial("selectDeptoExp","",true);
	}
	//loadDeptosSpecial("selectDeptoExp",student["Dpto_Doc"]);
	if (student["Dpto_Doc"] != "" && (student["Type_Doc"] != "8" && student["Type_Doc"] != "9") && student["Type_Doc"] != "0") {
		loadCitysSpecial("selectCityExp",student["City_Doc"],"CO",student["Dpto_Doc"]);
	}
	else if (student["Dpto_Doc"] != "" && (student["Type_Doc"] == "8" || student["Type_Doc"] == "9")) {
		loadCitysSpecial("selectCityExp",student["City_Doc"],student["Dpto_Doc"]);
	}
	else if (student["Type_Doc"] == "0" || student["Dpto_Doc"] == "") {
		loadCitysSpecial("selectCityExp","","CO","",true);
	}
}

function submitDataSpecial(){

	/* Captura de Datos Inputs */
	console.log("Entro a funcion");
	var last_name = $("#last_name").val();
	var name = $("#name").val();
	var date_birth = $("#date_birth").val();
	var number_doc = $("#number_doc").val();
	var number_visa = $("#number_visa").val();
	var date_visa_exp = $("#date_visa_exp").val();
	var date_visa_venc = $("#date_visa_venc").val();
	var selectTypeDoc = $(".selectTypeDoc").val();
	var selectDeptoExp = $(".selectDeptoExp").val();
	var selectCityExp = $(".selectCityExp").val();
	var email = $("#email").val();
	var type_doc = (selectTypeDoc == 8 || selectTypeDoc == 9)?true:false;
	var valid = validFormActData([{'data':date_birth,'item':'date_birth','type':'date', 'obligatory':true},
				{'data':number_doc,'item':'number_doc','type':'text', 'obligatory':true},
				{'data':last_name,'item':'last_name','type':'text', 'obligatory':true},
				{'data':name,'item':'name','type':'text', 'obligatory':true},
				{'data':number_visa,'item':'number_visa','type':'text', 'obligatory':type_doc},
				{'data':date_visa_exp,'item':'date_visa_exp','type':'date', 'obligatory':type_doc},
				{'data':date_visa_venc,'item':'date_visa_venc','type':'date', 'obligatory':type_doc},
				{'data':email,'item':'email','type':'text', 'obligatory':true},
				{'data':selectTypeDoc,'item':'selectTypeDoc','type':'select', 'obligatory':true},
				{'data':selectDeptoExp,'item':'selectDeptoExp','type':'select', 'obligatory':true},
				{'data':selectCityExp,'item':'selectCityExp','type':'select', 'obligatory':true}
				]);
	console.log(valid);
	var validSave = true;
	if (valid["validate"]) {
		console.log("Validado");
		let updStudent
		updStudent = updateSpecial(last_name,name,date_birth,number_doc,number_visa,date_visa_exp,date_visa_venc,selectTypeDoc,selectDeptoExp,selectCityExp,email);
		$("#saveData").html("Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
		$("#saveData").attr('disabled', true);
		$.when(updStudent).done(function(respStudent,respHealth){
			//viewInfoStudent(respStudent[0]["response"][0],respBrother[0],respBrotherSchool[0]);
			console.log(respStudent);
			$("#saveData").html('Guardar <i class="fa fa-floppy-o" aria-hidden="true"></i>');
			$("#saveData").removeAttr('disabled');
			$(".labelCheck").remove();
			$(".labelDiv").each(function() {
				$(this).removeClass('labelInvalid');
				$(this).addClass('labelValid');
				$(this).append('  <span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>');
				$(this).removeClass("animated infinite pulse");
			});
		}).fail(function(response){
			console.log("fail Student");
			console.log(response);
		});
	}
	else {
		//console.log("Datos Invalidos");
		validSave = false;
		$(".labelCheck").remove();
		$(".labelDiv").each(function() {
			$(this).removeClass('labelValid');
			$(this).removeClass('labelInvalid');
			$(this).removeClass('animated infinite pulse');
		});
		$.each(valid['items'],function(key,label) {
			console.log($("#"+label).parent().parent())
			$("#"+label).parent().parent().find('label').addClass('labelInvalid');
			$("#"+label).parent().parent().find('label').append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
			$("#"+label).parent().parent().find('label').addClass("animated infinite pulse");
			$("#"+label).focus();
			$("."+label).focus();
		});
	}
	return validSave;
}

function viewUpdateSpecial(){
	let user,infoStudent;
	user = userInfo();
	infoStudent = getStudentData();
	$.when(user,infoStudent).done(function(info,dataStudent){
		$("#content").load("views/updateDataSpecial.html?v=5.4", function(){
			/* Cargue de Datos en Inputs */
			var student = dataStudent[0]["response"][0];
			$("#last_name").val(student["Last_Name"]);
			$("#name").val(student["Name"]);
			$("#date_birth").val(student["Birthdate"]);
			$("#age").val(student["Age"]);
			$("#number_doc").val(student["Num_Doc"]);
			$("#number_visa").val(student["Number_Visa"]);
			$("#date_visa_exp").val(student["Date_Visa_Exp"]);
			$("#date_visa_venc").val(student["Date_Visa_Venc"]);
			$("#email").val(student["Email"]);
			var image = "data:image/jpeg;base64,"+info[0]["response"][0]['FOTO'];
			var grade = info[0]["response"][0]["GRADO"];
			$("#image").attr("src",image);
			$("#cardInfo").find("#name_card").text(info[0]["response"][0]["NOMBRE"]);
			if(info[0]["response"][0]["CURSO"]== null){
				$("#cardInfo").find("#dis").addClass('d-none');
			}
			else{
				$("#cardInfo").find("#course").text(info[0]["response"][0]["CURSO"]);
			}
			/* Cargue de Selectores */
			showSelectorsSpecial(student);
			console.log(student);
			$("#date_nac").change(function() {
				var currentAge = calculateAge($(this).val());
				$("#age").val(currentAge);
			});
			$("#saveData").click(function(e) {
				console.log("Save Data Special");
				submitDataSpecial();
				e.preventDefault();
			});
		});
	}).fail(function(response){
		console.log("fail...");
		console.log(response);
	});
}