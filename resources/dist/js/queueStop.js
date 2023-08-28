var timer = setTimeout(function() {
    location.reload();
}, 10000);

$(document).ready(function() {
    $("#allQueries").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
        // "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],
        "buttons": ["copy", "excel", "print", "colvis"],
        "order": [[1, "desc"]],
        "language": {
            // "url": "dist/libs/Russian.json",
            "processing": "Подождите...",
            "search": "Поиск:",
            "lengthMenu": "Показать _MENU_ записей",
            "info": "Записи с _START_ до _END_ из _TOTAL_ записей",
            "infoEmpty": "Записи с 0 до 0 из 0 записей",
            "infoFiltered": "(отфильтровано из _MAX_ записей)",
            "loadingRecords": "Загрузка записей...",
            "zeroRecords": "Записи отсутствуют.",
            "emptyTable": "В таблице отсутствуют данные",
            "searchPlaceholder": "Что ищете?",
            "paginate": {
                "first": "Первая",
                "previous": "Предыдущая",
                "next": "Следующая",
                "last": "Последняя"
            },
            "buttons": {
                "print": "Печать",
                "copy": "Копировать",
                "copyTitle": "Скопировать в буфер обмена",
                "copySuccess": {
                    "1": "Строка скопирована в буфер обмена",
                    "_": "Скопировано %d строк в буфер обмена"
                },
                "colvis": "Видимость столбцов"
            } //buttons
        }, //language
    }).buttons().container().appendTo('#allQueries_wrapper .col-md-6:eq(0)');
    $("#waitQueries").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
        // "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],
        "buttons": ["copy", "excel", "print", "colvis"],
        "order": [[1, "desc"]],
        "language": {
            // "url": "dist/libs/Russian.json",
            "processing": "Подождите...",
            "search": "Поиск:",
            "lengthMenu": "Показать _MENU_ записей",
            "info": "Записи с _START_ до _END_ из _TOTAL_ записей",
            "infoEmpty": "Записи с 0 до 0 из 0 записей",
            "infoFiltered": "(отфильтровано из _MAX_ записей)",
            "loadingRecords": "Загрузка записей...",
            "zeroRecords": "Записи отсутствуют.",
            "emptyTable": "В таблице отсутствуют данные",
            "searchPlaceholder": "Что ищете?",
            "paginate": {
                "first": "Первая",
                "previous": "Предыдущая",
                "next": "Следующая",
                "last": "Последняя"
            },
            "buttons": {
                "print": "Печать",
                "copy": "Копировать",
                "copyTitle": "Скопировать в буфер обмена",
                "copySuccess": {
                    "1": "Строка скопирована в буфер обмена",
                    "_": "Скопировано %d строк в буфер обмена"
                },
                "colvis": "Видимость столбцов"
            } //buttons
        }, //language
    }).buttons().container().appendTo('#waitQueries_wrapper .col-md-6:eq(0)');
});

$("#rejectBtn").click(function () {
    var id = $(this).attr("data-value");
    var liveDay = $("#live_day").val();
    var selectTime = $("#select_time").val();

    Swal.fire({
        title: 'Подождите...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
            // onOpen: function () {
            Swal.showLoading();
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "src/handler/queueStopHandler.php?id=" + id
                    + "&live_day=" + liveDay + "&select_time=" + selectTime + "&op=reject",
                success: function (response) {
                    if (response.code === 1) {
                        Swal.fire(
                            'Успешно!',
                            response.state_msg,
                            'success'
                        ).then(function (result) {
                            if (response.redirect_path.length > 0) {
                                window.location.href = response.redirect_path;
                            } else {
                                window.location.reload();
                            }
                        });
                    } else {
                        Swal.fire(
                            'Ошибка!',
                            response.state_msg,
                            'error'
                        );
                    }

                },
                error: function (err) {
                    console.error(err);
                    Swal.fire(
                        'Ошибка!',
                        'Не получается отклонить',
                        'error'
                    );
                }
            });
        }
    });
});
$("#allowBtn").click(function () {
    var id = $(this).attr("data-value");
    var liveDay = $("#live_day").val();
    var selectTime = $("#select_time").val();

    Swal.fire({
        title: 'Подождите...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
            // onOpen: function () {
            Swal.showLoading();
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "src/handler/queueStopHandler.php?id=" + id
                    + "&live_day=" + liveDay + "&select_time=" + selectTime + "&op=allow",
                success: function (response) {
                    if (response.code === 1) {
                        Swal.fire(
                            'Успешно!',
                            response.state_msg,
                            'success'
                        ).then(function (result) {
                            if (response.redirect_path.length > 0) {
                                window.location.href = response.redirect_path;
                            } else {
                                window.location.reload();
                            }
                        });
                    } else {
                        Swal.fire(
                            'Ошибка!',
                            response.state_msg,
                            'error'
                        );
                    }

                },
                error: function (err) {
                    console.error(err);
                    Swal.fire(
                        'Ошибка!',
                        'Не получается отклонить',
                        'error'
                    );
                }
            });
        }
    });
});

function allow(id, liveDay, selectTime, comment) {
    Swal.fire({
        title: 'Подождите...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
            var postData = {
                id: id,
                live_day: liveDay,
                select_time: selectTime,
                comment: comment
            };

            Swal.showLoading();
            $.ajax({
                type: "POST",
                dataType: "json",
                data: postData,
                url: "src/handler/queueStopHandler.php?op=allow",
                success: function (response) {
                    if (response.code === 1) {
                        Swal.fire(
                            'Успешно!',
                            response.state_msg,
                            'success'
                        ).then(function (result) {
                            if (response.redirect_path.length > 0) {
                                window.location.href = response.redirect_path;
                            } else {
                                window.location.reload();
                            }
                        });
                    } else {
                        Swal.fire(
                            'Ошибка!',
                            response.state_msg,
                            'error'
                        );
                    }

                },
                error: function (err) {
                    console.error(err);
                    Swal.fire(
                        'Ошибка!',
                        'Не получается отклонить',
                        'error'
                    );
                }
            });
        }
    });
}

