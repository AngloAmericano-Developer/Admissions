function login(user = false, pass = false) {
  return $.ajax({
    url: "../controller/cont.php",

    type: "POST",

    dataType: "json",

    data: {
      base: "comunidad",
      param: "login",
      user: btoa(user),
      pass: btoa(pass),
    },
  });
}

function moduleViews() {
  return $.ajax({
    url: "../controller/cont.php",

    type: "POST",

    dataType: "json",

    data: { base: "r", param: "getMain" },
  });
}
function delete_requisito(consec, requisito) {
  return $.ajax({
    url: "controller/cont.php",
    type: "POST",
    dataType: "json",
    data: { param: "delete_requisito", base: "caa", consec, requisito },
  });
}

function delete_poliza(consec) {
  return $.ajax({
    url: "controller/cont.php",
    type: "POST",
    dataType: "json",
    data: { param: "deletepoliza", base: "caa", consec },
  });
}

function updateCancelServices(
  alimentos,
  motivoAlimentos,
  transporte,
  motivoTransporte,
  MediasNueves,
  motivoMedias
) {
  return $.ajax({
    url: "controller/cont.php",
    type: "POST",
    dataType: "json",
    data: {
      param: "updateCancelServices",
      base: "caa",
      alimentos,
      motivoAlimentos,
      transporte,
      motivoTransporte,
      MediasNueves,
      motivoMedias,
    },
  });
}

function updatefilesDoc(info) {
  return $.ajax({
    type: "POST",
    url: "controller/cont.php",
    dataType: "json",
    data: info,
    contentType: false,
    processData: false,
    cache: false,
  });
}
function updatefilesPoliza(info) {
  return $.ajax({
    type: "POST",
    url: "controller/cont.php",
    dataType: "json",
    data: info,
    contentType: false,
    processData: false,
    cache: false,
  });
}

function userInfo() {
  return $.ajax({
    url: "../controller/cont.php",

    type: "POST",

    dataType: "json",

    data: { base: "caa", param: "getInfo" },
  });
}

function getStateActData() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getStateActData", base: "caa" },
  });
}

function getApprovalData() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getApprovalData", base: "caa" },
  });
}

function getCountrys() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getCountrys", base: "caa" },
  });
}

function getDeptos() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getDeptos", base: "caa" },
  });
}

function getCitys(id_country, id_dpto) {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getCitys", base: "caa", id_country, id_dpto },
  });
}

function getAddress() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getAddress", base: "caa" },
  });
}

function getTypeDocs() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getTypeDocs", base: "caa" },
  });
}

function getTypeCivil() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getTypeCivil", base: "caa" },
  });
}

function getNationality() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getNationality", base: "caa" },
  });
}

function getStudentData() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getStudentData", base: "caa" },
  });
}

function getStudentDataNew() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getStudentDataNew", base: "caa" },
  });
}

function getStudentDataBasic() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getStudentDataBasic", base: "caa" },
  });
}

function getHealthData() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getHealthData", base: "caa" },
  });
}

function getBrotherData() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getBrotherData", base: "caa" },
  });
}

function getBrotherSchool() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getBrotherSchool", base: "caa" },
  });
}

function getCivilStatus() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getCivilStatus", base: "caa" },
  });
}

function getFatherData() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getFatherData", base: "caa" },
  });
}

function getFatherDataNew() {
  return $.ajax({
    type: "POST",
    url: "controller/cont.php",
    dataType: "json",
    data: { param: "getFatherDataNew", base: "caa" },
  });
}

function getMotherData() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getMotherData", base: "caa" },
  });
}

function getMotherDataNew() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getMotherDataNew", base: "caa" },
  });
}

function getTutorData() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getTutorData", base: "caa" },
  });
}

function getEmergencyData() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getEmergencyData", base: "caa" },
  });
}

function getEmergencyAddData() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getEmergencyAddData", base: "caa" },
  });
}

function getServicesData() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getServicesData", base: "caa" },
  });
}

