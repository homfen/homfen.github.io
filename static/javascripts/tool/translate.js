var typeSelect = {
    baidu: '百度翻译',
    bing: '必应翻译'
};

var baiduSelect = {
    zh: '中文',
    en: '英语',
    jp: '日语',
    th: '泰语',
    ru: '俄罗斯语',
    pt: '葡萄牙语',
    de: '德语',
    it: '意大利语',
    nl: '荷兰语',
    el: '希腊语',
    kor: '韩语',
    spa: '西班牙语',
    fra: '法语',
    ara: '阿拉伯语',
    yue: '粤语',
    wyw: '文言文',
    auto: '自动检测'
};

var bingSelect = {
    'ar': 'Arabic',
    'bs-Latn': 'Bosnian (Latin)',
    'bg': 'Bulgarian',
    'ca': 'Catalan',
    'zh-CHS': 'Chinese Simplified',
    'zh-CHT': 'Chinese Traditional',
    'hr': 'Croatian',
    'cs': 'Czech',
    'da': 'Danish',
    'nl': 'Dutch',
    'en': 'English',
    'et': 'Estonian',
    'fi': 'Finnish',
    'fr': 'French',
    'de': 'German',
    'el': 'Greek',
    'ht': 'Haitian Creole',
    'he': 'Hebrew',
    'hi': 'Hindi',
    'mww': 'Hmong Daw',
    'hu': 'Hungarian',
    'id': 'Indonesian',
    'it': 'Italian',
    'ja': 'Japanese',
    'sw': 'Kiswahili',
    'tlh': 'Klingon',
    'tlh-Qaak': 'Klingon (pIqaD)',
    'ko': 'Korean',
    'lv': 'Latvian',
    'lt': 'Lithuanian',
    'ms': 'Malay',
    'mt': 'Maltese',
    'no': 'Norwegian',
    'fa': 'Persian',
    'pl': 'Polish',
    'pt': 'Portuguese',
    'otq': 'Querétaro Otomi',
    'ro': 'Romanian',
    'ru': 'Russian',
    'sr-Cyrl': 'Serbian (Cyrillic)',
    'sr-Latn': 'Serbian (Latin)',
    'sk': 'Slovak',
    'sl': 'Slovenian',
    'es': 'Spanish',
    'sv': 'Swedish',
    'th': 'Thai',
    'tr': 'Turkish',
    'uk': 'Ukrainian',
    'ur': 'Urdu',
    'vi': 'Vietnamese',
    'cy': 'Welsh',
    'yua': 'Yucatec Maya'
};

var dictTypeSelect = {
    iciba: '金山词霸',
    urban: 'Urban'
};

function setSelect(id, data) {
    var html = '';
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            html += '<option value=' + key + '>' + data[key] + '</option>';
        }
    }
    $('#' + id).html(html);
}

setSelect('dictType', dictTypeSelect);
setSelect('type', typeSelect);
setSelect('from', baiduSelect);
setSelect('to', baiduSelect);
$('#from').val('en');
$('#to').val('zh');

$('#type').on('change', function () {
    var val = $('#type').val();
    switch (val) {
        case 'baidu':
            setSelect('from', baiduSelect);
            setSelect('to', baiduSelect);
            $('#from').val('en');
            $('#to').val('zh');
            break;
        case 'bing':
            setSelect('from', bingSelect);
            setSelect('to', bingSelect);
            $('#from').val('en');
            $('#to').val('zh-CHS');
            break;
        default:
            setSelect('from', baiduSelect);
            setSelect('to', baiduSelect);
            $('#from').val('en');
            $('#to').val('zh');
            break;
    }
});

