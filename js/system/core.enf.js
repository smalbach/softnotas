/**
 * Created by Aikon on 17/10/14.
 */



function initAplicacion(){
    $("#add_sum_medicamento_lab" ).combobox();
    $("#add_paciente_id_apl").blur(function(){
        existePacienteAplicacion($("#add_paciente_id_apl").val())
    })

    $("#add_paciente_id_esp").blur(function(){
        existePacienteAplicacion($("#add_paciente_id_esp").val())
    })

    $("#add_save_apl_btn").click(function(){
        validarGuardar()
    })

    $("#add_save_esp_btn").click(function(){
        validarGuardarEsp()
    })

    $("#formnotasenfermeria").validate({
        submitHandler: function (form) {
            var factual=$.datepicker.formatDate('yy/mm/dd', new Date())
            var fecha= $("#add_notas_fecha").val()
            if(fecha!=factual){
                var dd =confirm("La fecha que selecionó es diferente a la fecha actual!!! Desea continuar?");
                if(dd){
                    guardarNota(form)
                }
            }else{
                guardarNota(form)
            }



        }
    })

    $("#add_notas_paciente_iden").blur(function(){
        existePacienteNotas($("#add_notas_paciente_iden").val())
    })

    $("#imprimir_notas_enfemeria").click(function(){

        var fecha=$("#add_notas_fecha").val()
        var pac=$("#add_notas_paciente_id").val()
        //alert(fecha)
        var dataUrl="enfermeria/impnota?fecha="+fecha+"&id="+pac;
        window.open(dataUrl);

    })

    $("#imprimir_aplicacion_enfemeria").click(function(){

        var fechai=$("#add_apl_fecha_i").val()
        var fechaf=$("#add_apl_fecha_f").val()

        //alert(fecha)
        var dataUrl="enfermeria/impaplicacion?fechai="+fechai+"&fechaf="+fechaf;
        window.open(dataUrl);
        /*
        $("#load_pdf").show();
        var fecha=$("#add_notas_fecha").val()
        var dataUrl="enfermeria/impaplicacion?fecha="+fecha;
        console.log(dataUrl)
        var iframe="<iframe src="+dataUrl+" width='100%' height='560'></iframe>"
        $("#load_pdf_data").html(iframe)
        */

    })


    $("#add_apl_cantidad").keyup(function(){

        calcularCantidad()
    })

    $("#add_apl_medicamento_lab").change(function(){
        calcularCantidad()
    })


    $("#add_cantidad_esp").keyup(function(){

        calcularCantidadEsp()
    })

    $("#add_apl_medicamento_esp").change(function(){
        calcularCantidadEsp()
    })

    $("#add_notas_fecha").change(function(){
        buscarNotas()
    })

    setDatePicker($("#add_apl_fecha"))
    setDatePicker($("#add_apl_fecha_f"))
    setDatePicker($("#add_apl_fecha_i"))
    $("#add_apl_fecha_f").change(function(){
        buscarAplicacions()
    })
    $("#add_apl_fecha_i").change(function(){
        buscarAplicacions()
    })


}

function imprimirEspecial(obj){
    var id;

    $(obj).parent("td").parent("tr").find("td").each(function(){
        if($(this).attr("data")=="id"){
           id= $(this).text()
        }
    })


    var fecha=$("#fecha_apl_esp").val()
    var dataUrl="enfermeria/impaplicacionesp?id="+id;
    window.open(dataUrl);
    /*
    $("#load_pdf").show();
    var fecha=$("#fecha_apl_esp").val()

    var iframe="<iframe src="+dataUrl+" width='100%' height='560'></iframe>"
    $("#load_pdf_data").html(iframe)
    */
}

function buscarAplicacions(){
    var fehai=$("#add_apl_fecha_i").val()
    var fehaf=$("#add_apl_fecha_f").val()
    dataStream="fechai="+fehai+"&fechaf="+fehaf
    $.ajax({
        url: "enfermeria/aplicacionrealizadas",
        type: 'POST',
        data: dataStream,
        dataType: 'json',
        async:false,

        success: function(data){
            set_table_aplicacion(data,"table_aplicaciones_diarias")

        },
        error: function(){

        }
    });

}



function buscarNotas(){
    var id= $("#add_notas_paciente_id").val()
    var fecha= $("#add_notas_fecha").val()
    $.ajax({
        url: "enfermeria/mostrarnotas",
        type: 'POST',
        data: "id="+id+"&fecha="+fecha,
        dataType: 'json',
        async:false,
        success: function(data){
            set_table_aplicacion(data,"table_notas_enfermeria")

        },
        error: function(){

        }
    });

}

