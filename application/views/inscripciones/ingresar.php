
<header>
    <div class="contenedor">
        <h1><p><i>Inscripción del estudiante</i></p></h1>
    </div>
</header>
<form
    id="inscripcion"
    name="inscripcion"
    >

        <div class="row">
            <div class="col-xs-12 col-md-12">
                <h2>Datos del estudiante</h2>
            </div>
        </div><br>

        <div class="row">
            <div class="col-xs-12 col-md-6">
                <label>Identificacion</label>
                <label><img id="nuevo_estudiante" src="<?php  echo base_url() ?>/imagenes/icono.png" width="25" height="25" "></label>
                <label for="identificacion"></label>
                <input
                    class="form-control"
                    id="identificacion"
                    name="identificacion"
                    type="text"
                    data-rule-required="true"
                    >
                <input
                    id="estudiante_id"
                    name="estudiante_id"
                    type="hidden"
                    >
            </div>
            <div class="col-xs-12 col-md-6">
                <label>Nombre</label>
                <label for="nombre"></label>
                <input
                    class="form-control"
                    id="nombre"
                    name="nombre"
                    type="text"
                    data-rule-required="true"
                    >
            </div>
        </div><br>

        <div class="row">
            <div class="col-xs-12 col-md-12">
                <h2>Datos del grupo</h2>
            </div>
        </div><br>


    <div class="row">
        <div class="col-xs-12 col-md-6">
            <label>Curso</label>
            <label for="grupo"></label>
            <input
                class="form-control"
                id="grupo"
                name="grupo"
                type="text"
                data-rule-required="true"
                >
            <input
                id="grupo_id"
                name="grupo_id"
                type="hidden"
                >
        </div>
        <div class="col-xs-12 col-md-6">
            <label>Jornada</label>
            <label for="jornada"></label>
            <input
                class="form-control"
                id="jornada"
                name="jornada"
                type="text"
                data-rule-required="true"
                >
        </div>
    </div><br>

    <div class="row">
        <div class="col-xs-12 col-md-12">
            <h2>Datos del costo</h2>
        </div>
    </div><br>

    <div class="row">
        <div class="col-xs-12 col-md-6">
            <label>Valor</label>
            <div class="input-group">
                <span class="input-group-addon">$</span>
                <label for="valor"></label>
                <input
                    class="form-control"
                    id="valor"
                    name="valor"
                    type="text"
                    data-rule-required="true"
                    >
            </div>
        </div>
        <div class="col-xs-12 col-md-6">
            <label>Descuento</label>
            <div class="input-group">
            <span class="input-group-addon">%</span>
            <label for="descuento"></label>
            <input
                class="form-control"
                id="descuento"
                name="descuento"
                type="text"
                data-rule-required="true"
                >
            </div>
        </div>

    </div><br>

    <div class="row">
        <div class="col-xs-12 col-md-6">
            <label>Total</label>
            <div class="input-group">
                <span class="input-group-addon">$</span>
                <label for="total"></label>
                <input
                    class="form-control"
                    id="total"
                    name="total"
                    type="text"
                    data-rule-required="true"
                    >
            </div>
        </div>
        <div class="col-xs-12 col-md-6">
            <label>Abono inicial</label>
            <div class="input-group">
                <span class="input-group-addon">$</span>
                <label for="abono_inicial"></label>
                <input
                    class="form-control"
                    id="abono_inicial"
                    name="abono_inicial"
                    type="text"
                    data-rule-required="true"
                    value="0"
                    >
            </div>
        </div>
    </div><br>

    <div class="row">
        <div class="col-xs-12 col-md-6">
            <label>Fecha</label>
            <label for="fecha"></label>
            <input
                class="form-control"
                name="fecha"
                id="fecha"
                type="text"
                data-rule-required="true"
                >
        </div>
    </div><br>


        <div class="form-group">
        <button
            type="submit"
            class="btn btn-primary"
            >
            Guardar
        </button>
        </div>
</div>

</form>


<div id="dialogo_estudiante" >
<form id="formulario_estudiante">


        <div class="row">
            <div class="col-xs-12 col-md-6">
                <label>Identificación</label>
                <label for="identificacion"></label>
                <input
                    class="form-control"
                    id="identificacion"
                    name="identificacion"
                    type="text"
                    data-rule-required="true"
                    >
            </div>
            <div class="col-xs-12 col-md-6">
                <label>Tipo Identificación</label>
                <label for="tipo_identificacion"></label>
                <select
                    class="form-control"
                    name="tipo_identificacion"
                    id="tipo_identificacion"
                    >
                    <option selected="selected"></option>
                    <option value="CC">CEDULA DE CIUDADANIA</option>
                    <option value="TI">TARJETA DE IDENTIDAD</option>
                </select>
            </div>
        </div><br>

        <div class="row">
            <div class="col-xs-12 col-md-6">
                <label>Nombres</label>
                <label for="nombres"></label>
                <input
                    class="form-control"
                    id="nombres"
                    name="nombres"
                    type="text"
                    data-rule-required="true"
                    >
            </div>
            <div class="col-xs-12 col-md-6">
                <label>Apellidos</label>
                <label for="apellidos"></label>
                <input
                    class="form-control"
                    name="apellidos"
                    id="apellidos"
                    type="text"
                    data-rule-required="true"
                    >
            </div>
        </div><br>

        <div class="row">
            <div class="col-xs-12 col-md-6">
                <label>Sexo</label>
                <label for="sexo"></label>
                <select
                    class="form-control"
                    name="sexo"
                    id="sexo"
                    >
                    <option selected="selected"></option>
                    <option value="M">MASCULINO</option>
                    <option value="F">FEMENINO</option>
                </select>
            </div>
            <div class="col-xs-12 col-md-6">
                <label>Fecha de nacimiento</label>
                <label for="fecha_nacimiento"></label>
                <input
                    class="form-control"
                    name="fecha_nacimiento"
                    id="fecha_nacimiento"
                    type="text"
                    data-rule-required="true"
                    >
            </div>
        </div><br>

        <div class="row">
            <div class="col-xs-12 col-md-6">
                <label>Dirección</label>
                <label for="direccion"></label>
                <input
                    class="form-control"
                    name="direccion"
                    id="direccion"
                    type="text"
                    data-rule-required="true"
                    >
            </div>
            <div class="col-xs-12 col-md-6">
                <label>Telefono</label>
                <label for="telefono"></label>
                <input
                    class="form-control"
                    name="telefono"
                    id="telefono"
                    type="text"
                    data-rule-required="true"
                    >
            </div>
        </div><br>

        <div class="form-group">
            <button
                type="submit"
                class="btn btn-primary"
                >Guardar
            </button>
        </div>
