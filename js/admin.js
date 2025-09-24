//var host = "http://192.168.1.10:8000/"; 
var host ="http://localhost:8000/";

function sleep(milliseconds) {
  console.log("sleeping");
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function toastr_message(code,messages){
    //console.log(code);
    switch(code) {
        case 200:
            response = toastr.success(messages["200"],messages["service"]);
            break;
        case 300:
            response = toastr.info(messages["300"],messages["service"]);
            break;
        case 400:
            response = toastr.warning(messages["400"],messages["service"]);
            break;
        case 500:
            response = toastr.error(messages["500"],messages["service"]);
            break;
        default:
            response = false
            break;
    }
    //console.log(response);
    return response;
}
function cleanView(){
    $("#titleModal").text("");
    $("#bodyTag").children().remove();
    $("#ModalObs").off('hidden.bs.modal');
    $("#titleModalLarge").text("");
    $("#bodyTagLarge").children().remove();
    $("#ModalLargeObs").off('hidden.bs.modal');
    $("#form2").off('submit');
    $("#buttons_action").children().not(":first").remove();
    $("#modalCreate").removeClass('modal-lg');
    $("#navbarResponsive").removeClass('show');
}

function get_permission(host){
    return $.ajax({
        url:'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {param: 'permission', base:'r'},
    })
}

function hide_modules(array){
    $.each(modules_index,function(key, value) {
        get_permission(value).done(function(response){
            console.log(response);
            if(array.indexOf(value) == -1 || response['response']['actions'].indexOf(actions_sections['Read']) == -1){
                $("#"+key).parent().remove();
            }
        })
        .fail(function(response) {
            console.log(response);
        });
    });
}

function modulesMain(){
    moduleViews().done(function(response){
        var modAct = $(".body_").attr('id');
        console.log(modAct);
        $.each(response["response"], function(index, value) {
            var active = (value["id"] == modAct)?"active":"";
            var link = (value["id"] == modAct)?"#":"../"+value["path"];
            var numModule = '<ul class="navbar-nav ml-auto"><li class="'+active+'" id="m'+value["id"]+'"><a class="nav-link" href="'+link+'">'+value["module"]+'</a></li></ul>';
            $("#navbarResponsive").append(numModule);
        });
        var modBack = '<ul class="navbar-nav ml-auto"><li class="nav-item"><a class="nav-link" href="../index.html"><i class="fa fa-fw fa-home"></i>Volver</a></li></ul>';
        $("#navbarResponsive").append(modBack);
    }).fail(function(response){
        console.log(response);
    });
}

function denyRead(){
    $("#content").load("views/error.html?v=5.3",function(){
        $("#content_error").addClass('text-danger');
        $("#content_error").text("UPS!!! no tienes permisos para ver esta sección. No seas curioso...");
    });
}

function logged_area(){
    $(".body_").children().remove();
    $(".body_").load("views/body.html?v=5.3",function(){
        get_permission(host).done(function(response){
            if(response['response'].length > 0){
                $.each(response['response'],function(key,value) {
                    $("#"+value).removeClass('d-none');
                    // $("#"+value).addClass('animated flipInX');
                });
            }
            else {
                location.href = "../index.html";
            }
        }).fail(function(response){
            console.log(response);
        });
        modulesMain();
        $("#modalView").load("views/modalObs.html?v=5.3");
        $("#modalLargeView").load("views/modalLarge.html?v=5.3");
        $(".item").click(function(){
            $(".nav-item").removeClass("active animated flip");
            $(this).parent().addClass("active animated flip");    
            $("#content").addClass("bg-default");
            cleanView();
            if($(this).attr("id") == 'brochure'){
                $("#content").css("overflow","hidden"); 
            }else{
                $("#content").css("overflow","");
            } 
            switch ($(this).attr("id")){
                case 'actInfo':
                    viewUpdateData();
                    break;
                case 'printDoc':
                    viewGuide();
                    break;
                case 'updateSpecial':
                    viewUpdateSpecial();
                    break;
                    case 'updateBasic':
                    viewUpdateBasic();
                    break;
                case 'chargeDocuments':
                    viewChargeDocs();
                    break;
                case 'listDocuments':
                    viewListDocs();
                    break;
                case 'adminContracts':
                    viewAdminContracts();
                    break;
                case 'brochure':
                    var height = $(document).height()-$("#mainNav").height()-$("footer").height();
                    $("#content").css("height",height+"px");
                    $(".content-wrapper").css("padding-top","0rem");
                    PDFObject.embed("../documentos/Admissions/documentos/BrochureServicios.pdf", "#content");
                break;
                case 'converPDF':
                    vistas_video();
                break;
                case 'electronic_signature':
                    viewElectronicSignature();
                break;
                case 'viewbrochure_StudentNew':
                    /* var height = $(document).height()-$("#mainNav").height()-$("footer").height();
                    $("#content").css("height",height+"px");
                    $(".content-wrapper").css("padding-top", "0rem");
                    PDFObject.embed("../documentos/Admissions/documentos/BrochureAdmisiones.pdf", "#content"); */   
                    window.open('https://colegioangloamericano.my.canva.site/', '_blank');              
                    break;
                default:
                    alert($(this).attr('id'));
                    break;
            }    
        });
        var activeMod = $(location).attr('search');
        if (activeMod != null && activeMod != undefined && activeMod != "") {
            activeMod = activeMod.replace("?", "");
            console.log(activeMod);
            getUrl = activeMod.split("=");
            console.log(getUrl);
            if (getUrl[0] == "mod") {                
                $("#"+getUrl[1]).click();
            }
        }
    });
}


document.oncontextmenu = function(){return false;}

$(document).ready(function(){
    
    logged_area();    

});
