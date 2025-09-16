function viewElectronicSignature (){
	$("#content").load("views/viewElectronicSignature.html?v=4.1",function(){
		console.log("ingreso")
		getFirma = getElectronicSignature()
		$.when(getFirma).done(responsfimra =>{
			console.log(responsfimra);
			//ingreso si realizó la firma
			if(responsfimra['length'] >= 1){
				let dia = responsfimra[0]['date'].split(' ');
				//ingreso si no ha realizado el proceso de firma
				let status = (responsfimra[0]['status'] =='Sin firmas')?'Sin diligenciar deudor y codeudor':(responsfimra[0]['status'] =='Esperando Otras Firmas')?'Pendiente por firma de deudor o codeudor':'Documentos firmados'
				$("#bodyElectronic").append('<p>Comenzó el proceso de firma el día '+dia[0]+' a las '+dia[1]+'. El estado se encuentra. <b>'+status+'</b> </p>')
			}else{
				$("#bodyElectronic").append('<button class="btn btn-primary" id="buttonElectronic" onclick=\"openModal()\" >Firma Electrónica</button>');
			}

			
		}).fail(responsfimra =>{
			console.log(responsfimra);
		})
	});
};


function  validarButton(){
	$("#buttonElectronic").setAttribute('disabled');
}

function openModal(){
	debtor = getDebtorData();
	codebtor = getCodebtorData();
	dataGuide = getLinkDocs();
	student = getStudentData();
	bus_scool = serviceBusScool();
	$.when(debtor,codebtor,dataGuide,student,bus_scool).done((debtor,codebtor,respGuide,respServices,bus_scool) =>{
		$("#bodyTagLarge").load("views/adminView/modalElectronicSignature.html?v=4.1", function(){
			console.log(bus_scool);
			
			
			$("#btnModalLarge").html('Comenzar <i class="fa-regular fa-paper-plane"></i>');
			$(".btnClose").text('Cerrar');
			$('#ModalLargeObs').modal({backdrop: 'static', keyboard: false});
			let idStudent = btoa(respServices[0]['response'][0]['Id']);
			let typeStydent = respServices[0]['response'][0]['Type_User'];
			let LastnameDebtor = debtor[0]['response'][0]['Last_Name'];
			let nameDebtor = debtor[0]['response'][0]['Names'];
			let Num_Doc = debtor[0]['response'][0]['Num_Doc'];
			let emalDebtor = debtor[0]['response'][0]['Email'];
			let celDebtor = debtor[0]['response'][0]['Mobile'];
			let LastnameCodebtor = codebtor[0]['response'][0]['Last_Name'];
			let nameCodebtor = codebtor[0]['response'][0]['Names'];
			let Num_DocCodebtor = codebtor[0]['response'][0]['Num_Doc'];
			let emalCodebtor = codebtor[0]['response'][0]['Email'];
			let celCodebtor = codebtor[0]['response'][0]['Mobile'];
			let serviceMN = (respServices[0]['response'][0]['Half_Nines'] == 1)?"SI":"NO";
			let serviceLaunch = (respServices[0]['response'][0]['Launch'] == 1)?"SI":"NO";
			let serviceTransport = (respServices[0]['response'][0]['Transport'] == 1)?"SI":"NO";


			let BussScool = (bus_scool[0]?.response?.[0] === false)? "N/A": (bus_scool[0]?.response?.[0]?.bus_escool === "Si")? "Si": "No";
			let autPerson =  (bus_scool[0]['response'][0] == false)?"N/A":(bus_scool[0]['response'][0]["authPersonal"] == "Si")?"Si":"No";

			var buttonSave ="";
			if(serviceTransport == "NO"){
				$("#btnModalLarge").removeAttr('disabled');
				var buttonSave ="";
			}else{
				$("#btnModalLarge").attr('disabled','disabled');
				var buttonSave = "<p style='color:#0065ff'><b>Por favor, haga clic en el botón Guardar para confirmar los datos solicitados. Una vez guardados, se habilitará el botón Comenzar, ubicado en la parte inferior de la pantalla, para que pueda iniciar el proceso de firma digital.</b></p><button type='submit'  class='btn btn-info btn-sm' onclick = \"sendUpdatedBuss(event)\">Guardar <i class='fa-regular fa-paper-plane'></i></button>"
			}
			
			// let InfoAutPerson = (autPerson == "Si" || autPerson == "")?"":'<b>Nombre: </b>'+bus_scool[0]['response'][0]["authName"]+' <b> Cédula: </b>'+bus_scool[0]['response'][0]["authDoc"]+' <b> Celular: </b>'+bus_scool[0]['response'][0]["authMobile"];

			let inputDatosPerson = "<br><div class='row p-1'><div class='col-md-12 title labelDiv modalDiv' id='viewTable'><span class='label label-default font-weight-bold'>Persona autorizada para recoger al Estudiante</span><div class='row p-1'><div class='col-md-6 inputGroupContainer'><div class='input-group'><input id='authName_2' placeholder='Nombre Completo' class='form-control form-control-sm' value='' type='text'></div></div><div class='col-md-3 inputGroupContainer'><div class='input-group'><input id='authDoc_2' placeholder='N° de Documento' class='form-control form-control-sm' value='' type='text'></div></div><div class='col-md-3 inputGroupContainer'><div class='input-group'><input id='authMobile' placeholder='Celular' class='form-control form-control-sm' value='' type='text'></div></div></div>";
			
			let DivBusScool = (serviceTransport == "NO")?"":'<p><b>¿Toma el servicio de Seguimiento Satelital de Ruta (Bus Escool)? <span style="color: red;"><div class="btn-group text-center" data-toggle="buttons"><label class="btn btn-outline-success btn-sm btn_service bus_escool btn-sate-si"  data-val="Si"  onclick ="esconder()"><input class="form-control" type="radio" name="bus_escool" >Si <i class="fa fa-check" aria-hidden="true"></i></label><label class="btn btn-outline-danger btn-sm btn_service bus_escool btn-sate-no"  data-val="No"><input class="form-control" type="radio" name="bus_escool">No <i class="fa fa-times" aria-hidden="true"></i></label></div></span><br/>¿Autoriza a su nuestro(a) hijo(a) para que pueda bajarse solo(a) de la ruta escolar? <span style="color: red;"><br><div class="btn-group" data-toggle="buttons"><label class="btn btn-outline-success btn-sm btnTransport authPersonal btnTransport btn-recoge-si" data-val="Si" onclick=\"openView(true)\"><input class="form-control" type="radio" name="authPersonal">Si <i class="fa fa-check" aria-hidden="true"></i></label><label class="btn btn-outline-danger btn-sm btnTransport authPersonal btn-recoge-no" data-val="No" onclick=\"openView(false)\"><input class="form-control" type="radio" name="authPersonal" active>No <i class="fa fa-times" aria-hidden="true"></i></label></div></span></b><br/>'+inputDatosPerson+'</p></div>';

			
			
			


			let ext_celDeudor = debtor[0]['response'][0]['ext_cel'];
			let Type_docDeudor = debtor[0]['response'][0]['Type_doc'];
			let ext_celCodeudor = codebtor[0]['response'][0]['ext_cel'];
			let Type_docCodeudor = codebtor[0]['response'][0]['Type_doc'];

			$('#dataDeudor').append('<p class="card-text"><b>NOMBRE: </b>'+LastnameDebtor+' '+nameDebtor+'<br/><b>CÉDULA: </b>'+Type_docDeudor+' '+Num_Doc +'<br/><b>EMAIL: </b>'+emalDebtor +'<br/><b>CELULAR: </b> +('+ext_celDeudor+') '+celDebtor +'</p>');
			$('#dataCodebtor').append('<p class="card-text"><b>NOMBRE: </b>'+LastnameCodebtor+' '+nameCodebtor+'<br/><b>CÉDULA: </b>'+Type_docCodeudor+' '+Num_DocCodebtor +'<br/><b>EMAIL: </b>'+emalCodebtor +'<br/><b>CELULAR: </b> +('+ext_celCodeudor+') '+celCodebtor +'</p>');
			$('#dataServices').append('<p class="card-text"><b>MEDIAS NUEVES:<span style="color: red;">'+serviceMN+'</span><br/>ALMUERZO: <span style="color: red;">'+serviceLaunch +'</span><br/>TRANSPORTE: <span style="color: red;">'+serviceTransport +'</span></b></p> '+DivBusScool+'<br><div style="margin-top: 20px;text-align:center">'+buttonSave + '</div>');
			
			if (BussScool === "N/A" ) {
				$(".btn-sate-si").addClass("active");
				$(".btn-sate-no").removeClass("active");
			} else if (BussScool === "Si") {
				$(".btn-sate-no").removeClass("active");
				$(".btn-sate-si").addClass("active");
			} else {
				$(".btn-sate-si").removeClass("active");
				$(".btn-sate-no").addClass("active");
			}

			if (autPerson === "N/A" ) {
				$(".btn-recoge-si").removeClass("active");
				$(".btn-recoge-no").addClass("active");
				$("#viewTable").removeClass('d-none');

			} else if (autPerson === "Si") {
				$(".btn-recoge-no").removeClass("active");
				$(".btn-recoge-si").addClass("active");
				$("#viewTable").addClass('d-none');
			} else {
				$(".btn-recoge-si").removeClass("active");
				$(".btn-recoge-no").addClass("active");
				$("#viewTable").removeClass('d-none');
			}

			$("#authName_2").val(bus_scool[0]['response'][0]["authName"]);
			$("#authDoc_2").val(bus_scool[0]['response'][0]["authDoc"]);
			$("#authMobile").val(bus_scool[0]['response'][0]["authMobile"]);

			
			var typeUrl = (typeStydent == 7)?'https://www.comunidadvirtualcaa.co/documentosMatriculaNuevoEstudiante/PDF/generator/documento.php':'https://www.comunidadvirtualcaa.co/documentosMatricula/PDF/generator/documento.php';

			$("#ModalLargeObs").modal("show");
			$("#btnModalLarge").off('click').on('click',(e) => {
				$("#btnModalLarge").html("Cargando <i class='fa fa-spinner fa-spin' style='font-size:20px'></i>").attr("disabled", true);
				e.preventDefault();
				 // Realiza la solicitud AJAX
				$.ajax({
					url: typeUrl,
					type: 'GET',
					data: {id: idStudent,doc: 'ZG9jMS5waHA=',doc2: 'ZG9jMi5waHA=',doc3: 'ZG9jMy5waHA=',doc4: 'ZG9jNC5waHA='},
					success: function(response) {
						console.log('Documento generado con éxito:', response);
						Swal.fire({
							title: "Su proceso de firma electrónica ha comenzado. Le solicitamos consultar su correo, mensaje de texto o WhatsApp para continuar. (Verifique su carpeta de spam en caso de no recibir la información en la bandeja de entrada).",
							icon: "success",
							showConfirmButton: false,       // Oculta el botón "OK" inicialmente
							allowOutsideClick: false,       // Evita que se cierre al hacer clic afuera
							allowEscapeKey: false,          // Evita que se cierre con la tecla Esc
							timer: 15000,                   // Tiempo de espera de 15 segundos
							timerProgressBar: true,         // Barra de progreso
							didOpen: () => {
								Swal.showLoading();        // Muestra el indicador de carga
							},
						}).then(() => {
							// Después de 15 segundos, muestra el segundo SweetAlert con el botón "OK"
							Swal.fire({
								title: "Proceso completado",
								icon: "success",
								confirmButtonText: 'OK',
								confirmButtonColor: '#3085d6',
								allowOutsideClick: false,
								allowEscapeKey: false,
							}).then((result) => {
								if (result.isConfirmed) {
									// Recarga la página y ejecuta insertProcessId() al hacer clic en "OK"
									$("#btnModalLarge").html("Enviado");
									insertProcessId();
									window.location.reload(true);
								}
							});
						});
					},
					error: function(xhr, status, error) {
						console.error('Error al generar el documento:', error);
					}
				});
			})
			
		});
	})
}


