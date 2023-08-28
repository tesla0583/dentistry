$('#clTypeForm').submit(function (e) {

    e.preventDefault();
    var formData = new FormData(this);
    formData.append('saveBtn', 'Save');
    var actionUrl = $(this).attr("action");

    Swal.fire({
        title: 'Подождите...',
        allowEscapeKey: false,
        allowOutsideClick: false,

        didOpen: () => {
            Swal.showLoading();

            $.ajax({
                url: actionUrl,
                type: 'POST',
                dataType: "json",
                data: formData,
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
                        'Не удается сохранить',
                        'error'
                    );
                },
                cache: false,
                contentType: false,
                processData: false
            });
        }
    });
});
