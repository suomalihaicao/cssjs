//add=common.js
function login() {
  if ($.cookie("ss_username")) {
    document.writeln(
      "<a class='login_topbtn c_index_login' href='/logout/' title='退出登录'>退出</a> <a class='login_topbtn c_index_login' href='/bookcase/' title='我的书架'>书架</a>"
    );
  } else {
    document.writeln(
      "<a class='login_topbtn c_index_login' href='/login/'>登录</a> <a class='login_topbtn c_index_login' href='/register/'>注册</a>"
    );
  }
}

function addbookcase(aid, name, cid, cname) {
  if ($.cookie("ss_userid") && $.cookie("PHPSESSID") != -1) {
    rico_data = {
      articleid: aid,
      articlename: name,
      chapterid: cid,
      chaptername: cname,
    };

    $.ajax({
      type: "post",
      url: "/addbookcase/",
      data: rico_data,
      success: function (data) {
        alert(data);
      },
    });
  } else {
    if (window.confirm("\n永久书架需要登录才能使用，转到登录页面吗？")) {
      window.location.href = "/login/";
    } else {
      return;
    }
  }
}

function delbookcase(aid) {
  if (window.confirm("\n确定要删除吗？")) {
    if ($.cookie("ss_userid") && $.cookie("PHPSESSID") != -1) {
      (rico_data = {
        articleid: aid,
      }),
        $.ajax({
          type: "post",
          url: "/delbookcase/",
          data: rico_data,
          success: function (data) {
            alert(data);
            window.location.reload();
          },
        });
    }
  } else {
    return;
  }
}

function register_check() {
  if (
    $("#regname").val() == "" ||
    $("#regpass").val() == "" ||
    $("#repass").val() == "" ||
    $("#email").val() == ""
  ) {
    alert("每项都必须填写");
    return false;
  }

  if ($("#regpass").val() !== $("#repass").val()) {
    alert("两次输入的密码不一致");
    return false;
  }
  return true;
}

function isnight() {
  if ($.cookie("isnight") == 1) {
    $("#chaptercontent").css({ background: "", color: "" });
    $("#lightdiv").text("关灯");
    $.cookie("isnight", 0, { expires: 365, path: "/" });
  } else {
    $("#chaptercontent").css({ background: "#000", color: "#939393" });
    $("#lightdiv").text("开灯");
    $.cookie("isnight", 1, { expires: 365, path: "/" });
  }
  $.cookie("isgreen", 0, { expires: 365, path: "/" });
}

function isgreen() {
  if ($.cookie("isgreen") == 1) {
    $("#chaptercontent").css({ background: "", color: "" });
    $("#huyandiv").removeClass("huyanon").addClass("lightoff");
    $.cookie("isgreen", 0, { expires: 365, path: "/" });
  } else {
    $("#chaptercontent").css({ background: "#DCECD2", color: "#939393" });
    $("#huyandiv").removeClass("lightoff").addClass("huyanon");
    $.cookie("isgreen", 1, { expires: 365, path: "/" });
  }
  $.cookie("isnight", 0, { expires: 365, path: "/" });
}

function changeSize(size) {
  $(".sizebg").removeClass("sizebgon");
  if (size == 1) {
    $("#chaptercontent").css("font-size", "24px");
    $("#fontbig").addClass("sizebgon");
    $.cookie("fontsize", "24px", { expires: 365, path: "/" });
  } else if (size == 2) {
    $("#chaptercontent").css("font-size", "20px");
    $("#fontmiddle").addClass("sizebgon");
    $.cookie("fontsize", "20px", { expires: 365, path: "/" });
  } else if (size == 3) {
    $("#chaptercontent").css("font-size", "14px");
    $("#fontsmall").addClass("sizebgon");
    $.cookie("fontsize", "14px", { expires: 365, path: "/" });
  }
}

function reader_ini() {
  if ($.cookie("isgreen") == 1) {
    $("#chaptercontent").css({ background: "#DCECD2", color: "#939393" });
    $("#huyandiv").removeClass("lightoff").addClass("huyanon");
  } else if ($.cookie("isnight") == 1) {
    $("#chaptercontent").css({ background: "#000", color: "#939393" });
    $("#lightdiv").text("开灯");
  }

  //处理字号
  $(".sizebg").removeClass("sizebgon");
  switch ($.cookie("fontsize")) {
    case "24px":
      $("#chaptercontent").css("font-size", "24px");
      $("#fontbig").addClass("sizebgon");
      break;

    case "14px":
      $("#chaptercontent").css("font-size", "14px");
      $("#fontsmall").addClass("sizebgon");
      break;

    case "20px":
    default:
      $("#chaptercontent").css("font-size", "20px");
      $("#fontmiddle").addClass("sizebgon");
      break;
  }
}

function gotop() {
  $("body,html").animate({ scrollTop: 0 }, 100);
}