function getRoutesExtraDesc() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getRoutesExtraDesc", base: "caa" },
  });
}

function getRoutesExtra() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getRoutesExtra", base: "caa" },
  });
}

function getBusStop(route) {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getBusStop", base: "caa", route },
  });
}

function getDebtorData() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getDebtorData", base: "caa" },
  });
}

function getCodebtorData() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getCodebtorData", base: "caa" },
  });
}

function getChangeRetention() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getChangeRetention", base: "caa" },
  });
}

function getrequirementsData() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "get_Requirements_Data", base: "caa" },
  });
}

function getfilesData() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "get_Files_Data", base: "caa" },
  });
}

function updateApprovalData(approve) {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "updateApprovalData", base: "caa", approve },
  });
}

function updateStudentData(
  date_nac,
  number_doc,
  number_visa,
  date_visa_exp,
  date_visa_venc,
  nuv,
  pnu,
  snu,
  iad,
  neighborhood,
  phone_home,
  stratus,
  gender,
  selectCountryNac,
  selectDeptoNac,
  selectCityNac,
  selectNacionality,
  selectTypeDoc,
  selectDeptoExp,
  selectCityExp,
  selectAddrHome,
  selectDeptoHome,
  selectCityHome,
  email_stu,
  phone_stu,
  blood_type,
  rh
) {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: {
      param: "updateStudentData",
      base: "caa",
      date_nac,
      number_doc,
      number_visa,
      date_visa_exp,
      date_visa_venc,
      nuv,
      pnu,
      snu,
      iad,
      neighborhood,
      phone_home,
      stratus,
      gender,
      selectCountryNac,
      selectDeptoNac,
      selectCityNac,
      selectNacionality,
      selectTypeDoc,
      selectDeptoExp,
      selectCityExp,
      selectAddrHome,
      selectDeptoHome,
      selectCityHome,
      email_stu,
      phone_stu,
      blood_type,
      rh,
    },
  });
}

function updateHealthData(
  blood_type,
  rh,
  eps,
  ips,
  prepaid_medicine,
  scheme,
  major_disease,
  current_disease,
  hospitalized,
  disturbance,
  allergy,
  allergy_medication,
  surgical_history,
  musculoskeletal_injuries,
  permanent_medication,
  medical_condition,
  convulsion,
  convulsion_medication,
  exploratory_valuation,
  reason_major_disease,
  reason_current_disease,
  reason_hospitalized,
  reason_disturbance,
  reason_allergy,
  reason_allergy_medication,
  reason_surgical_history,
  reason_musculoskeletal_injuries,
  name_permanent_medication,
  dose_permanent_medication,
  which_medical_condition,
  treatment_medical_condition,
  reason_convulsion,
  quantity_convulsion,
  reason_convulsion_medication,
  reason_exploratory_valuation,
  vaccine_covid,
  vaccine_vph,
  allergy_alimento,
  reason_allergy_alimento,
  poliza_seguro,
  reason_poliza_seguro,
  psicriatia,
  dose_Tratamiento_medication,
  autorizaMedi,
  Alergia
) {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: {
      param: "updateHealthData",
      base: "caa",
      blood_type,
      rh,
      eps,
      ips,
      prepaid_medicine,
      scheme,
      major_disease,
      current_disease,
      hospitalized,
      disturbance,
      allergy,
      allergy_medication,
      surgical_history,
      musculoskeletal_injuries,
      permanent_medication,
      medical_condition,
      convulsion,
      convulsion_medication,
      exploratory_valuation,
      reason_major_disease,
      reason_current_disease,
      reason_hospitalized,
      reason_disturbance,
      reason_allergy,
      reason_allergy_medication,
      reason_surgical_history,
      reason_musculoskeletal_injuries,
      name_permanent_medication,
      dose_permanent_medication,
      which_medical_condition,
      treatment_medical_condition,
      reason_convulsion,
      quantity_convulsion,
      reason_convulsion_medication,
      reason_exploratory_valuation,
      vaccine_covid,
      vaccine_vph,
      allergy_alimento,
      reason_allergy_alimento,
      poliza_seguro,
      reason_poliza_seguro,
      psicriatia,
      dose_Tratamiento_medication,
      autorizaMedi,Alergia
    },
  });
}

