<?php

	/**

	 * Created by Sublime Text.

	 * User: Cristian Fabian Martinez

	 * Date: 19/06/2018

	 * Time: 08:00 AM

	 *

	 * this module has all function to get Admissions actions

	 */

	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\SMTP;
	use PHPMailer\PHPMailer\Exception;

	require 'PHPMailer/PHPMailer/src/Exception.php';
	require 'PHPMailer/PHPMailer/src/PHPMailer.php';
	require 'PHPMailer/PHPMailer/src/SMTP.php';



	header('Content-Type: text/html; charset=UTF-8');

	$root = realpath($_SERVER["DOCUMENT_ROOT"]);





	function response($result){

	    /**

	     * this function return an array with status code and response of action

	     *

	     * params:

	     * $result: array returned by database actions

	     * $client: object that contain all information of request response

	     */

	    if (!isset($result)){

	        return array('code'=>500, 'response' => "error request");

	    } else if (empty(array_values($result))) {

	        return array('code'=>400, 'response' => "response empty");

	    } else {

	        return array('code'=>200,'response' => $result);

	    }

	}



	function cmp($a, $b)

	{

        if(isset($a["NOMBRE"]) && isset($b["NOMBRE"])){

            return strcmp($a["NOMBRE"], $b["NOMBRE"]);

        }

	}



	function getAccess($base){
		try {
			global $modules;
	        $link = conectar_db($base);
	        $result =array();
	        $id = $_SESSION["id"];
	        $procedure = "CALL getUserAccess($id)"; 
	        $query = mysql_query($procedure,$link);
	        if(mysql_num_rows($query)>0){
	            while($data = mysql_fetch_assoc($query)){
	             	if(isset($modules[$data['module']])){
	             		array_push($result,$data['module']);
	             	}
	            }
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}



	function getStateActData($base){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $procedure = "SELECT id, estadoPrint FROM mat_fin WHERE id = '$id'"; 

	        $query = mysql_query($procedure,$link);

	        if(mysql_num_rows($query)>0){

	            while($data = mysql_fetch_assoc($query)){

	             	array_push($result, array("id" => $data["id"], "description" => $data["estadoPrint"]));

	            }

	        }

	        else {

	        	array_push($result, false);

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}
	function delete_Requisito($base,$consec,$requisito){
		try{
			$link = conectar_db($base);

			$result = array();

			$id = $_SESSION["id"];
			
			$proced_indicators = "DELETE FROM `mat_documentos` WHERE `consec`= '$consec'";
			
			$query_indicators = mysql_query($proced_indicators, $link);
			
			if(mysql_affected_rows()>0){
			
				$cod= true;
			
				$proced_indicators2 = "SELECT count(*) as cant FROM `mat_documentos` WHERE `requisito` = $requisito AND codigo = $id;";
			
				$query1 = mysql_query($proced_indicators2,$link);
			
				if(mysql_num_rows($query1)>0){
				
					while($data = mysql_fetch_assoc($query1)){
				
						array_push($result,array("cod_valid"=>$cod,"cant"=>$data['cant']));
				
					}
				
				}
			}

			else{
			
				array_push($result, array("cod_valid"=>false));	
			}
			
			mysql_close($link);
			
			return response($result);
		}catch(Exception $e) {
			
			$error = $e->getMessage();
			
			return array('error'=>'hubo un error en el servidor','descripcion'=>$error);
		}	
	}
	function deletepoliza($base,$consec){
		try{
			$link = conectar_db($base);

			$result = array();

			$id = $_SESSION["id"];

			
			$proced_indicators = "DELETE FROM `mat_documentos_poliza` WHERE `consec`= '$consec'";
			
			$query_indicators = mysql_query($proced_indicators, $link);
			
			if(mysql_affected_rows()>0){
			
				$cod= true;
			
				$proced_indicators2 = "SELECT count(*) as cant FROM `mat_documentos_poliza` WHERE `codigo` = $id";
			
				$query1 = mysql_query($proced_indicators2,$link);
			
				if(mysql_num_rows($query1)>0){
				
					while($data = mysql_fetch_assoc($query1)){
				
						array_push($result,array("cod_valid"=>$cod,"cant"=>$data['cant']));
				
					}
				
				}
			}

			else{
			
				array_push($result, array("cod_valid"=>false));	
			}
			
			mysql_close($link);
			
			return response($result);
		}catch(Exception $e) {
			
			$error = $e->getMessage();
			
			return array('error'=>'hubo un error en el servidor','descripcion'=>$error);
		}	
	}

	function getApprovalData($base){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $procedure = "SELECT id_est, des_apr FROM mat_aprobo WHERE id_est = '$id'"; 

	        $query = mysql_query($procedure,$link);

	        if(mysql_num_rows($query)>0){

	            while($data = mysql_fetch_assoc($query)){

	             	array_push($result, array("id" => $data["id_est"], "description" => $data["des_apr"]));

	            }

	        }

	        else {

	        	array_push($result, false);

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}

	function get_datos_estudiante($link,$id){
		try {
			
			$result =array();
			$estudiante="";
			$procedure1 = "SELECT  CONCAT(apellidos, ' ' , nombres) as Estudiante FROM usuarios WHERE id = $id"; 
			$query1 = mysql_query($procedure1,$link);
			if(mysql_num_rows($query1)>0){
				while($data = mysql_fetch_assoc($query1)){
					$estudiante =  $data['Estudiante'];
				}
			}
			return $estudiante;
		}
		catch (Exception $e) {
			$error = $e->getMessage();
			return array('code'=>500,'response'=>$error);
		}
	}



	function get_update_files_Doc($base,$grado,$requisito,$name,$fileDoc){
		try {
			$link = conectar_db($base);
			$result =array();
			
			
			$id = $_SESSION["id"];
			$arrayReq = [1 => "Registro civil",2 => "Tarjeta de identidad",3=> "Carné de vacunas",4=> "Pasaporte",5=> "Documento de identidad deudores"];
			
		
			$separador = " ";

			if ($fileDoc["cod_valid"]==200){
				$file= $fileDoc["url"];

				$sql1= "SELECT count(requisito) as cant from mat_documentos where codigo=$id and requisito = $requisito";
				$query1 = mysql_query($sql1,$link);
				if(mysql_num_rows($query1)>0){
					while($data1 = mysql_fetch_assoc($query1)){
						$cant = $data1["cant"];
						$n = $cant+1;
						$student= get_datos_estudiante($link,$id);
						$archivo = $n.'.  '.$arrayReq[$requisito].' '.$student;

						$sql= "INSERT INTO `mat_documentos`( `codigo`, `requisito`, `grado`, `archivo`, `nombre_archivo`, `fecha_registro`,`estado`) 
						VALUES ($id,$requisito,$grado,'$file','$archivo',CURDATE(),1)";

						$query = mysql_query($sql,$link);
						if(mysql_affected_rows()>0){
					
							$sql4= "select consec, nombre_archivo,archivo,requisito from mat_documentos where codigo=$id and requisito = $requisito ORDER BY nombre_archivo ASC";
							$query4 = mysql_query($sql4,$link);
							if(mysql_num_rows($query4)>0){
								while($data = mysql_fetch_assoc($query4)){
									array_push($result,array("cod_valid"=>200,"consec"=>$data['consec'],"nombre"=>$data['nombre_archivo'],"archivo"=>$data['archivo'],"requisito"=>$data['requisito'],"revision"=>$data['revision']));
								}
							}
						}
						else {
							array_push($result,array("cod_valid"=>500,"mess"=>$fileDoc["Mensaje"]));
						}
					}

			
				}
			}else {
				array_push($result,array("cod_valid"=>$fileDoc["cod_valid"],"mess"=> $fileDoc["Mensaje"]));
			}
			mysql_close($link);
			return response($result);
		}catch (Exception $e) {
			$error = $e->getMessage();
			return array('code'=>500,'response'=>$error);
		}
	}


	

	function get_update_Poliza($base,$fileDoc){
		try {
			$link = conectar_db($base);
			$result =array();
			
			
			$id = $_SESSION["id"];
			
			
		
			$separador = " ";

			if ($fileDoc["cod_valid"]==200){
				$file= $fileDoc["url"];
				$student= get_datos_estudiante($link,$id);
				$archivo = ' Poliza '.$student;

				$sql= "INSERT INTO `mat_documentos_poliza`( `codigo`, `archivo`, `nombre_archivo`, `fecha_registro`,`estado`) 
						VALUES ($id,'$file','$archivo',CURDATE(),1)";
				$query = mysql_query($sql,$link);
				if(mysql_affected_rows()>0){
					
					$sql4= "SELECT consec, nombre_archivo,archivo from mat_documentos_poliza where codigo=$id ORDER BY nombre_archivo ASC";
					$query4 = mysql_query($sql4,$link);
					if(mysql_num_rows($query4)>0){
						while($data = mysql_fetch_assoc($query4)){
							array_push($result,array("cod_valid"=>200,"consec"=>$data['consec'],"nombre"=>$data['nombre_archivo'],"archivo"=>$data['archivo'],"revision"=>$data['revision']));
						}
					}
				}
				else {
					array_push($result,array("cod_valid"=>500,"mess"=>$fileDoc["Mensaje"]));
				}
			}else {
				array_push($result,array("cod_valid"=>$fileDoc["cod_valid"],"mess"=> $fileDoc["Mensaje"]));
			}
			mysql_close($link);
			return response($result);
		}catch (Exception $e) {
			$error = $e->getMessage();
			return array('code'=>500,'response'=>$error);
		}
	}

	

	function getCountrys($base){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $procedure = "SELECT id_pais, descripcion, phonecode FROM paises ORDER BY descripcion"; 

	        $query = mysql_query($procedure,$link);

         

	        if(mysql_num_rows($query)>0){

	            while($data = mysql_fetch_assoc($query)){

	             	array_push($result, array("id" => $data["id_pais"], "description" => $data["descripcion"],"indicativo" => $data["phonecode"]));

	            }

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}

	

	function getNationality($base){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $procedure = "SELECT id_nacionalidad, descripcion FROM nacionalidad ORDER BY descripcion"; 

	        $query = mysql_query($procedure,$link);

         

	        if(mysql_num_rows($query)>0){

	            while($data = mysql_fetch_assoc($query)){

	             	array_push($result, array("id" => $data["id_nacionalidad"], "description" => $data["descripcion"]));

	            }

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}

	

	function getDeptos($base){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $procedure = "SELECT id_dpto, descripcion FROM dpto_pais WHERE id_pais='CO' ORDER BY descripcion"; 

	        $query = mysql_query($procedure,$link);

         

	        if(mysql_num_rows($query)>0){

	            while($data = mysql_fetch_assoc($query)){

	             	array_push($result, array("id" => $data["id_dpto"], "description" => $data["descripcion"]));

	            }

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}

	

	function getCitys($base,$id_country,$id_dpto){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id_country = ($id_country == false)?"%%":$id_country;

	        $id_dpto = ($id_dpto == false)?"%%":$id_dpto;

	        $procedure = "SELECT id_ciudad, descripcion FROM ciudades WHERE id_pais LIKE '$id_country' AND id_dpto LIKE '$id_dpto' ORDER BY descripcion"; 

	        $query = mysql_query($procedure,$link);

         

	        if(mysql_num_rows($query)>0){

	            while($data = mysql_fetch_assoc($query)){

	             	array_push($result, array("id" => $data["id_ciudad"], "description" => $data["descripcion"]));

	            }

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}

	

	function getAddress($base){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $procedure = "SELECT abv_dir, des_dir FROM direccion"; 

	        $query = mysql_query($procedure,$link);

         

	        if(mysql_num_rows($query)>0){

	            while($data = mysql_fetch_assoc($query)){

	             	array_push($result, array("id" => $data["abv_dir"], "description" => $data["des_dir"]));

	            }

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}

	

	function getTypeCivil($base){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $procedure = "SELECT id_estado_civil, descripcion FROM tipo_estado_civil"; 

	        $query = mysql_query($procedure,$link);

         

	        if(mysql_num_rows($query)>0){

	            while($data = mysql_fetch_assoc($query)){

	             	array_push($result, array("id" => $data["id_estado_civil"], "description" => $data["descripcion"]));

	            }

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}

	

	function getTypeDocs($base){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $procedure = "SELECT id_tipo_docu, abreviatura FROM tipo_documento WHERE estado=1 ORDER BY abreviatura"; 

	        $query = mysql_query($procedure,$link);

         

	        if(mysql_num_rows($query)>0){

	            while($data = mysql_fetch_assoc($query)){

	             	array_push($result, array("id" => $data["id_tipo_docu"], "description" => $data["abreviatura"]));

	            }

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}

	

	function getStudentData($base){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $procedure = "CALL getStudentData($id);"; 

	        $query = mysql_query($procedure,$link);

	        if(mysql_num_rows($query)>0){

	            while($data = mysql_fetch_assoc($query)){

	             	array_push($result, array("Id" => $data["Id"], "Last_Name" => $data["Last_Name"], "Name" => $data["Name"], "Names" => $data["Names"], "Type_User" => $data["Type_User"], "Birthdate" => $data["Birthdate"], "Age" => $data["Age"], "Country" => $data["Country"], "Dpto_Nac" => $data["Dpto_Nac"], "City_Nac" => $data["City_Nac"], "Nacionality" => $data["Nacionality"], "Type_Doc" => $data["Type_Doc"], "Num_Doc" => $data["Num_Doc"], "Number_Visa" => $data["Number_Visa"], "Date_Visa_Exp" => $data["Date_Visa_Exp"], "Date_Visa_Venc" => $data["Date_Visa_Venc"], "Dpto_Doc" => $data["Dpto_Doc"], "City_Doc" => $data["City_Doc"], "Gender" => $data["Gender"], "Blood_Type" => $data["Blood_Type"], "Rh" => $data["Rh"], "Phone_Home" => $data["Phone_Home"], "Neighborhood" => $data["Neighborhood"], "Via" => $data["Via"], "Nuv" => $data["Nuv"], "Pnu" => $data["Pnu"], "Snu" => $data["Snu"], "Iad" => $data["Iad"], "Dpto_Home" => $data["Dpto_Home"], "City_Home" => $data["City_Home"], "Stratus" => $data["Stratus"], "Email" => $data["Email"], "Phone" => $data["Phone"], "Adopted" => $data["Adopted"], "Age_Adopted" => $data["Age_Adopted"], "Half_Nines" => $data["Half_Nines"], "Half_NinesIngreso" => $data["Half_NinesIngreso"], "Half_NinesMotivo" => $data["Half_NinesMotivo"], "Half_NinesRazon" => $data["Half_NinesRazon"], "Launch" => $data["Launch"], "LaunchIngreso" => $data["LaunchIngreso"], "LaunchMotivo" => $data["LaunchMotivo"],"LaunchRazon" => $data["LaunchRazon"], "Transport" => $data["Transport"], "TransportIngreso" => $data["TransportIngreso"], "TransportMotivo" => $data["TransportMotivo"], "TransportRazon" => $data["TransportRazon"], "Accident_Secure" => $data["Accident_Secure"], "Photo" => $data["Photo"], "Archivo" => $data["Archivo"], "Nombre_Archivo" => $data["Nombre_Archivo"],"Poliza" => $data["Poliza"], "Nombre_Poliza" => $data["Nombre_Poliza"],"Codigo_Poliza" => $data["codigo_Poliza"], "Etnia" => $data["id_etnia"]));

	            }

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}


	function getStudentDataBasic($base){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $procedure = "CALL getStudentDataBasic($id);"; 



	        $query = mysql_query($procedure,$link);

	        if(mysql_num_rows($query)>0){

	            while($data = mysql_fetch_assoc($query)){

	             	array_push($result, array("Id" => $data["Id"], "Last_Name_Student" => $data["Last_Name_Student"], "Name_student" => $data["Name_student"], "Birthdate" => $data["Birthdate"], "Num_Doc" => $data["Num_Doc"], "tel_Student" => $data["tel_Student"], "Adrress" => $data["Adrress"], "Last_name_mother" => $data["Last_name_mother"],  "Doc_mother" => $data["Doc_mother"], "Cel_mother" => $data["Cel_mother"], "Email_mother" => $data["Email_mother"], "Last_name_Father" => $data["Last_name_Father"], "Doc_father" => $data["Doc_father"], "Cel_father" => $data["Cel_father"], "Email_father" => $data["Email_father"]));

	            }

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}

	

	function getHealthData($base){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $procedure = "CALL getHealthData($id);"; 

	        $query = mysql_query($procedure,$link);

	        if(mysql_num_rows($query)>0){

	            while($data = mysql_fetch_assoc($query)){

	             	array_push($result, array("Id" => $data["Id"], "Eps" => $data["Eps"], "Ips" => $data["Ips"], "Prepaid_Medicine" => $data["Prepaid_Medicine"], "Scheme" => $data["Scheme"], "Major_Disease" => $data["Major_Disease"], "Current_Disease" => $data["Current_Disease"], "Hospitalized" => $data["Hospitalized"], "Name_Permanent_Medication" => $data["Name_Permanent_Medication"], "Dose_Permanent_Medication" => $data["Dose_Permanent_Medication"], "Allergy" => $data["Allergy"], "Allergy_Medication" => $data["Allergy_Medication"], "Disturbance" => $data["Disturbance"], "Which_Medical_Condition" => $data["Which_Medical_Condition"], "Treatment_Medical_Condition" => $data["Treatment_Medical_Condition"], "Convulsion" => $data["Convulsion"], "Quantity_Convulsion" => $data["Quantity_Convulsion"], "Convulsion_Medication" => $data["Convulsion_Medication"], "Surgical_History" => $data["Surgical_History"], "Musculoskeletal_Injuries" => $data["Musculoskeletal_Injuries"], "Vaccine_Covid" => $data["Vaccine_Covid"], "Vaccine_Vph" => $data["Vaccine_Vph"], "Allergy_Alimento" => $data["Allergy_Alimento"], "dose_major_disease" => $data["tratamiento_major_disease"] ,"autorizaMedi" => $data["autorizaMedi"], "dept_bienestar" => $data["dept_bienestar"], "poliza_seguro" => $data["poliza_seguro"], "reason_poliza_seguro" => $data["reason_poliza_seguro"], "Psicriatia" => $data["psicriatia"], "exploratory_valuation" => $data["Exploratory_Valuation"], "alergia" => $data["alergia"]));

	            }

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}



	function getBrotherData($base){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $procedure = "CALL getBrotherData($id);"; 

	        $query = mysql_query($procedure,$link);

	        if(mysql_num_rows($query)>0){

	            while($data = mysql_fetch_assoc($query)){

	             	array_push($result, array("Id" => $data["Id"], "Last_Name" => $data["Last_Name"], "Names" => $data["Names"], "Course" => $data["Course"]));

	            }

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}



	function getBrotherSchool($base){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $procedure = "CALL getBrotherSchool($id)"; 

	        $query = mysql_query($procedure,$link);

	        if(mysql_num_rows($query)>0){

	            while($data = mysql_fetch_assoc($query)){

	             	array_push($result, array("Id" => $data["Id"], "Last_Name" => $data["Last_Name"], "Names" => $data["Names"], "Course" => $data["Course"]));

	            }

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}



	function getCivilStatus($base){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $procedure = "CALL getCivilStatus($id)"; 

	        $query = mysql_query($procedure,$link);

	        if(mysql_num_rows($query)>0){

	            while($data = mysql_fetch_assoc($query)){

	             	array_push($result, array("Id" => $data["Id"], "Civil_Status" => $data["Civil_Status"], "Custody" => $data["Custody"], "Custody_ma" => $data["Custody_ma"], "Custody_pa" => $data["Custody_pa"]));

	            }

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}

	

	function getFatherData($base){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $procedure = "CALL getFatherData($id)"; 

	        $query = mysql_query($procedure,$link);

	        if(mysql_num_rows($query)>0){

	            while($data = mysql_fetch_assoc($query)){

	             	array_push($result, array("Id" => $data["Id"], "Last_Name" => $data["Last_Name"], "Names" => $data["Names"], "Email" => $data["Email"], "Mobile" => $data["Mobile"], "Phone_Home" => $data["Phone_Home"], "Dpto_Home" => $data["Dpto_Home"], "City_Home" => $data["City_Home"], "Type_Doc" => $data["Type_Doc"], "Num_Doc" => $data["Num_Doc"], "Dpto_Doc" => $data["Dpto_Doc"],"Type_Doc" => $data["Type_Doc"], "Num_Doc" => $data["Num_Doc"], "Dpto_Doc" => $data["Dpto_Doc"],"Birthdate" => $data["Birthdate"], "Age" => $data["Age"], "Country_Nac" => $data["Country_Nac"], "City_Nac" => $data["City_Nac"], "Date_Exp_Doc" => $data["Date_Exp_Doc"], "City_Doc" => $data["City_Doc"], "Via" => $data["Via"], "Nuv" => $data["Nuv"], "Pnu" => $data["Pnu"], "Snu" => $data["Snu"], "Iad" => $data["Iad"], "Company" => $data["Company"], "Position" => $data["Position"], "Service_Time" => $data["Service_Time"], "Occupation" => $data["Occupation"], "Phone_Job" => $data["Phone_Job"], "Ext_Job" => $data["Ext_Job"], "Via_Job" => $data["Via_Job"], "Nuv_Job" => $data["Nuv_Job"], "Pnu_Job" => $data["Pnu_Job"], "Snu_Job" => $data["Snu_Job"], "Iad_Job" => $data["Iad_Job"], "prefijoCel" => $data["prefijoCel"]));

	            }

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}

	function getFatherDataNew($base){
		try {
	        $link = conectar_db($base);
	        $result =array();
	        $id = $_SESSION["id"];
	        $procedure = "CALL getFatherDataNew($id)"; 
	        $query = mysql_query($procedure,$link);
	        if(mysql_num_rows($query)>0){
	            while($data = mysql_fetch_assoc($query)){
	             	array_push($result, array("Id" => $data["Id"], "Last_Name" => $data["Last_Name"], "Names" => $data["Names"], "Email" => $data["Email"], "Mobile" => $data["Mobile"], "Type_Doc" => $data["Type_Doc"], "Num_Doc" => $data["Num_Doc"], "Company" => $data["Company"], "Position" => $data["Position"], "Service_Time" => $data["Service_Time"], "Occupation" => $data["Occupation"], "Phone_Job" => $data["Phone_Job"], "Estado" => $data["Estado"]));
	            }
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}

	}


	function getMotherData($base){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $procedure = "CALL getMotherData($id)"; 

	        $query = mysql_query($procedure,$link);

	        if(mysql_num_rows($query)>0){

	            while($data = mysql_fetch_assoc($query)){

	             	array_push($result, array("Id" => $data["Id"], "Last_Name" => $data["Last_Name"], "Names" => $data["Names"], "Email" => $data["Email"], "Mobile" => $data["Mobile"], "Phone_Home" => $data["Phone_Home"], "Dpto_Home" => $data["Dpto_Home"], "City_Home" => $data["City_Home"], "Type_Doc" => $data["Type_Doc"], "Num_Doc" => $data["Num_Doc"], "Dpto_Doc" => $data["Dpto_Doc"],"Birthdate" => $data["Birthdate"], "Age" => $data["Age"], "Country_Nac" => $data["Country_Nac"], "City_Nac" => $data["City_Nac"], "Date_Exp_Doc" => $data["Date_Exp_Doc"], "City_Doc" => $data["City_Doc"], "Via" => $data["Via"], "Nuv" => $data["Nuv"], "Pnu" => $data["Pnu"], "Snu" => $data["Snu"], "Iad" => $data["Iad"], "Company" => $data["Company"], "Position" => $data["Position"], "Service_Time" => $data["Service_Time"], "Occupation" => $data["Occupation"], "Phone_Job" => $data["Phone_Job"], "Ext_Job" => $data["Ext_Job"], "Via_Job" => $data["Via_Job"], "Nuv_Job" => $data["Nuv_Job"], "Pnu_Job" => $data["Pnu_Job"], "Snu_Job" => $data["Snu_Job"], "Iad_Job" => $data["Iad_Job"], "prefijoCel" => $data["prefijoCel"]));

	            }

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}

	
	function getMotherDataNew($base){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $procedure = "CALL getMotherDataNew($id)"; 

	        $query = mysql_query($procedure,$link);

	        if(mysql_num_rows($query)>0){

	            while($data = mysql_fetch_assoc($query)){

	             	array_push($result, array("Id" => $data["Id"], "Last_Name" => $data["Last_Name"], "Names" => $data["Names"], "Email" => $data["Email"], "Mobile" => $data["Mobile"], "Type_Doc" => $data["Type_Doc"], "Num_Doc" => $data["Num_Doc"], "Company" => $data["Company"], "Position" => $data["Position"], "Service_Time" => $data["Service_Time"], "Occupation" => $data["Occupation"], "Phone_Job" => $data["Phone_Job"], "Estado" => $data["Estado"]));

	            }

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}


	function getTutorData($base){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $procedure = "CALL getTutorData($id)"; 

	        $query = mysql_query($procedure,$link);

	        if(mysql_num_rows($query)>0){

	            while($data = mysql_fetch_assoc($query)){

	             	array_push($result, array("Id" => $data["Id"], "Last_Name" => $data["Last_Name"], "Names" => $data["Names"], "Email" => $data["Email"], "Mobile" => $data["Mobile"], "Phone_Home" => $data["Phone_Home"], "Type_Doc" => $data["Type_Doc"], "Num_Doc" => $data["Num_Doc"], "Dpto_Doc" => $data["Dpto_Doc"], "City_Doc" => $data["City_Doc"], "Relationship" => $data["Relationship"], "Via" => $data["Via"], "Nuv" => $data["Nuv"], "Pnu" => $data["Pnu"], "Snu" => $data["Snu"], "Iad" => $data["Iad"]));

	            }

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}



	function getEmergencyData($base){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $procedure = "CALL getEmergencyData($id)"; 

	        $query = mysql_query($procedure,$link);

	        if(mysql_num_rows($query)>0){

	            while($data = mysql_fetch_assoc($query)){

	             	array_push($result, array("Id" => $data["Id"], "Last_Name" => $data["Last_Name"], "Names" => $data["Names"], "Email" => $data["Email"], "Mobile" => $data["Mobile"], "Phone_Home" => $data["Phone_Home"], "Type_Doc" => $data["Type_Doc"], "Num_Doc" => $data["Num_Doc"], "Dpto_Doc" => $data["Dpto_Doc"], "City_Doc" => $data["City_Doc"], "Relationship" => $data["Relationship"], "Via" => $data["Via"], "Nuv" => $data["Nuv"], "Pnu" => $data["Pnu"], "Snu" => $data["Snu"], "Iad" => $data["Iad"]));

	            }

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}



	function getEmergencyAddData($base){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $procedure = "CALL getEmergencyAddData($id)"; 

	        $query = mysql_query($procedure,$link);

	        if(mysql_num_rows($query)>0){

	            while($data = mysql_fetch_assoc($query)){

	             	array_push($result, array("Id" => $data["Id"], "Last_Name" => $data["Last_Name"], "Names" => $data["Names"], "Email" => $data["Email"], "Mobile" => $data["Mobile"], "Phone_Home" => $data["Phone_Home"], "Type_Doc" => $data["Type_Doc"], "Num_Doc" => $data["Num_Doc"], "Dpto_Doc" => $data["Dpto_Doc"], "City_Doc" => $data["City_Doc"], "Relationship" => $data["Relationship"], "Via" => $data["Via"], "Nuv" => $data["Nuv"], "Pnu" => $data["Pnu"], "Snu" => $data["Snu"], "Iad" => $data["Iad"]));

	            }

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}



	function getServicesData($base){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $procedure = "CALL getServicesData($id);"; 

	        $query = mysql_query($procedure,$link);

	        if(mysql_num_rows($query)>0){

	            while($data = mysql_fetch_assoc($query)){

	             	array_push($result, array("Id" => $data["Id"], "Description" => ucwords(strtolower($data["Description"]))));

	            }

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}



	function getRoutesExtraDesc($base){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $procedure = "SELECT CONCAT('RUTA ',num_route) as Route, recorrido as Travel

						FROM rutas_extra"; 

	        $query = mysql_query($procedure,$link);

	        if(mysql_num_rows($query)>0){

	            while($data = mysql_fetch_assoc($query)){

	             	array_push($result, array("Route" => $data["Route"],"Travel" => $data["Travel"]));

	            }

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}



	function getRoutesExtra($base){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $procedure = "SELECT id_route as Id, num_route as Route 

						FROM rutas_extra

						ORDER BY id_route"; 

	        $query = mysql_query($procedure,$link);

	        if(mysql_num_rows($query)>0){

	            while($data = mysql_fetch_assoc($query)){

	             	array_push($result, array("id" => $data["Id"], "description" => $data["Route"]));

	            }

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}



	function getBusStop($base,$route){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $route = ($route == "--")?"%%":$route;

	        $procedure = "SELECT id_paradero as Id, paradero as BusStop 

						FROM paraderos_extra

						WHERE num_route LIKE '$route'

						ORDER BY id_paradero"; 

	        $query = mysql_query($procedure,$link);

	        if(mysql_num_rows($query)>0){

	            while($data = mysql_fetch_assoc($query)){

	             	array_push($result, array("id" => $data["Id"], "description" => $data["BusStop"]));

	            }

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}



	function getDebtorData($base){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $procedure = "CALL getDebtorData($id)"; 

	        $query = mysql_query($procedure,$link);

	        if(mysql_num_rows($query)>0){

	            while($data = mysql_fetch_assoc($query)){

	             	array_push($result, array("Id" => $data["Id"], "Last_Name" => $data["Last_Name"], "Names" => $data["Names"], "Email" => $data["Email"], "Mobile" => $data["Mobile"], "Phone_Home" => $data["Phone_Home"], "Dpto_Home" => $data["Dpto_Home"], "City_Home" => $data["City_Home"], "Type_Doc" => $data["Type_Doc"], "Num_Doc" => $data["Num_Doc"], "Dpto_Doc" => $data["Dpto_Doc"], "City_Doc" => $data["City_Doc"], "Via" => $data["Via"], "Nuv" => $data["Nuv"], "Pnu" => $data["Pnu"], "Snu" => $data["Snu"], "Iad" => $data["Iad"], "Company" => $data["Company"], "Position" => $data["Position"], "Service_Time" => $data["Service_Time"], "Occupation" => $data["Occupation"], "Phone_Job" => $data["Phone_Job"], "Ext_Job" => $data["Ext_Job"], "Via_Job" => $data["Via_Job"], "Nuv_Job" => $data["Nuv_Job"], "Pnu_Job" => $data["Pnu_Job"], "Snu_Job" => $data["Snu_Job"], "Iad_Job" => $data["Iad_Job"], "Id_Copy" => $data["Id_Copy"], "Type_doc" => $data["Type_doc"], "ext_cel" => $data["ext_cel"]));

	            }

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}	



	function getCodebtorData($base){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $procedure = "CALL getCodebtorData($id)"; 

	        $query = mysql_query($procedure,$link);

	        if(mysql_num_rows($query)>0){

	            while($data = mysql_fetch_assoc($query)){

	             	array_push($result, array("Id" => $data["Id"], "Last_Name" => $data["Last_Name"], "Names" => $data["Names"], "Email" => $data["Email"], "Mobile" => $data["Mobile"], "Phone_Home" => $data["Phone_Home"], "Dpto_Home" => $data["Dpto_Home"], "City_Home" => $data["City_Home"], "Type_Doc" => $data["Type_Doc"], "Num_Doc" => $data["Num_Doc"], "Dpto_Doc" => $data["Dpto_Doc"], "City_Doc" => $data["City_Doc"], "Via" => $data["Via"], "Nuv" => $data["Nuv"], "Pnu" => $data["Pnu"], "Snu" => $data["Snu"], "Iad" => $data["Iad"], "Company" => $data["Company"], "Position" => $data["Position"], "Service_Time" => $data["Service_Time"], "Occupation" => $data["Occupation"], "Phone_Job" => $data["Phone_Job"], "Ext_Job" => $data["Ext_Job"], "Via_Job" => $data["Via_Job"], "Nuv_Job" => $data["Nuv_Job"], "Pnu_Job" => $data["Pnu_Job"], "Snu_Job" => $data["Snu_Job"], "Iad_Job" => $data["Iad_Job"], "Id_Copy" => $data["Id_Copy"], "Type_doc" => $data["Type_doc"], "ext_cel" => $data["ext_cel"]));

	            }

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}

	function getChangeRetention($base){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $procedure = "SELECT id_student, status

        				FROM change_retention 

        				WHERE id_student = $id  AND status = 1"; 

	        $query = mysql_query($procedure,$link);

	        if(mysql_num_rows($query)>0){

	            while($data = mysql_fetch_assoc($query)){

	             	array_push($result, array("Id" => $data["id_student"], "Change" => $data["status"]));

	            }

	        }

	        else {

	        	array_push($result, false);

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}



	function get_Files_Data($base){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $procedure = "SELECT MD.consec,MD.requisito,MR.requisito as req_nombre,MD.archivo ,MD.nombre_archivo, MD.revision 

							FROM `mat_requisitos`AS MR INNER JOIN mat_documentos AS MD ON MD.requisito = MR.cod 
							
							WHERE  MD.codigo=$id

							ORDER BY `MD`.`consec` ASC"; 

	        $query = mysql_query($procedure,$link);

	        if(mysql_num_rows($query)>0){

	            while($data = mysql_fetch_assoc($query)){

					array_push($result, array("consec"=>$data['consec'],"requisito"=>$data['requisito'],"archivo"=>$data['archivo'],"nombre_archivo"=>$data['nombre_archivo'],"revision"=>$data['revision']));

	            }

	        }

	        else {

	        	array_push($result, false);

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}

	function busca_edad($fecha_nacimiento){
		$dia=date("d");
		$mes=date("m");
		$ano=date("Y");

		$dianaz=date("d",strtotime($fecha_nacimiento));
		$mesnaz=date("m",strtotime($fecha_nacimiento));
		$anonaz=date("Y",strtotime($fecha_nacimiento));

		//si el mes es el mismo pero el día inferior aun no ha cumplido años, le quitaremos un año al actual

		if (($mesnaz == $mes) && ($dianaz > $dia)) {
		$ano=($ano-1); }

		//si el mes es superior al actual tampoco habrá cumplido años, por eso le quitamos un año al actual

		if ($mesnaz > $mes) {
		$ano=($ano-1);}

		//ya no habría mas condiciones, ahora simplemente restamos los años y mostramos el resultado como su edad

		$edad=($ano-$anonaz);
		return $edad;

	}

	function calcularEdad($fecha_nacimiento) {
		$nacimiento = new DateTime($fecha_nacimiento);
		$hoy = new DateTime();
		$edad = $hoy->diff($nacimiento)->y;
		return $edad;
	}


	function get_Requirements_Data($base){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

			$procedure = "SELECT id_grado,fecha_naci,id_tipo_docu FROM `usuarios` WHERE `id` =  $id";

			$query = mysql_query($procedure,$link);

			if(mysql_num_rows($query)>0){

				while($data = mysql_fetch_assoc($query)){

					$edad = calcularEdad($data['fecha_naci']);
					$grado = $data['id_grado'];
					$tipoDoc = $data['id_tipo_docu'];

					$getrequisitos = "SELECT * FROM `mat_requisitos`";

					$query1 = mysql_query($getrequisitos,$link);
					if(mysql_num_rows($query1)>0){
						while($data1 = mysql_fetch_assoc($query1)){
							$req = $data1['cod'];
							$obliga = true;
							switch ($req) {
								case 2://tarjeta de identidad
									if($edad>=7){
										if($grado>=6){
											$obliga = true;
										}else{
											$obliga = false;
										}
									array_push($result,array("cod"=>$req,"requisito"=>$data1['requisito'],"obligatorio"=>$obliga));
									}
								break;
								case 3:
									if($grado==1 || $grado==2 || $grado==3){
										array_push($result,array("cod"=>$req,"requisito"=>$data1['requisito'],"obligatorio"=>true));
									}
								break;
								case 4:
									if($tipoDoc == '7' || $tipoDoc == '8' || $tipoDoc == '13' || $tipoDoc == '15'){
										array_push($result,array("cod"=>$req,"requisito"=>$data1['requisito'],"obligatorio"=>true));
									}
								break;
								case 7:
									array_push($result,array("cod"=>$req,"requisito"=>$data1['requisito'],"obligatorio"=>false));
								break;
								case 8:
									array_push($result,array("cod"=>$req,"requisito"=>$data1['requisito'],"obligatorio"=>false));
								break;

								default:
									array_push($result,array("cod"=>$req,"requisito"=>$data1['requisito'],"obligatorio"=>true,"edad"=>$edad));
							}
						}
					}else {
					array_push($result, false);
					}
				}
			}
	        else {
	        	array_push($result, false);
	        }
	        mysql_close($link);
	        return response($result);
     	}

     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}



	function updateApprovalData($base,$aprrove){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $ip = $_SERVER['REMOTE_ADDR'];

	        $procedure = "INSERT INTO mat_aprobo (id_est,des_apr,ip_apr,fec_apr,hor_apr)

	        			VALUES ('$id','$aprrove','$ip',CURDATE(),TIME(NOW()))

	        			ON DUPLICATE KEY UPDATE

	        			des_apr = '$aprrove', ip_apr = '$ip', fec_apr = CURDATE(), hor_apr = TIME(NOW())"; 

	        			//print_r($procedure);

	        $query = mysql_query($procedure,$link);

	        if(mysql_affected_rows()>0){

	        	array_push($result,true);

	        }

	        else {

	        	array_push($result,false);

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}	



	function updateStudentData($base,$date_nac,$number_doc,$number_visa,$date_visa_exp,$date_visa_venc,$nuv,$pnu,$snu,$iad,$neighborhood,$phone_home,$stratus,$gender,$selectCountryNac,$selectDeptoNac,$selectCityNac,$selectNacionality,$selectTypeDoc,$selectDeptoExp,$selectCityExp,$selectAddrHome,$selectDeptoHome,$selectCityHome,$email_stu,$phone_stu,$blood_type,$rh){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $procedure = "UPDATE usuarios SET id_tipo_docu = '$selectTypeDoc', n_docu = '$number_doc', origen_docu = '$selectCityExp', dpto_docu = '$selectDeptoExp', num_visa = '$number_visa', fecha_exp_visa = '$date_visa_exp', fecha_venc_visa = '$date_visa_venc', fecha_naci = '$date_nac', lugar_naci = '$selectCityNac', dpto_naci = '$selectDeptoNac', id_pais = '$selectCountryNac', id_nacionalidad = '$selectNacionality', direccion = '$selectAddrHome $nuv # $pnu - $snu $iad', barrio = '$neighborhood', id_ciudad_resi = '$selectCityHome', id_dpto_resi = '$selectDeptoHome', estrato = '$stratus', telefono = '$phone_home', celular = '$phone_stu', correo = '$email_stu', sexo = '$gender', grupo_sangui = '$blood_type', rh = '$rh' 

				WHERE id = '$id'"; 

			$procedure_dir = "INSERT INTO dir_usu(id_usu, id_tpu, via_dius, nuv_dius, pnu_dius, snu_dius, iad_dius) VALUES ('$id',1,'$selectAddrHome','$nuv','$pnu','$snu','$iad') 

				ON DUPLICATE KEY UPDATE via_dius = '$selectAddrHome', nuv_dius = '$nuv', pnu_dius = '$pnu', snu_dius = '$snu', iad_dius = '$iad'";

	        $query = mysql_query($procedure,$link);

	        $query_dir = mysql_query($procedure_dir,$link);

	        if(mysql_affected_rows()>0){

	        	array_push($result,true);

	        }

	        else {

	        	array_push($result,false);

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}



	function updateBasic($base,$tel_Student,$adrres,$celularmother,$email_mother,$celular_father,$email_father){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id_student = $_SESSION["id"];


			$procedure1 = "CALL updateStudentBasic($id_student,'$tel_Student','$adrres');"; 

			$query = mysql_query($procedure1,$link);

			$procedure2 = " UPDATE mat_papas SET celular = '$celularmother', email = '$email_mother'   WHERE  tipo_papa = '2' and id = '$id_student'";
	

			$query_dir = mysql_query($procedure2,$link);

			$procedure3 = " UPDATE mat_papas SET celular = '$celular_father', email = '$email_father'   WHERE  tipo_papa = '1' and id = '$id_student'";

			$query_dir = mysql_query($procedure3,$link);

	        if(mysql_affected_rows()>0){

	        	array_push($result,true);

	        }

	        else {

	        	array_push($result,false);

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}

	

	function updateSpecial($base,$last_name,$name,$date_birth,$number_doc,$number_visa,$date_visa_exp,$date_visa_venc,$selectTypeDoc,$selectDeptoExp,$selectCityExp,$email){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $last_name = trim($last_name);

	        $name = trim($name);

	        $procedure = "UPDATE usuarios SET apellidos = '$last_name', nombres = '$name', id_tipo_docu = '$selectTypeDoc', n_docu = '$number_doc', origen_docu = '$selectCityExp', dpto_docu = '$selectDeptoExp', num_visa = '$number_visa', fecha_exp_visa = '$date_visa_exp', fecha_venc_visa = '$date_visa_venc', fecha_naci = '$date_birth', correo = '$email' 

				WHERE id = '$id'"; 

	        $query = mysql_query($procedure,$link);

	        if(mysql_affected_rows()>0){

	        	array_push($result,true);

	        }

	        else {

	        	array_push($result,false);

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}



	function updateHealthData($base,$blood_type,$rh,$eps,$ips,$prepaid_medicine,$scheme,$major_disease,$current_disease,$hospitalized,$disturbance,$allergy,$allergy_medication,$surgical_history,$musculoskeletal_injuries,$permanent_medication,$medical_condition,$convulsion,$convulsion_medication,$exploratory_valuation,$reason_major_disease,$reason_current_disease,$reason_hospitalized,$reason_disturbance,$reason_allergy,$reason_allergy_medication,$reason_surgical_history,$reason_musculoskeletal_injuries,$name_permanent_medication,$dose_permanent_medication,$which_medical_condition,$treatment_medical_condition,$reason_convulsion,$quantity_convulsion,$reason_convulsion_medication,$reason_exploratory_valuation,$vaccine_covid,$vaccine_vph,$allergy_alimento,$reason_allergy_alimento,$poliza_seguro,$reason_poliza_seguro,$psicriatia,$dose_Tratamiento_medication,$autorizaMedi,$Alergia){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $procedure = "INSERT INTO mat_salud(id, blood_type, rh, eps, ips, prepaid_medicine, scheme, major_disease, current_disease, hospitalized, disturbance, allergy, allergy_medication, surgical_history, musculoskeletal_injuries, permanent_medication, medical_condition, convulsion, convulsion_medication, exploratory_valuation, reason_major_disease, reason_current_disease, reason_hospitalized, reason_disturbance, reason_allergy, reason_allergy_medication, reason_surgical_history, reason_musculoskeletal_injuries, name_permanent_medication, dose_permanent_medication, which_medical_condition, treatment_medical_condition, reason_convulsion, quantity_convulsion, reason_convulsion_medication, reason_exploratory_valuation, vaccine_covid, vaccine_vph, allergy_alimento, reason_allergy_alimento ,poliza_seguro, reason_poliza_seguro,psicriatia,tratamiento_major_disease,autorizaMedi,OnAllergy) VALUES ($id,'$blood_type','$rh','$eps','$ips','$prepaid_medicine','$scheme','$major_disease','$current_disease','$hospitalized','$disturbance','$allergy','$allergy_medication','$surgical_history','$musculoskeletal_injuries','$permanent_medication','$medical_condition','$convulsion','$convulsion_medication','$exploratory_valuation','$reason_major_disease','$reason_current_disease','$reason_hospitalized','$reason_disturbance','$reason_allergy','$reason_allergy_medication','$reason_surgical_history','$reason_musculoskeletal_injuries','$name_permanent_medication','$dose_permanent_medication','$which_medical_condition','$treatment_medical_condition','$reason_convulsion','$quantity_convulsion','$reason_convulsion_medication','$reason_exploratory_valuation','$vaccine_covid','$vaccine_vph','$allergy_alimento','$reason_allergy_alimento' ,'$poliza_seguro', '$reason_poliza_seguro', '$psicriatia', '$dose_Tratamiento_medication', '$autorizaMedi', '$Alergia') ON DUPLICATE KEY 

	        UPDATE blood_type = '$blood_type', rh = '$rh', eps = '$eps', ips = '$ips', prepaid_medicine = '$prepaid_medicine', scheme = '$scheme', major_disease = '$major_disease', current_disease = '$current_disease', hospitalized = '$hospitalized', disturbance = '$disturbance', allergy = '$allergy', allergy_medication = '$allergy_medication', surgical_history = '$surgical_history', musculoskeletal_injuries = '$musculoskeletal_injuries', permanent_medication = '$permanent_medication', medical_condition = '$medical_condition', convulsion = '$convulsion', convulsion_medication = '$convulsion_medication', exploratory_valuation = '$exploratory_valuation', reason_major_disease = '$reason_major_disease', reason_current_disease = '$reason_current_disease', reason_hospitalized = '$reason_hospitalized', reason_disturbance = '$reason_disturbance', reason_allergy = '$reason_allergy', reason_allergy_medication = '$reason_allergy_medication', reason_surgical_history = '$reason_surgical_history', reason_musculoskeletal_injuries = '$reason_musculoskeletal_injuries', name_permanent_medication = '$name_permanent_medication', dose_permanent_medication = '$dose_permanent_medication', which_medical_condition = '$which_medical_condition', treatment_medical_condition = '$treatment_medical_condition', reason_convulsion = '$reason_convulsion', quantity_convulsion = '$quantity_convulsion', reason_convulsion_medication = '$reason_convulsion_medication', reason_exploratory_valuation = '$reason_exploratory_valuation', vaccine_covid = '$vaccine_covid', vaccine_vph = '$vaccine_vph', allergy_alimento = '$allergy_alimento', reason_allergy_alimento = '$reason_allergy_alimento', poliza_seguro = '$poliza_seguro', reason_poliza_seguro = '$reason_poliza_seguro', psicriatia = '$psicriatia' , tratamiento_major_disease = '$dose_Tratamiento_medication', autorizaMedi = '$autorizaMedi', OnAllergy = '$Alergia' "; 

			//print_r($procedure);

	        $query = mysql_query($procedure,$link);

	        if(mysql_affected_rows()>0){

	        	array_push($result,true);

	        }

	        else {

	        	array_push($result,false);

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}	



	function addBrotherData($base,$arrayBrother){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        foreach ($arrayBrother as $key => $id_brother) {

	        	$procedure = "INSERT INTO hermanos(id,id_hermano) 

	        				VALUES ('$id','$id_brother'),('$id_brother','$id')"; 

	        	$query = mysql_query($procedure,$link);

	        }

	        if(mysql_affected_rows()>0){

	        	array_push($result,true);

	        }

	        else {

	        	array_push($result,false);

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}	



	function updateBrotherData($base,$id_brother){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $procedure = "DELETE FROM hermanos WHERE (id = '$id' AND id_hermano = '$id_brother') OR (id = '$id_brother' AND id_hermano = '$id')"; 

	        $query = mysql_query($procedure,$link);

	        if(mysql_affected_rows()>0){

	        	array_push($result,true);

	        }

	        else {

	        	array_push($result,false);

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}	



	function updateCivilStatusData($base,$selectCivilStatus,$custody_parent,$custody,$custody_cedula,$custody_cel){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $procedure = "INSERT INTO mat_estado_civil(id, id_estado_civil, custodia, otro,cedula, celphone) 

	        			VALUES ($id,'$selectCivilStatus','$custody_parent','$custody', '$custody_cedula', '$custody_cel')

	        			ON DUPLICATE KEY UPDATE id_estado_civil = '$selectCivilStatus', custodia = '$custody_parent', otro = '$custody', cedula = '$custody_cedula', celphone = '$custody_cel'"; 

	        $query = mysql_query($procedure,$link);

	        if(mysql_affected_rows()>0){

	        	array_push($result,true);

	        }

	        else {

	        	array_push($result,false);

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}	



	function updateFatherData($base,$father_last_name,$father_names,$father_email,$father_mobile,$father_phone_home,$father_nuv,$father_pnu,$father_snu,$father_iad,$father_date_nac,$father_selectCountryNac,$father_selectCityNac,$father_date_exp_doc,$father_number_doc,$father_company,$father_position,$father_occupation,$father_nuv_job,$father_pnu_job,$father_snu_job,$father_iad_job,$father_phone_job,$father_ext_job,$father_service_time,$father_selectAddrHome,$father_selectDeptoHome,$father_selectCityHome,$father_selectTypeDoc,$father_selectDeptoExp,$father_selectCityExp,$father_selectAddr_job,$father_prefijo){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $procedure = "INSERT INTO mat_papas(id, tipo_papa, p_apellido, p_nombre, num_documento, orig_documento, fecha_nacimiento, id_pais_nac, id_ciudad_nac, fecha_exp_doc, profesion, email, empresa, cargo, t_servicio, dir_oficina, tel_oficina, ext_telo, celular, t_docu, dircasa, telcasa, dpto_docu, id_dpto_resi, id_ciudad_resi,prefijoCel) VALUES ('$id',1,'$father_last_name','$father_names','$father_number_doc','$father_selectCityExp','$father_date_nac','$father_selectCountryNac','$father_selectCityNac','$father_date_exp_doc','$father_occupation','$father_email','$father_company','$father_position','$father_service_time','$father_selectAddr_job $father_nuv_job # $father_pnu_job - $father_snu_job $father_iad_job','$father_phone_job','$father_ext_job','$father_mobile','$father_selectTypeDoc','$father_selectAddrHome $father_nuv # $father_pnu - $father_snu $father_iad','$father_phone_home','$father_selectDeptoExp','$father_selectDeptoHome','$father_selectCityHome','$father_prefijo')

	        	ON DUPLICATE KEY UPDATE p_apellido = '$father_last_name',p_nombre = '$father_names',num_documento = '$father_number_doc',orig_documento = '$father_selectCityExp',fecha_nacimiento = '$father_date_nac',id_pais_nac = '$father_selectCountryNac',id_ciudad_nac = '$father_selectCityNac',fecha_exp_doc = '$father_date_exp_doc',profesion = '$father_occupation',email = '$father_email',empresa = '$father_company',cargo = '$father_position',t_servicio = '$father_service_time',dir_oficina = '$father_selectAddr_job $father_nuv_job # $father_pnu_job - $father_snu_job $father_iad_job',tel_oficina = '$father_phone_job',ext_telo = '$father_ext_job',celular = '$father_mobile',t_docu = '$father_selectTypeDoc',dircasa = '$father_selectAddrHome $father_nuv # $father_pnu - $father_snu $father_iad',telcasa = '$father_phone_home',dpto_docu = '$father_selectDeptoExp',id_dpto_resi = '$father_selectDeptoHome',id_ciudad_resi = '$father_selectCityHome', prefijoCel = '$father_prefijo'"; 

	        $procedure_dir = "INSERT INTO dir_usu(id_usu, id_tpu, via_dius, nuv_dius, pnu_dius, snu_dius, iad_dius) VALUES ('$id',2,'$father_selectAddrHome','$father_nuv','$father_pnu','$father_snu','$father_iad') 

				ON DUPLICATE KEY UPDATE via_dius = '$father_selectAddrHome', nuv_dius = '$father_nuv', pnu_dius = '$father_pnu', snu_dius = '$father_snu', iad_dius = '$father_iad'";

			$procedure_dir_of = "INSERT INTO dir_usu(id_usu, id_tpu, via_dius, nuv_dius, pnu_dius, snu_dius, iad_dius) VALUES ('$id',8,'$father_selectAddr_job','$father_nuv_job','$father_pnu_job','$father_snu_job','$father_iad_job') 

				ON DUPLICATE KEY UPDATE via_dius = '$father_selectAddr_job', nuv_dius = '$father_nuv_job', pnu_dius = '$father_pnu_job', snu_dius = '$father_snu_job', iad_dius = '$father_iad_job'";

	        $query = mysql_query($procedure,$link);

	        $query_dir = mysql_query($procedure_dir,$link);

	        $query_dir_of = mysql_query($procedure_dir_of,$link);

	        if(mysql_affected_rows()>0){

	        	array_push($result,true);

	        }

	        else {

	        	array_push($result,false);

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}	



	function updateMotherData($base,$mother_last_name,$mother_names,$mother_email,$mother_mobile,$mother_phone_home,$mother_nuv,$mother_pnu,$mother_snu,$mother_iad,$mother_date_nac,$mother_selectCountryNac,$mother_selectCityNac,$mother_date_exp_doc,$mother_number_doc,$mother_company,$mother_position,$mother_occupation,$mother_nuv_job,$mother_pnu_job,$mother_snu_job,$mother_iad_job,$mother_phone_job,$mother_ext_job,$mother_service_time,$mother_selectAddrHome,$mother_selectDeptoHome,$mother_selectCityHome,$mother_selectTypeDoc,$mother_selectDeptoExp,$mother_selectCityExp,$mother_selectAddr_job,$mother_prefijo){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $procedure = "INSERT INTO mat_papas(id, tipo_papa, p_apellido, p_nombre, num_documento, orig_documento, fecha_nacimiento, id_pais_nac, id_ciudad_nac, fecha_exp_doc, profesion, email, empresa, cargo, t_servicio, dir_oficina, tel_oficina, ext_telo, celular, t_docu, dircasa, telcasa, dpto_docu, id_dpto_resi, id_ciudad_resi,prefijoCel) VALUES ('$id',2,'$mother_last_name','$mother_names','$mother_number_doc','$mother_selectCityExp','$mother_date_nac','$mother_selectCountryNac','$mother_selectCityNac','$mother_date_exp_doc','$mother_occupation','$mother_email','$mother_company','$mother_position','$mother_service_time','$mother_selectAddr_job $mother_nuv_job # $mother_pnu_job - $mother_snu_job $mother_iad_job','$mother_phone_job','$mother_ext_job','$mother_mobile','$mother_selectTypeDoc','$mother_selectAddrHome $mother_nuv # $mother_pnu - $mother_snu $mother_iad','$mother_phone_home','$mother_selectDeptoExp','$mother_selectDeptoHome','$mother_selectCityHome','$mother_prefijo')

	        	ON DUPLICATE KEY UPDATE p_apellido = '$mother_last_name',p_nombre = '$mother_names',num_documento = '$mother_number_doc',orig_documento = '$mother_selectCityExp',fecha_nacimiento = '$mother_date_nac',id_pais_nac = '$mother_selectCountryNac',id_ciudad_nac = '$mother_selectCityNac',fecha_exp_doc = '$mother_date_exp_doc',profesion = '$mother_occupation',email = '$mother_email',empresa = '$mother_company',cargo = '$mother_position',t_servicio = '$mother_service_time',dir_oficina = '$mother_selectAddr_job $mother_nuv_job # $mother_pnu_job - $mother_snu_job $mother_iad_job',tel_oficina = '$mother_phone_job',ext_telo = '$mother_ext_job',celular = '$mother_mobile',t_docu = '$mother_selectTypeDoc',dircasa = '$mother_selectAddrHome $mother_nuv # $mother_pnu - $mother_snu $mother_iad',telcasa = '$mother_phone_home',dpto_docu = '$mother_selectDeptoExp',id_dpto_resi = '$mother_selectDeptoHome',id_ciudad_resi = '$mother_selectCityHome',prefijoCel = '$mother_prefijo'"; 

	        $procedure_dir = "INSERT INTO dir_usu(id_usu, id_tpu, via_dius, nuv_dius, pnu_dius, snu_dius, iad_dius) VALUES ('$id',3,'$mother_selectAddrHome','$mother_nuv','$mother_pnu','$mother_snu','$mother_iad') 

				ON DUPLICATE KEY UPDATE via_dius = '$mother_selectAddrHome', nuv_dius = '$mother_nuv', pnu_dius = '$mother_pnu', snu_dius = '$mother_snu', iad_dius = '$mother_iad'";

			$procedure_dir_of = "INSERT INTO dir_usu(id_usu, id_tpu, via_dius, nuv_dius, pnu_dius, snu_dius, iad_dius) VALUES ('$id',9,'$mother_selectAddr_job','$mother_nuv_job','$mother_pnu_job','$mother_snu_job','$mother_iad_job') 

				ON DUPLICATE KEY UPDATE via_dius = '$mother_selectAddr_job', nuv_dius = '$mother_nuv_job', pnu_dius = '$mother_pnu_job', snu_dius = '$mother_snu_job', iad_dius = '$mother_iad_job'";

	        $query = mysql_query($procedure,$link);

	        $query_dir = mysql_query($procedure_dir,$link);

	        $query_dir_of = mysql_query($procedure_dir_of,$link);

	        if(mysql_affected_rows()>0){

	        	array_push($result,true);

	        }

	        else {

	        	array_push($result,false);

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}	



	function updateAdoptiveData($base,$adopted_son,$reason_adopted_son){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $procedure = "INSERT INTO mat_adopcion(id, adoptado, edad) 

	        			VALUES ($id,'$adopted_son','$reason_adopted_son')

	        			ON DUPLICATE KEY UPDATE adoptado = '$adopted_son', edad = '$reason_adopted_son'"; 

	        $query = mysql_query($procedure,$link);

	        if(mysql_affected_rows()>0){

	        	array_push($result,true);

	        }

	        else {

	        	array_push($result,false);

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}	



	function updateServicesData($base,$half_nines,$launch,$transport,$accident_insurance){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $procedure = "CALL updateServicesData($id,'$half_nines','$launch','$transport','$accident_insurance');"; 

	        $query = mysql_query($procedure,$link);

	        if(mysql_affected_rows()>0){

	        	array_push($result,true);

	        }

	        else {

	        	array_push($result,false);

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}	



	function updateTutorData($base,$tutor_last_name,$tutor_names,$tutor_email,$tutor_mobile,$tutor_phone_home,$tutor_nuv,$tutor_pnu,$tutor_snu,$tutor_iad,$tutor_number_doc,$tutor_relationship,$tutor_selectAddrHome,$tutor_selectTypeDoc,$tutor_selectDeptoExp,$tutor_selectCityExp){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $procedure = "INSERT INTO mat_acudiente (id,p_apellido,p_nombre,id_tipo_docu,num_documento,orig_documento,telefono_resi,celular,parentesco,dpto_docu,direccion,correo)

	        	VALUES ('$id','$tutor_last_name','$tutor_names','$tutor_selectTypeDoc','$tutor_number_doc','$tutor_selectCityExp','$tutor_phone_home','$tutor_mobile','$tutor_relationship','$tutor_selectDeptoExp','$tutor_selectAddrHome $tutor_nuv # $tutor_pnu - $tutor_snu $tutor_iad' ,'$tutor_email') 

	        	ON DUPLICATE KEY UPDATE p_apellido = '$tutor_last_name',p_nombre = '$tutor_names',id_tipo_docu = '$tutor_selectTypeDoc',num_documento = '$tutor_number_doc',orig_documento = '$tutor_selectCityExp',telefono_resi = '$tutor_phone_home',celular = '$tutor_mobile',parentesco = '$tutor_relationship',dpto_docu = '$tutor_selectDeptoExp',direccion = '$tutor_selectAddrHome $tutor_nuv # $tutor_pnu - $tutor_snu $tutor_iad',correo = '$tutor_email'"; 

	        $procedure_dir = "INSERT INTO dir_usu(id_usu, id_tpu, via_dius, nuv_dius, pnu_dius, snu_dius, iad_dius) VALUES ('$id',4,'$tutor_selectAddrHome','$tutor_nuv','$tutor_pnu','$tutor_snu','$tutor_iad') 

				ON DUPLICATE KEY UPDATE via_dius = '$tutor_selectAddrHome', nuv_dius = '$tutor_nuv', pnu_dius = '$tutor_pnu', snu_dius = '$tutor_snu', iad_dius = '$tutor_iad'";

	        $query = mysql_query($procedure,$link);

	        $query_dir = mysql_query($procedure_dir,$link);

	        if(mysql_affected_rows()>0){

	        	array_push($result,true);

	        }

	        else {

	        	array_push($result,false);

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}	



	function updateEmergencyData($base,$emergency_last_name,$emergency_names,$emergency_email,$emergency_mobile,$emergency_phone_home,$emergency_nuv,$emergency_pnu,$emergency_snu,$emergency_iad,$emergency_number_doc,$emergency_relationship,$emergency_selectAddrHome,$emergency_selectTypeDoc,$emergency_selectDeptoExp,$emergency_selectCityExp){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $procedure = "INSERT INTO mat_emergencia(id, num, apellidos, nombres, telefono, celular, direccion, parentesco, num_documento, orig_documento, dpto_docu, t_docu, email) VALUES ('$id',1,'$emergency_last_name','$emergency_names','$emergency_phone_home','$emergency_mobile','$emergency_selectAddrHome $emergency_nuv # $emergency_pnu - $emergency_snu $emergency_iad','$emergency_relationship','$emergency_number_doc','$emergency_selectCityExp','$emergency_selectDeptoExp','$emergency_selectTypeDoc','$emergency_email')

	        ON DUPLICATE KEY UPDATE apellidos = '$emergency_last_name',nombres = '$emergency_names',telefono = '$emergency_phone_home',celular = '$emergency_mobile',direccion = '$emergency_selectAddrHome $emergency_nuv # $emergency_pnu - $emergency_snu $emergency_iad',parentesco = '$emergency_relationship',num_documento = '$emergency_number_doc',orig_documento = '$emergency_selectCityExp',dpto_docu = '$emergency_selectDeptoExp',t_docu = '$emergency_selectTypeDoc',email = '$emergency_email'"; 

	        $procedure_dir = "INSERT INTO dir_usu(id_usu, id_tpu, via_dius, nuv_dius, pnu_dius, snu_dius, iad_dius) VALUES ('$id',5,'$emergency_selectAddrHome','$emergency_nuv','$emergency_pnu','$emergency_snu','$emergency_iad') 

				ON DUPLICATE KEY UPDATE via_dius = '$emergency_selectAddrHome', nuv_dius = '$emergency_nuv', pnu_dius = '$emergency_pnu', snu_dius = '$emergency_snu', iad_dius = '$emergency_iad'";

	        $query = mysql_query($procedure,$link);

	        $query_dir = mysql_query($procedure_dir,$link);

	        if(mysql_affected_rows()>0){

	        	array_push($result,true);

	        }

	        else {

	        	array_push($result,false);

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}	



	function updateEmergencyAddData($base,$emergency_add_last_name,$emergency_add_names,$emergency_add_email,$emergency_add_mobile,$emergency_add_phone_home,$emergency_add_nuv,$emergency_add_pnu,$emergency_add_snu,$emergency_add_iad,$emergency_add_number_doc,$emergency_add_relationship,$emergency_add_selectAddrHome,$emergency_add_selectTypeDoc,$emergency_add_selectDeptoExp,$emergency_add_selectCityExp,$type_emerg_add){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        if ($type_emerg_add == "Si") {

		        $procedure = "INSERT INTO mat_emergencia(id, num, apellidos, nombres, telefono, celular, direccion, parentesco, num_documento, orig_documento, dpto_docu, t_docu, email) VALUES ('$id',2,'$emergency_add_last_name','$emergency_add_names','$emergency_add_phone_home','$emergency_add_mobile','$emergency_add_selectAddrHome $emergency_add_nuv # $emergency_add_pnu - $emergency_add_snu $emergency_add_iad','$emergency_add_relationship','$emergency_add_number_doc','$emergency_add_selectCityExp','$emergency_add_selectDeptoExp','$emergency_add_selectTypeDoc','$emergency_add_email') 

		        ON DUPLICATE KEY UPDATE apellidos = '$emergency_add_last_name',nombres = '$emergency_add_names',telefono = '$emergency_add_phone_home',celular = '$emergency_add_mobile',direccion = '$emergency_add_selectAddrHome $emergency_add_nuv # $emergency_add_pnu - $emergency_add_snu $emergency_add_iad',parentesco = '$emergency_add_relationship',num_documento = '$emergency_add_number_doc',orig_documento = '$emergency_add_selectCityExp',dpto_docu = '$emergency_add_selectDeptoExp',t_docu = '$emergency_add_selectTypeDoc',email = '$emergency_add_email'"; 

		        $procedure_dir = "INSERT INTO dir_usu(id_usu, id_tpu, via_dius, nuv_dius, pnu_dius, snu_dius, iad_dius) VALUES ('$id',12,'$emergency_add_selectAddrHome','$emergency_add_nuv','$emergency_add_pnu','$emergency_add_snu','$emergency_add_iad') 

				ON DUPLICATE KEY UPDATE via_dius = '$emergency_add_selectAddrHome', nuv_dius = '$emergency_add_nuv', pnu_dius = '$emergency_add_pnu', snu_dius = '$emergency_add_snu', iad_dius = '$emergency_add_iad'";

	        }

	        else if ($type_emerg_add == "No") {

	        	$procedure = "DELETE FROM mat_emergencia WHERE id = '$id' AND num = 2"; 

	        	$procedure_dir = "DELETE FROM dir_usu WHERE id_usu = '$id' AND id_tpu = 12"; 

	        }

	        $query_dir = mysql_query($procedure_dir,$link);

	        $query = mysql_query($procedure,$link);

	        if(mysql_affected_rows()>0){

	        	array_push($result,true);

	        }

	        else {

	        	array_push($result,false);

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}	



	function updateAuthPhotoData($base,$auth_photo_){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $auth_photo = ($auth_photo_ == "Si")?1:0;

	        $procedure = "INSERT INTO mat_foto (id_estu, autoriza)

	        			VALUES ($id,$auth_photo)

	        			ON DUPLICATE KEY UPDATE autoriza = $auth_photo"; 

	        //print_r($auth_photo_);

	        $query = mysql_query($procedure,$link);

	        if(mysql_affected_rows()>0){

	        	array_push($result,true);

	        }

	        else {

	        	array_push($result,false);

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}	



	function updateDebtorData($base,$debtor_last_name,$debtor_names,$debtor_email,$debtor_mobile,$debtor_phone_home,$debtor_nuv,$debtor_pnu,$debtor_snu,$debtor_iad,$debtor_number_doc,$debtor_company,$debtor_position,$debtor_occupation,$debtor_nuv_job,$debtor_pnu_job,$debtor_snu_job,$debtor_iad_job,$debtor_phone_job,$debtor_ext_job,$debtor_service_time,$debtor_selectAddrHome,$debtor_selectDeptoHome,$debtor_selectCityHome,$debtor_selectTypeDoc,$debtor_selectDeptoExp,$debtor_selectCityExp,$debtor_selectAddr_job,$copy_debtor,$debtor_indicativo){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $profile = $_SESSION["perfil"];

	        $sql_change = "SELECT status

	        				FROM change_retention

	        				WHERE id_student = $id";

	        $query_change = mysql_query($sql_change,$link);

$procedure = "INSERT INTO mat_retencion(id, tipodeudor, p_apellido, p_nombre, num_documento, orig_documento, t_docu, dpto_docu, dir_casa, tel_casa, id_dpto_resi, id_ciudad_resi, profesion, empresa, cargo, t_servicio, dir_of, tel_of, ext_telo, celular, email, id_copiado,ext_cel) VALUES ('$id',1,'$debtor_last_name','$debtor_names','$debtor_number_doc','$debtor_selectCityExp','$debtor_selectTypeDoc','$debtor_selectDeptoExp','$debtor_selectAddrHome $debtor_nuv # $debtor_pnu - $debtor_snu $debtor_iad','$debtor_phone_home','$debtor_selectDeptoHome','$debtor_selectCityHome','$debtor_occupation','$debtor_company','$debtor_position','$debtor_service_time','$debtor_selectAddr_job $debtor_nuv_job # $debtor_pnu_job - $debtor_snu_job $debtor_iad_job','$debtor_phone_job','$debtor_ext_job','$debtor_mobile','$debtor_email','$copy_debtor','$debtor_indicativo')

					ON DUPLICATE KEY UPDATE p_apellido = '$debtor_last_name',p_nombre = '$debtor_names',num_documento = '$debtor_number_doc',orig_documento = '$debtor_selectCityExp',t_docu = '$debtor_selectTypeDoc',dpto_docu = '$debtor_selectDeptoExp',dir_casa = '$debtor_selectAddrHome $debtor_nuv # $debtor_pnu - $debtor_snu $debtor_iad',tel_casa = '$debtor_phone_home',id_dpto_resi = '$debtor_selectDeptoHome',id_ciudad_resi = '$debtor_selectCityHome',profesion = '$debtor_occupation',empresa = '$debtor_company',cargo = '$debtor_position',t_servicio = '$debtor_service_time',dir_of = '$debtor_selectAddr_job $debtor_nuv_job # $debtor_pnu_job - $debtor_snu_job $debtor_iad_job',tel_of = '$debtor_phone_job',ext_telo = '$debtor_ext_job',celular = '$debtor_mobile',email = '$debtor_email',id_copiado = '$copy_debtor',ext_cel = '$debtor_indicativo'"; 

			$procedure_dir = "INSERT INTO dir_usu(id_usu, id_tpu, via_dius, nuv_dius, pnu_dius, snu_dius, iad_dius) VALUES ('$id',6,'$debtor_selectAddrHome','$debtor_nuv','$debtor_pnu','$debtor_snu','$debtor_iad') 

				ON DUPLICATE KEY UPDATE via_dius = '$debtor_selectAddrHome', nuv_dius = '$debtor_nuv', pnu_dius = '$debtor_pnu', snu_dius = '$debtor_snu', iad_dius = '$debtor_iad'";

			$procedure_dir_of = "INSERT INTO dir_usu(id_usu, id_tpu, via_dius, nuv_dius, pnu_dius, snu_dius, iad_dius) VALUES ('$id',10,'$debtor_selectAddr_job','$debtor_nuv_job','$debtor_pnu_job','$debtor_snu_job','$debtor_iad_job') 

				ON DUPLICATE KEY UPDATE via_dius = '$debtor_selectAddr_job', nuv_dius = '$debtor_nuv_job', pnu_dius = '$debtor_pnu_job', snu_dius = '$debtor_snu_job', iad_dius = '$debtor_iad_job'";

	        $query = mysql_query($procedure,$link);

	        $query_dir = mysql_query($procedure_dir,$link);

	        $query_dir_of = mysql_query($procedure_dir_of,$link);

	        if(mysql_affected_rows()>0){

	        	array_push($result,true);

	        }

	        else {

	        	array_push($result,false);

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}	



	function updateCodebtorData($base,$codebtor_last_name,$codebtor_names,$codebtor_email,$codebtor_mobile,$codebtor_phone_home,$codebtor_nuv,$codebtor_pnu,$codebtor_snu,$codebtor_iad,$codebtor_number_doc,$codebtor_company,$codebtor_position,$codebtor_occupation,$codebtor_nuv_job,$codebtor_pnu_job,$codebtor_snu_job,$codebtor_iad_job,$codebtor_phone_job,$codebtor_ext_job,$codebtor_service_time,$codebtor_selectAddrHome,$codebtor_selectDeptoHome,$codebtor_selectCityHome,$codebtor_selectTypeDoc,$codebtor_selectDeptoExp,$codebtor_selectCityExp,$codebtor_selectAddr_job,$copy_codebtor,$codebtor_indicativo){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $profile = $_SESSION["perfil"];

	        $sql_change = "SELECT status

	        				FROM change_retention

	        				WHERE id_student = $id";

	        $query_change = mysql_query($sql_change,$link);

	        if (mysql_num_rows($query_change)>0 || $profile == 55) {

	        	$procedure = "INSERT INTO mat_retencion(id, tipodeudor, p_apellido, p_nombre, num_documento, orig_documento, t_docu, dpto_docu, dir_casa, tel_casa, id_dpto_resi, id_ciudad_resi, profesion, empresa, cargo, t_servicio, dir_of, tel_of, ext_telo, celular, email, id_copiado,ext_cel) VALUES ('$id',2,'$codebtor_last_name','$codebtor_names','$codebtor_number_doc','$codebtor_selectCityExp','$codebtor_selectTypeDoc','$codebtor_selectDeptoExp','$codebtor_selectAddrHome $codebtor_nuv # $codebtor_pnu - $codebtor_snu $codebtor_iad','$codebtor_phone_home','$codebtor_selectDeptoHome','$codebtor_selectCityHome','$codebtor_occupation','$codebtor_company','$codebtor_position','$codebtor_service_time','$codebtor_selectAddr_job $codebtor_nuv_job # $codebtor_pnu_job - $codebtor_snu_job $codebtor_iad_job','$codebtor_phone_job','$codebtor_ext_job','$codebtor_mobile','$codebtor_email','$copy_codebtor','$codebtor_indicativo')

					ON DUPLICATE KEY UPDATE p_apellido = '$codebtor_last_name',p_nombre = '$codebtor_names',num_documento = '$codebtor_number_doc',orig_documento = '$codebtor_selectCityExp',t_docu = '$codebtor_selectTypeDoc',dpto_docu = '$codebtor_selectDeptoExp',dir_casa = '$codebtor_selectAddrHome $codebtor_nuv # $codebtor_pnu - $codebtor_snu $codebtor_iad',tel_casa = '$codebtor_phone_home',id_dpto_resi = '$codebtor_selectDeptoHome',id_ciudad_resi = '$codebtor_selectCityHome',profesion = '$codebtor_occupation',empresa = '$codebtor_company',cargo = '$codebtor_position',t_servicio = '$codebtor_service_time',dir_of = '$codebtor_selectAddr_job $codebtor_nuv_job # $codebtor_pnu_job - $codebtor_snu_job $codebtor_iad_job',tel_of = '$codebtor_phone_job',ext_telo = '$codebtor_ext_job',celular = '$codebtor_mobile',email = '$codebtor_email',id_copiado = '$copy_codebtor', ext_cel = '$codebtor_indicativo'";

			}

			else {

				$procedure = "UPDATE mat_retencion SET dir_casa = '$codebtor_selectAddrHome $codebtor_nuv # $codebtor_pnu - $codebtor_snu $codebtor_iad',tel_casa = '$codebtor_phone_home',id_dpto_resi = '$codebtor_selectDeptoHome',id_ciudad_resi = '$codebtor_selectCityHome',profesion = '$codebtor_occupation',empresa = '$codebtor_company',cargo = '$codebtor_position',t_servicio = '$codebtor_service_time',dir_of = '$codebtor_selectAddr_job $codebtor_nuv_job # $codebtor_pnu_job - $codebtor_snu_job $codebtor_iad_job',tel_of = '$codebtor_phone_job',ext_telo = '$codebtor_ext_job',celular = '$codebtor_mobile',email = '$codebtor_email', ext_cel = '$codebtor_indicativo'

					WHERE id = $id AND tipodeudor = 2"; 

			}

			$procedure_dir = "INSERT INTO dir_usu(id_usu, id_tpu, via_dius, nuv_dius, pnu_dius, snu_dius, iad_dius) VALUES ('$id',7,'$codebtor_selectAddrHome','$codebtor_nuv','$codebtor_pnu','$codebtor_snu','$codebtor_iad') 

				ON DUPLICATE KEY UPDATE via_dius = '$codebtor_selectAddrHome', nuv_dius = '$codebtor_nuv', pnu_dius = '$codebtor_pnu', snu_dius = '$codebtor_snu', iad_dius = '$codebtor_iad'";

			$procedure_dir_of = "INSERT INTO dir_usu(id_usu, id_tpu, via_dius, nuv_dius, pnu_dius, snu_dius, iad_dius) VALUES ('$id',11,'$codebtor_selectAddr_job','$codebtor_nuv_job','$codebtor_pnu_job','$codebtor_snu_job','$codebtor_iad_job') 

				ON DUPLICATE KEY UPDATE via_dius = '$codebtor_selectAddr_job', nuv_dius = '$codebtor_nuv_job', pnu_dius = '$codebtor_pnu_job', snu_dius = '$codebtor_snu_job', iad_dius = '$codebtor_iad_job'";

	        $query = mysql_query($procedure,$link);

	        $query_dir = mysql_query($procedure_dir,$link);

	        $query_dir_of = mysql_query($procedure_dir_of,$link);

	        if(mysql_affected_rows()>0){

	        	array_push($result,true);

	        }

	        else {

	        	array_push($result,false);

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}	



	function updateTransportData($base,$authPersonal,$routeExtra,$busStop,$authName,$authDoc,$authMobile,$authName_1,$authDoc_1,$authMobile_1,$authName_2,$authDoc_2,$authMobile_2,$bus_escool){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

			$procedure_del = "DELETE FROM peatonal_estudiante_nuevoano WHERE id_student = '$id'";

			$routeExtra = ($routeExtra == "--")?"NULL":$routeExtra;

			$busStop = ($busStop == "")?"NULL":$busStop;

	        $procedure = "INSERT INTO rutas_estudiante_nuevoano(id_student, route_extra, bus_stop, bus_escool, authPersonal, authName, authDoc, authMobile, authName_2, authDoc_2, authMobile_2, authName_3, authDoc_3, authMobile_3) VALUES ('$id','$routeExtra','$busStop','$bus_escool','$authPersonal','$authName','$authDoc','$authMobile','$authName_2','$authDoc_2','$authMobile_2','$authName_3','$authDoc_3','$authMobile_3')

				ON DUPLICATE KEY UPDATE route_extra = '$routeExtra',bus_stop = '$busStop',bus_escool = '$bus_escool',authPersonal = '$authPersonal',authName = '$authName',authDoc = '$authDoc',authMobile = '$authMobile',authName_2 = '$authName_2',authDoc_2 = '$authDoc_2',authMobile_2 = '$authMobile_2',authName_3 = '$authName_3',authDoc_3 = '$authDoc_3',authMobile_3 = '$authMobile_3'"; 

			// print_r($procedure);

	        $query_dir = mysql_query($procedure_del,$link);

	        $query = mysql_query($procedure,$link);

	        if(mysql_affected_rows()>0){

	        	array_push($result,true);

	        }

	        else {

	        	array_push($result,false);

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}	

	function validLonch($base,$option){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	

	        $procedure = ""; 

			// print_r($procedure);

	        $query_dir = mysql_query($procedure_del,$link);

	        $query = mysql_query($procedure,$link);

	        if(mysql_affected_rows()>0){

	        	array_push($result,true);

	        }

	        else {

	        	array_push($result,false);

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}


	function updatePedestrianData($base,$authPersonal,$typeTransport,$authName,$authDoc,$authMobile,$authName_1,$authDoc_1,$authMobile_1,$authName_2,$authDoc_2,$authMobile_2){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

			$procedure_del = "DELETE FROM rutas_estudiante_nuevoano WHERE id_student = '$id'";

	        $procedure = "INSERT INTO peatonal_estudiante_nuevoano(id_student, transport, authPersonal, authName, authDoc, authMobile, authName_2, authDoc_2, authMobile_2, authName_3, authDoc_3, authMobile_3, date_register) VALUES ('$id','$typeTransport','$authPersonal','$authName','$authDoc','$authMobile','$authName_1','$authDoc_1','$authMobile_1','$authName_2','$authDoc_2','$authMobile_2',NOW())

				ON DUPLICATE KEY UPDATE transport = '$typeTransport',authPersonal = '$authPersonal',authName = '$authName',authDoc = '$authDoc',authMobile = '$authMobile',authName_2 = '$authName_1',authDoc_2 = '$authDoc_1',authMobile_2 = '$authMobile_1',authName_3 = '$authName_2',authDoc_3 = '$authDoc_2',authMobile_3 = '$authMobile_2', date_register = NOW()"; 

	        $query_dir = mysql_query($procedure_del,$link);

	        $query = mysql_query($procedure,$link);

	        if(mysql_affected_rows()>0){

	        	array_push($result,true);

	        }

	        else {

	        	array_push($result,false);

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}	



	function getSummaryData($base){
		try {
	        $link = conectar_db($base);
	        $result =array();
	        $id = $_SESSION["id"];
	        $procedure = "SELECT CONCAT(U.apellidos,' ',U.nombres) as Nombre_Completo_del_Estudiante, U.fecha_naci as Fecha_de_Nacimiento, CONCAT(PU.descripcion,' - ',IF(U.id_pais = 'CO',CONCAT(DN.descripcion,' - '),''),CN.descripcion) as Lugar_de_Nacimiento, NU.descripcion as Nacionalidad, CONCAT(TD.abreviatura,': ',U.n_docu,' De ',IFNULL(PD.descripcion,DD.descripcion),'', if(U.origen_docu='--','',concat('-', CD.descripcion))) as Documento, CONCAT(U.direccion,', ',DR.descripcion,' - ',CR.descripcion) as Direccion_Residencia, U.telefono as Telefono_Fijo, U.estrato as Estrato, IF(U.sexo = 'M','Masculino',IF(U.sexo = 'F','Femenino','')) as Sexo, CONCAT(U.grupo_sangui,U.rh) as Grupo_Sanguineo, 
			(SELECT GROUP_CONCAT(UCASE(LEFT(T.descripcion,1)),LCASE(SUBSTRING(T.descripcion,2)),': ',IF(S.estado = 1,'SI','NO'), ' ') as Servicios 
			 FROM mat_serviciosEstuNuevoAno as S 
			 INNER JOIN tipo_servicio as T ON S.id_tipo_servicio = T.id_tipo_servicio 
			 WHERE S.id = U.id AND T.id_tipo_servicio NOT IN (4)) as Servicios,
			 CONCAT(P.p_apellido,' ',P.p_nombre) as Nombre_Completo_del_Padre, 
			 CONCAT(TP.abreviatura,': ',P.num_documento,' De ',IFNULL(PPT.descripcion,PDT.descripcion),' - ',PCT.descripcion) as Documento_Padre, P.profesion as Profesion_Padre, P.email as Email_Padre, P.dircasa as Direccion_Casa_Padre, P.telcasa as Telefono_Casa_Padre, P.empresa as Empresa_Padre, P.cargo as Cargo_Padre, P.t_servicio as Tiempo_de_Servicio_Padre, P.dir_oficina as Direccion_de_Oficina_Padre, CONCAT(P.tel_oficina,' Ext: ',P.ext_telo) as Telefono_Oficina_Padre, P.celular as Celular_Padre, CONCAT(M.p_apellido,' ',M.p_nombre) as Nombre_Completo_de_la_Madre, CONCAT(TM.abreviatura,': ',M.num_documento,' De ',IFNULL(MPT.descripcion,MDT.descripcion),' - ',MCT.descripcion) as Documento_Madre, M.profesion as Profesion_Madre, M.email as Email_Madre, M.dircasa as Direccion_Casa_Madre, M.telcasa as Telefono_Casa_Madre, M.empresa as Empresa_Madre, M.cargo as Cargo_Madre, M.t_servicio as Tiempo_de_Servicio_Madre, M.dir_oficina as Direccion_de_Oficina_Madre, CONCAT(M.tel_oficina,' Ext: ',M.ext_telo) as Telefono_Oficina_Madre, M.celular as Celular_Madre, CONCAT(A.p_apellido,' ',A.p_nombre) as Nombre_Completo_del_Acudiente, CONCAT(TA.abreviatura,': ',A.num_documento,' De ',IFNULL(APT.descripcion,ADT.descripcion),' - ',ACT.descripcion) as Documento_Acudiente, A.direccion as Direccion_Casa_Acudiente, A.telefono_resi as Telefono_Casa_Acudiente, A.celular as Celular_Acudiente, A.parentesco as Parentesco_Acudiente, CONCAT(E.apellidos,' ',E.nombres) as Persona_a_contactar_en_caso_de_Emergencia, E.direccion as Direccion_Emergencia, E.telefono as Telefono_Emergencia, E.celular as Celular_Emergencia, E.parentesco as Parentesco_Emergencia, CONCAT(DE.p_apellido,' ',DE.p_nombre) as Nombre_Completo_del_Deudor, CONCAT(TDE.abreviatura,': ',DE.num_documento,' De ',IFNULL(DPT.descripcion,DDT.descripcion),' - ',DCT.descripcion) as Documento_Deudor, DE.profesion as Profesion_Deudor, DE.email as Email_Deudor, DE.dir_casa as Direccion_Casa_Deudor, DE.tel_casa as Telefono_Casa_Deudor, DE.empresa as Empresa_Deudor, DE.cargo as Cargo_Deudor, DE.t_servicio as Tiempo_de_Servicio_Deudor, DE.dir_of as Direccion_de_Oficina_Deudor, CONCAT(DE.tel_of,' Ext: ',DE.ext_telo) as Telefono_Oficina_Deudor, DE.celular as Celular_Deudor, CONCAT(CE.p_apellido,' ',CE.p_nombre) as Nombre_Completo_del_Codeudor, CONCAT(TCE.abreviatura,': ',CE.num_documento,' De ',IFNULL(CPT.descripcion,CDT.descripcion),' - ',CCT.descripcion) as Documento_Codeudor, CE.profesion as Profesion_Codeudor, CE.email as Email_Codeudor, CE.dir_casa as Direccion_Casa_Codeudor, CE.tel_casa as Telefono_Casa_Codeudor, CE.empresa as Empresa_Codeudor, CE.cargo as Cargo_Codeudor, CE.t_servicio as Tiempo_de_Servicio_Codeudor, CE.dir_of as Direccion_de_Oficina_Codeudor, CONCAT(CE.tel_of,' Ext: ',CE.ext_telo) as Telefono_Oficina_Codeudor, CE.celular as Celular_Codeudor, IF(F.autoriza = 1,'SI','NO') as Autoriza_el_uso_de_las_Fotos, 
			 IF(TETN.descripcion is null, 'NO', CONCAT('SI. ',TETN.descripcion)) as Etnia, 
			 IF(SER.poliza_seguro = 'Si', 'SI', CONCAT('NO. Motivo ',SER.reason_poliza_seguro)) as Seguro, SER.psicriatia as Psiquiatria, if(PEM.estado = 1, 'SI','NO') as Peatonal_m ,if(PEP.estado = 1, 'SI','NO') as Peatonal_p
				FROM usuarios as U 
				LEFT JOIN paises as PU ON U.id_pais = PU.id_pais 
				LEFT JOIN dpto_pais as DN ON U.dpto_naci = DN.id_dpto 
				LEFT JOIN ciudades as CN ON U.lugar_naci = CN.id_ciudad 
				LEFT JOIN paises as NU ON U.id_nacionalidad = NU.id_pais 
				LEFT JOIN tipo_documento as TD ON U.id_tipo_docu = TD.id_tipo_docu 
				LEFT JOIN paises as PD ON U.dpto_docu = PD.id_pais 
				LEFT JOIN dpto_pais as DD ON U.dpto_docu = DD.id_dpto 
				LEFT JOIN ciudades as CD ON U.origen_docu = CD.id_ciudad 
				LEFT JOIN dpto_pais as DR ON U.id_dpto_resi = DR.id_dpto 
				LEFT JOIN ciudades as CR ON U.id_ciudad_resi = CR.id_ciudad 
				LEFT JOIN mat_papas as P ON U.id = P.id AND P.tipo_papa = 1 
				LEFT JOIN tipo_documento as TP ON P.t_docu = TP.id_tipo_docu 
				LEFT JOIN paises as PPT ON P.dpto_docu = PPT.id_pais 
				LEFT JOIN dpto_pais as PDT ON P.dpto_docu = PDT.id_dpto 
				LEFT JOIN ciudades as PCT ON P.orig_documento = PCT.id_ciudad 
				LEFT JOIN mat_papas as M ON U.id = M.id AND M.tipo_papa = 2 
				LEFT JOIN tipo_documento as TM ON M.t_docu = TM.id_tipo_docu 
				LEFT JOIN paises as MPT ON M.dpto_docu = MPT.id_pais 
				LEFT JOIN dpto_pais as MDT ON M.dpto_docu = MDT.id_dpto 
				LEFT JOIN ciudades as MCT ON M.orig_documento = MCT.id_ciudad 
				LEFT JOIN mat_acudiente as A ON U.id = A.id 
				LEFT JOIN tipo_documento as TA ON A.id_tipo_docu = TA.id_tipo_docu 
				LEFT JOIN paises as APT ON A.dpto_docu = APT.id_pais 
				LEFT JOIN dpto_pais as ADT ON A.dpto_docu = ADT.id_dpto 
				LEFT JOIN ciudades as ACT ON A.orig_documento = ACT.id_ciudad 
				LEFT JOIN mat_emergencia as E ON U.id = E.id AND E.num = 1 
				LEFT JOIN mat_retencion as DE ON U.id = DE.id AND DE.tipodeudor = 1 
				LEFT JOIN tipo_documento as TDE ON DE.t_docu = TDE.id_tipo_docu 
				LEFT JOIN paises as DPT ON DE.dpto_docu = DPT.id_pais 
				LEFT JOIN dpto_pais as DDT ON DE.dpto_docu = DDT.id_dpto 
				LEFT JOIN ciudades as DCT ON DE.orig_documento = DCT.id_ciudad 
				LEFT JOIN mat_retencion as CE ON U.id = CE.id AND CE.tipodeudor = 2 
				LEFT JOIN tipo_documento as TCE ON CE.t_docu = TCE.id_tipo_docu
				LEFT JOIN paises as CPT ON CE.dpto_docu = CPT.id_pais 
				LEFT JOIN dpto_pais as CDT ON CE.dpto_docu = CDT.id_dpto 
				LEFT JOIN ciudades as CCT ON CE.orig_documento = CCT.id_ciudad 
				LEFT JOIN mat_foto as F ON U.id = F.id_estu
				LEFT JOIN mat_etnia as ETN ON ETN.id = U.id
				LEFT JOIN mat_tipo_etnia as TETN ON TETN.id = ETN.id_etnia
				LEFT JOIN mat_salud as SER ON SER.id = U.id
				LEFT JOIN mat_permis_peatonal as PEM ON PEM.id = U.id AND PEM.tipo_papa = 2
				LEFT JOIN mat_permis_peatonal as PEP ON PEP.id = U.id AND PEP.tipo_papa = 1
				WHERE U.id = '$id'"; 

	        $query = mysql_query($procedure,$link);
	        if(mysql_num_rows($query)>0){
	            while($data = mysql_fetch_assoc($query)){
	             	array_push($result, array("Nombre Completo del Estudiante" => $data["Nombre_Completo_del_Estudiante"], "Fecha de Nacimiento" => $data["Fecha_de_Nacimiento"], "Lugar de Nacimiento" => $data["Lugar_de_Nacimiento"], "Nacionalidad" => $data["Nacionalidad"], "Documento" => $data["Documento"], "Direccion Residencia" => $data["Direccion_Residencia"], "Telefono Fijo" => $data["Telefono_Fijo"], "Estrato" => $data["Estrato"], "Sexo" => $data["Sexo"], "Grupo Sanguineo" => $data["Grupo_Sanguineo"], "Servicios" => $data["Servicios"], "Nombre Completo del Padre" => $data["Nombre_Completo_del_Padre"], "Documento Padre" => $data["Documento_Padre"], "Profesion Padre" => $data["Profesion_Padre"], "Email Padre" => $data["Email_Padre"], "Direccion Casa Padre" => $data["Direccion_Casa_Padre"], "Telefono Casa Padre" => $data["Telefono_Casa_Padre"], "Empresa Padre" => $data["Empresa_Padre"], "Cargo Padre" => $data["Cargo_Padre"], "Tiempo de Servicio Padre" => $data["Tiempo_de_Servicio_Padre"], "Direccion de Oficina Padre" => $data["Direccion_de_Oficina_Padre"], "Telefono Oficina Padre" => $data["Telefono_Oficina_Padre"], "Celular Padre" => $data["Celular_Padre"], "Nombre Completo de la Madre" => $data["Nombre_Completo_de_la_Madre"], "Documento Madre" => $data["Documento_Madre"], "Profesion Madre" => $data["Profesion_Madre"], "Email Madre" => $data["Email_Madre"], "Direccion Casa Madre" => $data["Direccion_Casa_Madre"], "Telefono Casa Madre" => $data["Telefono_Casa_Madre"], "Empresa Madre" => $data["Empresa_Madre"], "Cargo Madre" => $data["Cargo_Madre"], "Tiempo de Servicio Madre" => $data["Tiempo_de_Servicio_Madre"], "Direccion de Oficina Madre" => $data["Direccion_de_Oficina_Madre"], "Telefono Oficina Madre" => $data["Telefono_Oficina_Madre"], "Celular Madre" => $data["Celular_Madre"], "Nombre Completo del Acudiente" => $data["Nombre_Completo_del_Acudiente"], "Documento Acudiente" => $data["Documento_Acudiente"], "Direccion Casa Acudiente" => $data["Direccion_Casa_Acudiente"], "Telefono Casa Acudiente" => $data["Telefono_Casa_Acudiente"], "Celular Acudiente" => $data["Celular_Acudiente"], "Parentesco Acudiente" => $data["Parentesco_Acudiente"], "Persona a contactar en caso de Emergencia" => $data["Persona_a_contactar_en_caso_de_Emergencia"], "Direccion Emergencia" => $data["Direccion_Emergencia"], "Telefono Emergencia" => $data["Telefono_Emergencia"], "Celular Emergencia" => $data["Celular_Emergencia"], "Parentesco Emergencia" => $data["Parentesco_Emergencia"], "Nombre Completo del Deudor" => $data["Nombre_Completo_del_Deudor"], "Documento Deudor" => $data["Documento_Deudor"], "Profesion Deudor" => $data["Profesion_Deudor"], "Email Deudor" => $data["Email_Deudor"], "Direccion Casa Deudor" => $data["Direccion_Casa_Deudor"], "Telefono Casa Deudor" => $data["Telefono_Casa_Deudor"], "Empresa Deudor" => $data["Empresa_Deudor"], "Cargo Deudor" => $data["Cargo_Deudor"], "Tiempo de Servicio Deudor" => $data["Tiempo_de_Servicio_Deudor"], "Direccion de Oficina Deudor" => $data["Direccion_de_Oficina_Deudor"], "Telefono Oficina Deudor" => $data["Telefono_Oficina_Deudor"], "Celular Deudor" => $data["Celular_Deudor"], "Nombre Completo del Codeudor" => $data["Nombre_Completo_del_Codeudor"], "Documento Codeudor" => $data["Documento_Codeudor"], "Profesion Codeudor" => $data["Profesion_Codeudor"], "Email Codeudor" => $data["Email_Codeudor"], "Direccion Casa Codeudor" => $data["Direccion_Casa_Codeudor"], "Telefono Casa Codeudor" => $data["Telefono_Casa_Codeudor"], "Empresa Codeudor" => $data["Empresa_Codeudor"], "Cargo Codeudor" => $data["Cargo_Codeudor"], "Tiempo de Servicio Codeudor" => $data["Tiempo_de_Servicio_Codeudor"], "Direccion de Oficina Codeudor" => $data["Direccion_de_Oficina_Codeudor"], "Telefono Oficina Codeudor" => $data["Telefono_Oficina_Codeudor"], "Celular Codeudor" => $data["Celular_Codeudor"], "Autoriza el uso de las Fotos" => $data["Autoriza_el_uso_de_las_Fotos"], "¿Pertenece a algún grupo étnico?" => $data["Etnia"], "¿Desea adquirir la póliza de seguro?" => $data["Seguro"]));
	            }

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}



	function updateEndProcess($base,$typeUser){
		try {
	        $link = conectar_db($base);
	        $result =array();
	        $id = $_SESSION["id"];
	        $profile = $_SESSION["perfil"];
	        $procedure = "INSERT INTO mat_fin (id, estadoPrint, fechaPrint) 
			        	VALUES ('$id', 1, NOW()) ON DUPLICATE KEY
			        	UPDATE estadoPrint = 1, fechaPrint = NOW()"; 
	        $query = mysql_query($procedure,$link);
	        if(mysql_affected_rows()>0){
	        	array_push($result,true);
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}





    function serviceDate($base){

		try {

			global $db;

	        $link = conectar_db($base);

	        $response =array();

	        $id = $_SESSION["id"];

	        $bd_caa = "cvuser_".$db["caa"];

	        $sql_g = "SELECT U.id_grado  FROM $bd_caa.usuarios AS U WHERE U.id = '$id'"; 

	        $query_g = mysql_query($sql_g,$link);

	        if(mysql_num_rows($query_g)>0){

	            while($data_g = mysql_fetch_assoc($query_g)){

                    //print_r($sql);

	             	array_push($response, array("id_grado" => $data_g["id_grado"]));

	            }

	        }else {

	        	array_push($response, false);

	        }



	        // $sql = "SELECT M.tipo AS Servicio FROM cvuser_comunidadvirtual.medias_nueves AS M WHERE M.id = '$id'"; 

	        // $query = mysql_query($sql,$link);

	        // if(mysql_num_rows($query)>0){

	        //     while($data = mysql_fetch_assoc($query)){

         //            //print_r($sql);

	        //      	array_push($response, array("Servicio" => $data["Servicio"]));

	        //     }

	        // }

	        // else {

	        // 	array_push($response, false);

	        // }



	        $sql_A = "SELECT A.id_student,A.transport FROM $bd_caa.alternation_mode AS A WHERE A.id_student = '$id'"; 

	        $query_A = mysql_query($sql_A,$link);

	        if(mysql_num_rows($query_A)>0){

	            while($data_g = mysql_fetch_assoc($query_A)){

                    //print_r($sql);

	             	array_push($response, array("alternation" => true));

	            }

	        }else {

	        	array_push($response, false);

	        }	



	        mysql_close($link);

	        return response($response);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}



	function add_Dataservice($base,$question){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

        	$sql = "INSERT INTO medias_nueves (id, tipo, date_in) VALUES ($id, $question, NOW()) ON DUPLICATE KEY UPDATE tipo = $question"; 

	        	$query = mysql_query($sql,$link);

	        //print_r($sql);

	        if(mysql_affected_rows()>0){

	        	array_push($result,true);

	        }

	        else {

	        	array_push($result,false);

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}



	function getCourses($base){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $procedure = "SELECT IF(G.n_cursos >= C.id,CONCAT(G.id_grado,'-',C.id),0) as id_course, IF(G.n_cursos >= C.id,CONCAT(G.abreviatura,C.descripcion),0) as course

				FROM grados as G JOIN cursos as C

				HAVING id_course != 0"; 

	        $query = mysql_query($procedure,$link);

         

	        if(mysql_num_rows($query)>0){

	            while($data = mysql_fetch_assoc($query)){

	             	array_push($result, array("id" => $data["id_course"], "description" => $data["course"]));

	            }

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}



	}



	function getListedDocs($base,$course,$last_names,$names,$filter){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        if ($course != "--") {

		        $array_course = split("-",$course);

		        $id_grade = $array_course[0];

		        $id_course = $array_course[1];

	        }

	        else {

		        $id_grade = "%%";

		        $id_course = "%%";

	        }

	        $type_users = ($filter == 1)?7:2;

	        // $bd_caa_ant = "cvuser_caa".(date("Y")-1);

	        $bd_caa_ant = "cvuser_caa".(date("Y"));

        	$sql = "SELECT U.id as id_student, CONCAT(U.apellidos, ' ',U.nombres) as names, IF(U.curso <> 0,CONCAT(G.abreviatura,C.descripcion),G.descripcion) as course, D.link as link_docs 

					FROM $bd_caa_ant.usuarios as U INNER JOIN grados as G ON U.id_grado = G.id_grado LEFT JOIN cursos as C ON U.curso = C.id LEFT JOIN documents_register as D ON U.id = D.id_student

					WHERE U.id_tipo_usuario = '$type_users' AND U.id_perfil = 3 AND U.id_estado = 1 AND U.matriculado = 1 AND U.id_grado LIKE '$id_grade' AND U.curso LIKE '$id_course' AND U.nombres LIKE '%$names%' AND U.apellidos LIKE '%$last_names%'

					ORDER BY G.id_grado, C.id, Nombres"; 

        	$query = mysql_query($sql,$link);

	        // print_r($sql);

	        if(mysql_num_rows($query)>0){

	            while($data = mysql_fetch_assoc($query)){

	             	array_push($result, array("id_student" => $data["id_student"], "names" => $data["names"],"course" => $data["course"], "link_docs" => $data["link_docs"]));

	            }

	        }

	        else {

	        	array_push($result,300);

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}



	function uploadDocuments($base,$fileAttached){

		try {

	        $link = conectar_db($base);

	        $root = realpath($_SERVER["DOCUMENT_ROOT"]);

	        $result =array();

	        $id = $_SESSION["id"];

			//print_r($fileAttached);

		    $file = $fileAttached['name'];

		    $file = str_replace(" ", "_", $file);

		    $dir_ = $root."/Admissions/documents/".$id."";

		    if(!is_dir($dir_)) 

		        mkdir($dir_, 0777, true);



		    $route_doc = $dir_."/".$file;

		    if ($file && move_uploaded_file($fileAttached['tmp_name'],$dir_."/".$id.".pdf")){

		       sleep(3);

		       //$link_attached = $route_doc;

		       //$link_attached = "/Evaluations/anexos/".$id_evaluation."/".$file;

				$link_attached = "documents/".$id."/".$id.".pdf";

    			$sql = "INSERT INTO documents_register (id_student, link, date_register) VALUES ($id, '$link_attached', NOW()) ON DUPLICATE KEY UPDATE link = '$link_attached', date_register = NOW()"; 

	        	$query = mysql_query($sql,$link);

		        //print_r($sql);

		        if(mysql_affected_rows()){

		        	array_push($result,200);

		        	$result["result"] = date("d-m-Y h:i a");

		        }

		        else {

        			array_push($result,300);

		        }

		    }

		    else{

		    	// print_r("no se cargo el archivo");

        		array_push($result,500);

		    }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}



	function getTypeStudent($base){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

			//$sql = "SELECT IF(M.id_car IS NULL,U.id_tipo_usuario,7) as type_user

			//		FROM usuarios as U LEFT JOIN matriculados_nuevos as M ON U.id = M.id_car

			//		WHERE U.id = $id";

			$sql = "SELECT U.id_tipo_usuario as type_user

					FROM usuarios AS U 

					WHERE U.id = $id";

			$query = mysql_query($sql,$link);

		    if (mysql_num_rows($query) > 0){

		    	$data = mysql_fetch_assoc($query);

		    	$result["type_user"] = $data["type_user"];

		    }

		    else{

        		array_push($result,500);

		    }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}



	function getInfoContracts($base,$course,$last_names,$names,$filter){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        if ($course != "--") {

		        $array_course = split("-",$course);

		        $id_grade = $array_course[0];

		        $id_course = $array_course[1];

	        }

	        else {

		        $id_grade = "%%";

		        $id_course = "%%";

	        }

	        $type_users = ($filter == 1)?7:2;

	        $bd_caa_ant = "cvuser_caa".(date("Y")-1);

        	$sql = "SELECT U.id as id_student, CONCAT(U.apellidos, ' ',U.nombres) as names, IF(U.curso <> 0,CONCAT(G.abreviatura,C.descripcion),G.descripcion) as course, IF(AM.id_student IS NULL,0,1) as 'alternation', IF(AMP.id_student IS NULL,0,1) as 'alternation_prev', IF(GA.group_alternation IS NULL,NULL,GA.group_alternation) as 'group_alternation', IF(GAP.group_alternation IS NULL,3,GAP.group_alternation) as 'group_alternation_prev', MP.estado as 'half_nines_ant', AP.estado as 'launch_ant', TP.estado as 'transport_ant', M.tipo as 'half_nines_first', A.estado as 'launch_first', AM.transport as 'transport_first', MS.estado as 'half_nines_actual', ALS.estado as 'launch_actual', TS.estado as 'transport_actual', SCM.status as 'half_nines_contract', SCA.status as 'launch_contract', SCT.status as 'transport_contract', SCM.other_yes as 'half_nines_other_yes', SCA.other_yes as 'launch_other_yes', SCT.other_yes as 'transport_other_yes', SD.informed_consent as 'informed_consent', LM.status as 'act_module'

					FROM usuarios as U INNER JOIN grados as G ON U.id_grado = G.id_grado LEFT JOIN cursos as C ON U.curso = C.id LEFT JOIN alternation_mode AM ON U.id = AM.id_student LEFT JOIN groups_alternation as GA ON U.id = GA.id_student LEFT JOIN $bd_caa_ant.mat_serviciosEstu as MP ON U.id = MP.id AND MP.id_tipo_servicio = 1 LEFT JOIN $bd_caa_ant.mat_serviciosEstu as AP ON U.id = AP.id AND AP.id_tipo_servicio = 2 LEFT JOIN $bd_caa_ant.mat_serviciosEstu as TP ON U.id = TP.id AND TP.id_tipo_servicio = 3 LEFT JOIN cvuser_comunidadvirtual.medias_nueves as M ON U.id = M.id LEFT JOIN mat_serviciosEstuNuevoAno as A ON U.id = A.id AND A.id_tipo_servicio = 2 LEFT JOIN mat_serviciosEstuNuevoAno as T ON U.id = T.id AND T.id_tipo_servicio = 3 LEFT JOIN alternation_mode_prev AMP ON U.id = AMP.id_student LEFT JOIN groups_alternation_prev as GAP ON U.id = GAP.id_student LEFT JOIN mat_serviciosEstu as MS ON U.id = MS.id AND MS.id_tipo_servicio = 1 LEFT JOIN mat_serviciosEstu as ALS ON U.id = ALS.id AND ALS.id_tipo_servicio = 2 LEFT JOIN mat_serviciosEstu as TS ON U.id = TS.id AND TS.id_tipo_servicio = 3 LEFT JOIN show_contracts as SCM ON U.id = SCM.id_student AND SCM.id_service = 1 LEFT JOIN show_contracts as SCA ON U.id = SCA.id_student AND SCA.id_service = 2 LEFT JOIN show_contracts as SCT ON U.id = SCT.id_student AND SCT.id_service = 3 LEFT JOIN show_documents as SD ON U.id = SD.id_student LEFT JOIN cvuser_roles.licence as LM ON U.id = LM.id_user AND LM.id_module = 35

					WHERE U.id_tipo_usuario = '$type_users' AND U.id_perfil = 3 AND U.id_estado IN (0,1) AND U.matriculado IN (0,1) AND U.id_grado LIKE '$id_grade' AND U.curso LIKE '$id_course' AND U.nombres LIKE '%$names%' AND U.apellidos LIKE '%$last_names%'

					ORDER BY G.id_grado, C.id, names"; 

        	$query = mysql_query($sql,$link);

	        // print_r($sql);

	        if(mysql_num_rows($query)>0){

	            while($data = mysql_fetch_assoc($query)){

	             	array_push($result, array("id_student" => $data["id_student"], "names" => $data["names"],"course" => $data["course"], "alternation" => $data["alternation"], "group_alternation" => $data["group_alternation"], "alternation_prev" => $data["alternation_prev"], "group_alternation_prev" => $data["group_alternation_prev"], "half_nines_ant" => $data["half_nines_ant"], "launch_ant" => $data["launch_ant"], "transport_ant" => $data["transport_ant"], "half_nines_actual" => $data["half_nines_actual"], "launch_actual" => $data["launch_actual"], "transport_actual" => $data["transport_actual"], "half_nines_first" => $data["half_nines_first"], "launch_first" => $data["launch_first"], "transport_first" => $data["transport_first"], "half_nines_contract" => $data["half_nines_contract"], "launch_contract" => $data["launch_contract"], "transport_contract" => $data["transport_contract"], "half_nines_other_yes" => $data["half_nines_other_yes"], "launch_other_yes" => $data["launch_other_yes"], "transport_other_yes" => $data["transport_other_yes"], "informed_consent" => $data["informed_consent"], "act_module" => $data["act_module"]));

	            }

	        }

	        else {

	        	array_push($result,300);

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}



	function updateService($base,$id_student,$service,$status){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        if ($service == 1) {

        		/*$sql = "INSERT INTO cvuser_comunidadvirtual.medias_nueves (id, tipo, date_in) VALUES ($id_student, $status, NOW()) 

        				ON DUPLICATE KEY UPDATE tipo = $status";*/

        		$sql = "INSERT INTO show_contracts(id_student, id_service, status)

        				VALUES ($id_student, $service, $status)

        				ON DUPLICATE KEY UPDATE status = $status";

	        }

	        else if ($service == 2) {

        		// $sql = "UPDATE mat_serviciosEstuNuevoAno SET estado = $status WHERE id = $id_student AND id_tipo_servicio = $service";

        		$sql = "INSERT INTO show_contracts(id_student, id_service, status)

        				VALUES ($id_student, $service, $status)

        				ON DUPLICATE KEY UPDATE status = $status";

	        }

	        else if ($service == 3) {

        		// $sql = "UPDATE alternation_mode SET transport = $status WHERE id_student = $id_student";

        		$sql = "INSERT INTO show_contracts(id_student, id_service, status)

        				VALUES ($id_student, $service, $status)

        				ON DUPLICATE KEY UPDATE status = $status";

	        }

	        else if ($service == "alternation") {

        		if ($status == 1) {

        			$sql = "INSERT INTO alternation_mode(id_student, transport) VALUES ($id_student,0)";

        		}

        		else {

        			$sql = "DELETE FROM alternation_mode WHERE id_student = $id_student";

        		}

        		$service = 5;

	        }

        	// $sql = "";

        	$query = mysql_query($sql,$link);

	        if(mysql_affected_rows() > 0){

	        	array_push($result,200);

	        	$sql_audit = "INSERT INTO audit_contracts(id_user, id_student, id_service, description_audit, date_audit) 

        					VALUES ($id, $id_student, $service, 'Se ha realizado la modificación de mostrar el contrato del servicio y se ha cambiado al estado $status.', NOW())";

        		$query_audit = mysql_query($sql_audit,$link);

	        }

	        else {

	        	array_push($result,300);

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}



	function updateOther($base,$id_student,$service,$status){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        if ($service >= 1 && $service <= 3) {

	        	$sql = "INSERT INTO show_contracts(id_student, id_service, status, other_yes)

	    				VALUES ($id_student, $service, 0, $status) 

	    				ON DUPLICATE KEY UPDATE other_yes = $status";

	        }

	        else if ($service == "informed_consent" || $service == "registration_sheet") {

	        	// $service = ($service == "informed_consent")?"informed_consent":"registration_sheet";

	        	$sql = "INSERT INTO show_documents(id_student, $service)

	    				VALUES ($id_student, $status) 

	    				ON DUPLICATE KEY UPDATE $service = $status";

	        }

	        else if ($service == "act_module") {

	        	// $service = ($service == "informed_consent")?"informed_consent":"registration_sheet";

	        	$sql = "INSERT INTO cvuser_roles.licence(id_module, id_action, id_user, status, status_student)

	    				VALUES (35, 1, $id_student, $status, 0) 

	    				ON DUPLICATE KEY UPDATE status = $status";

	        }

    		// print_r($sql);

        	$query = mysql_query($sql,$link);

	        if(mysql_affected_rows() > 0){

	        	array_push($result,200);

	        	$sql_audit = "INSERT INTO audit_contracts(id_user, id_student, id_service, description_audit, date_audit) 

        					VALUES ($id, $id_student, $service, 'Se ha realizado la modificación de mostrar el otro sí del servicio y se ha cambiado al estado $status.', NOW())";

        		$query_audit = mysql_query($sql_audit,$link);

	        }

	        else {

	        	array_push($result,300);

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}



	function updateGroupAlternation($base,$id_student,$status){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

    		$sql = "INSERT INTO groups_alternation (id_student, group_alternation) 

    				VALUES ($id_student, $status)

    				ON DUPLICATE KEY UPDATE group_alternation = $status";

        	$query = mysql_query($sql,$link);

	        if(mysql_affected_rows() > 0){

	        	array_push($result,200);

	        }

	        else {

	        	array_push($result,300);

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}


	function getTipoRazon($base){
		try {
	        $link = conectar_db($base);
	        $result =array();
	        $id = $_SESSION["id"];
	        $procedure = "SELECT * FROM `mat_tipo_razonService` ORDER BY `id` ASC"; 
	        $query = mysql_query($procedure,$link);
	        if(mysql_num_rows($query)>0){
	            while($data = mysql_fetch_assoc($query)){
	             	array_push($result, array("id" => $data["id"], "motivo" => $data["motivo"]));
	            }
	        }
	        else {
	        	array_push($result, false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}


	
	function uppServiceMotive($base,$half_nines,$launch,$transport,$datos_mediasnueves,$datos_alimento,$datos_transporte,$checkmediasnueves_6,$checkalmuerzo_6,$checktransporte_6,$reason_poliza_seguro,$accident_insurance){
		try {
	        $link = conectar_db($base);
	        $result =array();
	        $id = $_SESSION["id"];
			$dataTransporte = implode(",", $datos_transporte);
			$dataMediasNueves = implode(",", $datos_mediasnueves);
			$dataAlimento = implode(",", $datos_alimento);
			$procedure = "CALL updateServicesRazon($launch,$transport,'$dataAlimento','$dataTransporte',$id,'$checkalmuerzo_6','$checktransporte_6','$reason_poliza_seguro', '$accident_insurance', '$half_nines', '$dataMediasNueves', '$checkmediasnueves_6')";
	        $query = mysql_query($procedure,$link);
	        if(mysql_num_rows($query)>0){
	            while($data = mysql_fetch_assoc($query)){
	             	array_push($result,true);
	            }
	        }
			

	        else {
	        	array_push($result, false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}



	
	function updateCustody($base,$peatona_person_m,$peatona_person_p){
		try {
	        $link = conectar_db($base);
	        $result =array();
	        $id = $_SESSION["id"];
			$tip_madre = ($peatona_person_m == "Si" || $peatona_person_m == "")?1:0;
			$tip_padre = ($peatona_person_p == "Si" || $peatona_person_p == "")?1:0;
	        $procedurePadre = "INSERT INTO mat_permis_peatonal(id, tipo_papa, estado) 
							VALUES ($id,'1','$tip_padre')
							ON DUPLICATE KEY UPDATE tipo_papa = '1', estado = '$tip_padre'"; 
			$procedureMadre = "INSERT INTO mat_permis_peatonal(id, tipo_papa, estado) 
							VALUES ($id,'2','$tip_madre')
							ON DUPLICATE KEY UPDATE tipo_papa = '2', estado = '$tip_madre'"; 
	        $queryPadre = mysql_query($procedurePadre,$link);
			$queryMadre = mysql_query($procedureMadre,$link);
	        if(mysql_affected_rows()>0){
	        	array_push($result,true);
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}
	
	function delete_Documento($base,$consec,$requisito){
		try{
			$link = conectar_db($base);
			$result = array();
			$proced_indicators = "DELETE FROM `mat_docStudent` WHERE `id`= '$consec'";
			$query_indicators = mysql_query($proced_indicators, $link);
			if(mysql_affected_rows()>0){
				array_push($result,array("cod_valid"=>true));
			}
			else{
				array_push($result, array("cod_valid"=>false));	
			}
			mysql_close($link);
			return response($result);
		}catch(Exception $e) {
			$error = $e->getMessage();
			return array('error'=>'hubo un error en el servidor','descripcion'=>$error);
		}	
	}

	function get_update_files($base,$fileDoc){
		try {
			$link = conectar_db($base);
			$result =array();
			$id = $_SESSION["id"];
			/* $array = [1 => "FOTO",2 => "REGISTRO_CIVIL",3=> "BOLETIN_ACADEMICO",4=> "BOLETIN",5=> "CERTIFICADO_ACADEMICOS",6=> "CERTIFICADO_CONDUCTA",7=> "RECIBO"]; 
			$separador = " ";
			$estudiante = explode($separador, $student); */
			if ($fileDoc["cod_valid"]==200){
				$file= $fileDoc["url"];
				$archivo = 'Documento_'.$id;
				$sql= "INSERT INTO `mat_docStudent`( `id`, `file`, `name_file`, `data_registro`) 
				VALUES ($id,'$file','$archivo',CURDATE())
				ON DUPLICATE KEY UPDATE
			    file = '$file', name_file = '$archivo' ,data_registro = CURDATE()";
				$query = mysql_query($sql,$link);
				if(mysql_affected_rows()>0){
						
					$sql1= "select id,name_file as nombre_archivo,file as archivo from mat_docStudent where id=$id";
					$query1 = mysql_query($sql1,$link);
					if(mysql_num_rows($query1)>0){
						while($data = mysql_fetch_assoc($query1)){
							array_push($result,array("cod_valid"=>200,"id"=>$data['id'],"nombre_archivo"=>$data['nombre_archivo'],"archivo"=>$data['archivo']));
						}
					}
				}
				else {
					array_push($result,array("cod_valid"=>500,"mess"=>$fileDoc["Mensaje"]));
				}
			}else {
				array_push($result,array("cod_valid"=>$fileDoc["cod_valid"],"mess"=> $fileDoc["Mensaje"]));
			}	
			mysql_close($link);
			return response($result);
		}catch (Exception $e) {
			$error = $e->getMessage();
			return array('code'=>500,'response'=>$error);
		}
	}

	function get_update_fileCustodia($base,$fileDoc){
		try {
			$link = conectar_db($base);
			$result =array();
			$id = $_SESSION["id"];
			/* $array = [1 => "FOTO",2 => "REGISTRO_CIVIL",3=> "BOLETIN_ACADEMICO",4=> "BOLETIN",5=> "CERTIFICADO_ACADEMICOS",6=> "CERTIFICADO_CONDUCTA",7=> "RECIBO"]; 
			$separador = " ";
			$estudiante = explode($separador, $student); */
			if ($fileDoc["cod_valid"]==200){
				$file= $fileDoc["url"];
				$archivo = 'Documento_'.$id;
				$sql= "INSERT INTO `mat_documentCustodia`( `id`, `file`, `name_file`, `data_registro`) 
				VALUES ($id,'$file','$archivo',CURDATE())";
				$query = mysql_query($sql,$link);
			}else {
				array_push($result,array("cod_valid"=>$fileDoc["cod_valid"],"mess"=> $fileDoc["Mensaje"]));
			}	
			mysql_close($link);
			return response($result);
		}catch (Exception $e) {
			$error = $e->getMessage();
			return array('code'=>500,'response'=>$error);
		}
	}

	function updateDeptoBienestarData($base,$depto_bienestar){
		try {
	        $link = conectar_db($base);
	        $result =array();
	        $id = $_SESSION["id"];
			$bienestar = ($depto_bienestar == "1")?1:0;
			$procedure = "INSERT INTO mat_deptoBienestar(id,enterado) 
	        				VALUES ('$id','$depto_bienestar')
							ON DUPLICATE KEY UPDATE id = '$id', enterado = '$bienestar'"; 
	        	$query = mysql_query($procedure,$link);
	        if(mysql_affected_rows()>0){
	        	array_push($result,true);
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}	


	
	function getTypeEtnia($base){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $procedure = "SELECT id,descripcion FROM mat_tipo_etnia WHERE estado = 1 "; 

	        $query = mysql_query($procedure,$link);

         

	        if(mysql_num_rows($query)>0){

	            while($data = mysql_fetch_assoc($query)){

	             	array_push($result, array("id" => $data["id"], "description" => $data["descripcion"]));

	            }

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}

	function updateEtniaData($base,$selecgroup_etnico){
		try {
	        $link = conectar_db($base);
	        $result =array();
	        $id = $_SESSION["id"];
			$procedure = "INSERT INTO `mat_etnia` (`id`, `id_etnia`) VALUES ('$id', '$selecgroup_etnico')
							ON DUPLICATE KEY UPDATE id = '$id', id_etnia = '$selecgroup_etnico'"; 
	        	$query = mysql_query($procedure,$link);
	        if(mysql_affected_rows()>0){
	        	array_push($result,true);
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function updateRuta_acudiente($base,$sale_solo,$Nombre_ps,$Cedula_ps,$Telefono_ps){
		try {
	        $link = conectar_db($base);
	        $result =array();
	        $id = $_SESSION["id"];
			$procedure = "INSERT INTO `estudianteAcudiente_ruta` ( `id_student`,`sale_solo`, `Nombre_ps`, `Cedula_ps`, `Telefono_ps`, `date`) VALUES ('$id','$sale_solo', '$Nombre_ps', '$Cedula_ps', '$Telefono_ps', NOW())
			ON DUPLICATE KEY UPDATE id_student = '$id', sale_solo = '$sale_solo', Nombre_ps = '$Nombre_ps', Cedula_ps = '$Cedula_ps', Telefono_ps = '$Telefono_ps', date = NOW()"; 
	        	$query = mysql_query($procedure,$link);
	        if(mysql_affected_rows()>0){
	        	array_push($result,true);
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}


	function updateCancelServices($base,$alimentos,$motivoAlimentos,$transporte,$motivoTransporte,$MediasNueves,$motivoMedias){

		try {

	        $link = conectar_db($base);

	        $result =array();

	        $id = $_SESSION["id"];

	        $procedure = "INSERT INTO `mat_cancelServices` (`id_usuario`, `date`, `Alimentos`, `motivoAlimento`, `Transporte`, `motivoTransporte`, `MediasNueves`, `motivoMedias`,`bloqueo`)
			 VALUES ('$id', NOW(), '$alimentos', '$motivoAlimentos', '$transporte', '$motivoTransporte', '$MediasNueves', '$motivoMedias','1') 
			 ON DUPLICATE KEY UPDATE id_usuario = '$id', date = NOW(), Alimentos = '$alimentos', motivoAlimento = '$motivoAlimentos', Transporte = '$transporte', motivoTransporte = '$motivoTransporte', MediasNueves = '$MediasNueves', motivoMedias = '$motivoMedias', bloqueo = '1'"; 

	        $query = mysql_query($procedure,$link);

	        if(mysql_affected_rows()>0){

	        	array_push($result,true);

	        }
	        else {

	        	array_push($result,false);

	        }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	}	


function getemailentryform($base, $consecutivo) {
	$resultado = array();
	$mail = new PHPMailer(true);
	$id = $_SESSION["id"];
	$meses = array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
	
	try {
		$mesActual = date('d') . " de " . $meses[date('n')-1] . " del " . date('Y');

		// Consulta para obtener la información del usuario
		$consultaUsuario = "SELECT CS.*, U.nombres, U.apellidos, G.descripcion AS grado, m.p_nombre AS n_mama,m.p_apellido AS a_mama,m.celular AS c_mama,m.email AS e_mama, p.p_nombre,p.p_apellido,p.celular,p.email, Cus.custodia
		FROM `mat_cancelServices` as CS 
		LEFT JOIN usuarios as U ON CS.id_usuario = U.id 
		LEFT JOIN grados AS G ON U.id_grado = G.id_grado 
		LEFT JOIN mat_papas AS m on m.id = U.id AND m.tipo_papa = 2
		LEFT JOIN mat_papas AS p on p.id = U.id AND p.tipo_papa = 1
		LEFT JOIN mat_estado_civil as Cus ON  Cus.id = U.id WHERE id_usuario = $id";
		
		// Ejecución de la consulta
		$link = conectar_db($base);
		$query = mysql_query($consultaUsuario, $link);
		
		if (mysql_num_rows($query) > 0) {
			while ($data = mysql_fetch_assoc($query)) {
				// Datos del usuario
				$id_usuario = $data['id_usuario'];
				$timestamp = strtotime($data['date']);
				$Alimentos = $data['Alimentos'];
				$motivoAlimento = $data['motivoAlimento'];
				$Transporte = $data['Transporte'];
				$motivoTransporte = $data['motivoTransporte'];
				$bloqueo = $data['bloqueo'];
				$nombre_mama = $data['n_mama'] . '  ' . $data['a_mama'];
				$nombre_papa = $data['p_nombre'] . '  ' . $data['p_apellido'];
				$nombre_estudiante = $data['nombres'] . '  ' . $data['apellidos'];
				$grado = $data['grado'];
				$c_mama = $data['c_mama'];
				$e_mama = $data['e_mama'];
				$celular = $data['celular'];
				$email = $data['email'];
				$custodia = $data['custodia'];
				$Compartida = "Compartida";
				if (empty($custodia)) {
					$Compartida = "Compartida";
				} else {
					$Compartida = $custodia;
				}
				


				setlocale(LC_TIME, 'es_ES');
				// Obtiene el nombre del día de la semana (por ejemplo, "miércoles")
				$n_dia = strftime("%w", $timestamp);
				$dia=$dias[$n_dia];
				// Formato largo en español con el día
				$fechaEntrevista = strftime(" %e de %B de %Y", $timestamp);
				// Convertir la hora a formato de 12 horas con AM/PM
				$horaEntrevista = date('g:i a', strtotime($data['hora_entrev']));
				
				// Asunto del correo
				$asunto = "Cancelación de Alimentos y bebidas";
				$cuerpo = '';
				$cuerpo .= '<div  style="max-width: 800px; margin: 0 auto; background-color: #fff; padding: 20px; border: 1px solid #ddd; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">';
				$cuerpo .= '<tbody>';
				$cuerpo .= '<tr>';
				$cuerpo .= '<td><img src="cid:bannerPad" alt="mail image" width="800px" height="auto" border="0" /></td>';
				$cuerpo .= '</tr>'; 
				$cuerpo .= '<tr>';
				$cuerpo .= '<td style="text-align: center; padding: 30px;">';
				$cuerpo .= '<h3 align="justify" style="font-size: 16px;"><strong>Bogotá, ' . $mesActual . '</strong></h3>';
				$cuerpo .= '<p style="text-align: right; font-size: 18px;"><strong>Asunto: Cancelación de Almuerzo</strong></p>';
				$cuerpo .= '<p style="font-size: 15px; text-align: justify;">Estimada coordinadora,</p>';
				$cuerpo .= '<p style="font-size: 15px; text-align: justify;"><strong>Estudiante: ' . $nombre_estudiante . '</strong></p>';
				$cuerpo .= '<p style="font-size: 15px; text-align: justify;"><strong>Grado : ' . $grado . '</strong></p>';
				$cuerpo .= '<p style="font-size: 15px; text-align: justify;"><strong>Motivo:</strong></p>';
				$cuerpo .= '<p style="font-size: 15px; text-align: justify;">' . $motivoAlimento .'</p>';
				$cuerpo .= '<p style="font-size: 15px; text-align: justify;"><strong>INFORMACIÓN DEL ESTUDIANTE</strong></p>';
				$cuerpo .= '<p style="font-size: 15px; text-align: justify;">Custodia: ' . $Compartida .'</p>';
				$cuerpo .= '<ul>';
				$cuerpo .= '<li><strong>Nombre de la madre :&nbsp;</strong>' . $nombre_mama .'</li>';
				$cuerpo .= '<li><strong>N&uacute;mero celular :</strong>' . $c_mama . '</li>';
				$cuerpo .= '<li><strong>Correo electronico :</strong>' . $e_mama . '</li>';
				$cuerpo .= '</ul>';
				$cuerpo .= '<hr class="hr" />';
				$cuerpo .= '<ul>';
				$cuerpo .= '<li><strong>Nombre del padre :<br /></strong>' . $nombre_papa . '</li>';
				$cuerpo .= '<li><strong>N&uacute;mero celular :</strong>' . $celular  . '</li>';
				$cuerpo .= '<li><strong>Correo electronico :</strong>' . $email . '</li>';
				$cuerpo .= '</ul>';
				$cuerpo .= '<ul>';
				$cuerpo .= '</ul>';
				$cuerpo .= '<table class="table" style="max-width: 700px; width: 700px; align="justify" ><tbody><tr>';
				$cuerpo .= '<td>';
				$cuerpo .= '</ol> ';
				$cuerpo .= '</td></tr>';
				$cuerpo .= '</tbody></table>';
				$cuerpo .= '</td>';
				$cuerpo .= '</tr>';
				$cuerpo .= '<tr>';
				$cuerpo .= '<td><img src="cid:footerPad" alt="mail image" width="800px" height="auto" border="0" /></td>';
				$cuerpo .= '</tr>'; 
				$cuerpo .= '</tbody>';
				$cuerpo .= '</div>';

				// Cuerpo del correo
				$body = $cuerpo;

			

				// Configuración del servidor SMTP
				$mail->addCustomHeader('Mime-Version', '1.0');
				$mail->addCustomHeader('Content-Type', 'text/html; charset=ISO-8859-1');
				$mail->isSMTP();
				$mail->Host = 'smtp.office365.com';
				$mail->SMTPAuth = true;
				$mail->Username = 'novedadservicio@caa.edu.co';
				$mail->Password = 'cccc2025@';
				$mail->SMTPSecure = 'tls';
				$mail->Port = 587;

				// Remitente y destinatarios
				$mail->setFrom('novedadservicio@caa.edu.co', 'Colegio Anglo Americano');
				$mail->addAddress('admonpria@caa.edu.co', 'Coordinadora alimentos');

				$mail->addCC('cristian.martinez@caa.edu.co');
				$mail->addCC('sistemas@angloamericanobogota.edu.co');
				$mail->addCC('luzstella.bejarano@angloamericanobogota.edu.co');
/* 						$mail->addCC('admisionesymatriculas@caa.edu.co');
*/		
				// Envío del correo
				$mail->isHTML(true);
				$mail->AddEmbeddedImage('../images/bannerCorreo.png', 'bannerPad', 'encabezado1', 'base64', 'image/jpeg');
				$mail->AddEmbeddedImage('../images/pieCorreo.png', 'footerPad', 'pie pagina1', 'base64', 'image/jpeg');
			 
				$mail->Subject = $asunto;
				$mail->CharSet = 'UTF-8';
				$mail->Body = $body;

				if (!$mail->send()) {
					array_push($resultado, false);
				} else {
					array_push($resultado, true);
				}

				// Limpiar destinatarios
				$mail->ClearAllRecipients();
			}
		}
		return response($resultado);

	} catch (Exception $e) {
		$error = $e->getMessage();
		return array('code' => 500, 'response' => $error);
	}
}



	function getemailTransporte($base, $consecutivo) {
		$resultado = array();
		$mail = new PHPMailer(true);
		$id = $_SESSION["id"];
		$meses = array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
		
		try {
			$mesActual = date('d') . " de " . $meses[date('n')-1] . " del " . date('Y');
	
			// Consulta para obtener la información del usuario
			$consultaUsuario = "SELECT CS.*, U.nombres, U.apellidos, G.descripcion AS grado, m.p_nombre AS n_mama,m.p_apellido AS a_mama,m.celular AS c_mama,m.email AS e_mama, p.p_nombre,p.p_apellido,p.celular,p.email, Cus.custodia
			FROM `mat_cancelServices` as CS 
			LEFT JOIN usuarios as U ON CS.id_usuario = U.id 
			LEFT JOIN grados AS G ON U.id_grado = G.id_grado 
			LEFT JOIN mat_papas AS m on m.id = U.id AND m.tipo_papa = 2
			LEFT JOIN mat_papas AS p on p.id = U.id AND p.tipo_papa = 1
			LEFT JOIN mat_estado_civil as Cus ON  Cus.id = U.id WHERE id_usuario = $id";
			
			// Ejecución de la consulta
			$link = conectar_db($base);
			$query = mysql_query($consultaUsuario, $link);
			
			if (mysql_num_rows($query) > 0) {
				while ($data = mysql_fetch_assoc($query)) {
					// Datos del usuario
					$id_usuario = $data['id_usuario'];
					$timestamp = strtotime($data['date']);
					$Alimentos = $data['Alimentos'];
					$motivoAlimento = $data['motivoAlimento'];
					$Transporte = $data['Transporte'];
					$motivoTransporte = $data['motivoTransporte'];
					$bloqueo = $data['bloqueo'];
					$nombre_mama = $data['n_mama'] . '  ' . $data['a_mama'];
					$nombre_papa = $data['p_nombre'] . '  ' . $data['p_apellido'];
					$nombre_estudiante = $data['nombres'] . '  ' . $data['apellidos'];
					$grado = $data['grado'];
					$c_mama = $data['c_mama'];
					$e_mama = $data['e_mama'];
					$celular = $data['celular'];
					$email = $data['email'];
					$custodia = $data['custodia'];
					$Compartida = "Compartida";
					if (empty($custodia)) {
						$Compartida = "Compartida";
					} else {
						$Compartida = $custodia;
					}
					


					setlocale(LC_TIME, 'es_ES');
					// Obtiene el nombre del día de la semana (por ejemplo, "miércoles")
					$n_dia = strftime("%w", $timestamp);
					$dia=$dias[$n_dia];
					// Formato largo en español con el día
					$fechaEntrevista = strftime(" %e de %B de %Y", $timestamp);
					// Convertir la hora a formato de 12 horas con AM/PM
					$horaEntrevista = date('g:i a', strtotime($data['hora_entrev']));
					
					// Asunto del correo
					$asunto = "Cancelación de Transporte";
					$cuerpo = '';
					$cuerpo .= '<div  style="max-width: 800px; margin: 0 auto; background-color: #fff; padding: 20px; border: 1px solid #ddd; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">';
					$cuerpo .= '<tbody>';
					$cuerpo .= '<tr>';
					$cuerpo .= '<td><img src="cid:bannerPad" alt="mail image" width="800px" height="auto" border="0" /></td>';
					$cuerpo .= '</tr>'; 
					$cuerpo .= '<tr>';
					$cuerpo .= '<td style="text-align: center; padding: 30px;">';
					$cuerpo .= '<h3 align="justify" style="font-size: 16px;"><strong>Bogotá, ' . $mesActual . '</strong></h3>';
					$cuerpo .= '<p style="text-align: right; font-size: 18px;"><strong>Asunto: Cancelación de servicio transporte</strong></p>';
					$cuerpo .= '<p style="font-size: 15px; text-align: justify;">Estimada coordinadora,</p>';
					$cuerpo .= '<p style="font-size: 15px; text-align: justify;"><strong>Estudiante: ' . $nombre_estudiante . '</strong></p>';
					$cuerpo .= '<p style="font-size: 15px; text-align: justify;"><strong>Grado : ' . $grado . '</strong></p>';
					$cuerpo .= '<p style="font-size: 15px; text-align: justify;"><strong>Motivo:</strong></p>';
					$cuerpo .= '<p style="font-size: 15px; text-align: justify;">' . $motivoTransporte .'</p>';
					$cuerpo .= '<p style="font-size: 15px; text-align: justify;"><strong>INFORMACIÓN DEL ESTUDIANTE</strong></p>';
					$cuerpo .= '<p style="font-size: 15px; text-align: justify;">Custodia: ' . $Compartida .'</p>';
					$cuerpo .= '<ul>';
					$cuerpo .= '<li><strong>Nombre de la madre :&nbsp;</strong>' . $nombre_mama .'</li>';
					$cuerpo .= '<li><strong>N&uacute;mero celular :</strong>' . $c_mama . '</li>';
					$cuerpo .= '<li><strong>Correo electronico :</strong>' . $e_mama . '</li>';
					$cuerpo .= '</ul>';
					$cuerpo .= '<hr class="hr" />';
					$cuerpo .= '<ul>';
					$cuerpo .= '<li><strong>Nombre del padre :<br /></strong>' . $nombre_papa . '</li>';
					$cuerpo .= '<li><strong>N&uacute;mero celular :</strong>' . $celular  . '</li>';
					$cuerpo .= '<li><strong>Correo electronico :</strong>' . $email . '</li>';
					$cuerpo .= '</ul>';
					$cuerpo .= '<ul>';
					$cuerpo .= '</ul>';
					$cuerpo .= '<table class="table" style="max-width: 700px; width: 700px; align="justify" ><tbody><tr>';
					$cuerpo .= '<td>';
					$cuerpo .= '</ol> ';
					$cuerpo .= '</td></tr>';
					$cuerpo .= '</tbody></table>';
					$cuerpo .= '</td>';
					$cuerpo .= '</tr>';
					$cuerpo .= '<tr>';
					$cuerpo .= '<td><img src="cid:footerPad" alt="mail image" width="800px" height="auto" border="0" /></td>';
					$cuerpo .= '</tr>'; 
					$cuerpo .= '</tbody>';
					$cuerpo .= '</div>';
	
					// Cuerpo del correo
					$body = $cuerpo;
	
				
	
					// Configuración del servidor SMTP
					$mail->addCustomHeader('Mime-Version', '1.0');
					$mail->addCustomHeader('Content-Type', 'text/html; charset=ISO-8859-1');
					$mail->isSMTP();
					$mail->Host = 'smtp.office365.com';
					$mail->SMTPAuth = true;
					$mail->Username = 'novedadservicio@caa.edu.co';
					$mail->Password = 'cccc2025@';
					$mail->SMTPSecure = 'tls';
					$mail->Port = 587;
	
					// Remitente y destinatarios
					$mail->setFrom('novedadservicio@caa.edu.co', 'Colegio Anglo Americano');
					$mail->addAddress('transporte@caa.edu.co', 'Coordinadora');

					$mail->addCC('sistemas@angloamericanobogota.edu.co');
					$mail->addCC('luzstella.bejarano@angloamericanobogota.edu.co');
					$mail->addCC('cristian.martinez@caa.edu.co');
/* 						$mail->addCC('admisionesymatriculas@caa.edu.co');
*/		
					// Envío del correo
					$mail->isHTML(true);
					$mail->AddEmbeddedImage('../images/bannerCorreo.png', 'bannerPad', 'encabezado1', 'base64', 'image/jpeg');
					$mail->AddEmbeddedImage('../images/pieCorreo.png', 'footerPad', 'pie pagina1', 'base64', 'image/jpeg');
				 
					$mail->Subject = $asunto;
					$mail->CharSet = 'UTF-8';
					$mail->Body = $body;
	
					if (!$mail->send()) {
						array_push($resultado, false);
					} else {
						array_push($resultado, true);
					}
	
					// Limpiar destinatarios
					$mail->ClearAllRecipients();
				}
			}
			return response($resultado);
	
		} catch (Exception $e) {
			$error = $e->getMessage();
			return array('code' => 500, 'response' => $error);
		}
	}


	function getPendienteServicio($base){
		try {
	        $link = conectar_db($base);
	        $result =array();
	        $id = $_SESSION["id"];
	        $procedure = "SELECT * FROM `mat_cancelServices` WHERE id_usuario = $id"; 
	        $query = mysql_query($procedure,$link);
	        if(mysql_num_rows($query)>0){
	            while($data = mysql_fetch_assoc($query)){
	             	array_push($result, array("id_usuario" => $data["id_usuario"], "date" => $data["date"], "Alimentos" => $data["Alimentos"], "motivoAlimento" => $data["motivoAlimento"], "Transporte" => $data["Transporte"], "motivoTransporte" => $data["motivoTransporte"], "bloqueo" => $data["bloqueo"]));
	            }
	        }
	        else {
	        	array_push($result, false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}
	

	function getemailmedias($base, $consecutivo) {
		$resultado = array();
		$mail = new PHPMailer(true);
		$id = $_SESSION["id"];
		$meses = array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
		
		try {
			$mesActual = date('d') . " de " . $meses[date('n')-1] . " del " . date('Y');
	
			// Consulta para obtener la información del usuario
			$consultaUsuario = "SELECT CS.*, U.nombres, U.apellidos, G.descripcion AS grado, m.p_nombre AS n_mama,m.p_apellido AS a_mama,m.celular AS c_mama,m.email AS e_mama, p.p_nombre,p.p_apellido,p.celular,p.email, Cus.custodia
			FROM `mat_cancelServices` as CS 
			LEFT JOIN usuarios as U ON CS.id_usuario = U.id 
			LEFT JOIN grados AS G ON U.id_grado = G.id_grado 
			LEFT JOIN mat_papas AS m on m.id = U.id AND m.tipo_papa = 2
			LEFT JOIN mat_papas AS p on p.id = U.id AND p.tipo_papa = 1
			LEFT JOIN mat_estado_civil as Cus ON  Cus.id = U.id WHERE id_usuario = $id";
			
			// Ejecución de la consulta
			$link = conectar_db($base);
			$query = mysql_query($consultaUsuario, $link);
			
			if (mysql_num_rows($query) > 0) {
				while ($data = mysql_fetch_assoc($query)) {
					// Datos del usuario
					$id_usuario = $data['id_usuario'];
					$timestamp = strtotime($data['date']);
					$Alimentos = $data['Alimentos'];
					$motivoAlimento = $data['motivoAlimento'];
					$Transporte = $data['Transporte'];
					$motivoTransporte = $data['motivoTransporte'];
					$motivoMedias = $data['motivoMedias'];
					$bloqueo = $data['bloqueo'];
					$nombre_mama = $data['n_mama'] . '  ' . $data['a_mama'];
					$nombre_papa = $data['p_nombre'] . '  ' . $data['p_apellido'];
					$nombre_estudiante = $data['nombres'] . '  ' . $data['apellidos'];
					$grado = $data['grado'];
					$c_mama = $data['c_mama'];
					$e_mama = $data['e_mama'];
					$celular = $data['celular'];
					$email = $data['email'];
					$custodia = $data['custodia'];
					$Compartida = "Compartida";
					if (empty($custodia)) {
						$Compartida = "Compartida";
					} else {
						$Compartida = $custodia;
					}
					
	
	
					setlocale(LC_TIME, 'es_ES');
					// Obtiene el nombre del día de la semana (por ejemplo, "miércoles")
					$n_dia = strftime("%w", $timestamp);
					$dia=$dias[$n_dia];
					// Formato largo en español con el día
					$fechaEntrevista = strftime(" %e de %B de %Y", $timestamp);
					// Convertir la hora a formato de 12 horas con AM/PM
					$horaEntrevista = date('g:i a', strtotime($data['hora_entrev']));
					
					// Asunto del correo
					$asunto = "Cancelación de Medias nueves";
					$cuerpo = '';
					$cuerpo .= '<div  style="max-width: 800px; margin: 0 auto; background-color: #fff; padding: 20px; border: 1px solid #ddd; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">';
					$cuerpo .= '<tbody>';
					$cuerpo .= '<tr>';
					$cuerpo .= '<td><img src="cid:bannerPad" alt="mail image" width="800px" height="auto" border="0" /></td>';
					$cuerpo .= '</tr>'; 
					$cuerpo .= '<tr>';
					$cuerpo .= '<td style="text-align: center; padding: 30px;">';
					$cuerpo .= '<h3 align="justify" style="font-size: 16px;"><strong>Bogotá, ' . $mesActual . '</strong></h3>';
					$cuerpo .= '<p style="text-align: right; font-size: 18px;"><strong>Asunto: Cancelación de Medias nueves</strong></p>';
					$cuerpo .= '<p style="font-size: 15px; text-align: justify;">Estimada coordinadora,</p>';
					$cuerpo .= '<p style="font-size: 15px; text-align: justify;"><strong>Estudiante: ' . $nombre_estudiante . '</strong></p>';
					$cuerpo .= '<p style="font-size: 15px; text-align: justify;"><strong>Grado : ' . $grado . '</strong></p>';
					$cuerpo .= '<p style="font-size: 15px; text-align: justify;"><strong>Motivo:</strong></p>';
					$cuerpo .= '<p style="font-size: 15px; text-align: justify;">' . $motivoMedias .'</p>';
					$cuerpo .= '<p style="font-size: 15px; text-align: justify;"><strong>INFORMACIÓN DEL ESTUDIANTE</strong></p>';
					$cuerpo .= '<p style="font-size: 15px; text-align: justify;">Custodia: ' . $Compartida .'</p>';
					$cuerpo .= '<ul>';
					$cuerpo .= '<li><strong>Nombre de la madre :&nbsp;</strong>' . $nombre_mama .'</li>';
					$cuerpo .= '<li><strong>N&uacute;mero celular :</strong>' . $c_mama . '</li>';
					$cuerpo .= '<li><strong>Correo electronico :</strong>' . $e_mama . '</li>';
					$cuerpo .= '</ul>';
					$cuerpo .= '<hr class="hr" />';
					$cuerpo .= '<ul>';
					$cuerpo .= '<li><strong>Nombre del padre :<br /></strong>' . $nombre_papa . '</li>';
					$cuerpo .= '<li><strong>N&uacute;mero celular :</strong>' . $celular  . '</li>';
					$cuerpo .= '<li><strong>Correo electronico :</strong>' . $email . '</li>';
					$cuerpo .= '</ul>';
					$cuerpo .= '<ul>';
					$cuerpo .= '</ul>';
					$cuerpo .= '<table class="table" style="max-width: 700px; width: 700px; align="justify" ><tbody><tr>';
					$cuerpo .= '<td>';
					$cuerpo .= '</ol> ';
					$cuerpo .= '</td></tr>';
					$cuerpo .= '</tbody></table>';
					$cuerpo .= '</td>';
					$cuerpo .= '</tr>';
					$cuerpo .= '<tr>';
					$cuerpo .= '<td><img src="cid:footerPad" alt="mail image" width="800px" height="auto" border="0" /></td>';
					$cuerpo .= '</tr>'; 
					$cuerpo .= '</tbody>';
					$cuerpo .= '</div>';
	
					// Cuerpo del correo
					$body = $cuerpo;
	
				
	
					// Configuración del servidor SMTP
					$mail->addCustomHeader('Mime-Version', '1.0');
					$mail->addCustomHeader('Content-Type', 'text/html; charset=ISO-8859-1');
					$mail->isSMTP();
					$mail->Host = 'smtp.office365.com';
					$mail->SMTPAuth = true;
					$mail->Username = 'novedadservicio@caa.edu.co';
					$mail->Password = 'cccc2025@';
					$mail->SMTPSecure = 'tls';
					$mail->Port = 587;
	
					// Remitente y destinatarios
					$mail->setFrom('novedadservicio@caa.edu.co', 'Colegio Anglo Americano');
					$mail->addAddress('admonpria@caa.edu.co', 'Coordinadora alimentos');
	
					$mail->addCC('cristian.martinez@caa.edu.co');
					$mail->addCC('sistemas@angloamericanobogota.edu.co');
					$mail->addCC('luzstella.bejarano@angloamericanobogota.edu.co');
	/* 						$mail->addCC('admisionesymatriculas@caa.edu.co');
	*/		
					// Envío del correo
					$mail->isHTML(true);
					$mail->AddEmbeddedImage('../images/bannerCorreo.png', 'bannerPad', 'encabezado1', 'base64', 'image/jpeg');
					$mail->AddEmbeddedImage('../images/pieCorreo.png', 'footerPad', 'pie pagina1', 'base64', 'image/jpeg');
				 
					$mail->Subject = $asunto;
					$mail->CharSet = 'UTF-8';
					$mail->Body = $body;
	
					if (!$mail->send()) {
						array_push($resultado, false);
					} else {
						array_push($resultado, true);
					}
	
					// Limpiar destinatarios
					$mail->ClearAllRecipients();
				}
			}
			return response($resultado);
	
		} catch (Exception $e) {
			$error = $e->getMessage();
			return array('code' => 500, 'response' => $error);
		}
	}
	
	function get_firma_electronica($base){
		try {
			$link = conectar_db($base);
			$result = array();
			$id = $_SESSION["id"];
			$procedure = "SELECT * FROM `firma` WHERE `id` = $id AND `estado` = 1 ORDER BY `firma`.`tipo_deudor` ASC"; 
			$query = mysql_query($procedure,$link);
			if(mysql_num_rows($query)>0){
				while($data = mysql_fetch_assoc($query)){
					/* $consult = array('idProgrese'=>['idProgrese'],'idprocessId'=>['idprocessId'],'estado'=>['estado']);  */
					array_push($result,array('id'=> $data["id"], 'fechaIngreso'=> $data["entry_date"], 'tipo_deudor' => $data['tipo_deudor'],'signature_id' => $data['signature_id'],'signatory_id' => $data['signatory_id']));
				}
			}
			return $result;
		}
		catch (Exception $e) {
			$error = $e->getMessage();
			return array('code'=>500,'response'=>$error);
		}
	}

	function insertProcessId($base) {
		try {
			$link = conectar_db($base);
			$result = array();
			$id = $_SESSION["id"];
			$procedure = "SELECT * FROM `mat_firma` where idStudent = $id"; 
			$query = mysql_query($procedure,$link);
			if(mysql_num_rows($query)>0){
				$dataMesaggee = mysql_fetch_assoc($query);	
				$massiveId = $dataMesaggee["massiveProcessingId"];
				// Datos de autenticación
				$auth_url = 'https://authorizer.autenticsign.com/v2/authorizer/getToken';
				$client_id = 'ccHKe0wd8XBaq3eZbJVVqiVikHPZC0df';
				$client_secret = 'QYEQR6XFhv5d2Hvr2mRfjHQ8PV85h1Z1zeNu9Vr7Er1xX72LmxGxXVhq39Zb4Nqu';
				$audience = 'mpl.autenticsign.com';
				// Configura los datos para la solicitud del token
				$data = [
					'audience' => $audience,
					'grant_type' => 'client_credentials',
					'client_id' => $client_id,
					'client_secret' => $client_secret,
				];
			
				// Configura la solicitud de CURL para obtener el token
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_URL, $auth_url);
				curl_setopt($ch, CURLOPT_POST, true);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
				curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
				$response = curl_exec($ch);
				curl_close($ch);
			
				// Decodifica la respuesta JSON para obtener el token
				$responseData = json_decode($response, true);
				if (isset($responseData['access_token'])) {
					$access_token = $responseData['access_token'];
				} else {
					die("Error: No se pudo obtener el token de acceso.");
				}


				// URL del proceso de firma
				$status_url = "https://mpl.autenticsign.com/v3/signing-process/$massiveId";
			
			
				// Configura la solicitud de CURL para consultar el estado del proceso
				$ch = curl_init($status_url);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				curl_setopt($ch, CURLOPT_HTTPHEADER, ["Authorization: Bearer $access_token"]);
				$status_response = curl_exec($ch);
			
				// Verifica si hubo un error en la solicitud CURL
				if (curl_errno($ch)) {
					die('Error consultando el estado del proceso de firma: ' . curl_error($ch));
				}
				curl_close($ch);

				$status_data = json_decode($status_response, true);
				if (isset($status_data['body']['processes'][0]['status'])) {
					$idprocessId =$status_data['body']['processes'][0]['processId'];
					$procedure = "UPDATE `mat_firma` SET `processId` = '$idprocessId' WHERE `mat_firma`.`idStudent` = '$id'  AND `mat_firma`.`estado` = 1"; 
					$query = mysql_query($procedure,$link);
					return $result;
				}
				/////////////////////

			}
			return $result;
		}
		catch (Exception $e) {
			$error = $e->getMessage();
			return array('code'=>500,'response'=>$error);
		}
	} 
	

    function serviceBusScool($base){

		try {
			global $db;
	        $link = conectar_db($base);
	        $response =array();
	        $id = $_SESSION["id"];
	        $bd_caa = "cvuser_".$db["caa"];
	        $sql_g = "SELECT * FROM `rutas_estudiante_nuevoano` WHERE `id_student` = '$id'"; 
	        $query_g = mysql_query($sql_g,$link);
	        if(mysql_num_rows($query_g)>0){
	            while($data = mysql_fetch_assoc($query_g)){
                    //print_r($sql);
	             	array_push($response, array("bus_escool" => $data["bus_escool"],"authPersonal" => $data["authPersonal"],"authName" => $data["authName"],"authDoc" => $data["authDoc"],"authMobile" => $data["authMobile"]));
	            }
	        }else {
	        	array_push($response, false);
	        }
	        mysql_close($link);
	        return response($response);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}


	function getStudentDataNew($base){
		try {
	        $link = conectar_db($base);
	        $result =array();
	        $id = $_SESSION["id"];
	        $procedure = "CALL getStudentDataNew($id);"; 
	        $query = mysql_query($procedure,$link);
	        if(mysql_num_rows($query)>0){
	            while($data = mysql_fetch_assoc($query)){
	             	array_push($result, array("Id" => $data["Id"], "Last_Name" => $data["Last_Name"], "Name" => $data["Name"], "Names" => $data["Names"], "Type_User" => $data["Type_User"], "Birthdate" => $data["Birthdate"], "Age" => $data["Age"], "Nacionality" => $data["Nacionality"], "Type_Doc" => $data["Type_Doc"], "Num_Doc" => $data["Num_Doc"], "Neighborhood" => $data["Neighborhood"], "Via" => $data["Via"], "Nuv" => $data["Nuv"], "Pnu" => $data["Pnu"], "Snu" => $data["Snu"], "Iad" => $data["Iad"],"Phone" => $data["Phone"], "Estado" => $data["Estado"], "Deudor" => $data["Deudor"]));
	            }
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function updateStateStudenNewData($base,$type){
		try {
	        $link = conectar_db($base);
	        $result =array();
	        $id = $_SESSION["id"];

	        $procedure = "UPDATE `aspirant_estudiantes` SET `estado` = '$type' WHERE `aspirant_estudiantes`.`consec` = $id"; 

	        $query = mysql_query($procedure,$link);
	        if(mysql_affected_rows()>0){
	        	array_push($result,true);
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}	

	function getStateSignature($base,$signature_id){
		try {
			$id = $_SESSION["id"];
			$result = array();
			$url = "https://api.lleida.net/cs/v1/get_signatory_status";
			$data = [
				"request" => "GET_SIGNATORY_STATUS",
				"user" => "angloamericano@co",
				"request_id" => "$id"."01",
				"signatory_id" => $signature_id
			];
			
			$ch = curl_init($url); 
			// Configurar opciones
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_HTTPHEADER, [
				"Accept: application/json",
				"Content-Type: application/json; charset=utf-8",
				"Authorization: x-api-key idXqi7NXmPoQidzDrKh5LTLb2UTaLTM2"
			]);
			curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data, JSON_UNESCAPED_UNICODE));
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
			// Ejecutar la petición
      		$response = curl_exec($ch);

			if (curl_errno($ch)) {
          		echo "Error en cURL: " . curl_error($ch);
      		} else {
				// Decodificar JSON de respuesta
				$decoded = json_decode($response, true, 512, JSON_BIGINT_AS_STRING);
				$signatory_status = $decoded['signatory_status'];
				$signatory_status_date = $decoded['signatory_status_date'];
				array_push($result, array("status" => $signatory_status, "dates" => $signatory_status_date));
				return ($result);
			}
			//return response($result);
			//return array('code'=>500,'response'=>"error");

		} catch (\Throwable $th) {
			//throw $th;
		}
	}

	function getSignatureDocuments($base,$signature_id,$signatory_id){
		try {
			$id = $_SESSION["id"];
			$result = array();
			$url = "https://api.lleida.net/cs/v1/get_document";
			$data = [
				"request" => "get_document",
				"user" => "angloamericano@co",
				"signature_id" => "$signature_id",
				"signatory_id" => "$signatory_id",
				"file_group" => "signatory_evidence"
			];
			
			$ch = curl_init($url); 
			// Configurar opciones
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_HTTPHEADER, [
				"Accept: application/json",
				"Content-Type: application/json; charset=utf-8",
				"Authorization: x-api-key idXqi7NXmPoQidzDrKh5LTLb2UTaLTM2"
			]);
			curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data, JSON_UNESCAPED_UNICODE));
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
			// Ejecutar la petición
      		$response = curl_exec($ch);

			if (curl_errno($ch)) {
          		echo "Error en cURL: " . curl_error($ch);
      		} else {
				// Decodificar JSON de respuesta
				$decoded = json_decode($response, true, 512, JSON_BIGINT_AS_STRING);


				$datainfo = $decoded['document'];
				$fileArray = $decoded['document']['file'];
				$file = isset($fileArray[0]) ? $fileArray[0] : null;
				$content = isset($file['content']) ? $file['content'] : null;
				array_push($result, array("file" => $file, "content" => $content, "datainfo" => $datainfo));
				return response($result);
			}
			//return response($result);
			//return array('code'=>500,'response'=>"error");

		} catch (\Throwable $th) {
			//throw $th;
		}
	}

?>





