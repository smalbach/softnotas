var movCircle=true
var curentArticulacion=null
var currentCircule=null;
$(document).ready(function(){
    initMusculos()
    initSeguimiento()
    $("#loadhistorialesfisiterapia").click(function(){
        loadHistorialFisioterapia()
    })

    loadExamanesDetalles();
})


function initMusculos(){


    $(".musculos-circulo").click(function(){
        currentCircule=$(this).clone()
        $(currentCircule).attr("delete","true")
        $(".musculos-main").append(currentCircule)

        $(currentCircule).draggable();
        //$(".musculos-circulo").draggable();
        console.log(currentCircule.css("top"))
    })



    $( "#newexamenmusculo" ).on( "mousemove", function( event ) {
        moverCirculo(event)
    });

    $( "#newexamenmusculo" ).on( "mousemove", function( event ) {
        moverCirculo(event)
    });

    $( "#newexamenmusculo" ).on( "click", function( event ) {
        mostrarTexto(event)
        movCircle=false
        moverCirculo(event)

    });

    $( "#newexamenmusculo" ).on( "click", function( event ) {
        movCircle=false
        moverCirculo(event)
    });

    $( "#newexamenmusculo" ).bind( "contextmenu", function( e ) {
        e.preventDefault();

    });

    $("#newexamenmusculo").mousedown(function(e){
        e.preventDefault();
        if( e.button == 2 ) {
            movCircle=true
            return false;
        }
        return true;
    });
}

function borrarCirculos(){

    console.log("borrando")
    $(".musculos-main").find(".musculos-circulo").each(function(){
        if($(this).attr("delete")=="true"){
            $(this).remove()
        }
    })
}

function moverCirculo(event){
    if(movCircle && currentCircule){
        currentCircule.offset({ top:(event.pageY-25) , left: (event.pageX-25)  });
    }

}


function mostrarTexto(event){
    $( ".textoexplicaion" ).removeClass("hidden");
}

function initSeguimiento(){
    $("#loadevolucionesfisio").click(function(){
        //loadEvData()
    })


}

function loadEvData(){
    formData="id="+$("#historia_id_fisio").val()
    $.ajax({
        url: "fisioterapia/evdata",
        type: 'POST',
        data: formData,

        async:false,
        success: function(data){
            $("#historia-fisio-evoluciones").html(data)
        },
        error: function(){
            opnoty['type']="error"
            opnoty['text']="Error al guardar"
            var n = noty(opnoty);
            rtn=false;
        }
    });


}

function loadHistorialFisioterapia(){

    formData="id="+$("#historia_id_fisio").val()
    $.ajax({
        url: "fisioterapia/historialpaciente",
        type: 'POST',
        data: formData,

        async:false,
        success: function(data){
            $("#hist-fisio-historiales-seg").html(data)
        },
        error: function(){
            opnoty['type']="error"
            opnoty['text']="Error al guardar"
            var n = noty(opnoty);
            rtn=false;
        }
    });
}



function BuscarArticulacionesMovimientos(id,examen){
    if(curentArticulacion==id){return}

    curentArticulacion=id

    formData="id="+id
    $.ajax({
        url: "fisioterapia/movimientosxarticulaciones",
        type: 'POST',
        data: formData,

        async:false,
        success: function(data){
            var div="<div data-art='"+id+"' class='panel panel-info'>"
                div+="<h4 class='text-success'>"+examen+"</h4><div onclick='eliminarExamen(this)' class='label label-warning' >Eliminar Seccion</div> "
                div+="<div class='panel-body'>"
            $.each(data, function(index) {
                var input="<div data-rule-required=\"true\" class='col-xs-6'>"+data[index].nombre+"</div><div class='col-xs-6'><input class='valor_examen' art='"+id+"' exa='"+data[index].id+"'></div><br>"
                div+=input;

            })
            div+="</div>";
            div+="</div>";

            $("#load_porcentasjes_movilidad").append(div)


        },
        error: function(){
            opnoty['type']="error"
            opnoty['text']="Error al guardar"
            var n = noty(opnoty);
            rtn=false;
        }
    });
}


function BuscarArticulacionesMovimientosSegui(id,examen){
    if(curentArticulacion==id){return}

    curentArticulacion=id

    formData="id="+id
    $.ajax({
        url: "fisioterapia/movimientosxarticulaciones",
        type: 'POST',
        data: formData,

        async:false,
        success: function(data){
            var div="<div data-art='"+id+"' class='panel panel-info'>"
            div+="<h4 class='text-success'>"+examen+"</h4><div onclick='eliminarExamen(this)' class='label label-warning' >Eliminar Seccion</div> "
            div+="<div class='panel-body'>"
            $.each(data, function(index) {
                var input="<div data-rule-required=\"true\" class='col-xs-6'>"+data[index].nombre+"</div><div class='col-xs-6'><input class='valor_examen' art='"+id+"' exa='"+data[index].id+"'></div><br>"
                div+=input;

            })
            div+="</div>";
            div+="</div>";

            $("#load_porcentasjes_movilidad_segui").append(div)


        },
        error: function(){
            opnoty['type']="error"
            opnoty['text']="Error al guardar"
            var n = noty(opnoty);
            rtn=false;
        }
    });
}


function eliminarExamen(obj){
    $($(obj).parent("div")).remove()


}

function loadExamanesDetalles(id){
    $.ajax({
        url: "fisioterapia/examenesdetalleshistoria",
        type: 'POST',
        data: "",

        async:false,
        success: function(data){

            $("#"+id).html(data)


        },
        error: function(){
            opnoty['type']="error"
            opnoty['text']="Error al guardar"
            var n = noty(opnoty);
            rtn=false;
        }
    });
}

function gusradarExamesFisio(){
    return guardarArticulaciones()
}

function guardarArticulaciones(){
    var historia= $("#");
    var idexamen= new Array();
    var ideartic= new Array();
    var valoresexamenes= new Array();
    var i=0;
    var rtn=true;
    $("#load_porcentasjes_movilidad").find("input").each(function(){

        idexamen[i]=$(this).attr("exa")
        ideartic[i]=$(this).attr("art")
        valoresexamenes[i]=$(this).val()
        if($(this).val()==""){
            $('#tabsHistoriafisioterapia').tabs({ active: 4 });
            opnoty['type']="warning"
            opnoty['text']="No ha ingresado los valores de las articulaciones "
            var n = noty(opnoty);
            rtn= false
        }
        i++;
    })


    $("#fisio_ids_examenes").val(idexamen)
    $("#fisio_ids_articulaciones").val(ideartic)
    $("#fisio_ids_valores").val(valoresexamenes)


    return rtn;


}


function gusradarExamesFisioSegui(){
    var historia= $("#");
    var idexamen= new Array();
    var ideartic= new Array();
    var valoresexamenes= new Array();
    var i=0;
    var rtn=true;
    $("#load_porcentasjes_movilidad_segui").find("input").each(function(){

        idexamen[i]=$(this).attr("exa")
        ideartic[i]=$(this).attr("art")
        valoresexamenes[i]=$(this).val()
        if($(this).val()==""){
            $('#tabsHistoriafisioterapiaseg').tabs({ active: 6 });
            opnoty['type']="warning"
            opnoty['text']="No ha ingresado los valores de las articulaciones "
            var n = noty(opnoty);
            rtn= false
        }
        i++;
    })


    $("#fisio_ids_examenes_seg").val(idexamen)
    $("#fisio_ids_articulaciones_seg").val(ideartic)
    $("#fisio_ids_valores_seg").val(valoresexamenes)


    return rtn;


}

