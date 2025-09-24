function bs_input_file(itemClass) {
	$(itemClass).after(
		function() {
			if ( ! $(this).prev().hasClass('input-ghost') ) {
				var element = $("<input type='file' class='input-ghost' style='visibility:hidden; height:0'>");
				element.attr("id",$(this).attr("name"));
				element.change(function(){
					element.prev(element).find('input').val((element.val()).split('\\').pop());
				});
				$(this).find("button.btn-choose").click(function(){
					element.click();
				});
				$(this).find("button.btn-reset").click(function(){
					element.val(null);
					$(this).parents(".input-file").find('input').val('');
				});
				$(this).find('input').css("cursor","pointer");
				$(this).find('input').mousedown(function() {
					$(this).parents('.input-file').next().click();
					return false;
				});
				return element;
			}
		}
	);
}


function viewChargeDocs(){
	$("#content").load("views/chargeDocuments.html?v=5.3", function(){
		$(function() {
			bs_input_file(".input-file");
		});
		$("#btnCharge").click(function(e) {
			var text_fileAttached = $("#fileAttached").val();
			var fileAttached = $("#fileAttached").prop('files')[0];
			var extension = text_fileAttached.split(".").pop();
			var valid = validFormActData([
							{'data':text_fileAttached,'item':'fileAttached','type':'text', 'obligatory':true}]);
			console.log(extension);
			if (extension != "pdf") {
				var toastMessage_ = {"service":"Mensaje","500":"El documento debe ser pdf."};
	            toastr_message(500,toastMessage_);
			}
			if (valid && extension == "pdf") {
				$(".labelInvalid").each(function() {
					$(this).removeClass('labelInvalid');
				});
				var info = new FormData();
				info.append('base','caa');
				info.append('param','uploadDocuments');
				info.append('fileAttached',fileAttached);
				actionEntry = uploadDocuments(info);
				$("#btnCharge").html("Cargando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
				$("#btnCharge").attr('disabled', true);
				$.when(actionEntry).done(function(response){
					console.log(response);
					// if (response["code"] == 200 && (response["response"][0] == 200 || response["response"][0] == 300)) {
					if (response["code"] == 200 && (response["response"][0] == 200)) {
						$("#date_notify").remove();
						$("#div_link_attached").parent().parent().after('<div class="row p-1" id="date_notify"><div class="col-md-12"><label class="label font-weight-bold">Archivo cargado correctamente '+response["response"]["result"]+"</label></div></div>");
						$("button.btn-reset").click();
						$("#fileAttached").val('');
					}
					else if (response["code"] == 200 && response["response"][0] == 500) {
						$("#btnCharge").removeAttr('disabled');
						$("#btnCharge").html('Cargar Documentos <i class="fa fa-upload" aria-hidden="true"></i>');
					}
					$("#btnCharge").removeAttr('disabled');
					$("#btnCharge").html('Cargar Documentos <i class="fa fa-upload" aria-hidden="true"></i>');
		            var toastMessage_ = {"service":"Mensaje","200":"Documentos Cargados correctamente", "400":"Error 400.","500":"Hubo un error, intente nuevamente."};
		            toastr_message(response["response"][0],toastMessage_);
				}).fail(function(response){
					console.log("fail Entry");
					console.log(response);
				});
			}
			else {
				$(".labelInvalid").each(function() {
					$(this).removeClass('labelInvalid');
				});
				$.each(valid["items"], function(key, label) {
					$("#label_"+label).addClass('labelInvalid');
				});
			}
			e.preventDefault();
		});
	});	
}