/**
 * Created by Aikon on 16/10/14.
 */

    function initAdmin(){
        $("#form_sum_laboratorio").hide();
        $("#form_sum_bodega").hide();
        $("#add_sum_fuente").change(function(){loadFormSuministro(this)})

        $("#add_sum_medicamento_lab" ).combobox();

        $("#add_sum_table_lab").click(function(){
            validarSuministroLabTabla();

        })

        $("#add_sum_table_lab_save").click(function(){
            var existrow=false
            $("#sum_table_medicamento").find("tr").each(function(){

                existrow=true
            })

            console.log(existrow)
            if(existrow){
                guargarMedicamentoLab();
            }


        })

        setDatePickerSum($("#add_fecha_vencimiento_lote_lab"))




    }

    function setDatePickerSum(obj){
        $(obj).datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: "+nn:2050",
            dateFormat: "yy/mm/dd"
        });
    }


    function loadFormSuministro(obj){
        $("#fuente_suministro").hide();
        resetSuministro();
        if($(obj).val()=="bodega"){
            $("#form_sum_laboratorio").hide();
            $("#form_sum_bodega").show("slide","easeOutCubic",tsin)

        }else{
            $("#form_sum_bodega").hide();
            $("#form_sum_laboratorio").show("slide","easeOutCubic",tsin)

        }

    }


    function resetSuministro(){
        $("#add_sum_bodega").val("")
        $("#add_sum_laboratorio").val("")
    }

    function validarSuministroLabTabla(){

        var alerta=false;
        var med=$("#add_sum_medicamento_lab").val()
        var medtext=$("#add_sum_medicamento_lab option:selected").text()
        var lab=$("#add_sum_laboratorio_lab").val()
        var va_c=$("#add_sum_vl_costo_lab").val()
        var va_v=$("#add_sum_vl_venta_lab").val()
        var cant=$("#add_sum_cantidad_lab").val()
        var pres=$("#add_presentacion_lab").val()
        var lote=$("#add_sum_lote_lab").val()
        var fec_v=$("#add_fecha_vencimiento_lote_lab").val()
        var cod_f=$("#add_cod_factura_lab").val()
        var reg_i=$("#add_registro_invima_lab").val()
        if(med==""){
            alerta="Debe elegir el medicamento";
        }else if(lab==""){
            alerta="Debe elegir el laboratorio";
        }else if(cod_f==""){
            alerta="Debe digitar el codigo de la factura";
        }else if(va_c==""){
            alerta="Debe digitar el costo";
        }else if(va_v==""){
            alerta="Debe digitar el valor de venta";
        }else if(cant==""){
            alerta="Debe digitar la cantidad";
        }else if(pres==""){
            alerta="Debe digitar la presentación";
        }else if(lote==""){
            alerta="Debe digitar el lote";
        }else if(fec_v==""){
            alerta="Debe digitar la fecha de vencimiento";
        }

        if(alerta){
            opnoty['type']="warning"
            opnoty['text']=alerta
            var n = noty(opnoty);
            rtn= false;
        }else{


            td="";
            td=td+"<td  data='id'>"+med+"</td>";
            td=td+"<td  data='nombre'>"+medtext+"</td>";

            td=td+"<td  data='va_c'>"+va_c+"</td>";
            td=td+"<td  data='va_v'>"+va_v+"</td>";
            td=td+"<td  data='cant'>"+cant+"</td>";
            td=td+"<td  data='pres'>"+pres+"</td>";
            td=td+"<td  data='lote'>"+lote+"</td>";
            td=td+"<td  data='fec_v'>"+fec_v+"</td>";
            td=td+"<td  data='reg_i'>"+reg_i+"</td>";

            td=td+"<td onclick='eliminarFilaSubMedicamentos(this)'><span class='glyphicon glyphicon-remove pointer'></span></td>";


            if(validarExisteTableSum(med,lote)){
                var tr="<tr >"+td+"</tr>"

                $("#sum_table_medicamento tbody").append(tr);
                limpiarCamposSum()
            }


        }



    }


    function limpiarCamposSum(){

        $('#add_sum_medicamento_lab option:first').attr('selected', 'selected');
        $('input.ui-autocomplete-input').val($('#add_sum_medicamento_lab option:first').text());

        $("#add_sum_vl_costo_lab").val("")
        $("#add_sum_vl_venta_lab").val("")
        $("#add_sum_cantidad_lab").val("")
        $("#add_sum_lote_lab").val("")
        $("#add_fecha_vencimiento_lote_lab").val("")
        $("#add_registro_invima_lab").val("")

    }

    function limpiarTosoSum(){
        limpiarCamposSum()
        $("#add_sum_laboratorio_lab").val("")
        $("#add_sum_laboratorio_lab_text").val("")
        $("#add_cod_factura_lab").val("")
        $("#add_sum_bodega_lab").val("")
    }

    function validarExisteTableSum(med,lote){

        var ddid=false;
        var ddlote=false;
        $("#sum_table_medicamento").find("tr").each(function(){


            $(this).find("td").each(function(){

                if($(this).attr("data")=="id"){

                    if($(this).text()==med) ddid=true
                }

                if($(this).attr("data")=="lote"){

                    if($(this).text()==lote) ddlote=true
                }


            })

        })

        if(ddid && ddlote){

                opnoty['type']="warning"
                opnoty['text']="El medicamento ya fue incluido"
                var n = noty(opnoty);

                return false;
        }


        return true;
    }

    function guargarMedicamentoLab(){

        var canti=0;
        var lab=$("#add_sum_laboratorio_lab").val()
        var fact=$("#add_cod_factura_lab").val()
        var bode=$("#add_sum_bodega_lab").val()

        var formData="laboratorio_id="+lab
        formData+="&cod_factura="+fact
        formData+="&bodega_id="+bode

        var formDataV=""

        $("#sum_table_medicamento").find("tr").each(function(){

            $(this).find("td").each(function(){

                if($(this).attr("data")=="id"){ formDataV+="&medicamento_id["+canti+"]="+$(this).text()   }

                if($(this).attr("data")=="va_c"){ formDataV+="&vl_costo["+canti+"]="+$(this).text()   }

                if($(this).attr("data")=="va_v"){ formDataV+="&vl_venta["+canti+"]="+$(this).text()   }

                if($(this).attr("data")=="cant"){ formDataV+="&cantidad["+canti+"]="+$(this).text()   }

                if($(this).attr("data")=="pres"){ formDataV+="&presentacion["+canti+"]="+$(this).text()   }

                if($(this).attr("data")=="lote"){ formDataV+="&lote["+canti+"]="+$(this).text()   }

                if($(this).attr("data")=="fec_v"){ formDataV+="&fecha_vencimiento["+canti+"]="+$(this).text()   }

                if($(this).attr("data")=="reg_i"){ formDataV+="&registro_invima["+canti+"]="+$(this).text()   }

            })

            canti++
        })

        formData+=formDataV



        $.ajax({
            url: "bodegas/suministrar",
            type: 'POST',
            data: formData,
            dataType: 'json',
            async:false,
            success: function(data){
                limpiartabla($("#sum_table_medicamento"));
                limpiarTosoSum();
                opnoty['type']="success"
                opnoty['text']="Guardado Correctamente"
                var n = noty(opnoty);
                rtn=false;
            },
            error: function(){
                opnoty['type']="error"
                opnoty['text']="Error al guardar"
                var n = noty(opnoty);
                rtn=false;
            }
        });




    }




    function eliminarFilaSubMedicamentos(obj){
        $(obj).parent("tr").remove()
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

