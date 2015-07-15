
<header>
    <div class="contenedor">
        <h1>Datos del area</h1>
    </div>
</header>
<form
    id="ingresoareas"
    >



        <div class="row">
            <div class="col-xs-12 col-md-6">
                <label>Area</label>
                <label for="area"></label>
                <input
                    class="form-control"
                    id="area"
                    name="area"
                    type="text"
                    data-rule-required="true"
                    >
            </div>
            <div class="col-xs-12 col-md-6">
                <label>Detalle</label>
                <label for="detalle"></label>
                <input
                    class="form-control"
                    name="detalle"
                    id="detalle"
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


        $( "#area" ).autocomplete({
            source: '<?php  echo base_url() ?>index.php/areas/buscar',
            data:'',
            minLength: 2
        });

        $("#area").focusout(function(){
            $.ajax({
                url:'<?php  echo base_url() ?>index.php/areas/buscar2',
                type:'POST',
                dataType:'json',
                data:{ area:$('#area')}
            }).done(function(respuesta){
                $("#area").val(respuesta.area);
                $("#detalle").val(respuesta.detalle);
            });
        });




        $("#ingresoareas").validate({
            submitHandler: function(form){
                datosFormulario=$("#ingresoareas").serialize();

                $.ajax({
                    type: "POST",
                    url:"<?php  echo base_url() ?>index.php/areas/guardar",
                    data:datosFormulario,
                    dataType: 'json',
                    async:false,
                    success: function (data) {
                        alert("El area se registro correctamente");
                    },
                    error: function(data){
                        alert("Error al registrar area");
                    }


                })

            }

        });

    })


</script>




</body>
</html>

