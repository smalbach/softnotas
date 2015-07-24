
<header>
    <div class="contenedor">
        <h1><p><i>Asignar coordinador</i></p></h1>
    </div>
</header>
<form
    id="ingresocordinadores"
    >

        <div class="row">
            <div class="col-xs-12 col-md-12">
                <h2>Datos del coordinador</h2>
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
                <h2>Datos del curso</h2>
            </div>
        </div><br>


        <div class="row">
            <div class="col-xs-12 col-md-12">
                <label>Curso</label>
                <label for="curso"></label>
                <input
                    class="form-control"
                    id="curso"
                    name="curso"
                    type="text"
                    data-rule-required="true"
                    >
                <input
                    id="curso_id"
                    name="curso_id"
                    type="hidden"
                    >
            </div>
        </div><br>

        <div class="row">
            <div class="col-xs-12 col-md-12">
                <label>Detalle</label>
                <label for="detalle"></label>
                <textarea
                    class="form-control"
                    id="detalle"
                    name="detalle"
                    rows="3"
                    >
                </textarea>
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
            source: "<?php  echo base_url() ?>index.php/cordinadores/buscarprofesor",
            minLength: 2,
            select: function( event, ui ) {
                buscardatos_profesor(ui.item.profesor_id)
            }
        });

        function buscardatos_profesor(id) {
            $.ajax({
                type: "GET",
                url: "<?php  echo base_url() ?>index.php/cordinadores/buscarprofesor2?id=" + id,
                dataType: 'json'
            }).done(function (profesor) {
                $("#nombre").val(profesor.nombre);
                $("#profesor_id").val(profesor.profesor_id);
            });
        }

        $( "#curso" ).autocomplete({
            source: "<?php  echo base_url() ?>index.php/cordinadores/buscarcurso",
            minLength: 2,
            select: function( event, ui ) {
                buscardatos_curso(ui.item.curso_id)
            }
        });

        function buscardatos_curso(id) {
            $.ajax({
                type: "GET",
                url: "<?php  echo base_url() ?>index.php/cordinadores/buscarcurso2?id=" + id,
                dataType: 'json'
            }).done(function (curso) {
                $("#detalle").val(curso.detalle);
                $("#curso_id").val(curso.curso_id);
            });
        }


        $("#ingresocordinadores").validate({
            submitHandler: function(form){
                datosFormulario=$("#ingresocordinadores").serialize();

                $.ajax({
                    type: "POST",
                    url:"<?php  echo base_url() ?>index.php/cordinadores/guardar",
                    data:datosFormulario,
                    dataType: 'json',
                    async:false,
                    success: function (data) {
                        alert("El coordinador se registro correctamente");
                    },
                    error: function(data){
                        alert("Error al registrar coordinador");
                    }


                })

            }

        });

    })

</script>



</body>
</html>

