

$(function(){
    var currentPage = 1;
    var pageSize = 5;
    render()

    function render (){
        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(info){
                // console.log(info);
                $("tbody").html(template("tmp",info));

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage:currentPage,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked:function(a,b,c,page){
                        currentPage = page;
                        render();
                    }

                });
                
            }
        })
    }

    $(".btn_add").on("click",function(){
        $("#add_modal").modal('show');
        //当点击了添加分类按钮时就要获取数据了
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:1,
                pageSize : 100
            },
            success:function(info){
                console.log(info);
                $('.dropdown-menu').html(template("tml",info))
                
            }
        })
        
    })
    //选择分类
    $(".dropdown-menu").on("click","a",function(){
      var str =  $(this).text();
      console.log(str);
      $(".dropdown_text").text(str);  
      console.log($(this).data("id"));
      
      //获取二级分类的id
      $("[name=categoryId]").val($(this).data("id"));

      //因为不是表单 所以在校验完成后,需要手动通过
      $("form").data('bootstrapValidator').updateStatus("categoryId","VALID");
    })

    //图片上传
    $("#file").fileupload({
        done: function(e,data){
            console.log(data.result.picAddr);
            $("#second_img").attr("src",data.result.picAddr);
            $("[name=brandLogo]").val(data.result.picAddr);
            $("form").data('bootstrapValidator').updateStatus("brandLogo","VALID");
            
        }
    })

    //表单校验
    $("form").bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-thumbs-up',
            invalid: 'glyphicon glyphicon-thumbs-down',
            validating: 'glyphicon glyphicon-refresh'
          },

          excluded: [],

          fields:{
            brandName: {
                validators: {
                  notEmpty: {
                    message: '二级分类的名称不能为空'
                  }
                }
              },
              categoryId: {
                validators: {
                  notEmpty: {
                    message: '请选择一个一级分类'
                  }
                }
              },
              brandLogo: {
                validators: {
                  notEmpty: {
                    message: '请上传二级分类的图片'
                  }
                }
              }
          }
    })

    $("form").on("success.form.bv",function(e){
        e.preventDefault()
        console.log("hehe");
        $.ajax({
            type:"post",
            url:"/category/addSecondCategory",
            data:$("form").serialize(),
            success:function(info){
                console.log(info);
                if(info.success){
                    currentPage = 1;
                    render();
                    $("#add_modal").modal('hide');
                    $("form").data('bootstrapValidator').resetForm(true);
                    $(".dropdown_text").text("请选项一级分类");
                    $("#second_img").attr("src","../images/none.png");

                }
                
            }
        })
        
    })
})