function buscarAplicacionsEsp(){

    $.ajax({
        url: "enfermeria/aplicacionrealizadasesp",
        type: 'POST',
        data: "",
        dataType: 'json',
        async:false,
        success: function(data){
            set_table_aplicacion_esp(data,"table_aplicaciones_diarias_esp")

        },
        error: function(){

        }
    });

}

function validarGuardar(){

    var alerta=false;
    var pac=$("#add_pac_nombres_apl").val();
    var med=$("#add_apl_medicamento_lab").val();
    var can=$("#add_apl_cantidad").val();
    var via=$("#add_apl_via").val();
    var aple=$("#add_apl_re_e").val();
    var apli=$("#add_apl_re_i").val();
    var feh=$("#add_apl_fecha").val();
    /*Nuevos*/
    var dur=$("#add_durobs_esp").val();
    var aler=$("#add_alergias_esp").val();
    var obs=$("#add_otras_obs_esp").val();

    if(pac==""){
        alerta="Debe elegir el pciente";
    }else if(med==""){
        alerta="Debe elegir el medicamanto";
    }else if(can==""){
        alerta="Debe digitar la cantidad";
    }else if(via==""){
        alerta="Debe digitar la via de administracion";
    }else if(aple==""){
        alerta="Debe digitar la Reacción Extrinsea";
    }else if(apli==""){
        alerta="Debe digitar la Reacción Intrinseca";
    }else if(feh==""){
        alerta="Debe digitar la Fecha";
    }else if(dur==""){
        alerta="Debe digitar la Duración/Observaciones";
    }else if(aler==""){
        alerta="Debe la reaccion Alergica";
    }else if(obs=="") {
        alerta = "Debe Otras observaciones"
    }

    if(alerta){
        opnoty['type']="warning"
        opnoty['text']=alerta
        var n = noty(opnoty);
        rtn= false;
    }else{
        guargarAplicacion()
    }
}



function validarGuardarEsp(){

    var alerta=false;
    var pac=$("#apl_paciente_id_esp").val();
    var med=$("#add_apl_medicamento_esp").val();
    var adm=$("#add_apl_administracion_esp").val();
    var dur=$("#add_durobs_esp").val();
    var otras=$("#add_otras_obs_esp").val();
    var aler=$("#add_alergias_esp").val();
    var can=$("#add_cantidad_esp").val();


    if(pac==""){
        alerta="Debe elegir el pciente";
    }else if(med==""){
        alerta="Debe elegir el medicamanto";
    }else if(can==""){
        alerta="Debe digitar la Cantidad";
    }else if(adm==""){
        alerta="Debe digitar la Aplicacion";
    }else if(dur==""){
        alerta="Debe digitar duracion/observaciones";
    }else if(otras==""){
        alerta="Debe digitar otras observaciones";
    }else if(aler==""){
        alerta="Debe digitar la Reacción alergica";
    }

    if(alerta){
        opnoty['type']="warning"
        opnoty['text']=alerta
        var n = noty(opnoty);
        rtn= false;
    }else{
        guargarAplicacionEsp()
    }
}





function
    guargarAplicacion(){

    var formData=$("#formAplicacion").serialize();

    $.ajax({
        url: "enfermeria/aplicacion",
        type: 'POST',
        data: formData,
        dataType: 'json',
        async:false,
        success: function(data){
            if(data["error"]){
                opnoty['type']="error"
                opnoty['text']="La cantidad aplicada no corresponde con la que existencia, Revise el lote seleccionado"
                var n = noty(opnoty);
                return
            }

            opnoty['type']="success"
            opnoty['text']="Guardado Correctamente"
            var n = noty(opnoty);
            rtn=true;
            buscarAplicacions()
            resertAplicacionEnf()
        },
        error: function(){
            opnoty['type']="error"
            opnoty['text']="Error al guardar"
            var n = noty(opnoty);
            rtn=false;
        }
    });

}


function guargarAplicacionEsp(){

    var formData=$("#formAplicacionEsp").serialize();

    $.ajax({
        url: "enfermeria/aplicacionespecial",
        type: 'POST',
        data: formData,
        dataType: 'json',
        async:false,
        success: function(data){
            if(data["error"]){
                opnoty['type']="error"
                opnoty['text']="La cantidad aplicada no corresponde con la que existencia, Revise el lote seleccionado"
                var n = noty(opnoty);
                return
            }

            opnoty['type']="success"
            opnoty['text']="Guardado Correctamente"
            var n = noty(opnoty);
            rtn=true;
            buscarAplicacionsEsp();
            resertAplicacionEnfEsp()
        },
        error: function(){
            opnoty['type']="error"
            opnoty['text']="Error al guardar"
            var n = noty(opnoty);
            rtn=false;
        }
    });

}

