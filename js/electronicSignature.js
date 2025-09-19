async function viewElectronicSignature (){
	responsfirma = await getElectronicSignature();
	if(responsfirma['length'] >= 1){
		viewStateSignature(responsfirma);
	}else{
		viewEstadofirma();
	}
};


function viewEstadofirma(){
   	$("#content").load("views/viewElectronicSignature.html?v=5.0",function(){
		$("#bodyElectronic").append('<button class="btn btn-primary" id="buttonElectronic" onclick=\"openModal()\" >Firma Electrónica</button>');
	});
}

function viewStateSignature(responsfirma){
	$("#content").load("views/viewStateSignature.html?v=5.0", function(){
		viewSignarure(responsfirma);
	})
}

async function viewSignarure(responsfirma){
	 try {
		// Trae el estado de la firma actualizada de Lleida
		var data = await dataSignature(responsfirma);
		console.log(data);
		//Trae estilos
		if (!document.getElementById('estilos-dinamicos')) {
			let link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = 'css/signature.css?v=5.0';
			link.id = 'estilos-dinamicos';
			document.head.appendChild(link);
		}
		// Cargar información del estudiante y deudor
		viewStudentData();
		viewDeudorData();
		updateCurrentDate();

		// Actualizar interfaz con los datos obtenidos
		updateProcess(data);
		updateHistoryDeptor(data);
		updateSpanDeptor(data);
		
		//addAnimations();
		
        // Actualizar fecha cada 20 segundos
		setInterval(updateCurrentDate, 20000);
			
            
		// Simular actualizaciones cada 0 segundos
		setInterval( simulateStatusUpdates, 10000);

        // Funcionalidad de botones
		$(".viewdocumentbtn").off('click').on('click', function(e)  { datagetSignatureDocuments(e, responsfirma)});

	} catch (error) {
		console.error("Error al obtener datos del estudiante:", error);
	} finally {
		$("#loader_").addClass('d-none');
	}
}

async function datagetSignatureDocuments(e,dataSignature) {
    try {
		if (e.target.closest('.btn-primary-custom')) {
			// Añadir efecto de loading
			const btn = e.target.closest('.btn-primary-custom');
			const originalText = btn.innerHTML;
			btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Cargando...';
			btn.disabled = true;

			const data = await getSignatureDocuments(dataSignature[0].signature_id,dataSignature[0].signatory_id);
			let content_ = data.response[0].content; // base64 (URL safe)

			if (content_) {
				// Convertir de Base64URL a Base64 estándar
				const cleanBase64 = base64UrlToBase64(content_);

				// Crear un Blob a partir del base64
				const byteCharacters = atob(cleanBase64);
				const byteNumbers = new Array(byteCharacters.length);
				for (let i = 0; i < byteCharacters.length; i++) {
					byteNumbers[i] = byteCharacters.charCodeAt(i);
				}
				const byteArray = new Uint8Array(byteNumbers);
				const blob = new Blob([byteArray], { type: 'application/pdf' });

				// Crear URL temporal y abrir en nueva pestaña
				const blobUrl = URL.createObjectURL(blob);
				window.open(blobUrl, '_blank');
			} else {
				alert('No se encontró el documento PDF.');
			}

			setTimeout(() => {
				btn.innerHTML = originalText;
				btn.disabled = false;
			}, 2000);
		}
        
    } catch (error) {
        console.error("Error al obtener documentos de firma:", error);
    }
}

// Helper para convertir Base64URL a Base64 estándar
function base64UrlToBase64(base64Url) {
    return base64Url
        .replace(/-/g, '+')
        .replace(/_/g, '/')
        .padEnd(base64Url.length + (4 - base64Url.length % 4) % 4, '=');
}


