
<header>
    <div class="contenedor">
        <h1><p><i>Datos del estudiante</i></p></h1>
    </div>
</header>
<form
    id="ingresoestudiantes"
    >

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
            class="btn btn-primary">Guardar</button>
        </div>
</div>

</form>


<script>
    $(document).ready(function ({}) {


        $( "#identificacion" ).autocomplete({
            source: "<?php  echo base_url() ?>index.php/estudiantes/buscar",
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
                url: "<?php  echo base_url() ?>index.php/estudiantes/buscar2?id=" + id,
                dataType: 'json'
            }).done(function (estudiante) {
                $("#tipo_identificacion").val(estudiante.tipo_identificacion);
                $("#nombres").val(estudiante.nombres);
                $("#apellidos").val(estudiante.apellidos);
                $("#sexo").val(estudiante.sexo);
                $("#fecha_nacimiento").val(estudiante.fecha_nacimiento);
                $("#telefono").val(estudiante.telefono);
                $("#direccion").val(estudiante.direccion);
            });
        }


        $("#fecha_nacimiento").datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: "1900:{{Date('Y')}}",
            dateFormat: "yy/mm/dd"
        });


        $("#ingresoestudiantes").validate({
            submitHandler: function(form){
                datosFormulario=$("#ingresoestudiantes").serialize();

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
                        alert("Error al registrar estudiante");
                    }


                })

            }

        });

    })

</script>



</body>
</html>

