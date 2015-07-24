
<header>
    <div class="contenedor">
        <h1><p><i>Datos del profesor</i></p></h1>
    </div>
</header>
<form
    id="ingresoprofesores"
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
            source: "<?php  echo base_url() ?>index.php/profesores/buscar",
            minLength: 2,
            select: function( event, ui ) {
                buscardatos(ui.item.profesor_id)
            }
        });

        function buscardatos(id) {
            $.ajax({
                type: "GET",
                url: "<?php  echo base_url() ?>index.php/profesores/buscar2?id=" + id,
                dataType: 'json'
            }).done(function (profesor) {
                $("#tipo_identificacion").val(profesor.tipo_identificacion);
                $("#nombres").val(profesor.nombres);
                $("#apellidos").val(profesor.apellidos);
                $("#sexo").val(profesor.sexo);
                $("#fecha_nacimiento").val(profesor.fecha_nacimiento);
                $("#telefono").val(profesor.telefono);
                $("#direccion").val(profesor.direccion);
            });
        }


        $("#fecha_nacimiento").datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: "1900:{{Date('Y')}}",
            dateFormat: "yy/mm/dd"
        });


        $("#ingresoprofesores").validate({
            submitHandler: function(form){
                datosFormulario=$("#ingresoprofesores").serialize();

                $.ajax({
                    type: "POST",
                    url:"<?php  echo base_url() ?>index.php/profesores/guardar",
                    data:datosFormulario,
                    dataType: 'json',
                    async:false,
                    success: function (data) {
                        alert("El profesor se registro correctamente");
                    },
                    error: function(data){
                        alert("Error al registrar profesor");
                    }


                })

            }

        });

    })

</script>



</body>
</html>