function addBrotherData(arrayBrother) {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "addBrotherData", base: "caa", arrayBrother },
  });
}

function updateBrotherData(id_brother) {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "updateBrotherData", base: "caa", id_brother },
  });
}

function updateCivilStatusData(
  selectCivilStatus,
  custody_parent,
  custody,
  custody_cedula,
  custody_cel
) {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: {
      param: "updateCivilStatusData",
      base: "caa",
      selectCivilStatus,
      custody_parent,
      custody,
      custody_cedula,
      custody_cel,
    },
  });
}

function updateFatherData(
  father_last_name,
  father_names,
  father_email,
  father_mobile,
  father_phone_home,
  father_nuv,
  father_pnu,
  father_snu,
  father_iad,
  father_date_nac,
  father_selectCountryNac,
  father_selectCityNac,
  father_date_exp_doc,
  father_number_doc,
  father_company,
  father_position,
  father_occupation,
  father_nuv_job,
  father_pnu_job,
  father_snu_job,
  father_iad_job,
  father_phone_job,
  father_ext_job,
  father_service_time,
  father_selectAddrHome,
  father_selectDeptoHome,
  father_selectCityHome,
  father_selectTypeDoc,
  father_selectDeptoExp,
  father_selectCityExp,
  father_selectAddr_job,
  father_prefijo
) {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: {
      param: "updateFatherData",
      base: "caa",
      father_last_name,
      father_names,
      father_email,
      father_mobile,
      father_phone_home,
      father_nuv,
      father_pnu,
      father_snu,
      father_iad,
      father_date_nac,
      father_selectCountryNac,
      father_selectCityNac,
      father_date_exp_doc,
      father_number_doc,
      father_company,
      father_position,
      father_occupation,
      father_nuv_job,
      father_pnu_job,
      father_snu_job,
      father_iad_job,
      father_phone_job,
      father_ext_job,
      father_service_time,
      father_selectAddrHome,
      father_selectDeptoHome,
      father_selectCityHome,
      father_selectTypeDoc,
      father_selectDeptoExp,
      father_selectCityExp,
      father_selectAddr_job,
      father_prefijo
    },
  });
}

function updateMotherData(
  mother_last_name,
  mother_names,
  mother_email,
  mother_mobile,
  mother_phone_home,
  mother_nuv,
  mother_pnu,
  mother_snu,
  mother_iad,
  mother_date_nac,
  mother_selectCountryNac,
  mother_selectCityNac,
  mother_date_exp_doc,
  mother_number_doc,
  mother_company,
  mother_position,
  mother_occupation,
  mother_nuv_job,
  mother_pnu_job,
  mother_snu_job,
  mother_iad_job,
  mother_phone_job,
  mother_ext_job,
  mother_service_time,
  mother_selectAddrHome,
  mother_selectDeptoHome,
  mother_selectCityHome,
  mother_selectTypeDoc,
  mother_selectDeptoExp,
  mother_selectCityExp,
  mother_selectAddr_job,
  mother_prefijo
) {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: {
      param: "updateMotherData",
      base: "caa",
      mother_last_name,
      mother_names,
      mother_email,
      mother_mobile,
      mother_phone_home,
      mother_nuv,
      mother_pnu,
      mother_snu,
      mother_iad,
      mother_date_nac,
      mother_selectCountryNac,
      mother_selectCityNac,
      mother_date_exp_doc,
      mother_number_doc,
      mother_company,
      mother_position,
      mother_occupation,
      mother_nuv_job,
      mother_pnu_job,
      mother_snu_job,
      mother_iad_job,
      mother_phone_job,
      mother_ext_job,
      mother_service_time,
      mother_selectAddrHome,
      mother_selectDeptoHome,
      mother_selectCityHome,
      mother_selectTypeDoc,
      mother_selectDeptoExp,
      mother_selectCityExp,
      mother_selectAddr_job,
      mother_prefijo
    },
  });
}