function resertAplicacionEnf(){

    $('#add_apl_medicamento_lab option:first').attr('selected', 'selected');
    $('input.ui-autocomplete-input').val($('#add_apl_medicamento_lab option:first').text());


    $("#add_paciente_id_apl").val("");
    $("#add_pac_nombres_apl").val("");
    $("#add_apl_cantidad").val("");
    //$("#add_apl_via").val("");
    //$("#add_apl_re_e").val("");
    //$("#add_apl_re_i").val("");
    $("#unidades_apl").text("");


}




function resertAplicacionEnfEsp(){

    $("#add_pac_nombres_esp").val();
    $("#add_paciente_id_esp").val();
    $("#add_apl_medicamento_esp").val();
    $("#add_apl_administracion_esp").val();
    $("#add_durobs_esp").val();
    $("#add_otras_obs_esp").val();
    $("#add_alergias_esp").val();
}


function existePacienteAplicacion(id){


    $.ajax({
        url: "pacientes/buscar",
        type: 'POST',
        data: "id="+id,
        dataType: 'json',
        success: function(data){
            if(data){
                var smal=true
                $.each(data, function(index){
                    smal=false
                    $("#add_pac_nombres_apl").val(
                        data[index].pac_nombre1+" "+
                        data[index].pac_nombre2+" "+
                        data[index].pac_apellido1+" "+
                        data[index].pac_apellido2+" "
                    )
                    $("#apl_paciente_id_add").val(data[index].id);

                    /*Para aplicacion especial*/
                    $("#add_pac_nombres_esp").val(
                        data[index].pac_nombre1+" "+
                        data[index].pac_nombre2+" "+
                        data[index].pac_apellido1+" "+
                        data[index].pac_apellido2+" "
                    )
                    $("#apl_paciente_id_esp").val(data[index].id);



                })

                if(smal){
                    limpiartabla($("#table_notas_enfermeria"))
                    opnoty['type']="warning"
                    opnoty['text']="No se encontro ningun paciente con:"+id
                    var n = noty(opnoty);
                }
            }else{



            }
        },
        error: function(){
            opnoty['type']="error"
            opnoty['text']="Error al buscar informacion"
            var n = noty(opnoty);
        }
    })
}


function existePacienteNotas(id){


    $.ajax({
        url: "pacientes/buscarnotas",
        type: 'POST',
        data: "id="+id,
        dataType: 'json',
        success: function(data){
            if(data){
                var smal=true
                $.each(data, function(index){
                    smal=false

                    $("#add_notas_paciente_id").val(data[index].paciente_id);
                    $("#add_notas_paciente_nom").val(data[index].paciente);


                    $("#add_notas_paciente_edad").val(data[index].edad);
                    $("#add_notas_paciente_ent_id").val(data[index].entidades_id);
                    $("#add_notas_paciente_ent_nom").val(data[index].entidad);

                    buscarNotas()
                })

                if(smal){
                    limpiartabla($("#table_notas_enfermeria"))
                    opnoty['type']="warning"
                    opnoty['text']="No se encontro ningun paciente con:"+id
                    var n = noty(opnoty);
                }
            }else{



            }
        },
        error: function(){
            opnoty['type']="error"
            opnoty['text']="Error al buscar informacion"
            var n = noty(opnoty);
        }
    })
}






function set_table_aplicacion(data,div){
    if(!data){
        data="Sin resultados"
        $("#"+div).html(data)
    }else{



        keys=data.reduce(function(keys, element){
            for (key in element) {
                keys.push(key);
            }
            return keys;
        },[]);
        Array.prototype.unique=function(a){
            return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
        });
        th="<thead><tr class=\"alert alert-info\">"
        keys=keys.unique()
        $.each(keys, function(index) {
            th+="<th>"+ keys[index].toUpperCase().replace("_"," ")+ "</th>"
        });
        th+="<td></td></tr></thead>"
        td="<tbody>"
        $.each(data, function(index,element) {
            var btn='<td><button type="submit" onclick="openDialogNotas(this)"  class="btn btn-info " > EDITAR</button></td>'

            td+="<tr>"
            $.each(element,function(index2,element2){
                td+="<td data='"+index2+"'>"+element2+"</td>"
            })
            td+=btn

            td+="</tr>"
        });
        td+="</tbody>"
        table="<table class='table table-bordered'>"
        table+=th+td+"</table>"
        /*console.log(td)*/
        $("#"+div).html(table)
    }
}




