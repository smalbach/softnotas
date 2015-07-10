var currentExamId;
function initExamenesController(){
    $("#fisio_examenes_controller").change(function(){
        buscarExamenesController()
        if($("#fisio_examenes_controller").val()==1){
            buscarmovimientosController()
        }else{
            $("#movimientos_fisio").html("")
        }

    })

    $("#nombre_exa_fisio").keyup(function(){
        buscarExamenesController()
    })


}

function initArticulacionesController(){
    $("#table_examenes_list tr").click(function(){
        selectTrExamen(this)
    })
}
function initMovimientosController(){
    $("#table_movimientos_list tr").click(function(){
        if($(this).attr("class")=="selectecTr"){
            delmovimientoarticulacion($(this).attr("data-id"))
        }else{
            addmovimientoarticulacion($(this).attr("data-id"))
        }


    })
}

function selectTrExamen(obj){
    $("#table_examenes_list").find("tr").each(function(){
        $(this).removeClass("selectecTr")

    })
    currentExamId=$(obj).attr("data-id");
    $(obj).addClass("selectecTr")
    buscarmovimientosxart(currentExamId);



}

function buscarExamenesController(){

    var examen=$("#fisio_examenes_controller").val()
    var nombre=$("#nombre_exa_fisio").val()
    dataStream="id="+examen+"&nombre="+nombre
    $.ajax({
        url: "fisioterapia/detalleexamenes",
        type: 'POST',
        data: dataStream,
        async:true,

        success: function(data){
            $("#detalle_examenes_fisio").html(data)

        },
        error: function(){

        }
    });


}


function buscarmovimientosController(){


    dataStream=""
    $.ajax({
        url: "fisioterapia/movimientosexamenes",
        type: 'POST',
        data: dataStream,
        async:true,

        success: function(data){
            $("#movimientos_fisio").html(data)

        },
        error: function(){

        }
    });


}



function buscarmovimientosxart(id){


    dataStream=""
    $.ajax({
        url: "fisioterapia/movimientosxarticulaciones",
        type: 'POST',
        data: "id="+id,
        async:true,

        success: function(data){
            $("#table_movimientos_list").find("tr").each(function(){
                $(this).removeClass("selectecTr")
            })
            $.each(data, function(index) {

                $("#table_movimientos_list").find("tr").each(function(){
                    if($(this).attr("data-id")==data[index].id){
                        $(this).addClass("selectecTr")
                    }

                })


            })

        },
        error: function(){

        }
    });


}

function addmovimientoarticulacion(id){


    dataStream="art="+currentExamId+"&mov="+id
    $.ajax({
        url: "fisioterapia/addexamentoart",
        type: 'POST',
        data: dataStream,

        async:false,

        success: function(data){
            buscarmovimientosxart(currentExamId)

        },
        error: function(){

        }
    });

}



function delmovimientoarticulacion(id){


    dataStream="art="+currentExamId+"&mov="+id
    $.ajax({
        url: "fisioterapia/delexamentoart",
        type: 'POST',
        data: dataStream,
        async:false,

        success: function(data){
            buscarmovimientosxart(currentExamId)

        },
        error: function(){

        }
    });

}

