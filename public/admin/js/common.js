
$(function(){

    $(document).ajaxStart(function() {
        console.log("nianhdfa");
        
        // 开始进度条
        NProgress.start()
      })
      
    $(document).ajaxStop(function() {
    setTimeout(function() {
        // 结束进度条
        NProgress.done()
    }, 500)
    })


    $("#cate_con").on("click",function(){
        console.log("hehe");
        
        $(this).siblings().slideToggle();
    })

    $(".icon_menu").on("click",function(){
        $("body").toggleClass("active");
        $(".slidebar").toggleClass("active");
        
    })

    $(".icon_logout").on("click",function(){
       $("#my_modal").modal("show");
        
    })

    $(".confirm").on("click",function(){
        console.log("hehe");
        $.ajax({
            url:"/employee/employeeLogout",
            type:"get",
            success:function(info){
                if(info.success){
                    location.href = "login.html";
                }
                
            }
        })
        
    })
})




