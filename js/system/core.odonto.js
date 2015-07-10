function initOdontologia(){
    $("#btn_buscar_procedimientos").click(function(){
        buscarProcedimientos();
    })


}

function buscarProcedimientos(){
    var pac=$("#add_proc_paciente_id").val()
    $.ajax({
        url: "procedimientos/buscarhistoriarealizar",
        type: 'POST',
        data: "pac="+pac,
        async:false,
        success: function(data) {
            $("#procedimientos_realizar").html(data)

        },
        error: function(){
            return "Error al cargar la información"
        }
    });
}

function mostrar_form_procedimientos(id,nombre){
    $("#list_procedimeintos_do").effect("drop","easeOutCubic",1,function(){
            $("#do_procedimientos_pac").effect("slide","easeOutCubic",tsin)
    });

    $("#proc_name_realizar_id").text(id)
    $("#proc_name_realizar_field").val(id)
    $("#proc_name_realizar").text(nombre)



}

function consentimiento_informado(id){
    window.open("impresiones/consentimiento?id="+id);

}