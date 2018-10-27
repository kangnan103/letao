

$(function(){
    var currentPage = 1;
    var pageSize = 2;
    var imgs = [];

    render();
    function render(){
        $.ajax({
            url:"/product/queryProductDetailList",
            type:"get",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(info){

                $("tbody").html(template('tmp',info))

                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                   
                    currentPage: currentPage,
                    // 总页数
                    totalPages: Math.ceil(info.total / info.size),
                    // 给按钮注册点击事件
                    onPageClicked: function(a, b, c, p) {
                      // 修改了当前页
                      currentPage = p
                      // 重新发送渲染整个页面
                      render()
                    },
                    itemTexts:function(type,page,current){
                        // console.log(type);
                        switch (type) {
                            case "first":
                                return "首页"
                            case "prev":
                                return "上一页"
                            case "page":
                                return page
                            case "next":
                                return "下一页"
                            case "last":
                                return "尾页"
                        }         
                    },
                    tooltipTitles: function (type, page, current) {
                        switch (type) {
                          case "first":
                            return "首页";
                          case "prev":
                            return "上一页";
                          case "next":
                            return "下一页";
                          case "last":
                            return "尾页";

                          default:
                            return "跳转到" + page;
                        }
                      },
                      useBootstrapTooltip: true,

                  })
                
            }
        });
    }

    $(".btn_add").on("click",function(){

        $("#add_modal").modal('show');
        //模态框弹出时就应该加载二级分类的数据
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            success:function(info){
                // console.log(info);
                $('.dropdown-menu').html(template('tml',info));
                
            }
        })
    })
    //图片上传功能
    $('#file').fileupload({
        done:function(e,data){
            console.log(data.result);
            $('<img src="'+data.result.picAddr+'"  width="100" height="100" alt="">').appendTo('.img_box'); 
            imgs.push(data.result); 
            console.log(imgs);
            
            if(imgs.length === 3){
                $('form').data('bootstrapValidator').updateStatus('imgStatus','VALID');
            }else{
                $('form').data('bootstrapValidator').updateStatus('imgStatus','INVALID');
          
            }
        }
    })

    //二级分类的选择功能
    $(".dropdown-menu").on("click", "a",function(){
        // console.log("hehe");
        $(".dropdown_text").text($(this).text());
        //选择成功后手动把校验合法
        $("form").data('bootstrapValidator').updateStatus("brandId","VALID");

        $("[name=brandId]").val($(this).data("id"))
        // console.log( $("[name=brandId]").val());  
    })

    //表单校验
    $('form').bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-thumbs-up',
            invalid: 'glyphicon glyphicon-thumbs-down',
            validating: 'glyphicon glyphicon-refresh'
          },
          //隐藏表单也参与校验
          excluded: [],
          //所有的校验
        fields:{
            brandId: {
                validators: {
                    notEmpty: {
                    message: '请选择一个二级分类'
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                    message: '商品的名称不能为空'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                    message: '商品的描述不能为空'
                    }
                }
            },
            num: {
                validators: {
                  notEmpty: {
                    message: '商品库存不能为空'
                  },
                  // 正则校验
                  regexp: {
                    regexp: /^[1-9]\d{0,4}$/,
                    message: '请输入有效的库存(1-99999)'
                  }
                }
              },
              size: {
                validators: {
                  notEmpty: {
                    message: '商品尺码不能为空'
                  },
                  //
                  regexp: {
                    regexp: /^\d{2}-\d{2}$/,
                    message: '请输入正确的尺码格式(xx-xx)'
                  }
                }
              },

              oldPrice:{
                  validators:{
                      notEmpty:{
                          message: "商品的原价不能为空"
                      }
                  }
              },
              price:{
                  validators:{
                      notEmpty:{
                          message: "商品的现价不能为空"
                      }
                  }
              },
              imgStatus: {
                validators: {
                    notEmpty: {
                        message: '请上传3张商品图片'
                    }
                }
            }
         }
        

    })
    //表单校验成功请求服务器
    //获取服务器需要的参数

    $('form').on('success.form.bv',function(e){
        e.preventDefault();

        var param = $('form').serialize();
        param += '&picName1' + imgs[0].picName +  '&picAddr1' + imgs[0].picAddr;
        param += '&picName2' + imgs[1].picName +  '&picAddr2' + imgs[1].picAddr;
        param += '&picName3' + imgs[2].picName +  '&picAddr3' + imgs[2].picAddr;
        console.log("hehe");
        $.ajax({
            type:'post',
            url:"/product/addProduct",
            data:param,
            success:function(info){
                console.log(info);
                if(info.success){
                    render();
                    $("#add_modal").modal("hide");
                    $('form').data("bootstrapValidator").resetForm(true);
                    $(".dropdown_text").text('请选择二级分类');
                    $('.img_box img').remove();
                    imgs = [];

                }
                
            }
        })
        
        
    })
})