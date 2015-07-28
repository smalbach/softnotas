
<header>
    <div class="contenedor">
        <h1><p><i>Asignación de profesores</i></p></h1>
    </div>
</header>
<form
    id="asignacion"
    >

        <div class="row">
            <div class="col-xs-12 col-md-12">
                <h2>Datos del profesor</h2>
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
                    id="profesor_id"
                    name="profesor_id"
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
            source: "<?php  echo base_url() ?>index.php/asignaciones/buscarprofesor",
            minLength: 2,
            select: function( event, ui ) {
                buscar_profesor(ui.item.id)
            },

            _renderItem: function( ul, item ) {
                console.log(ul)
            }

        }).data('ui-autocomplete')._renderItem = function(ul, item) {
            return $('<li>')
                .append('<a>' + item.label + ' | ' + item.nombre + '</a>')
                .appendTo(ul);
        }

        function buscar_profesor(id) {
            $.ajax({
                type: "GET",
                url: "<?php  echo base_url() ?>index.php/asignaciones/buscarprofesor2?id=" + id,
                dataType: 'json'
            }).done(function (profesor) {
                $("#nombre").val(profesor.nombre);
                $("#profesor_id").val(profesor.id);
            });
        }

        $( "#grupo" ).autocomplete({
            source: "<?php  echo base_url() ?>index.php/asignaciones/buscargrupo",
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
                url: "<?php  echo base_url() ?>index.php/asignaciones/buscargrupo2?id=" + id,
                dataType: 'json'
            }).done(function (grupo) {
                $("#jornada").val(grupo.jornada);
                $("#grupo_id").val(grupo.id);
            });
        }


        $("#asignacion").validate({
            submitHandler: function(form){
                datosFormulario=$("#asignacion").serialize();

                $.ajax({
                    type: "POST",
                    url:"<?php  echo base_url() ?>index.php/asignaciones/guardar",
                    data:datosFormulario,
                    dataType: 'json',
                    async:false,
                    success: function (data) {
                        alert("El profesor se asigno correctamente");
                    },
                    error: function(data){
                        alert("Error al asignar el profesor");
                    }


                })

            }

        });

    })

</script>

</body>
</html>

