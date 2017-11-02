$(function () {
    var player = $('#player');
    /*
    var en = [
        '16856999',
        '16857000',
        '16858001',
        '16858002',
        '16858003',
        '16858004',
        '16858005',
        '16858006',
        '16858007',
        '16858008',
        '16858009',
        '16858010',
        '16858011',
        '16858012',
        '16858013',
        '3026369',
        '5134011',
        '3026370',
        '3026374',
        '3026375',
        '27474295',
        '3026376',
        '3026373',
        '3026378',
        '3026387',
        '2080326',
        '2081057',
        '20707713',
        '20707571',
        '20707408',
        '2080322',
        '2081092',
        '20707696',
        '29539085',
        '2080967',
        '2081065',
        '2081313',
        '20707562',
        '20707440',
        '5173358',
        '2080640',
        '20707510',
        '20707573',
        '25730801',
        '20707471',
        '20707687',
        '2080202',
        '20707489',
        '20707550',
        '20707411',
        '20707566',
        '2080519',
        '20707425',
        '5221258',
        '2080645',
        '2080751',
        '29572547',
        '20707572',
        '20707481',
        '20707707',
        '2080976',
        '2081236',
        '20707714',
        '20707574',
        '20707412',
        '20707569',
        '20707409',
        '20707457',
        '16835358',
        '3950290',
        '16835302',
        '3950015',
        '3950552',
        '3950792',
        '1475896',
        '1475900',
        '1475904',
        '1475906',
        '1475908',
        '1475910',
        '1475912',
        '1475915',
        '1475918',
        '1475921',
        '1475924',
        '1475927',
        '1475975',
        '1475977',
        '1475979',
        '1475982',
        '1475984',
        '1475986',
        '1475988',
        '1475991',
        '1475994',
        '1475997',
        '1476000',
        '1476003',
        '1476005',
        '1476025',
        '16431922',
        '16431923',
        '16431924',
        '16431925',
        '16431926',
        '16431927',
        '16431928',
        '16431929',
        '16431930',
        '16431931',
        '16431932',
        '16431933',
        '16431879',
        '16431880',
        '16431881',
        '16431882',
        '16431883',
        '16431884',
        '16431885',
        '16431886',
        '16431887',
        '16431888',
        '16431889',
        '16431890',
        '16431891'
    ];
    var cn = [
        '368757',
        '368760',
        '368764',
        '368768',
        '368772',
        '368776',
        '368780',
        '368782',
        '368785',
        '368787',
        '368790',
        '368792',
        '368794',
        '368796',
        '368799',
        '368802',
        '368807',
        '368810',
        '368813',
        '368816',
        '368820',
        '368822',
        '368824',
        '368826',
        '368827',
        '386175',
        '386173',
        '386187',
        '386199',
        '209037',
        '209039',
        '209041',
        '209043',
        '209046',
        '209049',
        '209052',
        '209055',
        '209058',
        '209061',
        '209064',
        '189608',
        '189586',
        '189735',
        '191817',
        '191819',
        '150502',
        '150506',
        '150508',
        '150512',
        '150514',
        '150516',
        '150518',
        '150520',
        '150522',
        '150524',
        '150526',
        '150528',
        '150530',
        '167870',
        '167873',
        '167876',
        '167879',
        '167882',
        '167885',
        '167888',
        '167891',
        '167894',
        '139806',
        '139808',
        '139812',
        '139818',
        '139821',
        '139833',
        '139837',
        '139848',
        '139851',
        '139854',
        '139857',
        '139862',
        '139865',
        '139868',
        '139876',
        '25986103',
        '25986099',
        '25986097',
        '25986093',
        '25986095',
        '25986096',
        '25986094',
        '25986101',
        '25641837',
        '25641840',
        '25641848',
        '25641853',
        '25641856',
        '25641860',
        '25641863',
        '25641873',
        '25642877',
        '25642887',
        '25642871',
        '25642885',
        '25642881',
        '25642889',
        '25642876',
        '25642873',
        '25642868',
        '25642879',
        '108851',
        '108854',
        '108858',
        '108862',
        '108864',
        '108866',
        '108868',
        '108872',
        '108880',
        '108886',
        '108899',
        '108902',
        '108910',
        '108914',
        '108921',
        '108925',
        '108927',
        '108931',
        '108935',
        '108943',
        '108950',
        '108954',
        '108958',
        '108961',
        '108965',
        '108974',
        '108977',
        '108980',
        '108983',
        '108986',
        '186000',
        '186001',
        '186002',
        '186003',
        '186004',
        '186005',
        '186006',
        '186007',
        '186008',
        '186009',
        '186014',
        '186015',
        '186016',
        '186017',
        '186018',
        '186019',
        '186020',
        '186021',
        '186022',
        '186023',
        '186024',
        '186045',
        '186046',
        '186047',
        '186048',
        '186049',
        '186051',
        '186053',
        '186055',
        '186057',
        '186059'
    ];
    var jap = [
        '873709',
        '873714',
        '873718',
        '873684',
        '873685',
        '873686',
        '873666',
        '873669',
        '873672',
        '873674',
        '873676',
        '873655',
        '873657',
        '873658',
        '26125364',
        '26125365',
        '26125366',
        '26125367',
        '26125368',
        '26125369',
        '26125370',
        '26125371',
        '26125372',
        '26125373',
        '26125374',
        '26125375',
        '26125376',
        '26131297',
        '26131298',
        '26131299',
        '26484360',
        '26484372',
        '26484371',
        '26484370',
        '26484369',
        '26484368',
        '26484366',
        '26484365',
        '26484364',
        '26484363',
        '26484362',
        '26484361',
        '26484373',
        '27580227',
        '27580228',
        '27580230',
        '27580231',
        '28200261',
        '28200262',
        '28200263',
        '28577438',
        '28577439',
        '28577441',
        '28577443',
        '28864166',
        '28864167',
        '28864168',
        '28864169',
        '28923939',
        '28923940',
        '28923941',
        '28923942',
        '28923943',
        '28923944',
        '28923945',
        '28923946',
        '28923947',
        '28923948',
        '28923949',
        '28923950',
        '28923951',
        '30496836',
        '30569511',
        '30569513',
        '30569512',
        '30590537',
        '30590535',
        '30590536',
        '34999138',
        '34999140',
        '34999142',
        '34179356',
        '22790626',
        '22790627',
        '22790630',
        '22790628',
        '22790629',
        '22790631',
        '22790622',
        '22790620',
        '22790625',
        '22790623',
        '22790624',
        '22790621',
        '792375',
        '792379',
        '792383',
        '792350',
        '792352',
        '792356',
        '792328',
        '792332',
        '792336',
        '792310',
        '792313',
        '792316',
        '792291',
        '792295',
        '792299',
        '792267',
        '792271',
        '792275',
        '22790614',
        '22790607',
        '22790609',
        '22790606',
        '22790617',
        '22790610',
        '22790612',
        '22790608',
        '22790618',
        '22790613',
        '22790615',
        '22790611',
        '22790619',
        '22790616',
        '792173',
        '792177',
        '792165',
        '792167',
        '792169',
        '792149',
        '792151',
        '792153',
        '792156',
        '22790601',
        '22790594',
        '22790597',
        '22790600',
        '22790592',
        '22790596',
        '22790602',
        '22790599',
        '22790593',
        '22790605',
        '22790604',
        '22790603',
        '22790598',
        '22790595',
        '26093734',
        '26093735',
        '26093736',
        '26194339',
        '26194340',
        '26194341',
        '26387223',
        '26387224',
        '26387225',
        '27906573',
        '27906572',
        '27906574',
        '28193354',
        '28193356',
        '28193355',
        '28193358',
        '28193357',
        '28193359',
        '28193360',
        '28193361',
        '28193362',
        '28193363',
        '28193364',
        '28193365',
        '28193366',
        '28193367',
        '28243544',
        '28243545',
        '28243546',
        '28243549',
        '28243548',
        '28243547',
        '28243550',
        '28243551',
        '28243552',
        '28243555',
        '28243554',
        '28243553',
        '28243556',
        '28243557',
        '28243558',
        '28243561',
        '28243560',
        '28243559',
        '28243562',
        '28243563',
        '28243564',
        '28243567',
        '28243566',
        '28243565',
        '28243568',
        '28243569',
        '28243570',
        '28243573',
        '28243572',
        '28243571',
        '28243574',
        '28243575',
        '28243576',
        '28243579',
        '28243578',
        '28243577',
        '28243580',
        '28243581',
        '28243582',
        '28243584',
        '28243583',
        '28243585',
        '28243586',
        '28243587',
        '28243588',
        '28828483',
        '28828484',
        '28828485',
        '31370018',
        '31370019',
        '31370020',
        '31370021',
        '31370022',
        '31370023',
        '31370024',
        '31370025',
        '31370026',
        '31370027',
        '31370028',
        '31370029',
        '31370030',
        '31370031',
        '33252967',
        '33252968',
        '33471502',
        '34916486',
        '34916485',
        '34916487',
        '34916489',
        '34916492',
        '34916491',
        '34916488',
        '34916490',
        '34916493',
        '34916494',
        '34916495',
        '34916496',
        '34916497',
        '34916498',
        '34916499'
    ];
    */
    var local = [
        'hero',
        'fadingred',
        'tenniselbow',
        'springtraveller',
        'lovethepastplaythefuture',
        'feelslikerain'
    ];
    var playLocal = false;
    var idsArr = [
        /*
        en,
        cn,
        jap
        */
    ];
    var songIds = idsArr[Math.floor(Math.random() * idsArr.length)] || [];
    var songsLen = songIds.length;
    var musicBtn = $('#music > a');
    var play = $('#play');
    var pause = $('#pause');
    var next = $('#next');
    var index = 0;
    var btnDisable = false;
    var isPlaying = false;
    player.on('ended', function () {
        nextSong();
    });
    player.on('error', function () {
        nextSong();
    });
    play.on('click', function () {
        if (!play.hasClass('active') && !btnDisable) {
            playSong();
        }
    });
    pause.on('click', function () {
        if (!pause.hasClass('active') && !btnDisable) {
            pauseSong();
        }
    });
    next.on('click', function () {
        if (!btnDisable) {
            nextSong();
        }
    });
    musicBtn.on('click', function () {
        if (!btnDisable) {
            if (play.hasClass('active')) {
                pauseSong();
            }
            else {
                playSong();
            }
        }
    });
    function playSong() {
        isPlaying = true;
        play.addClass('active');
        pause.removeClass('active');
        player[0].play();
    }
    function pauseSong() {
        isPlaying = false;
        play.removeClass('active');
        pause.addClass('active');
        player[0].pause();
    }
    function nextSong() {
        pauseSong();
        var current = player.attr('title');
        var id = songIds[++index % songsLen];
        while (current === id) {
            id = songIds[++index % songsLen];
        }
        playById(id);
    }
    function playById(id) {
        showSongLoading();
        if (playLocal) {
            hideSongLoading();
            player.attr('title', id);
            player.attr('src', 'http://static.homfen.me/songs/' + id + '.mp3');
            playSong();
            return;
        }
        var promise = $.post('./api/music', {id: id});
        promise.done(function (url) {
            if (url !== '') {
                hideSongLoading();
                player.attr('title', id);
                player.attr('src', url);
                playSong();
            }
            else {
                nextSong();
            }
        });
        promise.fail(function () {
            nextSong();
        });
    }

    function randomSort(a, b) {
        return Math.random() > .5 ? -1 : 1;
    }

    function showSongLoading() {
        $('#songloading').removeClass('hide');
        btnDisable = true;
    }
    function hideSongLoading() {
        $('#songloading').addClass('hide');
        btnDisable = false;
    }

    if (true || window.AudioContext) {
        playLocal = true;
        songsLen = local.length;
        songIds = local;
        songIds.sort(randomSort);
        songIds.unshift('szjz', 'gbqq');
        playById(songIds[0]);
        initRhythm();
        initAudioContext(player[0]);
    }
    else {
        songIds.sort(randomSort);
        playById(songIds[0]);
    }

    $.post('./api/weather', null, function (data) {
        data = JSON.parse(data);
        $('#send').data('user', data.ip || data.retData.city);
        if (data.errNum === 0) {
            var retData = data.retData;
            var now = new Date();
            var nowString = now.toISOString();
            nowString = nowString.slice(0, nowString.indexOf('T'));
            var sunrise = retData.sunrise;
            var sunset = retData.sunset;
            var sunriseTime = new Date(Date.parse(nowString + 'T' + sunrise + ':00.000Z'));
            var sunsetTime = new Date(Date.parse(nowString + 'T' + sunset + ':00.000Z'));
            var isDay = false;
            if (sunriseTime < now && now < sunsetTime) {
                isDay = true;
            }
            var weather = retData.weather;
            var sun = weather.indexOf('晴') >= 0;
            var cloudy = weather.indexOf('云') >= 0;
            var rain = weather.indexOf('雨') >= 0;
            var snow = weather.indexOf('雪') >= 0;
            var light = weather.indexOf('雷') >= 0;
            var overcast = weather.indexOf('阴') >= 0;
            var ice = weather.indexOf('雹') >= 0;

            var weatherDom = $('#weather');
            var className = 'sun';
            if (sun && cloudy) {
                className = 'suncloudy';
            }
            else if (cloudy) {
                className = 'cloudy';
            }
            else if (sun) {
                className = 'sun';
            }
            else if (rain && snow) {
                className = 'rainsnow';
            }
            else if (rain) {
                className = 'rain';
            }
            else if (snow) {
                className = 'snow';
            }
            else if (light) {
                className = 'light';
            }
            else if (overcast) {
                className = 'overcast';
            }
            else if (ice) {
                className = 'ice';
            }
            if ((sun || cloudy) && !isDay) {
                className += 'night';
            }
            weatherDom.addClass(className);
            var title = [retData.city + '：' + weather];
            var temperature = retData.temp + '摄氏度';
            if (retData.h_tmp && retData.l_tmp) {
                temperature += '(' + retData.l_tmp + '~' + retData.h_tmp + ')';
            }
            title.push(temperature);
            title.push('<br/>日出：' + sunrise);
            title.push('日落：' + sunset);
            if (retData.WS) {
                title.push('<br/>' + retData.WD + '，' + retData.WS);
            }
            $('#weatherDetail').html(title.join('，'));
        }
    });

    $('#weatherNav').on('mouseover', function () {
        $('#weather').slideDown();
    }).on('mouseout', function () {
        $('#weather').fadeOut();
    });

    $('#send').on('click', function () {
        var info = $('#question').val().trim();
        if (info) {
            $('#evasay').html('...');
            $.post('./api/answer', {question: info, user: $('#send').data('user')}, function (answer) {
                answer = JSON.parse(answer);
                var html = '呵呵，我也不知道呢~';
                var code = answer.code;
                if (!(40000 < code && code < 40008)) {
                    html = answer.text;
                    if (answer.url) {
                        html += '，<a href="' + answer.url + '" target="_blank">查看详情>></a>';
                    }
                    if (answer.list) {
                        answer.list.forEach(function (item) {
                            html += '<br/><a href="' + item.detailurl + '" target="_blank">'
                                + (item.article || item.name) + '</a>';
                        });
                    }
                }
                $('#evasay').html(html);
            });
        }
    });

    function initRhythm() {
        var rhythm = $('#rhythm');
        var width = $(window).width();
        var count = 0;
        while ((count - 1) * 3 <= width) {
            var column = $('<div class="column"></div>');
            column.css('left', count * 3 + 'px');
            rhythm.append(column);
            count++;
        }
    }

    function initAudioContext(audio) {
        var audioCtx = new AudioContext();
        var analyser = audioCtx.createAnalyser();
        var source = audioCtx.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        analyser.fftSize = 1024;
        var frequencyData = new Uint8Array(analyser.frequencyBinCount);
        var columns = $('#rhythm .column');
        var len = columns.length;
        function renderFrame() {
            if (isPlaying) {
                analyser.getByteFrequencyData(frequencyData);
                for (var i = 0; i < len; i++) {
                    var y = frequencyData[i] * -100 / 256;
                    columns[i].style.transform = 'translateY( ' + y + 'px) translateZ(0)';
                }
                requestAnimationFrame(renderFrame);
            }
            else {
                var timer = setInterval(function () {
                    if (isPlaying) {
                        clearInterval(timer);
                        renderFrame();
                    }
                }, 100);
            }
        }
        renderFrame();
    }
});
);
