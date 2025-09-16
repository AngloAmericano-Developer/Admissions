function loadCountrys(selectCountry,country_sel="--",disabled=false){
	country_sel = (country_sel == "" || country_sel == "0" || country_sel == null)?"--":country_sel;
	getCountrys().done(function(response){
		$("#"+selectCountry).append(createSelect(response["response"],selectCountry,1,false,country_sel));
		$("#"+selectCountry).off("change");
		$("#"+selectCountry+" select").change( function(){
           ////console.log($("#"+selectCountry+" option:selected"));
           optionSelect($(this));
       });
		$("."+selectCountry).css('height', 'auto');
		$("."+selectCountry).attr('disabled', disabled);
	}).fail(function(response){
		//console.log(response);
	});
}

function createSelectV1(array_, class_,type, multiple =false,selected="--"){
    var select = "";
    var selected_ = "";
    var multiple = (multiple)?"multiple='multiple'":"";
    if(type == 1){
        var select = "<select class='form-control novelty form-control-sm "+class_+"' "+multiple+" id="+class_+"selec"+">"; //<option value='--'>--</option>
        select = (selected == "--" && !multiple)?select+"<option value='--' selected>--</option>":select;
        $.each(array_, function(key, value) {
            //selected_ = (selected != "--" && selected.indexOf(value['id'])!=-1)?"selected":"";
            selected_ = (selected != "--" && selected == value['id'])?"selected":"";
            select = select + '<option class="temp" value="'+value['id']+'" '+selected_+'>'+value['description']+'</option>';
        });
        var select =select + "</select>";
    }
    else if(type == 2){
        var select = "<select class='form-control novelty form-control-sm "+class_+"' "+multiple+" id="+class_+"selec"+">"; //<option value='--'>--</option>
        select = (selected == "--" && !multiple)?select+"<option value='--' selected>--</option>":select;
        $.each(array_,function(key,value){
            for (var i = 1; i <= value.length; i++) {
                select = select + '<option class="temp" value="'+key+'-'+i+'">'+value[i-1]+'</option>';
            }   
        });
        var select =select + "</select>";
    }
    else if(type == 3){
        var select = "<select class='form-control novelty form-control-sm "+class_+"' "+multiple+" id="+class_+"selec"+">"; //<option value='--'>--</option>
        //select = (selected == "--" && !multiple)?select+"<option value='--' selected>--</option>":select;
        $.each(array_,function(index,value){
            $.each(value,function(key,value_){
                select = select + '<optgroup label="'+key+'"></optgroup>';
                $.each(value_,function(a,b){
                    selected_ = (selected != "--" && selected.indexOf(b['id'])!=-1)?"selected":"";
                    select = select + '<option class="temp" value="'+b['id']+'" '+selected_+'>'+b['description']+'</option>';
                })
            })
        });
        var select =select + "</select>";
    }
    if(type == 4){
        var select = "<select class='form-control novelty form-control-sm "+class_+"' id="+class_+"selec"+"><option value='--'>--</option>";
        $.each(array_, function(key, value) {
            selected_ = (selected == key && selected != "--")?"selected":"";
            select = select + '<option class="temp" value="'+key+'" '+selected_+'>'+value+'</option>';
        });
        select =select + "</select>";
    }
    else if(type == 5){
        var select = "<select mutiple data-style='bg-gray rounded-pill px-4 py-3 shadow-sm '' class='selectpicker w-5 "+class_+"' "+multiple+" id="+class_+"selec"+">";
        $.each(array_,function(a,b){
            selected_ = (selected != "--" && selected.indexOf(b['id'])!=-1)?"selected":"";
            select = select + '<option class="temp" value="'+b['id']+'" '+selected_+'>'+b['description']+'</option>';
        })
        var select =select + "</select>";
    }
    else if(type == 6){
        var select = "<select class='form-control novelty form-control-sm "+class_+"' "+multiple+" id="+class_+"selec"+">"; //<option value='--'>--</option>
        select = select+"<option value='--' selected>--</option>";
        $.each(array_, function(key, value) {
            //selected_ = (selected != "--" && selected.indexOf(value['id'])!=-1)?"selected":"";
            selected_ = (selected != "--" && selected == value['id'])?"selected":"";
            select = select + '<option class="temp" value="'+value['id']+'" '+selected_+'>'+value['description']+'</option>';
        });
        var select =select + "</select>";
    }
    else if(type == 7){
        var select = "<select class='form-control novelty form-control-sm "+class_+"' "+multiple+" id="+class_+"selec"+">"; //<option value='--'>--</option>
        //select = (selected == "--" && !multiple)?select+"<option value='--' selected>--</option>":select;
        $.each(array_,function(key,value_){
            select = select + '<optgroup label="'+key+'"></optgroup>';
            $.each(value_,function(a,b){
                selected_ = (selected != "--" && selected.indexOf(b['id'])!=-1)?"selected":"";
                select = select + '<option class="temp" value="'+b['id']+'" '+selected_+'>'+b['description']+'</option>';
            })
        })
        var select =select + "</select>";
    }
    else if(type == 8){
        var select = "<select class='form-control novelty form-control-sm "+class_+"' "+multiple+" id="+class_+"selec"+">"; //<option value='--'>--</option>
        select = (selected == "--" && !multiple)?select+"<option value='--' selected>--</option>":select;
        $.each(array_, function(key, value) {
            selected_ = (selected != "--" && selected == value['id'])?"selected":"";
            class_ = (value['status'] == 1)?"checkComplete":"";
            select = select + '<option class="temp '+class_+'" value="'+value['id']+'" '+selected_+'>'+value['description']+'</option>';
        });
        var select =select + "</select>";
    }
    else if(type == 9){
        var select = "<select class='form-control novelty form-control-sm "+class_+"' disabled><option value='--' id="+class_+"selec"+">Seleccione una opción ...</option>";
        $.each(array_, function(key, value) {
            selected_ = (selected == key && selected != "--")?"selected":"";
            select = select + '<option class="temp" value="'+key+'" '+selected_+'>'+value+'</option>';
        });
        select =select + "</select>";
    }
	else if(type == 15){
        var select = "<select class='form-control novelty form-control-sm "+class_+"' "+multiple+" id="+class_+"selec"+">"; //<option value='--'>--</option>
        select = (selected == "--" && !multiple)?select+"<option value='--' selected>--</option>":select;
        $.each(array_, function(key, value) {
            selected_ = (selected != "--" && selected == value['id'])?"selected":"";
            class_ = (value['status'] == 1)?"checkComplete":"";
            select = select + '<option class="temp '+class_+'" value="'+value['id']+'" '+selected_+'>'+value['description']+'</option>';
        });
        var select =select + "</select>";
    }else if(type == 16){
		multiple = multiple == "" ?false:true;
		var disabledAttr = (multiple === true || multiple === "true") ? " disabled" : "";
		var select = "<select class='form-control novelty form-control-sm' id=" + class_ + "selec" + disabledAttr + " >"; 
		select = (selected == "--" || selected=="") ? select + "<option value='--' selected>--</option>" : select;

		$.each(array_, function(key, value) {
			let flagCode = value['id'].toLowerCase(); 
			let countryName = value['description'];     
			let phoneCode = value['indicativo'];    
			let isSelected = (selected == ("+" + phoneCode)) ? "selected" : "";

			select += '<option value="'+phoneCode+'" data-flag="'+flagCode+'" data-phone="'+phoneCode+'" '+isSelected+'>' +
					countryName +
					'</option>';
		});

		select += "</select>";

    }
    return select;
    
}

function loadDeptos(selectDepto,dept_sel="--",disabled=false){
	dept_sel = (dept_sel == "" || dept_sel == "0" || dept_sel == null)?"--":dept_sel;
	getDeptos().done(function(response){
		$("#"+selectDepto).append(createSelect(response["response"],selectDepto,1,false,dept_sel));
		$("#"+selectDepto).off("change");
		$("#"+selectDepto+" select").change( function(){
           ////console.log($("#"+selectDepto+" option:selected"));
           optionSelect($(this));
       });
		$("."+selectDepto).css('height', 'auto');
		$("."+selectDepto).attr('disabled', disabled);
        ////console.log("Attr "+disabled);
    }).fail(function(response){
    	//console.log(response);
    });
}

function loadCitys(selectCity,city_sel="--",id_country,id_dpto,disabled=false){
	city_sel = (city_sel == "" || city_sel == "0" || city_sel == null)?"--":city_sel;
	getCitys(id_country,id_dpto).done(function(response){
		$("#"+selectCity).append(createSelect(response["response"],selectCity,1,false,city_sel));
		$("#"+selectCity).off("change");
		$("#"+selectCity+" select").change( function(){
           ////console.log($("#"+selectCity+" option:selected"));
           optionSelect($(this));
       });
		$("."+selectCity).css('height', 'auto');
		$("."+selectCity).attr('disabled', disabled);
        ////console.log("Attr "+disabled);
    }).fail(function(response){
    	//console.log(response);
    });
}

function loadCivilStatus(selectCivil,civil_sel="--"){
	civil_sel = (civil_sel == "" || civil_sel == "0" || civil_sel == null)?"--":civil_sel;
	getTypeCivil().done(function(response){
		$("#"+selectCivil).append(createSelect(response["response"],selectCivil,1,false,civil_sel));
		$("#"+selectCivil).off("change");
		$("#"+selectCivil+" select").change( function(){
           ////console.log($("#"+selectCivil+" option:selected"));
           optionSelect($(this));
       });
		$("."+selectCivil).css('height', 'auto');
	}).fail(function(response){
		//console.log(response);
	});
}

function loadAddress(selectAddr,addr_sel="--",disabled=false){
	addr_sel = (addr_sel == "" || addr_sel == "0" || addr_sel == null)?"--":addr_sel;
	getAddress().done(function(response){
		$("#"+selectAddr).append(createSelect(response["response"],selectAddr,1,false,addr_sel));
		$("#"+selectAddr).off("change");
		$("#"+selectAddr+" select").change( function(){
           ////console.log($("#"+selectAddr+" option:selected"));
           optionSelect($(this));
       });
		$("."+selectAddr).css('height', 'auto');
		$("."+selectAddr).attr('disabled', disabled);
	}).fail(function(response){
		//console.log(response);
	});
}

function loadTypeDoc(selectType,type_sel="--",disabled=false){
	type_sel = (type_sel == "" || type_sel == "0" || type_sel == null)?"--":type_sel;
	getTypeDocs().done(function(response){
		$("#"+selectType).append(createSelectV1(response["response"],selectType,1,false,type_sel));
		$("#"+selectType).off("change");
		$("#"+selectType+" select").change( function(){
           ////console.log($("#"+selectType+" option:selected"));
           optionSelect($(this));
       });
		$("."+selectType).css('height', 'auto');
		$("."+selectType).attr('disabled', disabled);
	}).fail(function(response){
		//console.log(response);
	});
}

function loadTypeDoc2(selectType,type_sel="--",Type_User,disabled=false){
	type_sel = (type_sel == "" || type_sel == "0" || type_sel == null)?"--":type_sel;
	getTypeDocs().done(function(response){
		$("#"+selectType).append(createSelectV1(response["response"],selectType,1,false,type_sel));
		$("#"+selectType).off("change");
		$("#"+selectType+" select").change( function(){
           ////console.log($("#"+selectType+" option:selected"));
           optionSelectType($(this),Type_User);
       });
		$("."+selectType).css('height', 'auto');
		$("."+selectType).attr('disabled', disabled);
	}).fail(function(response){
		//console.log(response);
	});
}

function loadTypeEtn(selectType,type_sel="--",disabled=false){
	type_sel = (type_sel == "" || type_sel == "0" || type_sel == null)?"--":type_sel;
	getTypeEtnia().done(function(response){
		$("#"+selectType).append(createSelectV1(response["response"],selectType,1,false,type_sel));
		$("#"+selectType).off("change");
		$("#"+selectType+" select").change( function(){
           ////console.log($("#"+selectType+" option:selected"));
           optionSelect($(this));
       });
		$("."+selectType).css('height', 'auto');
		$("."+selectType).attr('disabled', disabled);
	}).fail(function(response){
		//console.log(response);
	});
}

function loadNationality(selectNationality,national_sel="--",disabled=false){
	national_sel = (national_sel == "" || national_sel == "0" || national_sel == null)?"--":national_sel;
	getNationality().done(function(response){
		$("#"+selectNationality).append(createSelect(response["response"],selectNationality,1,false,national_sel));
		$("#"+selectNationality).off("change");
		$("#"+selectNationality+" select").change( function(){
           ////console.log($("#"+selectNationality+" option:selected"));
           optionSelect($(this));
       });
		$("."+selectNationality).css('height', 'auto');
		$("."+selectNationality).attr('disabled', disabled);
	}).fail(function(response){
		//console.log(response);
	});
}

function loadRoutesExtra(selectRoute,route_sel="--",disabled=false){
	route_sel = (route_sel == "" || route_sel == "0")?"--":route_sel;
	getRoutesExtra().done(function(response){
		$("#"+selectRoute).append(createSelect(response["response"],selectRoute,1,false,route_sel));
		$("#"+selectRoute).off("change");
		$("#"+selectRoute+" select").change( function(){
           ////console.log($("#"+selectRoute+" option:selected"));
           optionSelect($(this));
       });
		$("."+selectRoute).css('height', 'auto');
		$("."+selectRoute).attr('disabled', disabled);
	}).fail(function(response){
		//console.log(response);
	});
}

function loadBusStop(numRoute,selectBusStop,stop_sel="--",disabled=false){
	stop_sel = (stop_sel == "" || stop_sel == "0")?"--":stop_sel;
	getBusStop(numRoute).done(function(response){
		$("#"+selectBusStop).append(createSelect(response["response"],selectBusStop,1,false,stop_sel));
		$("#"+selectBusStop).off("change");
		$("#"+selectBusStop+" select").change( function(){
           ////console.log($("#"+selectBusStop+" option:selected"));
           optionSelect($(this));
       });
		$("."+selectBusStop).css('height', 'auto');
		$("."+selectBusStop).attr('disabled', disabled);
	}).fail(function(response){
		//console.log(response);
	});
}

function optionRadio(object,student){
	var option = $(object).attr('data-val');
	var option_id = $(object).find('input').attr('name');
	if ((option_id != "exploratory_valuation") && option_id != "poliza_seguro") {
		if (option_id == "group_etnia") {
			if (option == "Si") {
				$("#selectTypeEtniaselec").removeClass('d-none');
				$("#selectTypeEtnia").children().remove();
				loadTypeEtn("selectTypeEtnia",student["Etnia"]);
			}else{
				$("#selectTypeEtnia").children().remove();
				$("#selectTypeEtniaselec").addClass('d-none');
			}
		} else {
			if (option == "Si") {
				$("#div_"+option_id).removeClass('d-none');
				
			}
			else if (option == "No") {
				$("#div_"+option_id).addClass('d-none');
				$("#div_"+option_id).find('textarea').val("");
				$("#div_"+option_id).find('input').val("");
			}	
		}
	}
	else {
		if (option == "No") {
			$("#div_"+option_id).removeClass('d-none');
		}
		else if (option == "Si") {
			$("#div_"+option_id).addClass('d-none');
			$("#div_"+option_id).find('textarea').val("");
			$("#div_"+option_id).find('input').val("");
		}
	}
	//console.log(option);
	//console.log(object);
}

function optionSelect(object){
	if (object.hasClass('selectCountryNac')) {
		////console.log("Entro a Pais");
		if (object.val() == "--") {
			$("#selectDeptoNac").children().remove();
			loadDeptos("selectDeptoNac","",true);
			$("#selectCityNac").children().remove();
			loadCitys("selectCityNac","--","CO","",true);
			$("#label_selectDeptoNac").removeClass('d-none');
			$("#selectDeptoNac").parent().removeClass('d-none');
			$("#label_selectCityNac").removeClass('col-md-4');
			$("#selectCityNac").parent().removeClass('col-md-4');
		}
		else if (object.val() == "CO") {
			$("#selectDeptoNac").children().remove();
			loadDeptos("selectDeptoNac");
			$("#selectCityNac").children().remove();
			loadCitys("selectCityNac","--","CO","",true);
			$("#label_selectDeptoNac").removeClass('d-none');
			$("#selectDeptoNac").parent().removeClass('d-none');
			$("#label_selectCityNac").removeClass('col-md-4');
			$("#selectCityNac").parent().removeClass('col-md-4');
		}
		else {
			$("#selectDeptoNac").children().remove();
			loadDeptos("selectDeptoNac","",true);
			$("#selectCityNac").children().remove();
			loadCitys("selectCityNac","--",object.val(),"");
			$("#label_selectDeptoNac").addClass('d-none');
			$("#selectDeptoNac").parent().addClass('d-none');
			$("#label_selectCityNac").addClass('col-md-4');
			$("#selectCityNac").parent().addClass('col-md-4');

		}
	}
	else if (object.hasClass('selectDeptoNac')) {
		////console.log("Entro a Depto Nacimiento");
		if (object.val() == "--") {
			$("#selectCityNac").children().remove();
			loadCitys("selectCityNac","--","CO","",true);
		}
		else {
			$("#selectCityNac").children().remove();
			loadCitys("selectCityNac","--","CO",object.val());
		}
	}
	else if (object.hasClass('selectCityNac')) {
		////console.log("Entro a Ciudad Nacimiento");
	}
	else if (object.hasClass('selectTypeDoc')) {
		////console.log("Entro a Tipo Documento");
		if (object.val() == "--") {
			$("#selectDeptoExp").children().remove();
			loadDeptos("selectDeptoExp");
			$("#selectCityExp").children().remove();
			loadCitys("selectCityExp","--","CO","",true);
			$("#infoDocAdditional").addClass('d-none');
			$("#infoDocAdditional").find('input').val("");
			$("#number_visa").attr('disabled', true);
			$("#date_visa_exp").attr('disabled', true);
			$("#date_visa_venc").attr('disabled', true);
			$("#label_selectDeptoExp").children().remove();
			$("#label_selectDeptoExp").append('<span class="" style="font-size: 10px">(Departamento)</span>');
		}
		else if (object.val() == "7" || object.val() == "13"){
			
			$(".selectDeptoExp").val('--');
			$(".selectCityExp").val('--');
			$(".selectDeptoExp").attr('disabled',true);
			$(".selectCityExp").attr('disabled',true);
			$("#selectDeptoExp").attr('disabled',true);
			$("#infoDocAdditional").removeClass('d-none');
			$("#number_visa").attr('disabled', true);
			$("#date_visa_exp").removeAttr('disabled');
			$("#date_visa_venc").removeAttr('disabled');
			$("#label_selectDeptoExp").children().remove();
			$("#label_selectDeptoExp").append('<span class="" style="font-size: 10px">(País)</span>');
			/* $("#label_doc_requisito").removeClass('d-none'); */

		}
		else if (object.val() == "8" || object.val() == "15") {
			$("#selectDeptoExp").children().remove();
			loadCountrys("selectDeptoExp");
			$("#selectCityExp").children().remove();
			loadCitys("selectCityExp","--","CO","",true);
			$("#infoDocAdditional").removeClass('d-none');
			$("#number_visa").attr('disabled', true);
			$("#date_visa_exp").removeAttr('disabled');
			$("#date_visa_venc").removeAttr('disabled');
			$("#label_selectDeptoExp").children().remove();
			$("#label_selectDeptoExp").append('<span class="" style="font-size: 10px">(País)</span>');
			/* $("#label_doc_requisito").removeClass('d-none'); */

		}
		else {
			$("#selectDeptoExp").children().remove();
			loadDeptos("selectDeptoExp");
			$("#selectCityExp").children().remove();
			loadCitys("selectCityExp","--","CO","",true);
			$("#infoDocAdditional").addClass('d-none');
			$("#infoDocAdditional").find('input').val("");
			$("#number_visa").attr('disabled', true);
			$("#date_visa_exp").attr('disabled', true);
			$("#date_visa_venc").attr('disabled', true);
			$("#label_selectDeptoExp").children().remove();
			$("#label_selectDeptoExp").append('<span class="" style="font-size: 10px">(Departamento)</span>');
			/* $("#label_doc_requisito").removeClass('d-none'); */
		}
	}
	else if (object.hasClass('selectDeptoExp')) {
		////console.log("Entro a Depto Expedicion");
		if (object.val() == "--") {
			$("#selectCityExp").children().remove();
			loadCitys("selectCityExp","--","CO","",true);
		}
		else if (object.val() != "--" && ($(".selectTypeDoc").val() != "8" && $(".selectTypeDoc").val() != "13" && $(".selectTypeDoc").val() != "15")) {
			////console.log("Entro a Option Depto");
			$("#selectCityExp").children().remove();
			loadCitys("selectCityExp","--","CO",object.val());
			
		}
		else if ($(".selectTypeDoc").val() == "8") {
			$("#selectCityHome").attr('disabled', true);
		}
		else if ($(".selectTypeDoc").val() == "15") {
			$("#selectCityHome").attr('disabled', true);
		}
		else if ($(".selectTypeDoc").val() == "13" ) {
			$("#selectCityHome").attr('disabled', true);
		}
		else if (object.val() != "--") {
			////console.log("Entro a Option Pais");
			$("#selectCityExp").children().remove();
			loadCitys("selectCityExp","--",object.val(),"");
		}
	}
	else if (object.hasClass('selectCityExp')) {
		////console.log("Entro a Ciudad Expedicion");
	}
	else if (object.hasClass('selectDeptoHome')) {
		////console.log("Entro a Depto Residencia");
		if (object.val() == "--") {
			$("#selectCityHome").children().remove();
			loadCitys("selectCityHome","--","CO","",true);
		}
		else if (object.val() != "--") {
			$("#selectCityHome").children().remove();
			loadCitys("selectCityHome","","CO",object.val());
		}
	}
	else if (object.hasClass('selectCityHome')) {
		////console.log("Entro a Ciudad Residencia");
	}
	else if (object.hasClass('selectCivilStatus')) {
		$("#div_custody").addClass('d-none');

		if (object.val() == "--") {
			$("#div_custody").addClass('d-none');
			$("#div_custody_other").addClass('d-none');
			$("#div_custody").find('select').val("--");
			$("#div_custody_other").find('input').val("");
			$(".infoMother").removeClass('d-none');
			$(".infoFather").removeClass('d-none');
		}else if(object.val() == 2 || object.val() == 3 ) {
			$("#div_custody").removeClass('d-none');
			$("#custody").val('--'); 
			$(".infoMother").removeClass('d-none');
			$(".infoFather").removeClass('d-none');
			$("#div_recoge_padre").addClass("d-none");
			$("#div_recoge_madre").addClass("d-none");
			
		}
		else {
			$("#div_custody").addClass('d-none');
			$("#div_custody_other").addClass('d-none');
			$("#div_custody").find('select').val("--");
			$("#div_custody_other").find('input').val("");
			$(".infoMother").removeClass('d-none');
			$(".infoFather").removeClass('d-none');
			if (object.val() == 4) {
				$(".infoMother").addClass('d-none');
			}
			if (object.val() == 10) {
				$(".infoFather").addClass('d-none');
			}
		}
	}
	else if (object.hasClass('father_selectCountryNac')) {
		console.log("Entro a Pais Nac Padre");
		if (object.val() == "--") {
			$("#father_selectCityNac").children().remove();
			loadCitys("father_selectCityNac","--","CO","",true);
		}
		else {
			$("#father_selectCityNac").children().remove();
			loadCitys("father_selectCityNac","--",object.val(),"");
		}
	}
	else if (object.hasClass('father_selectTypeDoc')) {
		////console.log("Entro a Tipo Documento");
		if (object.val() == "--") {
			$("#father_selectDeptoExp").children().remove();
			loadDeptos("father_selectDeptoExp");
			$("#father_selectCityExp").children().remove();
			loadCitys("father_selectCityExp","--","CO","",true);
			$("#label_father_selectDeptoExp").children().remove();
			$("#label_father_selectDeptoExp").append('<span class="" style="font-size: 10px">(Departamento)</span>');
		}
		else if (object.val() == "8" || object.val() == "9" || object.val() == "15") {
			$("#father_selectDeptoExp").children().remove();
			loadCountrys("father_selectDeptoExp");
			$("#father_selectCityExp").children().remove();
			loadCitys("father_selectCityExp","--","CO","",true);
			$("#label_father_selectDeptoExp").children().remove();
			$("#label_father_selectDeptoExp").append('<span class="" style="font-size: 10px">(País)</span>');
		}
		else {
			$("#father_selectDeptoExp").children().remove();
			loadDeptos("father_selectDeptoExp");
			$("#father_selectCityExp").children().remove();
			loadCitys("father_selectCityExp","--","CO","",true);
			$("#label_father_selectDeptoExp").children().remove();
			$("#label_father_selectDeptoExp").append('<span class="" style="font-size: 10px">(Departamento)</span>');
		}
	}
	else if (object.hasClass('father_selectDeptoExp')) {
		////console.log("Entro a Depto Expedicion");
		if (object.val() == "--") {
			$("#father_selectCityExp").children().remove();
			loadCitys("father_selectCityExp","--","CO","",true);
		}
		else if (object.val() != "--" && ($(".father_selectTypeDoc").val() != "8" && $(".father_selectTypeDoc").val() != "9" && $(".father_selectTypeDoc").val() != "15")) {
			////console.log("Entro a Option Depto");
			$("#father_selectCityExp").children().remove();
			loadCitys("father_selectCityExp","--","CO",object.val());
		}
		else if (object.val() != "--") {
			////console.log("Entro a Option Pais");
			$("#father_selectCityExp").children().remove();
			loadCitys("father_selectCityExp","--",object.val(),"");
		}
	}
	else if (object.hasClass('father_selectCityExp')) {
		////console.log("Entro a Ciudad Expedicion");
	}
	else if (object.hasClass('father_selectDeptoHome')) {
		////console.log("Entro a Depto Residencia");
		if (object.val() == "--") {
			$("#father_selectCityHome").children().remove();
			loadCitys("father_selectCityHome","--","CO","",true);
		}
		else if (object.val() != "--") {
			$("#father_selectCityHome").children().remove();
			loadCitys("father_selectCityHome","","CO",object.val());
		}
	}
	else if (object.hasClass('father_selectCityHome')) {
		////console.log("Entro a Ciudad Residencia");
	}
	else if (object.hasClass('mother_selectCountryNac')) {
		console.log("Entro a Pais Nac Madre");
		if (object.val() == "--") {
			$("#mother_selectCityNac").children().remove();
			loadCitys("mother_selectCityNac","--","CO","",true);
		}
		else {
			$("#mother_selectCityNac").children().remove();
			loadCitys("mother_selectCityNac","--",object.val(),"");
		}
	}
	else if (object.hasClass('mother_selectTypeDoc')) {
		////console.log("Entro a Tipo Documento");
		if (object.val() == "--") {
			$("#mother_selectDeptoExp").children().remove();
			loadDeptos("mother_selectDeptoExp");
			$("#mother_selectCityExp").children().remove();
			loadCitys("mother_selectCityExp","--","CO","",true);
			$("#label_mother_selectDeptoExp").children().remove();
			$("#label_mother_selectDeptoExp").append('<span class="" style="font-size: 10px">(Departamento)</span>');
		}
		else if (object.val() == "8" || object.val() == "9" || object.val() == "15") {
			$("#mother_selectDeptoExp").children().remove();
			loadCountrys("mother_selectDeptoExp");
			$("#mother_selectCityExp").children().remove();
			loadCitys("mother_selectCityExp","--","CO","",true);
			$("#label_mother_selectDeptoExp").children().remove();
			$("#label_mother_selectDeptoExp").append('<span class="" style="font-size: 10px">(País)</span>');
		}
		else {
			$("#mother_selectDeptoExp").children().remove();
			loadDeptos("mother_selectDeptoExp");
			$("#mother_selectCityExp").children().remove();
			loadCitys("mother_selectCityExp","--","CO","",true);
			$("#label_mother_selectDeptoExp").children().remove();
			$("#label_mother_selectDeptoExp").append('<span class="" style="font-size: 10px">(Departamento)</span>');
		}
	}
	else if (object.hasClass('mother_selectDeptoExp')) {
		////console.log("Entro a Depto Expedicion");
		if (object.val() == "--") {
			$("#mother_selectCityExp").children().remove();
			loadCitys("mother_selectCityExp","--","CO","",true);
		}
		else if (object.val() != "--" && ($(".mother_selectTypeDoc").val() != "8" && $(".mother_selectTypeDoc").val() != "9" && $(".mother_selectTypeDoc").val() != "15")) {
			$("#mother_selectCityExp").children().remove();
			loadCitys("mother_selectCityExp","--","CO",object.val());
		}
		else if (object.val() != "--") {
			////console.log("Entro a Option Pais");
			$("#mother_selectCityExp").children().remove();
			loadCitys("mother_selectCityExp","--",object.val(),"");
		}
	}
	else if (object.hasClass('mother_selectCityExp')) {
		////console.log("Entro a Ciudad Expedicion");
	}
	else if (object.hasClass('mother_selectDeptoHome')) {
		////console.log("Entro a Depto Residencia");
		if (object.val() == "--") {
			$("#mother_selectCityHome").children().remove();
			loadCitys("mother_selectCityHome","--","CO","",true);
		}
		else if (object.val() != "--") {
			$("#mother_selectCityHome").children().remove();
			loadCitys("mother_selectCityHome","","CO",object.val());
		}
	}
	else if (object.hasClass('mother_selectCityHome')) {
		////console.log("Entro a Ciudad Residencia");
	}
	else if (object.hasClass('tutor_selectTypeDoc')) {
		////console.log("Entro a Tipo Documento");
		if (object.val() == "--") {
			$("#tutor_selectDeptoExp").children().remove();
			loadDeptos("tutor_selectDeptoExp");
			$("#tutor_selectCityExp").children().remove();
			loadCitys("tutor_selectCityExp","--","CO","",true);
			$("#label_tutor_selectDeptoExp").children().remove();
			$("#label_tutor_selectDeptoExp").append('<span class="" style="font-size: 10px">(Departamento)</span>');
		}
		else if (object.val() == "8" || object.val() == "9" || object.val() == "15") {
			$("#tutor_selectDeptoExp").children().remove();
			loadCountrys("tutor_selectDeptoExp");
			$("#tutor_selectCityExp").children().remove();
			loadCitys("tutor_selectCityExp","--","CO","",true);
			$("#label_tutor_selectDeptoExp").children().remove();
			$("#label_tutor_selectDeptoExp").append('<span class="" style="font-size: 10px">(País)</span>');
		}
		else {
			$("#tutor_selectDeptoExp").children().remove();
			loadDeptos("tutor_selectDeptoExp");
			$("#tutor_selectCityExp").children().remove();
			loadCitys("tutor_selectCityExp","--","CO","",true);
			$("#label_tutor_selectDeptoExp").children().remove();
			$("#label_tutor_selectDeptoExp").append('<span class="" style="font-size: 10px">(Departamento)</span>');
		}
	}
	else if (object.hasClass('tutor_selectDeptoExp')) {
		////console.log("Entro a Depto Expedicion");
		if (object.val() == "--") {
			$("#tutor_selectCityExp").children().remove();
			loadCitys("tutor_selectCityExp","--","CO","",true);
		}
		else if (object.val() != "--" && ($(".tutor_selectTypeDoc").val() != "8" && $(".tutor_selectTypeDoc").val() != "9" && $(".tutor_selectTypeDoc").val() != "15")) {
			////console.log("Entro a Option Depto");
			$("#tutor_selectCityExp").children().remove();
			loadCitys("tutor_selectCityExp","--","CO",object.val());
		}
		else if (object.val() != "--") {
			////console.log("Entro a Option Pais");
			$("#tutor_selectCityExp").children().remove();
			loadCitys("tutor_selectCityExp","--",object.val(),"");
		}
	}
	else if (object.hasClass('tutor_selectCityExp')) {
		////console.log("Entro a Ciudad Expedicion");
	}
	else if (object.hasClass('emergency_selectTypeDoc')) {
		////console.log("Entro a Tipo Documento");
		if (object.val() == "--") {
			$("#emergency_selectDeptoExp").children().remove();
			loadDeptos("emergency_selectDeptoExp");
			$("#emergency_selectCityExp").children().remove();
			loadCitys("emergency_selectCityExp","--","CO","",true);
			$("#label_emergency_selectDeptoExp").children().remove();
			$("#label_emergency_selectDeptoExp").append('<span class="" style="font-size: 10px">(Departamento)</span>');
		}
		else if (object.val() == "8" || object.val() == "9" || object.val() == "15") {
			$("#emergency_selectDeptoExp").children().remove();
			loadCountrys("emergency_selectDeptoExp");
			$("#emergency_selectCityExp").children().remove();
			loadCitys("emergency_selectCityExp","--","CO","",true);
			$("#label_emergency_selectDeptoExp").children().remove();
			$("#label_emergency_selectDeptoExp").append('<span class="" style="font-size: 10px">(País)</span>');
		}
		else {
			$("#emergency_selectDeptoExp").children().remove();
			loadDeptos("emergency_selectDeptoExp");
			$("#emergency_selectCityExp").children().remove();
			loadCitys("emergency_selectCityExp","--","CO","",true);
			$("#label_emergency_selectDeptoExp").children().remove();
			$("#label_emergency_selectDeptoExp").append('<span class="" style="font-size: 10px">(Departamento)</span>');
		}
	}
	else if (object.hasClass('emergency_selectDeptoExp')) {
		////console.log("Entro a Depto Expedicion");
		if (object.val() == "--") {
			$("#emergency_selectCityExp").children().remove();
			loadCitys("emergency_selectCityExp","--","CO","",true);
		}
		else if (object.val() != "--" && ($(".emergency_selectTypeDoc").val() != "8" && $(".emergency_selectTypeDoc").val() != "9" && $(".emergency_selectTypeDoc").val() != "15")) {
			////console.log("Entro a Option Depto");
			$("#emergency_selectCityExp").children().remove();
			loadCitys("emergency_selectCityExp","--","CO",object.val());
		}
		else if (object.val() != "--") {
			////console.log("Entro a Option Pais");
			$("#emergency_selectCityExp").children().remove();
			loadCitys("emergency_selectCityExp","--",object.val(),"");
		}
	}
	else if (object.hasClass('emergency_selectCityExp')) {
		////console.log("Entro a Ciudad Expedicion");
	}
	else if (object.hasClass('emergency_add_selectTypeDoc')) {
		////console.log("Entro a Tipo Documento");
		if (object.val() == "--") {
			$("#emergency_add_selectDeptoExp").children().remove();
			loadDeptos("emergency_add_selectDeptoExp");
			$("#emergency_add_selectCityExp").children().remove();
			loadCitys("emergency_add_selectCityExp","--","CO","",true);
			$("#label_emergency_add_selectDeptoExp").children().remove();
			$("#label_emergency_add_selectDeptoExp").append('<span class="" style="font-size: 10px">(Departamento)</span>');
		}
		else if (object.val() == "8" || object.val() == "9" || object.val() == "15") {
			$("#emergency_add_selectDeptoExp").children().remove();
			loadCountrys("emergency_add_selectDeptoExp");
			$("#emergency_add_selectCityExp").children().remove();
			loadCitys("emergency_add_selectCityExp","--","CO","",true);
			$("#label_emergency_add_selectDeptoExp").children().remove();
			$("#label_emergency_add_selectDeptoExp").append('<span class="" style="font-size: 10px">(País)</span>');
		}
		else {
			$("#emergency_add_selectDeptoExp").children().remove();
			loadDeptos("emergency_add_selectDeptoExp");
			$("#emergency_add_selectCityExp").children().remove();
			loadCitys("emergency_add_selectCityExp","--","CO","",true);
			$("#label_emergency_add_selectDeptoExp").children().remove();
			$("#label_emergency_add_selectDeptoExp").append('<span class="" style="font-size: 10px">(Departamento)</span>');
		}
	}
	else if (object.hasClass('emergency_add_selectDeptoExp')) {
		////console.log("Entro a Depto Expedicion");
		if (object.val() == "--") {
			$("#emergency_add_selectCityExp").children().remove();
			loadCitys("emergency_add_selectCityExp","--","CO","",true);
		}
		else if (object.val() != "--" && ($(".emergency_add_selectTypeDoc").val() != "8" && $(".emergency_add_selectTypeDoc").val() != "9" && $(".emergency_add_selectTypeDoc").val() != "15")) {
			////console.log("Entro a Option Depto");
			$("#emergency_add_selectCityExp").children().remove();
			loadCitys("emergency_add_selectCityExp","--","CO",object.val());
		}
		else if (object.val() != "--") {
			////console.log("Entro a Option Pais");
			$("#emergency_add_selectCityExp").children().remove();
			loadCitys("emergency_add_selectCityExp","--",object.val(),"");
		}
	}
	else if (object.hasClass('emergency_add_selectCityExp')) {
		////console.log("Entro a Ciudad Expedicion");
	}
	else if (object.hasClass('debtor_selectTypeDoc')) {
		////console.log("Entro a Tipo Documento");
		if (object.val() == "--") {
			$("#debtor_selectDeptoExp").children().remove();
			loadDeptos("debtor_selectDeptoExp");
			$("#debtor_selectCityExp").children().remove();
			loadCitys("debtor_selectCityExp","--","CO","",true);
			$("#label_debtor_selectDeptoExp").children().remove();
			$("#label_debtor_selectDeptoExp").append('<span class="" style="font-size: 10px">(Departamento)</span>');
		}
		else if (object.val() == "8" || object.val() == "9"|| object.val() == "15") {
			$("#debtor_selectDeptoExp").children().remove();
			loadCountrys("debtor_selectDeptoExp");
			$("#debtor_selectCityExp").children().remove();
			loadCitys("debtor_selectCityExp","--","CO","",true);
			$("#label_debtor_selectDeptoExp").children().remove();
			$("#label_debtor_selectDeptoExp").append('<span class="" style="font-size: 10px">(País)</span>');
		}
		else {
			$("#debtor_selectDeptoExp").children().remove();
			loadDeptos("debtor_selectDeptoExp");
			$("#debtor_selectCityExp").children().remove();
			loadCitys("debtor_selectCityExp","--","CO","",true);
			$("#label_debtor_selectDeptoExp").children().remove();
			$("#label_debtor_selectDeptoExp").append('<span class="" style="font-size: 10px">(Departamento)</span>');
		}
	}
	else if (object.hasClass('debtor_selectDeptoExp')) {
		////console.log("Entro a Depto Expedicion");
		if (object.val() == "--") {
			$("#debtor_selectCityExp").children().remove();
			loadCitys("debtor_selectCityExp","--","CO","",true);
		}
		else if (object.val() != "--" && ($(".debtor_selectTypeDoc").val() != "8" && $(".debtor_selectTypeDoc").val() != "9" && $(".debtor_selectTypeDoc").val() != "15")) {
			////console.log("Entro a Option Depto");
			$("#debtor_selectCityExp").children().remove();
			loadCitys("debtor_selectCityExp","--","CO",object.val());
		}
		else if (object.val() != "--") {
			////console.log("Entro a Option Pais");
			$("#debtor_selectCityExp").children().remove();
			loadCitys("debtor_selectCityExp","--",object.val(),"");
		}
	}
	else if (object.hasClass('debtor_selectCityExp')) {
		////console.log("Entro a Ciudad Expedicion");
	}
	else if (object.hasClass('debtor_selectDeptoHome')) {
		////console.log("Entro a Depto Residencia");
		if (object.val() == "--") {
			$("#debtor_selectCityHome").children().remove();
			loadCitys("debtor_selectCityHome","--","CO","",true);
		}
		else if (object.val() != "--") {
			$("#debtor_selectCityHome").children().remove();
			loadCitys("debtor_selectCityHome","","CO",object.val());
		}
	}
	else if (object.hasClass('debtor_selectCityHome')) {
		////console.log("Entro a Ciudad Residencia");
	}
	else if (object.hasClass('codebtor_selectTypeDoc')) {
		////console.log("Entro a Tipo Documento");
		if (object.val() == "--") {
			$("#codebtor_selectDeptoExp").children().remove();
			loadDeptos("codebtor_selectDeptoExp");
			$("#codebtor_selectCityExp").children().remove();
			loadCitys("codebtor_selectCityExp","--","CO","",true);
			$("#label_codebtor_selectDeptoExp").children().remove();
			$("#label_codebtor_selectDeptoExp").append('<span class="" style="font-size: 10px">(Departamento)</span>');
		}
		else if (object.val() == "8" || object.val() == "9" || object.val() == "15") {
			$("#codebtor_selectDeptoExp").children().remove();
			loadCountrys("codebtor_selectDeptoExp");
			$("#codebtor_selectCityExp").children().remove();
			loadCitys("codebtor_selectCityExp","--","CO","",true);
			$("#label_codebtor_selectDeptoExp").children().remove();
			$("#label_codebtor_selectDeptoExp").append('<span class="" style="font-size: 10px">(País)</span>');
		}
		else {
			$("#codebtor_selectDeptoExp").children().remove();
			loadDeptos("codebtor_selectDeptoExp");
			$("#codebtor_selectCityExp").children().remove();
			loadCitys("codebtor_selectCityExp","--","CO","",true);
			$("#label_codebtor_selectDeptoExp").children().remove();
			$("#label_codebtor_selectDeptoExp").append('<span class="" style="font-size: 10px">(Departamento)</span>');
		}
	}
	else if (object.hasClass('codebtor_selectDeptoExp')) {
		////console.log("Entro a Depto Expedicion");
		if (object.val() == "--") {
			$("#codebtor_selectCityExp").children().remove();
			loadCitys("codebtor_selectCityExp","--","CO","",true);
		}
		else if (object.val() != "--" && ($(".codebtor_selectTypeDoc").val() != "8" && $(".codebtor_selectTypeDoc").val() != "9" && $(".codebtor_selectTypeDoc").val() != "15")) {
			////console.log("Entro a Option Depto");
			$("#codebtor_selectCityExp").children().remove();
			loadCitys("codebtor_selectCityExp","--","CO",object.val());
		}
		else if (object.val() != "--") {
			////console.log("Entro a Option Pais");
			$("#codebtor_selectCityExp").children().remove();
			loadCitys("codebtor_selectCityExp","--",object.val(),"");
		}
	}
	else if (object.hasClass('codebtor_selectCityExp')) {
		////console.log("Entro a Ciudad Expedicion");
	}
	else if (object.hasClass('codebtor_selectDeptoHome')) {
		////console.log("Entro a Depto Residencia");
		if (object.val() == "--") {
			$("#codebtor_selectCityHome").children().remove();
			loadCitys("codebtor_selectCityHome","--","CO","",true);
		}
		else if (object.val() != "--") {
			$("#codebtor_selectCityHome").children().remove();
			loadCitys("codebtor_selectCityHome","","CO",object.val());
		}
	}
	else if (object.hasClass('codebtor_selectCityHome')) {
		////console.log("Entro a Ciudad Residencia");
	}
	else if (object.hasClass('routeExtra')) {
		if (object.val() == "--") {
			$("#busStop").children().remove();
			loadBusStop(object.val(),"busStop","--",true);
		}
		else if (object.val() != "--") {
			$("#busStop").children().remove();
			loadBusStop(object.val(),"busStop");
		}
	}
}

