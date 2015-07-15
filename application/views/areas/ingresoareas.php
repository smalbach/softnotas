
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


        $("#area").blur(function(){
           existeArea()
        })

        function existeArea(){

            $.ajax({
                url: "buscar/"+$("#area").val(),
                type: 'POST',
                data: "",
                dataType: 'json',
                success: function(data){
                    if(data){
                        setArea(data)
                    }
                },
                error: function(){
                    alert("Error")
                }
            })

        }

        function setArea(data){
            keys=data.reduce(function(keys, element){
                for (key in element) {
                    keys.push(key);
                    $("#"+key).val(element[key])


                }
            },[]);

        }


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

