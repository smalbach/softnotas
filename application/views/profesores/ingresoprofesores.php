
<header>
    <div class="contenedor">
        <h1>Datos del profesor</h1>
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
                <label>Expedición</label>
                <label for="expedicion"></label>
                <input
                    class="form-control"
                    id="expedicion"
                    name="expedicion"
                    type="text"
                    data-rule-required="true"
                    >
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

        <div class="row">
            <div class="col-xs-12 col-md-6">
                <label>Sexo</label>
                <label for="sexo"></label>
                <input
                    class="form-control"
                    name="sexo"
                    id="sexo"
                    type="text"
                    >
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
                <label>Estado civil</label>
                <label for="estado_civil"></label>
                <input
                    class="form-control"
                    name="estado_civil"
                    id="estado_civil"
                    type="text"
                    >
            </div>
            <div class="col-xs-12 col-md-6">
                <label>Email</label>
                <label for="email"></label>
                <input
                    class="form-control"
                    name="email"
                    id="email"
                    type="text"
                    >
            </div>
        </div><br>

        <div class="row">
            <div class="col-xs-12 col-md-6">
                <label>Cargo</label>
                <label for="cargo"></label>
                <input
                    class="form-control"
                    name="cargo"
                    id="cargo"
                    type="text"
                    >
            </div>
            <div class="col-xs-12 col-md-6">
                <label>Fecha ingreso</label>
                <label for="fech_ingreso"></label>
                <input
                    class="form-control"
                    name="fech_ingreso"
                    id="fech_ingreso"
                    type="text"
                    >
            </div>
        </div><br>

        <div class="row">
            <div class="col-xs-12 col-md-6">
                <label>Escalafón</label>
                <label for="escalafon"></label>
                <input
                    class="form-control"
                    name="escalafon"
                   id="escalafon"
                    type="text"
                    >
            </div>
            <div class="col-xs-12 col-md-6">
                <label>Resolución</label>
                <label for="resolucion"></label>
                <input
                    class="form-control"
                    name="resolucion"
                    id="resolucion"
                    type="text"
                    >
            </div>
        </div><br>

        <div class="row">
            <div class="col-xs-12 col-md-6">
                <label>Nivel escolar</label>
                <label for="nivel_escolar"></label>
                <input
                    class="form-control"
                    name="nivel_escolar"
                    id="nivel_escolar"
                    type="text"
                    >
            </div>
            <div class="col-xs-12 col-md-6">
                <label>Asignación</label>
                <label for="asignacion"></label>
                <input
                    class="form-control"
                    name="asignacion"
                    id="asignacion"
                    type="text"
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


        $("#fecha_nacimiento").datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: "1900:{{Date('Y')}}",
            dateFormat: "yy/mm/dd"
        });

        $("#fech_ingreso").datepicker({
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

