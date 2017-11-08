/**
 * Created by zhouhongquan on 2017/7/25.
 */
$(function () {
    $("[row-update-action]").click(function () {
        editRow();
    })

});

function editRow(editlink) {
    var a$ = $("#" + editlink);
    var row$ = a$.parents("tr");
    row$.find("[col-data-field]").each(function () {
        var col$ = $(this);
        var oldVal = col$.text().trim();
        var dataField = col$.attr("col-data-field");
        var ctrltype = col$.attr("col-type").trim();
        var currentVal = col$.attr("col-currentVal");
        var dataSource = col$.attr("col-dataSource");
        var hasDefault=col$.attr("col-default");

        if (ctrltype == "combox") {

            $.post(ctx+"/getVariables",{
                "content":dataSource
            },function(response){

                var html="<select name='"+dataField+"'>";
                if(hasDefault != null &&hasDefault =="true"){
                    html+='<option value="">---请选择---</option>';
                }
                if(response != null && response.length >0){
                    var resData = response[0];

                    if(resData.content == null || resData.content == 'null' || resData.content =='')
                        return;

                    var ident = resData.var_ident;
                    var valueArr = resData.content.split(";");
                    //匹配值
                    if(valueArr.length >0){
                        for(var j = 0 ; j < valueArr.length ;j++){
                            var vals = valueArr[j].split("=");

                            html +='<option value="'+vals[0]+'" '+(currentVal == vals[0]?'selected':'')+'>'+vals[1]+'</option>';
                        }
                    }
                    html+="</select>";

                    col$.html(html);
                }
            });




        }
        else if (ctrltype == "file") {

        }

        else if (ctrltype == "calender") {
            var html="<input type='text' name='"+dataField+"' value='"+oldVal+"' class='date'/>";
            html+="<a class='inputDateButton' href='javascript:;'>选择</a>";
            col$.html(html);

        }
        else {
            col$.html("<input type='text' value='" + oldVal + "'>");
        }


    });
    a$.attr("onclick", "updateRow('" + editlink + "')");
    a$.html("保存");
}


function updateRow(updatelink) {
    var a$ = $("#" + updatelink);
    var row$ = a$.parents("tr");
    var updateUrl = row$.attr("row-update-url");
    var updateKey = row$.attr("row-key-name");
    var rel = row$.attr("row-key-val");
    var updateData = updateKey + "=" + rel + "&";
    row$.find("[col-data-field]").each(function () {
        var key = $(this).attr("col-data-field");
        var newVal = $(this).find("input,select").val();
        updateData += key + "=" + newVal + "&";
    });




    $.ajax({
        url: updateUrl,
        type: 'POST',
        data: updateData,
        dataType: "json",
        cache: false,
        success: function (data) {
            DWZ.ajaxDone(data);
            row$.find("[col-data-field]").each(function () {
                var newVal = $(this).find("input").val();
                $(this).html(newVal);
                a$.attr("onclick", "editRow('" + updatelink + "')");
                a$.html("编辑");
            });

        },
        error: DWZ.ajaxError
    });
}