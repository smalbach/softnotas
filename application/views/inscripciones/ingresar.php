
<header>
    <div class="contenedor">
        <h1><p><i>Inscripción de estudiante</i></p></h1>
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
            <label for="valor"></label>
            <input
                class="form-control"
                id="valor"
                name="valor"
                type="text"
                data-rule-required="true"
                >
        </div>
        <div class="col-xs-12 col-md-6">
            <label>Descuento</label>
            <label for="descuento"></label>
            <input
                class="form-control"
                id="descuento"
                name="descuento"
                type="text"
                data-rule-required="true"
                placeholder="%"

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

        $("#descuento").keyup(function(){ calcular()})

        $( "#identificacion" ).autocomplete({
            source: "<?php  echo base_url() ?>index.php/inscripciones/buscarestudiante",
            minLength: 2,
            select: function( event, ui ) {
                buscardatos_estudiante(ui.item.id)
            }
        });

        function buscardatos_estudiante(id) {
            $.ajax({
                type: "GET",
                url: "<?php  echo base_url() ?>index.php/inscripciones/buscarestudiante2?id=" + id,
                dataType: 'json'
            }).done(function (estudiante) {
                $("#nombre").val(estudiante.nombre);
                $("#estudiante_id").val(estudiante.id);
            });
        }

        $( "#grupo" ).autocomplete({
            source: "<?php  echo base_url() ?>index.php/inscripciones/buscargrupo",
            minLength: 2,
            select: function( event, ui ) {
                buscardatos_grupo(ui.item.id)
            }
        });

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

        //$("#descuento").onkeyup(function() {calcular();});

        function calcular(){

            var descuento = $("#descuento").val();
            var valor = $("#valor").val();
            var total_descuento;

            total_descuento = valor - ((valor*descuento)/100);

            $("#valor").val(total_descuento);

        }




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

    })

</script>



</body>
</html>

