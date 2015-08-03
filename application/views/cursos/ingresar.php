


<header>
    <div class="contenedor">
        <h1><p><i>Datos del curso</i></p></h1>
    </div>
</header>
<form
    id="ingresocursos"
    >
    <input type="hidden"  id="id"  name="id" value=""/>
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
                    ></textarea>
            </div>
        </div><br>

        <div class="form-group">
        <button
            type="submit"
            class="btn btn-primary">Guardar</button>
        </div>

</form>



<div id="lista_cursos" class="col-xs-12">
<table
    id="datos_cursos"
    class="table table-striped table-bordered table-hover table-responsive table-condensed"
    >
</table>

</div>


<!--
<div id="ventanita">
    <label for="nombre"  >Asignar algo</label>
    <input type="text" name="buscar" id="buscar"/>

</div>


<style>

    #ventanita{
        position: fixed;
        border: 1px solid rgba(0,0,0,0.2);
        box-shadow: 0px 0px 1px rgba(0,0,0,0.2);
        width: 263px;
        height: 280px;
        background: #fff;
        top: 10px;
        left: 10px;
        border-radius: 5px;


    }

    #ventanita  label{
        margin-left: 20px;
        color:  rgba(0,0,0,0.8);
        margin-top: 16px;
    }

    #ventanita input{
        border-radius: 15px;
        width: 160px;
        margin-left: 20px;

            border: 1px solid rgba(0,0,0,0.2);
        padding-left: 5px;
    }

</style>

-->

<script>

    $(document).ready(function ({}) {

        buscar_cursos();

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
                var miurl=""
                if($("#id").val()==""){
                    miurl="<?php  echo base_url() ?>index.php/cursos/guardar"
                }else{
                    miurl="<?php  echo base_url() ?>index.php/cursos/actualizar"
                }

                $.ajax({
                    type: "POST",
                    url:miurl,
                    data:datosFormulario,
                    dataType: 'json',
                    async:false,
                    success: function (data) {
                        buscar_cursos();
                        opnoty['type']="success"
                        opnoty['text']="Guardado correctamente"
                        var n = noty(opnoty);

                        $("#ingresocursos").each(function(){ this.reset()})
                    },
                    error: function(data){
                        opnoty['type']="error"
                        opnoty['text']="se jodio esta vaina correctamente"
                        var n = noty(opnoty);
                    }


                })

            }

        });

    })

    function buscar_cursos(){

        $.ajax({
            type: "POST",
            url:"<?php  echo base_url() ?>index.php/cursos/buscar_todos",
            dataType: 'json',
            async:false,
            success: function (data) {
                set_table(data,"datos_cursos")
            },
            error: function(data){
                alert("Error al buscar curso");
            }


        })

    }

    function set_table(data,div){
        if(!data){
            data="Sin resultados"
            $("#"+div).html(data)
        }else{
            keys=data.reduce(function(keys, element){
                for (key in element) {
                    keys.push(key);
                }
                return keys;
            },[]);
            Array.prototype.unique=function(a){
                return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
            });
            th="<thead>"
            keys=keys.unique()
            $.each(keys, function(index) {
                th+="<th class='info'>"+ keys[index].toUpperCase()+ "</th>"
            });
            th+="</thead>"
            td="<tbody>"
            $.each(data, function(index,element) {
                td+="<tr onclick='sel_table(this)'>"
                $.each(element,function(index2,element2){
                    td+="<td data='"+index2+"'>"+element2+"</td>"
                })
                td+="</tr>"
            });
            td+="</tbody>"
            table="<table class='table table-hover table-nomargin table-colored-header table-cursor-pointer'>"
            table+=th+td+"</table>"
            /*console.log(td)*/
            $("#"+div).html(table)
        }
    }



    function sel_table(obj){

        $(obj).parent("tbody").find("tr").each(function() {
            $(this).removeClass('info');

        })
        row_active=obj

        $(obj).addClass('info')
        colocarencampos(obj);
    }


    function colocarencampos(obj){
        $(obj).find("td").each(function(){
            $("#"+$(this).attr("data")).val($(this).text())
        })


    }




</script>



</body>
</html>