</form>
</div>


<script>
    $(document).ready(function ({}) {



        <!-- Autocompletar del estudiante -->

        $( "#identificacion" ).autocomplete({
            source: "<?php  echo base_url() ?>index.php/inscripciones/buscarestudiante",
            minLength: 2,
            select: function( event, ui ) {
                buscar_estudiante(ui.item.id)
            },

            _renderItem: function( ul, item ) {
                console.log(ul)
            }

        }).data('ui-autocomplete')._renderItem = function(ul, item) {
            return $('<li>')
                .append('<a>' + item.label + ' | ' + item.nombre + '</a>')
                .appendTo(ul);
        }

        function buscar_estudiante(id) {
            $.ajax({
                type: "GET",
                url: "<?php  echo base_url() ?>index.php/inscripciones/buscarestudiante2?id=" + id,
                dataType: 'json'
            }).done(function (estudiante) {
                $("#nombre").val(estudiante.nombre);
                $("#estudiante_id").val(estudiante.id);
            });
        }

        <!-- Fin autocompletar del estudiante -->

        $( "#grupo" ).autocomplete({
            source: "<?php  echo base_url() ?>index.php/inscripciones/buscargrupo",
            minLength: 2,
            select: function( event, ui ) {
                buscardatos_grupo(ui.item.id)
            },

            _renderItem: function( ul, item ) {
                console.log(ul)
            }

        }).data('ui-autocomplete')._renderItem = function(ul, item) {
            return $('<li>')
                .append('<a>' + item.label + ' | ' + item.jornada + '</a>')
                .appendTo(ul);
        }


        function buscardatos_grupo(id) {
            $.ajax({
                type: "GET",
                url: "<?php  echo base_url() ?>index.php/inscripciones/buscargrupo2?id=" + id,
                dataType: 'json'
            }).done(function (grupo) {
                $("#jornada").val(grupo.jornada);
                $("#grupo_id").val(grupo.id);
                $("#valor").val(grupo.valor);
            });
        }


        <!-- Calculo del descuento del curso -->

        $("#descuento").keyup(function(){ calcular()})

        function calcular(){

            var descuento = $("#descuento").val();
            var valor = $("#valor").val();
            var total_descuento;

            total_descuento = valor - ((valor*descuento)/100);

            $("#total").val(total_descuento);

        }

        $("#fecha").datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: "1900:{{Date('Y')}}",
            dateFormat: "yy/mm/dd"
        });

        <!-- funciones estudiante -->

        $("#nuevo_estudiante").click(function() {

            nuevo_estudiante()

        });

        function  nuevo_estudiante(){

            $("#dialogo_estudiante").dialog( "open" );

        }

        $("#dialogo_estudiante").dialog({
            autoOpen: false,
            width: 700,
            height: 450,
            title: "Inscripción del estudiante",
            show: {
                effect: "blind",
                duration: 1000
            },
            hide: {
                effect: "explode",
                duration: 1000
            }
        });



        $("#inscripcion").validate({
            submitHandler: function(form){
                datosFormulario=$("#inscripcion").serialize();

                $.ajax({
                    type: "POST",
                    url:"<?php  echo base_url() ?>index.php/inscripciones/guardar",
                    data:datosFormulario,
                    dataType: 'json',
                    async:false,
                    success: function (data) {
                        alert("La inscripcion se registro correctamente");
                    },
                    error: function(data){
                        alert("Error al registrar la inscripcion");
                    }


                })

            }

        });


        $("#formulario_estudiante").validate({
            submitHandler: function(form){
                datosFormulario=$("#formulario_estudiante").serialize();

                $.ajax({
                    type: "POST",
                    url:"<?php  echo base_url() ?>index.php/estudiantes/guardar",
                    data:datosFormulario,
                    dataType: 'json',
                    async:false,
                    success: function (data) {
                        alert("El estudiante se registro correctamente");
                    },
                    error: function(data){
                        alert("Error al registrar el estudiante");
                    }


                })

            }

        });



    })

</script>

</body>
</html>