function sendUpdatedBuss (event){
	event.preventDefault();
	console.log("Botón clicado, ejecutando función...");
	console.log("Aqui si entra");

	const nombreCompleto = document.getElementById('authName_2').value;
	const documento = document.getElementById('authDoc_2').value;
	const celular = document.getElementById('authMobile').value;
	const bus_escool = document.querySelector('.btn_service.bus_escool.active')?.getAttribute('data-val');
	const authPersonal = document.querySelector('.btnTransport.authPersonal.active')?.getAttribute('data-val');	

	if (authPersonal === "No") {
		if (!nombreCompleto || !documento || !celular) {
			Swal.fire({
				title: "Error",
				text: "Por favor, complete los campos: Nombre Completo, Documento y Celular.",
				icon: "error",
				confirmButtonText: "OK",
				confirmButtonColor: "#3085d6"
			});
			return; 
		}
	}
	
	let updatedGuardar = updateTransportData(authPersonal, "", "", nombreCompleto, documento, celular, "", "", "", "", "","", bus_escool);
	
	$.when(updatedGuardar).done(function(result1) {
		$("#btnModalLarge").removeAttr('disabled');
		Swal.fire({
			title: "Enviado!",
			icon: "success",
			confirmButtonText: 'OK',
			confirmButtonColor: '#3085d6',
			didClose: () => {
				console.log("cerrado")
			}
		});
	}).fail(function(event) {
		console.log(event);
		Swal.fire({
			title: "Error!",
			icon: "error",
			confirmButtonText: 'OK',
			confirmButtonColor: '#3085d6',
			/* didClose: () => {
				window.location.reload(true);
				event.preventDefault();
			} */
		
		});
	});
	
}

function openView() {

    if ($("#viewTable").hasClass('d-none')) {
        $("#viewTable").removeClass('d-none'); 
        console.log("Mostrando la tabla...");
    } else {
        $("#viewTable").addClass('d-none'); 
        console.log("Ocultando la tabla...");
    }
}
