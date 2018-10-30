


$(function () {
    //获取本地缓存中的数据

    function getHistory() {

        var history = JSON.parse(localStorage.getItem('history')) || [];
        return history

    }
    //通过历史记录动态生成界面
    function render() {
        var history = getHistory();
        console.log(history);
        var str = template('tmp', { list: history });
        $('.history').html(str)

    }

    render();
    //点击删除按钮删除对应的历史记录
    $('.history').on("click", ".btn_delete", function () {
        var idx = $(this).data('index');
        mui.confirm('确认要删除这条记录吗?', '温馨提示', ['是', '否'], function (e) {
            console.log(e);
            if (e.index === 0) {
                var history = getHistory();
                history.splice(idx, 1);
                console.log(history);
                localStorage.setItem('history', JSON.stringify(history));
                render();
            }
        })

    })

    //点击清空按钮清空所有的历史记录
    $('.history').on('click', '.btn_empty', function () {
        mui.confirm('确认要删除所有的历史记录吗?', '温馨提示', ['是', '否'], function (e) {

            localStorage.removeItem('history');
            render()
        })
    })

      //点击搜索按钮把新生成的关键字添加到最前边
      $('.search_btn').on("click", function () {
        var value = $('.search input').val().trim();
        if(!value) {
            mui.toast('请输入搜索关键字');
            return;
        }
        var history = getHistory();
        //如果这个关键字已经存在,先删除已经存在的关键字
        var index = history.indexOf(value);
        if(index >= 0){
            history.splice(index,1);
        }

        if(history.length >=10){
            history.pop();
        }

        history.unshift(value);
        localStorage.setItem('history', JSON.stringify(history))
        render();
         $('.search input').val('');
         location.href = 'searchList.html?key='+value;
    })
})