function updateAdoptiveData(adopted_son, reason_adopted_son) {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: {
      param: "updateAdoptiveData",
      base: "caa",
      adopted_son,
      reason_adopted_son,
    },
  });
}

function updateServicesData(half_nines, launch, transport, accident_insurance) {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: {
      param: "updateServicesData",
      base: "caa",
      half_nines,
      launch,
      transport,
      accident_insurance,
    },
  });
}

function updateTutorData(
  tutor_last_name,
  tutor_names,
  tutor_email,
  tutor_mobile,
  tutor_phone_home,
  tutor_nuv,
  tutor_pnu,
  tutor_snu,
  tutor_iad,
  tutor_number_doc,
  tutor_relationship,
  tutor_selectAddrHome,
  tutor_selectTypeDoc,
  tutor_selectDeptoExp,
  tutor_selectCityExp
) {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: {
      param: "updateTutorData",
      base: "caa",
      tutor_last_name,
      tutor_names,
      tutor_email,
      tutor_mobile,
      tutor_phone_home,
      tutor_nuv,
      tutor_pnu,
      tutor_snu,
      tutor_iad,
      tutor_number_doc,
      tutor_relationship,
      tutor_selectAddrHome,
      tutor_selectTypeDoc,
      tutor_selectDeptoExp,
      tutor_selectCityExp,
    },
  });
}

function updateEmergencyData(
  emergency_last_name,
  emergency_names,
  emergency_email,
  emergency_mobile,
  emergency_phone_home,
  emergency_nuv,
  emergency_pnu,
  emergency_snu,
  emergency_iad,
  emergency_number_doc,
  emergency_relationship,
  emergency_selectAddrHome,
  emergency_selectTypeDoc,
  emergency_selectDeptoExp,
  emergency_selectCityExp
) {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: {
      param: "updateEmergencyData",
      base: "caa",
      emergency_last_name,
      emergency_names,
      emergency_email,
      emergency_mobile,
      emergency_phone_home,
      emergency_nuv,
      emergency_pnu,
      emergency_snu,
      emergency_iad,
      emergency_number_doc,
      emergency_relationship,
      emergency_selectAddrHome,
      emergency_selectTypeDoc,
      emergency_selectDeptoExp,
      emergency_selectCityExp,
    },
  });
}

function get_email_entryform(consecutivo) {
  return $.ajax({
    url: "controller/cont.php",

    type: "POST",

    dataType: "json",

    data: { param: "getemailentryform", base: "caa", consecutivo },
  });
}

function getemailTransporte(consecutivo) {
  return $.ajax({
    url: "controller/cont.php",

    type: "POST",

    dataType: "json",

    data: { param: "getemailTransporte", base: "caa", consecutivo },
  });
}

function getemailmedias(consecutivo) {
  return $.ajax({
    url: "controller/cont.php",

    type: "POST",

    dataType: "json",

    data: { param: "getemailmedias", base: "caa", consecutivo },
  });
}

function updateEmergencyAddData(
  emergency_add_last_name,
  emergency_add_names,
  emergency_add_email,
  emergency_add_mobile,
  emergency_add_phone_home,
  emergency_add_nuv,
  emergency_add_pnu,
  emergency_add_snu,
  emergency_add_iad,
  emergency_add_number_doc,
  emergency_add_relationship,
  emergency_add_selectAddrHome,
  emergency_add_selectTypeDoc,
  emergency_add_selectDeptoExp,
  emergency_add_selectCityExp,
  type_emerg_add
) {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: {
      param: "updateEmergencyAddData",
      base: "caa",
      emergency_add_last_name,
      emergency_add_names,
      emergency_add_email,
      emergency_add_mobile,
      emergency_add_phone_home,
      emergency_add_nuv,
      emergency_add_pnu,
      emergency_add_snu,
      emergency_add_iad,
      emergency_add_number_doc,
      emergency_add_relationship,
      emergency_add_selectAddrHome,
      emergency_add_selectTypeDoc,
      emergency_add_selectDeptoExp,
      emergency_add_selectCityExp,
      type_emerg_add,
    },
  });
}

