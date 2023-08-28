$('#SearchForm').submit(function (e) {

    e.preventDefault();
    var client_card_session_id = createUUID();
    var formData = new FormData(this);
    formData.append('SearchBtn', 'Search');
    formData.append('bus_session_id', client_card_session_id);
    var actionUrl = $(this).attr("action");

    Swal.fire({
        title: 'Подождите...',
        allowEscapeKey: false,
        allowOutsideClick: false,

        didOpen: () => {
            Swal.showLoading();

            var checkDispenseInterval = setInterval(function () {
                $.ajax({
                    url: actionUrl,
                    type: 'POST',
                    dataType: "json",
                    data: formData,
                    success: function (response) {
                        if (response.code === 1) {
                            clearInterval(checkDispenseInterval);
                            document.getElementById("clCardDiv").style.display = 'block';

                            var table = $("#clTable tbody");
                            var data = response.data;

                            if (data !== null && data !== '') {
                                table.empty();
                                data.forEach(function (item, key) {
                                    // alert(item.client);
                                    table.append(
                                        "<tr><td>" + item.name + "</td><td>" + item.inn + "</td><td>" + item.address + "</td>" +
                                        "<td>" + item.client + "</td></tr>"
                                    );
                                });
                            } else {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'warning',
                                    title: 'Данные клиента не найдены из АБС!',
                                    showConfirmButton: false,
                                    timer: 2000,
                                    timerProgressBar: true
                                });
                            }
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Данные успешно получены из АБС!',
                                showConfirmButton: false,
                                timer: 1500,
                                timerProgressBar: true
                            });
                        } else {
                            clearInterval(checkDispenseInterval);
                            Swal.fire(
                                'Ошибка!',
                                response.state_msg,
                                'error'
                            );
                        }
                    },
                    cache: false,
                    contentType: false,
                    processData: false
                });
            }, 3000);
        }
    });
});

function getEntityCard(clId) {
    var get_client_session_id = createUUID();

    Swal.fire({
        title: 'Подождите...',
        allowEscapeKey: false,
        allowOutsideClick: false,

        didOpen: () => {
            Swal.showLoading();

            var checkDispenseInterval = setInterval(function () {
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "api.php?requestType=R_ANK_KYC_ORG_FIN&absId=" + clId + "&busSessionId=" + get_client_session_id,
                    success: function (response) {
                        if (response.code === 1) {
                            clearInterval(checkDispenseInterval);
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Данные успешно получены из АБС!',
                                showConfirmButton: false,
                                timer: 1500,
                                timerProgressBar: true
                            }).then(function (result) {
                                if (response.redirect_path.length > 0) {
                                    window.location.href = response.redirect_path;
                                } else {
                                    window.location.reload();
                                }
                            });
                        } else {
                            clearInterval(checkDispenseInterval);
                            Swal.fire(
                                'Ошибка!',
                                response.state_msg,
                                'error'
                            );
                        }

                    },
                    cache: false,
                    contentType: false,
                    processData: false
                });
            }, 3000);
        }
    });
}

$('#editRisk').on('click', function () {
    var get_client_session_id = createUUID();
    var clId = $(this).attr("data-value");
    var risk = $(this).attr("data-risk");
    var high = 'Высокий';
    var middle = 'Средний';
    var low = 'Низкий';
    var hSelected = '';
    var mSelected = '';
    var lSelected = '';

    if (high === risk) {
        hSelected = 'selected';
    }
    if (middle === risk) {
        mSelected = 'selected';
    }
    if (low === risk) {
        lSelected = 'selected';
    }

    Swal.fire({
        title: 'Выберите уровень риска',
        html:
            "<div  class='row'>" +
                "<div class='col-md-12'>" +
                        "<select class='custom-select' id='risk' name='risk'>" +
                            "<option value='" + high + "' " + hSelected + ">" + high + "</option>" +
                            "<option value='" + middle + "' " + mSelected + ">" + middle + "</option>" +
                            "<option value='" + low + "' " + lSelected + ">" + low + "</option>" +
                        "</select>" +
                "</div>" +
            "</div>" +
            // "</br></br>" +
            "<div  class='row'>" +
                "<div class='col-md-12'>" +
                    "<div class='form-group'>" +
                        "<label> </label>" +
                        "<textarea class='form-control' rows='3' name='comment' id='comment' placeholder='Введите комментарии ...'></textarea>" +
                    "</div>" +
                "</div>" +
            "</div>"
        ,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Сохранить',
        cancelButtonText: 'Отмена',
        preConfirm: function () {
            var riskOption = $("#risk").val();
            var comment = $("#comment").val();
            if (riskOption === "" || comment === "") {
                Swal.showValidationMessage("Выберите уровень риска!");
            }
        }
    }).then(function (result) {

        if (result.value) {

            var newRisk = $("#risk").val();
            var comment = $("#comment").val();
            // var postData= {
            //     newRisk: newRisk,
            //     clId: clId
            // };

            Swal.fire({
                title: 'Подождите...',
                allowEscapeKey: false,
                allowOutsideClick: false,

                didOpen: () => {
                    Swal.showLoading();

                    var checkDispenseInterval = setInterval(function () {
                        $.ajax({
                            type: "POST",
                            dataType: "json",
                            // data: postData,
                            // data: { 'newRisk': newRisk},
                            url: "api.php?requestType=R_RISK_LEVEL&busSessionId=" + get_client_session_id +
                            "&newRisk=" + newRisk + "&clId=" + clId + "&comment=" + comment,
                            success: function (response) {
                                if (response.code === 1) {
                                    clearInterval(checkDispenseInterval);
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Уровень риска изменен в АБС!',
                                        showConfirmButton: false,
                                        timer: 1500,
                                        timerProgressBar: true
                                    }).then(function (result) {
                                        if (response.redirect_path.length > 0) {
                                            window.location.href = response.redirect_path;
                                        } else {
                                            window.location.reload();
                                        }
                                    });
                                } else {
                                    clearInterval(checkDispenseInterval);
                                    Swal.fire(
                                        'Ошибка!',
                                        response.state_msg,
                                        'error'
                                    );
                                }

                            },
                            cache: false,
                            contentType: false,
                            processData: false
                        });
                    }, 3000);
                }
            });
        }
    });
});


function createUUID() {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}