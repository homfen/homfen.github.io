var handlers = {
    tel: function (data) {
        data = JSON.parse(data);
        var response = data.response;
        var html = '';
        for (var n in response) {
            if (response.hasOwnProperty(n)) {
                html += '<h4>' + n + '</h4><p>';
                var tel = response[n];
                var location = tel.location;
                if (location) {
                    var locArr = [];
                    location.province && locArr.push(location.province);
                    if (location.city && location.province !== location.city) {
                        locArr.push(location.city);
                    }
                    location.operators && locArr.push(location.operators);
                    html += locArr.join('，');
                }
                if (tel.name) {
                    html += '<br/>';
                    if (tel.type === 'report' && tel.count) {
                        html += '被<b style="color:red;">' + tel.count + '</b>人标记为：';
                    }
                    html += '<b>' + tel.name + '</b>';
                }
            }
        }
        return html;
    }
};

$('.query').on('click', function () {
    var type = $(this).data('type');
    var parent = $(this).parent();
    var value = parent.find('.value').val();
    if (!value) {
        return;
    }
    var result = parent.find('.result');
    var url = './api/';
    var data = {};
    switch (type) {
        case 'tel':
            url += 'tel';
            data.tel = value;
            break;
        default:
            url += 'tel';
            data.tel = value;
            break;
    }
    $.post(url, data, function (data) {
        var html = handlers[type](data);
        result.html(html);
    });
});

