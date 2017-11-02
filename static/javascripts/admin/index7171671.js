var opt = {
    basePath: '/plugin/epiceditor',
    theme: {
        base: '/themes/base/epiceditor.css',
        preview: '/themes/preview/github.css',
        editor: '/themes/editor/epic-dark.css'
    },
    autogrow: {
        minHeight: 500,
        maxHeight: 500
    }
};

var editor = new EpicEditor(opt).load();

$('.save').on('click', function () {
    editor.save();
    var title = $('input.title').val();
    var body = editor.exportFile();
    var date = $('input.date').val();
    var category = $('input.category').val();
    var tags = $('input.tags').val();
    if (title === '' || body === '' || date === '' || category === '' || tags === '') {
        alert('有什么没填哦！');
        return;
    }
    var postData = {title: title, body: body, date: date, category: category, tags: tags};
    var id = $('input.id').val();
    var url = '/admin/post';
    if (id !== '') {
        url = '/admin/update';
        postData.id = id;
    }
    $.post(url, postData, function (data) {
        if (data === '1') {
            alert('success');
        }
    });
});

$('.nav').on('click', function (e) {
    var self = $(e.target);
    if (self.hasClass('active')) {
        return;
    }

    $('.navbar .active').removeClass('active');
    self.addClass('active');
    if (self.hasClass('nav-home')) {
        $('.list').show();
        $('.editor').hide();
        $('.image').hide();
    }
    else if (self.hasClass('nav-editor')) {
        $('.list').hide();
        $('.editor').show();
        resetEditor();
        $('.image').hide();
    }
    else if (self.hasClass('nav-image')) {
        $('.list').hide();
        $('.editor').hide();
        $('.image').show();
    }
});

$('.list ul').on('click', function (e) {
    var self = $(e.target);
    if (self[0].nodeName !== 'A') {
        return;
    }
    var id = self.attr('data-id');
    if (self.hasClass('edit')) {
        $.get('/admin/post/' + id, function (data) {
            $('.list').hide();
            $('.nav-home').removeClass('active');
            $('.editor').show();
            $('.nav-editor').addClass('active');
            resetEditor();
            var post = JSON.parse(data);
            $('.editor label:first').html('Edit a post:');
            $('input.id').val(post._id);
            $('input.title').val(post.title);
            var date = new Date(post.date);
            $('input.date').val(dateToStr(date));
            $('input.category').val(post.categories);
            $('input.tags').val(post.tags);
            editor.importFile(null, post.body);
        });
    }
    else if (self.hasClass('delete')) {
        var deleted = self.attr('data-deleted') === 'true' ? false : true;
        $.post('/admin/update', {id: id, deleted: deleted}, function (data) {
            if (data === '1') {
                self.attr('data-deleted', deleted);
                self.html(deleted ? '恢复' : '删除');
            }
        });
    }
});

$('#upload').on('click', function (e) {
    if ($('#imagesForUpload')[0].files.length === 0) {
        e.preventDefault();
        return false;
    }
    var fd = new FormData(document.getElementById('uploadForm'));
    $.ajax({
        url: '/admin/upload',
        type: 'POST',
        data: fd,
        processData: false,
        contentType: false,
        success: function (result) {
            if (result === '0') {
                alert('上传失败');
            }
            else {
                var images = JSON.parse(result);
                images.forEach(function (image) {
                    var name = image.name;
                    var url = '/image/' + name;
                    var html = '<li><i class="deleteImage" data-href="' + url + '">X</i>'
                        + '<a href="' + url + '" target="_blank"><img src="' + url + '"></a></li>';
                    $('.imageList ul').append($(html));
                });
            }
        },
        error: function () {
            alert('上传失败');
        }
    });
});

$('.imageList').on('click', function (e) {
    var target = $(e.target);
    if (!target.hasClass('deleteImage')) {
        return;
    }
    var href = target.data('href');
    var name = href.slice(href.lastIndexOf('/') + 1);
    deleteImage(name, function () {
        target.parent().remove();
    }, function () {
        alert('删除失败');
    });
});

function dateToStr(now) {
    var year = now.getFullYear();
    var month = ('0' + (now.getMonth() + 1)).slice(-2);
    var day = ('0' + now.getDate()).slice(-2);
    var hour = ('0' + now.getHours()).slice(-2);
    var minute = ('0' + now.getMinutes()).slice(-2);
    var second = ('0' + now.getSeconds()).slice(-2);
    return year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
}

function resetEditor() {
    $('.editor label:first').html('Add a post:');
    $('input.post').each(function (i, ele) {
        $(ele).val('');
    });
    var dateInput = $('.post.date');
    var now = new Date();
    dateInput.val(dateToStr(now));
    editor = new EpicEditor(opt).load();
    editor.importFile(null, '');
}

function showList() {
    var ul = $('.list ul');
    ul.html('<li>Loading...</li>');
    $.get('/admin/posts', function (data) {
        data = JSON.parse(data);
        var html = '';
        data.forEach(function (post) {
            html += '<li><a class="edit" data-id="' + post._id + '">' + post.title + '</a>'
                + '<a class="delete" data-id="' + post._id + '" data-deleted="' + post.deleted + '">'
                + (post.deleted ? '恢复' : '删除') + '</a></li>';
        });
        ul.html(html);
    });
}

function showImageList() {
    var ul = $('.imageList ul');
    ul.html('<li>Loading...</li>');
    $.get('/admin/images', function (data) {
        data = JSON.parse(data);
        var html = '';
        data.forEach(function (image) {
            html += '<li><i class="deleteImage" data-href="' + image + '">X</i>'
                + '<a href="' + image + '" target="_blank"><img src="' + image + '"></a></li>';
        });
        ul.html(html);
    });
}

function deleteImage(name, cbs, cbf) {
    $.post('/admin/deleteImage', {name: name}, function (result) {
        if (result === '1') {
            cbs && cbs();
        }
        else if (result === '0') {
            cbf && cbf();
        }
    });
}

showList();
showImageList();