function reject(id, liveDay, selectTime, comment)
{
    Swal.fire({
        title: 'Подождите...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
            var postData = {
                id: id,
                live_day: liveDay,
                select_time: selectTime,
                comment: comment
            };

            Swal.showLoading();
            $.ajax({
                type: "POST",
                dataType: "json",
                data: postData,
                url: "src/handler/queueStopHandler.php?op=reject",
                success: function (response) {
                    if (response.code === 1) {
                        Swal.fire(
                            'Успешно!',
                            response.state_msg,
                            'success'
                        ).then(function (result) {
                            if (response.redirect_path.length > 0) {
                                window.location.href = response.redirect_path;
                            } else {
                                window.location.reload();
                            }
                        });
                    } else {
                        Swal.fire(
                            'Ошибка!',
                            response.state_msg,
                            'error'
                        );
                    }

                },
                error: function (err) {
                    console.error(err);
                    Swal.fire(
                        'Ошибка!',
                        'Не получается отклонить',
                        'error'
                    );
                }
            });
        }
    });
}

$('.showModal').on('click', function () {
    var id = $(this).attr("data-value");

    clearTimeout(timer);
    Swal.fire({
        title: 'Подождите...',
        allowEscapeKey: false,
        allowOutsideClick: false,

        didOpen: () => {
            Swal.showLoading();

            // var checkDispenseInterval = setInterval(function () {

                $.ajax({
                    url: "src/handler/queueStopItemsModal.php?id=" + id,
                    type: 'POST',
                    dataType: "json",
                    success: function (response) {
                        if (response.code === 1) {
                            // clearInterval(checkDispenseInterval);

                            var data = response.item_list;

                            if (data !== null && data !== '') {
                                Swal.fire({
                                    title: response.fio_cl,
                                    width: 700,
                                    showDenyButton: true,
                                    showCancelButton: true,
                                    confirmButtonText: 'Разрешить',
                                    confirmButtonColor: 'green',
                                    denyButtonText: 'Отклонить',
                                    cancelButtonText: 'Отмена',
                                    html:
                                        `<table class="table" id="names">
                                            <thead>
                                                <tr>
                                                    <th>ФИО</th>
                                                    <th width="30%;">Совпадение %</th>
                                                    <th>Разница в символах</th>
                                                    <th>Особые приметы</th>
                                                </tr>
                                            </thead>
                                            <tbody id="testBody">                                                                               
                                            </tbody>
                                        </table>` +
                                        `<div class="row">
                                             <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="live_day">Жизн. цикл</label>
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text">
                                                            <i class="far fa-clock"></i>
                                                            </span>
                                                        </div>
                                                        <input type="text" name="live_day" id="live_day" class="form-control" required>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="selectTime">Время</label>
                                                    <div class="input-group mb-3">
                                                        <select class="custom-select" id="select_time" name="select_time" required></select>
                                                    </div>
                                                </div>
                                            </div>                                            
                                        </div>
                                        <div  class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label>Комментарии</label>
                                                    <textarea class="form-control" rows="3" name="comment" id="comment" placeholder="Введите комментарии ..."></textarea>
                                                </div>
                                            </div>
                                        </div>`


                                    , allowEscapeKey: false,
                                    allowOutsideClick: false,
                                }).then((result) => {
                                    var liveDay = $("#live_day").val();
                                    var selectTime = $("#select_time").val();
                                    var comment = $("#comment").val();

                                    if (result.isConfirmed) {
                                        allow(id, liveDay, selectTime, comment);
                                    } else if (result.isDenied) {
                                        reject(id, liveDay, selectTime, comment)
                                    }
                                });
                                var t = document.getElementById("testBody");
                                data.forEach(item => {
                                    let row = t.insertRow();
                                    let fio = row.insertCell(0);
                                    fio.innerHTML = item.b_fio;
                                    let percent = row.insertCell(1);
                                    percent.innerHTML = item.percent_match;
                                    let count = row.insertCell(2);
                                    count.innerHTML = item.count_match;
                                    let spSigns = row.insertCell(3);
                                    spSigns.innerHTML = item.sp_name;
                                });

                                $("#live_day").val(response.live_day);


                                var elSelectTime = $("#select_time");

                                var opSelDay = new Option('День', 'day');
                                var opSelHour = new Option('Час', 'hour');
                                if (response.select_time === 'day') {
                                    opSelDay.selected;
                                } else {
                                    opSelHour.selected;
                                }
                                elSelectTime.append(opSelDay);
                                elSelectTime.append(opSelHour);
                                $('#comment').val(response.comment);
                            }
                        } else {
                            Swal.fire(
                                'Ошибка!',
                                response.state_msg,
                                'error'
                            );
                        }
                    },
                    error: function (err) {
                        console.error(err);
                        Swal.fire(
                            'Ошибка!',
                            'Не удается загрузить',
                            'error'
                        );
                    },
                    cache: false,
                    contentType: false,
                    processData: false
                });
            // }, 3000);
        }
    });
});


// $('#product-wait').on('click', function () {
//     if ($.fn.DataTable.isDataTable('#example1')) {
//         $('#example1').DataTable().destroy();
//     }
//     $('#example1 tbody').empty();
//
//     $('#example1').DataTable({
//         pageLength: 25
//     });
//
// });