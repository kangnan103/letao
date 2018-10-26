


$(function () {
    var currentPage = 1;
    var pageSize = 5;
    render();

    var u_id;
    var isDelete;
    $("tbody").on("click", "button", function () {
        $("#userModal").modal("show");
        u_id = $(this).parent().data("id");
        isDelete = $(this).hasClass("btn-success") ? 0 : 1;
    });

    $(".confirm1").on("click", function () {
        console.log(u_id);
        console.log(isDelete);

        $.ajax({
            type: "post",
            url: "/user/updateUser",
            data: {
                id: u_id,
                isDelete: isDelete
            },


            success: function (info) {
                console.log(info);

                $("#userModal").modal("hide");
                render();
            }
        })

    })

    function render() {
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                var str = template("tmp", info)
                $("tbody").html(str);
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
})