function updateAuthPhotoData(auth_photo) {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "updateAuthPhotoData", base: "caa", auth_photo },
  });
}

function updateDebtorData(
  debtor_last_name,
  debtor_names,
  debtor_email,
  debtor_mobile,
  debtor_phone_home,
  debtor_nuv,
  debtor_pnu,
  debtor_snu,
  debtor_iad,
  debtor_number_doc,
  debtor_company,
  debtor_position,
  debtor_occupation,
  debtor_nuv_job,
  debtor_pnu_job,
  debtor_snu_job,
  debtor_iad_job,
  debtor_phone_job,
  debtor_ext_job,
  debtor_service_time,
  debtor_selectAddrHome,
  debtor_selectDeptoHome,
  debtor_selectCityHome,
  debtor_selectTypeDoc,
  debtor_selectDeptoExp,
  debtor_selectCityExp,
  debtor_selectAddr_job,
  copy_debtor,
  debtor_indicativo
) {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: {
      param: "updateDebtorData",
      base: "caa",
      debtor_last_name,
      debtor_names,
      debtor_email,
      debtor_mobile,
      debtor_phone_home,
      debtor_nuv,
      debtor_pnu,
      debtor_snu,
      debtor_iad,
      debtor_number_doc,
      debtor_company,
      debtor_position,
      debtor_occupation,
      debtor_nuv_job,
      debtor_pnu_job,
      debtor_snu_job,
      debtor_iad_job,
      debtor_phone_job,
      debtor_ext_job,
      debtor_service_time,
      debtor_selectAddrHome,
      debtor_selectDeptoHome,
      debtor_selectCityHome,
      debtor_selectTypeDoc,
      debtor_selectDeptoExp,
      debtor_selectCityExp,
      debtor_selectAddr_job,
      copy_debtor,
      debtor_indicativo
    },
  });
}

function updateCodebtorData(
  codebtor_last_name,
  codebtor_names,
  codebtor_email,
  codebtor_mobile,
  codebtor_phone_home,
  codebtor_nuv,
  codebtor_pnu,
  codebtor_snu,
  codebtor_iad,
  codebtor_number_doc,
  codebtor_company,
  codebtor_position,
  codebtor_occupation,
  codebtor_nuv_job,
  codebtor_pnu_job,
  codebtor_snu_job,
  codebtor_iad_job,
  codebtor_phone_job,
  codebtor_ext_job,
  codebtor_service_time,
  codebtor_selectAddrHome,
  codebtor_selectDeptoHome,
  codebtor_selectCityHome,
  codebtor_selectTypeDoc,
  codebtor_selectDeptoExp,
  codebtor_selectCityExp,
  codebtor_selectAddr_job,
  copy_codebtor,
  codebtor_indicativo
) {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: {
      param: "updateCodebtorData",
      base: "caa",
      codebtor_last_name,
      codebtor_names,
      codebtor_email,
      codebtor_mobile,
      codebtor_phone_home,
      codebtor_nuv,
      codebtor_pnu,
      codebtor_snu,
      codebtor_iad,
      codebtor_number_doc,
      codebtor_company,
      codebtor_position,
      codebtor_occupation,
      codebtor_nuv_job,
      codebtor_pnu_job,
      codebtor_snu_job,
      codebtor_iad_job,
      codebtor_phone_job,
      codebtor_ext_job,
      codebtor_service_time,
      codebtor_selectAddrHome,
      codebtor_selectDeptoHome,
      codebtor_selectCityHome,
      codebtor_selectTypeDoc,
      codebtor_selectDeptoExp,
      codebtor_selectCityExp,
      codebtor_selectAddr_job,
      copy_codebtor,
      codebtor_indicativo
    },
  });
}

