    /*config*/
    /*config*/
    var tsin=200/*Transition Speed in*/
    var tsot=200/*Transition Speed out*/


    /*indica el menu superio actual*/
    var currentMenu     = "sub-dashboard";
    var frameWork       = new Array();
    var currentFrame    = null;
    var color           = new Array('success','primary','warning','info');
    var screenwidth=screen.width;
    var screenheight=screen.height;
    var entities=null;
    var ocupaciones=null;
    var pacientes=null;
    var urlSearch="";
    var data_sel_row="";
    var table_active;
    var whoCalled=""
    var data_sel_row
    var codigo_sel_row
    var departamento;
    var municipios;
    var medicos;
    var activeForm;
    var opnoty= {layout:'topRight',type:'',text:'',dismissQueue:true,maxVisible:3,timeout:2000};
    var articulaciones=null;
    var pre_form
    var currenCalendar
    var tipoentidades=null
    var buscar_listas=true;
    var cm=0;/*Cantidad de medicamentos en la tabla e medicamentos en la historia clinica*/
    var pac_sexo;
    var idtextActive
    var procedimientos=null

    /*console.log(medicos)*/

    $(document).ajaxStart(function(){$('#loader_gif').show()})
    $(document).ajaxStop(function(){$('#loader_gif').hide();});



    $(document).ready(function(){
        init();

    })


    function init(){

        $(".main-menu").hide();
        $(".sub-menu-icons").hide();
        $("#load_pdf").hide();
        $("#load_pdf").addClass("load_pdf")
        Efectos()
        Acciones()
        CssChange()
        Loaders()
        setDialog("dialog");

    }

    function initComponents(){

        $("select").blur(function(){$(this).removeClass("focus")})
        $("select").focus(function(){$(this).addClass("focus")  })
        $("input").blur(function(){$(this).removeClass("focus") })
        $("input").focus(function(){$(this).addClass("focus")   })
        $("textarea").blur(function(){$(this).removeClass("focus") })
        $("textarea").focus(function(){$(this).addClass("focus")   })
        $("#hist-table-medicamentos").css("cursor","pointer")
        $("#add_hist_medicamento_btn").click(function(){ addMedicamentosTabla()})
        $("#add_hist_remisiones_btn").click(function(){ addRemisionesTabla()})

        $("#add_hist_procedimeintos_btn").click(function(){ addProcedimientosTabla()})



        $(".loadhistorialpaciente").click(function(){

            var idpac=$(this).parent("li").parent("ul").attr("paciente")
            loadHistorialPaciente("hist-historiales",idpac)
        })

        $(".loadremisionpaciente").click(function(){
            var idpac=$(this).parent("li").parent("ul").attr("paciente")
            loadremisionpaciente()
        })
        $(".loadprocedimientodpaciente").click(function(){
            var idpac=$(this).parent("li").parent("ul").attr("paciente")
            ladprocedimientospaciente()
        })


        $(".loadmedicamentospaciente").click(function(){
            var idpac=$(this).parent("li").parent("ul").attr("paciente")
            loadmedicamentospaciente()
        })


        $(".loaddiagnosticospaciente").click(function(){
            var idpac=$(this).parent("li").parent("ul").attr("paciente")
            loaddiagnosticopaciente()
        })

        $("#cita_pac_iden").keypress(function(e) {
            e.preventDefault()
            if(e.which == 13) {
                existePaciente($("#cita_pac_iden").val())
            }
        });

    }

    function initForm(form){


        activeForm=form;
        $("#"+form).validate({
            submitHandler: function(form){
                formid=$(form).find( "input[name='search_form']" ).val();
                switch(formid){
                    case "search_data_entidades":
                        ajax_table(form,'load_data_search_entidades');
                        break;
                    case "search_data_ocupaciones":
                        ajax_table(form,'load_data_search_ocupaciones');
                        break;
                    case "search_data_laboratorios":
                        ajax_table(form,'load_data_search_laboratorios');
                        break;
                    case "search_data_articulaciones":
                        ajax_table(form,'load_data_search_articulaciones');
                        break;

                    case "search_data_pacientes":

                        if(whoCalled=="facturacion"){
                            var entidad_id=$("#add_fact_entidad").val()
                            var text="<input type='hidden' name='entidad_id' value='"+entidad_id+"'>"

                            $("#add_entidad_search_data").html(text)

                        }

                        if(whoCalled=="cotizaciones"){
                            var entidad_id=$("#add_coti_entidad").val()
                            var text="<input type='hidden' name='entidad_id' value='"+entidad_id+"'>"

                            $("#add_entidad_search_data").html(text)

                        }
                        ajax_table(form,'load_data_search_pacientes');
                        break;
                    case "search_data_procedimientos":
                        ajax_table(form,'load_data_search_procedimientos');
                        break;

                    case "addPatient":

                        save(addPatient,'pacientes/guardar');
                        break;
                    case "newDate":

                        save(form,'citas/guardar');
                        break;
                    case "search_data_tipoentidades":
                        ajax_table(form,'load_data_search_tipoentidades');
                        break;
                    case "guardarEntidad":
                        save(addEntidad,'entidades/guardar');
                        break;
                    case "search_data_diagnosticos":

                        ajax_table(form,'load_data_search_diagnosticos',"&sexo="+pac_sexo);
                        break;
                    case "addenfermeria":

                        if(validarTabs("tabsenfermeria",form)){
                            if(save(form,'historias/guardarEnfermeria')){
                                limpiartabla($("#listadeesperaEnfermeria"))
                                loadContent("esperaEnfermera")

                                setTimeout(function() {
                                    buscar_lista_enf("listadeesperaEnfermeria")
                                }, 3000);



                            }
                        }
                        break;
                    case "addhistoriaclinica":
                        var cont=0;
                        $("#hist-table-medicamentos tbody").find("tr").each(function(){
                            cont++;
                        })
                        if(cont==0){
                            alert("Debe digitar los medicamentos");
                            return;
                        }


                        if(validarTabs("tabsHistoriaclinica",form)){
                            if(save(form,'historias/guardarhistoria')){
                                loadContent("salaEspera")
                                buscar_lista("listadeespera")
                            }
                        }
                        break;

                    case "addhistoriaPsicologia":

                        save($("#addhistoriaPsicologia"),'historias/guardarPsicologia');
                            loadContent("salaEspera")
                            buscar_lista("listadeespera")
                        break;

                    case "addhistoriaPsicologiaSeguimiento":

                        save($("#addhistoriaPsicologiaSeguimiento"),'historias/guardarPsicologiaSeguimiento');
                            loadContent("salaEspera")
                            buscar_lista("listadeespera")
                        break;

                    case "addhistoriaFisioterapia":

                        var html=$("#newexamenmusculo").html()

                        $("#examenfisicoFisio").val(html)
                        if(validarTabs("tabsHistoriafisioterapia",form)){
                            if(gusradarExamesFisio()){

                                if(save($("#addhistoriaFisioterapia"),'historias/guardarFisioterapia')){
                                    loadContent("salaEspera")
                                    buscar_lista("listadeespera")
                                }
                            }

                        }





                        break;
                    case "addhistoriaFisioterapiaSeguimiento":

                        var html=$("#newexamenmusculo").html()

                        $("#examenfisicoFisio").val(html)



                        if(validarTabs("tabsHistoriafisioterapiaseg",form)) {
                            if(gusradarExamesFisioSegui()){

                                if(save($("#addhistoriaFisioterapiaSeguimiento"), 'historias/guardarFisioterapiaSeguimiento')) {
                                    loadContent("salaEspera")
                                    buscar_lista("listadeespera")
                                }
                            }
                        }
                        break;
                    case "addhistoriaodontologia":
                        var html=$("#odontogramadatahtml").html()

                        if(newOdontograma){
                            $("#odontogramadata").val(html)
                        }


                        $("#hist-table-procedimeintos tbody").find("tr").each(function(){

                            $(this).find("td").each(function(){

                                if($(this).attr("data")=="procid"){

                                    $("#procedimientos_data_hist").val($("#procedimientos_data_hist").val()+","+$(this).text())
                                }
                            })
                        })




                        if(validarTabs("tabsHistoriaodontologia",form)){

                            if(save(form,'historias/guardarhistoriaodontologia')){
                                loadContent("salaEspera")
                                buscar_lista("listadeespera")
                            }
                        }
                        break;
                    case "addhistoriaendodoncia":




                        if(validarTabs("tabsHistoriaendodoncia",form)){

                            if(guardarEndodoncia()){
                                if(save(form,'historias/guardarhistoriaodontologia')){
                                    loadContent("salaEspera")
                                    buscar_lista("listadeespera")
                                }
                            }


                        }
                        break;

                    case "addLaboratorio":

                        save(form,'laboratorios/guardar')
                        break;
                    case "addBodegas":

                        save(form,'bodegas/guardar')
                        break;
                    case "prochisprocedimiento":

                        if(save(form,'procedimientos/prochisprocedimiento')){
                            buscarProcedimientos()
                        }
                        break;


                }


            }
        })

        $("#"+form).find("input").each(function(){
            var tempAttr=$(this)
            if($(this).attr("data-rule-date")=="true"){
                setDatePicker(this)
            }

            if($(this).attr("data-focus-lost")=="true"){
                $(tempAttr).blur(function(){
                    focusLost(tempAttr)
                })
            }

            if($(this).attr("data-calendar")=="true"){
                buscar_citas(getCalendar())
                changeCalendar(this)
            }

            if($(this).attr("name")=="pre_form"){
                pre_form=$(this).val()
            }

            if($(this).attr("data")=="admisiones-date"){
                $(tempAttr).change(function(){
                    buscar_citas_admisiones($(tempAttr).val());
                })
            }


        })

        $("#"+form).find("select").each(function(){
            var tempAttr=$(this)
            if($(this).attr("data-departamentos")=="true"){

                $.each(departamentos, function (i, item) {

                    $(tempAttr).append($('<option>', {
                        value: item.id,
                        text : item.dep_nombre
                    }));
                });

                $(tempAttr).change(function(){
                    cambiar_municipio();
                })

            }

            if($(this).attr("data-municipios")=="true"){
                $.each(municipios, function (i, item) {
                    $(tempAttr).append($('<option>', {
                        value: item.id,
                        text : item.nombre
                    }));
                });
            }

            if($(this).attr("data-medicos")=="true"){
                $.each(medicos, function (i, item) {
                    $(tempAttr).append($('<option>', {
                        value: item.id,
                        text : item.nombres
                    }));
                });
            }

            if($(this).attr("data-medicos-calendar")=="true"){

                $(tempAttr).change(function(){
                    buscar_citas(getCalendar(),$(tempAttr).val())
                })
            }


        })




    }



    function save(form,url){
        var rtn=true;
        formData=$(form).serialize();
        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            dataType: 'json',
            async:false,
            success: function(data){
                opnoty['type']="success"
                opnoty['text']="Guardado Correctamente"
                var n = noty(opnoty);
                $(form).each(function(){ this.reset()});
            },
            error: function(){
                opnoty['type']="error"
                opnoty['text']="Error al guardar"
                var n = noty(opnoty);
                rtn=false;
            }
        });

        return rtn;
    }

    function guardarEndodoncia(){

        console.log($("#dientes_endodoncia").html())



        return ;
        var rtn=true;
        formData=$(form).serialize();
        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            dataType: 'json',
            async:false,
            success: function(data){
                opnoty['type']="success"
                opnoty['text']="Guardado Correctamente"
                var n = noty(opnoty);
                $(form).each(function(){ this.reset()});
            },
            error: function(){
                opnoty['type']="error"
                opnoty['text']="Error al guardar"
                var n = noty(opnoty);
                rtn=false;
            }
        });

        return rtn;
    }
    function focusLost(obj){
        var who = $(obj).attr("id");

        switch(who){
            case "add_pac_iden":
                existePaciente($(obj).val())
                break;
            case "cita_pac_iden":
                existePaciente($(obj).val())
                break;
            case "add_ent_identificacion":
                existeEntidad($(obj).val());
                break
        }

    }


    function setDialog(id){
        $("#"+id).dialog({
            autoOpen:false,
            modal: true,

            position: { my: "center", at: "center top" },
            buttons: {

                Cerrar: function() {
                    $( this ).dialog( "close" );
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
            open: function(event, ui) { $(".ui-dialog-titlebar").hide(); }
        })
    }

    function getCalendar(){
        var calendarObj;
        $("#"+activeForm).find("div").each(function(){
            if($(this).attr("data-calandar")=="calendario"){
                calendarObj=this
            }

        })
        return calendarObj;
    }

    function changeCalendar(obj){

        $(obj).change(function() {
            anio=$(obj).val().substring(0,4);
            mes=parseInt($(obj).val().substring(5,7)-1);
            dia=$(obj).val().substring(8,10);
            console.log(anio+mes+dia)

            switch(currentFrame){
                case "new-date":
                    $("#"+activeForm).find("div").each(function(){
                        /*alert($(this).attr("class"))*/
                        if($(this).attr("data-calandar")=="calendario"){
                            $(this).fullCalendar( 'gotoDate', anio , mes,  dia )
                            $(this).fullCalendar( "changeView", 'agendaDay' )
                        }
                    })
                    break
            }



        });
    }


    function buscar_citas(obj,id){
        $(obj).fullCalendar('destroy');

        if(id=="") return

        var options = {

            events: "citas/buscar?cit_cod_medico="+id,
            axisFormat : 'h(:mm)tt',

            currentTimezone: 'America/Bogota',
            allDay : false,

            editable: false,
            dayClick: function(date, allDay, jsEvent, view) {

            },
            eventClick: function(event, element) {
                detalle_cita(event);

            },
            theme: true,
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            timeFormat: {
                agenda: 'h(:mm)t{ - h(:mm)t}',
                '': 'h(:mm)t{-h(:mm)t }'
            },
            monthNames: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ],
            monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
            dayNames: [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            dayNamesShort: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],
            buttonText: {
                today: 'hoy',
                month: 'mes',
                week: 'semana',
                day: 'día'
            }
        };
        $(obj).fullCalendar(options);

    }

    function buscar_citas_admisiones(fecha){
        var data="fecha="+fecha;

        $.ajax({
            url: "citas/admitir",
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function(data){
                orden=1;

                if(data){
                    limpiartabla($("#listaadmitir"));
                    limpiartabla($("#listaadmitir2"));
                    $.each(data, function(index){
                        /*var paciente = data[index][0];*/
                        var idcita=data[index].id_cita

                        btn="";
                        btn+='<div class="btn-group">'
                        btn+='<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" >'
                        btn+='Accion<span class="caret"></span>'
                        btn+='</button><ul class="dropdown-menu">'
                        btn+='<li><a href="#" onclick="admitirCita('+idcita+',\''+fecha+'\')" >Admitir</a></li>'
                        btn+='<li><a href="#" onclick="cancelarCita('+data[index].id+')">Cancelar cita</a></li>'
                        btn+='</ul></div>'

                        td="";
                        td=td+"<td  data='id'><strong>"+(data[index].id_cita)+"</strong></td>";
                        td=td+"<td  data='hora'><strong>"+(data[index].hora)+"</strong></td>";
                        td=td+"<td  data='identificacion'><strong>"+(data[index].identificacion)+"</strong></td>";
                        td=td+"<td  data='nombrescompletos'><strong>"+(data[index].nombrescompletos)+"</strong></td>";
                        td=td+"<td  data='nombrescompletos'><strong>"+(data[index].profesional)+"</strong></td>";

                        td=td+"<td  data='tipo' colspan='2'><strong>"+(data[index].tipo)+"</strong></td>";


                        if(data[index].estado=="pendiente"){
                            td=td+"<td  data='boton' >"+btn+"</td>";
                            var tr="<tr class='alert alert-warning'>"+td+"</tr>"
                        }else if(data[index].estado=="atendiendo"){
                            var tr="<tr class='alert1 alert-info1'>"+td+"</tr>"
                        }else if(data[index].estado=="admitido"){
                            var tr1="<tr class='alert alert-success'>"+td+"</tr>"
                            $("#listaadmitir2 tbody").append(tr1);
                            $("#listaadmitir2").removeClass("hidden");
                        }

                        $("#listaadmitir tbody").append(tr);


                        orden++;
                    });
                }else{
                    td="";
                    td=td+"<td colspan='4'>No hay pacientes en sala</td>";
                    var tr="<tr >"+td+"</tr>"
                    $("#"+id+" tbody").append(tr);

                }
            },
            error: function(){
                opnoty['type']="error"
                opnoty['text']="Error al buscar informacion"
                var n = noty(opnoty);
            }
        })

    }

    function detalle_cita(id){
        $("#dialog").dialog("open")

        table ="<table class='table'>"
        table+="<tr><td>Doctor</td><td>"+id.medico+"</td></tr>"
        table+="<tr><td>Paciente</td><td>"+id.nombrescompletos+"</td></tr>"
        table+="<tr><td>Tipo</td><td>"+id.tipo+"</td></tr>"
        table+="<tr><td>Inicio</td><td>"+id.start.toLocaleString()+"</td></tr>"
        table+="<tr><td>Final</td><td>"+id.end.toLocaleString()+"</td></tr>"
        table+="<tr><td>Motivo</td><td>"+id.motivo+"</td></tr>"

        table+="</table>"


        $("#dialog").html(table)


    }


    function existePaciente(id){


        $.ajax({
            url: "pacientes/buscar",
            type: 'POST',
            data: "id="+id,
            dataType: 'json',
            success: function(data){
                if(data){
                    setPaciente(data)
                }
            },
            error: function(){
                opnoty['type']="error"
                opnoty['text']="Error al buscar informacion"
                var n = noty(opnoty);
            }
        })
    }


    function existeEntidad(id){


        $.ajax({
            url: "entidades/buscar_id",
            type: 'POST',
            data: "id="+id,
            dataType: 'json',
            success: function(data){
                if(data){
                    setEntidad(data)
                }
            },
            error: function(){
                opnoty['type']="error"
                opnoty['text']="Error al buscar informacion"
                var n = noty(opnoty);
            }
        })
    }


    function setPaciente(data){

        keys=data.reduce(function(keys, element){
            for (key in element) {
                keys.push(key);
                $("#"+pre_form+key).val(element[key])

                if(key=="pac_coddepartamento"){
                    cambiar_municipio()
                }

                if(key=="pac_codmunicipio"){
                    $("#"+pre_form+key).val(element[key])
                }
            }
        },[]);
    }



    function setEntidad(data){

        keys=data.reduce(function(keys, element){
            for (key in element) {
                keys.push(key);
                $("#"+pre_form+key).val(element[key])

                if(key=="ent_coddepartamento"){
                    cambiar_municipio()
                }

                if(key=="pac_codmunicipio"){
                    $("#"+pre_form+key).val(element[key])
                }
            }
        },[]);
    }

    function setDatePicker(obj){
        $(obj).datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: "1900:{{Date('Y')}}",
            dateFormat: "yy/mm/dd"
        });
    }

    function Loaders(){


    }


    function Efectos(){
        /*/muestra submenu de opciones*/
        $(".main-menu-top").click(function(){showMenu()})
        /**/
        /*/Muestra las opciones del submenu*/
        $(".menu-top-link").click(function(e){
            e.preventDefault()

            $(".menu-top-link").removeClass("active")
            $(this).addClass("active")

            submenu=$(this).attr("data-menu")

            $("#"+currentMenu).effect("drop","easeOutCubic",tsot,function(){
                $("#"+submenu).effect("slide","easeOutCubic",tsin)

                currentMenu=submenu
            });

        })

        $(".sub-menu-top-link").click(function(e){
            e.preventDefault()
            hideMenu()

            loadContent($(this).attr("data-menu"),$(this).attr("data-title"),$(this).attr("data-function"))

        })



    }

    function Acciones(){
        $("a").click(function(e){
            e.preventDefault()
        })

        $("#btn_cerrar_pdf").click(function(){
            $("#load_pdf").hide();
        })

    }

    function CssChange(){

    }


    function showMenu(){
        $(".main-menu").show()
    }
    function hideMenu(){
        $(".main-menu").effect("blind","easeOutCubic",200)
    }


    function mostrar_menu(){
        $(".main-menu").slideDown();
    }


    function loadContent(frame,title,url){
        resetVars();


        if(url=="usuarios/salir"){
            window.location ="usuarios/salir";
        }
        if(frameWork[frame]==null){
            frameWork[frame]=title
            $("#maincontent").append(newFrame(frame,title))

        }
        if(currentFrame==null){
            $("#content-"+frame).load(url, function() {
                $("#"+frame).effect("slide","easeOutCubic",tsin)
                currentFrame=frame;
            })

        }else{
            $("#content-"+frame).load(url)
            $("#"+currentFrame).effect("drop","easeOutCubic",1,function(){
                $("#"+frame).effect("slide","easeOutCubic",tsin)
                currentFrame=frame;
            });
        }
    }


    function newFrame(frame,title){

        var panel ='<div id="'+frame+'">'
        panel +='<div class="panel panel-'+color[Random(4)]+'">'
        panel +='<div class="panel-heading">'
        panel +='<h3 class="panel-title">'+title+'</h3>'
        panel +='</div><div style="min-height:'+(screenheight-200)+'px " class="panel-body" id="content-'+frame+'">'
        panel +='</div></div></div>'
        return panel;
    }

    function Random(x){
        return Math.floor((Math.random() * x) );
    }

    function resetVars(){
        buscar_listas=false;
    }

    function setVars(){
        buscar_listas=true;
    }


    function loadEntidades(id,who){

        whoCalled=activeForm=who

        $("#"+id).focus(function(){
            $("#"+currentFrame).effect("drop","easeOutCubic",1,function(){

                table_active="entidades"
                if(entities){
                    $("#search-entidades").effect("slide","easeOutCubic",tsin)
                }else{
                    $("#maincontent").append(newFrame("search-entidades","Buscar Entidades"))
                    $("#search-entidades").effect("slide","easeOutCubic",tsin)
                    $("#content-search-entidades").load("entities/search")
                    entities=true;
                }
                urlSearch="entities/search";
                currentFrame="search-entidades";
            });
        })


    }




    function loadPacientes(id,who){

        whoCalled=activeForm=who

        $("#"+id).focus(function(){
            $("#"+currentFrame).effect("drop","easeOutCubic",1,function(){

                table_active="pacientes"
                if(pacientes){
                    $("#search-pacientes").effect("slide","easeOutCubic",tsin)
                }else{
                    $("#maincontent").append(newFrame("search-pacientes","Buscar pacientes"))
                    $("#search-pacientes").effect("slide","easeOutCubic",tsin)
                    $("#content-search-pacientes").load("pacientes/search")
                    pacientes=true;
                }
                urlSearch="pacientes/search";
                currentFrame="search-pacientes";
            });
        })


    }


    function loadArticulaciones(id,who){


        whoCalled=activeForm=who

        $("#"+id).focus(function(){
            idtextActive=id
            $("#"+currentFrame).effect("drop","easeOutCubic",1,function(){

                table_active="articulaciones"
                if(articulaciones){
                    $("#search-articulaciones").effect("slide","easeOutCubic",tsin)
                }else{
                    $("#maincontent").append(newFrame("search-articulaciones","Buscar articulaciones"))
                    $("#search-articulaciones").effect("slide","easeOutCubic",tsin)
                    $("#content-search-articulaciones").load("articulaciones/search")
                    articulaciones=true;
                }
                urlSearch="articulaciones/search";
                currentFrame="search-articulaciones";
            });
        })


    }



    function loadProcedimientos(id,who){

        whoCalled=activeForm=who

        $("#"+id).focus(function(){
            $("#"+currentFrame).effect("drop","easeOutCubic",1,function(){

                table_active="procedimientos"
                if(procedimientos){
                    $("#search-procedimientos").effect("slide","easeOutCubic",tsin)
                }else{
                    $("#maincontent").append(newFrame("search-procedimientos","Buscar procedimientos"))
                    $("#search-procedimientos").effect("slide","easeOutCubic",tsin)
                    $("#content-search-procedimientos").load("procedimientos/search")
                    procedimientos=true;
                }
                urlSearch="procedimientos/search";
                currentFrame="search-procedimientos";
            });
        })


    }








    function loadOcupaciones(id,who){

        whoCalled=activeForm=who
        $("#"+id).focus(function(){
            $("#"+currentFrame).effect("drop","easeOutCubic",1,function(){
                table_active="ocupaciones"
                if(ocupaciones){
                    $("#search-ocupaciones").effect("slide","easeOutCubic",tsin)
                }else{
                    $("#maincontent").append(newFrame("search-ocupaciones","Buscar ocupaciones"))
                    $("#search-ocupaciones").effect("slide","easeOutCubic",tsin)
                    $("#content-search-ocupaciones").load("ocupaciones/search")
                    ocupaciones=true;
                }
                urlSearch="ocupaciones/search";
                currentFrame="search-ocupaciones";
            });
        })
    }



    function loadTipoEntidades(id,who){

        whoCalled=activeForm=who
        $("#"+id).focus(function(){
            $("#"+currentFrame).effect("drop","easeOutCubic",1,function(){
                table_active="tipoentidades"
                if(tipoentidades){
                    $("#search-tipoentidades").effect("slide","easeOutCubic",tsin)
                }else{
                    $("#maincontent").append(newFrame("search-tipoentidades","Buscar TipoEntidades"))
                    $("#search-tipoentidades").effect("slide","easeOutCubic",tsin)
                    $("#content-search-tipoentidades").load("entidades/buscarTipo")
                    tipoentidades=true;
                }
                urlSearch="entidades/buscarTipo";
                currentFrame="search-tipoentidades";
            });
        })
    }


    function loadLaboratorios(id,who){

        whoCalled=activeForm=who

        $("#"+id).focus(function(){
            $("#"+currentFrame).effect("drop","easeOutCubic",1,function(){
                idtextActive=id
                table_active="laboratorios"
                if(entities){
                    $("#search-laboratorios").effect("slide","easeOutCubic",tsin)
                }else{
                    $("#maincontent").append(newFrame("search-laboratorios","Buscar laboratorios"))
                    $("#search-laboratorios").effect("slide","easeOutCubic",tsin)
                    $("#content-search-laboratorios").load("laboratorios/search")
                    entities=true;
                }
                urlSearch="laboratorios/search";
                currentFrame="search-laboratorios";
            });
        })
    }





    function ajax_table(formid,div,params){

        formData=$(formid).serialize()+params;
        /*console.log(document.formid.url.value());*/

        $.ajax({
            url: urlSearch,
            type: 'POST',
            data: formData,
            dataType: 'json',
            async:false,

            success: function(data){
                /*console.log(data)*/
                set_table(data,div)

            },
            error: function(){

            }
        });
    }


    function set_table(data,div){
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
            th="<thead>"
            keys=keys.unique()
            $.each(keys, function(index) {
                th+="<th>"+ keys[index].toUpperCase()+ "</th>"
            });
            th+="</thead>"
            td="<tbody>"
            $.each(data, function(index,element) {
                td+="<tr onclick='sel_table(this)'>"
                $.each(element,function(index2,element2){
                    td+="<td data='"+index2+"'>"+element2+"</td>"
                })
                td+="</tr>"
            });
            td+="</tbody>"
            table="<table class='table table-hover table-nomargin table-colored-header table-cursor-pointer'>"
            table+=th+td+"</table>"
            /*console.log(td)*/
            $("#"+div).html(table)
        }
    }





    function sel_table(obj){
        $(obj).parent("tbody").find("tr").each(function() {
            $(this).removeClass('info');

        })
        row_active=obj

        $(obj).addClass('info')

        select_row()

    }


    function select_row(){
        data_sel_row="";
        $(row_active).find("td").each(function() {
            switch($(this).attr("data")){
                case "id":
                    codigo_sel_row=$(this).text()
                    break;
                default:
                    data_sel_row+=" "+$(this).text()
                    break
            }

        })
        set_text();
    }



    function set_text(){
        //alert(whoCalled)
        //alert(table_active)
        switch(whoCalled){
            case "new-patient":

                switch(table_active){
                    case "entidades":
                        $("#add_pac_entidad").val(codigo_sel_row+":"+data_sel_row)

                        break;

                    case "ocupaciones":
                        $("#add_pac_ocupacion").val(codigo_sel_row+":"+data_sel_row)

                        break;


                }

                activeForm="addPatient";

                break
            case "new-entity":

                switch(table_active){
                    case "tipoentidades":
                        $("#add_ent_tipo_entidad").val(codigo_sel_row+":"+data_sel_row)

                        break;
                }


                activeForm="addEntidad";
                break;
            case "historiaPaciente":

                switch(table_active){

                    case "diagnosticos":

                        $("#"+idtextActive).val(codigo_sel_row)
                        $("#"+idtextActive+"-text").val(data_sel_row)

                        break;
                    case "procedimientos":

                        $("#add_hist_procediiento_id").val(codigo_sel_row)
                        $("#add_hist_procedimeinto_name").val(data_sel_row)

                        break;
                    case "articulaciones":

                        if(idtextActive=="add_articulacion_buscar_segui"){
                            $("#add_articulacion_buscar_segui").val(data_sel_row)
                            BuscarArticulacionesMovimientosSegui(codigo_sel_row,data_sel_row);
                        }else{
                            $("#add_articulacion_buscar").val(data_sel_row)
                            BuscarArticulacionesMovimientos(codigo_sel_row,data_sel_row);
                        }



                        break;



                }



                activeForm="addhistoriaclinica";
                break;

            case "medicamentos-bodegas":

                switch(table_active){

                    case "laboratorios":

                        $("#"+idtextActive).val(codigo_sel_row)
                        $("#add_sum_laboratorio_lab_text").val(data_sel_row)


                        break;
                }


                activeForm="addhistoriaclinica";
                break;

            case "facturacion":

                switch(table_active){

                    case "entidades":

                        $("#add_fact_entidad").val(codigo_sel_row)
                        $("#add_fact_entidad_nom").val(data_sel_row)

                        break;
                    case "pacientes":

                        $("#add_fact_paciente_id").val(codigo_sel_row)
                        $("#add_fact_identificacion").val(data_sel_row)

                        break;
                }



            case "cotizaciones":

                switch(table_active){

                    case "entidades":

                        $("#add_coti_entidad").val(codigo_sel_row)
                        $("#add_coti_entidad_nom").val(data_sel_row)

                        break;
                    case "pacientes":

                        $("#add_coti_paciente_id").val(codigo_sel_row)
                        $("#add_coti_identificacion").val(data_sel_row)

                        break;
                    case "diagnosticos":

                        //add-cot-dx-principal-text
                        res = idtextActive.substring(0, (idtextActive.length-5));
                        $("#"+res).val(codigo_sel_row)
                        $("#"+idtextActive).val(data_sel_row)

                        break;
                }



                activeForm="addcotizacion";
                break;

            case "rips":

                switch(table_active){

                    case "entidades":

                        $("#add_rips_entidad").val(codigo_sel_row)
                        $("#add_rips_entidad_nom").val(data_sel_row)

                        break;
                    case "pacientes":

                        $("#add_rips_paciente_id").val(codigo_sel_row)
                        $("#add_rips_identificacion").val(data_sel_row)

                        break;
                }



                activeForm="addrips";
                break;

            case "clinic-history":

                switch(table_active){

                    case "pacientes":

                        $("#add_historia_buscar_fact_paciente_id").val(codigo_sel_row)
                        $("#add_historia_buscar_identificacion").val(data_sel_row)

                        break;
                }



                activeForm="addfacturacion";
                break;

            case "realizar-procedimientos":

                switch(table_active){

                    case "pacientes":

                        $("#add_proc_paciente_id").val(codigo_sel_row)
                        $("#add_proc_identificacion").val(data_sel_row)

                        break;
                    case "diagnosticos":

                        $("#"+idtextActive).val(codigo_sel_row)
                        $("#"+idtextActive+"-text").val(data_sel_row)

                        break;
                }

            case "aplicacionMedicamentos":

                switch(table_active){

                    case "pacientes":

                        $("#apl_paciente_id_add").val(codigo_sel_row)
                        $("#add_pac_nombres_apl").val(data_sel_row)

                        break;

                }

            case "notas-enfermeria":

                switch(table_active){

                    case "pacientes":

                        $("#add_notas_paciente_id").val(codigo_sel_row)
                        $("#add_notas_paciente_nom").val(data_sel_row)
                        existePacienteNotas($("#add_notas_paciente_id").val())
                        break;

                }

            case "new-date":

                switch(table_active){

                    case "pacientes":

                        $("#cita_id_paciente").val(codigo_sel_row)
                        $("#cita_pac_nombre1").val(data_sel_row)

                        break;

                }



                activeForm="doprocedimiento";
                break;





        }
        changeFrame(whoCalled)


    }

    function changeFrame(frame){
        //alert(frame)

        $("#"+currentFrame).effect("drop","easeOutCubic",tsin,function(){
            $("#"+frame).effect("slide","easeOutCubic",tsin)
            currentFrame=frame;
        });
    }


    function cambiar_municipio(){
        var idDepartamento
        var idMunicipio

        $("#"+activeForm).find("select").each(function(){
            if($(this).attr("data-departamentos")=="true"){
                idDepartamento=$(this)
            }
            if($(this).attr("data-municipios")=="true"){
                idMunicipio=$(this)
            }
        })

        depa=$(idDepartamento).val();

        $(idMunicipio).find("option").each(function() {
            $(this).remove();
        });

        $.each(municipios, function (i, item) {
            if(item.coddepartamento==depa){
                $(idMunicipio).append($('<option>', {
                    value: item.id,
                    text : item.mun_nombre
                }));
            }
        });
    }


    function buscarListaspera(id){
        if(buscar_listas){
            setTimeout(function() {
                /* buscar_lista(id);*/
            }, 5000);
        }

    }


    function buscar_lista(id){

        $.ajax({
            url: 'citas/buscar_medico',
            type: 'POST',
            data: "",
            dataType: 'json',
            async:false,
            success: function(data){
                orden=1;
                if(data){
                    limpiartabla($("#"+id));
                    $.each(data, function(index){
                        /*var paciente = data[index][0];*/
                        var idcita=data[index].id
                        var idpac=data[index].identificacion
                        var nompac=data[index].nombrescompletos
                        btn="";
                        btn+='<div class="btn-group">'
                        btn+='<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" >'
                        btn+='Accion<span class="caret"></span>'
                        btn+='</button><ul class="dropdown-menu">'
                        btn+='<li><a href="#" onclick="atenderCita('+idcita+','+idpac+',\''+nompac+'\')" >Atender</a></li>'
                        btn+='<li><a href="#" onclick="cancelarCita('+data[index].id+')">Cancelar cita</a></li>'
                        btn+='</ul></div>'

                        btnprint="";
                        btnprint+='<button type="button" class="btn btn-default" onclick="impimirhistoria('+data[index].id+','+data[index].especialidad+')" >Imprimir</button>'

                        btnprintfrom="";
                        btnprintfrom+='<button type="button" class="btn btn-default" onclick="impimirhistoriaformula('+data[index].id+','+data[index].especialidad+')" >Formula</button>'



                        td="";
                        td=td+"<td  data='orden'><strong>"+(orden)+"</strong></td>";
                        td=td+"<td  data='title'><strong>"+(data[index].id)+"</strong></td>";
                        td=td+"<td  data='start'><strong>"+(data[index].start)+"</strong></td>";
                        td=td+"<td  data='duracion'><strong>"+(data[index].duracion)+"</strong></td>";
                        td=td+"<td  data='paciente' colspan='2'><strong>"+(data[index].nombrescompletos)+"</strong></td>";
                        td=td+"<td  data='paciente'><strong>"+(data[index].motivo)+"</strong></td>";


                        if(data[index].estado=="espera"){
                            td=td+"<td  data='boton' >"+btn+"</td>";
                            var tr="<tr class='alert alert-warning'>"+td+"</tr>"
                        }else if(data[index].estado=="atendiendo"){
                            td=td+"<td  data='boton' >"+btn+"</td>";
                            var tr="<tr class='alert alert-info'>"+td+"</tr>"
                        }else if(data[index].estado=="finalizada"){
                            td=td+"<td  data='boton' >"+btnprint+"</td>";
                            if(data[index].especialidad==1){
                                td=td+"<td  data='botonform' >"+btnprintfrom+"</td>";
                            }

                            var tr="<tr class='alert alert-success'>"+td+"</tr>"
                        }else if(data[index].especialidad>"1"){
                            if(data[index].estado=="admitido"){
                                td=td+"<td  data='boton' >"+btn+"</td>";
                                var tr="<tr class='alert alert-warning'>"+td+"</tr>"
                            }


                        }

                        $("#"+id+" tbody").append(tr);

                        orden++;
                    });
                }else{
                    td="";
                    td=td+"<td colspan='4'>No hay pacientes en sala</td>";
                    var tr="<tr >"+td+"</tr>"
                    $("#"+id+" tbody").append(tr);

                }

            },
            error: function(){
                $("#mensage_dialog").dialog("close")
            }
        });

        buscarListaspera(id);
    }


    function buscar_lista_enf(id){

        $.ajax({
            url: 'citas/buscar_enfermera',
            type: 'POST',
            data: "",
            dataType: 'json',
            async:false,
            success: function(data){
                orden=1;
                if(data){
                    limpiartabla($("#"+id));
                    $.each(data, function(index){
                        /*var paciente = data[index][0];*/
                        var idcita=data[index].id
                        var idpac=data[index].identificacion
                        var nompac=data[index].nombrescompletos
                        btn="";
                        btn+='<div class="btn-group">'
                        btn+='<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" >'
                        btn+='Accion<span class="caret"></span>'
                        btn+='</button><ul class="dropdown-menu">'
                        btn+='<li><a href="#" onclick="atenderCitaEnfermera('+idcita+','+idpac+',\''+nompac+'\')" >Atender</a></li>'
                        btn+='<li><a href="#" onclick="cancelarCita('+data[index].id+')">Cancelar cita</a></li>'
                        btn+='</ul></div>'

                        td="";
                        td=td+"<td  data='orden'><strong>"+(orden)+"</strong></td>";
                        td=td+"<td  data='title'><strong>"+(data[index].id)+"</strong></td>";
                        td=td+"<td  data='start'><strong>"+(data[index].start)+"</strong></td>";
                        td=td+"<td  data='duracion'><strong>"+(data[index].duracion)+"</strong></td>";
                        td=td+"<td  data='paciente' colspan='2'><strong>"+(data[index].nombrescompletos)+"</strong></td>";
                        td=td+"<td  data='medico' colspan='2'><strong>"+(data[index].medico)+"</strong></td>";
                        td=td+"<td  data='motivo' class='hidden'><strong>"+(data[index].motivo)+"</strong></td>";
                        td=td+"<td  data='boton' >"+btn+"</td>";

                        if(data[index].estado=="admitido"){
                            var tr="<tr class='alert alert-warning'>"+td+"</tr>"
                        }else if(data[index].estado=="enfermeria"){
                            var tr="<tr class='alert alert-info'>"+td+"</tr>"
                        }

                        $("#"+id+" tbody").append(tr);
                        orden++;
                    });
                }else{
                    td="";
                    td=td+"<td colspan='4'>No hay pacientes en sala</td>";
                    var tr="<tr >"+td+"</tr>"
                    $("#"+id+" tbody").append(tr);

                }

            },
            error: function(){
                $("#mensage_dialog").dialog("close")
            }
        });

        buscarListaspera(id);
    }


    function limpiartabla(obj){
        $(obj).find('tbody').each(function() {
            $(this).find('tr').each(function() {
                $(this).remove();
            });
        });
    }

    function atenderCita(id,pac,nombres){
        resetVars()
        $("#"+currentFrame).effect("drop","easeOutCubic",1,function(){
            if(frameWork["historiaPaciente"]==null){
                $("#maincontent").append(newFrame("historiaPaciente","Historia clinica de: "+nombres))
                $("#historiaPaciente").effect("slide","easeOutCubic",tsin)
                $("#content-historiaPaciente").load("historias/paciente",function(){
                    loadHistoriaPaciente(id,pac)
                })
                frameWork["historiaPaciente"]="historiaPaciente"
            }else{
                $("#historiaPaciente").effect("slide","easeOutCubic",tsin)
                loadHistoriaPaciente(id,pac)
            }

            currentFrame="historiaPaciente";
        });

    }


    function atenderCitaEnfermera(id,pac,nombres){
        resetVars()
        $("#"+currentFrame).effect("drop","easeOutCubic",1,function(){
            if(frameWork["historiaEnfermeria"]==null){
                $("#maincontent").append(newFrame("historiaEnfermeria","Datos iniciales enfermeria: "+nombres))
                $("#historiaEnfermeria").effect("slide","easeOutCubic",tsin)
                $("#content-historiaEnfermeria").load("historias/enfermeria",function(){
                    loadHistoriaEnfermeria(id,pac)
                })
                frameWork["historiaEnfermeria"]="historiaEnfermeria"
            }else{
                $("#historiaEnfermeria").effect("slide","easeOutCubic",tsin)
                loadHistoriaEnfermeria(id,pac)
            }

            currentFrame="historiaEnfermeria";
        });

    }





    function admitirCita(id,fecha){
        $.ajax({
            url: "historias/Admitirpaciente",
            type: 'POST',
            data: "id="+id,

            async:false,
            success: function(data){
                /*console.log(data)*/
                buscar_citas_admisiones(fecha)
            },
            error: function(){
                return "Error al cargar la infprmación"
            }
        });
    }

    function loadHistoriaPaciente(id,pac){
        $.ajax({
            url: "historias/paciente",
            type: 'POST',
            data: "id="+id+"&identificacion="+pac,

            async:false,
            success: function(data){
                console.log(data)

                $("#show_historiapaciente").html(data)
            },
            error: function(){
                return "Error al cargar la infprmación"
            }
        });
    }


    function loadHistoriaEnfermeria(id,pac){
        $.ajax({
            url: "historias/enfermeria",
            type: 'POST',
            data: "id="+id+"&identificacion="+pac,

            async:false,
            success: function(data){
                /*console.log(data)*/
                $("#show_historienfermeria").html(data)
            },
            error: function(){
                return "Error al cargar la infprmación"
            }
        });
    }


    function addMedicamentosTabla(){
        /*var paciente = data[index][0];*/

        var medicamento=$("#add_hist_medicamento").val()
        var medicamento_text=$("#add_hist_medicamento option:selected").text()
        var medicamento_via=$("#add_hist_medicamento_via").val()
        var medicamento_dosis=$("#add_hist_medicamento_dosis").val()
        var medicamento_dias=$("#add_hist_medicamento_dias").val()
        var medicamento_total=$("#add_hist_medicamento_total").val()

        var append=true

        if(!medicamento){
            opnoty['type']="warning"
            opnoty['text']="Debe elegir el medicamento"
            var n = noty(opnoty);
            append=false
        }else  if(!medicamento_total){
            opnoty['type']="warning"
            opnoty['text']="Debe digitar la frecuencia"
            var n = noty(opnoty);


            append=false
        }





        if(append){
            var idMed=savemedicamentos(medicamento,medicamento_via,medicamento_dosis,medicamento_dias,medicamento_total)
            if(idMed){
                td="";
                tr=""
                td=td+"<td class='hidden'>"+idMed+"</td>";
                td=td+"<td><strong>"+medicamento+"</strong></td>";
                td=td+"<td><strong>"+medicamento_text+"</strong></td>";
                td=td+"<td><strong>"+medicamento_via+"</strong></td>";
                td=td+"<td><strong>"+medicamento_dosis+"</strong></td>";

                td=td+"<td><strong>"+medicamento_total+"</strong></td>";
                td=td+"<td><strong>"+medicamento_dias+"</strong></td>";
                td=td+"<td onclick='eliminarFilaMedicamentos("+idMed+",this)'><span class='glyphicon glyphicon-remove pointer'></span></td>";
                var tr="<tr>"+td+"</tr>"
                $("#add_hist_medicamento").val("")

                $('#add_hist_medicamento option:first').attr('selected', 'selected');
                $('input.ui-autocomplete-input').val($('#add_hist_medicamento option:first').text());

                $("#add_hist_medicamento_via").val("")
                $("#add_hist_medicamento_dosis").val("")
                $("#add_hist_medicamento_dias").val("")
                $("#add_hist_medicamento_total").val("")
                $("#hist-table-medicamentos tbody").append(tr);
                medicamento=""
                medicamento_text=""
                medicamento_via=""
                medicamento_dosis=""
                medicamento_dias=""
                medicamento_total=""

            }




        }

    }



    function savemedicamentos(mid,mvia,mdo,mdi,mt){
        if(mid=="") return
        var hid=$("#add_hist_history_id").val()
        var dataStream="history_id="+hid+"&medicamento_id="+mid+"&via="+mvia+
                        "&dosis="+mdo+"&dias="+mdi+"&total="+mt;

        var rtn=false;

        $.ajax({
            url: "medicamentos/guardarhistoria",
            type: 'POST',
            data: dataStream,
            async:false,
            success: function(data){
                if(data){
                    rtn=data;
                }


            },
            error: function(){

                opnoty['type']="error"
                opnoty['text']="Error al guardar"
                var n = noty(opnoty);
                rtn= false;

            }
        });

        return rtn;
    }


    function eliminarFilaMedicamentos(id,obj){

        var rtn=false;
        $.ajax({
            url: "medicamentos/eliminarhistoria",
            type: 'POST',
            data: "medicamento_id="+id,
            async:false,
            success: function(data){
                if(data){
                    rtn=data;
                    $(obj).parent("tr").remove()

                }

            },
            error: function(){

                opnoty['type']="error"
                opnoty['text']="Error al eliminar"
                var n = noty(opnoty);
                rtn= false;

            }
        });

        return rtn;
        //$(obj).parent("tr").remove()
    }


    function addRemisionesTabla(){
        /*var paciente = data[index][0];*/

        var remisione=$("#add_hist_rem_especialidad").val()
        var remisione_text=$("#add_hist_rem_especialidad option:selected").text()
        var history_id=$("#add_hist_history_id").val()
        var remisione_observaciones=$("#add_hist_rem_observaciones").val()
        var smal=true

        td="";
        $("#hist-table-remisiones tbody").find("td").each(function(){

            if($(this).attr("data")=="examen"){

                if($(this).text()== remisione){
                    opnoty['type']="warning"
                    opnoty['text']="Ya agrego el examen de "+remisione_text+" a las lista"
                    var n = noty(opnoty);
                    smal = false
                }
            }
        })

        if(!smal) return

        var  idRemision= parseInt(saveremision(remisione,remisione_observaciones,history_id));

        if(idRemision ){
            td=td+"<td class='hidden' data='id'>"+idRemision+"</td>"
            td=td+"<td data='examen'><strong>"+remisione+"</strong></td>";
            td=td+"<td><strong>"+remisione_text+"</strong></td>";

            td=td+"<td><strong>"+remisione_observaciones+"</strong></td>";
            td=td+"<td onclick='eliminarFilaRemision("+idRemision+",this)'> <span class='glyphicon glyphicon-remove pointer'></span></td>";

            var tr="<tr>"+td+"</tr>"



            $("#add_hist_rem_observaciones").val("")

            $("#hist-table-remisiones tbody").append(tr);
            remisione=""
            remisione_text=""
            history_id=""
            remisione_observaciones=""
            smal=""
        }

    }

    function saveremision(remisione,obsr,history_id){
        if(remisione=="") return
        var rtn=false;
        if(!obsr) obsr=" "
        $.ajax({
            url: "remisiones/guardar",
            type: 'POST',
            data: "examen_id="+remisione+"&observacion="+obsr+"&history_id="+history_id,
            async:false,
            success: function(data){
                if(data){
                    rtn=data;
                }


            },
            error: function(){

                opnoty['type']="error"
                opnoty['text']="Error al guardar"
                var n = noty(opnoty);
                rtn= false;

            }
        });

        return rtn;
    }


    function addProcedimientosTabla(){
        /*var paciente = data[index][0];*/

        var procedimiento=$("#add_hist_procediiento_id").val()
        var procedimiento_text=$("#add_hist_procedimeinto_name").val()
        var history_id=$("#add_hist_history_id").val()
        var proc_observaciones=$("#add_hist_procedimeinto_obs").val()


        var proc_cant=parseInt($("#add_hist_procedimeinto_cantidad").val())
        var proc_vlu=parseInt($("#add_hist_procedimeinto_vl_unitario").val())
        var proc_toto=proc_cant*proc_vlu;

        $("#add_hist_procedimeinto_vl_total").val(proc_toto)

        var smal=true

        td="";
        $("#hist-table-procedimeintos tbody").find("td").each(function(){

            if($(this).attr("data")=="proc"){

                if($(this).text()== procedimiento){
                    opnoty['type']="warning"
                    opnoty['text']="Ya agregó el procedimiento de "+procedimiento_text+" a las lista"
                    var n = noty(opnoty);
                    smal = false
                }
            }
        })

        if(!smal){
          return
        }

        //var  idproc= parseInt(saveProcedimiento(procedimiento,proc_observaciones,history_id,proc_cant,proc_vlu,proc_toto));
        var  idproc="-";

        if(idproc){



            td=td+"<td class='hidden' data='proc'>"+idproc+"</td>"
            td=td+"<td data='procid'><strong>"+procedimiento+"</strong></td>";
            td=td+"<td><strong>"+procedimiento_text+"</strong></td>";

            td=td+"<td><strong>"+proc_observaciones+"</strong></td>";
            td=td+"<td onclick='eliminarFilaProcedimiento(this)'> <span class='glyphicon glyphicon-remove pointer'></span></td>";

            var tr="<tr>"+td+"</tr>"



            $("#add_hist_rem_observaciones").val("")

            $("#hist-table-procedimeintos tbody").append(tr);
            remisione=""
            remisione_text=""
            history_id=""
            remisione_observaciones=""
            $("#add_hist_procediiento_id").val("")
            $("#add_hist_procedimeinto_name").val("")
            $("#add_hist_procedimeinto_obs").val("")
            smal=""
            //ladprocedimientospaciente();
        }

    }



    function saveProcedimiento(proc,obsr,history_id,proc_cant,proc_vlu,proc_toto){

        if(proc=="") return


        var dataStream="proc_id="+proc+
                      "&observacion="+obsr+
                        "&history_id="+history_id+
                        "&proc_cant="+proc_cant+
                        "&proc_vlu="+proc_vlu+
                        "&proc_toto="+proc_toto
        var rtn=false;
        if(!obsr) obsr=" "
        $.ajax({
            url: "procedimientos/guardarhistoria",
            type: 'POST',
            data: dataStream,
            async:false,
            success: function(data){
                if(data){
                    rtn=data;
                }


            },
            error: function(){

                opnoty['type']="error"
                opnoty['text']="Error al guardar"
                var n = noty(opnoty);
                rtn= false;

            }
        });

        return rtn;
    }


    function eliminarFilaProcedimiento(obj){

        $(obj).parent("tr").remove()
        //$(obj).parent("tr").remove()
    }


    function eliminarFila(obj){
        $(obj).parent("tr").remove()
    }



    function eliminarFilaRemision(id,obj){

        var rtn=false;
        $.ajax({
            url: "remisiones/eliminar",
            type: 'POST',
            data: "examen_id="+id,
            async:false,
            success: function(data){
                if(data){
                    rtn=data;
                    $(obj).parent("tr").remove()

                }

            },
            error: function(){

                opnoty['type']="error"
                opnoty['text']="Error al eliminar"
                var n = noty(opnoty);
                rtn= false;

            }
        });

        return rtn;
        //$(obj).parent("tr").remove()
    }


    function loadDiagnosticos(id,who,tipo,sexo){
        whoCalled=activeForm=who
        pac_sexo=sexo

        $("#"+id).focus(function(){
            idtextActive=$(this).attr("id")

            $("#"+currentFrame).effect("drop","easeOutCubic",1,function(){

                table_active="diagnosticos"
                if(frameWork["diagnosticos"]==null){

                    $("#maincontent").append(newFrame("search-diagnosticos","Buscar diagnosticos"))
                    $("#search-diagnosticos").effect("slide","easeOutCubic",tsin)
                    $("#content-search-diagnosticos").load("diagnosticos/buscar/"+sexo)
                    frameWork["diagnosticos"]="diagnosticos";
                }else{
                    $("#search-diagnosticos").effect("slide","easeOutCubic",tsin)
                }
                urlSearch="diagnosticos/buscar";
                currentFrame="search-diagnosticos";
            });
        })
    }


    function validarTabs(tab,form){

        var ts=$('#'+tab+' >ul >li').size();

        var active =$('#'+tab).tabs('option', 'active');
        var control=true;
        for(i=0;i<ts;i++){
            $('#'+tab).tabs({ active: i });
            if(!$(form).valid()){
                control=false
                return false
            }

        }
        if(control){
            $('#'+tab).tabs({ active: active });
            return true
        }



    }

    function loadHistorialPaciente(div,pac){
        $.ajax({
            url: "historias/historialpaciente",
            type: 'POST',
            data: "id="+pac,

            async:false,
            success: function(data){
                /*console.log(data)*/
                $("#"+div).html(data)
            },
            error: function(){
                return "Error al cargar la infprmación"
            }
        });
    }



    function loadremisionpaciente(){
        var hist=$("#add_hist_history_id").val()
        $.ajax({
            url: "remisiones/buscarhistoria",
            type: 'POST',
            data: "history_id="+hist,
            async:false,
            success: function(data){
                limpiartabla($("#hist-table-remisiones"))
                $.each(data, function(index){
                    /*var paciente = data[index][0];*/
                    td="";
                    td=td+"<td class='hidden' data='id'>"+data[index].id+"</td>"
                    td=td+"<td data='examen'><strong>"+data[index].examen_id+"</strong></td>";
                    td=td+"<td><strong>"+data[index].nombre+"</strong></td>";

                    td=td+"<td><strong>"+data[index].observacion+"</strong></td>";
                    td=td+"<td onclick='eliminarFilaRemision("+data[index].id+",this)'> <span class='glyphicon glyphicon-remove pointer'></span></td>";

                    var tr="<tr>"+td+"</tr>"



                    $("#add_hist_rem_observaciones").val("")

                    $("#hist-table-remisiones tbody").append(tr);

                });

            },
            error: function(){
                return "Error al cargar la información"
            }
        });
    }


    function loadmedicamentospaciente(){
        var hist=$("#add_hist_history_id").val()
        $.ajax({
            url: "medicamentos/buscarhistoria",
            type: 'POST',
            data: "history_id="+hist,
            async:false,
            success: function(data){
                limpiartabla($("#hist-table-medicamentos"))
                $.each(data, function(index){
                    /*var paciente = data[index][0];*/

                    td="";
                    tr=""
                    td=td+"<td class='hidden'>"+data[index].id+"</td>";
                    td=td+"<td><strong>"+data[index].medicamentos_id+"</strong></td>";
                    td=td+"<td><strong>"+data[index].nombre+"</strong></td>";
                    td=td+"<td><strong>"+data[index].via+"</strong></td>";
                    td=td+"<td><strong>"+data[index].dosis+"</strong></td>";
                    td=td+"<td><strong>"+data[index].total+"</strong></td>";
                    td=td+"<td><strong>"+data[index].dias+"</strong></td>";

                    td=td+"<td onclick='eliminarFilaMedicamentos("+data[index].id+",this)'><span class='glyphicon glyphicon-remove pointer'></span></td>";

                    var tr="<tr>"+td+"</tr>"


                    $("#hist-table-medicamentos tbody").append(tr);

                });

            },
            error: function(){
                return "Error al cargar la información"
            }
        });
    }
    function ladprocedimientospaciente(){
        var hist=$("#add_hist_history_id").val()
        var td="";
        $.ajax({
            url: "procedimientos/buscarhistoria",
            type: 'POST',
            data: "history_id="+hist,
            async:false,
            success: function(data){
                limpiartabla($("#hist-table-procedimeintos"))
                var total_pro=0;
                $.each(data, function(index){
                    /*var paciente = data[index][0];*/

                    td="";
                    tr=""
                    td=td+"<td class='hidden' data='proc'>"+data[index].id+"</td>";
                    td=td+"<td><strong>"+data[index].proc_id+"</strong></td>";
                    td=td+"<td><strong>"+data[index].nombre+"</strong></td>";
                    td=td+"<td><strong>"+parseInt(data[index].cantidad).format(0,3,".",",")+"</strong></td>";
                    td=td+"<td><strong>"+parseInt(data[index].vr_unitario).format(0,3,".",",")+"</strong></td>";
                    td=td+"<td><strong>"+parseInt(data[index].vl_total).format(0,3,".",",")+"</strong></td>";
                    td=td+"<td><strong>"+data[index].observacion+"</strong></td>";

                    td=td+"<td onclick='eliminarFilaProcedimiento("+data[index].id+",this)'><span class='glyphicon glyphicon-remove pointer'></span></td>";
                    total_pro+=parseInt(data[index].vl_total);


                    var tr="<tr>"+td+"</tr>"


                    $("#hist-table-procedimeintos tbody").append(tr);

                });
                td="";
                td=td+"<tr class='table-proc-tot'></tr><td colspan='3'></td>";
                td=td+"<td><strong>Total</strong></td>";
                td=td+"<td><strong>"+total_pro.format(0,3,".",",")+"</strong></td><td colspan='2'></td><td></td></tr>";
                $("#hist-table-procedimeintos tbody").append(td);

            },
            error: function(){
                return "Error al cargar la información"
            }
        });
    }



    function loaddiagnosticopaciente(){
        var hist=$("#add_hist_history_id").val()
        $.ajax({
            url: "diagnosticos/buscarhistoria",
            type: 'POST',
            data: "history_id="+hist,
            async:false,
            success: function(data){

                $.each(data, function(index){


                });

            },
            error: function(){
                return "Error al cargar la información"
            }
        });
    }



    function impimirhistoria(id,especialidad){

        var fecha=$("#add_notas_fecha").val()
        var pac=$("#add_notas_paciente_id").val()
        //alert(fecha)
        var dataUrl="impresiones/historia?id="+id+"&esp="+especialidad;
        window.open(dataUrl);

    }


    function impimirhistoriaformula(id,especialidad){

        var fecha=$("#add_notas_fecha").val()
        var pac=$("#add_notas_paciente_id").val()
        //alert(fecha)
        var dataUrl="impresiones/historiaformula?id="+id+"&esp="+especialidad;
        window.open(dataUrl);

    }




    $.fn.parpadear = function()
    {
        this.each(function parpadear()
        {
            $(this).fadeIn(500).delay(250).fadeOut(500, parpadear);
        });
    }


    Number.prototype.format = function(n, x, s, c) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
            num = this.toFixed(Math.max(0, ~~n));

        return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
    };



    /**
     * Created by Aikon on 8/10/14.
     */
