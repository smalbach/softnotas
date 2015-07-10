var table_active_cot="";

function initCotizacion(){
    $("#btn_buscar_cotizacion").click(function(){
        validarConsultarCotizacion();

    })

    $("#guardar_factura_paciente").click(function(){
        if(validarConsultarCotizacion()){
            guardarCotizacion()
        }
    })



}
function initFacturacion(){
    $("#btn_buscar_facturacion").click(function(){
        validarConsultarFacturacion();

    })
}


function imprimircotizacion(id){
    $("#btn_imprimir_factura").click(function(){

        var id=$("#fac_existe_factura").val()
        imprimirCotizacionId(id)

    })
}

function imprimirCotizacionId(id){
    var dataUrl="cotizaciones/imprimir?id="+id;
    window.open(dataUrl);
}

function imprimirFacturacionId(id){
    var dataUrl="facturacion/imprimir?id="+id;
    window.open(dataUrl);
}

function validarConsultarCotizacion(){

    var alerta=false;
    var ent=$("#add_coti_entidad").val();
    var pac=$("#add_coti_paciente_id").val();
    var fech_ini=$("#add_coti_fecha_inicio").val();
    var fech_cor=$("#add_coti_fecha_corte").val();

    if(ent==""){
        alerta="Debe elegir la entidad";
    }else if(pac==""){
        alerta="Debe elegir el paciente";
    }else if(fech_ini==""){
        alerta="Debe elegir la fecha de inicio";
    }else if(fech_cor==""){
        alerta="Debe elegir la fecha de corte";
    }


    if(alerta){
        opnoty['type']="warning"
        opnoty['text']=alerta
        var n = noty(opnoty);
        rtn= false;
    }else{
        return consultarCotizacion()
    }


}
function validarConsultarFacturacion(){

    var alerta=false;
    var ent=$("#add_fact_entidad").val();
    var pac=$("#add_fact_paciente_id").val();


    if(ent==""){
        alerta="Debe elegir la entidad";
    }else if(pac==""){
        alerta="Debe elegir el paciente";
    }


    if(alerta){
        opnoty['type']="warning"
        opnoty['text']=alerta
        var n = noty(opnoty);
        rtn= false;
    }else{
        return consultarFacturacion()
    }


}

function consultarCotizacion() {


    var rtn=false;
    formData = $("#addcotizacion").serialize()
    $.ajax({
        url: "cotizaciones/buscar_facturas",
        type: 'POST',
        data: formData,

        async: false,
        success: function (data) {
            $("#cotizacion_data").html(data)
            rtn=true;
        },
        error: function () {
            opnoty['type'] = "warning"
            opnoty['text'] = "Error al buscar informacion"
            var n = noty(opnoty);
            rtn = false;
        }
    });

    return rtn;

}

function consultarFacturacion() {
    var rtn=false;
    formData = $("#addfacturacion").serialize()
    $.ajax({
        url: "facturacion/buscar_cotizaciones",
        type: 'POST',
        data: formData,

        async: false,
        success: function (data) {
            $("#facturacion_data").html(data)
            rtn=true;
        },
        error: function () {
            opnoty['type'] = "warning"
            opnoty['text'] = "Error al buscar informacion"
            var n = noty(opnoty);
            rtn = false;
        }
    });

    return rtn;

}

function validarGuardarFactura(id){

    var alerta=false;
    var auto=$("#add_fact_autorizacion_"+id).val();


    if(auto==""){
        alerta="Debe digitar la autorización";
    }


    if(alerta){
        opnoty['type']="warning"
        opnoty['text']=alerta
        var n = noty(opnoty);
        rtn= false;
    }else{
        return guardarFactura(auto,id)
    }

}


function guardarFactura(auto,id){
    var rtn=false;
    var formData="id="+id+"&auto="+auto;
    $.ajax({
        url: "facturacion/guardar",
        type: 'POST',
        data: formData,

        async: false,
        success: function (data) {
            $("#facturacion_data").html(data)

            rtn=true;
        },
        error: function () {
            opnoty['type'] = "warning"
            opnoty['text'] = "Error al buscar informacion"
            var n = noty(opnoty);
            rtn = false;
        }
    });

    return rtn;

}

function guardarCotizacion(){
    var rtn=false;
    formData = $("#addcotizacion").serialize()
    $.ajax({
        url: "cotizaciones/guardar",
        type: 'POST',
        data: formData,

        async: false,
        success: function (data) {
            $("#cotizacion_data").html(data)
            rtn=true;
        },
        error: function () {
            opnoty['type'] = "warning"
            opnoty['text'] = "Error al buscar informacion"
            var n = noty(opnoty);
            rtn = false;
        }
    });

    return rtn;

}