let bookmax = 20;
function LastRead() {
  this.bookList = "bookList";
}
LastRead.prototype = {
  set: function (bid, uri, bookname, chaptername, author, img_url) {
    if (!(bid && uri && bookname && chaptername && author && img_url)) return;
    var v =
      bid +
      "#" +
      uri +
      "#" +
      bookname +
      "#" +
      chaptername +
      "#" +
      author +
      "#" +
      img_url;
    var aBooks = lastread.getBook();
    var aBid = new Array();
    for (i = 0; i < aBooks.length; i++) {
      aBid.push(aBooks[i][0]);
    }
    if ($.inArray(bid, aBid) != -1) {
      lastread.remove(bid);
    } else {
      while (aBooks.length >= bookmax) {
        lastread.remove(aBooks[0][0]);
        aBooks = lastread.getBook();
      }
    }
    this.setItem(bid, v);
    this.setBook(bid);
  },
  get: function (k) {
    return this.getItem(k) ? this.getItem(k).split("#") : "";
  },
  remove: function (k) {
    this.removeItem(k);
    this.removeBook(k);
  },
  setBook: function (v) {
    var reg = new RegExp("(^|#)" + v);
    var books = this.getItem(this.bookList);
    if (books == "") {
      books = v;
    } else {
      if (books.search(reg) == -1) {
        books += "#" + v;
      } else {
        books.replace(reg, "#" + v);
      }
    }
    this.setItem(this.bookList, books);
  },
  getBook: function () {
    var v = this.getItem(this.bookList)
      ? this.getItem(this.bookList).split("#")
      : Array();
    var books = Array();
    if (v.length) {
      for (var i = 0; i < v.length; i++) {
        var tem = this.getItem(v[i]).split("#");
        if (tem.length > 3) books.push(tem);
      }
    }
    return books;
  },
  removeBook: function (v) {
    var reg = new RegExp("(^|#)" + v);
    var books = this.getItem(this.bookList);
    if (!books) {
      books = "";
    } else {
      if (books.search(reg) != -1) {
        books = books.replace(reg, "");
      }
    }
    this.setItem(this.bookList, books);
  },
  setItem: function (k, v) {
    if (!!window.localStorage) {
      localStorage.setItem(k, v);
    } else {
      var expireDate = new Date();
      var EXPIR_MONTH = 30 * 24 * 3600 * 1000;
      expireDate.setTime(expireDate.getTime() + 12 * EXPIR_MONTH);
      document.cookie =
        k +
        "=" +
        encodeURIComponent(v) +
        ";expires=" +
        expireDate.toGMTString() +
        "; path=/";
    }
  },
  getItem: function (k) {
    var value = "";
    var result = "";
    if (!!window.localStorage) {
      result = window.localStorage.getItem(k);
      value = result || "";
    } else {
      var reg = new RegExp("(^| )" + k + "=([^;]*)(;|\x24)");
      var result = reg.exec(document.cookie);
      if (result) {
        value = decodeURIComponent(result[2]) || "";
      }
    }
    return value;
  },
  removeItem: function (k) {
    if (!!window.localStorage) {
      window.localStorage.removeItem(k);
    } else {
      var expireDate = new Date();
      expireDate.setTime(expireDate.getTime() - 1000);
      document.cookie = k + "= " + ";expires=" + expireDate.toGMTString();
    }
  },
  removeAll: function () {
    if (!!window.localStorage) {
      window.localStorage.clear();
    } else {
      var v = this.getItem(this.bookList)
        ? this.getItem(this.bookList).split("#")
        : Array();
      var books = Array();
      if (v.length) {
        for (i in v) {
          var tem = this.removeItem(v[k]);
        }
      }
      this.removeItem(this.bookList);
    }
  },
};
function removebook(k) {
  lastread.remove(k);
  showtempbooks();
}
function removeall() {
  lastread.removeAll();
  showtempbooks();
}
function showtempbooks() {
  var books = lastread.getBook().reverse(); //倒序
  bookhtml = "";
  if (books.length) {
    for (var i = 0; i < books.length; i++) {
      if (i < bookmax) {
        bookhtml += '<div class="layui-col-xs4">';
        bookhtml += '<a title="' + books[i][2] + '"href="' + books[i][0] + '">';
        bookhtml +=
          '<img width="100" height="125" alt="' +
          books[i][2] +
          '"src="' +
          books[i][5] +
          '">';
        bookhtml += "</a>";
        bookhtml += "</div>";
        bookhtml += '<div class="layui-fluid">';
        bookhtml += "<ul>";
        bookhtml +=
          '<li><h2><a href="' +
          books[i][0] +
          '">' +
          books[i][2] +
          "</a></h2></li>";
        bookhtml += '<li">作者：' + books[i][4] + "</li>";
        bookhtml +=
          '<li>已读到：<a href="' +
          books[i][1] +
          '">' +
          books[i][3] +
          "</a></li>";
        bookhtml += "<li>";
        bookhtml +=
          "<a href=\"javascript:removebook('" +
          books[i][0] +
          "')\">移除书架</a>";
        bookhtml += "</li>";
        bookhtml += "</ul>";
        bookhtml += "</div>";
        bookhtml += "<hr> ";
      }
    }
  } else {
    bookhtml +=
      '<li><b style="display:flex;color:red;padding:20px;">还没有阅读记录哦 ( ˙﹏˙ )( ˙﹏˙ )，去找找书看吧。</b> <li > ';
  }
  $("#tempBookcase").html(bookhtml);
}
window.lastread = new LastRead();

function push() {
  //BDpush
  (function () {
    var bp = document.createElement("script");
    var curProtocol = window.location.protocol.split(":")[0];
    if (curProtocol === "https") {
      bp.src = "https://zz.bdstatic.com/linksubmit/push.js";
    } else {
      bp.src = "http://push.zhanzhang.baidu.com/push.js";
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
  })();
  //TTpush
  (function () {
    var el = document.createElement("script");
    el.src =
      "https://lf1-cdn-tos.bytegoofy.com/goofy/ttzz/push.js?5e00621d58ca5515ca08c9f81a6385262129b24ab6d8d29de966cbd3f43ef099c112ff4abe50733e0ff1e1071a0fdc024b166ea2a296840a50a5288f35e2ca42";
    el.id = "ttzz";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(el, s);
  })(window);
}