function optionSelectType(object,tipoUsers){
	////console.log("Entro a Select");
	////console.log(object);
	 if (object.hasClass('selectTypeDoc')) {
		////console.log("Entro a Tipo Documento");
		if (object.val() == "--") {
			$("#selectDeptoExp").children().remove();
			loadDeptos("selectDeptoExp");
			$("#selectCityExp").children().remove();
			loadCitys("selectCityExp","--","CO","",true);
			$("#infoDocAdditional").addClass('d-none');
			$("#infoDocAdditional").find('input').val("");
			$("#number_visa").attr('disabled', true);
			$("#date_visa_exp").attr('disabled', true);
			$("#date_visa_venc").attr('disabled', true);
			$("#label_selectDeptoExp").children().remove();
			$("#label_selectDeptoExp").append('<span class="" style="font-size: 10px">(Departamento)</span>');
		}
		else if (object.val() == "7" || object.val() == "13"){
			
			$(".selectDeptoExp").val('--');
			$(".selectCityExp").val('--');
			$(".selectDeptoExp").attr('disabled',true);
			$(".selectCityExp").attr('disabled',true);
			$("#selectDeptoExp").attr('disabled',true);
			$("#infoDocAdditional").removeClass('d-none');
			$("#number_visa").attr('disabled', true);
			$("#date_visa_exp").removeAttr('disabled');
			$("#date_visa_venc").removeAttr('disabled');
			$("#label_selectDeptoExp").children().remove();
			$("#label_selectDeptoExp").append('<span class="" style="font-size: 10px">(País)</span>');
/* 			if(tipoUsers==2){
				$("#label_doc_requisito").removeClass('d-none');
			}else{
				$("#label_doc_requisito").addClass('d-none');
			} */
			

		}
		else if (object.val() == "8" || object.val() == "15") {
			$("#selectDeptoExp").children().remove();
			loadCountrys("selectDeptoExp");
			$("#selectCityExp").children().remove();
			loadCitys("selectCityExp","--","CO","",true);
			$("#infoDocAdditional").removeClass('d-none');
			$("#number_visa").attr('disabled', true);
			$("#date_visa_exp").removeAttr('disabled');
			$("#date_visa_venc").removeAttr('disabled');
			$("#label_selectDeptoExp").children().remove();
			$("#label_selectDeptoExp").append('<span class="" style="font-size: 10px">(País)</span>');
/* 			if(tipoUsers==2){
				$("#label_doc_requisito").removeClass('d-none');
			}else{
				$("#label_doc_requisito").addClass('d-none');
			}
 */
		}
		else {
			$("#selectDeptoExp").children().remove();
			loadDeptos("selectDeptoExp");
			$("#selectCityExp").children().remove();
			loadCitys("selectCityExp","--","CO","",true);
			$("#infoDocAdditional").addClass('d-none');
			$("#infoDocAdditional").find('input').val("");
			$("#number_visa").attr('disabled', true);
			$("#date_visa_exp").attr('disabled', true);
			$("#date_visa_venc").attr('disabled', true);
			$("#label_selectDeptoExp").children().remove();
			$("#label_selectDeptoExp").append('<span class="" style="font-size: 10px">(Departamento)</span>');
/* 			if(tipoUsers==2){
				$("#label_doc_requisito").removeClass('d-none');
			}else{
				$("#label_doc_requisito").addClass('d-none');
			} */
		}
	}
	
}

function showReasons(nameRadio,reasonRadio,reasonRadioAlter=""){
	// console.log(nameRadio);
	// console.log(reasonRadio);
	var val_data = false;
	if (nameRadio == "major_disease") {
		if ((reasonRadio != "" && reasonRadio != undefined && reasonRadio != null) || (reasonRadioAlter != "" && reasonRadioAlter != undefined && reasonRadioAlter != null)) {
			$("."+nameRadio+"[data-val='Si']").addClass('active');
			$("#reason_"+nameRadio).val(reasonRadio);
			$("#dose_"+nameRadio).val(reasonRadioAlter);
			val_data = true;
		}
		else {
			$("."+nameRadio+"[data-val='No']").addClass('active');
		}
	}

	else if (nameRadio == "permanent_medication") {
		if ((reasonRadio != "" && reasonRadio != undefined && reasonRadio != null) || (reasonRadioAlter != "" && reasonRadioAlter != undefined && reasonRadioAlter != null)) {
			$("."+nameRadio+"[data-val='Si']").addClass('active');
			$("#name_"+nameRadio).val(reasonRadio);
			$("#dose_"+nameRadio).val(reasonRadioAlter);
			val_data = true;
		}
		else {
			$("."+nameRadio+"[data-val='No']").addClass('active');
		}
	}



	else if (nameRadio == "medical_condition") {
		if ((reasonRadio != "" && reasonRadio != undefined && reasonRadio != null) || (reasonRadioAlter != "" && reasonRadioAlter != undefined && reasonRadioAlter != null)) {
			$("."+nameRadio+"[data-val='Si']").addClass('active');
			$("#which_"+nameRadio).val(reasonRadio);
			$("#treatment_"+nameRadio).val(reasonRadioAlter);
			val_data = true;
		}
		else {
			$("."+nameRadio+"[data-val='No']").addClass('active');
		}
	}



	else if (nameRadio == "group_etnia") {
		if ( reasonRadio != 0 ) {
			$("."+nameRadio+"[data-val='Si']").addClass('active');
			
			val_data = true;
		}
		else {
			$("."+nameRadio+"[data-val='No']").addClass('active');
		}
	}

	else if (nameRadio == "convulsion") {
		if ((reasonRadio != "" && reasonRadio != undefined && reasonRadio != null) || (reasonRadioAlter != "" && reasonRadioAlter != undefined && reasonRadioAlter != null)) {
			$("."+nameRadio+"[data-val='Si']").addClass('active');
			$("#reason_"+nameRadio).val(reasonRadio);
			$("#quantity_"+nameRadio).val(reasonRadioAlter);
			val_data = true;
		}
		else {
			$("."+nameRadio+"[data-val='No']").addClass('active');
		}
	}
	else if (nameRadio == "allergy") {
		if ((reasonRadio != "" && reasonRadio != undefined && reasonRadio != null) || (reasonRadioAlter != "" && reasonRadioAlter != undefined && reasonRadioAlter != null)) {
			$("."+nameRadio+"[data-val='Si']").addClass('active');
			$("#reason_"+nameRadio).val(reasonRadio);
			val_data = true;
		}
		else {
			$("."+nameRadio+"[data-val='No']").addClass('active');
		}
	}
	else if (nameRadio == "allergy_medication") {
		if ((reasonRadio != "" && reasonRadio != undefined && reasonRadio != null) || (reasonRadioAlter != "" && reasonRadioAlter != undefined && reasonRadioAlter != null)) {
			$("."+nameRadio+"[data-val='Si']").addClass('active');
			$("#reason_"+nameRadio).val(reasonRadio);
			val_data = true;
		}
		else {
			$("."+nameRadio+"[data-val='No']").addClass('active');
		}
	}
	else if (nameRadio == "allergy_alimento") {
		if ((reasonRadio != "" && reasonRadio != undefined && reasonRadio != null) || (reasonRadioAlter != "" && reasonRadioAlter != undefined && reasonRadioAlter != null)) {
			$("."+nameRadio+"[data-val='Si']").addClass('active');
			$("#reason_"+nameRadio).val(reasonRadio);
			val_data = true;
		}
		else {
			$("."+nameRadio+"[data-val='No']").addClass('active');
		}
	}
	else if (nameRadio == "disturbance") {
		if ((reasonRadio != "" && reasonRadio != undefined && reasonRadio != null) || (reasonRadioAlter != "" && reasonRadioAlter != undefined && reasonRadioAlter != null)) {
			$("."+nameRadio+"[data-val='Si']").addClass('active');
			$("#reason_"+nameRadio).val(reasonRadio);
			val_data = true;
		}
		else {
			$("."+nameRadio+"[data-val='No']").addClass('active');
		}
	}
	else if (nameRadio == "poliza_seguro") {
		if ((reasonRadio != "" && reasonRadio != undefined && reasonRadio != null) || (reasonRadioAlter != "" && reasonRadioAlter != undefined && reasonRadioAlter != null)) {
			$("."+nameRadio+"[data-val='No']").addClass('active');
			$("#reason_"+nameRadio).val(reasonRadio);
		}
		else {
			$("."+nameRadio+"[data-val='Si']").addClass('active');
			val_data = true;
		}
	}
	else if (nameRadio == "musculoskeletal_injuries") {
		if ((reasonRadio != "" && reasonRadio != undefined && reasonRadio != null) || (reasonRadioAlter != "" && reasonRadioAlter != undefined && reasonRadioAlter != null)) {
			$("."+nameRadio+"[data-val='Si']").addClass('active');
			$("#reason_"+nameRadio).val(reasonRadio);
			val_data = true;
		}
		else {
			$("."+nameRadio+"[data-val='No']").addClass('active');
		}
	}
	else if (nameRadio == "convulsion_medication") {
		if ((reasonRadio != "" && reasonRadio != undefined && reasonRadio != null) || (reasonRadioAlter != "" && reasonRadioAlter != undefined && reasonRadioAlter != null)) {
			$("."+nameRadio+"[data-val='Si']").addClass('active');
			$("#reason_"+nameRadio).val(reasonRadio);
			val_data = true;
		}
		else {
			$("."+nameRadio+"[data-val='No']").addClass('active');
		}
	}
	else if (nameRadio == "surgical_history") {
		if ((reasonRadio != "" && reasonRadio != undefined && reasonRadio != null) || (reasonRadioAlter != "" && reasonRadioAlter != undefined && reasonRadioAlter != null)) {
			$("."+nameRadio+"[data-val='Si']").addClass('active');
			$("#reason_"+nameRadio).val(reasonRadio);
			val_data = true;
		}
		else {
			$("."+nameRadio+"[data-val='No']").addClass('active');
		}
	}
	else if(nameRadio == "depto_bienestar"){
		var bienestar = (reasonRadio == "1")?"Si":"No";
		if ((bienestar != "" && bienestar != undefined && bienestar != null && bienestar == "Si")) {
			$("."+nameRadio+"[data-val='1']").addClass('active');
			val_data = true;
		}
		else {
			$("."+nameRadio+"[data-val='0']").addClass('active');
		}	
	}
	else {
		if ((reasonRadio != "" && reasonRadio != undefined && reasonRadio != null && reasonRadio == "Si")) {
			$("."+nameRadio+"[data-val='Si']").addClass('active');
			$("#reason_"+nameRadio).val(reasonRadio);
			val_data = true;
		}
		else {
			$("."+nameRadio+"[data-val='No']").addClass('active');
		}
	}
	var final_val = (reasonRadio == "Si" || reasonRadio == "No")?reasonRadio:((val_data == true)?"Si":"No");
	optionRadio($("."+nameRadio+"[data-val='"+final_val+"']"),val_data);
}

function showSelectorsStudent(student){
	// loadNationality("selectNacionality",student["Nacionality"]);
	loadCountrys("selectNacionality",student["Nacionality"]);
	loadCountrys("selectCountryNac",student["Country"]);
	
	/* Al cargar el departamento de Nacimiento dependera del país seleccionado, si el país es Colombia muestra los departamentos de lo contrario no */
	if (student["Country"] != "") {
		if (student["Country"] == "CO") {
			loadDeptos("selectDeptoNac",student["Dpto_Nac"]);
		}
		else {
			loadDeptos("selectDeptoNac","",true);
			$(".title.selectDeptoNac").children().addClass('d-none');
			$("#label_selectDeptoNac").addClass('d-none');
			$("#selectDeptoNac").parent().addClass('d-none');
			$("#label_selectCityNac").addClass('col-md-4');
			$("#selectCityNac").parent().addClass('col-md-4');
		}
	}
	else if (student["Country"] == "") {
		loadDeptos("selectDeptoNac","",true);
	}
	/* En el caso de la ciudades si el país es Colombia las ciudades dependeran del departamento seleccionado, si es diferente dependeran del País */
	if (student["Country"] != "") {
		if (student["Country"] == "CO" && student["Dpto_Nac"] != "") {
			loadCitys("selectCityNac",student["City_Nac"],student["Country"],student["Dpto_Nac"]);
		}
		else if (student["Country"] != "CO") {
			loadCitys("selectCityNac",student["City_Nac"],student["Country"]);
		}
		else {
			loadCitys("selectCityNac","","CO","",true);
		}
	}
	else if (student["Country"] == "") {
		loadCitys("selectCityNac","","CO","",true);
	}
	/* En el caso que el tipo de Documento sea Pasaporte(8) en lugar de traer los departamentos se traerá la ciudad, si es algún otro tipo de Documento traerá el selector con departamentos */
	loadTypeDoc2("selectTypeDoc",student["Type_Doc"],student["Type_User"]);

	if (student["Type_Doc"] != "0") {
		if (student["Type_Doc"] == "8" || student["Type_Doc"] == "7" || student["Type_Doc"] == "13" || student["Type_Doc"] == "15") {
			if(student["Type_Doc"] == "7"){
				loadCountrys("selectDeptoExp",student["Dpto_Doc"],true);
			}else{
				loadCountrys("selectDeptoExp",student["Dpto_Doc"]);
			}
		$("#infoDocAdditional").removeClass('d-none');
		$("#number_visa").addClass('disabled');
		$("#date_visa_exp").removeAttr('disabled');
		$("#date_visa_venc").removeAttr('disabled');
	
		}
		else if (student["Type_Doc"] != "8" && student["Type_Doc"] != "7" && student["Type_Doc"] != "13" && student["Type_Doc"] != "15") {
			loadDeptos("selectDeptoExp",student["Dpto_Doc"]);
			
		}
	} 
	else if (student["Type_Doc"] == "0") {
		loadDeptos("selectDeptoExp","",true);
	}
	//loadDeptos("selectDeptoExp",student["Dpto_Doc"]);
	if (student["Dpto_Doc"] != "" && (student["Type_Doc"] != "8" && student["Type_Doc"] != "7" && student["Type_Doc"] != "13" && student["Type_Doc"] != "15") && student["Type_Doc"] != "0") {
		loadCitys("selectCityExp",student["City_Doc"],"CO",student["Dpto_Doc"]);
	}
	else if (student["Dpto_Doc"] != "" && (student["Type_Doc"] == "8" || student["Type_Doc"] == "7" || student["Type_Doc"] == "13" || student["Type_Doc"] == "15")) {
		loadCitys("selectCityExp",student["City_Doc"],student["Dpto_Doc"],"",true);
		
	}

	else if (student["Type_Doc"] == "0" || student["Dpto_Doc"] == "") {
		loadCitys("selectCityExp","","CO","",true);
	}

	//loadCitys("selectCityExp",student["City_Doc"]);
	loadDeptos("selectDeptoHome",student["Dpto_Home"]);
	if (student["Dpto_Home"] != "0") {
		loadCitys("selectCityHome",student["City_Home"],"CO",student["Dpto_Home"]);
	}
	else if (student["Dpto_Home"] == "0") {
		//console.log("Entro a City Home")
		loadCitys("selectCityHome",student["City_Home"],"CO","",true);
		//$("#selectCityHome select").attr('disabled', true);
	}
	loadAddress("selectAddrHome",student["Via"]);
}

function showSelectorsParents(civil_status,father,mother){
	/* Cargue Estado Civil */
	// console.log(father);
	// console.log(mother);
	loadCivilStatus("selectCivilStatus",civil_status["Civil_Status"]);
	if (civil_status["Civil_Status"] == 2 || civil_status["Civil_Status"] == 3 || civil_status["Civil_Status"] == 4 || civil_status["Civil_Status"] == 6 || civil_status["Civil_Status"] == 7 || civil_status["Civil_Status"] == 10) {
		$("#div_custody").removeClass('d-none');
		if (civil_status["Civil_Status"] == 4) {
			$(".infoMother").addClass('d-none');
		}
		if (civil_status["Civil_Status"] == 10) {
			$(".infoFather").addClass('d-none');
		}
	}

	/* Selectores Padre */
	loadCountrys("father_selectCountryNac",father["Country_Nac"]);
	if (father["Country_Nac"] != "" && father["Country_Nac"] != null) {
		loadCitys("father_selectCityNac",father["City_Nac"],"CO","");
	}
	else if (father["Country_Nac"] == "" || father["Country_Nac"] == null) {
		//console.log("Entro a City Nac")
		loadCitys("father_selectCityNac","","CO","",true);
	}
	loadTypeDoc("father_selectTypeDoc",father["Type_Doc"]);
	if (father["Type_Doc"] != "0") {
		if (father["Type_Doc"] == "8" || father["Type_Doc"] == "9" || father["Type_Doc"] == "15") {
			loadCountrys("father_selectDeptoExp",father["Dpto_Doc"]);
			$("#label_father_selectDeptoExp").children().remove();
			$("#label_father_selectDeptoExp").append('<span class="" style="font-size: 10px">(País)</span>');
		}
		else if (father["Type_Doc"] != "8" && father["Type_Doc"] != "9" && father["Type_Doc"] != "15") {
			loadDeptos("father_selectDeptoExp",father["Dpto_Doc"]);
		}
	} 
	else if (father["Type_Doc"] == "0") {
		loadDeptos("father_selectDeptoExp","",true);
	}
	if (father["Dpto_Doc"] != "" && (father["Type_Doc"] != "8" && father["Type_Doc"] != "9" && father["Type_Doc"] != "15") && father["Type_Doc"] != "0") {
		loadCitys("father_selectCityExp",father["City_Doc"],"CO",father["Dpto_Doc"]);
	}
	else if (father["Dpto_Doc"] != "" && (father["Type_Doc"] == "8" || father["Type_Doc"] == "9" || father["Type_Doc"] == "15")) {
		loadCitys("father_selectCityExp",father["City_Doc"],father["Dpto_Doc"]);
	}
	else if (father["Type_Doc"] == "0" || father["Dpto_Doc"] == "") {
		loadCitys("father_selectCityExp","","CO","",true);
	}

	loadDeptos("father_selectDeptoHome",father["Dpto_Home"]);
	if (father["Dpto_Home"] != "0") {
		loadCitys("father_selectCityHome",father["City_Home"],"CO",father["Dpto_Home"]);
	}
	else if (father["Dpto_Home"] == "0") {
		//console.log("Entro a City Home")
		loadCitys("father_selectCityHome",father["City_Home"],"CO","",true);
	}
	loadAddress("father_selectAddrHome",father["Via"]);
	loadAddress("father_selectAddr_job",father["Via_Job"]);
	/* Selectores Madre */
	
	loadCountrys("mother_selectCountryNac",mother["Country_Nac"]);
	if (mother["Country_Nac"] != "" && mother["Country_Nac"] != null) {
		loadCitys("mother_selectCityNac",mother["City_Nac"],mother["Country_Nac"],"");
	}
	else if (mother["Country_Nac"] == "" || mother["Country_Nac"] == null) {
		//console.log("Entro a City Nac")
		loadCitys("mother_selectCityNac","","CO","",true);
	}
	loadTypeDoc("mother_selectTypeDoc",mother["Type_Doc"]);
	if (mother["Type_Doc"] != "0") {
		if (mother["Type_Doc"] == "8" || mother["Type_Doc"] == "9" || mother["Type_Doc"] == "15") {
			loadCountrys("mother_selectDeptoExp",mother["Dpto_Doc"]);
			$("#label_mother_selectDeptoExp").children().remove();
			$("#label_mother_selectDeptoExp").append('<span class="" style="font-size: 10px">(País)</span>');
		}
		else if ((mother["Type_Doc"] != "8" && mother["Type_Doc"] != "9" && mother["Type_Doc"] != "15")) {
			loadDeptos("mother_selectDeptoExp",mother["Dpto_Doc"]);
		}
	} 
	else if (mother["Type_Doc"] == "0") {
		loadDeptos("mother_selectDeptoExp","",true);
	}
	if (mother["Dpto_Doc"] != "" && (mother["Type_Doc"] != "8" && mother["Type_Doc"] != "9" && mother["Type_Doc"] != "15") && mother["Type_Doc"] != "0") {
		loadCitys("mother_selectCityExp",mother["City_Doc"],"CO",mother["Dpto_Doc"]);
	}
	else if (mother["Dpto_Doc"] != "" && (mother["Type_Doc"] == "8" || mother["Type_Doc"] == "9" || mother["Type_Doc"] == "15")) {
		loadCitys("mother_selectCityExp",mother["City_Doc"],mother["Dpto_Doc"]);
	}
	else if (mother["Type_Doc"] == "0" || mother["Dpto_Doc"] == "") {
		loadCitys("mother_selectCityExp","","CO","",true);
	}

	loadDeptos("mother_selectDeptoHome",mother["Dpto_Home"]);
	if (mother["Dpto_Home"] != "0") {
		loadCitys("mother_selectCityHome",mother["City_Home"],"CO",mother["Dpto_Home"]);
	}
	else if (mother["Dpto_Home"] == "0") {
		//console.log("Entro a City Home")
		loadCitys("mother_selectCityHome",mother["City_Home"],"CO","",true);
	}
	loadAddress("mother_selectAddrHome",mother["Via"]);
	loadAddress("mother_selectAddr_job",mother["Via_Job"]);
}

