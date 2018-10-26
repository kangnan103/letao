


$(function(){
    var currentPage = 1;
    var pageSize = 3;

    render()

    function render(){
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(info){
                console.log(info);
                $('tbody').html(template('tmp',info))
    
                //分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        render();
                    }
                });
                
            }
        })  
    }

    $(".btn_add").on("click",function(){
        console.log("hehe");
        $("#add_modal").modal('show');
        
    })


    $(".add").on("click",function(){
        //添加之前先进行表单验证
        $("form").bootstrapValidator({
             // 配置的校验的小图标
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-thumbs-up',
                    invalid: 'glyphicon glyphicon-thumbs-down',
                    validating: 'glyphicon glyphicon-refresh'
                },
                //所有的验证规则
                fields:{
                    categoryName: {
                        validators:{
                            notEmpty:{
                                message:"一级分类不能为空"
                            }
                        }
 
                    }
             }
        })
    })

    //校验成功后发送ajax
    $('form').on('success.form.bv',function(e){
        e.preventDefault()

        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:$("form").serialize(),
            success:function(info){
                console.log(info);
                currentPage = 1;
                if(info.success){
                    render()
                    $("#add_modal").modal('hide')
                    $('form')
                    .data('bootstrapValidator')
                    .resetForm(true);
                    
                }
                
            }
        })
        
    })


})