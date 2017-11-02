$(function () {
    var player = $('#player');
    var songIds = [
        'hero',
        'fadingred',
        'tenniselbow',
        'springtraveller',
        'lovethepastplaythefuture',
        'feelslikerain'
    ];
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
        player.attr('title', id);
        player.attr('src', 'http://homfen.me/static/songs/' + id + '.mp3');
        playSong();
    }

    function randomSort(a, b) {
        return Math.random() > .5 ? -1 : 1;
    }

    // function showSongLoading() {
    //     $('#songloading').removeClass('hide');
    //     btnDisable = true;
    // }
    // function hideSongLoading() {
    //     $('#songloading').addClass('hide');
    //     btnDisable = false;
    // }

    songIds.unshift('szjz', 'gbqq');
    songsLen = songIds.length;
    songIds.sort(randomSort);
    playById(songIds[0]);
    if (window.AudioContext) {
        initRhythm();
        initAudioContext(player[0]);
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
