// 内容页
function setFont(val) {
    $('#content').css('fontFamily', val);
    setCookie('fontFamily', val);
}
function setFontColor(val) {
    $('#content').css('color', val);
    setCookie('fontColor', val);
}
function setSize(val, ele) {
    $('#content').css('fontSize', val);
    setCookie('fontSize', val);
    if (ele) {
        $(ele).addClass('active').siblings().removeClass('active');
    }
}
function setBg(val) {
    $('body').css('backgroundColor', val);
    setCookie('bg', val);
}
function setNight() {
    if ($('#readermode').attr('checked') == true) {
        $('body').css('backgroundColor', '#111111');
        $('.content').css('color', '#555555');
        setCookie('night', 1);
    } else {
        $('body').css('backgroundColor', '');
        $('.content').css('color', '');
        setCookie('night', 0);
    }
}
$('.select-font').change(function () {
    var val = $(this).val()
    setFont(val)
});
$('.select-color').change(function () {
    var val = $(this).val()
    setFontColor(val)
});
$('.select-size').change(function () {
    var val = $(this).val()
    setSize(val)
});
$('.select-bg').change(function () {
    var val = $(this).val()
    setBg(val)
});
// pc set night
$('#readermode').change(function () {
    setNight();
})

// mobile set night
$('#bgmode-light').click(function () {
    var hasCls = $('body').hasClass('nightmode');
    $('#bgmode-huyan').removeClass('active');
    if (hasCls) {
        setCookie('night', 0);
        $('body').removeClass('nightmode');
        $(this).html('开灯');
    } else {
        setCookie('night', 1);
        $('body').attr('class', 'nightmode');
        $(this).html('关灯');
    }
});
// 护眼模式
$('#bgmode-huyan').click(function () {
    var hasCls = $('body').hasClass('huyanmode');
    if (hasCls) {
        setCookie('night', 0);
        $('body').removeClass('huyanmode');
        $(this).removeClass('active');
    } else {
        setCookie('night', 2);
        $('body').attr('class', 'huyanmode');
        $(this).addClass('active');
    }
});

