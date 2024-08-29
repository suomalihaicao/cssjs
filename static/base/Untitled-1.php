<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta http-equiv="Cache-Control" content="max-age=<?= $cache_time ?>" />
    <title><?= $chaptername ?>_<?= $articlename ?>免费在线阅读_<?= $articlename ?>(<?= $author ?>)_<?= SITE_NAME ?></title>
    <meta name="keywords" content="<?= $chaptername ?>,<?= $articlename ?>章节免费在线阅读" />
    <meta name="description" content="<?= SITE_NAME ?>提供<?= $articlename ?><?= $chaptername ?>最新章节免费在线阅读。" />
    <link href="/static/<?= $theme_dir ?>/css/layui.css" rel="stylesheet">
    <script src="/static/<?= $theme_dir ?>/layui.js"></script>
    <script type="text/javascript" src="https://cdn.staticfile.net/jquery/3.4.0/jquery.min.js"></script>
    <script type="text/javascript" src="https://cdn.staticfile.net/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
    <script type="text/javascript" src="/static/<?= $theme_dir ?>/common.js"></script>
    <!---js测试-->
</head>


<body>
    <?php require_once 'tpl_nav.php'; ?>
    <!--碎片导航-->
    <div class="layui-container">
        <div class="layui-row">
            <div class="layui-breadcrumb" lay-separator="-">
                <a href="/">首页</a>
                <a href="<?= $info_url ?>"><?= $articlename ?></a>
                <a href="<?= $chapter_url ?>"><?= $chaptername ?></a>

            </div>
        </div>
    </div>
    <hr>

    <!-- <script>
        function changeSize(size) {
            if (size == 1) {
                // document.getElementById("content").style.fontSize = "100px";
                document.getElementById("content").style.fontSize = "100px";
                console.log("点击成功");
            } else if (size == 2) {
                document.getElementById("content").style.fontSize = "50px";
            } else if (size == 3) {
                document.getElementById("content").style.fontSize = "2px";
            }
        }
    </script> -->
    <script>
        window.onload = function() {
            var content = document.getElementById("content");
            var btn_jianxiao = document.getElementById("btn_jianxiao");
            var btn_jiada = document.getElementById("btn_jiada");
            var btn_offlight = document.getElementById("btn_offlight");
            var btn_onlight = document.getElementById("btn_onlight");
            var btn_hui = document.getElementById("btn_hui");
            var btn_yello = document.getElementById("btn_blue");
            var btn_yello = document.getElementById("btn_yello");
            var num = 14; /*定义一个初始变量*/

            content = function() {
                content.style.fontSize = "14px";
                content.syle.backgroundColor = "#EAEAEF";
            }
            btn_moren.onclick = function() {
                var num = 14;
                content.style.fontSize = '14px';
            };
            btn_jiada.onclick = function() {
                num++;
                content.style.fontSize = num + 'px';
            };
            btn_jianxiao.onclick = function() {
                num--;
                content.style.fontSize = num + 'px';
            }
            btn_offlight.onclick = function() { //关灯
                document.body.style.backgroundColor = "black";
                document.body.style.color = "white"
            }
            btn_onlight.onclick = function() { //开灯
                document.body.style.backgroundColor = "white";
                document.body.style.color = "black"
            }
            btn_hui.onclick = function() { //灰#EAEAEF
                document.body.style.backgroundColor = "#EAEAEF";
                document.body.style.color = "black"
            }
            btn_blue.onclick = function() { //浅蓝
                document.body.style.backgroundColor = "#DCE2F1";
                document.body.style.color = "black"
            }
            btn_yello.onclick = function() { //浅黄
                document.body.style.backgroundColor = "#E2CBAB";
                document.body.style.color = "black"
            }
        }
    </script>

    <div class="layui-container">
        <div class="layui-row">
            <div class="layui-btn-group">
                <button id="btn_jianxiao" type="button" class="layui-btn">-</button>
                <button id="btn_moren" type="button" class="layui-btn">默认</button>
                <button id="btn_jiada" type="button" class="layui-btn">+</button>
                <button id="btn_offlight" type="button" class="layui-btn">关灯</button>
                <button id="btn_onlight" type="button" class="layui-btn">开灯</button>
                <button id="btn_hui" type="button" class="layui-btn">灰</button>
                <button id="btn_blue" type="button" class="layui-btn">蓝</button>
                <button id="btn_yello" type="button" class="layui-btn">黄</button>
            </div>
        </div>
    </div>

    <hr>
    <!--翻页导航-->
    <div class="layui-container">
        <div class="layui-row" style="text-align: center;">
            <?php if ($prevpage_url != '') : ?>
                <a class="layui-btn layui-btn-sm" href="<?= $prevpage_url ?>">上一页</a>
            <?php else : ?>
                <?php if ($pre_cid == 0) : ?><a class="layui-btn layui-btn-sm" href="javascript:void(0);">没有了</a><?php else : ?><a class="layui-btn layui-btn-sm" href="<?= $pre_url ?>">上一章</a><?php endif ?>
            <?php endif ?>
            <a href="<?= $index_url ?>" class="layui-btn layui-btn-sm">全文阅读</a>
            <?php if ($nextpage_url != '') : ?>
                <a class="layui-btn layui-btn-sm" href="<?= $nextpage_url ?>">下一页</a>
            <?php else : ?>
                <?php if ($next_cid == 0) : ?><a class="layui-btn layui-btn-sm" href="<?= $info_url ?>">没有</a>
                <?php else : ?><a class="layui-btn layui-btn-sm" href="<?= $next_url ?>">下一章</a>
                <?php endif ?>
            <?php endif ?>
        </div>
    </div>
    <hr>

    <div class="layui-container">
        <div class="layui-row">
            <h1>
                <p align="center"><?= $chaptername ?>(<?= $now_pid ?>)</p>
            </h1>
            <hr>

            <div class="layui-text layui-bg-gray layui-font-16">

                <?= $rico_content ?>
            </div>

            <hr>
            <a href="<?= $author_url ?>"><?= $author ?></a>
            作品《<b><a href="<?= $info_url ?>"><?= $articlename ?></a>》</b><?= $chaptername ?>
            </p>
            <hr>
            <!--报错开始-->
            <p>
                <?php if (!empty($ShipSayReport['on'])) : ?>
                    <a href="javascript:report();" style="color:red;">『章节报错』</a>
                <?php endif ?>
            </p>
        </div>
    </div>
    </div>
    <hr>
    <!--报错结束--->

    <!--翻页导航-->
    <div class="layui-container">
        <div class="layui-row" style="text-align: center;">
            <?php if ($prevpage_url != '') : ?>
                <a class="layui-btn layui-btn-sm" href="<?= $prevpage_url ?>">上一页</a>
            <?php else : ?>
                <?php if ($pre_cid == 0) : ?><a class="layui-btn layui-btn-sm" href="javascript:void(0);">没有了</a><?php else : ?><a class="layui-btn layui-btn-sm" href="<?= $pre_url ?>">上一章</a><?php endif ?>
            <?php endif ?>
            <a href="<?= $index_url ?>" class="layui-btn layui-btn-sm">全文阅读</a>
            <?php if ($nextpage_url != '') : ?>
                <a class="layui-btn layui-btn-sm" href="<?= $nextpage_url ?>">下一页</a>
            <?php else : ?>
                <?php if ($next_cid == 0) : ?><a class="layui-btn layui-btn-sm" href="<?= $info_url ?>">没有</a>
                <?php else : ?><a class="layui-btn layui-btn-sm" href="<?= $next_url ?>">下一章</a>
                <?php endif ?>
            <?php endif ?>
        </div>
    </div>


    <script>
        reader_ini();
        lastread.set('<?= $info_url ?>', '<?= $uri ?>', '<?= $articlename ?>', '<?= $chaptername ?>', '<?= $author ?>', '<?= $img_url ?>');

        function report() {
            if ($.cookie('report')) {
                alert('请不要过于频繁,<?= $ShipSayReport['delay'] ?>秒可操作一次');
                return false;
            } else {
                let date = new Date();
                date.setTime(date.getTime() + (parseInt(<?= $ShipSayReport['delay'] ?>) * 100)); //n秒一次.
                $.cookie('report', true, {
                    expires: date,
                    path: '/'
                })
                layer.open({
                    type: 1,
                    area: ['300px', '300px'],
                    title: '章节报错',
                    content: $("#baocuo"),
                    shade: 0,
                    btn: ['提交', '取消'],
                    btn1: function(index, layero, status) {
                        var content = $('input:radio:checked').val();
                        $.ajax({
                            type: "post",
                            url: "/api/report.php?do=report",
                            data: {
                                content: content,
                                articleid: '<?= $articleid ?>',
                                chapterid: '<?= $chapterid ?>',
                                articlename: '<?= $articlename ?>',
                                chaptername: '<?= $chaptername ?>',
                                repurl: window.location.href,
                            },
                            success: function(state) {
                                state == '200' ? alert('成功！\n我们会尽快处理！\n感谢您对本站的支持') : alert('失败！\n请联系网站管理员');
                            }
                        })
                        layer.closeAll();
                    },
                    btn2: function(layero, index) {
                        layer.closeAll();
                    }
                })
            }
        }
    </script>


    <?php require_once 'tpl_footer.php'; ?>