function showSelectorsAdditional(tutor,emergency,emergency_add){

	/* Selectores Acudiente */
	loadTypeDoc("tutor_selectTypeDoc",tutor["Type_Doc"]);
	if (tutor["Type_Doc"] != "0") {
		if (tutor["Type_Doc"] == "8" || tutor["Type_Doc"] == "9" || tutor["Type_Doc"] == "15") {
			loadCountrys("tutor_selectDeptoExp",tutor["Dpto_Doc"]);
			$("#label_tutor_selectDeptoExp").children().remove();
			$("#label_tutor_selectDeptoExp").append('<span class="" style="font-size: 10px">(País)</span>');
		}
		else if (tutor["Type_Doc"] != "8" && tutor["Type_Doc"] != "9" && tutor["Type_Doc"] != "15") {
			loadDeptos("tutor_selectDeptoExp",tutor["Dpto_Doc"]);
		}
	} 
	else if (tutor["Type_Doc"] == "0") {
		loadDeptos("tutor_selectDeptoExp","",true);
	}
	if (tutor["Dpto_Doc"] != "" && (tutor["Type_Doc"] != "8" && tutor["Type_Doc"] != "9" && tutor["Type_Doc"] != "15") && tutor["Type_Doc"] != "0") {
		loadCitys("tutor_selectCityExp",tutor["City_Doc"],"CO",tutor["Dpto_Doc"]);
	}
	else if (tutor["Dpto_Doc"] != "" && (tutor["Type_Doc"] == "8" || tutor["Type_Doc"] == "9" || tutor["Type_Doc"] == "15")) {
		loadCitys("tutor_selectCityExp",tutor["City_Doc"],tutor["Dpto_Doc"]);
	}
	else if (tutor["Type_Doc"] == "0" || tutor["Dpto_Doc"] == "") {
		loadCitys("tutor_selectCityExp","","CO","",true);
	}

	loadAddress("tutor_selectAddrHome",tutor["Via"]);
	/* Selectores Emergencia  */
	loadTypeDoc("emergency_selectTypeDoc",emergency["Type_Doc"]);
	if (emergency["Type_Doc"] != "0") {
		if (emergency["Type_Doc"] == "8" || emergency["Type_Doc"] == "9" || emergency["Type_Doc"] == "15") {
			loadCountrys("emergency_selectDeptoExp",emergency["Dpto_Doc"]);
			$("#label_emergency_selectDeptoExp").children().remove();
			$("#label_emergency_selectDeptoExp").append('<span class="" style="font-size: 10px">(País)</span>');
		}
		else if (emergency["Type_Doc"] != "8" && emergency["Type_Doc"] != "9" && emergency["Type_Doc"] != "15") {
			loadDeptos("emergency_selectDeptoExp",emergency["Dpto_Doc"]);
		}
	} 
	else if (emergency["Type_Doc"] == "0") {
		loadDeptos("emergency_selectDeptoExp","",true);
	}
	if (emergency["Dpto_Doc"] != "" && (emergency["Type_Doc"] != "8" && emergency["Type_Doc"] != "9" && emergency["Type_Doc"] != "15") && emergency["Type_Doc"] != "0") {
		loadCitys("emergency_selectCityExp",emergency["City_Doc"],"CO",emergency["Dpto_Doc"]);
	}
	else if (emergency["Dpto_Doc"] != "" && (emergency["Type_Doc"] == "8" || emergency["Type_Doc"] == "9" || emergency["Type_Doc"] == "15")) {
		loadCitys("emergency_selectCityExp",emergency["City_Doc"],emergency["Dpto_Doc"]);
	}
	else if (emergency["Type_Doc"] == "0" || emergency["Dpto_Doc"] == "") {
		loadCitys("emergency_selectCityExp","","CO","",true);
	}

	loadAddress("emergency_selectAddrHome",emergency["Via"]);

	/* Selectores Emergencia Adicional */
	loadTypeDoc("emergency_add_selectTypeDoc",emergency_add[0]["Type_Doc"]);
	if (emergency_add[0]["Type_Doc"] != "0") {
		if (emergency_add[0]["Type_Doc"] == "8" || emergency_add[0]["Type_Doc"] == "9" || emergency_add[0]["Type_Doc"] == "15") {
			loadCountrys("emergency_add_selectDeptoExp",emergency_add[0]["Dpto_Doc"]);
			$("#label_emergency_add_selectDeptoExp").children().remove();
			$("#label_emergency_add_selectDeptoExp").append('<span class="" style="font-size: 10px">(País)</span>');
		}
		else if (emergency_add[0]["Type_Doc"] != "8" && emergency_add[0]["Type_Doc"] != "9" && emergency_add[0]["Type_Doc"] != "15") {
			loadDeptos("emergency_add_selectDeptoExp",emergency_add[0]["Dpto_Doc"]);
		}
	} 
	else if (emergency_add[0]["Type_Doc"] == "0") {
		loadDeptos("emergency_add_selectDeptoExp","",true);
	}
	if (emergency_add[0]["Dpto_Doc"] != "" && (emergency_add[0]["Type_Doc"] != "8" && emergency_add[0]["Type_Doc"] != "9" && emergency_add[0]["Type_Doc"] != "15") && emergency_add[0]["Type_Doc"] != "0") {
		loadCitys("emergency_add_selectCityExp",emergency_add[0]["City_Doc"],"CO",emergency_add[0]["Dpto_Doc"]);
	}
	else if (emergency_add[0]["Dpto_Doc"] != "" && (emergency_add[0]["Type_Doc"] == "8" || emergency_add[0]["Type_Doc"] == "9" || emergency_add[0]["Type_Doc"] == "15")) {
		loadCitys("emergency_add_selectCityExp",emergency_add[0]["City_Doc"],emergency_add[0]["Dpto_Doc"]);
	}
	else if (emergency_add[0]["Type_Doc"] == "0" || emergency_add[0]["Dpto_Doc"] == "") {
		loadCitys("emergency_add_selectCityExp","","CO","",true);
	}

	loadAddress("emergency_add_selectAddrHome",emergency_add[0]["Via"]);
}

function showSelectorsDebtor(debtor=false,disabled=false,enable_fields=true){

	/* Selectores Deudor */
	loadTypeDoc("debtor_selectTypeDoc",debtor["Type_Doc"],enable_fields);
	if (debtor["Type_Doc"] != "0") {
		if (debtor["Type_Doc"] == "8" || debtor["Type_Doc"] == "9" || debtor["Type_Doc"] == "15") {
			loadCountrys("debtor_selectDeptoExp",debtor["Dpto_Doc"],enable_fields);
			$("#label_debtor_selectDeptoExp").children().remove();
			$("#label_debtor_selectDeptoExp").append('<span class="" style="font-size: 10px">(País)</span>');
		}
		else if (debtor["Type_Doc"] != "8" && debtor["Type_Doc"] != "9" && debtor["Type_Doc"] != "15") {
			loadDeptos("debtor_selectDeptoExp",debtor["Dpto_Doc"],enable_fields);
		}
	} 
	else if (debtor["Type_Doc"] == "0") {
		loadDeptos("debtor_selectDeptoExp","",true);
	}
	if (debtor["Dpto_Doc"] != "" && (debtor["Type_Doc"] != "8" && debtor["Type_Doc"] != "9" && debtor["Type_Doc"] != "15") && debtor["Type_Doc"] != "0") {
		loadCitys("debtor_selectCityExp",debtor["City_Doc"],"CO",debtor["Dpto_Doc"],enable_fields);
		//console.log("Entro a Doc Colombia")
	}
	else if (debtor["Dpto_Doc"] != "" && (debtor["Type_Doc"] == "8" || debtor["Type_Doc"] == "9" || debtor["Type_Doc"] == "15")) {
		loadCitys("debtor_selectCityExp",debtor["City_Doc"],debtor["Dpto_Doc"],"",enable_fields);
		//console.log("Entro a Doc con Pais");
		//console.log(debtor);
	}
	else if (debtor["Type_Doc"] == "0" || debtor["Dpto_Doc"] == "") {
		loadCitys("debtor_selectCityExp","","CO","",true);
	}

	loadDeptos("debtor_selectDeptoHome",debtor["Dpto_Home"],disabled);
	if (debtor["Dpto_Home"] != "0") {
		loadCitys("debtor_selectCityHome",debtor["City_Home"],"CO",debtor["Dpto_Home"],disabled);
	}
	else if (debtor["Dpto_Home"] == "0") {
		//console.log("Entro a City Home")
		loadCitys("debtor_selectCityHome",debtor["City_Home"],"CO","",true);
	}
	loadAddress("debtor_selectAddrHome",debtor["Via"],disabled);
	loadAddress("debtor_selectAddr_job",debtor["Via_Job"],disabled);
}

function showSelectorsCodebtor(codebtor=false,disabled=false,enable_fields=true){
	/* Selectores Madre */
	loadTypeDoc("codebtor_selectTypeDoc",codebtor["Type_Doc"],enable_fields);
	if (codebtor["Type_Doc"] != "0") {
		if (codebtor["Type_Doc"] == "8" || codebtor["Type_Doc"] == "9" || codebtor["Type_Doc"] == "15") {
			loadCountrys("codebtor_selectDeptoExp",codebtor["Dpto_Doc"],enable_fields);
			$("#label_codebtor_selectDeptoExp").children().remove();
			$("#label_codebtor_selectDeptoExp").append('<span class="" style="font-size: 10px">(País)</span>');
		}
		else if (codebtor["Type_Doc"] != "8" && codebtor["Type_Doc"] != "9" && codebtor["Type_Doc"] != "15") {
			loadDeptos("codebtor_selectDeptoExp",codebtor["Dpto_Doc"],enable_fields);
		}
	} 
	else if (codebtor["Type_Doc"] == "0") {
		loadDeptos("codebtor_selectDeptoExp","",true);
	}
	if (codebtor["Dpto_Doc"] != "" && (codebtor["Type_Doc"] != "8" && codebtor["Type_Doc"] != "9" && codebtor["Type_Doc"] != "15") && codebtor["Type_Doc"] != "0") {
		loadCitys("codebtor_selectCityExp",codebtor["City_Doc"],"CO",codebtor["Dpto_Doc"],enable_fields);
	}
	else if (codebtor["Dpto_Doc"] != "" && (codebtor["Type_Doc"] == "8" || codebtor["Type_Doc"] == "9" || codebtor["Type_Doc"] == "15")) {
		loadCitys("codebtor_selectCityExp",codebtor["City_Doc"],codebtor["Dpto_Doc"],"",enable_fields);
	}
	else if (codebtor["Type_Doc"] == "0" || codebtor["Dpto_Doc"] == "") {
		loadCitys("codebtor_selectCityExp","","CO","",true);
	}

	loadDeptos("codebtor_selectDeptoHome",codebtor["Dpto_Home"],disabled);
	if (codebtor["Dpto_Home"] != "0") {
		loadCitys("codebtor_selectCityHome",codebtor["City_Home"],"CO",codebtor["Dpto_Home"],disabled);
	}
	else if (codebtor["Dpto_Home"] == "0") {
		//console.log("Entro a City Home")
		loadCitys("codebtor_selectCityHome",codebtor["City_Home"],"CO","",true);
	}
	loadAddress("codebtor_selectAddrHome",codebtor["Via"],disabled);
	loadAddress("codebtor_selectAddr_job",codebtor["Via_Job"],disabled);
}

function deleteBrother(id_brother){
	$("#titleModal").text('Eliminar Hermano');
	$("#bodyTag").text('Seguro desea eliminar el estudiante del grupo familiar?');
	$("#btnModal").removeAttr('disabled');
	$("#btnModal").text('Aceptar');
	$("#ModalObs").modal("show");
	$("#btnModal").off();
	$("#btnModal").click(function(e) {
		////console.log($(".brother[data-val='"+$(this).data('val')+"']"));
		//console.log($("#brother_"+id_brother));
		$("#brother_"+id_brother).remove();
		$(".brother_"+id_brother).remove();
		var cant_bro = $(".brother").toArray().length;
		//console.log(cant_bro);
		if (cant_bro == 0) {
			$("#brothers").addClass('d-none');
		}
		else if (cant_bro > 0) {
			numer = 1;
			$(".enumerBro").each(function() {
				$(this).text(numer);
				numer = numer + 1;
			});
		}
		updateBrotherData(id_brother).done(function(response){
			console.log(response);
		}).fail(function(response){
			console.log(response);
		})
		$("#ModalObs").modal("hide");
		e.preventDefault();
	});
	//console.log("Entro Modal");
}

function modalBrothers(brothers,brothers_school){
	$("#titleModalLarge").text('Agregar Hermanos');
	$("#bodyTagLarge").load("views/adminView/modalBrotherSchool.html?v=4.1", function() {
		if (brothers_school["code"] == 200) {
			var num = 1;
			$.each(brothers_school["response"], function(index, value) {
				var validBro = 0;
				$(".delete").each(function() {
					//console.log($(this).data('val'));
					if ($(this).data('val') == value["Id"]) {
						validBro = 1;
					}
				});
				var seletorBro = "";
				if (validBro == 1) {
					seletorBro = '<span class="label label-success">Agregado</span><i class="fa fa-check" aria-hidden="true"></i>';
				}
				else {
					seletorBro = '<label class="checkbox"><input type="checkbox" class="btn btn-sm checkBrother" id="'+value["Id"]+'" /><span class="primary"></span></label>';
				}
				$("#brothersSchool").append('<div class="row brotherSchool text-center" id="brotherSchool_'+value["Id"]+'" style="font-size:14px;"><div class="col-md-1"><span class="label label-default enumerBro">'+num+'</span></div><div class="col-md-3"><span class="label label-default">'+value["Last_Name"]+'</span></div><div class="col-md-3"><span class="label label-default">'+value["Names"]+'</span></div><div class="col-md-3"><span class="label label-default">'+value["Course"]+'</span></div><div class="col-md-2 divCheck">'+seletorBro+'</div></div>');
				num = num+1;
			});
		} 
		else {
			$("#brothersSchool").append('<div class="row text-center alert alert-info" style="font-size:14px;"><div class="col-md-12"><span class="label label-default">El estudiante no tiene hermanos en el colegio.</span></div></div>');
		}
		$("#btnModalLarge").removeAttr('disabled');
		$("#btnModalLarge").text('Agregar');
		$("#ModalLargeObs").modal("show");
		$("#btnModalLarge").off();
		$("#btnModalLarge").click(function(e) {
			var arrayBrother = new Array();
			$(".checkBrother").each(function() {
				if ($(this).prop('checked') == true) {
					var id_brother = $(this).attr('id');
					var contentBro = $("#brotherSchool_"+id_brother).html();
					var newBro = '<div class="row brother" id="brother_'+id_brother+'" style="font-size:14px;">'+contentBro+'<div class="col-md-2"><span class="label label-default"><i class="fa fa-trash delete" aria-hidden="true" data-val="'+id_brother+'"></i></span></div></div><hr class="style2 brother_'+id_brother+'">';
					$("#brothers").append(newBro);
					$(".divCheck").remove();
					arrayBrother.push(id_brother);
				}
			});
			var cant_bro = $(".brother").toArray().length;
			//console.log(cant_bro);
			if (cant_bro == 0) {
				$("#brothers").addClass('d-none');
			}
			else if (cant_bro > 0) {
				$("#brothers").removeClass('d-none');
				numer = 1;
				$(".enumerBro").each(function() {
					$(this).text(numer);
					numer = numer + 1;
				});
			}
			$(".delete").click(function(e) {
				//console.log($(this).data('val'));
				deleteBrother($(this).data('val'));
				e.preventDefault();
			});
			console.log(arrayBrother);
			if (arrayBrother.length > 0) {
				
				//arrayBrothers = $.param(arrayBrother);
				addBrotherData(arrayBrother).done(function(response){
					console.log(response);
				}).fail(function(response){
					console.log(response);
				});
			}
			$("#ModalLargeObs").modal("hide");
			e.preventDefault();
		});
		//console.log("Entro Modal");
	});
}


function toggleService(service, elementId) {
    if (service == "1") {
        $(elementId).removeClass('d-none');
    }
}

function modalCancelacion(services) {
	let anio = new Date().getFullYear() + 1;
    $("#titleModalLarge").text('Cancelación de servicios '+ anio);
    $("#bodyTagLarge").load("views/adminView/modalCancelSe.html?v=4.1", function() {

        toggleService(services["Half_Nines"], "#medias3, #medias2, #medias1");
        toggleService(services["Launch"], "#almuerzo3, #almuerzo2, #almuerzo1");
        toggleService(services["Transport"], "#Transporte3, #Transporte2, #Transporte1");

        var selectedServices = {}; 

		function verificarServicios() {
            let serviciosActivos = 0;
            if (services["Launch"] == "1") serviciosActivos++;
            if (services["Transport"] == "1") serviciosActivos++;
            if (services["Half_Nines"] == "1") serviciosActivos++;

            if (serviciosActivos == 2) {
                $("#mostrarUltimo").removeClass('d-none');
            }
            if (serviciosActivos == 3) {
                $("#mostrarUltimo2").removeClass('d-none');
            }
        }

        verificarServicios(); 
		

		$(document).on('click', '#cancel3button', function(){
			$("#otroServicio").removeClass('d-none');
			$("#cancel3button").click(function(){
				$("#otroServicio3").removeClass('d-none');
				$("#mostrarUltimo2").addClass('d-none');
			})
		});

		$(document).on('click', '#cancel1button', function(){
			$("#otroServicio").removeClass('d-none');
			$("#mostrarUltimo").addClass('d-none');
		});



        $(".cancelbtn").click(function(){
            $("#motivoCancel").removeClass('d-none');
        });
        
        $(".cancel2btn").click(function(){
            $("#motivoCancel2").removeClass('d-none');
        });

		$(".cancel3btn").click(function(){
            $("#motivoCancel3").removeClass('d-none');
        });

        // Estructuras HTML para los motivos de cancelación
        const cancelHtml = `
            <div class="col-12 col-md-12 col-lg-12 form-check animated fadeInDown">
                <div>
                    <p class="text-center" style="color: #000000;">INGRESE EL MOTIVO DE CANCELACIÓN</p>
                    <hr class="hr">
					<p class="text-center"></p>
					<textarea class="form-control" placeholder="Motivo" id="medias" cols="6" style="height: 144px;"></textarea>
                </div>
            </div>
        `;

			const cancelHtml2 = `
			<div class="col-12 col-md-12 col-lg-12 form-check animated fadeInDown">
				<div>
					<p class="text-center" style="color: #000000;">INGRESE EL MOTIVO DE CANCELACIÓN</p>
					<hr class="hr">
					<p class="text-center"></p>
					<textarea class="form-control" placeholder="Motivo" id="almuerzo" cols="6" style="height: 144px;"></textarea>
				</div>
			</div>
		`;
			const cancelHtml3 = `
			<div class="col-12 col-md-12 col-lg-12 form-check animated fadeInDown">
				<div>
					<p class="text-center" style="color: #000000;">INGRESE EL MOTIVO DE CANCELACIÓN</p>
					<hr class="hr">
					<p class="text-center"></p>
					<textarea class="form-control" placeholder="Motivo" id="transporte" cols="6" style="height: 144px;"></textarea>
				</div>
			</div>
		`;

        function disableOtherService(selectedValue, isFirstService) {
			console.log(isFirstService);
            if (isFirstService) {
                $("button[name=bt2][value=" + selectedValue + "]").attr('disabled', true);
            } else if (!isFirstService) {
                $("button[name=bt1][value=" + selectedValue + "]").attr('disabled', true);
				$("button[name=bt3][value=" + selectedValue + "]").attr('disabled', true);
            }
        }

        $(document).on('click', 'button[name=bt1]', function() {
            var val1 = $(this).val();
            view1 = val1;

			$('button[name=bt1]').removeClass('btn-primary').addClass('btn-outline-primary').attr('disabled', true);
            $(this).removeClass('btn-outline-primary').addClass('btn-primary').attr('disabled', false);
			
			

			
            if (val1 === "1") {
                $("#motivoCancel").html(cancelHtml);
                selectedServices.medias = 1;
            } else if (val1 === "2") {
                $("#motivoCancel").html(cancelHtml2);
                selectedServices.almuerzo = 1;
            }else if (val1 === "3") {
                $("#motivoCancel").html(cancelHtml3);
                selectedServices.transporte = 1;
            }

            disableOtherService(val1, true); 
        });

        // Captura de datos del segundo servicio
        $(document).on('click', 'button[name=bt2]', function() {
            var val2 = $(this).val();
            view2 = val2;

			$('button[name=bt2]').removeClass('btn-primary').addClass('btn-outline-primary').attr('disabled', true);
            $(this).removeClass('btn-outline-primary').addClass('btn-primary').attr('disabled', false);
			

            if (val2 === "1") {
                $("#motivoCancel2").html(cancelHtml);
                selectedServices.medias = 1; 
            }else if (val2 === "2") {
                $("#motivoCancel2").html(cancelHtml2);
                selectedServices.almuerzo = 1;
            }else if (val2 === "3") {
                $("#motivoCancel2").html(cancelHtml3);
                selectedServices.transporte = 1;
            }

            disableOtherService(val2, false);
        });

		// Captura de datos del tercer servicio
		$(document).on('click', 'button[name=bt3]', function() {
            var val3 = $(this).val();
            // $("#mostrarUltimo").addClass('d-none');
            view3 = val3;

			$('button[name=bt3]').removeClass('btn-primary').addClass('btn-outline-primary').attr('disabled', true);
            $(this).removeClass('btn-outline-primary').addClass('btn-primary').attr('disabled', false);
			

            if (val3 === "1") {
                $("#motivoCancel3").html(cancelHtml);
                selectedServices.medias = 1; 
            } else if (val3 === "2") {
                $("#motivoCancel3").html(cancelHtml2);
                selectedServices.almuerzo = 1;
            }else if (val3 === "3") {
                $("#motivoCancel3").html(cancelHtml3);
                selectedServices.transporte = 1;
            }

            disableOtherService(val3, false);
        });

		$(document).ready(function() {
			// Asignar evento click al botón #btnModalLarge
			$("#btnModalLarge").on('click', function(event) {
				event.preventDefault(); // Evitar el envío por defecto del formulario
		
				$("#btnModalLarge").text('Guardar');
		
				let valid = true;
		
				if (selectedServices.medias) {
					if ($("#medias").val().trim() === "") {
						$("#medias").addClass('is-invalid');  
						valid = false;  
					} else {
						$("#medias").removeClass('is-invalid'); 
						selectedServices.motivomedias = $("#medias").val();
						let valid = true;
					}
				}

				if (selectedServices.almuerzo) {
					if ($("#almuerzo").val().trim() === "") {
						$("#almuerzo").addClass('is-invalid');  
						valid = false;  
					} else {
						$("#alimentosText").removeClass('is-invalid'); 
						selectedServices.motivoalmuerzo = $("#almuerzo").val();
						let valid = true;
					}
				}
		
				if (selectedServices.transporte) {
					if ($("#transporte").val().trim() === "") {
						$("#transporte").addClass('is-invalid');  // Agrega la clase para mostrar borde rojo
						valid = false;  // Campo no válido
					} else {
						$("#transporteText").removeClass('is-invalid');  // Elimina clase si es válido
						selectedServices.motivoTransporte = $("#transporte").val();  // Guardar motivo
					}
				}
		
				console.log(selectedServices);

				if (!valid) {
					return; 
				}
		
				// Mostrar confirmación utilizando Swal
				Swal.fire({
					title: "¿Está seguro?",
					html: "<strong>¿Desea continuar con la cancelación del servicio?</strong><br>Tenga en cuenta que no podrá finalizar el proceso de actualización de datos y su matrícula quedará pendiente hasta que haya legalizado el retiro del servicio.",
					icon: "warning",
					showCancelButton: true,
					confirmButtonText: 'OK',
					cancelButtonText: 'Cancelar',
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33'
				}).then((result) => {
					if (result.isConfirmed) {
						// Ejecutar la función de actualización después de la confirmación
						$.when(updateCancelServices(
							selectedServices.almuerzo, 
							selectedServices.motivoalmuerzo, 
							selectedServices.transporte, 
							selectedServices.motivoTransporte,
							selectedServices.medias,
							selectedServices.motivomedias
						)).done(function() {
							Swal.fire({
								title: "Enviado!",
								icon: "success",
								confirmButtonText: 'OK',
								confirmButtonColor: '#3085d6',
								didClose: () => {
									window.location.reload(true);
									event.preventDefault();
								}
							});
							if (selectedServices.medias) {
								getemailmedias('1'); 
							}
							if (selectedServices.almuerzo) {
								get_email_entryform('1'); 
							}
							if (selectedServices.transporte) {
								getemailTransporte('1'); 
							}
						}).fail(function(event) {
							Swal.fire({
								title: "Error!",
								icon: "error",
								confirmButtonText: 'OK',
								confirmButtonColor: '#3085d6'
							});
							console.log(event);
						});
		
						// Enviar correos si los servicios están seleccionados

		
					}
				});
			});
		});
		
        $("#btnModalLarge").removeAttr('disabled');
        $("#btnModalLarge").text('Guardar');
        $("#ModalLargeObs").modal("show");
        $("#btnModalLarge").off();
    });
}




function toggleButton(selectedButton) {
    const parentDiv = selectedButton.closest('div.row'); // Selecciona el contenedor más cercano
    const buttons = parentDiv.querySelectorAll('.btn-outline-primary, .btn-primary'); // Solo afecta los botones dentro de este contenedor

    // Verifica si el botón ya está seleccionado
    if (selectedButton.classList.contains('btn-primary')) {
        selectedButton.classList.remove('btn-primary');
        selectedButton.classList.add('btn-outline-primary');
    } else {
        buttons.forEach(button => {
            button.classList.remove('btn-primary');
            button.classList.add('btn-outline-primary');
        });
        selectedButton.classList.remove('btn-outline-primary');
        selectedButton.classList.add('btn-primary');
    }
}

function clearSelection(divId) {
    const buttons = document.querySelectorAll(`#${divId} .btn-outline-primary, #${divId} .btn-primary`);
    buttons.forEach(button => {
        button.classList.remove('btn-primary');
        button.classList.add('btn-outline-primary');
    });
	$("#"+divId).addClass('d-none')
}



