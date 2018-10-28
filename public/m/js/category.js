
$(function(){

    mui('.mui-scroll-wrapper').scroll({
        indicators: false, //是否显示滚动条
    });
  
    $.ajax({
        type:'get',
        url:'/category/queryTopCategory',
        success:function(info){
            console.log(info);
            $('.cate_left ul').html(template('tmp',info));
            renderSecondCate(info.rows[0].id);
            

        }
    })

    //点击一级分类渲染二级分类数据

    $('.cate_left ul').on("click","li",function(){
       var id = $(this).data("id");
       console.log(id);
       $(this).addClass('active').siblings().removeClass('active');
        renderSecondCate(id);  
    })

    function renderSecondCate (id){
        $.ajax({
            type:"get",
            url:"/category/querySecondCategory",
            data:{id},
            success:function(info){
             console.log(info);
             $('.cate_right ul').html(template("tml",info));
             
            }
        })
    }

})



