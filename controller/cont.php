<?php 

	$root = realpath($_SERVER["DOCUMENT_ROOT"]);

	include("$root/funciones.php");

	include("$root/includes/sesion.inc");

	include("$root/controller/constants.php");

	include("queries.php");

	//require("Classes/PHPExcel.php");

	

	/*

	//solo para pruebas ambiente local

	$_SESSION['auth'] = 'yes';

	$_SESSION['id'] = 40058;

	$_SESSION['perfil'] = 53;

	//$_SESSION['perfil'] = 53;

	*/



	function isLoged($base_){

		try

		{

			global $db;

			if(isset($base_)){

				$base = $db[$base_];

				$return =array();

				if ($_SESSION['auth'] == "yes" || $_SESSION['id'] != NULL){

					$return['is_logged']=true;

					return $return; 

				}

				$return['is_logged']=false;

				return $return['is_logged'];

			}

			else{

				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);

			}

		}

		catch(Exception $e){

			return array("code"=>500,"error"=>$e, "is_logged"=>false);

		}

	}



	function get_access($base){

		try{

			if(isset($base)){				

				$access = getAccess($base);

			    return json_encode($access);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}


	function getPendiente_Servicio($base){

		try{

			if(isset($base)){				

				$access = getPendienteServicio($base);

			    return json_encode($access);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function get_state_act_data($base){

		try{

			if(isset($base)){				

				$stateData = getStateActData($base);

			    return json_encode($stateData);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function get_approval_data($base){

		try{

			if(isset($base)){				

				$habeasData = getApprovalData($base);

			    return json_encode($habeasData);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function get_countrys($base){

		try{

			if(isset($base)){				

				$countrys = getCountrys($base);

			    return json_encode($countrys);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function get_deptos($base){

		try{

			if(isset($base)){				

				$deptos = getDeptos($base);

			    return json_encode($deptos);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function get_citys($base,$id_country,$id_dpto){

		try{

			if(isset($base) && isset($id_country)){				

				$citys = getCitys($base,$id_country,$id_dpto);

			    return json_encode($citys);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function get_address($base){

		try{

			if(isset($base)){				

				$address = getAddress($base);

			    return json_encode($address);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}

	function get_email_entry_form($base,$consecutivo){
		try{
			if(isset($base)){				
				$access = getemailentryform($base,$consecutivo);
			    return json_encode($access);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function get_emailTransporte($base,$consecutivo){
		try{
			if(isset($base)){				
				$access = getemailTransporte($base,$consecutivo);
			    return json_encode($access);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function get_emailmedias($base,$consecutivo){
		try{
			if(isset($base)){				
				$access = getemailmedias($base,$consecutivo);
			    return json_encode($access);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}


	function get_typedocs($base){

		try{

			if(isset($base)){				

				$type_docs = getTypeDocs($base);

			    return json_encode($type_docs);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function get_type_civil($base){

		try{

			if(isset($base)){				

				$typeCivil = getTypeCivil($base);

			    return json_encode($typeCivil);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function get_civil_status($base){

		try{

			if(isset($base)){				

				$civilStatus = getCivilStatus($base);

			    return json_encode($civilStatus);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function get_nationality($base){

		try{

			if(isset($base)){				

				$nationality = getNationality($base);

			    return json_encode($nationality);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function get_student_data($base){

		try{

			if(isset($base)){				

				$studentInfo = getStudentData($base);

			    return json_encode($studentInfo);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}

		function get_student_data_New($base){

		try{

			if(isset($base)){				

				$studentInfo = getStudentDataNew($base);

			    return json_encode($studentInfo);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}

	function get_student_data_basic($base){

		try{

			if(isset($base)){				

				$studentInfoBasic= getStudentDataBasic($base);

			    return json_encode($studentInfoBasic);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function get_health_data($base){

		try{

			if(isset($base)){				

				$healthInfo = getHealthData($base);

			    return json_encode($healthInfo);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function get_brother_data($base){

		try{

			if(isset($base)){				

				$brotherInfo = getBrotherData($base);

			    return json_encode($brotherInfo);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function get_brother_school($base){

		try{

			if(isset($base)){				

				$brotherSchool = getBrotherSchool($base);

			    return json_encode($brotherSchool);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function get_father_data($base){

		try{

			if(isset($base)){				

				$fatherInfo = getFatherData($base);

			    return json_encode($fatherInfo);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}

	
	function get_father_data_New($base){
		try{
			if(isset($base)){				
				$fatherInfo = getFatherDataNew($base);
			    return json_encode($fatherInfo);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}



	function get_mother_data($base){

		try{

			if(isset($base)){				

				$motherInfo = getMotherData($base);

			    return json_encode($motherInfo);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}

	
	function get_mother_data_New($base){

		try{

			if(isset($base)){				

				$motherInfo = getMotherDataNew($base);

			    return json_encode($motherInfo);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function get_tutor_data($base){

		try{

			if(isset($base)){				

				$tutorInfo = getTutorData($base);

			    return json_encode($tutorInfo);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function get_emergency_data($base){

		try{

			if(isset($base)){				

				$emergencyInfo = getEmergencyData($base);

			    return json_encode($emergencyInfo);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function get_emergency_add_data($base){

		try{

			if(isset($base)){				

				$emergencyAddInfo = getEmergencyAddData($base);

			    return json_encode($emergencyAddInfo);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function get_services_data($base){

		try{

			if(isset($base)){				

				$servicesInfo = getServicesData($base);

			    return json_encode($servicesInfo);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function get_routes_desc($base){

		try{

			if(isset($base)){				

				$routesDesc = getRoutesExtraDesc($base);

			    return json_encode($routesDesc);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function get_routes_extra($base){

		try{

			if(isset($base)){				

				$routesExtra = getRoutesExtra($base);

			    return json_encode($routesExtra);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function get_bus_stop($base,$route){

		try{

			if(isset($base)){				

				$busStop = getBusStop($base,$route);

			    return json_encode($busStop);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function get_debtor_data($base){

		try{

			if(isset($base)){				

				$debtorInfo = getDebtorData($base);

			    return json_encode($debtorInfo);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function get_codebtor_data($base){

		try{

			if(isset($base)){				

				$codebtorInfo = getCodebtorData($base);

			    return json_encode($codebtorInfo);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function get_change_retention($base){

		try{

			if(isset($base)){				

				$changeRetention = getChangeRetention($base);

			    return json_encode($changeRetention);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}

	function getRequirementsData($base){

		try{

			if(isset($base)){				

				$changeRequerimts = get_Requirements_Data($base);

			    return json_encode($changeRequerimts);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}

	function getFilesData($base){

		try{

			if(isset($base)){				

				$changeFiles = get_Files_Data($base);

			    return json_encode($changeFiles);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function update_approval_data($base,$approve){

		try{

			if(isset($base)){				

				$updateAproveData = updateApprovalData($base,$approve);

			    return json_encode($updateAproveData);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function update_student_data($base,$date_nac,$number_doc,$number_visa,$date_visa_exp,$date_visa_venc,$nuv,$pnu,$snu,$iad,$neighborhood,$phone_home,$stratus,$gender,$selectCountryNac,$selectDeptoNac,$selectCityNac,$selectNacionality,$selectTypeDoc,$selectDeptoExp,$selectCityExp,$selectAddrHome,$selectDeptoHome,$selectCityHome,$email_stu,$phone_stu,$blood_type,$rh){

		try{

			if(isset($base)){				

				$updateStudent = updateStudentData($base,$date_nac,$number_doc,$number_visa,$date_visa_exp,$date_visa_venc,$nuv,$pnu,$snu,$iad,$neighborhood,$phone_home,$stratus,$gender,$selectCountryNac,$selectDeptoNac,$selectCityNac,$selectNacionality,$selectTypeDoc,$selectDeptoExp,$selectCityExp,$selectAddrHome,$selectDeptoHome,$selectCityHome,$email_stu,$phone_stu,$blood_type,$rh);

			    return json_encode($updateStudent);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function update_health_data($base,$blood_type,$rh,$eps,$ips,$prepaid_medicine,$scheme,$major_disease,$current_disease,$hospitalized,$disturbance,$allergy,$allergy_medication,$surgical_history,$musculoskeletal_injuries,$permanent_medication,$medical_condition,$convulsion,$convulsion_medication,$exploratory_valuation,$reason_major_disease,$reason_current_disease,$reason_hospitalized,$reason_disturbance,$reason_allergy,$reason_allergy_medication,$reason_surgical_history,$reason_musculoskeletal_injuries,$name_permanent_medication,$dose_permanent_medication,$which_medical_condition,$treatment_medical_condition,$reason_convulsion,$quantity_convulsion,$reason_convulsion_medication,$reason_exploratory_valuation,$vaccine_covid,$vaccine_vph,$allergy_alimento,$reason_allergy_alimento,$poliza_seguro,$reason_poliza_seguro,$psicriatia,$dose_Tratamiento_medication,$autorizaMedi,$Alergia){

		try{

			if(isset($base)){				

				$updateHealth = updateHealthData($base,$blood_type,$rh,$eps,$ips,$prepaid_medicine,$scheme,$major_disease,$current_disease,$hospitalized,$disturbance,$allergy,$allergy_medication,$surgical_history,$musculoskeletal_injuries,$permanent_medication,$medical_condition,$convulsion,$convulsion_medication,$exploratory_valuation,$reason_major_disease,$reason_current_disease,$reason_hospitalized,$reason_disturbance,$reason_allergy,$reason_allergy_medication,$reason_surgical_history,$reason_musculoskeletal_injuries,$name_permanent_medication,$dose_permanent_medication,$which_medical_condition,$treatment_medical_condition,$reason_convulsion,$quantity_convulsion,$reason_convulsion_medication,$reason_exploratory_valuation,$vaccine_covid,$vaccine_vph,$allergy_alimento,$reason_allergy_alimento,$poliza_seguro,$reason_poliza_seguro,$psicriatia,$dose_Tratamiento_medication,$autorizaMedi,$Alergia);

			    return json_encode($updateHealth);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function add_brother_data($base,$arrayBrother){

		try{

			if(isset($base)){				

				$addBrother = addBrotherData($base,$arrayBrother);

			    return json_encode($addBrother);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function update_brother_data($base,$id_brother){

		try{

			if(isset($base)){				

				$updateBrother = updateBrotherData($base,$id_brother);

			    return json_encode($updateBrother);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function update_civil_status_data($base,$selectCivilStatus,$custody_parent,$custody,$custody_cedula,$custody_cel){

		try{

			if(isset($base)){				

				$updateCivilStatus = updateCivilStatusData($base,$selectCivilStatus,$custody_parent,$custody,$custody_cedula,$custody_cel);

			    return json_encode($updateCivilStatus);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function update_father_data($base,$father_last_name,$father_names,$father_email,$father_mobile,$father_phone_home,$father_nuv,$father_pnu,$father_snu,$father_iad,$father_date_nac,$father_selectCountryNac,$father_selectCityNac,$father_date_exp_doc,$father_number_doc,$father_company,$father_position,$father_occupation,$father_nuv_job,$father_pnu_job,$father_snu_job,$father_iad_job,$father_phone_job,$father_ext_job,$father_service_time,$father_selectAddrHome,$father_selectDeptoHome,$father_selectCityHome,$father_selectTypeDoc,$father_selectDeptoExp,$father_selectCityExp,$father_selectAddr_job,$father_prefijo){

		try{

			if(isset($base)){				

				$updateFather = updateFatherData($base,$father_last_name,$father_names,$father_email,$father_mobile,$father_phone_home,$father_nuv,$father_pnu,$father_snu,$father_iad,$father_date_nac,$father_selectCountryNac,$father_selectCityNac,$father_date_exp_doc,$father_number_doc,$father_company,$father_position,$father_occupation,$father_nuv_job,$father_pnu_job,$father_snu_job,$father_iad_job,$father_phone_job,$father_ext_job,$father_service_time,$father_selectAddrHome,$father_selectDeptoHome,$father_selectCityHome,$father_selectTypeDoc,$father_selectDeptoExp,$father_selectCityExp,$father_selectAddr_job,$father_prefijo);

			    return json_encode($updateFather);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function update_mother_data($base,$mother_last_name,$mother_names,$mother_email,$mother_mobile,$mother_phone_home,$mother_nuv,$mother_pnu,$mother_snu,$mother_iad,$mother_date_nac,$mother_selectCountryNac,$mother_selectCityNac,$mother_date_exp_doc,$mother_number_doc,$mother_company,$mother_position,$mother_occupation,$mother_nuv_job,$mother_pnu_job,$mother_snu_job,$mother_iad_job,$mother_phone_job,$mother_ext_job,$mother_service_time,$mother_selectAddrHome,$mother_selectDeptoHome,$mother_selectCityHome,$mother_selectTypeDoc,$mother_selectDeptoExp,$mother_selectCityExp,$mother_selectAddr_job,$mother_prefijo){

		try{

			if(isset($base)){				

				$updateMother = updateMotherData($base,$mother_last_name,$mother_names,$mother_email,$mother_mobile,$mother_phone_home,$mother_nuv,$mother_pnu,$mother_snu,$mother_iad,$mother_date_nac,$mother_selectCountryNac,$mother_selectCityNac,$mother_date_exp_doc,$mother_number_doc,$mother_company,$mother_position,$mother_occupation,$mother_nuv_job,$mother_pnu_job,$mother_snu_job,$mother_iad_job,$mother_phone_job,$mother_ext_job,$mother_service_time,$mother_selectAddrHome,$mother_selectDeptoHome,$mother_selectCityHome,$mother_selectTypeDoc,$mother_selectDeptoExp,$mother_selectCityExp,$mother_selectAddr_job,$mother_prefijo);

			    return json_encode($updateMother);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function update_adoptive_data($base,$adopted_son,$reason_adopted_son){

		try{

			if(isset($base)){				

				$updateAdoptive = updateAdoptiveData($base,$adopted_son,$reason_adopted_son);

			    return json_encode($updateAdoptive);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function update_services_data($base,$half_nines,$launch,$transport,$accident_insurance){

		try{

			if(isset($base)){				

				$updateServices = updateServicesData($base,$half_nines,$launch,$transport,$accident_insurance);

			    return json_encode($updateServices);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function update_tutor_data($base,$tutor_last_name,$tutor_names,$tutor_email,$tutor_mobile,$tutor_phone_home,$tutor_nuv,$tutor_pnu,$tutor_snu,$tutor_iad,$tutor_number_doc,$tutor_relationship,$tutor_selectAddrHome,$tutor_selectTypeDoc,$tutor_selectDeptoExp,$tutor_selectCityExp){

		try{

			if(isset($base)){				

				$updateTutor = updateTutorData($base,$tutor_last_name,$tutor_names,$tutor_email,$tutor_mobile,$tutor_phone_home,$tutor_nuv,$tutor_pnu,$tutor_snu,$tutor_iad,$tutor_number_doc,$tutor_relationship,$tutor_selectAddrHome,$tutor_selectTypeDoc,$tutor_selectDeptoExp,$tutor_selectCityExp);

			    return json_encode($updateTutor);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function update_emergency_data($base,$emergency_last_name,$emergency_names,$emergency_email,$emergency_mobile,$emergency_phone_home,$emergency_nuv,$emergency_pnu,$emergency_snu,$emergency_iad,$emergency_number_doc,$emergency_relationship,$emergency_selectAddrHome,$emergency_selectTypeDoc,$emergency_selectDeptoExp,$emergency_selectCityExp){

		try{

			if(isset($base)){				

				$updateEmergency = updateEmergencyData($base,$emergency_last_name,$emergency_names,$emergency_email,$emergency_mobile,$emergency_phone_home,$emergency_nuv,$emergency_pnu,$emergency_snu,$emergency_iad,$emergency_number_doc,$emergency_relationship,$emergency_selectAddrHome,$emergency_selectTypeDoc,$emergency_selectDeptoExp,$emergency_selectCityExp);

			    return json_encode($updateEmergency);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function update_emergency_add_data($base,$emergency_add_last_name,$emergency_add_names,$emergency_add_email,$emergency_add_mobile,$emergency_add_phone_home,$emergency_add_nuv,$emergency_add_pnu,$emergency_add_snu,$emergency_add_iad,$emergency_add_number_doc,$emergency_add_relationship,$emergency_add_selectAddrHome,$emergency_add_selectTypeDoc,$emergency_add_selectDeptoExp,$emergency_add_selectCityExp,$type_emerg_add){

		try{

			if(isset($base)){				

				$updateEmergencyAdd = updateEmergencyAddData($base,$emergency_add_last_name,$emergency_add_names,$emergency_add_email,$emergency_add_mobile,$emergency_add_phone_home,$emergency_add_nuv,$emergency_add_pnu,$emergency_add_snu,$emergency_add_iad,$emergency_add_number_doc,$emergency_add_relationship,$emergency_add_selectAddrHome,$emergency_add_selectTypeDoc,$emergency_add_selectDeptoExp,$emergency_add_selectCityExp,$type_emerg_add);

			    return json_encode($updateEmergencyAdd);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function update_auth_photo_data($base,$auth_photo){

		try{

			if(isset($base)){				

				$updateAuthPhoto = updateAuthPhotoData($base,$auth_photo);

			    return json_encode($updateAuthPhoto);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function update_debtor_data($base,$debtor_last_name,$debtor_names,$debtor_email,$debtor_mobile,$debtor_phone_home,$debtor_nuv,$debtor_pnu,$debtor_snu,$debtor_iad,$debtor_number_doc,$debtor_company,$debtor_position,$debtor_occupation,$debtor_nuv_job,$debtor_pnu_job,$debtor_snu_job,$debtor_iad_job,$debtor_phone_job,$debtor_ext_job,$debtor_service_time,$debtor_selectAddrHome,$debtor_selectDeptoHome,$debtor_selectCityHome,$debtor_selectTypeDoc,$debtor_selectDeptoExp,$debtor_selectCityExp,$debtor_selectAddr_job,$copy_debtor,$debtor_indicativo){

		try{

			if(isset($base)){				

				$updateDebtor = updateDebtorData($base,$debtor_last_name,$debtor_names,$debtor_email,$debtor_mobile,$debtor_phone_home,$debtor_nuv,$debtor_pnu,$debtor_snu,$debtor_iad,$debtor_number_doc,$debtor_company,$debtor_position,$debtor_occupation,$debtor_nuv_job,$debtor_pnu_job,$debtor_snu_job,$debtor_iad_job,$debtor_phone_job,$debtor_ext_job,$debtor_service_time,$debtor_selectAddrHome,$debtor_selectDeptoHome,$debtor_selectCityHome,$debtor_selectTypeDoc,$debtor_selectDeptoExp,$debtor_selectCityExp,$debtor_selectAddr_job,$copy_debtor,$debtor_indicativo);

			    return json_encode($updateDebtor);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function update_codebtor_data($base,$codebtor_last_name,$codebtor_names,$codebtor_email,$codebtor_mobile,$codebtor_phone_home,$codebtor_nuv,$codebtor_pnu,$codebtor_snu,$codebtor_iad,$codebtor_number_doc,$codebtor_company,$codebtor_position,$codebtor_occupation,$codebtor_nuv_job,$codebtor_pnu_job,$codebtor_snu_job,$codebtor_iad_job,$codebtor_phone_job,$codebtor_ext_job,$codebtor_service_time,$codebtor_selectAddrHome,$codebtor_selectDeptoHome,$codebtor_selectCityHome,$codebtor_selectTypeDoc,$codebtor_selectDeptoExp,$codebtor_selectCityExp,$codebtor_selectAddr_job,$copy_codebtor,$codebtor_indicativo){

		try{

			if(isset($base)){				

				$updateCodebtor = updateCodebtorData($base,$codebtor_last_name,$codebtor_names,$codebtor_email,$codebtor_mobile,$codebtor_phone_home,$codebtor_nuv,$codebtor_pnu,$codebtor_snu,$codebtor_iad,$codebtor_number_doc,$codebtor_company,$codebtor_position,$codebtor_occupation,$codebtor_nuv_job,$codebtor_pnu_job,$codebtor_snu_job,$codebtor_iad_job,$codebtor_phone_job,$codebtor_ext_job,$codebtor_service_time,$codebtor_selectAddrHome,$codebtor_selectDeptoHome,$codebtor_selectCityHome,$codebtor_selectTypeDoc,$codebtor_selectDeptoExp,$codebtor_selectCityExp,$codebtor_selectAddr_job,$copy_codebtor,$codebtor_indicativo);

			    return json_encode($updateCodebtor);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function update_transport_data($base,$authPersonal,$routeExtra,$busStop,$authName,$authDoc,$authMobile,$authName_1,$authDoc_1,$authMobile_1,$authName_2,$authDoc_2,$authMobile_2,$bus_escool){

		try{

			if(isset($base)){				

				$updateTransport = updateTransportData($base,$authPersonal,$routeExtra,$busStop,$authName,$authDoc,$authMobile,$authName_1,$authDoc_1,$authMobile_1,$authName_2,$authDoc_2,$authMobile_2,$bus_escool);

			    return json_encode($updateTransport);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function update_pedestrian_data($base,$authPersonal,$typeTransport,$authName,$authDoc,$authMobile,$authName_1,$authDoc_1,$authMobile_1,$authName_2,$authDoc_2,$authMobile_2){

		try{

			if(isset($base)){				

				$updatePedestrian = updatePedestrianData($base,$authPersonal,$typeTransport,$authName,$authDoc,$authMobile,$authName_1,$authDoc_1,$authMobile_1,$authName_2,$authDoc_2,$authMobile_2);

			    return json_encode($updatePedestrian);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function get_summary_data($base){

		try{

			if(isset($base)){				

				$summaryData = getSummaryData($base);

			    return json_encode($summaryData);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}
	function update_Basic($base,$tel_student,$adrres,$celmother,$email_mother,$celular_father,$email_father){


		try{

			if(isset($base)){				

				$updBasic = updateBasic($base,$tel_student,$adrres,$celmother,$email_mother,$celular_father,$email_father); 

			    return json_encode($updBasic);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function update_special($base,$last_name,$name,$date_birth,$number_doc,$number_visa,$date_visa_exp,$date_visa_venc,$selectTypeDoc,$selectDeptoExp,$selectCityExp,$email){

		try{

			if(isset($base)){				

				$updSpecial = updateSpecial($base,$last_name,$name,$date_birth,$number_doc,$number_visa,$date_visa_exp,$date_visa_venc,$selectTypeDoc,$selectDeptoExp,$selectCityExp,$email);

			    return json_encode($updSpecial);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function update_end_process($base,$typeUser){

		try{

			if(isset($base)){				

				$endProcess = updateEndProcess($base,$typeUser);

			    return json_encode($endProcess);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}

	function get_link_doc($base){
		try{
			$id_encode = base64_encode($_SESSION['id']);
			$pag1 = base64_encode(urlencode('doc1.php'));
			$pag2 = base64_encode(urlencode('doc2.php'));
			$pag3 = base64_encode(urlencode('doc3.php'));
			$pag4 = base64_encode(urlencode('doc4.php'));
			$link = "../documentosMatricula/PDF/generator/documento.php?id=$id_encode&doc=$pag1&doc2=$pag2&doc3=$pag3&doc4=$pag4";
			return json_encode($link);
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}
	



	function get_Service_D($base){

		try{

			if(isset($base)){				

				$servicedate = serviceDate($base);

			    return json_encode($servicedate);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}

	function addDataservice($base,$question){

		try{

			if(isset($base)){				

				$servicedatedata = add_Dataservice($base,$question);

			    return json_encode($servicedatedata);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}

	function upload_documents($base,$fileAttached){

		try{

			if(isset($base) && isset($fileAttached)){				

				$chargeDocs = uploadDocuments($base,$fileAttached);

			    return json_encode($chargeDocs);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}

	function get_courses($base){

		try{

			if(isset($base)){				

				$courses = getCourses($base);

			    return json_encode($courses);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}

	function get_type_student($base){

		try{

			if(isset($base)){				

				$typeUser = getTypeStudent($base);

			    return json_encode($typeUser);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}

	function get_listed_docs($base,$course,$last_names,$names,$filter){

		try{

			if(isset($base)){			

				// print_r($_POST);	

				$listDocs = getListedDocs($base,$course,$last_names,$names,$filter);

			    return json_encode($listDocs);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}

	function get_info_contracts($base,$course,$last_names,$names,$filter){

		try{

			if(isset($base)){			

				// print_r($_POST);	

				$infoCont = getInfoContracts($base,$course,$last_names,$names,$filter);

			    return json_encode($infoCont);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function update_service($base,$id_student,$service,$status){

		try{

			if(isset($base)){			

				// print_r($_POST);	

				$updService = updateService($base,$id_student,$service,$status);

			    return json_encode($updService);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function update_other($base,$id_student,$service,$status){

		try{

			if(isset($base)){			

				// print_r($_POST);	

				$updOther = updateOther($base,$id_student,$service,$status);

			    return json_encode($updOther);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}



	function update_group_alternation($base,$id_student,$status){

		try{

			if(isset($base)){			

				// print_r($_POST);	

				$updGroup = updateGroupAlternation($base,$id_student,$status);

			    return json_encode($updGroup);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}

	function get_TipoRazon($base){
		try{
			if(isset($base)){				
				$tipoRazon = getTipoRazon($base);
			    return json_encode($tipoRazon);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function uppService_Motive($base,$half_nines,$launch,$transport,$datos_mediasnueves,$datos_alimento,$datos_transporte,$checkmediasnueves_6,$checkalmuerzo_6,$checktransporte_6,$reason_poliza_seguro,$accident_insurance){
		try{
			if(isset($base) && isset($half_nines) && isset($launch) && isset($transport) && isset($datos_mediasnueves) && isset($datos_alimento) && isset($datos_transporte) && isset($checkmediasnueves_6) && isset($checkalmuerzo_6) && isset($datos_transporte) && isset($reason_poliza_seguro)&& isset($accident_insurance)){				
				$tipoRazon = uppServiceMotive($base,$half_nines,$launch,$transport,$datos_mediasnueves,$datos_alimento,$datos_transporte,$checkmediasnueves_6,$checkalmuerzo_6,$checktransporte_6,$reason_poliza_seguro,$accident_insurance);
			    return json_encode($tipoRazon);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}


	
	function update_Custody($base,$peatona_person_m,$peatona_person_p){
		try{
			if(isset($base) && isset($peatona_person_m) && isset($peatona_person_p)){				
				$tipoRazon = updateCustody($base,$peatona_person_m,$peatona_person_p);
			    return json_encode($tipoRazon);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function get_updatefiles($base,$fileDoc){
		try{
			if(isset($base)){	

				$entryWork = get_update_files($base,$fileDoc);
			    return json_encode($entryWork);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function get_updatefileCustodia($base,$fileDoc){
		try{
			if(isset($base)){	

				$entryWork = get_update_fileCustodia($base,$fileDoc);
			    return json_encode($entryWork);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function update_Depto_BienestarData($base,$depto_bienestar){
		try{
			if(isset($base)){	

				$entryBienestar = updateDeptoBienestarData($base,$depto_bienestar);
			    return json_encode($entryBienestar);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function get_updatefilesDoc($base,$grado,$requisito,$name,$fileDoc){
		try{
			if(isset($base)){	

				$entryWork = get_update_files_Doc($base,$grado,$requisito,$name,$fileDoc);
			    return json_encode($entryWork);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function get_updatePoliza($base,$fileDoc){
		try{
			if(isset($base)){	

				$entryWork = get_update_Poliza($base,$fileDoc);
			    return json_encode($entryWork);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}
	

	function get_Electronic_Signature($base){
		try{
			if(isset($base)){
				$entryelectronic = get_firma_electronica($base);
			    return json_encode($entryelectronic);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}
	

	function uploadFile($file_){
		$root = str_replace("\\","/",realpath($_SERVER["DOCUMENT_ROOT"]));
	 	$file = eliminar_acentos($file_['file']['name']);
	    $file = str_replace(" ", "_", $file);
		$id = $_SESSION["id"];
		$dir_ = $root."/AdmissionsDocumentStudents/".$id."";
		
		if (!file_exists($dir_)) {
			mkdir($dir_, 0777, true);
		}
		$route_doc = $dir_."/".$file;

		
		$subirdoc = move_uploaded_file(eliminar_acentos($file_['file']['tmp_name']), $route_doc);
		sleep(10);
		if ($subirdoc) {
			return array("cod_valid"=>200,'Mensaje'=>'Se subio el archivo','url'=>$route_doc);
		}else{
			return array("cod_valid"=>400,'Mensaje'=>'error no se puede cargar el archivo'.$file,'url'=>$route_doc);
		}   
	}

	function uploadFileCustodia($file_){
		$root = str_replace("\\","/",realpath($_SERVER["DOCUMENT_ROOT"]));
	 	$file = eliminar_acentos($file_['file']['name']);
	    $file = str_replace(" ", "_", $file);
		$id = $_SESSION["id"];
		$dir_ = $root."/AdmissionsDocumentCustodia/".$id."";
		
		if (!file_exists($dir_)) {
			mkdir($dir_, 0777, true);
		}
		$route_doc = $dir_."/".$file;

		
		$subirdoc = move_uploaded_file(eliminar_acentos($file_['file']['tmp_name']), $route_doc);
		sleep(10);
		if ($subirdoc) {
			return array("cod_valid"=>200,'Mensaje'=>'Se subio el archivo','url'=>$route_doc);
		}else{
			return array("cod_valid"=>400,'Mensaje'=>'error no se puede cargar el archivo'.$file,'url'=>$route_doc);
		}   
	}

	function deletedocumento($base,$consec){
		try{
			if(isset($base)){	

				$entryWork = delete_Documento($base,$consec);
			    return json_encode($entryWork);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function get_TypeEtnia($base){

		try{

			if(isset($base)){				

				$type_etnia = getTypeEtnia($base);

			    return json_encode($type_etnia);

			}

			else{

				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));

			}

		}

		catch(Exception $e){

			return json_encode(array("code"=>500,"error"=>$e));

		}

	}

	function uploadFileDoc($file_,$grado,$requ){
		
		$codigo=$_SESSION["id"];


			// Tamaño máximo permitido en bytes (2 MB)
			$maxFileSize = 2 * 1024 * 1024;
				
			// Tipos de archivos permitidos
			$allowedExtensions = array('pdf');
			$fileExtension = strtolower(pathinfo($file_['file']['name'], PATHINFO_EXTENSION));
			$allowedMimeTypes = array('application/pdf');

			// Verificar tamaño del archivo
			if ($file_['file']['size'] > $maxFileSize) {
				return array("cod_valid" => 400, 'Mensaje' => 'El archivo excede el tamaño máximo permitido de 2 MB.', 'url' => '');
			}

			// Verificar tipo de archivo
			if (!in_array($fileExtension, $allowedExtensions) || !in_array($file_['file']['type'], $allowedMimeTypes)) {
				return array("cod_valid" => 400, 'Mensaje' => 'Tipo de archivo no permitido. Solo se permiten PDF', 'url' => '');
			}


		$result =array();
		$root = str_replace("\\","/",realpath($_SERVER["DOCUMENT_ROOT"]));
		$file = eliminar_acentos($file_['file']['name']);
	    $file = str_replace(" ", "_", $file);
		$dir_grado = $root."/AdmissionsDocuments/".$grado."";
		$dir_cod = $root."/AdmissionsDocuments/".$grado."/".$codigo."";
		$dir_ = $root."/AdmissionsDocuments/".$grado."/".$codigo."/".$requ."";

		if (!file_exists($dir_grado)) {
			mkdir($dir_grado, 0777, true);
		}
		if (!file_exists($dir_cod)) {
			mkdir($dir_cod, 0777, true);
		}
		if (!file_exists($dir_)) {
			mkdir($dir_, 0777, true);
		}
		$route_doc = $dir_."/".$file;

		$subirdoc = move_uploaded_file(eliminar_acentos($file_['file']['tmp_name']), $route_doc);
		sleep(10);
		if ($subirdoc) {
			return array("cod_valid"=>200,'Mensaje'=>'Se subio el archivo','url'=>$route_doc);
		}else{
			
			return array("cod_valid"=>400,'Mensaje'=>'error no se puede cargar el archivo'.$file,'url'=>$route_doc);
		}   

	

	}
	function uploadFilePoliza($file_){
		
		$codigo=$_SESSION["id"];

		
			// Tamaño máximo permitido en bytes (2 MB)
			$maxFileSize = 2 * 1024 * 1024;
				
			// Tipos de archivos permitidos
			$allowedExtensions = array('pdf');
			$fileExtension = strtolower(pathinfo($file_['file']['name'], PATHINFO_EXTENSION));
			$allowedMimeTypes = array('application/pdf');


					// Verificar tamaño del archivo
					if ($file_['file']['size'] > $maxFileSize) {
						return array("cod_valid" => 400, 'Mensaje' => 'El archivo excede el tamaño máximo permitido de 2 MB.', 'url' => '');
					}
		
					// Verificar tipo de archivo
					if (!in_array($fileExtension, $allowedExtensions) || !in_array($file_['file']['type'], $allowedMimeTypes)) {
						return array("cod_valid" => 400, 'Mensaje' => 'Tipo de archivo no permitido. Solo se permiten PDF', 'url' => '');
					}

		$result =array();
		$root = str_replace("\\","/",realpath($_SERVER["DOCUMENT_ROOT"]));





		$file = eliminar_acentos($file_['file']['name']);
	    $file = str_replace(" ", "_", $file);
		$dir_poliza= $root."/AdmissionsDocuments/Poliza/";
		$dir_ = $root."/AdmissionsDocuments/Poliza/".$codigo."";
		if (!file_exists($dir_poliza)) {
			mkdir($dir_poliza, 0777, true);
		}

		if (!file_exists($dir_)) {
			mkdir($dir_, 0777, true);
		}
		$route_doc = $dir_."/".$file;

		$subirdoc = move_uploaded_file(eliminar_acentos($file_['file']['tmp_name']), $route_doc);
		sleep(10);
		if ($subirdoc) {
			return array("cod_valid"=>200,'Mensaje'=>'Se subio el archivo','url'=>$route_doc);
		}else{
			
			return array("cod_valid"=>400,'Mensaje'=>'error no se puede cargar el archivo'.$file,'url'=>$route_doc);
		}   

	

	}
	function deleteRequisito($base,$consec,$requisito){
		try{
			if(isset($base)){	

				$entryWork = delete_Requisito($base,$consec,$requisito);

			    return json_encode($entryWork);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}


	function delete_poliza($base,$consec){
		try{
			if(isset($base)){	

				$entryWork = deletepoliza($base,$consec);

			    return json_encode($entryWork);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function update_CancelServices($base,$alimentos,$motivoAlimentos,$transporte,$motivoTransporte,$MediasNueves,$motivoMedias){
		try{
			if(isset($base)){	

				$entryWork = updateCancelServices($base,$alimentos,$motivoAlimentos,$transporte,$motivoTransporte,$MediasNueves,$motivoMedias);

			    return json_encode($entryWork);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function up_date_EtniaData($base,$selecgroup_etnico){
		try{
			if(isset($base)){				
				$type_etnia = updateEtniaData($base,$selecgroup_etnico);
			    return json_encode($type_etnia);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function update_estudianteRuta($base,$sale_solo,$Nombre_ps,$Cedula_ps,$Telefono_ps){
		try{
			if(isset($base) && isset($sale_solo) && isset($Nombre_ps) && isset($Cedula_ps) && isset($Telefono_ps)){	

				$entryWork = updateRuta_acudiente($base,$sale_solo,$Nombre_ps,$Cedula_ps,$Telefono_ps);
			    return json_encode($entryWork);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	
	function insert_ProcessId($base){
		try{
			if(isset($base)){	

				$entryWork = insertProcessId($base);

			    return json_encode($entryWork);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	
	function service_BusScool($base){
		try{
			if(isset($base)){	

				$entryWork = serviceBusScool($base);

			    return json_encode($entryWork);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}


	function update_StateStudenNewData($base,$type){
		try{
			if(isset($base)){	
				$entry = updateStateStudenNewData($base,$type);
			    return json_encode($entry);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}


	function eliminar_acentos($cadena){
		
		//Reemplazamos la A y a
		$cadena = str_replace(
		array('Á', 'À', 'Â', 'Ä', 'á', 'à', 'ä', 'â', 'ª'),
		array('A', 'A', 'A', 'A', 'a', 'a', 'a', 'a', 'a'),
		$cadena
		);
 
		//Reemplazamos la E y e
		$cadena = str_replace(
		array('É', 'È', 'Ê', 'Ë', 'é', 'è', 'ë', 'ê'),
		array('E', 'E', 'E', 'E', 'e', 'e', 'e', 'e'),
		$cadena );
 
		//Reemplazamos la I y i
		$cadena = str_replace(
		array('Í', 'Ì', 'Ï', 'Î', 'í', 'ì', 'ï', 'î'),
		array('I', 'I', 'I', 'I', 'i', 'i', 'i', 'i'),
		$cadena );
 
		//Reemplazamos la O y o
		$cadena = str_replace(
		array('Ó', 'Ò', 'Ö', 'Ô', 'ó', 'ò', 'ö', 'ô'),
		array('O', 'O', 'O', 'O', 'o', 'o', 'o', 'o'),
		$cadena );
 
		//Reemplazamos la U y u
		$cadena = str_replace(
		array('Ú', 'Ù', 'Û', 'Ü', 'ú', 'ù', 'ü', 'û'),
		array('U', 'U', 'U', 'U', 'u', 'u', 'u', 'u'),
		$cadena );
 
		//Reemplazamos la N, n, C y c
		$cadena = str_replace(
		array('Ñ', 'ñ', 'Ç', 'ç'),
		array('N', 'n', 'C', 'c'),
		$cadena
		);
		
		return $cadena;
	}

	$base = (!isset($_FILES['base']))?'caa':$_FILES['base'];

	$userLoged = isLoged($base);



	if($userLoged['is_logged']){

			

		$base=$db[$_POST['base']];

		switch ($_POST['param']) {

			case 'permission':

				echo get_access($base);

				break;
			case 'getPendienteServicio':

				echo getPendiente_Servicio($base);

				break;
			case 'getProfile':

				echo get_profile();

				break;

			case 'getStateActData':

				echo get_state_act_data($base);

				break;

			case 'getApprovalData':

				echo get_approval_data($base);

				break;

			case 'getCountrys':

				echo get_countrys($base);

				break;

			case 'getDeptos':

				echo get_deptos($base);

				break;

			case 'getCitys':

				echo get_citys($base,$_POST["id_country"],$_POST["id_dpto"]);

				break;

			case 'delete_documento':

				echo deletedocumento($base,$_POST["consec"]);

				break;

			case 'getAddress':

				echo get_address($base);

				break;

			case 'getTypeCivil':

				echo get_type_civil($base);

				break;

			case 'getNationality':

				echo get_nationality($base);

				break;

			case 'delete_requisito':

				echo deleteRequisito($base,$_POST["consec"],$_POST["requisito"]);
					
				break;


			case 'deletepoliza':

				echo delete_poliza($base,$_POST["consec"]);
						
				break;

			case 'updateCancelServices':

				echo update_CancelServices($base,$_POST["alimentos"],$_POST["motivoAlimentos"],$_POST["transporte"],$_POST["motivoTransporte"],$_POST["MediasNueves"],$_POST["motivoMedias"]);
					
				break;

			case 'getCivilStatus':

				echo get_civil_status($base);

				break;

			case 'getTypeDocs':

				echo get_typedocs($base);

				break;

			case 'getStudentData':

				echo get_student_data($base);

				break;

			case 'getStudentDataBasic':

					echo get_student_data_basic($base);
	
					break;

			case 'getStudentDataNew':

				echo get_student_data_New($base);

				break;

			case 'getHealthData':

				echo get_health_data($base);

				break;

			case 'getBrotherData':

				echo get_brother_data($base);

				break;

			case 'getBrotherSchool':

				echo get_brother_school($base);

				break;

			case 'getFatherData':

				echo get_father_data($base);

				break;

			case 'getFatherDataNew':

				echo get_father_data_New($base);

				break;

			case 'getMotherData':

				echo get_mother_data($base);

				break;

			case 'getMotherDataNew':

				echo get_mother_data_New($base);

				break;

			case 'getTutorData':

				echo get_tutor_data($base);

				break;

			case 'getEmergencyData':

				echo get_emergency_data($base);

				break;

			case 'getEmergencyAddData':

				echo get_emergency_add_data($base);

				break;

			case 'getServicesData':

				echo get_services_data($base);

				break;

			case 'getRoutesExtraDesc':

				echo get_routes_desc($base);

				break;

			case 'getRoutesExtra':

				echo get_routes_extra($base);

				break;

			case 'getBusStop':

				echo get_bus_stop($base,$_POST["route"]);

				break;

			case 'getDebtorData':

				echo get_debtor_data($base);

				break;

			case 'getCodebtorData':

				echo get_codebtor_data($base);

				break;

			case 'getChangeRetention':

				echo get_change_retention($base);

				break;
			case 'get_Requirements_Data':

				echo getRequirementsData($base);
	
				break;
			case 'get_Files_Data':

				echo getFilesData($base);
		
				break;
			
			case 'updateApprovalData':

				echo update_approval_data($base,$_POST["approve"]);

				break;

			case 'updateStudentData':

				echo update_student_data($base,$_POST["date_nac"],$_POST["number_doc"],$_POST["number_visa"],$_POST["date_visa_exp"],$_POST["date_visa_venc"],$_POST["nuv"],$_POST["pnu"],$_POST["snu"],$_POST["iad"],$_POST["neighborhood"],$_POST["phone_home"],$_POST["stratus"],$_POST["gender"],$_POST["selectCountryNac"],$_POST["selectDeptoNac"],$_POST["selectCityNac"],$_POST["selectNacionality"],$_POST["selectTypeDoc"],$_POST["selectDeptoExp"],$_POST["selectCityExp"],$_POST["selectAddrHome"],$_POST["selectDeptoHome"],$_POST["selectCityHome"],$_POST["email_stu"],$_POST["phone_stu"],$_POST["blood_type"],$_POST["rh"]);

				break;



			case 'updatefilesPoliza':

				$fileDoc = uploadFilePoliza($_FILES);					
					
				echo get_updatePoliza($base,$fileDoc);			
						
				break;
	
			case 'updatefilesDoc':

				$fileDoc = uploadFileDoc($_FILES,$_POST["grado"],$_POST["requisito"]);					

				echo get_updatefilesDoc($base,$_POST["grado"],$_POST["requisito"],$_POST["name"],$fileDoc);			

				break;
				
			case 'updateHealthData':

				echo update_health_data($base,$_POST["blood_type"],$_POST["rh"],$_POST["eps"],$_POST["ips"],$_POST["prepaid_medicine"],$_POST["scheme"],$_POST["major_disease"],$_POST["current_disease"],$_POST["hospitalized"],$_POST["disturbance"],$_POST["allergy"],$_POST["allergy_medication"],$_POST["surgical_history"],$_POST["musculoskeletal_injuries"],$_POST["permanent_medication"],$_POST["medical_condition"],$_POST["convulsion"],$_POST["convulsion_medication"],$_POST["exploratory_valuation"],$_POST["reason_major_disease"],$_POST["reason_current_disease"],$_POST["reason_hospitalized"],$_POST["reason_disturbance"],$_POST["reason_allergy"],$_POST["reason_allergy_medication"],$_POST["reason_surgical_history"],$_POST["reason_musculoskeletal_injuries"],$_POST["name_permanent_medication"],$_POST["dose_permanent_medication"],$_POST["which_medical_condition"],$_POST["treatment_medical_condition"],$_POST["reason_convulsion"],$_POST["quantity_convulsion"],$_POST["reason_convulsion_medication"],$_POST["reason_exploratory_valuation"],$_POST["vaccine_covid"],$_POST["vaccine_vph"],$_POST["allergy_alimento"],$_POST["reason_allergy_alimento"],$_POST["poliza_seguro"],$_POST["reason_poliza_seguro"],$_POST["psicriatia"],$_POST["dose_Tratamiento_medication"],$_POST["autorizaMedi"],$_POST["Alergia"]);

				break;

			case 'addBrotherData':

				echo add_brother_data($base,$_POST["arrayBrother"]);

				break;

			case 'updateBrotherData':

				echo update_brother_data($base,$_POST["id_brother"]);

				break;

			case 'updateCivilStatusData':

				echo update_civil_status_data($base,$_POST["selectCivilStatus"],$_POST["custody_parent"],$_POST["custody"],$_POST["custody_cedula"],$_POST["custody_cel"]);

				break;

			case 'updateFatherData':

				echo update_father_data($base,$_POST["father_last_name"],$_POST["father_names"],$_POST["father_email"],$_POST["father_mobile"],$_POST["father_phone_home"],$_POST["father_nuv"],$_POST["father_pnu"],$_POST["father_snu"],$_POST["father_iad"],$_POST["father_date_nac"],$_POST["father_selectCountryNac"],$_POST["father_selectCityNac"],$_POST["father_date_exp_doc"],$_POST["father_number_doc"],$_POST["father_company"],$_POST["father_position"],$_POST["father_occupation"],$_POST["father_nuv_job"],$_POST["father_pnu_job"],$_POST["father_snu_job"],$_POST["father_iad_job"],$_POST["father_phone_job"],$_POST["father_ext_job"],$_POST["father_service_time"],$_POST["father_selectAddrHome"],$_POST["father_selectDeptoHome"],$_POST["father_selectCityHome"],$_POST["father_selectTypeDoc"],$_POST["father_selectDeptoExp"],$_POST["father_selectCityExp"],$_POST["father_selectAddr_job"],$_POST["father_prefijo"]);

				break;

			case 'updateMotherData':

				echo update_mother_data($base,$_POST["mother_last_name"],$_POST["mother_names"],$_POST["mother_email"],$_POST["mother_mobile"],$_POST["mother_phone_home"],$_POST["mother_nuv"],$_POST["mother_pnu"],$_POST["mother_snu"],$_POST["mother_iad"],$_POST["mother_date_nac"],$_POST["mother_selectCountryNac"],$_POST["mother_selectCityNac"],$_POST["mother_date_exp_doc"],$_POST["mother_number_doc"],$_POST["mother_company"],$_POST["mother_position"],$_POST["mother_occupation"],$_POST["mother_nuv_job"],$_POST["mother_pnu_job"],$_POST["mother_snu_job"],$_POST["mother_iad_job"],$_POST["mother_phone_job"],$_POST["mother_ext_job"],$_POST["mother_service_time"],$_POST["mother_selectAddrHome"],$_POST["mother_selectDeptoHome"],$_POST["mother_selectCityHome"],$_POST["mother_selectTypeDoc"],$_POST["mother_selectDeptoExp"],$_POST["mother_selectCityExp"],$_POST["mother_selectAddr_job"],$_POST["mother_prefijo"]);

				break;

			case 'updateAdoptiveData':

				echo update_adoptive_data($base,$_POST["adopted_son"],$_POST["reason_adopted_son"]);

				break;

			case 'updateServicesData':

				echo update_services_data($base,$_POST["half_nines"],$_POST["launch"],$_POST["transport"],$_POST["accident_insurance"]);

				break;

			case 'updateTutorData':

				echo update_tutor_data($base,$_POST["tutor_last_name"],$_POST["tutor_names"],$_POST["tutor_email"],$_POST["tutor_mobile"],$_POST["tutor_phone_home"],$_POST["tutor_nuv"],$_POST["tutor_pnu"],$_POST["tutor_snu"],$_POST["tutor_iad"],$_POST["tutor_number_doc"],$_POST["tutor_relationship"],$_POST["tutor_selectAddrHome"],$_POST["tutor_selectTypeDoc"],$_POST["tutor_selectDeptoExp"],$_POST["tutor_selectCityExp"]);

				break;

			case 'updateEmergencyData':

				echo update_emergency_data($base,$_POST["emergency_last_name"],$_POST["emergency_names"],$_POST["emergency_email"],$_POST["emergency_mobile"],$_POST["emergency_phone_home"],$_POST["emergency_nuv"],$_POST["emergency_pnu"],$_POST["emergency_snu"],$_POST["emergency_iad"],$_POST["emergency_number_doc"],$_POST["emergency_relationship"],$_POST["emergency_selectAddrHome"],$_POST["emergency_selectTypeDoc"],$_POST["emergency_selectDeptoExp"],$_POST["emergency_selectCityExp"]);

				break;

			case 'updateEmergencyAddData':

				echo update_emergency_add_data($base,$_POST["emergency_add_last_name"],$_POST["emergency_add_names"],$_POST["emergency_add_email"],$_POST["emergency_add_mobile"],$_POST["emergency_add_phone_home"],$_POST["emergency_add_nuv"],$_POST["emergency_add_pnu"],$_POST["emergency_add_snu"],$_POST["emergency_add_iad"],$_POST["emergency_add_number_doc"],$_POST["emergency_add_relationship"],$_POST["emergency_add_selectAddrHome"],$_POST["emergency_add_selectTypeDoc"],$_POST["emergency_add_selectDeptoExp"],$_POST["emergency_add_selectCityExp"],$_POST["type_emerg_add"]);

				break;

			case 'updateAuthPhotoData':

				echo update_auth_photo_data($base,$_POST["auth_photo"]);

				break;

			case 'updateDebtorData':

				echo update_debtor_data($base,$_POST["debtor_last_name"],$_POST["debtor_names"],$_POST["debtor_email"],$_POST["debtor_mobile"],$_POST["debtor_phone_home"],$_POST["debtor_nuv"],$_POST["debtor_pnu"],$_POST["debtor_snu"],$_POST["debtor_iad"],$_POST["debtor_number_doc"],$_POST["debtor_company"],$_POST["debtor_position"],$_POST["debtor_occupation"],$_POST["debtor_nuv_job"],$_POST["debtor_pnu_job"],$_POST["debtor_snu_job"],$_POST["debtor_iad_job"],$_POST["debtor_phone_job"],$_POST["debtor_ext_job"],$_POST["debtor_service_time"],$_POST["debtor_selectAddrHome"],$_POST["debtor_selectDeptoHome"],$_POST["debtor_selectCityHome"],$_POST["debtor_selectTypeDoc"],$_POST["debtor_selectDeptoExp"],$_POST["debtor_selectCityExp"],$_POST["debtor_selectAddr_job"],$_POST["copy_debtor"],$_POST["debtor_indicativo"]);

				break;

			case 'updateCodebtorData':

				echo update_codebtor_data($base,$_POST["codebtor_last_name"],$_POST["codebtor_names"],$_POST["codebtor_email"],$_POST["codebtor_mobile"],$_POST["codebtor_phone_home"],$_POST["codebtor_nuv"],$_POST["codebtor_pnu"],$_POST["codebtor_snu"],$_POST["codebtor_iad"],$_POST["codebtor_number_doc"],$_POST["codebtor_company"],$_POST["codebtor_position"],$_POST["codebtor_occupation"],$_POST["codebtor_nuv_job"],$_POST["codebtor_pnu_job"],$_POST["codebtor_snu_job"],$_POST["codebtor_iad_job"],$_POST["codebtor_phone_job"],$_POST["codebtor_ext_job"],$_POST["codebtor_service_time"],$_POST["codebtor_selectAddrHome"],$_POST["codebtor_selectDeptoHome"],$_POST["codebtor_selectCityHome"],$_POST["codebtor_selectTypeDoc"],$_POST["codebtor_selectDeptoExp"],$_POST["codebtor_selectCityExp"],$_POST["codebtor_selectAddr_job"],$_POST["copy_codebtor"],$_POST["codebtor_indicativo"]);

				break;

			case 'updateTransportData':

				echo update_transport_data($base,$_POST["authPersonal"],$_POST["routeExtra"],$_POST["busStop"],$_POST["authName"],$_POST["authDoc"],$_POST["authMobile"],$_POST["authName_1"],$_POST["authDoc_1"],$_POST["authMobile_1"],$_POST["authName_2"],$_POST["authDoc_2"],$_POST["authMobile_2"],$_POST["bus_escool"]);

				break;

			case 'updatePedestrianData':

				echo update_pedestrian_data($base,$_POST["authPersonal"],$_POST["typeTransport"],$_POST["authName"],$_POST["authDoc"],$_POST["authMobile"],$_POST["authName_1"],$_POST["authDoc_1"],$_POST["authMobile_1"],$_POST["authName_2"],$_POST["authDoc_2"],$_POST["authMobile_2"]);

				break;

			case 'updateSpecial':

				echo update_special($base,$_POST["last_name"],$_POST["name"],$_POST["date_birth"],$_POST["number_doc"],$_POST["number_visa"],$_POST["date_visa_exp"],$_POST["date_visa_venc"],$_POST["selectTypeDoc"],$_POST["selectDeptoExp"],$_POST["selectCityExp"],$_POST["email"]);

				break;
			
			case 'updateBasic': 

				echo update_Basic($base,$_POST["tel_Student"],$_POST["adrres"],$_POST["celmother"],$_POST["email_mother"],$_POST["celular_father"],$_POST["email_father"]);
					
				//echo update_Basic($base,$_POST["tel_Student"],$_POST["adrres"],$_POST["email"],$_POST["cel_mother"],$_POST["email_mother"],$_POST["cel_father"],$_POST["email_father"]);
	
					break;

			case 'getSummaryData':

				echo get_summary_data($base);

				break;

			case 'updateEndProcess':

				echo update_end_process($base,$_POST["typeUser"]);

				break;

			case 'getLinkDocs':

				echo get_link_doc($base);

				break;

			case 'getServices':

				echo get_Service_D($base);

				break;

			case 'addServices':

				echo addDataservice($base,$_POST["question"]);

				break;

			case 'uploadDocuments':

				$fileAttached = $_FILES["fileAttached"];

				echo upload_documents($base,$fileAttached);

				break;

			case 'getCourses':

				echo get_courses($base);

				break;

			case 'getTypeStudent':

				echo get_type_student($base);

				break;

			case 'getListedDocs':

				echo get_listed_docs($base,$_POST["course"],$_POST["last_names"],$_POST["names"],$_POST["filter"]);

				break;

			case 'getInfoContracts':

				echo get_info_contracts($base,$_POST["course"],$_POST["last_names"],$_POST["names"],$_POST["filter"]);

				break;

			case 'updateService':

				echo update_service($base,$_POST["id_student"],$_POST["service"],$_POST["status"]);

				break;

			case 'updateOther':

				echo update_other($base,$_POST["id_student"],$_POST["service"],$_POST["status"]);

				break;

			case 'updateGroupAlternation':

				echo update_group_alternation($base,$_POST["id_student"],$_POST["status"]);

				break;

			case 'getTipoRazon':

				echo get_TipoRazon($base);

				break;

			case 'uppServiceMotive':

				echo uppService_Motive($base,$_POST["half_nines"],$_POST["launch"],$_POST["transport"],$_POST["datos_mediasnueves"],$_POST["datos_alimento"],$_POST["datos_transporte"],$_POST["checkmediasnueves_6"],$_POST["checkalmuerzo_6"],$_POST["checktransporte_6"],$_POST["reason_poliza_seguro"],$_POST["accident_insurance"]);

				break;

			case 'updateCustody':

				echo update_Custody($base,$_POST["peatona_person_m"],$_POST["peatona_person_p"]);

				break;

			case 'updateDeptoBienestarData':

				echo update_Depto_BienestarData($base,$_POST["depto_bienestar"]);

				break;

			case 'updatefiles':
				
				$fileDoc = uploadFile($_FILES);					
				
				echo get_updatefiles($base,$fileDoc);			
				
				break;

			case 'updatefileCustodia':
			
				$fileDoc = uploadFileCustodia($_FILES);					
				
				echo get_updatefileCustodia($base,$fileDoc);			
				
				break;

			case 'getTypeEtnia':

				echo get_TypeEtnia($base);

			break;

			case 'updateEtniaData':

				echo up_date_EtniaData($base,$_POST["selecgroup_etnico"]);

			break;

			case 'updatedRuta_estudiante':

				echo update_estudianteRuta($base,$_POST["sale_solo"],$_POST["Nombre_ps"],$_POST["Cedula_ps"],$_POST["Telefono_ps"]);

			break;
			case 'getemailentryform':

				echo get_email_entry_form($base,$_POST["consecutivo"]);

			break;
			case 'getemailTransporte':

				echo get_emailTransporte($base,$_POST["consecutivo"]);

			break;
			case 'getemailmedias':

				echo get_emailmedias($base,$_POST["consecutivo"]);

			break;
			case 'getElectronicSignature':
				echo get_Electronic_Signature($base);
			break;
			case 'insertProcessId':
				echo insert_ProcessId($base);
			break;

			case 'serviceBusScool':
				echo service_BusScool($base);
			break;
			case 'updateStateStudenNewData':
				echo update_StateStudenNewData($base,$_POST["type"]);
			break;
					
			default:

				echo "<h1 class='animated bounce'>not param given</h1>";

				break;

		}

			

	}

	else{

		echo json_encode(array("response"=>array("code"=>400,"error"=>"no ha iniciado sesión o caduco","modules"=>array())));

	}



?>