function noTransport() {
	$("#titleModalLarge").text('Reglamento para estudiantes que no toman el servicio de transporte con el colegio');
	$("#bodyTagLarge").load("views/adminView/modalNoTransport.html?v=4.1", function() {
		$("#btnModalLarge").removeAttr('disabled');
		$(".close").addClass('d-none');
		$(".btnClose").addClass('d-none');
		$("#btnModalLarge").text('Aceptar');
		$('#ModalLargeObs').modal({backdrop: 'static', keyboard: false});
		$("#ModalLargeObs").modal("show");
		$(".btnTransport").click(function(e) {
			var option = $(this).attr('data-val');
			var option_id = $(this).find('input').attr('name');
			if (option == "No") {
				$("#div_"+option_id).removeClass('d-none');
				$("#div_"+option_id+"Si").addClass('d-none');
			}
			else if (option == "Si") {
				$("#div_"+option_id).addClass('d-none');
				$("#div_"+option_id).find('input').val("");
				$("#div_collect_1").addClass('d-none');
				$("#div_collect_1").find('input').val("");
				$("#div_collect_2").addClass('d-none');
				$("#div_collect_2").find('input').val("");
				$("#div_"+option_id+option).removeClass('d-none');
				$(".typeTransport").each(function() {
					$(this).removeClass('active');
				});
				$(".personAdd").each(function() {
					$(this).removeClass('active');
				});
			}
			//console.log(option);
			e.preventDefault();
		});
		$(".add_person_1").click(function(e) {
			var option = $(this).attr('data-val');
			if (option == "Si") {
				$("#div_collect_1").removeClass('d-none');
			}
			else if (option == "No") {
				$("#div_collect_1").addClass('d-none');
				$("#div_collect_1").find('input').val("");
				$("#div_collect_2").addClass('d-none');
				$("#div_collect_2").find('input').val("");
				$(".add_person_2").each(function() {
					$(this).removeClass('active');
				});
			}
			e.preventDefault();
		});
		$(".add_person_2").click(function(e) {
			var option = $(this).attr('data-val');
			if (option == "Si") {
				$("#div_collect_2").removeClass('d-none');
			}
			else if (option == "No") {
				$("#div_collect_2").addClass('d-none');
				$("#div_collect_2").find('input').val("");
			}
			e.preventDefault();
		});
		$("#btnModalLarge").off();
		$("#btnModalLarge").click(function(e) {
			var authPersonal = $(".authPersonal.active").data('val');
			var authSecond = $(".add_person_1.active").data('val');
			var authThird = $(".add_person_2.active").data('val');
			var authName = $("#authName").val();
			var authDoc = $("#authDoc").val();
			var authMobile = $("#authMobile").val();
			var authName_1 = $("#authName_1").val();
			var authDoc_1 = $("#authDoc_1").val();
			var authMobile_1 = $("#authMobile_1").val();
			var authName_2 = $("#authName_2").val();
			var authDoc_2 = $("#authDoc_2").val();
			var authMobile_2 = $("#authMobile_2").val();
			var typeTransport = $(".typeTransport.active").data('val');
			var optRequire = (authPersonal == "No")?true:false;
			var optSecondAuth = (authSecond == "Si")?true:false;
			var optThirdAuth = (authThird == "Si")?true:false;
			var valid = validFormActData([
					{'data':authPersonal,'item':'authPersonal','type':'radio', 'obligatory':true},
					{'data':authName,'item':'authName','type':'text', 'obligatory':optRequire},
					{'data':authDoc,'item':'authDoc','type':'text', 'obligatory':optRequire},
					{'data':authMobile,'item':'authMobile','type':'text', 'obligatory':optRequire},
					{'data':authName_1,'item':'authName_1','type':'text', 'obligatory':optSecondAuth},
					{'data':authDoc_1,'item':'authDoc_1','type':'text', 'obligatory':optSecondAuth},
					{'data':authMobile_1,'item':'authMobile_1','type':'text', 'obligatory':optSecondAuth},
					{'data':authName_2,'item':'authName_2','type':'text', 'obligatory':optThirdAuth},
					{'data':authDoc_2,'item':'authDoc_2','type':'text', 'obligatory':optThirdAuth},
					{'data':authMobile_2,'item':'authMobile_2','type':'text', 'obligatory':optThirdAuth},
					{'data':typeTransport,'item':'typeTransport','type':'radio', 'obligatory':optRequire}]);
			if (valid["validate"]) {
				$("#btnModalLarge").html("Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
				$("#btnModalLarge").attr('disabled', true);
				updatePedestrianData(authPersonal,typeTransport,authName,authDoc,authMobile,authName_1,authDoc_1,authMobile_1,authName_2,authDoc_2,authMobile_2).done(function(response){
					$("#btnModalLarge").html('Aceptar');
					$("#btnModalLarge").removeAttr('disabled');
					$(".labelCheck").remove();
					$(".labelDiv.modalDiv").each(function() {
						$(this).removeClass('labelInvalid');
						$(this).addClass('labelValid');
					});
					$("#ModalLargeObs").modal("hide");

				}).fail(function(response){
					console.log("fail Yes Transporte");
				});
			}
			else {
				//console.log("Datos Invalidos");
				$(".labelCheck").remove();
				$(".labelDiv.modalDiv").each(function() {
					$(this).removeClass('labelValid');
					$(this).removeClass('labelInvalid');
					$(this).removeClass('animated infinite pulse');
				});
				$.each(valid['items'],function(key,label) {
					$("#label_"+label).addClass('labelInvalid');
					$("#label_"+label).append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
					$("#label_"+label).addClass("animated infinite pulse");
					$("#"+label).focus();
					$("."+label).focus();
				});
			}
			e.preventDefault();
		});
		//console.log("Entro Modal Sin Transporte");
	});
}

function yesTransport(routes_desc) {
	// $("#titleModalLarge").text('Rutas actividades extracurriculares de los miércoles');
	$("#titleModalLarge").text('Servicio de Transporte.');
	$("#bodyTagLarge").load("views/adminView/modalYesTransport.html?v=4.1", function() {
		
		$(".btnTransport").click(function(e) {
			var option = $(this).attr('data-val');
			var option_id = $(this).find('input').attr('name');
			if (option == "No") {
				$("#div_"+option_id).removeClass('d-none');
			}
			else if (option == "Si") {
				$("#div_"+option_id).addClass('d-none');
				$("#div_"+option_id).find('input').val("");
				$("#div_collect_1").addClass('d-none');
				$("#div_collect_1").find('input').val("");
				$("#div_collect_2").addClass('d-none');
				$("#div_collect_2").find('input').val("");
				$(".typeTransport").each(function() {
					$(this).removeClass('active');
				});
			}
			//console.log(option);
			e.preventDefault();
		});


	


		routes_desc["keys"] = ["RUTA","RECORRIDO"];
		var date = new Date();
		var year_next = parseInt(date.getFullYear())+1;
		$("#tableRoutes").append(createTable("routesExtra",routes_desc));
		$("#year_next").text(year_next);
		$("#btnModalLarge").removeAttr('disabled');
		$("#btnModalLarge").text('Aceptar');
		$(".close").addClass('d-none');
		$(".btnClose").addClass('d-none');
		$('#ModalLargeObs').modal({backdrop: 'static', keyboard: false});
		$("#ModalLargeObs").modal("show");
		loadRoutesExtra("routeExtra");
		$(".btnTransport").click(function(e) {
			var option = $(this).attr('data-val');
			var option_id = $(this).find('input').attr('name');
			$(".btnTransport").each(function() {
				if ($(this).attr('data-val') != option) {
					$(this).removeClass('active');
				}
			});
			if (option == "Si") {
				$("#div_route").removeClass('d-none');
				$("#div_collect").removeClass('d-none');
				//$("#div_collect").find('input').val("");
			}
			else if (option == "Collect") {
				$("#div_collect").removeClass('d-none');
				$("#div_route").addClass('d-none');
				$("#div_route").find('input').val("");
				$("#div_route").find('select').val("--");
			}
			else if (option == "No") {
				$("#div_collect").addClass('d-none');
				$("#div_route").addClass('d-none');
				$("#div_collect").find('input').val("");
				$("#div_route").find('input').val("");
				$("#div_route").find('select').val("--");
				$("#div_collect_1").addClass('d-none');
				$("#div_collect_1").find('input').val("");
				$("#div_collect_2").addClass('d-none');
				$("#div_collect_2").find('input').val("");
				$(".personAdd").each(function() {
					$(this).removeClass('active');
				});
			}
			//console.log(option);
			e.preventDefault();
		});
		$(".add_person_1").click(function(e) {
			var option = $(this).attr('data-val');
			if (option == "Si") {
				$("#div_collect_1").removeClass('d-none');
			}
			else if (option == "No") {
				$("#div_collect_1").addClass('d-none');
				$("#div_collect_1").find('input').val("");
				$("#div_collect_2").addClass('d-none');
				$("#div_collect_2").find('input').val("");
				$(".add_person_2").each(function() {
					$(this).removeClass('active');
				});
			}
			e.preventDefault();
		});
		$(".add_person_2").click(function(e) {
			var option = $(this).attr('data-val');
			if (option == "Si") {
				$("#div_collect_2").removeClass('d-none');
			}
			else if (option == "No") {
				$("#div_collect_2").addClass('d-none');
				$("#div_collect_2").find('input').val("");
			}
			e.preventDefault();
		});
		$("#btnModalLarge").off();
		$("#btnModalLarge").click(function(e) {
			var bus_escool = $(".bus_escool.active").data('val');
			var authPersonal = $(".authPersonal.active").data('val');
			var authName = $("#authName").val();
			var authDoc = $("#authDoc").val();
			var authMobile = $("#authMobile").val();
			var authName_1 = $("#authName_1").val();
			var authDoc_1 = $("#authDoc_1").val();
			var authMobile_1 = $("#authMobile_1").val();
			var authName_2 = $("#authName_2").val();
			var authDoc_2 = $("#authDoc_2").val();
			var authMobile_2 = $("#authMobile_2").val();
			var routeExtra = $(".routeExtra").val();
			var busStop = (routeExtra == "--")?"":$(".busStop").val();

			
			var sale_solo = $(".btnTransport.active").data('val');
			var validate_Autorization_peatonal = (sale_solo == "No" || sale_solo == undefined)?true:false;
			var Nombre_pers = $("#authName_2").val();
			var Cedula_ps = $("#authDoc_2").val();
			var Telefono_ps = $("#authMobile").val();

			/*var optRequire = (authPersonal == "Si" || authPersonal == "Collect")?true:false;
			var optRoute = (authPersonal == "Si")?true:false;
			var optSecondAuth = (authSecond == "Si")?true:false;
			var optThirdAuth = (authThird == "Si")?true:false;*/
			var optRequire = false;
			var optRoute = false;
			var optSecondAuth = false;
			var optThirdAuth = false;
			console.log(bus_escool);
			var valid = validFormActData([
					{'data':bus_escool,'item':'bus_escool','type':'radio', 'obligatory':true},
					{'data':authName,'item':'authName','type':'text', 'obligatory':optRequire},
					{'data':authDoc,'item':'authDoc','type':'text', 'obligatory':optRequire},
					{'data':authMobile,'item':'authMobile','type':'text', 'obligatory':optRequire},
					{'data':authName_1,'item':'authName_1','type':'text', 'obligatory':optSecondAuth},
					{'data':authDoc_1,'item':'authDoc_1','type':'text', 'obligatory':optSecondAuth},
					{'data':authMobile_1,'item':'authMobile_1','type':'text', 'obligatory':optSecondAuth},
					{'data':authName_2,'item':'authName_2','type':'text', 'obligatory':optThirdAuth},
					{'data':authDoc_2,'item':'authDoc_2','type':'text', 'obligatory':optThirdAuth},
					{'data':authMobile_2,'item':'authMobile_2','type':'text', 'obligatory':optThirdAuth},
					{'data':routeExtra,'item':'routeExtra','type':'select', 'obligatory':optRoute},
					{'data':busStop,'item':'busStop','type':'select', 'obligatory':optRoute},
					{'data':authPersonal,'item':'authPersonal','type':'radio', 'obligatory':false},
					{'data':sale_solo,'item':'sale_solo','type':'radio', 'obligatory':false},
					{'data':Nombre_pers,'item':'Nombre_pers','type':'input', 'obligatory':validate_Autorization_peatonal},
					{'data':Cedula_ps,'item':'Cedula_ps','type':'input', 'obligatory':validate_Autorization_peatonal},
					{'data':Telefono_ps,'item':'Telefono_ps','type':'input', 'obligatory':validate_Autorization_peatonal}
				

				
				]);
	
			if (valid["validate"]) {
				//console.log("Validado");
				$("#btnModalLarge").html("Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
				$("#btnModalLarge").attr('disabled', true);

				updatedRuta_estudiante(sale_solo, Nombre_pers, Cedula_ps, Telefono_ps);
				updateTransportData(authPersonal,routeExtra,busStop,authName,authDoc,authMobile,authName_1,authDoc_1,authMobile_1,authName_2,authDoc_2,authMobile_2,bus_escool).done(function(response){
					console.log(response);
					$("#btnModalLarge").html('Aceptar');
					$("#btnModalLarge").removeAttr('disabled');
					$(".labelCheck").remove();
					$(".labelDiv.modalDiv").each(function() {
						$(this).removeClass('labelInvalid');
						$(this).addClass('labelValid');
					});
					$("#ModalLargeObs").modal("hide");

				}).fail(function(response){
					console.log("fail Yes Transporte");
					console.log(response);
				});
			}
			else {
				//console.log("Datos Invalidos");
				$(".labelCheck").remove();
				$(".labelDiv.modalDiv").each(function() {
					$(this).removeClass('labelValid');
					$(this).removeClass('labelInvalid');
					$(this).removeClass('animated infinite pulse');
				});
				$.each(valid['items'],function(key,label) {
					$("#label_"+label).addClass('labelInvalid');
					$("#label_"+label).append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
					$("#label_"+label).addClass("animated infinite pulse");
					$("#"+label).focus();
					$("."+label).focus();
				});
			}
			e.preventDefault();
		});
	});
}

function noLunch() {

	$("#mensajeNoalimento").removeClass('d-none');
	console.log("Ingreso al No");

	// $("#titleModalLarge").text('INFORMACIÓN PARA ESTUDIANTES QUE NO TOMAN EL SERVICIO DE ALMUERZO CON EL COLEGIO');
	// $("#bodyTagLarge").load("views/adminView/modalNoLunch.html", function() {
	// 	$("#btnModalLarge").removeAttr('disabled');
	// 	$(".close").addClass('d-none');
	// 	$(".btnClose").addClass('d-none');
	// 	$("#btnModalLarge").text('Aceptar');
	// 	$('#ModalLargeObs').modal({backdrop: 'static', keyboard: false});
	// 	$("#ModalLargeObs").modal("show");
	// 	$("#btnModalLarge").off();
	// 	$("#btnModalLarge").click(function(e) {
	// 		$('#ModalLargeObs').modal('hide')	
	// 		e.preventDefault();
	// 	});
	// 	//console.log("Entro Modal Sin Transporte");
	// });
}

function copyDataDebtors(selector,array=false){
	if (array != false) {
		$("#"+selector+"_last_name").val(array["Last_Name"]);
		$("#"+selector+"_names").val(array["Names"]);
		$("#"+selector+"_email").val(array["Email"]);
		$("#"+selector+"_mobile").val(array["Mobile"]);
		$("#"+selector+"_phone_home").val(array["Phone_Home"]);
		$("#"+selector+"_nuv").val(array["Nuv"]);
		$("#"+selector+"_pnu").val(array["Pnu"]);
		$("#"+selector+"_snu").val(array["Snu"]);
		$("#"+selector+"_iad").val(array["Iad"]);
		$("#"+selector+"_number_doc").val(array["Num_Doc"]);
		$("#"+selector+"_company").val(array["Company"]);
		$("#"+selector+"_position").val(array["Position"]);
		$("#"+selector+"_occupation").val(array["Occupation"]);
		$("#"+selector+"_nuv_job").val(array["Nuv_Job"]);
		$("#"+selector+"_pnu_job").val(array["Pnu_Job"]);
		$("#"+selector+"_snu_job").val(array["Snu_Job"]);
		$("#"+selector+"_iad_job").val(array["Iad_Job"]);
		$("#"+selector+"_phone_job").val(array["Phone_Job"]);
		$("#"+selector+"_ext_job").val(array["Ext_Job"]);
		$("#"+selector+"_service_time").val(array["Service_Time"]);
	}
	else if (array == false) {
		$("#"+selector+"_last_name").val("");
		$("#"+selector+"_names").val("");
		$("#"+selector+"_email").val("");
		$("#"+selector+"_mobile").val("");
		$("#"+selector+"_phone_home").val("");
		$("#"+selector+"_nuv").val("");
		$("#"+selector+"_pnu").val("");
		$("#"+selector+"_snu").val("");
		$("#"+selector+"_iad").val("");
		$("#"+selector+"_number_doc").val("");
		$("#"+selector+"_company").val("");
		$("#"+selector+"_position").val("");
		$("#"+selector+"_occupation").val("");
		$("#"+selector+"_nuv_job").val("");
		$("#"+selector+"_pnu_job").val("");
		$("#"+selector+"_snu_job").val("");
		$("#"+selector+"_iad_job").val("");
		$("#"+selector+"_phone_job").val("");
		$("#"+selector+"_ext_job").val("");
		$("#"+selector+"_service_time").val("");
	}
}

function validSameDoc(docFather,docMother,docCompared,nameCompared){
	if (docFather == docCompared) {
		var autoriza = confirm("Los datos del "+nameCompared+" anterior corresponden a los del Padre, desea completarlos automaticamente?");
		if (autoriza == true) {
			validate = 1;
		}
		else {
			validate = 3;
		}
	}
	else if (docMother == docCompared) {
		var autoriza = confirm("Los datos del "+nameCompared+" anterior corresponden a los de la Madre, desea completarlos automaticamente?");
		if (autoriza == true) {
			validate = 2;
		}
		else {
			validate = 3;
		}
	}
	else {
		validate = 0;
	}
	return validate;
}

function calculateAge(date) {
	var today = new Date();
	var birthday = new Date(date);
	var age = today.getFullYear() - birthday.getFullYear();
	var m = today.getMonth() - birthday.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
		age--;
	}
	return age;
}

function viewInitial(type_user){
	$("#tabinitial").load("views/initial.html?v=4.1", function(){
		$("#saveData").addClass('d-none');
		$("#pgPrev").addClass('d-none');
		if(type_user == 7){
			const listaRequisito = document.getElementsByClassName("listaRequisito")[0];
			const nuevoItem = document.createElement("li");
			const Contenido = document.createTextNode("Último boletín y/o certificado académico, en donde conste que es promovido(a) al grado siguiente, debidamente firmado (Aplica para estudiantes que ingresen de 1° en adelante).");
			nuevoItem.appendChild(Contenido)
			listaRequisito.appendChild(nuevoItem);
		}
	})
}

function viewDocuments(requisitos,archivos,grado, student){
	$("#tabdocuments").load("views/documents.html?v=4.1", function(){
		let tipo=1
		cargar_requisitos(requisitos, tipo, grado, student)
		for (let i = 0; i < archivos.length; i++) {
            let requisito = archivos[i]["requisito"] 
            let wrapper_f = $(".wrapper_files_" + requisito);
            let codi = archivos[i]["consec"]
            let revision = archivos[i]["revision"]
            let div_aprobado = (revision=="OK")?'<div class="form-check"><input class="form-check-input" type="checkbox" disabled checked id="flexCheckDefault"><label class="form-check-label" for="flexCheckDefault">Aprobado</label></div>':"";
            let ocultar = (revision=="OK")?"d-none":"";
            let link_rut = archivos[i]["archivo"].replace( /\/home\/cvuser\/public_html/gm,"").replace("E:/www/", ""); 
			let name = archivos[i]["nombre_archivo"] 
            wrapper_f.append('<div class ="row bd-highlight mt-2" id="divreq' +
              codi  +'"> <label for="file" class="col-3 col-md-2 col-lg-3">Ver Archivo: </label> <a class="col-9 col-md-5 col-lg-7  bd-highlight  btn-light btn-sm "  style=" align-content: center;" target="_blank"  href="../' +link_rut +'" ><i class="fa-solid fa-eye"></i> ' +name +'</a> <a class="col col-md-6 col-lg-2 btn btn-outline-danger btn-sm '+ocultar+'" style="opacity: 100;" onclick="btn_elimE(' +
                codi +"," + requisito +')"><i class="fa-solid fa-trash"></i> Eliminar </a></div>' + div_aprobado
            );

            if($("#divprimreq"+requisito).children().length>0){
			  $("#textvalid_Requ"+requisito).val("1")
			  $("#btnrequprim"+requisito).removeClass("cargando")

              $("#btnrequprim"+requisito).attr("disabled",true);
              $("#txtrequisito"+requisito).attr("disabled",true);

            }

          }

	})
}

function btn_elimE (consec,requisito){
	$("#divreq"+consec).children().remove();
	delete_requisito(consec,requisito).done(function(response){
		console.log(response);
  
		if(response["response"][0]["cant"]=='0'){
			$('#btnrequprim'+requisito).attr('disabled', false); 
			$("#txtrequisito"+requisito).attr("disabled",false);
			$("#textvalid_Requ"+requisito).val("0")
			$("#btnrequprim"+requisito).addClass("cargando")

  
		}else{
			$('#btnrequprim'+requisito).attr('disabled', true);
			$("#txtrequisito"+requisito).attr("disabled",true);
  
		}
		}).fail(function(response){
			console.log(response);
		});
  
  }

function viewInfoStudent(student,health,brothers,brothers_school,type_user,studentNew){
	$("#tabstudent").load("views/infoStudent.html?v=4.1", function(){
		console.log(health);
		/* Cargue de Datos en Inputs */
		if(type_user==2){
			document.getElementById('InfoStudent').innerHTML += '<div class="col-md-12 alert alert-danger"><p class="text-justify">Si los Padres de Familia requieren hacer cambios en los nombres, apellidos, será necesario que envíen un correo a "admisionesymatriculas@caa.edu.co", adjuntando el registro civil o documento de identidad como soporte de la nueva información.</p></div>	';
		}
		var estadoNew = studentNew["Estado"];
		(estadoNew == "1" && type_user==7)?$("#date_nac").val(studentNew["Birthdate"]):$("#date_nac").val(student["Birthdate"]);
		(estadoNew == "1" && type_user==7)?$("#age").val(studentNew["Age"]):$("#age").val(student["Age"]);
		
		(estadoNew == "1" && type_user==7)?$("#nuv").val(studentNew["Nuv"]):$("#nuv").val(student["Nuv"]);
		(estadoNew == "1" && type_user==7)?$("#pnu").val(studentNew["Pnu"]):$("#pnu").val(student["Pnu"]);
		(estadoNew == "1" && type_user==7)?$("#snu").val(studentNew["Snu"]):$("#snu").val(student["Snu"]);
		(estadoNew == "1" && type_user==7)?$("#iad").val(studentNew["Iad"]):$("#iad").val(student["Iad"]);
		(estadoNew == "1" && type_user==7)?$("#neighborhood").val(studentNew["Neighborhood"]):$("#neighborhood").val(student["Neighborhood"]);
		(estadoNew == "1" && type_user==7)?$("#phone_stu").val(studentNew["Phone"]):$("#phone_stu").val(student["Phone"]);



		
		$("#number_doc").val(student["Num_Doc"]);
		$("#number_visa").val(student["Number_Visa"]);
		$("#date_visa_exp").val(student["Date_Visa_Exp"]);
		$("#date_visa_venc").val(student["Date_Visa_Venc"]);
		
		
		$("#phone_home").val(student["Phone_Home"]);
		$("#stratus").val(student["Stratus"]);
		$("#gender").val(student["Gender"]);
		$("#blood_type").val(student["Blood_Type"]);
		$("#rh").val(student["Rh"]);
		$("#email_stu").val(student["Email"]);
		
		$("#eps").val(health["Eps"]);
		$("#ips").val(health["Ips"]);
		$("#prepaid_medicine").val(health["Prepaid_Medicine"]);
		$("#scheme").val(health["Scheme"]);	
		if(type_user==2){
			if(student["Nombre_Archivo"] != "" && student["Archivo"] != "" && student["Archivo"] != null && student["Archivo"] != undefined){
				$("#label_number_doc").removeClass("col-md-4").addClass("col-md-3")
				$("#div_number_doc").removeClass("col-md-4").addClass("col-md-3")
			}
		} 
		if(type_user==7){
			$("#nota1").innerHTML="<strong>Nota 1: </strong>Le informamos que según el Decreto 2200 del 2005 - Capítulo IV y la Ley 911 del 2004 - Artículo 13, el Colegio no podrá suministrar ningún medicamento a los estudiantes. En caso necesario, este proceso se llevará a cabo únicamente en las enfermerías enviando la fórmula médica correspondiente.</p></li>";
		}

		/*Cargue de Poliza */
		if(student["Nombre_Poliza"] != "" && student["Poliza"] != "" && student["Poliza"] != null && student["Poliza"] != undefined){
			let wrapper_f = $(".wrapper_files_poliza");
			let link_rut = student["Poliza"].replace(/\/home\/cvuser\/public_html/gm,"" ).replace("E:/www/","");
			let codi = student["Codigo_Poliza"] 
			let name = student["Nombre_Poliza"] 
			wrapper_f.append('<div class ="row bd-highlight mt-2" id="divPoliz' +
				codi +
				'"> <label for="file" class="col-3 col-md-2 col-lg-3">Ver Archivo: </label> <a class="col-9 col-md-5 col-lg-7 bd-highlight  btn-light btn-sm " style=" align-content: center;" target="_blank"  href="../' +link_rut +
				'" ><i class="fa-solid fa-eye"></i> ' +
				name +
				'</a> <a class="col col-md-6 col-lg-2 btn btn-outline-danger btn-sm "  onclick="btn_elimPol('+codi +')" style="opacity: 100;"><i class="fa-solid fa-trash-can"></i> Eliminar </a></div>'
			  )
			  if($("#divPoliz"+codi).children().length>0){
				$("#btnpoliza").attr("disabled",true);
				$("#txtpoliza").attr("disabled",true);
				$("#textvalid_poliza").val("1")
			}

		}
	
		///////////////////////////////


		/* Cargue de Datos en Inputs y Validación de Radios */
		showReasons("group_etnia",student["Etnia"]);
		showReasons("major_disease",health["Major_Disease"],health["dose_major_disease"]);
		// showReasons("current_disease",health["Current_Disease"]);
		// showReasons("hospitalized",health["Hospitalized"]);
		showReasons("allergy",health["Allergy"]);
		
		showReasons("depto_bienestar",health["dept_bienestar"]);
		showReasons("autorizaMedi",health["autorizaMedi"]);
		showReasons("allergy_medication",health["Allergy_Medication"]);
		showReasons("allergy_alimento",health["Allergy_Alimento"]);
		showReasons("disturbance",health["Disturbance"]);
		showReasons("surgical_history",health["Surgical_History"]);
	    showReasons("psicriatia",health["Psicriatia"]);
		showReasons("musculoskeletal_injuries",health["Musculoskeletal_Injuries"]);
		showReasons("permanent_medication",health["Name_Permanent_Medication"],health["Dose_Permanent_Medication"]);
		showReasons("medical_condition",health["Which_Medical_Condition"],health["Treatment_Medical_Condition"]);
		showReasons("convulsion",health["Convulsion"],health["Quantity_Convulsion"]);
		showReasons("convulsion_medication",health["Convulsion_Medication"]);
		showReasons("exploratory_valuation",health["exploratory_valuation"]);
		showReasons("poliza_seguro",health["reason_poliza_seguro"]);
		showReasons("vaccine_covid",health["Vaccine_Covid"]);
		showReasons("vaccine_vph",health["Vaccine_Vph"]);
		showReasons("Alergia",health["alergia"]);
		/* Cargue de Selectores */
		showSelectorsStudent(student);
		console.log(student);
		//console.log(brothers_school);
		if (brothers["code"] == 200) {
			var num_brother = 0;
			$("#brothers").removeClass('d-none');
			$.each(brothers["response"], function(key, value) {
				num_brother = num_brother + 1;
				$("#brothers").append('<div class="row brother" id="brother_'+value["Id"]+'" style="font-size:14px;"><div class="col-md-1"><span class="label label-default enumerBro">'+num_brother+'</span></div><div class="col-md-3"><span class="label label-default">'+value["Last_Name"]+'</span></div><div class="col-md-3"><span class="label label-default">'+value["Names"]+'</span></div><div class="col-md-3"><span class="label label-default">'+value["Course"]+'</span></div><div class="col-md-2"><span class="label label-default"><i class="fa fa-trash delete" aria-hidden="true" data-val="'+value["Id"]+'"></i></span></div></div><hr class="style2 brother_'+value["Id"]+'">');
			});
		}
		
		$("#date_nac").change(function() {
			var currentAge = calculateAge($(this).val());
			$("#age").val(currentAge);
		});
		$(".delete").click(function(e) {
			//console.log($(this).data('val'));
			deleteBrother($(this).data('val'));
			e.preventDefault();
		});
		$("#addBrother").click(function(e) {
			modalBrothers(brothers,brothers_school);
			e.preventDefault();
		});
		$(".btn_health").click(function(e) {
			optionRadio($(this),student);
			e.preventDefault();
		});
		$(".btn_etnia").click(function(e) {
			optionRadio($(this),student);
			e.preventDefault();
			
		});

		$("#selectTypeEtniaselec").val(5);


	})
}

function btn_elimPol (consec){
	$("#divPoliz"+consec).children().remove();
	delete_poliza(consec).done(function(response){
		console.log(response);
  
		if(response["response"][0]["cant"]=='0'){
			$('#btnpoliza').attr('disabled', false); 
			$("#txtpoliza").attr("disabled",false);
			$("#textvalid_poliza").val("0")

  
		}else{
			$('#btnpoliza').attr('disabled', true);
			$("#txtpoliza").attr("disabled",true);
  
		}
	  
  
		}).fail(function(response){
			console.log(response);
		});
  
  }



function cargar_requisitos(getfile, tipo=0, grado=0, student=0) {
	let div = "";
	for (var i = 0; i < getfile["length"]; i++) {
	  let num = i + 1;
	  if((student[0]['Type_User'] == 2 && (getfile[i]["cod"] == 7 ||  getfile[i]["cod"] == 8)) || (student[0]['Type_User'] == 2 && (grado <=3 && (getfile[i]["cod"]  == 7 || getfile[i]["cod"]  == 8 )))){
		continue
	  }else{
		div += '<div class="card mt-4 " id="div_re' + getfile[i]["cod"] + '">';
		div += '<div class="card-header requisito ">';
			if(getfile[i]["obligatorio"]==true){
				div += " <span>" + num + ".  </span><label class='d-inline'> " + getfile[i]["requisito"] + "<span class='text-danger'>*</span></label>";
			}else{
				div += " <span>" + num + ".  </span><label class='d-inline'> " + getfile[i]["requisito"] + "</label>";
			}
		div += '</div>';
		div += '<div class="card-body"><div class="row"> <div class="col col-lg-12">';
		div += '<div class="updload-file border" id="updload-file' + getfile[i]["cod"] +'">';
		div += '<div class="form-group my-2 m-2 d-flex">';
		div += '<input type="file" class="form-control  form-control-file mt-2 " id="txtrequisito' + getfile[i]["cod"] +'"  multiple name="txtrequisito'+  getfile[i]["cod"] +'[]" required>';
		div += '<button class="btn btn-info btn-subir-archivo cargando mt-2 txtrequisito' + getfile[i]["cod"] +'"  type="button" id="btnrequprim' + getfile[i]["cod"] +'" onclick="subir_archivoEst(' +getfile[i]["cod"] +"," + grado +","+  tipo +') ">Cargar</button></div></div></div>';
		div += '<div class="col-12 pt-3 ml-3  wrapper_'+ getfile[i]["cod"]+'" style="display: none;">';
		div += '<div class="progress progress_wrapper" style="width: 90%;">';
		div += '<div class="progress-bar progress-bar_stripped bg-info progress-bar-animated progress_bar'+ getfile[i]["cod"]+'" id="progress" role="progressbar" style="width: 0%;">0%</div>';
		div += '</div></div></div><div class="col-xl-12 py-2">';
		div += '<div class="updload-file border" id="updload-file'+getfile[i]["cod"]+'">';
		div += '<div class="form-group my-2 m-2">';
		div += '<div class=" alert alert-danger d-none" role="alert" id="mensaj_car'+getfile[i]["cod"]+'">El archivo se está cargando. Por favor, espere para que se habilite el siguiente campo.</div>';
		div += '<div class="wrapper_files_'+getfile[i]["cod"]+' my-3 m-3" id="divprimreq'+getfile[i]["cod"]+'"></div>';
		div += '<div class="d-none"><input type="number" class="validadreq" data-oblig="'+getfile[i]["obligatorio"]+'" id="textvalid_Requ'+getfile[i]["cod"]+'"></div>'
		div += '</div></div></div></div></div>';
	  }
	}
	$("#table_documentos").children().remove();
	$("#table_documentos").append(div);
	$("#table_documentos").removeClass("d-none");
  

  }

  function subir_archivoPoliza() {


	var archivo = document.getElementById("txtpoliza");
  
	var fileDoc = archivo.files;
	var wrapper = $(".wrapper_poliza");
	var wrapper_f = $(".wrapper_files_poliza");
	var progress_bar = $(".progress_barPoliz");
	if (fileDoc.length < 1) {
	  alert("Por favor seleccione el archivo");
	  return;
	}else{
  
	  $("#btnpoliza").html(
		"Cargando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>"
	  );
	  
	
	  $("#btnpoliza").attr("disabled",true);
	}
  
  
  
	let archivos= fileDoc.length
	let porc =100/archivos
	progress_bar.css("width","100%");
	progress_bar.html("Preparando..");
	progress_bar.removeClass("bg-success bg-danger").addClass("bg-info");
  
	
	let porcentaje= 0;
  
	let i;
	for(i=0; i<fileDoc.length;i++){
	  var fileName = fileDoc[i].name;

	  var info = new FormData();
	  info.append("base", "caa");
	  info.append("param", "updatefilesPoliza");
	  info.append("file", fileDoc[i]);

	  let ajax = new XMLHttpRequest();
	 
	  ajax.upload.addEventListener("progress", function (e) {
		let percentComplete = Math.floor((e.loaded / e.total) * 100);
		progress_bar.css("width", percentComplete - 1 + "%");
		progress_bar.html("Preparando..");
		  progress_bar.removeClass("bg-success bg-danger").addClass("bg-info");
  
		wrapper_f.append("");
	   
	  });
	  ajax.responseType = "json";
	  let activo = false;
	  ajax.addEventListener("load", function (e) {
		if(activo==false){
		  progress_bar.html("Cargando..");
		  progress_bar.css("width","10%");
		  progress_bar.removeClass("bg-success bg-danger").addClass("bg-info");
		}
		activo=true;
		wrapper.fadeIn();
		let responseObj = ajax.response;
		if (responseObj.code == 200) {
			if(responseObj.response[0].cod_valid==200){
  
  
  
		
				wrapper_f.children().remove();
				let files = "";
				porcentaje +=  Math.round(porc);  
				progress_bar.css("width", porcentaje+"%");
				progress_bar.html(porcentaje  + "% "); 
				for (let i = 0 ; i<responseObj.response.length;i++){
					var link_rut = responseObj.response[i].archivo.replace(/\/home\/cvuser\/public_html/gm,"").replace("E:/www/","");
					var name = responseObj.response[i].nombre;
					var codi = responseObj.response[i].consec;
					var revision = responseObj.response[i].revision;
					let div_aprobado = (revision=="OK")?'<div class="form-check"><input class="form-check-input" type="checkbox" disabled checked id="flexCheckDefault"><label class="form-check-label" for="flexCheckDefault">Aprobado</label></div>':"";
					let ocultar = (revision=="OK")?"d-none":"";
					wrapper_f.append('<div class ="row bd-highlight mt-2" id="divPoliz' +
						codi +
						'"> <label for="file" class="col-3 col-md-2 col-lg-3">Ver Archivo: </label> <a class="col-9 col-md-5 col-lg-7 bd-highlight  btn-light btn-sm " style=" align-content: center;" target="_blank"  href="../' +link_rut +
						'" ><i class="fa-solid fa-eye"></i>' +
						name +
						'</a> <a class="col col-md-6 col-lg-2 btn btn-outline-danger btn-sm '+ocultar+'" style="opacity: 100;"  onclick="btn_elimPol('+codi +')"><i class="fa-solid fa-trash"></i> Eliminar </a></div>'
					)
				/*     progress_bar.html("!Cargado");
					progress_bar.removeClass("bg-info").addClass("bg-success"); */
					
		
				}
				if(porcentaje>95){
					progress_bar.html("!Cargado");
					progress_bar.css("width","100%");
					progress_bar.removeClass("bg-info").addClass("bg-success"); 
					setTimeout(() => {
					wrapper.fadeOut();
					progress_bar.removeClass("bg-success bg-danger").addClass("bg-info");
					progress_bar.css("width", "0%");
					$("#btnpoliza").attr("disabled",true);
					$("#btnpoliza").html("Cargar")
					document.getElementById("txtpoliza").value = "";
					$("#txtpoliza").attr("disabled",true);
					$("#textvalid_poliza").val("1")
					}, 7000);
				
				
				}
			}else{
				var mensaje = responseObj.response[0].mess
				console.log(responseObj)
				Swal.fire({
				  title: "Advertencia!",
				  text: mensaje,
				  icon: "warning",
				  confirmButtonText: "OK",
				  confirmButtonColor: "#3085d6",
				  didClose: () => {
					wrapper.fadeOut();
					progress_bar.removeClass("bg-success bg-danger").addClass("bg-info");
					progress_bar.css("width", "0%");
					$("#btnpoliza").attr("disabled",false);
					$("#btnpoliza").html("Cargar")
					$("txtpoliza").attr("disabled",false);
					document.getElementById("txtpoliza").value = "";
	
				  },
				}).fail(function (response) {
				  console.log(response);
				});
			  }
		}
	  }); 
	 
  
  
  
	  ajax.open("POST", "controller/cont.php");
	  ajax.send(info);
	  
  
	}
  
  }
  function cleanFileNameFunction(fileName) {
    return fileName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ñ/g, "n").replace(/Ñ/g, "N").replace(/%/g, "").replace(/[^a-zA-Z0-9\.\-_]/g, "");  // Elimina otros caracteres especiales
	// Elimina tildes
                   
}

  
	function subir_archivoEst(requisito, grado) {


		var archivo = document.getElementById("txtrequisito" + requisito);
		
		var fileDoc = archivo.files;
		var wrapper = $(".wrapper_" + requisito);
		var wrapper_f = $(".wrapper_files_" + requisito);
		var progress_bar = $(".progress_bar" + requisito);
		if (fileDoc.length < 1) {
		  alert("Por favor seleccione el archivo");
		  return;
		}else{
		
		  $("#btnrequprim"+requisito).html(
			"Cargando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>"
		  );
		  $(".cargando").attr("disabled",true);

		  $("#mensaj_car"+requisito).removeClass("d-none")
		  $("#btnrequprim"+requisito).attr("disabled",true);
		}
		
		
		
		let archivos= fileDoc.length
		let porc =100/archivos
		progress_bar.css("width","100%");
		progress_bar.html("Preparando..");
		progress_bar.removeClass("bg-success bg-danger").addClass("bg-info");
		
		
		let porcentaje= 0;
		
		let i;
		for(i=0; i<fileDoc.length;i++){
		  var fileName = fileDoc[i].name;
		  var cleanFileName = cleanFileNameFunction(fileName);

		  var info = new FormData();
		  info.append("base", "caa");
		  info.append("param", "updatefilesDoc");
		  info.append("file", fileDoc[i]);
		  info.append("grado", grado);
		  info.append("requisito", requisito);
		  info.append("name", cleanFileName);
		  let ajax = new XMLHttpRequest();
		 
		  ajax.upload.addEventListener("progress", function (e) {
			let percentComplete = Math.floor((e.loaded / e.total) * 100);
			progress_bar.css("width", percentComplete - 1 + "%");
			progress_bar.html("Preparando..");
			  progress_bar.removeClass("bg-success bg-danger").addClass("bg-info");
		
			wrapper_f.append("");
		   
		  });
		  ajax.responseType = "json";
		  let activo = false;
		  ajax.addEventListener("load", function (e) {
			if(activo==false){
			  progress_bar.html("Cargando..");
			  progress_bar.css("width","10%");
			  progress_bar.removeClass("bg-success bg-danger").addClass("bg-info");
			}
			activo=true;
			wrapper.fadeIn();
			let responseObj = ajax.response;
			if (responseObj.code == 200) {
				if(responseObj.response[0].cod_valid==200){
					wrapper_f.children().remove();
					let files = "";
					porcentaje +=  Math.round(porc);  
					progress_bar.css("width", porcentaje+"%");
					progress_bar.html(porcentaje  + "% "); 
					for (let i = 0 ; i<responseObj.response.length;i++){
						var link_rut = responseObj.response[i].archivo.replace(/\/home\/cvuser\/public_html/gm,"").replace("E:/www/","");
						var name = responseObj.response[i].nombre;
						var codi = responseObj.response[i].consec;
						var revision = responseObj.response[i].revision;
						let div_aprobado = (revision=="OK")?'<div class="form-check"><input class="form-check-input" type="checkbox" disabled checked id="flexCheckDefault"><label class="form-check-label" for="flexCheckDefault">Aprobado</label></div>':"";
						let ocultar = (revision=="OK")?"d-none":"";
						wrapper_f.append('<div class ="row bd-highlight mt-2" id="divreq' +
							codi +
							'"> <label for="file" class="col-3 col-md-2 col-lg-3">Ver Archivo: </label> <a class="col-9 col-md-5 col-lg-7 bd-highlight  btn-light btn-sm " style=" align-content: center;" target="_blank"  href="../' +link_rut +
							'" ><i class="fa-solid fa-eye"></i>' +
							name +
							'</a> <a class="col col-md-6 col-lg-2 btn btn-outline-danger btn-sm '+ocultar+'" style="opacity: 100;"  onclick="btn_elimE(' +
							codi +
							"," +
							requisito +
							')"> <i class="fa-solid fa-trash"></i> Eliminar </a></div>'
						)
					/*     progress_bar.html("!Cargado");
						progress_bar.removeClass("bg-info").addClass("bg-success"); */
						
			
					}
					if(porcentaje>95){
						progress_bar.html("!Cargado");
						progress_bar.css("width","100%");
						progress_bar.removeClass("bg-info").addClass("bg-success"); 
						setTimeout(() => {
						wrapper.fadeOut();
						progress_bar.removeClass("bg-success bg-danger").addClass("bg-info");
						progress_bar.css("width", "0%");
						$("#btnrequprim"+requisito).attr("disabled",true);
						$("#btnrequprim"+requisito).html("Cargar")
						document.getElementById("txtrequisito" + requisito).value = "";
						$("#txtrequisito"+requisito).attr("disabled",true);
						$("#textvalid_Requ"+requisito).val("1")
						$("#btnrequprim"+requisito).removeClass("cargando")
						$("#mensaj_car"+requisito).addClass("d-none")

						$("#textvalid_Requ"+requisito).parent().parent().parent().parent().parent().parent()[0].className=""
						$(".cargando").attr("disabled",false);

						if (
							responseObj.response.length != 0 &&
							(requisito != 4 || requisito != 5)
						) {
						} else {
						}
						}, 7000);
					
					
					}
				}else{
					var mensaje = responseObj.response[0].mess
					console.log(responseObj)
					Swal.fire({
					  title: "Advertencia!",
					  text: mensaje,
					  icon: "warning",
					  confirmButtonText: "OK",
					  confirmButtonColor: "#3085d6",
					  didClose: () => {
						wrapper.fadeOut();
						progress_bar.removeClass("bg-success bg-danger").addClass("bg-info");
						progress_bar.css("width", "0%");
						$("#btnrequprim"+requisito).attr("disabled",false);
						$("#btnrequprim"+requisito).html("Cargar")
						$("#txtrequisito"+requisito).attr("disabled",false);
						document.getElementById("txtrequisito" + requisito).value = "";
		
					  },
					}).fail(function (response) {
					  console.log(response);
					});
				  }
		
			}
		  }); 
		 
		
		
		
		  ajax.open("POST", "controller/cont.php");
		  ajax.send(info);
		  
		
		}
		
	}
		

