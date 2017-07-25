/**
 * Created by zhouhongquan on 2017/7/25.
 */
$(function () {
   $("[row-update-action]").click(function () {
       editRow();
   })

});

function editRow(editlink) {
    var a$=$("#"+editlink);
    var row$ = a$.parents("tr");
    row$.find("[col-data-field]").each(function () {
        var oldVal = $(this).text();
        $(this).html("<input type='text' value='" + oldVal + "'>");
    });
    a$.attr("onclick", "updateRow('"+editlink+"')");
    a$.html("保存");
}


function updateRow(updatelink) {
    var a$=$("#"+updatelink);
    var row$ = a$.parents("tr");
    var updateUrl = row$.attr("row-update-url");
    var updateKey=row$.attr("row-update-key");
    var rel = row$.attr("rel");
    var updateData = updateKey+"="+rel+"&";
    row$.find("[col-data-field]").each(function () {
        var key=$(this).attr("col-data-field");
        var newVal = $(this).find("input").val();
        updateData+=key+"="+newVal+"&";
    });


    $.ajax({
        url: updateUrl,
        type: 'POST',
        data: updateData,
        dataType: "json",
        cache: false,
        success: function (data) {
            dwz.ajaxDone()
            row$.find("[col-data-field]").each(function () {
                var newVal = $(this).find("input").val();
                $(this).html("<td>" + newVal + "</td>");
                a$.attr("onclick", "editRow('"+editlink+"')");
                a$.html("编辑");
            });
        },
        error: DWZ.ajaxError
    });
}