function set_table_aplicacion_esp(data,div){
    if(!data){
        data="Sin resultados"
        $("#"+div).html(data)
    }else{

        var btn='<td><button type="submit" onclick="imprimirEspecial(this)"  class="btn btn-success " > Imprimir</button></td>'

        keys=data.reduce(function(keys, element){
            for (key in element) {
                keys.push(key);
            }
            return keys;
        },[]);
        Array.prototype.unique=function(a){
            return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
        });
        th="<thead><tr class=\"alert alert-info\">"
        keys=keys.unique()
        $.each(keys, function(index) {
            th+="<th>"+ keys[index].toUpperCase().replace("_"," ")+ "</th>"
        });
        th+="<td></td></tr></thead>"
        td="<tbody>"
        $.each(data, function(index,element) {
            td+="<tr>"
            $.each(element,function(index2,element2){
                td+="<td data='"+index2+"'>"+element2+"</td>"
            })
            td+=btn

            td+="</tr>"
        });
        td+="</tbody>"
        table="<table class='table table-bordered'>"
        table+=th+td+"</table>"
        /*console.log(td)*/
        $("#"+div).html(table)
    }
}





function guardarNota(form){

    var formData=$(form).serialize();

    $.ajax({
        url: "enfermeria/guardarnota",
        type: 'POST',
        data: formData,
        dataType: 'json',
        async:false,
        success: function(data){

            opnoty['type']="success"
            opnoty['text']="Guardado Correctamente"
            var n = noty(opnoty);
           // $("#add_notas_fecha").val("")
            $("#add_notas_hora").val("")
            $("#add_notas_nota").val("")


            buscarNotas()

        },
        error: function(){
            opnoty['type']="error"
            opnoty['text']="Error al guardar"
            var n = noty(opnoty);
            rtn=false;
        }
    });

}





function calcularCantidad(){
    var cantimed=$("#add_apl_cantidad").val();

    var medtext=$("#add_apl_medicamento_lab option:selected").text()
    console.log(medtext)
    medtext=medtext.split(":");
    var unidades=cantimed*medtext[1];
    $("#unidades_apl").text(unidades);

    $("#unidades_apl").parpadear()

}


function calcularCantidadEsp(){
    var cantimed=$("#add_cantidad_esp").val();

    var medtext=$("#add_apl_medicamento_esp option:selected").text()
    console.log(medtext)
    medtext=medtext.split(":");
    var unidades=cantimed*medtext[1];
    $("#unidades_apl_esp").text(unidades);

    $("#unidades_apl_esp").parpadear()

}

var ideee;
var notaeee;
var fechaeee;
var horaeee;

function  openDialogNotas(obj){

    $("#diaglognotasedit").dialog("open");


    $(obj).parent("td").parent("tr").find("td").each(function(){
        if($(this).attr("data")=="id"){
            ideee= $(this).text()
        }
        if($(this).attr("data")=="nota"){
            notaeee= $(this).text()
        }

        if($(this).attr("data")=="fecha"){
            fechaeee= $(this).text()
        }
        if($(this).attr("data")=="hora"){
            horaeee= $(this).text()
        }
    })




    $("#idnotae").val(ideee);
    $("#fechanotae").val(fechaeee)
    $("#horanotae").val(horaeee)
    $("#textnotae").val(notaeee)

}


function gurdarnotaEdit(){


    var formData="";
    formData+="id="+$("#idnotae").val();
    formData+="&fecha="+$("#fechanotae").val()
    formData+="&hora="+$("#horanotae").val()
    formData+="&nota="+$("#textnotae").val()
    formData+="&ideee="+ideee;
    formData+="&fechaeee="+fechaeee
    formData+="&horaeee="+horaeee
    formData+="&notaeee="+notaeee



    $.ajax({
        url: "enfermeria/guardaredit",
        type: 'POST',
        data: formData,

        async:true,
        success: function(data){

            opnoty['type']="success"
            opnoty['text']="Guardado Correctamente"
            var n = noty(opnoty);
            rtn=true;
            $("#diaglognotasedit").dialog("close");
            buscarNotas()

        },
        error: function(){
            opnoty['type']="error"
            opnoty['text']="Error al guardar"
            var n = noty(opnoty);
            rtn=false;
        }
    });


}