async function viewDeudorData() {
	try {
		// Trae los datos del deudor
		const debtorInfo = await getDebtorData();
		$("#debtorName").text(debtorInfo['response'][0]['Names'] + ' ' + debtorInfo['response'][0]['Last_Name']);
		$("#debtorDocument").text(debtorInfo['response'][0]['Type_doc'] + ' ' + debtorInfo['response'][0]['Num_Doc']);
		$("#debtorEmail").text(debtorInfo['response'][0]['Email']);
		$("#debtorPhone").text(debtorInfo['response'][0]['ext_cel'] + ' ' + debtorInfo['response'][0]['Mobile']);
		
		// Trae los datos del codeudor
		const codebtorInfo = await getCodebtorData();
		$("#coDebtorName").text(codebtorInfo['response'][0]['Names'] + ' ' + codebtorInfo['response'][0]['Last_Name']);
		$("#coDebtorDocument").text(codebtorInfo['response'][0]['Type_doc'] + ' ' + codebtorInfo['response'][0]['Num_Doc']);
		$("#coDebtorEmail").text(codebtorInfo['response'][0]['Email']);
		$("#coDebtorPhone").text(codebtorInfo['response'][0]['ext_cel'] + ' ' + codebtorInfo['response'][0]['Mobile']);
	} catch (error) {
		console.error("Error al obtener datos del deudor:", error);
	}		
}

async function viewStudentData() {
	try {
		const studentInfo = await userInfo();
		const student = studentInfo['response'][0];
		var templeteStudent = `
                        <h4 class="mb-3"><i class="fas fa-user-graduate me-2"></i> Estudiante</h4>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="info-item">
                                    <span class="info-label">Nombre:</span>
                                    <span class="info-value">${student.NOMBRE}</span>
                                </div>
                               <div class="info-item">
                                    <span class="info-label">Grado:</span>
                                    <span class="info-value">${student.CURSO}</span>
                                </div>
                            </div>
							
                        </div>`
	$("#studentInfo").html(templeteStudent);
	} catch (error) {
		console.error("Error al obtener datos del estudiante:", error);
	}
}

async function updateHistoryDeptor(statusUpdates) {
	try {
		const items = [];

		// Deudor
		if (statusUpdates.deudor.status === 'signed') {
			items.push(`
				<div class="timeline-item">
					<div class="timeline-icon bg-success text-white">
						<i class="fas fa-check"></i>
					</div>
					<div class="timeline-content">
						<small class="fw-bold">Deudor firmó</small><br>
						<small class="text-muted">${statusUpdates.deudor.date || ''}</small>
					</div>
				</div>
			`);
		} else {
			items.push(`
				<div class="timeline-item">
					<div class="timeline-icon bg-warning text-white animate-pulse">
						<i class="fas fa-clock"></i>
					</div>
					<div class="timeline-content">
						<small class="fw-bold">Pendiente Deudor</small><br>
						<small class="text-muted">${statusUpdates.deudor.date || 'Enviado hoy'}</small>
					</div>
				</div>
			`);
		}

		// Codeudor
		if (statusUpdates.codeudor.status === 'signed') {
			items.push(`
				<div class="timeline-item">
					<div class="timeline-icon bg-success text-white">
						<i class="fas fa-check"></i>
					</div>
					<div class="timeline-content">
						<small class="fw-bold">Codeudor firmó</small><br>
						<small class="text-muted">${statusUpdates.codeudor.date || ''}</small>
					</div>
				</div>
			`);
		} else {
			items.push(`
				<div class="timeline-item">
					<div class="timeline-icon bg-warning text-white animate-pulse">
						<i class="fas fa-clock"></i>
					</div>
					<div class="timeline-content">
						<small class="fw-bold">Pendiente Codeudor</small><br>
						<small class="text-muted">${statusUpdates.codeudor.date || 'Enviado hoy'}</small>
					</div>
				</div>
			`);
		}
		const timelineHtml = `
			<div class="timeline">
				<h6 class="mb-3">Historial Reciente</h6>
				${items.join('')}
			</div>
		`;
		$("#resourcesInfo").html(timelineHtml);
	} catch (error) {
		console.error("Error al obtener datos de deudores:", error);
	}
}