function updateTransportData(
  authPersonal,
  routeExtra,
  busStop,
  authName,
  authDoc,
  authMobile,
  authName_1,
  authDoc_1,
  authMobile_1,
  authName_2,
  authDoc_2,
  authMobile_2,
  bus_escool
) {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: {
      param: "updateTransportData",
      base: "caa",
      authPersonal,
      routeExtra,
      busStop,
      authName,
      authDoc,
      authMobile,
      authName_1,
      authDoc_1,
      authMobile_1,
      authName_2,
      authDoc_2,
      authMobile_2,
      bus_escool,
    },
  });
}
function validlonch(option) {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "validlonch", base: "caa", option },
  });
}

function updatePedestrianData(
  authPersonal,
  typeTransport,
  authName,
  authDoc,
  authMobile,
  authName_1,
  authDoc_1,
  authMobile_1,
  authName_2,
  authDoc_2,
  authMobile_2
) {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: {
      param: "updatePedestrianData",
      base: "caa",
      authPersonal,
      typeTransport,
      authName,
      authDoc,
      authMobile,
      authName_1,
      authDoc_1,
      authMobile_1,
      authName_2,
      authDoc_2,
      authMobile_2,
    },
  });
}

function getSummaryData() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getSummaryData", base: "caa" },
  });
}

function updateSpecial(
  last_name,
  name,
  date_birth,
  number_doc,
  number_visa,
  date_visa_exp,
  date_visa_venc,
  selectTypeDoc,
  selectDeptoExp,
  selectCityExp,
  email
) {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: {
      param: "updateSpecial",
      base: "caa",
      last_name,
      name,
      date_birth,
      number_doc,
      number_visa,
      date_visa_exp,
      date_visa_venc,
      selectTypeDoc,
      selectDeptoExp,
      selectCityExp,
      email,
    },
  });
}

function updateBasic(
  tel_Student,
  adrres,
  celmother,
  email_mother,
  celular_father,
  email_father
) {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: {
      param: "updateBasic",
      base: "caa",
      tel_Student,
      adrres,
      celmother,
      email_mother,
      celular_father,
      email_father,
    },
  });
}

function updateEndProcess(typeUser) {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "updateEndProcess", base: "caa" , typeUser},
  });
}

function getLinkDocs() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getLinkDocs", base: "caa" },
  });
}

function get_Services() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getServices", base: "comunidad" },
  });
}

function addServices(question) {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "addServices", base: "comunidad", question },
  });
}

function uploadDocuments(info) {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: info,

    contentType: false,

    processData: false,

    cache: false,
  });
}

function getCourses() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getCourses", base: "caa" },
  });
}

function getTypeStudent() {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "getTypeStudent", base: "caa" },
  });
}

function getListedDocs(course, last_names, names, filter) {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: {
      param: "getListedDocs",
      base: "caa",
      course,
      last_names,
      names,
      filter,
    },
  });
}

function getInfoContracts(course, last_names, names, filter) {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: {
      param: "getInfoContracts",
      base: "caa",
      course,
      last_names,
      names,
      filter,
    },
  });
}

function updateService(id_student, service, status) {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "updateService", base: "caa", id_student, service, status },
  });
}

function updateOther(id_student, service, status) {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "updateOther", base: "caa", id_student, service, status },
  });
}

function updateGroupAlternation(id_student, status) {
  return $.ajax({
    type: "POST",

    url: "controller/cont.php",

    dataType: "json",

    data: { param: "updateGroupAlternation", base: "caa", id_student, status },
  });
}

function getTipoRazon() {
  return $.ajax({
    type: "POST",
    url: "controller/cont.php",
    dataType: "json",
    data: { param: "getTipoRazon", base: "caa" },
  });
}