function elminarnotaeEdit(){


    var formData="";
    formData+="id="+$("#idnotae").val();
    formData+="&fecha="+$("#fechanotae").val()
    formData+="&hora="+$("#horanotae").val()
    formData+="&nota="+$("#textnotae").val()
    formData+="&ideee="+ideee;
    formData+="&fechaeee="+fechaeee
    formData+="&horaeee="+horaeee
    formData+="&notaeee="+notaeee

    $.ajax({
        url: "enfermeria/elminarnotaedit",
        type: 'POST',
        data: formData,

        async:true,
        success: function(data){

            opnoty['type']="success"
            opnoty['text']="Guardado Correctamente"
            var n = noty(opnoty);
            rtn=true;
            $("#diaglognotasedit").dialog("close");
            buscarNotas()

        },
        error: function(){
            opnoty['type']="error"
            opnoty['text']="Error al guardar"
            var n = noty(opnoty);
            rtn=false;
        }
    });


}





function setDialogNotas(id) {


    $("#" + id).dialog({
        autoOpen: false,
        modal: true,
        minHeight: 500,
        minwidth: 900,
        position: { my: "center", at: "center top" },
        buttons: {

            Cerrar: function () {
                $(this).dialog("close");
            }
        },
        show: {
            effect: "blind",
            duration: 300
        },
        hide: {
            effect: "fade",
            duration: 300
        },
        closeOnEscape: false,

    })

}
(function( $ ) {
    $.widget( "custom.combobox", {
        _create: function() {
            this.wrapper = $( "<span>" )
                .addClass( "form-control" )
                .insertAfter( this.element );

            this.element.hide();
            this._createAutocomplete();
            this._createShowAllButton();
        },

        _createAutocomplete: function() {
            var selected = this.element.children( ":selected" ),
                value = selected.val() ? selected.text() : "";

            this.input = $( "<input>" )
                .appendTo( this.wrapper )
                .val( value )
                .attr( "title", "" )
                .addClass( "form-control " )
                .autocomplete({
                    delay: 0,
                    minLength: 0,
                    source: $.proxy( this, "_source" )
                })
                .tooltip({
                    tooltipClass: "ui-state-highlight"
                });

            this._on( this.input, {
                autocompleteselect: function( event, ui ) {
                    ui.item.option.selected = true;
                    this._trigger( "select", event, {
                        item: ui.item.option
                    });
                },

                autocompletechange: "_removeIfInvalid"
            });
        },

        _createShowAllButton: function() {
            var input = this.input,
                wasOpen = false;

            $( "<a>" )
                .attr( "tabIndex", -1 )
                .attr( "title", "Show All Items" )
                .tooltip()
                .appendTo( this.wrapper )
                .button({
                    icons: {
                        primary: "ui-icon-triangle-1-s"
                    },
                    text: false
                })
                .removeClass( "ui-corner-all" )
                .addClass( "custom-combobox-toggle ui-corner-right" )
                .mousedown(function() {
                    wasOpen = input.autocomplete( "widget" ).is( ":visible" );
                })
                .click(function() {
                    input.focus();

                    // Close if already visible
                    if ( wasOpen ) {
                        return;
                    }

// Pass empty string as value to search for, displaying all results
                    input.autocomplete( "search", "" );
                });
        },

        _source: function( request, response ) {
            var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
            response( this.element.children( "option" ).map(function() {
                var text = $( this ).text();
                if ( this.value && ( !request.term || matcher.test(text) ) )
                    return {
                        label: text,
                        value: text,
                        option: this
                    };
            }) );
        },

        _removeIfInvalid: function( event, ui ) {

            // Selected an item, nothing to do
            if ( ui.item ) {
                return;
            }

// Search for a match (case-insensitive)
            var value = this.input.val(),
                valueLowerCase = value.toLowerCase(),
                valid = false;
            this.element.children( "option" ).each(function() {
                if ( $( this ).text().toLowerCase() === valueLowerCase ) {
                    this.selected = valid = true;
                    return false;
                }
            });

// Found a match, nothing to do
            if ( valid ) {
                return;
            }

// Remove invalid value
            this.input
                .val( "" )
                .attr( "title", value + " No concuerda con ningno resgistrado" )
                .tooltip( "open" );
            this.element.val( "" );
            this._delay(function() {
                this.input.tooltip( "close" ).attr( "title", "" );
            }, 2500 );
            this.input.autocomplete( "instance" ).term = "";
        },

        _destroy: function() {
            this.wrapper.remove();
            this.element.show();
        }
    });
})( jQuery );