async function updateSpanDeptor(status) {
    try {
        // Deudor
        let debtorHtml = (status.deudor.status === 'signed')
            ? `<span class="status-badge status-signed"><i class="fas fa-check-circle"></i>Firmado</span>`
            : `<span class="status-badge status-pending"><i class="fas fa-clock"></i>Pendiente</span>`;
        $(".status-signed-debtor").html(debtorHtml);

		let dateHtml = (status.deudor.date && status.deudor.status === 'signed')
			? `<span class="info-label">Fecha de Firma:</span><span class="info-value">${status.deudor.date}</span>`
			: `<span class="info-label">Enviado:</span><span class="info-value">Enviado hoy</span>`;
		$(".info-item.signed-debtor").html(dateHtml);

        // Codeudor
        let coDebtorHtml = (status.codeudor.status === 'signed')
            ? `<span class="status-badge status-signed"><i class="fas fa-check-circle"></i>Firmado</span>`
            : `<span class="status-badge status-pending"><i class="fas fa-clock"></i>Pendiente</span>`;
        $(".status-signed-coDebtor").html(coDebtorHtml);

		let dateHtmlCo = (status.codeudor.date && status.codeudor.status === 'signed')
			? `<span class="info-label">Fecha de Firma:</span><span class="info-value">${status.codeudor.date}</span>`
			: `<span class="info-label">Enviado:</span><span class="info-value">Enviado hoy</span>`;
		$(".info-item.signed-coDebtor").html(dateHtmlCo);
    } catch (error) {
        console.error("Error al obtener estado de la firma:", error);
    }
}

// Actualizar fecha actual
function updateCurrentDate() {
	const now = new Date();
	const options = { 
		weekday: 'long', 
		year: 'numeric', 
		month: 'long', 
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	};
	document.getElementById('currentDate').textContent = now.toLocaleDateString('es-ES', options);
}

async function dataSignature(responsfirma) {
	const states = await Promise.all(responsfirma.map(item => getStateSignature(item.signatory_id)));
	const unixTimestamp = 1535440000; // Ejemplo de timestamp
	const date = new Date(unixTimestamp * 1000); // Multiplicar por 1000 para milisegundos
	console.log(date.toISOString()); // Salida: 2018-08-28T23:33:20.000Z
	const statusUpdates = [
		{
			deudor: { status: states[0][0].status, date: unixDate(states[0][0].dates)  },
			codeudor: { status: states[1][0].status, date: unixDate(states[1][0].dates)  }
		}
	];
	return statusUpdates[0];
}

function unixDate(unixTimestamp) {
    if (!unixTimestamp) return null;
    const date = new Date(unixTimestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}


// Simular actualizaciones en tiempo real
async function simulateStatusUpdates() {
	var responsfirma = await getElectronicSignature();
	data = await dataSignature(responsfirma);
	updateProcess(data);
	updateHistoryDeptor(data);
	updateSpanDeptor(data);
	
}

function updateProcess(data) {
	let completedSignatures = 0;
	
	if (data.deudor.status === 'signed') completedSignatures++;
	if (data.codeudor.status === 'signed') completedSignatures++;
	
	const progress = (completedSignatures / 2) * 100;
	
	// Actualizar barra de progreso
	document.getElementById('overallProgress').style.width = progress + '%';
	document.getElementById('progressText').textContent = progress + '%';
	
	// Actualizar estado general
	const overallIcon = document.getElementById('overallStatusIcon');
	const overallText = document.getElementById('overallStatusText');
	
	if (completedSignatures === 2) {
		overallIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
		overallIcon.style.background = 'var(--success-gradient)';
		overallText.textContent = 'Proceso Completado';
	} else if (completedSignatures === 1) {
		overallIcon.innerHTML = '<i class="fas fa-clock"></i>';
		overallIcon.style.background = 'var(--warning-gradient)';
		overallText.textContent = 'Proceso en Curso';
	}
}

// Efectos de animación
function addAnimations() {
	const cards = document.querySelectorAll('.signature-card, .student-info-card, .overall-status');
	
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('fade-in');
			}
		});
	});

	cards.forEach(card => {
		observer.observe(card);
	});
}

//////////////////////


function openModal(){
	debtor = getDebtorData();
	codebtor = getCodebtorData();
	dataGuide = getLinkDocs();
	student = getStudentData();
	bus_scool = serviceBusScool();
	$.when(debtor,codebtor,dataGuide,student,bus_scool).done((debtor,codebtor,respGuide,respServices,bus_scool) =>{
		$("#bodyTagLarge").load("views/adminView/modalElectronicSignature.html?v=5.0", function(){
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

			
			var typeUrl = (typeStydent == 7)?'/documentosMatriculaLleida/PDF/generator/documento.php':'/documentosMatriculaLleida/PDF/generator/documento.php';

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
									$("#btnModalLarge").html("Enviado");
									//insertProcessId();
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
