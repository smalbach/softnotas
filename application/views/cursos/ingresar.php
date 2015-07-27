
<header>
    <div class="contenedor">
        <h1><p><i>Datos del curso</i></p></h1>
    </div>
</header>
<form
    id="ingresocursos"
    >

        <div class="row">
            <div class="col-xs-12 col-md-12">
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


        $( "#nombre" ).autocomplete({
            source: "<?php  echo base_url() ?>index.php/cursos/buscar",
            minLength: 2,
            select: function( event, ui ) {
                buscardatos(ui.item.id)
            }
        });

        function buscardatos(id) {
            $.ajax({
                type: "GET",
                url: "<?php  echo base_url() ?>index.php/cursos/buscar2?id=" + id,
                dataType: 'json'
            }).done(function (curso) {
                $("#detalle").val(curso.detalle);
            });
        }


        $("#ingresocursos").validate({
            submitHandler: function(form){
                datosFormulario=$("#ingresocursos").serialize();

                $.ajax({
                    type: "POST",
                    url:"<?php  echo base_url() ?>index.php/cursos/guardar",
                    data:datosFormulario,
                    dataType: 'json',
                    async:false,
                    success: function (data) {
                        alert("El curso se registro correctamente");
                    },
                    error: function(data){
                        alert("Error al registrar curso");
                    }


                })

            }

        });

    })

</script>



</body>
</html>

