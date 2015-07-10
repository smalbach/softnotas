
<header>
    <div class="contenedor">
        <h1>Datos del estudiante</h1>
    </div>
</header>
<form
    id="ingresoareas"
    >



        <div class="row">
            <div class="col-xs-12 col-md-6">
                <label>Area</label>
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
                <label>Detalle</label>
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