// función para renderizar banderas en las opciones
function formatFlag (state) {
    if (!state.id || state.id === "--") {
        return "--"; // cuando es nulo o vacío solo muestra --
    }
    let flagCode = $(state.element).data("flag");
    let phoneCode = $(state.element).data("phone");
    if (!flagCode || !phoneCode) {
        return state.text; // fallback si falta algún dato
    }
    let $state = $(  '<span><img src="https://flagcdn.com/20x15/' + flagCode + '.png" ' + 'style="width:20px; margin-right:8px"/> ' + state.text + ' +' + phoneCode + '</span>'
    );
    return $state;
}

function styleSelect (id){
	$("#"+id+" select").select2({
		templateResult: formatFlag,
		templateSelection: formatFlag,
		minimumResultsForSearch: 0, // muestra la caja de búsqueda
		width: '150px' 
	});
}

function viewInfoParents(civil_status,father,mother,student,fatherNew,motherNew,respemogic){
	$("#tabparents").load("views/infoParents.html?v=4.1", function(){

		
		$("#custody").val(civil_status["Custody"]);
		
		if (civil_status["Custody"] == "Otro") {
			$("#div_custody_other").removeClass("d-none");
		}
		if(civil_status["Custody"] == "Padre"){
			$("#div_recoge_madre").removeClass("d-none");
		}
		if(civil_status["Custody"] == "Madre"){
			$("#div_recoge_padre").removeClass("d-none");
		}
		/* Cargue de Datos del Padre */
		var estadoNew = fatherNew["Estado"];
		var estadoMotherNew = motherNew["Estado"];
		(estadoNew == "2" && student["Type_User"] ==7)?$("#father_last_name").val(fatherNew["Last_Name"]):$("#father_last_name").val(father["Last_Name"]);
		(estadoNew == "2" && student["Type_User"] ==7)?$("#father_names").val(fatherNew["Names"]):$("#father_names").val(father["Names"]);
		(estadoNew == "2" && student["Type_User"] ==7)?$("#father_email").val(fatherNew["Email"]):$("#father_email").val(father["Email"]);
		(estadoNew == "2" && student["Type_User"] ==7)?$("#father_mobile").val(fatherNew["Mobile"]):$("#father_mobile").val(father["Mobile"]);
		(estadoNew == "2" && student["Type_User"] ==7)?$("#father_number_doc").val(fatherNew["Num_Doc"]):$("#father_number_doc").val(father["Num_Doc"]);
		(estadoNew == "2" && student["Type_User"] ==7)?$("#father_company").val(fatherNew["Company"]):$("#father_company").val(father["Company"]);
		(estadoNew == "2" && student["Type_User"] ==7)?$("#father_phone_job").val(fatherNew["Phone_Job"]):$("#father_phone_job").val(father["Phone_Job"]);
		(estadoNew == "2" && student["Type_User"] ==7)?$("#father_position").val(fatherNew["Position"]):$("#father_position").val(father["Position"]);
		(estadoNew == "2" && student["Type_User"] ==7)?$("#father_occupation").val(fatherNew["Occupation"]):$("#father_occupation").val(father["Occupation"]);
		
		$("#father_phone_home").val(father["Phone_Home"]);
		$("#father_nuv").val(father["Nuv"]);
		$("#father_pnu").val(father["Pnu"]);
		$("#father_snu").val(father["Snu"]);
		$("#father_iad").val(father["Iad"]);
		$("#father_date_nac").val(father["Birthdate"]);
		$("#father_age").val(father["Age"]);
		$("#father_date_exp_doc").val(father["Date_Exp_Doc"]);
		$("#father_nuv_job").val(father["Nuv_Job"]);
		$("#father_pnu_job").val(father["Pnu_Job"]);
		$("#father_snu_job").val(father["Snu_Job"]);
		$("#father_iad_job").val(father["Iad_Job"]);
		$("#father_ext_job").val(father["Ext_Job"]);
		$("#father_service_time").val(father["Service_Time"]);
		
		$("#selectEmogicFather").append(createSelectV1(respemogic, 'selectEmogicFather', 16, false, father.prefijoCel));
		styleSelect ('selectEmogicFather');

		/* Cargue de Datos de la Madre */

		(estadoMotherNew == "2" && student["Type_User"] ==7)?$("#mother_last_name").val(motherNew["Last_Name"]):$("#mother_last_name").val(mother["Last_Name"]);
		(estadoMotherNew == "2" && student["Type_User"] ==7)?$("#mother_names").val(motherNew["Names"]):$("#mother_names").val(mother["Names"]);
		(estadoMotherNew == "2" && student["Type_User"] ==7)?$("#mother_email").val(motherNew["Email"]):$("#mother_email").val(mother["Email"]);
		(estadoMotherNew == "2" && student["Type_User"] ==7)?$("#mother_mobile").val(motherNew["Mobile"]):$("#mother_mobile").val(mother["Mobile"]);
		(estadoMotherNew == "2" && student["Type_User"] ==7)?$("#mother_number_doc").val(motherNew["Num_Doc"]):$("#mother_number_doc").val(mother["Num_Doc"]);
		(estadoMotherNew == "2" && student["Type_User"] ==7)?$("#mother_company").val(motherNew["Company"]):$("#mother_company").val(mother["Company"]);
		(estadoMotherNew == "2" && student["Type_User"] ==7)?$("#mother_phone_job").val(motherNew["Phone_Job"]):$("#mother_phone_job").val(mother["Phone_Job"]);
		(estadoMotherNew == "2" && student["Type_User"] ==7)?$("#mother_position").val(motherNew["Position"]):$("#mother_position").val(mother["Position"]);
		(estadoMotherNew == "2" && student["Type_User"] ==7)?$("#mother_occupation").val(motherNew["Occupation"]):$("#mother_occupation").val(mother["Occupation"]);
		$("#mother_phone_home").val(mother["Phone_Home"]);
		$("#mother_nuv").val(mother["Nuv"]);
		$("#mother_pnu").val(mother["Pnu"]);
		$("#mother_snu").val(mother["Snu"]);
		$("#mother_iad").val(mother["Iad"]);
		$("#mother_date_nac").val(mother["Birthdate"]);
		$("#mother_age").val(mother["Age"]);
		$("#mother_date_exp_doc").val(mother["Date_Exp_Doc"]);
		$("#mother_nuv_job").val(mother["Nuv_Job"]);
		$("#mother_pnu_job").val(mother["Pnu_Job"]);
		$("#mother_snu_job").val(mother["Snu_Job"]);
		$("#mother_iad_job").val(mother["Iad_Job"]);
		$("#mother_ext_job").val(mother["Ext_Job"]);
		$("#mother_service_time").val(mother["Service_Time"]);

		$("#selectEmogicMother").append(createSelectV1(respemogic, 'selectEmogicMother', 16, false, mother.prefijoCel));
		styleSelect ('selectEmogicMother');
	
		var adopted_son = (student["Adopted"] == "SI" || student["Adopted"] == "Si")?student["Age_Adopted"]:(student["Adopted"] == "NO" || student["Adopted"] == "No")?"":false;

		showReasons("adopted_son",adopted_son);

		showSelectorsParents(civil_status,father,mother);

		$(".adopted_son").click(function(e) {
			optionRadio($(this),student);
			e.preventDefault();
		});
		/* $(".recoge_padre").click(function(e) {
			optionRadio($(this));
			e.preventDefault();
		}); */
		$("#father_date_nac").change(function() {
			var currentAge = calculateAge($(this).val());
			$("#father_age").val(currentAge);
		});
		$("#mother_date_nac").change(function() {
			var currentAge = calculateAge($(this).val());
			$("#mother_age").val(currentAge);
		});
		$("#custody").change(function(e) {
			if ($(this).val() == "--") {
				$("#div_custody_other").addClass("d-none");
				$("#div_custody").find('select').val("--");
				$("#div_custody_other").find('input').val("");
			}
			else if ($(this).val() == "Otro") {
				$("#div_custody_other").removeClass("d-none");
				$("#div_recoge_madre").removeClass("d-none");
				$("#div_recoge_padre").removeClass("d-none");
			}
			else {
				$("#div_custody_other").addClass("d-none");
				$("#div_custody_other").find('input').val("");
			}
			if ($(this).val() === "Madre") {
				$("#div_recoge_padre").removeClass("d-none");
				$("#div_recoge_madre").addClass("d-none");
			} 
			else if ($(this).val() === "Padre") {
				$("#div_recoge_madre").removeClass("d-none");
				$("#div_recoge_padre").addClass("d-none");
			}
			if ($(this).val() === "Compartida") {
				$("#div_recoge_padre").addClass("d-none");
				$("#div_recoge_madre").addClass("d-none");
			}
			e.preventDefault();
		});

	})
}

function viewInfoAdditional(tutor,emergency,emergency_add,services,routes_desc,student,grade,brothers,brothers_school){
	$("#tabadditional").load("views/infoAdditional.html?v=4.1", function(){

		if((student["Half_Nines"] == 0  || student["Half_Nines"] == null)&& (student["Launch"] == 0 || student["Launch"] == null) && (student["Transport"] == 0 || student["Transport"] == null)){
			$("#div_cancel").addClass('d-none');
		}
		$("#div_nota").change( function(){
			$("#div_nota_foto").removeClass('d-none');
		});
		$("#div_nota_no").change( function(){
			$("#div_nota_foto").addClass('d-none');
		});
		$("#date_nac").change(function() {
			var currentAge = calculateAge($(this).val());
			$("#age").val(currentAge);
		});
		
		viewServicios(); 
		function viewServicios() {
			let serviciosActivos = ""; 
			
			if (student["Launch"] == "1") serviciosActivos += "Almuerzo, ";
			if (student["Transport"] == "1") serviciosActivos += "Transporte, ";
			if (student["Half_Nines"] == "1") serviciosActivos += "Medias nueves, ";
		
			// Quitamos la última coma y espacio si hay al menos un servicio activo.
			if (serviciosActivos.length > 0) {
				serviciosActivos = serviciosActivos.slice(0, -2);
			}
		
			// Actualizamos el texto del label
			$("#cancelarLabel").html("Si desea cancelar el servicio de " + serviciosActivos + " dé click en el siguiente botón.");
		}
		

		$("#viewCancel").click(function(e) {
			modalCancelacion(student);
			e.preventDefault();
		});
		

		/* Cargue de Datos del Acudiente */
		$("#tutor_last_name").val(tutor["Last_Name"]);
		$("#tutor_names").val(tutor["Names"]);
		$("#tutor_email").val(tutor["Email"]);
		$("#tutor_mobile").val(tutor["Mobile"]);
		$("#tutor_phone_home").val(tutor["Phone_Home"]);
		$("#tutor_nuv").val(tutor["Nuv"]);
		$("#tutor_pnu").val(tutor["Pnu"]);
		$("#tutor_snu").val(tutor["Snu"]);
		$("#tutor_iad").val(tutor["Iad"]);
		$("#tutor_number_doc").val(tutor["Num_Doc"]);
		$("#tutor_relationship").val(tutor["Relationship"]);
		$("#service_2 select").attr('disabled', true);
		$(".service_2").attr('disabled', true);
		/* Cargue de Datos en caso De Emergencia */
		$("#emergency_last_name").val(emergency["Last_Name"]);
		$("#emergency_names").val(emergency["Names"]);
		$("#emergency_email").val(emergency["Email"]);
		$("#emergency_mobile").val(emergency["Mobile"]);
		$("#emergency_phone_home").val(emergency["Phone_Home"]);
		$("#emergency_nuv").val(emergency["Nuv"]);
		$("#emergency_pnu").val(emergency["Pnu"]);
		$("#emergency_snu").val(emergency["Snu"]);
		$("#emergency_iad").val(emergency["Iad"]);
		$("#emergency_number_doc").val(emergency["Num_Doc"]);
		$("#emergency_relationship").val(emergency["Relationship"]);
		/* Cargue de Datos en caso De Emergencia Adicional */
		if (emergency_add != "response empty") {
			console.log("Entro Adicional Emergencia");
			$(".add_emerg[data-val='Si']").addClass('active');
			$("#emergency_add").removeClass('d-none');
			$("#emergency_add_last_name").val(emergency_add[0]["Last_Name"]);
			$("#emergency_add_names").val(emergency_add[0]["Names"]);
			$("#emergency_add_email").val(emergency_add[0]["Email"]);
			$("#emergency_add_mobile").val(emergency_add[0]["Mobile"]);
			$("#emergency_add_phone_home").val(emergency_add[0]["Phone_Home"]);
			$("#emergency_add_nuv").val(emergency_add[0]["Nuv"]);
			$("#emergency_add_pnu").val(emergency_add[0]["Pnu"]);
			$("#emergency_add_snu").val(emergency_add[0]["Snu"]);
			$("#emergency_add_iad").val(emergency_add[0]["Iad"]);
			$("#emergency_add_number_doc").val(emergency_add[0]["Num_Doc"]);
			$("#emergency_add_relationship").val(emergency_add[0]["Relationship"]);
		}
		else {
			$(".add_emerg[data-val='No']").addClass('active');
		}
		/* Cargue de Selectores */
		showSelectorsAdditional(tutor,emergency,emergency_add);
		var servicesTitles = '<div class="row p-1">';
		var servicesContent = '<div class="row p-1">';
		var optionServices = {1:"Si",0:"No"};
		var tipoUsers = student["Type_User"]
		var numServices = 12/services.length;
		if(tipoUsers=="2"){
			$.each(services, function(index, value) {
				servicesTitles = servicesTitles+'<div class="col-md-'+numServices+' p-1 title labelDiv" id="label_service_'+value["Id"]+'"><span class="label label-default font-weight-bold">'+value["Description"]+'</span></div>';
				servicesContent = servicesContent+'<div class="col-md-'+numServices+'" id="service_'+value["Id"]+'" inputGroupContainer" disabled>'+createSelectV1(optionServices,"service_"+value["Id"],9)+'</div>';
				$("#messageService").removeClass('d-none');
				/*servicesContent = servicesContent+'<div class="col-md-'+numServices+'" id="service_'+value["Id"]+'" inputGroupContainer" disabled>'+createSelect(optionServices,"service_"+value["Id"],4)+'</div>';*/
			});	

		}else{
			$.each(services, function(index, value) {
				servicesTitles = servicesTitles+'<div class="col-md-'+numServices+' p-1 title labelDiv" id="label_service_'+value["Id"]+'"><span class="label label-default font-weight-bold">'+value["Description"]+'</span></div>';
				servicesContent = servicesContent+'<div class="col-md-'+numServices+'" id="service_'+value["Id"]+'" inputGroupContainer" disabled>'+createSelectV1(optionServices,"service_"+value["Id"],4)+'</div>';
				/*servicesContent = servicesContent+'<div class="col-md-'+numServices+'" id="service_'+value["Id"]+'" inputGroupContainer" disabled>'+createSelect(optionServices,"service_"+value["Id"],4)+'</div>';*/
				/* serviceRazon = serviceRazon+'<div class="col-md-'+numServices+'" id="razon_'+value["Id"]+'" inputGroupContainer" disabled>';
				serviceRazon = serviceRazon+'<p class="text-center">Por qué no toma el servicio de '+value["Description"]+'</p>';
				serviceRazon = serviceRazon+'</div>'; */
				$("#messageService").addClass('d-none')
			});	
		}
		servicesTitles = servicesTitles+'</div>';
		servicesContent = servicesContent+'</div>';
		$("#services").append(servicesTitles);
		$("#services").append(servicesContent);

		/* Cargue de Datos de Servicios */

		if (grade < 8) {
			$(".service_1").val((student["Half_Nines"] == null)?"--":student["Half_Nines"]);
			if((student["Half_Nines"] == "0") || (student["Half_Nines"] == null)){
				$("#razon_services_mn").addClass('col-md-'+numServices);
				$("#service_1 select").attr('disabled', false);
				$(".service_1").attr('disabled', false);
				if(student["Type_User"]== "2"){
					/* $(".main-contentMediasNuenves").removeClass('d-none'); */
					$(".main-contentMediasNuenves").addClass('d-none');
				}else{
					$(".main-contentMediasNuenves").addClass('d-none');
				
				}
			} else{
				$(".main-contentMediasNuenves").addClass('d-none');
			}
		} else {
			$("#razon_services_mn").addClass('d-none');
		}
		$(".service_2").val((student["Launch"] == null)?"--":student["Launch"]);
		if((student["Launch"] == "0") || (student["Launch"] == null)){
			$("#service_2 select").attr('disabled', false);
			$(".service_2").attr('disabled', false);
			$("#razon_services_al").addClass('col-md-'+numServices);
			if(student["Type_User"] == "2"){
				/* $(".main-contentTransporte").removeClass('d-none'); */
				$(".main-contentTransporte").addClass('d-none');
			}else{
				$(".main-contentTransporte").addClass('d-none');
			}
			
		}else{
			$(".main-contentAlimento").addClass('d-none');
		}
		$(".service_3").val((student["Transport"] == null)?"--":student["Transport"]);
		if((student["Transport"] == "0") || (student["Transport"] == null)){
			$("#service_3 select").attr('disabled', false);
			$(".service_3").attr('disabled', false);
			$("#razon_services_al").addClass('col-md-'+numServices);
			$("#razon_services_tr").addClass('col-md-'+numServices);
			if(student["Type_User"]=="2"){
				$(".main-contentTransporte").addClass('d-none');
				/* $(".main-contentTransporte").removeClass('d-none'); */
			}else{
				$(".main-contentTransporte").addClass('d-none');
			}
			
		}else{
			$(".main-contentTransporte").addClass('d-none');
		}
		$(".service_4").val((student["Accident_Secure"] == null)?"--":student["Accident_Secure"]);
		if (student["Photo"] != null) {
			val_photo = (student["Photo"] == 1)?"Si":(student["Photo"] == 0)?"No":false;
			if(val_photo == "No") {
				$("#div_nota_foto").removeClass('d-none');
			} else {
				$("#div_nota_foto").addClass('d-none');
			}
			$(".auth_photo[data-val='"+val_photo+"']").addClass('active');

		}
		console.log(emergency_add);
		//console.log(typeof(emergency_add));
		//console.log(services);
		$(".service_2").change(function(e) {
			console.log("Entro a Selector Alimentacion");
			console.log(grade);
			if($(this).val() == 0){
				noLunch();
				if(student["Type_User"]==2){
					$(".main-contentAlimento").addClass('d-none');
					
				}else{
					$(".main-contentAlimento").addClass('d-none');
					$("#div_cancel").addClass('d-none');
				}

			} else {
				$("#mensajeNoalimento").addClass('d-none');
				$(".main-contentAlimento").addClass('d-none');
			}
			e.preventDefault();
		});

		$(".service_1").change(function(e) {
			console.log("Entro a Selector Alimentacion");
			console.log(grade);
			if($(this).val() == 0){
				if(student["Type_User"]==2){
					/* $(".main-contentMediasNuenves").removeClass('d-none'); */
					$(".main-contentMediasNuenves").addClass('d-none');
				}else{
					$(".main-contentMediasNuenves").addClass('d-none');
				}
				noLunch();
				
			} else {
				$(".main-contentMediasNuenves").addClass('d-none');
			}
			e.preventDefault();
		});

		
		if (brothers["code"] == 200) {
			var num_brother = 0;
			$("#brothers").removeClass('d-none');
			$.each(brothers["response"], function(key, value) {
				num_brother = num_brother + 1;
				$("#brothers").append('<div class="row brother" id="brother_'+value["Id"]+'" style="font-size:14px;"><div class="col-md-1"><span class="label label-default enumerBro">'+num_brother+'</span></div><div class="col-md-3"><span class="label label-default">'+value["Last_Name"]+'</span></div><div class="col-md-3"><span class="label label-default">'+value["Names"]+'</span></div><div class="col-md-3"><span class="label label-default">'+value["Course"]+'</span></div><div class="col-md-2"><span class="label label-default"><i class="fa fa-trash delete" aria-hidden="true" data-val="'+value["Id"]+'"></i></span></div></div><hr class="style2 brother_'+value["Id"]+'">');
			});
		}
		$(".delete").click(function(e) {
			//console.log($(this).data('val'));
			deleteBrother($(this).data('val'));
			e.preventDefault();
		});

		$("#addBrother").click(function(e) {
			modalBrothers(brothers,brothers_school);
			e.preventDefault();
		});


		$(".service_3").change(function(e) {
			console.log("Entro a Selector Transporte");
			console.log(grade);
			if($(this).val() == 1){
				yesTransport(routes_desc);
				$(".main-contentTransporte").addClass('d-none');
			}
			else if($(this).val() == 0){
				noTransport();
				$(".main-contentTransporte").addClass('d-none');
			}
			e.preventDefault();
		});
		$(".add_emerg").click(function(e) {
			if ($(this).attr('data-val') == "Si") {
				$('#emergency_add').removeClass('d-none');
			}
			else if ($(this).attr('data-val') == "No") {
				$('#emergency_add').addClass('d-none');
				$('#emergency_add').find('input').val("");
				$('#emergency_add').find('select').val("--");
			}
			optionRadio($(this),student);
			e.preventDefault();
		});
	})
}