function uppServiceMotive(
  half_nines,
  launch,
  transport,
  datos_mediasnueves,
  datos_alimento,
  datos_transporte,
  checkmediasnueves_6,
  checkalmuerzo_6,
  checktransporte_6,
  reason_poliza_seguro,
  accident_insurance
) {
  console.log(datos_transporte);
  return $.ajax({
    type: "POST",
    url: "controller/cont.php",
    dataType: "json",
    data: {
      param: "uppServiceMotive",
      base: "caa",
      half_nines,
      launch,
      transport,
      datos_mediasnueves,
      datos_alimento,
      datos_transporte,
      checkmediasnueves_6,
      checkalmuerzo_6,
      checktransporte_6,
      reason_poliza_seguro,
      accident_insurance,
    },
  });
}

function updateCustody(peatona_person_m, peatona_person_p) {
  return $.ajax({
    type: "POST",
    url: "controller/cont.php",
    dataType: "json",
    data: {
      param: "updateCustody",
      base: "caa",
      peatona_person_m,
      peatona_person_p,
    },
  });
}

function delete_docu(consec) {
  return $.ajax({
    type: "POST",
    url: "controller/cont.php",
    dataType: "json",
    data: { param: "delete_documento", base: "caa", consec },
  });
}

function updatefiles(info) {
  return $.ajax({
    type: "POST",
    url: "controller/cont.php",
    dataType: "json",
    data: info,
    contentType: false,
    processData: false,
    cache: false,
  });
}

function updatefileCustodia(info) {
  return $.ajax({
    type: "POST",
    url: "controller/cont.php",
    dataType: "json",
    data: info,
    contentType: false,
    processData: false,
    cache: false,
  });
}

function updateDeptoBienestarData(depto_bienestar) {
  console.log(depto_bienestar);
  return $.ajax({
    type: "POST",
    url: "controller/cont.php",
    dataType: "json",
    data: { param: "updateDeptoBienestarData", base: "caa", depto_bienestar },
  });
}

function getTypeEtnia() {
  return $.ajax({
    type: "POST",
    url: "controller/cont.php",
    dataType: "json",
    data: { param: "getTypeEtnia", base: "caa" },
  });
}

function getPendienteServicio() {
  return $.ajax({
    type: "POST",
    url: "controller/cont.php",
    dataType: "json",
    data: { param: "getPendienteServicio", base: "caa" },
  });
}

function updateEtniaData(selecgroup_etnico) {
  return $.ajax({
    type: "POST",
    url: "controller/cont.php",
    dataType: "json",
    data: { param: "updateEtniaData", base: "caa", selecgroup_etnico },
  });
}

function updatedRuta_estudiante(sale_solo, Nombre_ps, Cedula_ps, Telefono_ps) {
  return $.ajax({
    type: "POST",
    url: "controller/cont.php",
    dataType: "json",
    data: {
      param: "updatedRuta_estudiante",
      base: "caa",
      sale_solo,
      Nombre_ps,
      Cedula_ps,
      Telefono_ps,
    },
  });
}

function getElectronicSignature() {
  return $.ajax({
    type: "POST",
    url: "controller/cont.php",
    dataType: "json",
    data: { param: "getElectronicSignature", base: "caa" },
  });
}

function insertProcessId() {
  return $.ajax({
    type: "POST",
    url: "controller/cont.php",
    dataType: "json",
    data: { param: "insertProcessId", base: "caa" },
  });
}

function serviceBusScool() {
  return $.ajax({
    type: "POST",
    url: "controller/cont.php",
    dataType: "json",
    data: { param: "serviceBusScool", base: "caa" },
  });
}

function updateStateStudenNewData(type) {
  return $.ajax({
    type: "POST",
    url: "controller/cont.php",
    dataType: "json",
    data: { param: "updateStateStudenNewData", base: "caa", type },
  });
}

function getStateSignature(signature_id) {
  return $.ajax({
    type: "POST",
    url: "controller/cont.php",
    dataType: "json",
    data: { param: "getStateSignature", base: "caa", signature_id },
  });
}

function getSignatureDocuments(signature_id, signatory_id) {
  return $.ajax({
    type: "POST",
    url: "controller/cont.php",
    dataType: "json",
    data: { param: "getSignatureDocuments", base: "caa", signature_id, signatory_id },
  });
}