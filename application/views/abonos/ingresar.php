
<header>
    <div class="contenedor">
        <h1><p><i>Abonos a cartera</i></p></h1>
    </div>
</header>
<form
    id="abonos"
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
                    id="estudiante_grupo_id"
                    name="estudiante_grupo_id"
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
            <label>Grupo</label>
            <label for="curso"></label>
            <input
                class="form-control"
                id="curso"
                name="curso"
                type="text"
                data-rule-required="true"
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
            <h2>Datos de cartera</h2>
        </div>
    </div><br>

    <div class="row">
        <div class="col-xs-12 col-md-6">
            <label>Valor en mora</label>
            <label for="mora"></label>
            <input
                class="form-control"
                id="mora"
                name="mora"
                type="text"
                data-rule-required="true"
                >
        </div>
        <div class="col-xs-12 col-md-6">
            <label>Abono</label>
            <label for="abono"></label>
            <input
                class="form-control"
                id="abono"
                name="abono"
                type="text"
                data-rule-required="true"
                >
        </div>
    </div><br>


    <div class="row">
        <div class="col-xs-12 col-md-6">
            <label>Saldo parcial</label>
            <label for="saldo"></label>
            <input
                class="form-control"
                id="saldo"
                name="saldo"
                type="text"
                data-rule-required="true"
                >
        </div>
        <div class="col-xs-12 col-md-6">
            <label>Fecha</label>
            <label for="fecha"></label>
            <input
                class="form-control"
                id="fecha"
                name="fecha"
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
            source: "<?php  echo base_url() ?>index.php/abonos/buscarestudiante",
            minLength: 2,
            select: function( event, ui ) {
                buscar_estudiante(ui.item.id)
            },

            _renderItem: function( ul, item ) {
                console.log(ul)
            }

        }).data('ui-autocomplete')._renderItem = function(ul, item) {
            return $('<li>')
                .append('<a>' + item.label + ' | ' + item.nombre + ' <br> ' + item.curso + ' | ' + item.jornada +'</a>')
                .appendTo(ul);
        }

        function buscar_estudiante(id) {
            $.ajax({
                type: "GET",
                url: "<?php
                  echo base_url() ?>index.php/abonos/buscarestudiante2?id=" + id,
                dataType: 'json'
            }).done(function (estudiante) {
                $("#nombre").val(estudiante.nombre);
                $("#curso").val(estudiante.curso);
                $("#jornada").val(estudiante.jornada);
                $("#mora").val(estudiante.mora);
                $("#estudiante_grupo_id").val(estudiante.id);
            });
        }

        $("#fecha").datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: "1900:{{Date('Y')}}",
            dateFormat: "yy/mm/dd"
        });

        $("#abono").keyup(function(){ calcular()})

        function calcular(){

            var mora = $("#mora").val();
            var abono = $("#abono").val();
            var saldo;

            saldo = mora - abono;

            $("#saldo").val(saldo);

        }


        $("#abonos").validate({
            submitHandler: function(form){
                datosFormulario=$("#abonos").serialize();

                $.ajax({
                    type: "POST",
                    url:"<?php  echo base_url() ?>index.php/abonos/guardar",
                    data:datosFormulario,
                    dataType: 'json',
                    async:false,
                    success: function (data) {
                        alert("El abono se registro correctamente");
                    },
                    error: function(data){
                        alert("Error al registrar el abono");
                    }


                })

            }

        });

    })

</script>

</body>
</html>