function viewInfoFinancial(debtor,codebtor,father,mother,change_retention,type_user,studentNew,respemogic){
	$("#tabfinancial").load("views/infoFinancial.html?v=4.1", function(){
		// oculta la opción de selector según el tipo
		/* if (type_user == 7){
			const selecDeudor = document.getElementById("copy_codebtor");
			const optionElement = selecDeudor.querySelector('option[value="4"]');
			optionElement.remove();
		} */
		/* Notificación Cambio de Deudor */
		var studentNewEstado = studentNew["Estado"];
		if(type_user == 2){
			$("#titleModal").text("Información Importante!");
			$("#bodyTag").children().remove();
			$("#btnModal").text("Aceptar");
			$("#bodyTag").append('<div class="row alert alert-info"><div class="col-md-12"><p class="text-justify">Si es necesario cambiar al Deudor y/o Codeudor por fuerza mayor, deben enviar un correo a cartera@caa.edu.co adjuntando <b> carta firmada </b> por el Deudor y el Codeudor actuales, en la que se explique el motivo del cambio. La solicitud será evaluada según el caso.</p></div><div class="col-md-12 font-weight-bold"><p class="text-justify"><font style="color: red;">Por favor, verifique cuidadosamente que los datos en esta sección sean correctos, incluyendo correos electrónicos y números de celular serán necesarios para el proceso de firma digital</font></p></div></div>');
			/* $("#bodyTag").append('<div class="row alert alert-danger"></div>'); */
			$("#ModalObs .close").addClass('d-none');
			$("#ModalObs").modal("show");
			$("#btnModal").off();
		}

	    $("#btnModal").click(function(e) {
	    	$("#ModalObs").modal("hide");
	    	e.preventDefault();
	    });

		/* Cargue de Datos del Deudor */
		var enable_fields = (type_user == 7)?false:((change_retention == false)?true:false);
		if (debtor["Id_Copy"] == 1) {
			const selecDeudor = document.getElementById("copy_codebtor");
			const optionElement = selecDeudor.querySelector('option[value="1"]');
			optionElement.remove();
			
			copyDataDebtors("debtor",father);
			showSelectorsDebtor(father,true);

			$("#debtor_Emogic").append(createSelectV1(respemogic, 'debtor_Emogic', 16, true, father.prefijoCel));
			styleSelect ('debtor_Emogic');
		}
		else if (debtor["Id_Copy"] == 2) {
			const selecDeudor = document.getElementById("copy_codebtor");
			const optionElement = selecDeudor.querySelector('option[value="2"]');
			optionElement.remove();
			copyDataDebtors("debtor",mother);
			showSelectorsDebtor(mother,true);
			$("#debtor_Emogic").append(createSelectV1(respemogic, 'debtor_Emogic', 16, true, mother.prefijoCel));
			styleSelect ('debtor_Emogic');
		}
		else if (debtor["Id_Copy"] == 3) {
			copyDataDebtors("debtor",debtor);
			showSelectorsDebtor(debtor,false,enable_fields);
			$("#debtor_Emogic").append(createSelectV1(respemogic, 'debtor_Emogic', 16, false, debtor.ext_cel));
			styleSelect ('debtor_Emogic');
		}
		else if ((debtor["Id_Copy"] == 0 || debtor["Id_Copy"] == null) && (type_user == 7 && studentNew['Deudor'] =='PADRE')) {
			const selecDeudor = document.getElementById("copy_codebtor");
			const optionElement = selecDeudor.querySelector('option[value="1"]');
			optionElement.remove();
			copyDataDebtors("debtor",father);
			showSelectorsDebtor(father,true);
			$("#debtor_Emogic").append(createSelectV1(respemogic, 'debtor_Emogic', 16, true, father.prefijoCel));
			styleSelect ('debtor_Emogic');
			
		}else if ((debtor["Id_Copy"] == 0 || debtor["Id_Copy"] == null) && (type_user == 7 && studentNew['Deudor'] =='MADRE')) {
			const selecDeudor = document.getElementById("copy_codebtor");
			const optionElement = selecDeudor.querySelector('option[value="2"]');
			optionElement.remove();
			copyDataDebtors("debtor",mother);
			showSelectorsDebtor(mother,true);
			$("#debtor_Emogic").append(createSelectV1(respemogic, 'debtor_Emogic', 16, true, father.prefijoCel));
			styleSelect ('debtor_Emogic');
		}else if (debtor["Id_Copy"] == 0 || debtor["Id_Copy"] == null) {
			showSelectorsDebtor();
		}
		/* Cargue de Datos del Codeudor */
		if (codebtor["Id_Copy"] == 1) {
			copyDataDebtors("codebtor",father);
			showSelectorsCodebtor(father,true);
			$("#codebtor_Emogic").append(createSelectV1(respemogic, 'codebtor_Emogic', 16, true, father.prefijoCel));
			styleSelect ('codebtor_Emogic');
		}
		else if (codebtor["Id_Copy"] == 2) {
			copyDataDebtors("codebtor",mother);
			showSelectorsCodebtor(mother,true);
			$("#codebtor_Emogic").append(createSelectV1(respemogic, 'codebtor_Emogic', 16, true, mother.prefijoCel));
			styleSelect ('codebtor_Emogic');
		}
		else if (codebtor["Id_Copy"] == 3) {
			//console.log("Entro a Copia 3 C")
			copyDataDebtors("codebtor",codebtor);
			showSelectorsCodebtor(codebtor,false,enable_fields);
			$("#codebtor_Emogic").append(createSelectV1(respemogic, 'codebtor_Emogic', 16, false, codebtor.ext_cel));
			styleSelect ('codebtor_Emogic');
		}
		else if (codebtor["Id_Copy"] == 0 || codebtor["Id_Copy"] == null) {
			showSelectorsCodebtor();
		}

		/* Asignacion de Variable de Copia y Deshabilita los Campos sea Padre o Madre en Deudor o Codeudor respectivamente */
		$("#copy_debtor").val((debtor["Id_Copy"] == null)?"--":debtor["Id_Copy"]);
		$("#copy_codebtor").val((codebtor["Id_Copy"] == null)?"--":codebtor["Id_Copy"]);
		if (debtor["Id_Copy"] == 1 || debtor["Id_Copy"] == 2) {
			$("#formInfoDebtor").find('input').attr('disabled', true);
			if((father["Num_Doc"] != debtor["Num_Doc"]) && (mother["Num_Doc"] != debtor["Num_Doc"]) ){
				$("#debtor_email").prop('disabled',false);
				$("#debtor_mobile").prop('disabled',false);
			}
		}
		if (codebtor["Id_Copy"] == 1 || codebtor["Id_Copy"] == 2) {
			$("#formInfoCodebtor").find('input').attr('disabled', true);
			if((mother["Num_Doc"] != codebtor["Num_Doc"]) && (father["Num_Doc"] != codebtor["Num_Doc"]) ){
				$("#codebtor_email").prop('disabled',false);
				$("#codebtor_mobile").prop('disabled',false);
			}
		}
		console.log(change_retention);
		console.log(type_user);
		/* Validación de Permisos para cambiar Deudor o Codeudor */
		if (change_retention == false) {
			if (type_user != 7) {
				$("#copy_debtor").attr("disabled",true);
				$("#copy_codebtor").attr("disabled",true);
				$("#label_copy_debtor").parent().parent().addClass("d-none");
				$("#label_copy_codebtor").parent().parent().addClass("d-none");
				$("#debtor_last_name,#debtor_names,#debtor_number_doc").attr("disabled",true);
				$("#codebtor_last_name,#codebtor_names,#codebtor_number_doc").attr("disabled",true);
			}else if (type_user == 7 && studentNewEstado <= 3) {
				$("#copy_debtor").attr("disabled",true);
				$("#label_copy_debtor").parent().parent().addClass("d-none");
				$("#debtor_last_name,#debtor_names,#debtor_number_doc").attr("disabled",true);
			}
		}
		if (change_retention["Change"] == 1 || type_user == 7) {
			/* Seleccion de Copia de Datos Deudor */
			$("#copy_debtor").change(function(event) {
				if ($(this).val() == 1) {
					$("#formInfoDebtor").find('input').attr('disabled', true);
					$("#formInfoDebtor").find('select').remove();
					copyDataDebtors("debtor",father);
					showSelectorsDebtor(father,true);
					$("#debtor_Emogic").append(createSelectV1(respemogic, 'debtor_Emogic', 16, true, father.prefijoCel));
					styleSelect ('debtor_Emogic');
					
				}
				else if ($(this).val() == 2) {
					$("#formInfoDebtor").find('input').attr('disabled', true);
					$("#formInfoDebtor").find('select').remove();
					copyDataDebtors("debtor",mother);
					showSelectorsDebtor(mother,true);
					$("#debtor_Emogic").append(createSelectV1(respemogic, 'debtor_Emogic', 16, true, mother.prefijoCel));
					styleSelect ('debtor_Emogic');
				}
				else if ($(this).val() == 3) {
					$("#formInfoDebtor").find('input').attr('disabled', false);
					$("#formInfoDebtor").find('select').remove();
					copyDataDebtors("debtor",false);
					showSelectorsDebtor(false,false,enable_fields);
					$("#debtor_Emogic").append(createSelectV1(respemogic, 'debtor_Emogic', 16, false, '--'));
					styleSelect ('debtor_Emogic');
				}
				event.preventDefault();
			});
			/* Seleccion de Copia de Datos Coeudor */
			$("#copy_codebtor").change(function(event) {
				if ($(this).val() == 1) {
					$("#formInfoCodebtor").find('input').attr('disabled', true);
					$("#formInfoCodebtor").find('select').remove();
					copyDataDebtors("codebtor",father);
					showSelectorsCodebtor(father,true);
					$("#codebtor_Emogic").append(createSelectV1(respemogic, 'codebtor_Emogic', 16, true, father.prefijoCel));
					styleSelect ('codebtor_Emogic');
				}
				else if ($(this).val() == 2) {
					$("#formInfoCodebtor").find('input').attr('disabled', true);
					$("#formInfoCodebtor").find('select').remove();
					copyDataDebtors("codebtor",mother);
					showSelectorsCodebtor(mother,true);
					$("#codebtor_Emogic").append(createSelectV1(respemogic, 'codebtor_Emogic', 16, true, mother.prefijoCel));
					styleSelect ('codebtor_Emogic');
				}
				else if ($(this).val() == 3) {
					$("#formInfoCodebtor").find('input').attr('disabled', false);
					$("#formInfoCodebtor").find('select').remove();
					copyDataDebtors("codebtor");
					showSelectorsCodebtor(false,false,enable_fields);
					$("#codebtor_Emogic").append(createSelectV1(respemogic, 'codebtor_Emogic', 16, false, '--'));
					styleSelect ('codebtor_Emogic');
				}
				event.preventDefault();
			});
		}
	})
}

function viewSummary(student,grade,studentNew){
	getSummaryData().done(function(response){
		$("#tabsummary").load("views/summary.html?v=4.1", function(){
		$("#pgPrev2").click(function(event) {
			var tab_ant = 'summary';
			var position = 'financial';
			submitDiv(tab_ant,grade,student["Type_User"],position,studentNew);
			// //changeView(tabsModule[position-1]);
			event.preventDefault();
			console.log("Si entra")
		}); 
			response["response"]["keys"] = "Resumén de Actualización de Datos";
			$("#tableSummary").append(createTableInfo("summary",response["response"]));
			console.log(response);
			$(".closeActData").off();
			$(".closeActData").click(function() {
				cleanView();
				$("#titleModal").text("Finalización de Actualización de Datos");
			    $("#bodyTag").append('<div class="row alert alert-info"><div class="col-md-12"><p class="text-justify">¿Está seguro que desea terminar el proceso de Actualización de Datos?</p></div><div class="col-md-12"><font style="color:red"><p class="text-justify"><b>Una vez se haya revisado la información recibirán un correo electrónico con las indicaciones correspondientes para dar continuidad al proceso de legalización de matrícula.</p></b></font></div></div>');
			    $("#ModalObs .close").removeClass('d-none');
			    $("#btnModal").text("Aceptar");
			    $('#ModalObs').modal({backdrop: 'static', keyboard: false});
			    $("#ModalObs").modal("show");
			    $("#btnModal").off();
			    $("#btnModal").click(function(e) {
			    	/* Act on the event */
			    	updateEndProcess(student['Type_User']).done(function(response){
						console.log(response);
						if (response["code"] == 200) {
							location.href = "../index.html";
						}
			    	}).fail(function(response){
						console.log(response);
					});
			    	$("#ModalObs").modal("hide");
			    	e.preventDefault();
			    });
			});
		});
	}).fail(function(response){
		console.log(response);
	});
}



function validDocuments(){

	let habilt=true
	for(var i=0 ; i<$(".validadreq").length;i++){
		let id = $(".validadreq")[i].id
		if($("#"+id).data("oblig")==true && ($("#"+id).val()==0 || $("#"+id).val()=="")){
			$("#"+id).parent().parent().parent().parent().parent().parent()[0].className="labelInvalid animated infinite "
			habilt=false
		}

	}
	if(habilt){

	}else{
	  Swal.fire({
		title: 'Pendiente!',
		text: 'Faltan documentos por cargar ',
		icon: 'warning',
		confirmButtonText: 'OK',
		confirmButtonColor: '#A73126',
		didClose: () => {
	 
			}
		})

	}

	return habilt

}










