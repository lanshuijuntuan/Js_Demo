function tocheckname()
{
    var deptName= $("#dept_name").val();
    var meterNum=$("#meter_Num").val();
    var areaId=$("#meter_area_id").val();
    $.ajax({
        type:"POST",
        cache:false,
        url : "${rootPath}/dept/checkdeptname.htm",
        dataType : "text",
        data:{"dept.id":"${dept.id}","dept.dept_name":deptName},
        async:false,
        success : function(data){
            if(0<parseInt(data)){
                alert("此科室已存在");
                $("#dept_name").attr("value","");
                $("#dept_name").focus();
            }
        }
    });
}

$(function(){
    $("select.sellink").change(function(){
        selLink(this);
    });
    $("input.sellink").click(function(){
        selLink(this);
    });

});
function  selLink(sel) {
    debugger;
    var html="<option value=''>--请选择---</option>";
    var url=$(sel).attr("selurl");
    var form$=$(sel).parents("form");
    var rel=$(sel).attr("rel");
    var rel$=$(sel).parents("form").find("select[name='"+rel+"']");
    var data=form$.serialize();
    $.post(url,data,function (data) {
        html ="<option  value=''>---请选择---</option>";
        for(var i = 0;i<data.length;i++) {
            html = html + "<option  value=" + data[i].charge_detail_id + ">" + data[i].detail_name + "</option>";
        }
        rel$.html(html);

    });
}

$(function(){
    $("#tab_content_meter_record_list,#tab_content_meter_record_share_list").each(function(){
        var url=this.attr("divurl");
        var div$=$(this)
        $.post(url,"{}",function (data) {
            div$.html(data);
        });

    });
})