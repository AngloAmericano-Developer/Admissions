


/*==================================================================================================================

======================================================================================================================*/

function submitDataBasic(){


	/* Captura de Datos Inputs */

	console.log("Entro a funcion");

	var tel_Student = $("#tel_Student").val();

	var adrres = $("#adrres").val();

	var cel_mother = $("#cel_mother").val();

	var email_mother = $("#email_mother").val();

	var celular_father = $("#cel_father").val();

	var email_father = $("#email_father").val();



	var valid = validFormActData([
				{'data':tel_Student,'item':'Tel_Student','type':'text', 'obligatory':false},

				{'data':adrres,'item':'adrres','type':'text', 'obligatory':true},


				{'data':cel_mother,'item':'cel_mother','type':'text', 'obligatory':true},

				{'data':email_mother,'item':'email_mother','type':'text', 'obligatory':true},

				{'data':celular_father,'item':'cel_father','type':'text', 'obligatory':true},

				{'data':email_father,'item':'email_father','type':'text', 'obligatory':true}


				]);

	console.log(valid);

	var validSave = true;

	if (valid["validate"]) {

		console.log("Validado");

		let updStudent

	
		updStudent = updateBasic(tel_Student,adrres,cel_mother,email_mother,celular_father,email_father);		

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

/*===============================================================================

==============================================================================*/

function viewUpdateBasic(){

	let user,infoStudent;

	user = userInfo();

	infoStudent = getStudentDataBasic();

	$.when(user,infoStudent).done(function(info,dataStudent){

		$("#content").load("views/updateDataBasic.html?v=6.2", function(){

			/* Cargue de Datos en Inputs */

			var student = dataStudent[0]["response"][0];

			$("#last_name_Student").val(student["Last_Name_Student"]);

			$("#name_Student").val(student["Name_student"]);

			$("#date_birth").val(student["Birthdate"]);

			$("#number_doc").val(student["Num_Doc"]);

			$("#tel_Student").val(student["tel_Student"]);

			$("#adrres").val(student["Adrress"]);

			$("#last_name_mother").val(student["Last_name_mother"]);

			$("#number_doc_mother").val(student["Doc_mother"]);
			
			$("#cel_mother").val(student["Cel_mother"]);

			$("#email_mother").val(student["Email_mother"]);

			$("#last_name_father").val(student["Last_name_Father"]);

			$("#number_doc_father").val(student["Doc_father"]);
			
			$("#cel_father").val(student["Cel_father"]);

			$("#email_father").val(student["Email_father"]);



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



			$("#saveData").click(function(e) {

				console.log("Save Data Special");

				submitDataBasic();

				e.preventDefault();

			});

		});

	}).fail(function(response){

		console.log("fail...");

		console.log(response);

	});

}