function submitInfoStudent(type_user,studentNew){

	/* Captura de Datos Inputs */
	var date_nac = $("#date_nac").val();
	var number_doc = $("#number_doc").val();
	var number_visa = $("#number_visa").val();
	var date_visa_exp = $("#date_visa_exp").val();
	var date_visa_venc = $("#date_visa_venc").val();
	var nuv = $("#nuv").val();
	var pnu = $("#pnu").val();
	var snu = $("#snu").val();
	var iad = $("#iad").val();
	var neighborhood = $("#neighborhood").val();
	var phone_home = $("#phone_home").val();
	var stratus = $("#stratus").val();
	var gender = $("#gender").val();
	var selectCountryNac = $(".selectCountryNac").val();
	var selectDeptoNac = $(".selectDeptoNac").val();
	var selectCityNac = $(".selectCityNac").val();
	var selectNacionality = $(".selectNacionality").val();
	var selectTypeDoc = $(".selectTypeDoc").val();
	var selectDeptoExp = $(".selectDeptoExp").val();
	var selectCityExp = $(".selectCityExp").val();
	var selectAddrHome = $(".selectAddrHome").val();
	var selectDeptoHome = $(".selectDeptoHome").val();
	var selectCityHome = $(".selectCityHome").val();
	var email_stu = $("#email_stu").val();
	var phone_stu = $("#phone_stu").val();
	var blood_type = $("#blood_type").val();
	var rh = $("#rh").val();
	var eps = $("#eps").val();
	var ips = "-";
	var prepaid_medicine = $("#prepaid_medicine").val();
	var scheme = $("#scheme").val();
	var major_disease = $(".major_disease.active").data('val');
	var current_disease = "-";
	var hospitalized = "-";
	var disturbance = $(".disturbance.active").data('val');
	var surgical_history = $(".surgical_history.active").data('val');
	var psicriatia = $(".psicriatia.active").data('val');
	var autorizaMedi = $(".autorizaMedi.active").data('val');
	var musculoskeletal_injuries = $(".musculoskeletal_injuries.active").data('val');
	var permanent_medication = $(".permanent_medication.active").data('val');
	var medical_condition = $(".medical_condition.active").data('val');
	var convulsion = $(".convulsion.active").data('val');
	var convulsion_medication = $(".convulsion_medication.active").data('val');
	var vaccine_covid = $(".vaccine_covid.active").data('val');
	var vaccine_vph = $(".vaccine_vph.active").data('val');
	var exploratory_valuation = $(".exploratory_valuation.active").data('val');
	
	//cristian
	var poliza_seguro = $(".poliza_seguro.active").data('val');
	var ValidSeg = ($("#divprimreqPoliza a").length == '2')?true:false;
	var archivo = ($("#txtpoliza").val() != "")?((ValidSeg == false)?"":$("#txtpoliza").val()):$("#txtpoliza").val();
 	var validationPoliza = (poliza_seguro == "No")?((ValidSeg == true)?false:true):false
 



 	var reason_major_disease = $("#reason_major_disease").val();
	var dose_major_disease = $("#dose_major_disease").val();
	var reason_current_disease = "-";
	var reason_hospitalized = "-";
	var reason_disturbance = $("#reason_disturbance").val();
	var reason_surgical_history = $("#reason_surgical_history").val();
	/* var reason_psicriatia = $("#reason_psicriatia").val(); */
	var reason_musculoskeletal_injuries = $("#reason_musculoskeletal_injuries").val();
	var name_permanent_medication = $("#name_permanent_medication").val();
	var dose_permanent_medication = $("#dose_permanent_medication").val();
	var which_medical_condition = $("#which_medical_condition").val();
	var treatment_medical_condition = $("#treatment_medical_condition").val();
	var reason_convulsion = $("#reason_convulsion").val();
	var quantity_convulsion = $("#quantity_convulsion").val();
	var reason_convulsion_medication = $("#reason_convulsion_medication").val();
	var reason_exploratory_valuation = "--"
	var reason_poliza_seguro = $("#reason_poliza_seguro").val();
	var type_doc = (selectTypeDoc == 8 || selectTypeDoc == 7 || selectTypeDoc == 13 || selectTypeDoc == 15)?true:false;
	var type_country_2 = (selectTypeDoc == 8 || selectTypeDoc == 7 || selectTypeDoc == 13 || selectTypeDoc == 15)?false:true;
	var type_depto_2 = (selectTypeDoc == 7|| selectTypeDoc == 13)?false:true;
	var type_country = (selectCountryNac == "CO")?true:false;
	var depto_bienestar = ($(".depto_bienestar.active").attr('data-val') == undefined)?"":$(".depto_bienestar.active").attr('data-val');
	var group_etnia = ($(".group_etnia.active").attr('data-val') == undefined)?"":$(".group_etnia.active").attr('data-val');
	var selecgroup_etnico = $("#selectTypeEtniaselec").val();
	var element_etnia = (selecgroup_etnico == "--")? selecgroup_etnico = "":selecgroup_etnico;

	
	// alergias
	var Alergia = $(".Alergia.active").data('val');

	var allergy = (Alergia == 'Si')?$(".allergy.active").data('val'):'No';
	var allergy_medication = (Alergia == 'Si')?$(".allergy_medication.active").data('val'):'No';
	var allergy_alimento = (Alergia == 'Si')?$(".allergy_alimento.active").data('val'):'No';

	var reason_allergy = (Alergia == 'Si')?$("#reason_allergy").val():'';
	var reason_allergy_medication = (Alergia == 'Si')?$("#reason_allergy_medication").val():'';
	var reason_allergy_alimento = (Alergia == 'Si')?$("#reason_allergy_alimento").val():'';

	var valid = validFormActData([{'data':date_nac,'item':'date_nac','type':'date', 'obligatory':true},
				{'data':number_doc,'item':'number_doc','type':'text', 'obligatory':true},
				/* {'data':documet,'item':'doc_requisito','type':'text', 'obligatory':((ellement == true)?false:true)}, */
				{'data':number_visa,'item':'number_visa','type':'text', 'obligatory':false},
				{'data':date_visa_exp,'item':'date_visa_exp','type':'date', 'obligatory':type_doc},
				{'data':date_visa_venc,'item':'date_visa_venc','type':'date', 'obligatory':type_doc},
				{'data':nuv,'item':'selectAddrHome','type':'text', 'obligatory':true},
				{'data':pnu,'item':'selectAddrHome','type':'text', 'obligatory':true},
				{'data':snu,'item':'selectAddrHome','type':'text', 'obligatory':true},
				{'data':iad,'item':'selectAddrHome','type':'text', 'obligatory':false},
				{'data':neighborhood,'item':'neighborhood','type':'text', 'obligatory':true},
				{'data':phone_home,'item':'phone_home','type':'text', 'obligatory':true},
				{'data':stratus,'item':'stratus','type':'select', 'obligatory':true},
				{'data':gender,'item':'gender','type':'select', 'obligatory':true},
				{'data':blood_type,'item':'blood_type','type':'select', 'obligatory':true},
				{'data':rh,'item':'rh','type':'select', 'obligatory':true},
				{'data':email_stu,'item':'email_stu','type':'text', 'obligatory':true},
				{'data':phone_stu,'item':'phone_stu','type':'text', 'obligatory':true},
				{'data':eps,'item':'eps','type':'text', 'obligatory':true},
				{'data':ips,'item':'ips','type':'text', 'obligatory':true},
				{'data':prepaid_medicine,'item':'prepaid_medicine','type':'text', 'obligatory':false},
				{'data':scheme,'item':'scheme','type':'select', 'obligatory':true},
				{'data':selectCountryNac,'item':'selectCountryNac','type':'select', 'obligatory':true},
				{'data':selectDeptoNac,'item':'selectDeptoNac','type':'select', 'obligatory':type_country},
				{'data':selectCityNac,'item':'selectCityNac','type':'select', 'obligatory':true},
				{'data':selectNacionality,'item':'selectNacionality','type':'select', 'obligatory':true},
				{'data':selectTypeDoc,'item':'selectTypeDoc','type':'select', 'obligatory':true},
				{'data':selectDeptoExp,'item':'selectDeptoExp','type':'select', 'obligatory':type_depto_2},
				{'data':selectCityExp,'item':'selectCityExp','type':'select', 'obligatory':type_country_2},
				{'data':selectAddrHome,'item':'selectAddrHome','type':'select', 'obligatory':true},
				{'data':selectDeptoHome,'item':'selectDeptoHome','type':'select', 'obligatory':true},
				{'data':major_disease,'item':'major_disease','type':'radio', 'obligatory':true},
				// {'data':current_disease,'item':'current_disease','type':'radio', 'obligatory':true},
				{'data':hospitalized,'item':'hospitalized','type':'radio', 'obligatory':true},
				{'data':disturbance,'item':'disturbance','type':'radio', 'obligatory':true},
				{'data':Alergia,'item':'Alergia','type':'radio', 'obligatory':true},
				{'data':allergy,'item':'allergy','type':'radio', 'obligatory':true},
				{'data':allergy_medication,'item':'allergy_medication','type':'radio', 'obligatory':true},
				{'data':allergy_alimento,'item':'allergy_alimento','type':'radio', 'obligatory':true},
				{'data':surgical_history,'item':'surgical_history','type':'radio', 'obligatory':true},
				{'data':psicriatia,'item':'psicriatia','type':'radio', 'obligatory':true},
				{'data':autorizaMedi,'item':'autorizaMedi','type':'radio', 'obligatory':true},
				{'data':musculoskeletal_injuries,'item':'musculoskeletal_injuries','type':'radio', 'obligatory':true},
				{'data':permanent_medication,'item':'permanent_medication','type':'radio', 'obligatory':true},
				{'data':medical_condition,'item':'medical_condition','type':'radio', 'obligatory':true},
				{'data':convulsion,'item':'convulsion','type':'radio', 'obligatory':true},
				{'data':convulsion_medication,'item':'convulsion_medication','type':'radio', 'obligatory':true},
				{'data':vaccine_covid,'item':'vaccine_covid','type':'radio', 'obligatory':true},
				{'data':vaccine_vph,'item':'vaccine_vph','type':'radio', 'obligatory':true},
				{'data':exploratory_valuation,'item':'exploratory_valuation','type':'radio', 'obligatory':true},
				{'data':reason_major_disease,'item':'reason_major_disease','type':'text', 'obligatory':((major_disease == "Si")?true:false)},
				{'data':dose_major_disease,'item':'dose_major_disease','type':'text', 'obligatory':((major_disease == "Si")?true:false)},
				// {'data':reason_current_disease,'item':'current_disease','type':'text', 'obligatory':((current_disease == "Si")?true:false)},
				// {'data':reason_hospitalized,'item':'hospitalized','type':'text', 'obligatory':((hospitalized == "Si")?true:false)},
				{'data':reason_disturbance,'item':'disturbance','type':'text', 'obligatory':((disturbance == "Si")?true:false)},
				{'data':reason_allergy,'item':'allergy','type':'text', 'obligatory':((allergy == "Si")?true:false)},
				{'data':reason_allergy_medication,'item':'allergy_medication','type':'text', 'obligatory':((allergy_medication == "Si")?true:false)},
				{'data':reason_allergy_alimento,'item':'allergy_alimento','type':'text', 'obligatory':((allergy_alimento == "Si")?true:false)},
				{'data':reason_surgical_history,'item':'surgical_history','type':'text', 'obligatory':((surgical_history == "Si")?true:false)},
				/* {'data':reason_psicriatia,'item':'psicriatia','type':'text', 'obligatory':((psicriatia == "Si")?true:false)}, */
				{'data':reason_musculoskeletal_injuries,'item':'musculoskeletal_injuries','type':'text', 'obligatory':((musculoskeletal_injuries == "Si")?true:false)},
				{'data':name_permanent_medication,'item':'permanent_medication','type':'text', 'obligatory':((permanent_medication == "Si")?true:false)},
				{'data':dose_permanent_medication,'item':'permanent_medication','type':'text', 'obligatory':((permanent_medication == "Si")?true:false)},
				{'data':which_medical_condition,'item':'medical_condition','type':'text', 'obligatory':((medical_condition == "Si")?true:false)},
				{'data':treatment_medical_condition,'item':'medical_condition','type':'text', 'obligatory':((medical_condition == "Si")?true:false)},
				{'data':reason_convulsion,'item':'convulsion','type':'text', 'obligatory':((convulsion == "Si")?true:false)},
				{'data':quantity_convulsion,'item':'convulsion','type':'text', 'obligatory':((convulsion == "Si")?true:false)},
				{'data':reason_convulsion_medication,'item':'convulsion_medication','type':'text', 'obligatory':((convulsion_medication == "Si")?true:false)},
				{'data':reason_exploratory_valuation,'item':'exploratory_valuation','type':'text', 'obligatory':((exploratory_valuation == "No")?true:false)},
				{'data':poliza_seguro,'item':'poliza_seguro','type':'radio', 'obligatory':true},
				{'data':reason_poliza_seguro,'item':'poliza_seguro','type':'text', 'obligatory':((poliza_seguro == "No")?true:false)},
				{'data':depto_bienestar,'item':'depto_bienestar','type':'text', 'obligatory':true},
				{'data':archivo,'item':'txtpoliza','type':'text', 'obligatory':validationPoliza},
				{'data':group_etnia,'item':'group_etnia','type':'text', 'obligatory':(group_etnia=="")?true:false},
				{'data':selecgroup_etnico,'item':'selecgroup_etnico','type':'text', 'obligatory':(group_etnia=="Si")?((element_etnia == "")?true:false):false}
				]);
	var validSave = true;
	if (valid["validate"]) {
		//console.log("Validado");
		let updStudent, updHealth, upDeptoBienestar,updateEtnia;
		updStudent = updateStudentData(date_nac,number_doc,number_visa,date_visa_exp,date_visa_venc,nuv,pnu,snu,iad,neighborhood,phone_home,stratus,gender,selectCountryNac,selectDeptoNac,selectCityNac,selectNacionality,selectTypeDoc,selectDeptoExp,selectCityExp,selectAddrHome,selectDeptoHome,selectCityHome,email_stu,phone_stu,blood_type,rh);
		updHealth = updateHealthData(blood_type,rh,eps,ips,prepaid_medicine,scheme,major_disease,current_disease,hospitalized,disturbance,allergy,allergy_medication,surgical_history,musculoskeletal_injuries,permanent_medication,medical_condition,convulsion,convulsion_medication,exploratory_valuation,reason_major_disease,reason_current_disease,reason_hospitalized,reason_disturbance,reason_allergy,reason_allergy_medication,reason_surgical_history,reason_musculoskeletal_injuries,name_permanent_medication,dose_permanent_medication,which_medical_condition,treatment_medical_condition,reason_convulsion,quantity_convulsion,reason_convulsion_medication,reason_exploratory_valuation,vaccine_covid,vaccine_vph,allergy_alimento,reason_allergy_alimento,poliza_seguro,reason_poliza_seguro,psicriatia,dose_major_disease,autorizaMedi,Alergia);
		upDeptoBienestar = updateDeptoBienestarData(depto_bienestar);
		updateEtnia = updateEtniaData(selecgroup_etnico);
		var status = studentNew[0]['response'][0]['Estado'];
		var updateStateStudenNew = (type_user == 7 && status <= 1 )?updateStateStudenNewData(2):"";

		$("#saveData").html("Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
		$("#saveData").attr('disabled', true);
		$.when(updStudent, updHealth, upDeptoBienestar, updateEtnia,updateStateStudenNew).done(function(respStudent,respHealth, respupDeptoBienestar, respupdateEtnia,responseupdateStateStudenNew){
			$("#saveData").html('Guardar <i class="fa fa-floppy-o" aria-hidden="true"></i>');
			$("#saveData").removeAttr('disabled');
			$(".labelCheck").remove();
			$(".labelDiv").each(function() {
				$(this).removeClass('labelInvalid');
				$(this).addClass('labelValid');
				if ($(this).hasClass("selectDeptoExp") || $(this).hasClass("selectCityExp")) {
					$("#label_selectExp").removeClass("animated infinite pulse");
					$("#label_selectExp").append('  <span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>');
				}
				else {
					$(this).append('  <span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>');
					$(this).removeClass("animated infinite pulse");
					$("#label_selectExp").removeClass("animated infinite pulse");
				}
			});
		}).fail(function(response){
			//console.log("fail Student");
			//console.log(response);
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
			if (label == "selectDeptoExp" || label == "selectCityExp") {
				$("#label_selectExp").append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
				$("#label_selectExp").addClass("animated infinite pulse");
				$("#label_selectExp").addClass('labelInvalid');
				$("#label_selectExp").focus();
			}
			else if(label == "doc_requisito") {
				$("#label_div_action").append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
				$("#label_div_action").addClass('labelInvalid');
				$("#label_div_action").focus();
			}
			else if(label == "group_etnia" ||label == "selecgroup_etnico") {
				$("#label_etnia").append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
				$("#label_etnia").addClass('labelInvalid');
				$("#label_etnia").focus();
			}
			else {
				$("#label_"+label).addClass('labelInvalid');
				$("#label_"+label).append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
				$("#label_"+label).addClass("animated infinite pulse");
			}
			$("#"+label).focus();
			$("."+label).focus();
		});
	}
	return validSave;
}

function submitInfoParents(type_user,studentNew){

	/* Captura de Datos Inputs Padre*/
	var selectCivilStatus = $(".selectCivilStatus").val();
	var peatona_person_m = "";
	var peatona_person_p = "";
	if ($("#custody").val() == "Otro") {
		var custody = $("#custody_other").val();
		var custody_parent = $("#custody_other_parentezco").val();
		var custody_cedula = $("#custody_other_cedula").val();
		var custody_cel = $("#custody_other_celphone").val();
		peatona_person_m = ($(".recoge_madre.active").attr('data-val') == undefined)?"":$(".recoge_madre.active").attr('data-val');
		peatona_person_p = ($(".recoge_padre.active").attr('data-val') == undefined)?"":$(".recoge_padre.active").attr('data-val');
	}
	else {
		var custody = $("#custody").val();
		var custody_parent = $("#custody_other_parentezco").val();
		var custody_cedula = $("#custody_other_cedula").val();
		var custody_cel = $("#custody_other_celphone").val();
	}
	if ($("#custody").val() == "Madre") {
		peatona_person_p = ($(".recoge_padre.active").attr('data-val') == undefined)?"":$(".recoge_padre.active").attr('data-val');
	}
	if ($("#custody").val() == "Padre") {
		peatona_person_m = ($(".recoge_madre.active").attr('data-val') == undefined)?"":$(".recoge_madre.active").attr('data-val');
	}
	console.log($("#custody").val());
	var type_custody = ($("#custody").val() == "Otro")?"text":"select";
	var adopted_son = $(".adopted_son.active").data('val');
	var reason_adopted_son = $("#reason_adopted_son").val();
	/* Captura de Datos Inputs Padre*/
	var father_last_name = $("#father_last_name").val();
	var father_names = $("#father_names").val();
	var father_email = $("#father_email").val();
	var father_mobile = $("#father_mobile").val();
	var father_phone_home = $("#father_phone_home").val();
	var father_nuv = $("#father_nuv").val();
	var father_pnu = $("#father_pnu").val();
	var father_snu = $("#father_snu").val();
	var father_iad = $("#father_iad").val();
	var father_date_nac = $("#father_date_nac").val();
	var father_date_exp_doc = $("#father_date_exp_doc").val();
	var father_number_doc = $("#father_number_doc").val();
	var father_company = $("#father_company").val();
	var father_position = $("#father_position").val();
	var father_occupation = $("#father_occupation").val();
	var father_nuv_job = $("#father_nuv_job").val();
	var father_pnu_job = $("#father_pnu_job").val();
	var father_snu_job = $("#father_snu_job").val();
	var father_iad_job = $("#father_iad_job").val();
	var father_phone_job = $("#father_phone_job").val();
	var father_ext_job = $("#father_ext_job").val();
	var father_service_time = $("#father_service_time").val();
	var father_selectCountryNac = $(".father_selectCountryNac").val();
	var father_selectCityNac = $(".father_selectCityNac").val();
	var father_selectAddrHome = $(".father_selectAddrHome").val();
	var father_selectDeptoHome = $(".father_selectDeptoHome").val();
	var father_selectCityHome = $(".father_selectCityHome").val();
	var father_selectTypeDoc = $(".father_selectTypeDoc").val();
	var father_selectDeptoExp = $(".father_selectDeptoExp").val();
	var father_selectCityExp = $(".father_selectCityExp").val();
	var father_selectAddr_job = $(".father_selectAddr_job").val();
	/* Cargue de Datos de la Madre */
	var mother_last_name = $("#mother_last_name").val();
	var mother_names = $("#mother_names").val();
	var mother_email = $("#mother_email").val();
	var mother_mobile = $("#mother_mobile").val();
	var mother_phone_home = $("#mother_phone_home").val();
	var mother_nuv = $("#mother_nuv").val();
	var mother_pnu = $("#mother_pnu").val();
	var mother_snu = $("#mother_snu").val();
	var mother_iad = $("#mother_iad").val();
	var mother_date_nac = $("#mother_date_nac").val();
	var mother_date_exp_doc = $("#mother_date_exp_doc").val();
	var mother_number_doc = $("#mother_number_doc").val();
	var mother_company = $("#mother_company").val();
	var mother_position = $("#mother_position").val();
	var mother_occupation = $("#mother_occupation").val();
	var mother_nuv_job = $("#mother_nuv_job").val();
	var mother_pnu_job = $("#mother_pnu_job").val();
	var mother_snu_job = $("#mother_snu_job").val();
	var mother_iad_job = $("#mother_iad_job").val();
	var mother_phone_job = $("#mother_phone_job").val();
	var mother_ext_job = $("#mother_ext_job").val();
	var mother_service_time = $("#mother_service_time").val();
	var mother_selectCountryNac = $(".mother_selectCountryNac").val();
	var mother_selectCityNac = $(".mother_selectCityNac").val();
	var mother_selectAddrHome = $(".mother_selectAddrHome").val();
	var mother_selectDeptoHome = $(".mother_selectDeptoHome").val();
	var mother_selectCityHome = $(".mother_selectCityHome").val();
	var mother_selectTypeDoc = $(".mother_selectTypeDoc").val();
	var mother_selectDeptoExp = $(".mother_selectDeptoExp").val();
	var mother_selectCityExp = $(".mother_selectCityExp").val();
	var mother_selectAddr_job = $(".mother_selectAddr_job").val();
	var type_civilStatus = (selectCivilStatus == 2 || selectCivilStatus == 3)?true:false;
	var validDataFather = (selectCivilStatus == 10)?false:true;
	var validDataMother = (selectCivilStatus == 4)?false:true;

	var custody_parents =( $("#custody").val() == null)?false:$("#custody").val();
	var custody_requis = (custody == "--" || custody == "Madre" || custody == "Padre" || custody == "Compartida"|| custody == null)?false:true
	
	var indicativoFather = $("#selectEmogicFatherselec").val(); 
	var indicativoMother = $("#selectEmogicMotherselec").val(); 
	

	var valid = validFormActData([{'data':selectCivilStatus,'item':'selectCivilStatus','type':'select', 'obligatory':true},
				{'data':custody,'item':'selectCivilStatus','type':type_custody, 'obligatory':type_civilStatus},
				{'data':custody_parent,'item':'selectCivilStatus','type':type_custody, 'obligatory':custody_requis},
				{'data':custody_cedula,'item':'selectCivilStatus','type':'number', 'obligatory':custody_requis},
				{'data':custody_cel,'item':'selectCivilStatus','type':'number', 'obligatory':custody_requis},
				{'data':peatona_person_m,'item':'recoge_madre','type':'text', 'obligatory':(custody_parents == "Padre" || custody_parents == "Otro")?true:false},
				{'data':peatona_person_p,'item':'recoge_padre','type':'text', 'obligatory':(custody_parents == "Madre" || custody_parents == "Otro")?true:false},
				{'data':adopted_son,'item':'adopted_son','type':'radio', 'obligatory':true},
				{'data':reason_adopted_son,'item':'adopted_son','type':'text', 'obligatory':((adopted_son == "Si")?true:false)},
				{'data':father_last_name,'item':'father_last_name','type':'text', 'obligatory':validDataFather},
				{'data':father_names,'item':'father_names','type':'text', 'obligatory':validDataFather},
				{'data':father_email,'item':'father_email','type':'text', 'obligatory':validDataFather},
				{'data':father_mobile,'item':'father_mobile','type':'number', 'obligatory':validDataFather},
				{'data':indicativoFather,'item':'father_mobile','type':'number', 'obligatory':validDataFather},
				{'data':father_phone_home,'item':'father_phone_home','type':'text', 'obligatory':validDataFather},
				{'data':father_nuv,'item':'father_selectAddrHome','type':'text', 'obligatory':validDataFather},
				{'data':father_pnu,'item':'father_selectAddrHome','type':'text', 'obligatory':validDataFather},
				{'data':father_snu,'item':'father_selectAddrHome','type':'text', 'obligatory':validDataFather},
				{'data':father_iad,'item':'father_selectAddrHome','type':'text', 'obligatory':false},
				{'data':father_date_nac,'item':'father_date_nac','type':'date', 'obligatory':validDataFather},
				{'data':father_date_exp_doc,'item':'father_date_exp_doc','type':'date', 'obligatory':validDataFather},
				{'data':father_number_doc,'item':'father_number_doc','type':'text', 'obligatory':validDataFather},
				{'data':father_company,'item':'father_company','type':'text', 'obligatory':validDataFather},
				{'data':father_position,'item':'father_position','type':'text', 'obligatory':validDataFather},
				{'data':father_occupation,'item':'father_occupation','type':'text', 'obligatory':validDataFather},
				{'data':father_nuv_job,'item':'father_selectAddr_job','type':'text', 'obligatory':validDataFather},
				{'data':father_pnu_job,'item':'father_selectAddr_job','type':'text', 'obligatory':validDataFather},
				{'data':father_snu_job,'item':'father_selectAddr_job','type':'text', 'obligatory':validDataFather},
				{'data':father_iad_job,'item':'father_selectAddr_job','type':'text', 'obligatory':false},
				{'data':father_phone_job,'item':'father_phone_job','type':'text', 'obligatory':validDataFather},
				{'data':father_ext_job,'item':'father_phone_job','type':'text', 'obligatory':false},
				{'data':father_service_time,'item':'father_service_time','type':'text', 'obligatory':validDataFather},
				{'data':father_selectCountryNac,'item':'father_selectCountryNac','type':'select', 'obligatory':validDataFather},
				{'data':father_selectCityNac,'item':'father_selectCityNac','type':'select', 'obligatory':validDataFather},
				{'data':father_selectAddrHome,'item':'father_selectAddrHome','type':'select', 'obligatory':validDataFather},
				{'data':father_selectDeptoHome,'item':'father_selectDeptoHome','type':'select', 'obligatory':validDataFather},
				{'data':father_selectCityHome,'item':'father_selectCityHome','type':'select', 'obligatory':validDataFather},
				{'data':father_selectTypeDoc,'item':'father_selectTypeDoc','type':'select', 'obligatory':validDataFather},
				{'data':father_selectDeptoExp,'item':'father_selectDeptoExp','type':'select', 'obligatory':validDataFather},
				{'data':father_selectCityExp,'item':'father_selectCityExp','type':'select', 'obligatory':validDataFather},
				{'data':father_selectAddr_job,'item':'father_selectAddr_job','type':'select', 'obligatory':validDataFather},
				{'data':mother_last_name,'item':'mother_last_name','type':'text', 'obligatory':validDataMother},
				{'data':mother_names,'item':'mother_names','type':'text', 'obligatory':validDataMother},
				{'data':mother_email,'item':'mother_email','type':'text', 'obligatory':validDataMother},
				{'data':mother_mobile,'item':'mother_mobile','type':'number', 'obligatory':validDataMother},
				{'data':indicativoMother,'item':'mother_mobile','type':'number', 'obligatory':validDataMother},
				{'data':mother_phone_home,'item':'mother_phone_home','type':'text', 'obligatory':validDataMother},
				{'data':mother_nuv,'item':'mother_selectAddrHome','type':'text', 'obligatory':validDataMother},
				{'data':mother_pnu,'item':'mother_selectAddrHome','type':'text', 'obligatory':validDataMother},
				{'data':mother_snu,'item':'mother_selectAddrHome','type':'text', 'obligatory':validDataMother},
				{'data':mother_iad,'item':'mother_selectAddrHome','type':'text', 'obligatory':false},
				{'data':mother_date_nac,'item':'mother_date_nac','type':'date', 'obligatory':validDataMother},
				{'data':mother_date_exp_doc,'item':'mother_date_exp_doc','type':'date', 'obligatory':validDataMother},
				{'data':mother_number_doc,'item':'mother_number_doc','type':'text', 'obligatory':validDataMother},
				{'data':mother_company,'item':'mother_company','type':'text', 'obligatory':validDataMother},
				{'data':mother_position,'item':'mother_position','type':'text', 'obligatory':validDataMother},
				{'data':mother_occupation,'item':'mother_occupation','type':'text', 'obligatory':validDataMother},
				{'data':mother_nuv_job,'item':'mother_selectAddr_job','type':'text', 'obligatory':validDataMother},
				{'data':mother_pnu_job,'item':'mother_selectAddr_job','type':'text', 'obligatory':validDataMother},
				{'data':mother_snu_job,'item':'mother_selectAddr_job','type':'text', 'obligatory':validDataMother},
				{'data':mother_iad_job,'item':'mother_selectAddr_job','type':'text', 'obligatory':false},
				{'data':mother_phone_job,'item':'mother_phone_job','type':'text', 'obligatory':validDataMother},
				{'data':mother_ext_job,'item':'mother_phone_job','type':'text', 'obligatory':false},
				{'data':mother_service_time,'item':'mother_service_time','type':'text', 'obligatory':validDataMother},
				{'data':mother_selectCountryNac,'item':'mother_selectCountryNac','type':'select', 'obligatory':validDataMother},
				{'data':mother_selectCityNac,'item':'mother_selectCityNac','type':'select', 'obligatory':validDataMother},
				{'data':mother_selectAddrHome,'item':'mother_selectAddrHome','type':'select', 'obligatory':validDataMother},
				{'data':mother_selectDeptoHome,'item':'mother_selectDeptoHome','type':'select', 'obligatory':validDataMother},
				{'data':mother_selectCityHome,'item':'mother_selectCityHome','type':'select', 'obligatory':validDataMother},
				{'data':mother_selectTypeDoc,'item':'mother_selectTypeDoc','type':'select', 'obligatory':validDataMother},
				{'data':mother_selectDeptoExp,'item':'mother_selectDeptoExp','type':'select', 'obligatory':validDataMother},
				{'data':mother_selectCityExp,'item':'mother_selectCityExp','type':'select', 'obligatory':validDataMother},
				{'data':mother_selectAddr_job,'item':'mother_selectAddr_job','type':'select', 'obligatory':validDataMother}]);
	var validSave = true;
	if (valid["validate"]) {
		//console.log("Validado");
		indicativoFather = "+"+indicativoFather;
		indicativoMother = "+"+indicativoMother;
		let updCivilStatus, updFather, updMother, updAdoptive, updCustody;
		updCivilStatus = updateCivilStatusData(selectCivilStatus,custody_parent, custody, custody_cedula, custody_cel);
		updFather = updateFatherData(father_last_name,father_names,father_email,father_mobile,father_phone_home,father_nuv,father_pnu,father_snu,father_iad,father_date_nac,father_selectCountryNac,father_selectCityNac,father_date_exp_doc,father_number_doc,father_company,father_position,father_occupation,father_nuv_job,father_pnu_job,father_snu_job,father_iad_job,father_phone_job,father_ext_job,father_service_time,father_selectAddrHome,father_selectDeptoHome,father_selectCityHome,father_selectTypeDoc,father_selectDeptoExp,father_selectCityExp,father_selectAddr_job,indicativoFather);
		updMother = updateMotherData(mother_last_name,mother_names,mother_email,mother_mobile,mother_phone_home,mother_nuv,mother_pnu,mother_snu,mother_iad,mother_date_nac,mother_selectCountryNac,mother_selectCityNac,mother_date_exp_doc,mother_number_doc,mother_company,mother_position,mother_occupation,mother_nuv_job,mother_pnu_job,mother_snu_job,mother_iad_job,mother_phone_job,mother_ext_job,mother_service_time,mother_selectAddrHome,mother_selectDeptoHome,mother_selectCityHome,mother_selectTypeDoc,mother_selectDeptoExp,mother_selectCityExp,mother_selectAddr_job,indicativoMother);
		updAdoptive = updateAdoptiveData(adopted_son,reason_adopted_son);
		updCustody = updateCustody(peatona_person_m,peatona_person_p);
		$("#saveData").html("Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
		$("#saveData").attr('disabled', true);
		var status = studentNew[0]['response'][0]['Estado'];
		var updateStateStudenNew = (type_user == 7 && status < 2  )?updateStateStudenNewData(3):"";
		$.when(updCivilStatus, updFather, updMother,updAdoptive, updCustody,updateStateStudenNew).done(function(respUpdCivil,respUpdFather,respUpdMother,respUpdAdoptive, resUpdCustody,updateStateStudenNew){
			$("#saveData").html('Guardar <i class="fa fa-floppy-o" aria-hidden="true"></i>');
			$("#saveData").removeAttr('disabled');
			$(".labelCheck").remove();
			$(".labelDiv").each(function() {
				$(this).removeClass('labelInvalid');
				$(this).addClass('labelValid');
				if ($(this).hasClass("father_selectDeptoExp") || $(this).hasClass("father_selectCityExp")) {
					$("#label_father_selectExp").removeClass("animated infinite pulse");
					$("#label_father_selectExp").append('  <span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>');
				}
				else if ($(this).hasClass("mother_selectDeptoExp") || $(this).hasClass("mother_selectCityExp")) {
					$("#label_mother_selectExp").removeClass("animated infinite pulse");
					$("#label_mother_selectExp").append('  <span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>');
				}
				else {
					$(this).append('  <span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>');
					$(this).removeClass("animated infinite pulse");
					$("#label_selectExp").removeClass("animated infinite pulse");
				}
			});
		}).fail(function(response){
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
			if (label == "father_selectDeptoExp" || label == "father_selectCityExp") {
				$("#label_father_selectExp").append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
				$("#label_father_selectExp").addClass("animated infinite pulse");
				$("#label_father_selectExp").addClass('labelInvalid');
				$("#label_father_selectExp").focus();
			}
			else if (label == "mother_selectDeptoExp" || label == "mother_selectCityExp") {
				$("#label_mother_selectExp").append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
				$("#label_mother_selectExp").addClass("animated infinite pulse");
				$("#label_mother_selectExp").addClass('labelInvalid');
				$("#label_mother_selectExp").focus();
			}
			/* else if(label == "doc_custodia") {
				$("#label_custodia").append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
				$("#label_custodia").addClass('labelInvalid');
				$("#label_custodia").focus();
			} */
			else {
				$("#label_"+label).addClass('labelInvalid');
				$("#label_"+label).append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
				$("#label_"+label).addClass("animated infinite pulse");
			}
			$("#"+label).focus();
			$("."+label).focus();
		});
	}
	return validSave;
}

function submitInfoAdditional(grade,type_user){

	/* Captura de Datos Service*/
	//console.log(grade);
	var opt_half_nines = (grade >= 8)?false:true;
	var half_nines = (grade >= 8)?"--":$(".service_1").val();
	var launch = $(".service_2").val();
	var transport = $(".service_3").val();
	var poliza_seguro = $(".poliza_seguro.active").data('val');
	var accident_insurance = (poliza_seguro == "No")?0:1;
	var auth_photo = $(".auth_photo.active").data('val');
	/* Captura de Datos del Acudiente */
	var tutor_last_name = $("#tutor_last_name").val();
	var tutor_names = $("#tutor_names").val();
	var tutor_email = $("#tutor_email").val();
	var tutor_mobile = $("#tutor_mobile").val();
	var tutor_phone_home = $("#tutor_phone_home").val();
	var tutor_nuv = $("#tutor_nuv").val();
	var tutor_pnu = $("#tutor_pnu").val();
	var tutor_snu = $("#tutor_snu").val();
	var tutor_iad = $("#tutor_iad").val();
	var tutor_number_doc = $("#tutor_number_doc").val();
	var tutor_relationship = $("#tutor_relationship").val();
	var tutor_selectAddrHome = $(".tutor_selectAddrHome").val();
	var tutor_selectTypeDoc = $(".tutor_selectTypeDoc").val();
	var tutor_selectDeptoExp = $(".tutor_selectDeptoExp").val();
	var tutor_selectCityExp = $(".tutor_selectCityExp").val();
	/* Captura de Datos en caso De Emergencia */
	var emergency_last_name = $("#emergency_last_name").val();
	var emergency_names = $("#emergency_names").val();
	var emergency_email = $("#emergency_email").val();
	var emergency_mobile = $("#emergency_mobile").val();
	var emergency_phone_home = $("#emergency_phone_home").val();
	var emergency_nuv = $("#emergency_nuv").val();
	var emergency_pnu = $("#emergency_pnu").val();
	var emergency_snu = $("#emergency_snu").val();
	var emergency_iad = $("#emergency_iad").val();
	var emergency_number_doc = $("#emergency_number_doc").val();
	var emergency_relationship = $("#emergency_relationship").val();
	var emergency_selectAddrHome = $(".emergency_selectAddrHome").val();
	var emergency_selectTypeDoc = $(".emergency_selectTypeDoc").val();
	var emergency_selectDeptoExp = $(".emergency_selectDeptoExp").val();
	var emergency_selectCityExp = $(".emergency_selectCityExp").val();
	/* Captura de Datos en caso De Emergencia Adicional */
	var emergency_add_last_name = $("#emergency_add_last_name").val();
	var emergency_add_names = $("#emergency_add_names").val();
	var emergency_add_email = $("#emergency_add_email").val();
	var emergency_add_mobile = $("#emergency_add_mobile").val();
	var emergency_add_phone_home = $("#emergency_add_phone_home").val();
	var emergency_add_nuv = $("#emergency_add_nuv").val();
	var emergency_add_pnu = $("#emergency_add_pnu").val();
	var emergency_add_snu = $("#emergency_add_snu").val();
	var emergency_add_iad = $("#emergency_add_iad").val();
	var emergency_add_number_doc = $("#emergency_add_number_doc").val();
	var emergency_add_relationship = $("#emergency_add_relationship").val();
	var emergency_add_selectAddrHome = $(".emergency_add_selectAddrHome").val();
	var emergency_add_selectTypeDoc = $(".emergency_add_selectTypeDoc").val();
	var emergency_add_selectDeptoExp = $(".emergency_add_selectDeptoExp").val();
	var emergency_add_selectCityExp = $(".emergency_add_selectCityExp").val();
	var type_emerg_add = $(".add_emerg.active").data('val');
	var emerg_add = (type_emerg_add == "Si")?true:false;
	var valid = validFormActData([{'data':half_nines,'item':'service_1','type':'select', 'obligatory':opt_half_nines},
				{'data':launch,'item':'service_2','type':'select', 'obligatory':true},
				{'data':transport,'item':'service_3','type':'select', 'obligatory':true},
				{'data':accident_insurance,'item':'service_4','type':'select', 'obligatory':true},
				{'data':auth_photo,'item':'auth_photo','type':'radio', 'obligatory':true},
				{'data':tutor_last_name,'item':'tutor_last_name','type':'text', 'obligatory':true},
				{'data':tutor_names,'item':'tutor_names','type':'text', 'obligatory':true},
				{'data':tutor_email,'item':'tutor_email','type':'text', 'obligatory':true},
				{'data':tutor_mobile,'item':'tutor_mobile','type':'text', 'obligatory':true},
				{'data':tutor_phone_home,'item':'tutor_phone_home','type':'text', 'obligatory':true},
				{'data':tutor_nuv,'item':'tutor_selectAddrHome','type':'text', 'obligatory':true},
				{'data':tutor_pnu,'item':'tutor_selectAddrHome','type':'text', 'obligatory':true},
				{'data':tutor_snu,'item':'tutor_selectAddrHome','type':'text', 'obligatory':true},
				{'data':tutor_iad,'item':'tutor_selectAddrHome','type':'text', 'obligatory':false},
				{'data':tutor_number_doc,'item':'tutor_number_doc','type':'text', 'obligatory':true},
				{'data':tutor_relationship,'item':'tutor_relationship','type':'text', 'obligatory':true},
				{'data':tutor_selectAddrHome,'item':'tutor_selectAddrHome','type':'select', 'obligatory':true},
				{'data':tutor_selectTypeDoc,'item':'tutor_selectTypeDoc','type':'select', 'obligatory':true},
				{'data':tutor_selectDeptoExp,'item':'tutor_selectDeptoExp','type':'select', 'obligatory':true},
				{'data':tutor_selectCityExp,'item':'tutor_selectCityExp','type':'select', 'obligatory':true},
				{'data':emergency_last_name,'item':'emergency_last_name','type':'text', 'obligatory':true},
				{'data':emergency_names,'item':'emergency_names','type':'text', 'obligatory':true},
				{'data':emergency_email,'item':'emergency_email','type':'text', 'obligatory':true},
				{'data':emergency_mobile,'item':'emergency_mobile','type':'text', 'obligatory':true},
				{'data':emergency_phone_home,'item':'emergency_phone_home','type':'text', 'obligatory':false},
				{'data':emergency_nuv,'item':'emergency_selectAddrHome','type':'text', 'obligatory':true},
				{'data':emergency_pnu,'item':'emergency_selectAddrHome','type':'text', 'obligatory':true},
				{'data':emergency_snu,'item':'emergency_selectAddrHome','type':'text', 'obligatory':true},
				{'data':emergency_iad,'item':'emergency_selectAddrHome','type':'text', 'obligatory':false},
				{'data':emergency_number_doc,'item':'emergency_number_doc','type':'text', 'obligatory':true},
				{'data':emergency_relationship,'item':'emergency_relationship','type':'text', 'obligatory':true},
				{'data':emergency_selectAddrHome,'item':'emergency_selectAddrHome','type':'select', 'obligatory':true},
				{'data':emergency_selectTypeDoc,'item':'emergency_selectTypeDoc','type':'select', 'obligatory':true},
				{'data':emergency_selectDeptoExp,'item':'emergency_selectDeptoExp','type':'select', 'obligatory':true},
				{'data':emergency_selectCityExp,'item':'emergency_selectCityExp','type':'select', 'obligatory':true},
				{'data':emergency_add_last_name,'item':'emergency_add_last_name','type':'text', 'obligatory':emerg_add},
				{'data':emergency_add_names,'item':'emergency_add_names','type':'text', 'obligatory':emerg_add},
				{'data':emergency_add_email,'item':'emergency_add_email','type':'text', 'obligatory':emerg_add},
				{'data':emergency_add_mobile,'item':'emergency_add_mobile','type':'text', 'obligatory':emerg_add},
				{'data':emergency_add_phone_home,'item':'emergency_add_phone_home','type':'text', 'obligatory':emerg_add},
				{'data':emergency_add_nuv,'item':'emergency_add_selectAddrHome','type':'text', 'obligatory':emerg_add},
				{'data':emergency_add_pnu,'item':'emergency_add_selectAddrHome','type':'text', 'obligatory':emerg_add},
				{'data':emergency_add_snu,'item':'emergency_add_selectAddrHome','type':'text', 'obligatory':emerg_add},
				{'data':emergency_add_iad,'item':'emergency_add_selectAddrHome','type':'text', 'obligatory':false},
				{'data':emergency_add_number_doc,'item':'emergency_add_number_doc','type':'text', 'obligatory':emerg_add},
				{'data':emergency_add_relationship,'item':'emergency_add_relationship','type':'text', 'obligatory':emerg_add},
				{'data':emergency_add_selectAddrHome,'item':'emergency_add_selectAddrHome','type':'select', 'obligatory':emerg_add},
				{'data':emergency_add_selectTypeDoc,'item':'emergency_add_selectTypeDoc','type':'select', 'obligatory':emerg_add},
				{'data':emergency_add_selectDeptoExp,'item':'emergency_add_selectDeptoExp','type':'select', 'obligatory':emerg_add},
				{'data':emergency_add_selectCityExp,'item':'emergency_add_selectCityExp','type':'select', 'obligatory':emerg_add}]);
	var validSave = true;
	if (valid["validate"]) {
		console.log(auth_photo);
		let updServices, updPhoto, updTutor, updEmergency, updEmergencyAdd,ServiceMotive;
		updServices = updateServicesData(half_nines,launch,transport,accident_insurance);
		updPhoto = updateAuthPhotoData(auth_photo);
		updTutor = updateTutorData(tutor_last_name,tutor_names,tutor_email,tutor_mobile,tutor_phone_home,tutor_nuv,tutor_pnu,tutor_snu,tutor_iad,tutor_number_doc,tutor_relationship,tutor_selectAddrHome,tutor_selectTypeDoc,tutor_selectDeptoExp,tutor_selectCityExp);
		updEmergency = updateEmergencyData(emergency_last_name,emergency_names,emergency_email,emergency_mobile,emergency_phone_home,emergency_nuv,emergency_pnu,emergency_snu,emergency_iad,emergency_number_doc,emergency_relationship,emergency_selectAddrHome,emergency_selectTypeDoc,emergency_selectDeptoExp,emergency_selectCityExp);
		updEmergencyAdd = updateEmergencyAddData(emergency_add_last_name,emergency_add_names,emergency_add_email,emergency_add_mobile,emergency_add_phone_home,emergency_add_nuv,emergency_add_pnu,emergency_add_snu,emergency_add_iad,emergency_add_number_doc,emergency_add_relationship,emergency_add_selectAddrHome,emergency_add_selectTypeDoc,emergency_add_selectDeptoExp,emergency_add_selectCityExp,type_emerg_add);
		var reason_poliza_seguro = $("#reason_poliza_seguro").val();
		ServiceMotive = uppServiceMotive(half_nines,launch,transport,0,0,0,"","","",reason_poliza_seguro,accident_insurance);
		$("#saveData").html("Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
		$("#saveData").attr('disabled', true);
		$.when(updServices,updPhoto,updTutor,updEmergency,updEmergencyAdd).done(function(respUpdServices,respUpdPhoto,respUpdTutot,respUpdEmergency,respUpdEmergencyAdd){
			$("#saveData").html('Guardar <i class="fa fa-floppy-o" aria-hidden="true"></i>');
			$("#saveData").removeAttr('disabled');
			$(".labelCheck").remove();
			$(".labelDiv").each(function() {
				$(this).removeClass('labelInvalid');
				$(this).addClass('labelValid');
				if ($(this).hasClass("tutor_selectDeptoExp") || $(this).hasClass("tutor_selectCityExp")) {
					$("#label_tutor_selectExp").removeClass("animated infinite pulse");
					$("#label_tutor_selectExp").append('  <span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>');
				}
				else if ($(this).hasClass("emergency_selectDeptoExp") || $(this).hasClass("emergency_selectCityExp")) {
					$("#label_emergency_selectExp").removeClass("animated infinite pulse");
					$("#label_emergency_selectExp").append('  <span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>');
				}
				else if ($(this).hasClass("emergency_add_selectDeptoExp") || $(this).hasClass("emergency_add_selectCityExp")) {
					$("#label_emergency_add_selectExp").removeClass("animated infinite pulse");
					$("#label_emergency_add_selectExp").append('  <span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>');
				}
				else {
					$(this).append('  <span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>');
					$(this).removeClass("animated infinite pulse");
					$("#label_selectExp").removeClass("animated infinite pulse");
				}
			});

		}).fail(function(response){
			//console.log("fail Student");
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
			if (label == "tutor_selectDeptoExp" || label == "tutor_selectCityExp") {
				$("#label_tutor_selectExp").append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
				$("#label_tutor_selectExp").addClass("animated infinite pulse");
				$("#label_tutor_selectExp").addClass('labelInvalid');
				$("#label_tutor_selectExp").focus();
			}
			else if (label == "emergency_selectDeptoExp" || label == "emergency_selectCityExp") {
				$("#label_emergency_selectExp").append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
				$("#label_emergency_selectExp").addClass("animated infinite pulse");
				$("#label_emergency_selectExp").addClass('labelInvalid');
				$("#label_emergency_selectExp").focus();
			}
			else if (label == "emergency_add_selectDeptoExp" || label == "emergency_add_selectCityExp") {
				$("#label_emergency_add_selectExp").append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
				$("#label_emergency_add_selectExp").addClass("animated infinite pulse");
				$("#label_emergency_add_selectExp").addClass('labelInvalid');
				$("#label_emergency_add_selectExp").focus();
			}
			else {
				$("#label_"+label).addClass('labelInvalid');
				$("#label_"+label).append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
				$("#label_"+label).addClass("animated infinite pulse");
			}
			$("#"+label).focus();
			$("."+label).focus();
		});
	}
	return validSave;
}

function submitInfoFinancial(type_user,studentNew){
	var copy_debtor = '';
	/* Captura de Datos Inputs Deudor*/
	if(type_user == 7 && studentNew[0]['response'][0]['Deudor'] == 'PADRE'){
		copy_debtor = 1;
	}else if (type_user == 7 && studentNew[0]['response'][0]['Deudor'] == 'MADRE') {
		copy_debtor = 2;
	}else{
		copy_debtor = $("#copy_debtor").val();
	}
	var copy_codebtor = $("#copy_codebtor").val();
	/* Captura de Datos Inputs Deudor*/
	var debtor_last_name = $("#debtor_last_name").val();
	var debtor_names = $("#debtor_names").val();
	var debtor_email = $("#debtor_email").val();
	var debtor_mobile = $("#debtor_mobile").val();
	var debtor_phone_home = $("#debtor_phone_home").val();
	var debtor_nuv = $("#debtor_nuv").val();
	var debtor_pnu = $("#debtor_pnu").val();
	var debtor_snu = $("#debtor_snu").val();
	var debtor_iad = $("#debtor_iad").val();
	var debtor_number_doc = $("#debtor_number_doc").val();
	var debtor_company = $("#debtor_company").val();
	var debtor_position = $("#debtor_position").val();
	var debtor_occupation = $("#debtor_occupation").val();
	var debtor_nuv_job = $("#debtor_nuv_job").val();
	var debtor_pnu_job = $("#debtor_pnu_job").val();
	var debtor_snu_job = $("#debtor_snu_job").val();
	var debtor_iad_job = $("#debtor_iad_job").val();
	var debtor_phone_job = $("#debtor_phone_job").val();
	var debtor_ext_job = $("#debtor_ext_job").val();
	var debtor_service_time = $("#debtor_service_time").val();
	var debtor_selectAddrHome = $(".debtor_selectAddrHome").val();
	var debtor_selectDeptoHome = $(".debtor_selectDeptoHome").val();
	var debtor_selectCityHome = $(".debtor_selectCityHome").val();
	var debtor_selectTypeDoc = $(".debtor_selectTypeDoc").val();
	var debtor_selectDeptoExp = $(".debtor_selectDeptoExp").val();
	var debtor_selectCityExp = $(".debtor_selectCityExp").val();
	var debtor_selectAddr_job = $(".debtor_selectAddr_job").val();
	/* Cargue de Datos de la Codeudor */
	var codebtor_last_name = $("#codebtor_last_name").val();
	var codebtor_names = $("#codebtor_names").val();
	var codebtor_email = $("#codebtor_email").val();
	var codebtor_mobile = $("#codebtor_mobile").val();
	var codebtor_phone_home = $("#codebtor_phone_home").val();
	var codebtor_nuv = $("#codebtor_nuv").val();
	var codebtor_pnu = $("#codebtor_pnu").val();
	var codebtor_snu = $("#codebtor_snu").val();
	var codebtor_iad = $("#codebtor_iad").val();
	var codebtor_number_doc = $("#codebtor_number_doc").val();
	var codebtor_company = $("#codebtor_company").val();
	var codebtor_position = $("#codebtor_position").val();
	var codebtor_occupation = $("#codebtor_occupation").val();
	var codebtor_nuv_job = $("#codebtor_nuv_job").val();
	var codebtor_pnu_job = $("#codebtor_pnu_job").val();
	var codebtor_snu_job = $("#codebtor_snu_job").val();
	var codebtor_iad_job = $("#codebtor_iad_job").val();
	var codebtor_phone_job = $("#codebtor_phone_job").val();
	var codebtor_ext_job = $("#codebtor_ext_job").val();
	var codebtor_service_time = $("#codebtor_service_time").val();
	var codebtor_selectAddrHome = $(".codebtor_selectAddrHome").val();
	var codebtor_selectDeptoHome = $(".codebtor_selectDeptoHome").val();
	var codebtor_selectCityHome = $(".codebtor_selectCityHome").val();
	var codebtor_selectTypeDoc = $(".codebtor_selectTypeDoc").val();
	var codebtor_selectDeptoExp = $(".codebtor_selectDeptoExp").val();
	var codebtor_selectCityExp = $(".codebtor_selectCityExp").val();
	var codebtor_selectAddr_job = $(".codebtor_selectAddr_job").val();

	var debtor_indicativo = ($("#debtor_Emogicselec").val() == '--')?'':$("#debtor_Emogicselec").val(); 
	var codebtor_indicativo = ($("#codebtor_Emogicselec").val() == '--')?'':$("#codebtor_Emogicselec").val(); 


	var valid = validFormActData([{'data':copy_debtor,'item':'copy_debtor','type':'select', 'obligatory':true},
				{'data':copy_codebtor,'item':'copy_codebtor','type':'select', 'obligatory':true},
				{'data':debtor_last_name,'item':'debtor_last_name','type':'text', 'obligatory':true},
				{'data':debtor_names,'item':'debtor_names','type':'text', 'obligatory':true},
				{'data':debtor_email,'item':'debtor_email','type':'text', 'obligatory':true},
				{'data':debtor_mobile,'item':'debtor_mobile','type':'number', 'obligatory':true},
				{'data':debtor_indicativo,'item':'debtor_mobile','type':'text', 'obligatory':true},
				{'data':debtor_phone_home,'item':'debtor_phone_home','type':'text', 'obligatory':true},
				{'data':debtor_nuv,'item':'debtor_selectAddrHome','type':'text', 'obligatory':true},
				{'data':debtor_pnu,'item':'debtor_selectAddrHome','type':'text', 'obligatory':true},
				{'data':debtor_snu,'item':'debtor_selectAddrHome','type':'text', 'obligatory':true},
				{'data':debtor_iad,'item':'debtor_selectAddrHome','type':'text', 'obligatory':false},
				{'data':debtor_number_doc,'item':'debtor_number_doc','type':'text', 'obligatory':true},
				{'data':debtor_company,'item':'debtor_company','type':'text', 'obligatory':true},
				{'data':debtor_position,'item':'debtor_position','type':'text', 'obligatory':true},
				{'data':debtor_occupation,'item':'debtor_occupation','type':'text', 'obligatory':true},
				{'data':debtor_nuv_job,'item':'debtor_selectAddr_job','type':'text', 'obligatory':true},
				{'data':debtor_pnu_job,'item':'debtor_selectAddr_job','type':'text', 'obligatory':true},
				{'data':debtor_snu_job,'item':'debtor_selectAddr_job','type':'text', 'obligatory':true},
				{'data':debtor_iad_job,'item':'debtor_selectAddr_job','type':'text', 'obligatory':false},
				{'data':debtor_phone_job,'item':'debtor_phone_job','type':'text', 'obligatory':true},
				{'data':debtor_ext_job,'item':'debtor_phone_job','type':'text', 'obligatory':false},
				{'data':debtor_service_time,'item':'debtor_service_time','type':'text', 'obligatory':true},
				{'data':debtor_selectAddrHome,'item':'debtor_selectAddrHome','type':'select', 'obligatory':true},
				{'data':debtor_selectDeptoHome,'item':'debtor_selectDeptoHome','type':'select', 'obligatory':true},
				{'data':debtor_selectCityHome,'item':'debtor_selectCityHome','type':'select', 'obligatory':true},
				{'data':debtor_selectTypeDoc,'item':'debtor_selectTypeDoc','type':'select', 'obligatory':true},
				{'data':debtor_selectDeptoExp,'item':'debtor_selectDeptoExp','type':'select', 'obligatory':true},
				{'data':debtor_selectCityExp,'item':'debtor_selectCityExp','type':'select', 'obligatory':true},
				{'data':debtor_selectAddr_job,'item':'debtor_selectAddr_job','type':'select', 'obligatory':true},
				{'data':codebtor_last_name,'item':'codebtor_last_name','type':'text', 'obligatory':true},
				{'data':codebtor_names,'item':'codebtor_names','type':'text', 'obligatory':true},
				{'data':codebtor_email,'item':'codebtor_email','type':'text', 'obligatory':true},
				{'data':codebtor_mobile,'item':'codebtor_mobile','type':'number', 'obligatory':true},
				{'data':codebtor_indicativo,'item':'codebtor_mobile','type':'text', 'obligatory':true},
				{'data':codebtor_phone_home,'item':'codebtor_phone_home','type':'text', 'obligatory':true},
				{'data':codebtor_nuv,'item':'codebtor_selectAddrHome','type':'text', 'obligatory':true},
				{'data':codebtor_pnu,'item':'codebtor_selectAddrHome','type':'text', 'obligatory':true},
				{'data':codebtor_snu,'item':'codebtor_selectAddrHome','type':'text', 'obligatory':true},
				{'data':codebtor_iad,'item':'codebtor_selectAddrHome','type':'text', 'obligatory':false},
				{'data':codebtor_number_doc,'item':'codebtor_number_doc','type':'text', 'obligatory':true},
				{'data':codebtor_company,'item':'codebtor_company','type':'text', 'obligatory':true},
				{'data':codebtor_position,'item':'codebtor_position','type':'text', 'obligatory':true},
				{'data':codebtor_occupation,'item':'codebtor_occupation','type':'text', 'obligatory':true},
				{'data':codebtor_nuv_job,'item':'codebtor_selectAddr_job','type':'text', 'obligatory':true},
				{'data':codebtor_pnu_job,'item':'codebtor_selectAddr_job','type':'text', 'obligatory':true},
				{'data':codebtor_snu_job,'item':'codebtor_selectAddr_job','type':'text', 'obligatory':true},
				{'data':codebtor_iad_job,'item':'codebtor_selectAddr_job','type':'text', 'obligatory':false},
				{'data':codebtor_phone_job,'item':'codebtor_phone_job','type':'text', 'obligatory':true},
				{'data':codebtor_ext_job,'item':'codebtor_phone_job','type':'text', 'obligatory':false},
				{'data':codebtor_service_time,'item':'codebtor_service_time','type':'text', 'obligatory':true},
				{'data':codebtor_selectAddrHome,'item':'codebtor_selectAddrHome','type':'select', 'obligatory':true},
				{'data':codebtor_selectDeptoHome,'item':'codebtor_selectDeptoHome','type':'select', 'obligatory':true},
				{'data':codebtor_selectCityHome,'item':'codebtor_selectCityHome','type':'select', 'obligatory':true},
				{'data':codebtor_selectTypeDoc,'item':'codebtor_selectTypeDoc','type':'select', 'obligatory':true},
				{'data':codebtor_selectDeptoExp,'item':'codebtor_selectDeptoExp','type':'select', 'obligatory':true},
				{'data':codebtor_selectCityExp,'item':'codebtor_selectCityExp','type':'select', 'obligatory':true},
				{'data':codebtor_selectAddr_job,'item':'codebtor_selectAddr_job','type':'select', 'obligatory':true}]);
	var validSave = true;
	if (debtor_number_doc == codebtor_number_doc) {
		validSave = false;
		message = {"400":"El deudor y el codeudor deben ser diferentes", "service":"Error de Información"}
		toastr_message(400,message);
	}
	else if (valid["validate"]) {
		debtor_indicativo = "+"+debtor_indicativo;
		codebtor_indicativo = "+"+codebtor_indicativo;
		let updDebtor, updCodebtor;
		updDebtor = updateDebtorData(debtor_last_name,debtor_names,debtor_email,debtor_mobile,debtor_phone_home,debtor_nuv,debtor_pnu,debtor_snu,debtor_iad,debtor_number_doc,debtor_company,debtor_position,debtor_occupation,debtor_nuv_job,debtor_pnu_job,debtor_snu_job,debtor_iad_job,debtor_phone_job,debtor_ext_job,debtor_service_time,debtor_selectAddrHome,debtor_selectDeptoHome,debtor_selectCityHome,debtor_selectTypeDoc,debtor_selectDeptoExp,debtor_selectCityExp,debtor_selectAddr_job,copy_debtor,debtor_indicativo);
		updCodebtor = updateCodebtorData(codebtor_last_name,codebtor_names,codebtor_email,codebtor_mobile,codebtor_phone_home,codebtor_nuv,codebtor_pnu,codebtor_snu,codebtor_iad,codebtor_number_doc,codebtor_company,codebtor_position,codebtor_occupation,codebtor_nuv_job,codebtor_pnu_job,codebtor_snu_job,codebtor_iad_job,codebtor_phone_job,codebtor_ext_job,codebtor_service_time,codebtor_selectAddrHome,codebtor_selectDeptoHome,codebtor_selectCityHome,codebtor_selectTypeDoc,codebtor_selectDeptoExp,codebtor_selectCityExp,codebtor_selectAddr_job,copy_codebtor,codebtor_indicativo);
		var status = studentNew[0]['response'][0]['Estado'];
		var updateStateStudenNew = (type_user == 7 && status < 4 )?updateStateStudenNewData(4):"";
		$("#saveData").html("Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
		$("#saveData").attr('disabled', true);
		$.when(updDebtor,updCodebtor,updateStateStudenNew).done(function(respUpdDebtor,respUpdCodebtor,updateStateStudenNew){
			$("#saveData").html('Guardar <i class="fa fa-floppy-o" aria-hidden="true"></i>');
			$("#saveData").removeAttr('disabled');
			$(".labelCheck").remove();
			$(".labelDiv").each(function() {
				$(this).removeClass('labelInvalid');
				$(this).addClass('labelValid');
				if ($(this).hasClass("debtor_selectDeptoExp") || $(this).hasClass("debtor_selectCityExp")) {
					$("#label_debtor_selectExp").removeClass("animated infinite pulse");
					$("#label_debtor_selectExp").append('  <span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>');
				}
				else if ($(this).hasClass("codebtor_selectDeptoExp") || $(this).hasClass("codebtor_selectCityExp")) {
					$("#label_codebtor_selectExp").removeClass("animated infinite pulse");
					$("#label_codebtor_selectExp").append('  <span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>');
				}
				else {
					$(this).append('  <span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>');
					$(this).removeClass("animated infinite pulse");
					$("#label_selectExp").removeClass("animated infinite pulse");
				}
			});
		})
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
			if (label == "debtor_selectDeptoExp" || label == "debtor_selectCityExp") {
				$("#label_debtor_selectExp").append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
				$("#label_debtor_selectExp").addClass("animated infinite pulse");
				$("#label_debtor_selectExp").addClass('labelInvalid');
				$("#label_debtor_selectExp").focus();
			}
			else if (label == "codebtor_selectDeptoExp" || label == "codebtor_selectCityExp") {
				$("#label_codebtor_selectExp").append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
				$("#label_codebtor_selectExp").addClass("animated infinite pulse");
				$("#label_codebtor_selectExp").addClass('labelInvalid');
				$("#label_codebtor_selectExp").focus();
			}
			else {
				$("#label_"+label).addClass('labelInvalid');
				$("#label_"+label).append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
				$("#label_"+label).addClass("animated infinite pulse");
			}
			$("#"+label).focus();
			$("."+label).focus();
		});
	}
	return validSave;
}

function changeView(tab_sel,grade) {
	var tab_ant = $(".tabInfo.active").attr('id');
	$("#"+tab_ant).removeClass('active');
	$("#tab"+tab_ant).addClass('d-none');
	$("#"+tab_sel).addClass('active');
	$("#tab"+tab_sel).removeClass('d-none');
	if (tab_sel != tab_ant) {
		let student, health, brothers, brothers_school, civil_status, father, mother, tutor, emergency, emergency_add, services, routes_desc, debtor, codebtor, change_retention;
		let requirements,files

		student = getStudentData();
		studentNew = getStudentDataNew();
		health = getHealthData();
		civil_status = getCivilStatus();
		brothers = getBrotherData();
		brothers_school = getBrotherSchool();
		father = getFatherData();
		fatherNew = getFatherDataNew();
		mother = getMotherData();
		motherNew = getMotherDataNew();
		tutor = getTutorData();
		emergency = getEmergencyData();
		emergency_add = getEmergencyAddData();
		services = getServicesData();
		routes_desc = getRoutesExtraDesc();
		debtor = getDebtorData();
		codebtor = getCodebtorData();
		change_retention = getChangeRetention();
		requirements = getrequirementsData();
		files = getfilesData();
		emogic = getCountrys();
		console.log(health);
		if (tab_sel == "initial" || tab_sel == "summary") {
			$("#saveData").addClass('d-none');
			if (tab_sel == "initial") {
				$("#pgPrev").addClass('d-none');
				$("#pgNext").removeClass('d-none');
			}
			else if (tab_sel == "summary") {
				$("#pgNext").addClass('d-none');
				$("#pgPrev").removeClass('d-none');
			}
		}
		else {
			$("#saveData").removeClass('d-none');
			$("#pgPrev").removeClass('d-none');
			$("#pgNext").removeClass('d-none');
		}
		switch (tab_sel) {
			case "initial":
				viewInitial(type_user=false);
				break;
			case "documents":
				$("#tabdocuments").html("<div class='col-md-12 text-center'><i class='fa fa-spinner fa-spin' style='font-size:48pt; color: black;'></i></div>");

				$.when(requirements,files,student).done(function(respRequirements,respFiles,respstudent){
					viewDocuments(respRequirements[0]["response"],respFiles[0]["response"],grade,respstudent[0]["response"]);
				}).fail(function(response){
					//console.log("fail Student");
					console.log(response);
				});
				break;




			case "student":
				$("#tabstudent").html("<div class='col-md-12 text-center'><i class='fa fa-spinner fa-spin' style='font-size:48pt; color: black;'></i></div>");
				$.when(student,health,brothers,brothers_school,studentNew).done(function(respStudent,respHealth,respBrother,respBrotherSchool,studentNew){
					viewInfoStudent(respStudent[0]["response"][0],respHealth[0]["response"][0],respBrother[0],respBrotherSchool[0],respStudent[0]["response"][0]["Type_User"],studentNew[0]["response"][0]);
				}).fail(function(response){
					//console.log("fail Student");
					console.log(response);
				});
				break;
			case "parents":
				$("#tabparents").html("<div class='col-md-12 text-center'><i class='fa fa-spinner fa-spin' style='font-size:48pt; color: black;'></i></div>");
				$.when(civil_status,father,mother,student,fatherNew,motherNew,emogic).done(function(respCivilStatus,respFather,respMother,respStudent,fatherNew,motherNew,respemogic){
					viewInfoParents(respCivilStatus[0]["response"][0],respFather[0]["response"][0],respMother[0]["response"][0],respStudent[0]["response"][0],fatherNew[0]["response"][0],motherNew[0]["response"][0],respemogic[0]["response"]);
				}).fail(function(response){
					//console.log("fail Parents");
					console.log(response);
				});
				break;
			case "additional":
				$("#tabadditional").html("<div class='col-md-12 text-center'><i class='fa fa-spinner fa-spin' style='font-size:48pt; color: black;'></i></div>");
				$.when(tutor,emergency,emergency_add,services,routes_desc,student,brothers,brothers_school).done(function(respTutor,respEmergency,respEmergencyAdd,respServices,respRoutesDesc,respStudent,respBrother,respBrotherSchool){
					viewInfoAdditional(respTutor[0]["response"][0],respEmergency[0]["response"][0],respEmergencyAdd[0]["response"],respServices[0]["response"],respRoutesDesc[0]["response"],respStudent[0]["response"][0],grade,respBrother[0],respBrotherSchool[0]);
				}).fail(function(response){
					//console.log("fail Additional");
					console.log(response);
				});
				break;
			case "financial":
				$("#tabfinancial").html("<div class='col-md-12 text-center'><i class='fa fa-spinner fa-spin' style='font-size:48pt; color: black;'></i></div>");
				$.when(student,father,mother,debtor,codebtor,change_retention,studentNew,emogic).done(function(respStudent,respFather,respMother,respDebtor,respCodebtor,respRetention,studentNew,respemogic){
					viewInfoFinancial(respDebtor[0]["response"][0],respCodebtor[0]["response"][0],respFather[0]["response"][0],respMother[0]["response"][0],respRetention[0]["response"][0],respStudent[0]["response"][0]["Type_User"],studentNew[0]["response"][0],respemogic[0]["response"]);
				})
				break;
			case "summary":
				$("#tabsummary").html("<div class='col-md-12 text-center'><i class='fa fa-spinner fa-spin' style='font-size:48pt; color: black;'></i></div>");
				$.when(student,studentNew).done(function(respStudent,studentNew){
					viewSummary(respStudent[0]["response"][0],grade,studentNew[0]["response"][0]);
				}).fail(function(response){
				});
				break;
			default:
			//console.log(tab_sel)
			break;
		}
	}
	// body... 
}

function validateLogin(id_act) {
	login().done(function(response){
		//console.log(response["response"]["data"]);
		//console.log(id_act);
		if (response["code"] == 200) {
			if (response["response"]["data"] == false) {
				location.href = "../index.html";
			}
			else if (response["response"]["data"] == id_act) {
				//console.log("Entro aqui");
				return true;
				//changeView(tab_sel,grade);
			}
		}
	}).fail(function(response){
		console.log(response);
	}); 
}

function submitDiv(tab_current,grade,type_user,tab_next=false,studentNew) {
	switch (tab_current) {
		case "initial":
			/* No hay Guardar */
			changeView(tab_next,grade);
			break;
		case "documents":
			var submit = validDocuments();
			if (submit == true && tab_next != false) {
				changeView(tab_next,grade);
			}
			else {
				console.log("Falso Submit");
			} 
			break;
		case "student":
			var submit = submitInfoStudent(type_user,studentNew);
			if (submit == true && tab_next != false) {
				changeView(tab_next,grade);
			}
			else {
				console.log("Falso Submit");
			}
			break;
		case "parents":
			var submit = submitInfoParents(type_user,studentNew);
			if (submit == true && tab_next != false) {
				changeView(tab_next,grade);
			}
			else {
				console.log("Falso Submit");
			}
			break;
		case "additional":
			var submit = submitInfoAdditional(grade,type_user);
			if (submit == true && tab_next != false) {
				changeView(tab_next,grade);
			}
			else {
				console.log("Falso Submit");
			}
			break;
		case "financial":
			var submit = submitInfoFinancial(type_user,studentNew);
			if (submit == true && tab_next != false) {
				changeView(tab_next,grade);
			}
			else {
				console.log("Falso Submit");
			}
			break;
		case "summary":
			/* No hay Guardar */
			changeView(tab_next,grade);
			break;
		default:
		//console.log(tab_current)
		break;
	}
}

function viewUpdateData() {
	let user,stateActData;
	let student="";
	let type_user="";
	let studentNew="";
	student = getStudentData();
	studentNew = getStudentDataNew();
	user = userInfo();
	stateActData = getStateActData();
	viewPendiente = getPendienteServicio();
	$.when(user,stateActData,student,viewPendiente,studentNew).done(function(info,stateData,respStudent,viewPendiente,studentNew){
		var viewPendienteCancel = viewPendiente[0]["response"][0];
		console.log(viewPendienteCancel);
		type_user = respStudent[0]["response"][0]["Type_User"];
		if (viewPendienteCancel["bloqueo"] == "1") {
			$("#content").load("views/viewPendiente.html?v=4.1", function(){
				var tab_ant = $(".tabInfo.active").attr('id');
				var position = $.inArray(tab_ant, tabsModule);
			});
		}
		else if (stateData[0]["response"][0]["description"] == 0 || stateData[0]["response"][0] == false) {
			$("#content").load("views/viewUpdateData.html?v=4.1", function(){
				//FILLING INFORMATION CARD
				getApprovalData().done(function(respHabeas){
					console.log(respHabeas);
					if (respHabeas["response"][0] == false || respHabeas["response"][0]["description"] == "NO") {
						$("#titleModalLarge").text('Departamento de Admisiones');
						$("#bodyTagLarge").load("views/adminView/modalHabeasData.html?v=4.1", function() {
							$("#btnModalLarge").removeAttr('disabled');
							$(".close").addClass('d-none');
							$("#btnModalLarge").text('Acepto');
							$(".btnClose").text('No Acepto');
							$('#ModalLargeObs').modal({backdrop: 'static', keyboard: false});
							$("#ModalLargeObs").modal("show");

							$("#btnModalLarge").off();
							$("#btnModalLarge").click(function(e) {
								updateApprovalData("SI").done(function(respAccept){
									$("#ModalLargeObs").modal("hide");
									console.log(respAccept);
									$(".btnClose").text('Cancelar');
								}).fail(function(respAccept){
									console.log(respAccept);
								});
								e.preventDefault();
							});
							$(".btnClose").click(function(e) {
								updateApprovalData("NO").done(function(respAccept){
									$("#ModalLargeObs").modal("hide");
									$(".btnClose").text('Cancelar');
									location.href = "../index.html";
									console.log(respAccept);
								}).fail(function(respAccept){
									console.log(respAccept);
								});
								e.preventDefault();
							});
							console.log("Entro Modal");
						});
					}
				}).fail(function(respHabeas){
					console.log(respHabeas);
				});
			
			
				
				// Dani - comentario de primera alerta
				 if(type_user == 2){
				 	$("#titleModal").text("Información Importante");
				 	$("#bodyTag").children().remove();
				 	$("#bodyTag").append('<div class="row alert alert-info"><div class="col-md-12"><p class="text-justify">Les informamos que, a partir de esta actualización de datos, se generará un único contrato de Cooperación Educativa, el cual tendrá vigencia por el tiempo que su hijo(a) permanezca en el Colegio.  Les recomendamos revisar y actualizar la información en caso necesario. </p></div></div>');
				 	$("#btnModal").text("Aceptar");
				 	$("#ModalObs .close").addClass('d-none');
				 	$('#ModalObs').modal({backdrop: 'static', keyboard: false});
				 	$("#ModalObs").modal("show");
				 }
			     $("#btnModal").off();
			     $("#btnModal").click(function(e) {
			     	/* Act on the event */
			     	$("#ModalObs").modal("hide");
			     	e.preventDefault();
			     });

				var tabsModule = ["initial","documents","student","parents","additional","financial","summary"];
				var image = "data:image/jpeg;base64,"+info[0]["response"][0]['FOTO'];
				var grade = info[0]["response"][0]["GRADO"];
				$("#image").attr("src",image);
				$("#cardInfo").find("#name").text(info[0]["response"][0]["NOMBRE"]);
				//$("#cardInfo").find("#profile").text(info[0]["response"][0]["TIPO_USUARIO"]);
				if(info[0]["response"][0]["CURSO"]== null){
					$("#cardInfo").find("#dis").addClass('d-none');
				}
				else{
					$("#cardInfo").find("#course").text(info[0]["response"][0]["CURSO"]);
				}
				$(".tabInfo").click(function(e) {
					/*var tab_sel = $(this).attr('id');
					changeView(tab_sel,grade);*/
					e.preventDefault();
				});
				viewInitial(type_user);
				
				$("#saveData").click(function(e) {
					var tab_current = $(".tabInfo.active").attr('id');
					submitDiv(tab_current,grade,type_user,false,studentNew);
					e.preventDefault();
				});
				$("#pgPrev").click(function(event) {
					var tab_ant = $(".tabInfo.active").attr('id');
					var position = $.inArray(tab_ant, tabsModule);
					submitDiv(tab_ant,grade,type_user,tabsModule[position-1],studentNew);
					//changeView(tabsModule[position-1]);
					event.preventDefault();
				});
				$("#pgNext").click(function(event) {
					var tab_ant = $(".tabInfo.active").attr('id');
					var position = $.inArray(tab_ant, tabsModule);
					submitDiv(tab_ant,grade,type_user,tabsModule[position+1],studentNew);
					//changeView(tabsModule[position+1]);
					event.preventDefault();
				});
				function LoginAct() {
			        validateLogin(info[0]["response"][0]["ID"]);
			    }
			    setInterval(LoginAct, 600000);
			});
		}
		else if (stateData[0]["response"][0]["description"] == 1) {
			$("#content").load("views/viewCompleteData.html?v=4.1", function(){
				getSummaryData().done(function(response){
					response["response"]["keys"] = "Resumén de Actualización de Datos";
					$("#tableSummary").append(createTableInfo("summary",response["response"]));
					console.log(response);
				}).fail(function(response){
					console.log(response);
				});
			});
		}

	}).fail(function(response){
		console.log("fail...");
		console.log(response);
	});

}


function datoSeleccionadoRazonServer() {
    var datosSeleccionados = [];
	var otro_transporte = document.getElementById('checktransporte_5');
	var otro_alimento = document.getElementById('checkalmuerzo_5');
	var otro_alimentomn = document.getElementById('checkmediasnueves_5');
	var textRazonT = document.getElementById('textRazonT');
	var textRazonA = document.getElementById('textRazonA');
	var textRazonMN = document.getElementById('textRazonMN');
    // Obtener todos los checkboxes
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Recorrer los checkboxes y agregar los datos seleccionados a la variable
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            datosSeleccionados.push(checkbox.value);
        }
    });
	if( otro_transporte.checked) {
		textRazonT.classList.remove("d-none");
	} else {
		textRazonT.classList.add("d-none");
	}
	if( otro_alimento.checked) {
		textRazonA.classList.remove("d-none");
	} else {
		textRazonA.classList.add("d-none");
	}
	if( otro_alimentomn.checked) {
		textRazonMN.classList.remove("d-none");
	} else {
		textRazonMN.classList.add("d-none");
	}
    console.log(datosSeleccionados);
}


