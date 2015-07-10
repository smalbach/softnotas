function initRips(){
    initButons();


}

function initButons(){
    $("#btn_buscar_ripsuracion").click(function(){
        validarConsultarRips()
    })
}


function validarConsultarRips(){

    var alerta=false;
    var ent=$("#add_rips_entidad").val();

    var fech_ini=$("#add_rips_fecha_inicio").val();
    var fech_cor=$("#add_rips_fecha_corte").val();

    if(ent==""){
        alerta="Debe elegir la entidad";
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
        return buscarRips()
    }


}

function buscarRips(){
    var rtn=false;
    formData = $("#addrips").serialize()
    console.log(formData)
    $.ajax({
        url: "facturacion/buscar_rips",
        type: 'POST',
        data: formData,

        async: false,
        success: function (data) {
            if(data=="none"){
                opnoty['type'] = "warning"
                opnoty['text'] = "No existen facturas en el periodo seleccionado"
                var n = noty(opnoty);

            }else{
                //alert(data)
                $("#rips_data").html('<a class="btn btn-primary"  href="facturacion/getFile?ruta=' + data + '" >Descargar arvhivo</a>');


            }
            //$("#rips_data").html(data)
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