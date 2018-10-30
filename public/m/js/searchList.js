$(function () {

    function getSearch() {
        var str = location.search;
        // console.log(str);
        //从地质栏获取的是编码之后的数据需要解码
        str = decodeURI(str);
        // console.log(str);
        //祛除问好
        str = str.slice(1)
        // console.log(str);
        var arr = str.split('?')
        //  console.log(arr);
        var obj = {};
        for (var i = 0; i < arr.length; i++) {

            //  console.log(arr[i].split("="));
            var key = arr[i].split('=')[0];
            var value = arr[i].split('=')[1];
            obj[key] = value;
        }

        return obj
    }

    function render() {

        //

        var param = {
            proName: getSearch().key,
            page: 1,
            pageSize: 100
        }

        //1.确定是否传排序参数
        $active = $('.lt_sort li.active');

        if ($active.length === 1) {
            var type = $active.data('type');
            console.log(type);
            var value = $active.find('span').hasClass('fa-angle-down') ? 1 : 2;
            console.log(value);
            param[type] = value;

        }

        $.ajax({
            type: 'get',
            url: '/product/queryProduct',
            data: param,
            success: function (info) {
                console.log(info);

                $('.lt_pro').html(template('tmp', info));

            }
        })
    }
    render();

    //点击所搜框,实现搜索跳转功能
    $('.search_btn').on('click', function () {
        var key = $('.search input').val().trim();
        console.log(key);
        if (!key) {
            mui.toast('请输入搜索关键字');
            return;
        }
        location.href = 'searchList.html?key=' + key;

    })




    //排序功能
    //点击按钮,让当前的li加上active类名,其他li祛除active类,
    //小箭头功能

    $('.lt_sort li[data-type]').on('click', function () {
        ///如果有active点击的时候改变箭头方向
        if ($(this).hasClass('active')) {
            $(this).find('span').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
        }

        //添加active类实现点击变色
        $(this).addClass('active').siblings().removeClass('active');
        //让所有的小箭头向下
        $('.li_sort span').removeClass('fa fa-angle-up').addClass('fa fa-angle-down');
        render();

    })
})