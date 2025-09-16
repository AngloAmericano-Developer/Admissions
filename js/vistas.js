function vistas_video (){
	// let view = $(document).view()-$("#mainNav").view()-$("footer").view();
	// $("#content").css("height",view+"px");
	$("#content").html("<video src='../documentos/Admissions/images/videomoduloconvertir.mp4' autoplay controls style='width:100%;padding:5%;content:center'></video>")
	$(".content-wrapper").css("padding-top","0rem");
};

function vistas_pdf(){
	let height = $(document).height()-$("#mainNav").height()-$("footer").height();
	$("#content").css("height",height+"px");
	$(".content-wrapper").css("padding-top","0rem");
	PDFObject.embed("../documentos/Admissions/documentos/BrochureTransporte2024.pdf", "#content");
}