function evaluationCheck() {
	var formpregunta = document.getElementsByName('checkalmuerzo')

	formpregunta.forEach( element => {
		if(element.checked == true && element.value != "1"){
			
		}
	})
} 



function subir_archivoAntigui (){
	$("#btn_docrequisito").html("Cargando<i class='fa fa-floppy-o'></i>");
	var archivo = document.getElementById("doc_requisito");
	var file = archivo.files;
    var fileDoc = archivo.files[0];
	var wrapper =  $(".wrapper_doc")
    var wrapper_f =  $(".wrapper_files_get_documento")
    var progress_bar =  $(".progress_bar_doc")
	var toastMessage_ = {"service":"Notifición","200":"documento guardado", "400":"Por favor seleccione el archivo","500":"Archivo ya cargado"};
	if(file.length <1){
        toastr_message(400,toastMessage_);
        return
    }
	var info = new FormData();
    info.append('base','caa');
	info.append('param','updatefiles');
    info.append('file',fileDoc);

	progress_bar.removeClass('bg-success bg-danger').addClass('bg-info');
    progress_bar.css('width','0%');
    progress_bar.html('Preparando..');
    wrapper.fadeIn();

	let ajax = new XMLHttpRequest();
    ajax.upload.addEventListener("progress",function(e){
        let percentComplete = Math.floor((e.loaded/e.total)*100);
     
        progress_bar.css('width', percentComplete-1+'%');
        progress_bar.html(percentComplete-1+'% ');

    });

	ajax.responseType = 'json';

    ajax.addEventListener("load",function(e){
       
        let responseObj = ajax.response;
        if(responseObj.code==200){
            progress_bar.removeClass('bg-info').addClass('bg-success');
            progress_bar.html('!Cargado');

            var link_rut =responseObj.response[0].archivo.replace(/\/home\/cvuser\/public_html/gm,"").replace("E:/www/","");
            var name =  responseObj.response[0].nombre_archivo;
            var codi =  responseObj.response[0].id;
           
 
             wrapper_f.append('<div class ="d-flex bd-highlight mt-2" id="divdoc'+codi+'"> <label for="file" class="d-block">Ver o Eliminar Archivo</label> <a class=" flex-grow-1 bd-highlight  btn-light btn-sm "  " target="_blank"  href="../'+link_rut+'" >'+name+'</a> <a class="bd-highlight btn-danger btn-sm" id="btn_elim_doc" onclick="btn_elim('+codi+')">Eliminar</a></div>');
            

             setTimeout(()=>{
                 wrapper.fadeOut();
                 progress_bar.removeClass('bg-success bg-danger').addClass('bg-info');
                 progress_bar.css('width','0%');
                 if(responseObj.response.length !=0){
					$("#doc_requisito").prop('disabled', true);
					
					toastr_message(200,toastMessage_);
 
                 }else{
					$("#doc_requisito").prop('disabled', true);
   
                  
                 }
             }, 500);
        }
        console.log( responseObj.code)
       
    })
 
    ajax.open("POST","controller/cont.php")
    ajax.send(info)



/* 	let actionEntry;
	actionEntry = updatefiles(info);
	console.log(actionEntry);
	$("#btn_docrequisito").html("Cargando<i class='fa fa-spinner fa-spin fa-2x'></i>");
	$("#btn_docrequisito").prop('disabled', true)
	$.when(actionEntry).done(function(response) {
		console.log(response);
		$("#doc_requisito").prop('disabled', true);
		$("#btn_docrequisito").html("Guardado<i class='fa fa-floppy-o'></i>");



		toastr_message(200,toastMessage_);
	}).fail(function (response) {
		console.log(response);
	}); */
}

function btn_elim (id){
    $("#divdoc"+id).children().remove();
	  
	$("#btn_elim_doc").html("Eliminando<i class='fa fa-spinner fa-spin fa-2x'></i>");
	$("#btn_elim_doc").prop('disabled', true)
    delete_docu(id).done(function(response){
        console.log(response);

		$("#doc_requisito").prop('disabled', false);

        
        }).fail(function(response){
            console.log(response);
			$("#doc_requisito").prop('disabled', false);
        });
		document.getElementById("doc_requisito").value=''  

}


function subir_custodia (){
	var archivo = document.getElementById("doc_custodia");
	var file = archivo.files;
    var fileDoc = archivo.files[0];
	var toastMessage_ = {"service":"Notifición","200":"documento guardado", "400":"Por favor seleccione el archivo","500":"Archivo ya cargado"};
	if(file.length <1){
        toastr_message(400,toastMessage_);
        return
    }
	var info = new FormData();
    info.append('base','caa');
	info.append('param','updatefileCustodia');
    info.append('file',fileDoc);
	let actionEntry;
	actionEntry = updatefileCustodia(info);
	console.log(actionEntry);
	$("#btn_doc_custodia").html("Cargando<i class='fa fa-spinner fa-spin fa-2x'></i>");
	$("#btn_doc_custodia").prop('disabled', true)
	$.when(actionEntry).done(function(response) {
		console.log(response);
		$("#doc_custodia").prop('disabled', true);
		$("#btn_doc_custodia").html("Guardado<i class='fa fa-floppy-o'></i>");
		toastr_message(200,toastMessage_);
	}).fail(function (response) {
		console.log(response);
	});
}