$('#translate').on('click', function () {
    var type = $('#type').val();
    var query = $('#query').val().trim();
    var from = $('#from').val();
    var to = $('#to').val();
    if (query) {
        $.post('./api/translate',
            {
                type: type,
                query: query,
                from: from,
                to: to
            },
            function (data) {
                var result = '';
                if (type === 'baidu') {
                    data = JSON.parse(data);
                    result = data.retData.trans_result[0].dst;
                }
                if (type === 'bing') {
                    result = data.replace(/["\\]/g, '');
                }
                $('#result').html(result);
            }
        );
    }
});

$('#search').on('click', function () {
    var type = $('#dictType').val();
    var word = $('#word').val().trim();
    if (word) {
        $.post('./api/dictionary',
            {
                type: type,
                word: word
            },
            function (data) {
                var html = '';
                switch (type) {
                    case 'iciba':
                        html = icibaHandler(data);
                        break;
                    case 'urban':
                        html = urbanHanlder(data);
                        break;
                    default:
                        html = icibaHandler(data);
                        break;
                }
                $('#detail').html(html);
            }
        );
    }
});

$('#detail').on('click', '.glyphicon-volume-up', function () {
    var src = $(this).attr('data-src');
    var audio = $('#play')[0];
    audio.src = src;
    audio.play();
});

function icibaHandler(data) {
    if (!data) {
        return '<h3>居然没查到！(￣^￣)</h3>';
    }
    data = JSON.parse(data);
    var arr = [];
    arr.push('<h3>' + data.word_name + '</h3>');
    var symbols = data.symbols[0];
    var symbolHtml = '';
    if (symbols.ph_en) {
        symbolHtml += '<b>英</b>【' + symbols.ph_en + '】';
        if (symbols.ph_en_mp3) {
            symbolHtml += '<span class="glyphicon glyphicon-volume-up" aria-hidden="true" data-src="'
                + symbols.ph_en_mp3 + '"></span>';
        }
    }
    if (symbols.ph_am) {
        symbolHtml += '<b>美</b>【' + symbols.ph_am + '】';
        if (symbols.ph_am_mp3) {
            symbolHtml += '<span class="glyphicon glyphicon-volume-up" aria-hidden="true" data-src="'
                + symbols.ph_am_mp3 + '"></span>';
        }
    }
    arr.push('<p>' + symbolHtml + '</p>');
    var exchange = data.exchange;
    var exchangeHtml = '';
    var exchangeArr = [];
    if (exchange.word_third) {
        exchangeArr.push('第三人称：' + exchange.word_third.join('，'));
    }
    if (exchange.word_past) {
        exchangeArr.push('过去时：' + exchange.word_past.join('，'));
    }
    if (exchange.word_done) {
        exchangeArr.push('完成时：' + exchange.word_done.join('，'));
    }
    if (exchange.word_ing) {
        exchangeArr.push('进行时：' + exchange.word_ing.join('，'));
    }
    exchangeHtml = exchangeArr.join('；');
    arr.push('<p>' + exchangeHtml + '</p>');
    var parts = symbols.parts;
    parts.forEach(function (part, index) {
        var partHtml = part.part + ' ' + part.means.join('；');
        arr.push('<p>' + partHtml + '</p>');
    });
    return arr.join('');
}

function urbanHanlder(data) {
    if (!data) {
        return '<h3>Not found. ( p_q)</h3>';
    }
    data = JSON.parse(data);
    var url = 'http://www.urbandictionary.com/define.php?term=' + data.word + '&defid=' + data.defid;
    var html = '<h3><a href="' + url + '" target="_blank">' + data.word + '</a></h3>'
        + '<p>' + data.definition.replace(/\n/g, '<br/>') + '</p>';
    if (data.example) {
        html += '<p>' + data.example.replace(/\n/g, '<br/>') + '</p>';
    }
    if (data.author) {
        html += '<p>By <a href="' + url + '" target="_blank">' + data.author + '</a>';
        if (data.thumbs_up) {
            html += '<span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span>' + data.thumbs_up;
        }
        if (data.thumbs_down) {
            html += '<span class="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span>' + data.thumbs_down;
        }
        html += '</p>';
    }
    return html;
}
