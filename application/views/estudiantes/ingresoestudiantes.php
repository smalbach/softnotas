
<header>
    <div class="contenedor">
        <h1>Datos del estudiante</h1>
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
                <label>Alergias</label>
                <label for="alergias"></label>
                <input
                    class="form-control"
                    name="alergias"
                    id="alergias"
                    type="text"
                    >
            </div>
            <div class="col-xs-12 col-md-6">
                <label>EPS</label>
                <label for="eps"></label>
                <input
                    class="form-control"
                    name="eps"
                    id="eps"
                    type="text"
                    >
            </div>
        </div><br>

        <div class="row">
            <div class="col-xs-12 col-md-6">
                <label>Peso</label>
                <label for="peso"></label>
                <input
                    class="form-control"
                    name="peso"
                    id="peso"
                    type="text"
                    >
            </div>
            <div class="col-xs-12 col-md-6">
                <label>Grupo sanguineo</label>
                <label for="rh"></label>
                <input
                    class="form-control"
                    name="rh"
                    id="rh"
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


        $("#identificacion").blur(function(){
            existeEstudiante()
        })

        function existeEstudiante(){

            $.ajax({
                url: "buscar/"+$("#identificacion").val(),
                type: 'POST',
                data: "",
                dataType: 'json',
                success: function(data){
                    if(data){
                        setEstudiante(data)
                    }
                },
                error: function(){
                    alert("Error")
                }
            })

        }

        function setEstudiante(data){
            keys=data.reduce(function(keys, element){
                for (key in element) {
                    keys.push(key);
                    $("#"+key).val(element[key])


                }
            },[]);

        }


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

