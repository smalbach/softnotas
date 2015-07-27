
<header>
    <div class="contenedor">
        <h1><p><i>Crear grupo</i></p></h1>
    </div>
</header>
<form
    id="ingresogrupos"
    >

        <div class="row">
            <div class="col-xs-12 col-md-12">
                <h2>Datos del grupo</h2>
            </div>
        </div><br>

        <div class="row">
            <div class="col-xs-12 col-md-6">
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
            <div class="col-xs-12 col-md-6">
                <label>Detalle</label>
                <label for="detalle"></label>
                <input
                    class="form-control"
                    id="detalle"
                    name="detalle"
                    type="text"
                    data-rule-required="true"
                    >
            </div>
        </div><br>

    <div class="row">
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
            <input
                id="jornada_id"
                name="jornada_id"
                type="hidden"
                >
        </div>
        <div class="col-xs-12 col-md-6">
            <label>Año</label>
            <label for="anio"></label>
            <input
                class="form-control"
                id="anio"
                name="anio"
                type="text"
                data-rule-required="true"
                >
            <input
                id="anio_id"
                name="anio_id"
                type="hidden"
                >
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
                data-rule-number="true"
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


        $( "#curso" ).autocomplete({
            source: "<?php  echo base_url() ?>index.php/grupos/buscarcurso",
            minLength: 2,
            select: function( event, ui ) {
                buscardatos_curso(ui.item.id)
            }
        });

        function buscardatos_curso(id) {
            $.ajax({
                type: "GET",
                url: "<?php  echo base_url() ?>index.php/grupos/buscarcurso2?id=" + id,
                dataType: 'json'
            }).done(function (curso) {
                $("#curso").val(curso.curso);
                $("#detalle").val(curso.detalle);
                $("#curso_id").val(curso.id);
            });
        }

        $( "#jornada" ).autocomplete({
            source: "<?php  echo base_url() ?>index.php/grupos/buscarjornada",
            minLength: 2,
            select: function( event, ui ) {
                buscardatos_jornada(ui.item.id)
            }
        });

        function buscardatos_jornada(id) {
            $.ajax({
                type: "GET",
                url: "<?php  echo base_url() ?>index.php/grupos/buscarjornada2?id=" + id,
                dataType: 'json'
            }).done(function (jornada) {
                $("#jornada").val(jornada.jornada);
                $("#jornada_id").val(jornada.id);
            });
        }


        $( "#anio" ).autocomplete({
            source: "<?php  echo base_url() ?>index.php/grupos/buscaranio",
            minLength: 2,
            select: function( event, ui ) {
                buscardatos_anio(ui.item.id)
            }
        });

        function buscardatos_anio(id) {
            $.ajax({
                type: "GET",
                url: "<?php  echo base_url() ?>index.php/grupos/buscaranio2?id=" + id,
                dataType: 'json'
            }).done(function (anio) {
                $("#anio").val(anio.anio);
                $("#anio_id").val(anio.id);
            });
        }


        $("#ingresogrupos").validate({
            submitHandler: function(form){
                datosFormulario=$("#ingresogrupos").serialize();

                $.ajax({
                    type: "POST",
                    url:"<?php  echo base_url() ?>index.php/grupos/guardar",
                    data:datosFormulario,
                    dataType: 'json',
                    async:false,
                    success: function (data) {
                        alert("El grupo se registro correctamente");
                    },
                    error: function(data){
                        alert("Error al registrar grupo");
                    }


                })

            }

        });

    })

</script>



</body>
</html>

