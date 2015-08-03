
<header>
    <div class="contenedor">
        <h1><p><i>Ingreso de notas</i></p></h1>
    </div>
</header>

<form id="ingresonotas">

    <div class="container">
            <table class="table">
                <tr>
                    <th>Identificacion</th>
                    <th>Nombres y Apellidos</th>
                    <th>Periodo 1</th>
                    <th>Periodo 2</th>
                    <th>Periodo 3</th>
                </tr>
                <tr>
                    <td width="20%">1102798482</td>
                    <td width="50%">Jose Enrique Tuñon Villalba</td>
                    <td width="10%">
                        <input
                            class="form-control"
                            id="abono"
                            name="abono"
                            type="text"
                            data-rule-required="true">
                    </td>
                    <td width="10%">
                        <input
                            class="form-control"
                            id="abono"
                            name="abono"
                            type="text"
                            data-rule-required="true"
                            >
                    </td>
                    <td width="10%">
                        <input
                            class="form-control"
                            id="abono"
                            name="abono"
                            type="text"
                            data-rule-required="true"
                            >
                    </td>
                </tr>
            </table>
    </div><br>


        <div class="form-group">
        <button
            type="submit"
            class="btn btn-primary"
            >
            Guardar
        </button>
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

