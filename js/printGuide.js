function viewGuide(){
	let userData, dataGuide;
	userData = userInfo();
	dataGuide = getLinkDocs();
	typeStudent = getTypeStudent();
	$.when(userData,dataGuide,typeStudent).done(function(respInfo,respGuide,respType){
		console.log(respInfo['0']['response']['0']['ID']);
		var estudiant_nue = respInfo['0']['response']['0']['ID'];
		$("#content").load("views/guide.html?v=6.2", function(){
			if(estudiant_nue == '2023604' ||estudiant_nue == '2023556' ||estudiant_nue == '2023572' ||estudiant_nue == '2023570' ||estudiant_nue == '2023560' ||estudiant_nue == '2023564' ||estudiant_nue == '2023602' ||estudiant_nue == '2023618'){
				$("#date1").addClass('d-none');
			}
			else{
				$("#date3").addClass('d-none');
			}
			get_Services().done(function(response){
				console.log('servicio triple consulta');
				console.log(response);
				
				grado = response['response']['0']['id_grado'];
				if (respType[0]["response"]["type_user"] == 2) {
					$("#print2").removeClass('d-none');	
				}
				$("#print").removeClass('d-none');
				$("#nueves").addClass('d-none');
				$("#enviar").click(function(e) {
					var question = $(".question.active").data('val');
					var valid = validFormActData([
						{'data':question,'item':'question','type':'radio', 'obligatory':true}
						]);

					if (question == 0 || question == 1) {
						$("#nueves").removeClass('labelInvalid animated infinite pulse');
						
						
						addServices(question).done(function(response){
							viewGuide();
						}).fail(function(response){
							console.log(response);
						});
						
					}else{
						console.log(question);
						$("#nueves").addClass('labelInvalid animated ainfinite pulse');	
					}
					e.preventDefault();
				});	
			}).fail(function(response){
				console.log(response);
			});
		if (respType[0]["response"]["type_user"] == 7) {
			console.log(respType);
			$("#infoGuide").addClass('d-none');

			$("#n_container").removeClass('d-none');
			console.log("siii ESTUDIANTE NUEVO");
			$("#titleModalLarge").text("Recuerde que la impresión de los documentos debe ser en hojas blancas tamaño OFICIO.");
			$("#titleModalNotice").text("Recuerden que, para realizar la impresión de los documentos, hacer el debido proceso de autenticación y entregar del sobre de matrícula en el Colegio, les solicitamos el favor de seguir atentamente las indicaciones del instructivo AM.I.12 como archivo adjunto. En caso de inquietudes, por favor enviar un correo electrónico a: admisiones@caa.edu.co. ");
			$("#linkDocNuevo").attr('href', respGuide[0]);
			$("#linkDoc_DEM").attr('type', 'button')
			$("#linkDoc_DEM").attr('data-target','#staticBackdropNuevo');
			//$("#formularioURL").attr('action', respGuide[0]);
			
		//$("#infoGuide").addClass('d-none');
		}else{
			$("#titleModalLarge").text("Descargar documentos de matrícula.");
			$("#linkDoc").attr('href', respGuide[0]);
			$("#linkDoc_DEM").attr('type', 'button')
			$("#linkDoc_DEM").attr('data-target','#staticBackdrop');
			//$("#formularioURL").attr('action', respGuide[0]);
		}
	});	
	}).fail(function(response){
		console.log(response);
	});
};


function linkdoc(){
	dataGuide = getLinkDocs();
	$.when(dataGuide).done(function(respGuide){
		console.log(respGuide)
		var id = respGuide["id"];
		var pagin = respGuide["pag"];
		document.getElementById('id').value=id;
		document.getElementById('pag').value=pagin;
		document.formularioURL.submit()


	})
}