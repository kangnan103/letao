

$(function(){
    var currentPage = 1;
    var pageSize = 2;

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
                console.log(info);
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
                        console.log(type);
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
})