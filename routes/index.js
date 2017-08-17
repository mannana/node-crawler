var express = require('express');
var router = express.Router();
var http = require("http");
var cheerio = require("cheerio");
/* GET home page. */
router.get("/",function(req,res,next) {
    res.render('index',{});
});

router.get('/index.json', function(request, response, next) {
    //node可以接受gao bing fa
    //1.node可以接受到用户的请求
    //2. node 去请求Java提供的接口，获得真实的数据
    //3. node把数据返回给用户
  http.get("http://www.easyvoa.com",function(res){
      if(res.statusCode == "200"){
          let html = '';
          res.on("data",function(data) {
              html += data;
          })
          res.on("end",function(){
              var $ = cheerio.load(html),
                  result = [],
                  list = $("#new_news .title_a");
            for (var i = 0; i < list.length; i++) {
                var item = list.eq(i),
                    title = item.attr("title"),
                    date = item.find("span").text(),
                    date = date.replace(/(\()|(\))/g,"");
                    hasImg = item.parent().find("img").length?true:false,
                    id = null,
                    matches = item.attr("href").match(/([0-9]+)/),
                    categoryName = item.parent().find("font").text(),
                    categoryName = categoryName.replace(/(\[)|(\])/g,"");
                    color = item.parent().find("font").attr("color");
                    if(matches && matches.length){
                        id=matches[0];
                    }
                    if(title&&id){
                        result.push({
                            title: title,
                            date: date,
                            new: hasImg,
                            id: id,
                            categoryName: categoryName,
                            color: color
                        })
                    }
                }
                response.json({
                    ret: true,
                    data: {
                        article:result
                    }
                });
            })
        }
    })

  });
  router.get('/category.json', function(request, response, next) {
      //node可以接受gao bing fa
      //1.node可以接受到用户的请求
      //2. node 去请求Java提供的接口，获得真实的数据
      //3. node把数据返回给用户
    http.get("http://www.easyvoa.com",function(res){
        if(res.statusCode == "200"){
            let html = '';
            res.on("data",function(data) {
                html += data;
            })
            res.on("end",function(){
                var $ = cheerio.load(html),
                    result = [],
                    list = $("#title").find("li");
              for (var i = 0; i < list.length; i++) {
                  var item = list.eq(i),
                      name =item.find("a").text(),
                      cateName = item.find("a").attr("href");
                      cateName = cateName.split("/")[1];
                      id = null;
                      if(name){
                          result.push({
                              id:i,
                              name: name,
                              cateName:cateName
                          })
                      }

                  }
                  response.json({
                      ret: true,
                      data: {
                          categories:result
                      }
                  });
              })
          }
      })
    });


function getArticle(id,url) {
    router.get(id, function(request, response, next) {
        http.get(url,function(res){
            if(res.statusCode == "200"){
                let html = '';
                    res.on("data",function(data) {
                        html += data;
                    })
                res.on("end",function(){
                    var $ = cheerio.load(html),
                        title = $("#content_title").find("h1").text(),
                        contentlist = $("#content_main").find("p"),
                        content = "";
                        for(var i=0;i<contentlist.length;i++){
                            content+="<p>"+contentlist.eq(i).text()+"</p>";
                        }
                        response.json({
                            ret: true,
                            article: {
                                title:title,
                                content:content
                            }
                        });
                })
            }
        })
    });
}
getArticle("/19684","http://www.easyvoa.com/AS_IT_IS/19684.html");
getArticle("/19683","http://www.easyvoa.com/AS_IT_IS/19683.html");
getArticle("/19682","http://www.easyvoa.com/voa-speacial-english/Economics-Report/19682.html");
getArticle("/19681","http://www.easyvoa.com/voa-speacial-english/Science-in-the-News/19681.html");
getArticle("/19679","http://www.easyvoa.com/AS_IT_IS/19679.html");
getArticle("/19678","http://www.easyvoa.com/AS_IT_IS/19678.html");
getArticle("/19677","http://www.easyvoa.com/AS_IT_IS/19677.html");
getArticle("/19676","http://www.easyvoa.com/voa-speacial-english/Education-Report/19676.html");
getArticle("/19675","http://www.easyvoa.com/voa-speacial-english/This-is-America/19675.html");
getArticle("/19674","http://www.easyvoa.com/AS_IT_IS/19674.html");
getArticle("/19673","http://www.easyvoa.com/AS_IT_IS/19673.html");
getArticle("/19672","http://www.easyvoa.com/AS_IT_IS/19672.html");
getArticle("/19671","http://www.easyvoa.com/voa-speacial-english/This-is-America/19671.html");
getArticle("/19670","http://www.easyvoa.com/voa-speacial-english/Health-Report/19670.html");
getArticle("/19669","http://www.easyvoa.com/AS_IT_IS/19669.html");
getArticle("/19668","http://www.easyvoa.com/AS_IT_IS/19668.html");
getArticle("/19667","http://www.easyvoa.com/AS_IT_IS/19667.html");
getArticle("/19666","http://www.easyvoa.com/AS_IT_IS/19666.html");
getArticle("/19665","http://www.easyvoa.com/voa-speacial-english/Science-in-the-News/19665.html");
getArticle("/19664","http://www.easyvoa.com/AS_IT_IS/19664.html");
getArticle("/19663","http://www.easyvoa.com/AS_IT_IS/19663.html");
getArticle("/19662","http://www.easyvoa.com/AS_IT_IS/19662.html");
getArticle("/19661","http://www.easyvoa.com/voa-speacial-english/Health-Report/19661.html");
getArticle("/19660","http://www.easyvoa.com/AS_IT_IS/19660.html");
getArticle("/19659","http://www.easyvoa.com/AS_IT_IS/19659.html");
getArticle("/19658","http://www.easyvoa.com/voa-speacial-english/Education-Report/19658.html");
getArticle("/19657","http://www.easyvoa.com/voa-speacial-english/Technology-Report/19657.html");
getArticle("/19656","http://www.easyvoa.com/voa-standard-english/mp3/19656.html");
getArticle("/19655","http://www.easyvoa.com/AS_IT_IS/19655.html");
getArticle("/19654","http://www.easyvoa.com/AS_IT_IS/19654.html");
getArticle("/19653","http://www.easyvoa.com/AS_IT_IS/19653.html");
getArticle("/19652","http://www.easyvoa.com/voa-speacial-english/Health-Report/19652.html");
getArticle("/19651","http://www.easyvoa.com/voa-speacial-english/In-the-News/19651.html");
getArticle("/19650","http://www.easyvoa.com/AS_IT_IS/19650.html");
getArticle("/19649","http://www.easyvoa.com/AS_IT_IS/19649.html");
getArticle("/19648","http://www.easyvoa.com/AS_IT_IS/19648.html");
getArticle("/19647","http://www.easyvoa.com/AS_IT_IS/19647.html");
getArticle("/19646","http://www.easyvoa.com/voa-speacial-english/Science-in-the-News/19646.html");
getArticle("/19645","http://www.easyvoa.com/AS_IT_IS/19645.html");
getArticle("/19644","http://www.easyvoa.com/AS_IT_IS/19644.html");
getArticle("/19643","http://www.easyvoa.com/AS_IT_IS/19643.html");
getArticle("/19642","http://www.easyvoa.com/voa-speacial-english/In-the-News/19642.html");
getArticle("/19641","http://www.easyvoa.com/voa-speacial-english/This-is-America/19641.html");
getArticle("/19640","http://www.easyvoa.com/AS_IT_IS/19640.html");
getArticle("/19639","http://www.easyvoa.com/voa-speacial-english/Technology-Report/19639.html");
getArticle("/10548","http://www.easyvoa.com/lt/10548.html");
getArticle("/10533","http://www.easyvoa.com/lt/10533.html");
getArticle("/10519","http://www.easyvoa.com/lt/10519.html");
getArticle("/10501","http://www.easyvoa.com/lt/10501.html");
getArticle("/10488","http://www.easyvoa.com/lt/10488.html");
getArticle("/10571","http://www.easyvoa.com/lt/10471.html");


function getCategoryList(cate,url) {
    router.get(cate, function(request, response, next) {
        http.get(url,function(res){
            if(res.statusCode == "200"){
                let html = '';
                    res.on("data",function(data) {
                        html += data;
                    })
                res.on("end",function(){
                    var $ = cheerio.load(html),
                        result = [],
                        list = $("#studio_content_left").find("li");
                        if(list.length==0){
                            list=$("#new_news").find("li");
                            if(list.length==0){
                                list=$("#dongwu_content_left").find("li");
                            }
                        }

                    for (var i = 0; i < list.length; i++) {
                        var item = list.eq(i),
                            title = item.find("a").attr("title"),
                            id = item.find("a").attr("href"),
                            id = id.split("/")[2];
                            id = id.replace(/.html/,"");
                            if(title){
                                result.push({
                                    id:id,
                                    title: title
                                })
                            }

                    }
                    response.json({
                        ret: true,
                        data: {
                            list:result
                        }
                    });
                })
            }
        })
    });
}

getCategoryList("/lt.json","http://www.easyvoa.com/lt/index.html");
getCategoryList("/studioclassroom.json","http://www.easyvoa.com/studioclassroom/index.html");
getCategoryList("/advanced.json","http://www.easyvoa.com/advanced/index.html");
getCategoryList("/english.json","http://www.easyvoa.com/english/Scientific-American/index.html");
getCategoryList("/dongwu.json","http://www.easyvoa.com/dongwu/index.html");
getCategoryList("/family_album_usa.json","http://www.easyvoa.com/family_album_usa/index.html");
getCategoryList("/books.json","http://www.easyvoa.com/books/index.html");
getCategoryList("/examination.json","http://www.easyvoa.com/examination/ets/index.html");
getCategoryList("/talkshow.json","http://www.easyvoa.com/talkshow/index.html");
getCategoryList("/BBC.json","http://www.easyvoa.com/BBC/index.html");
getCategoryList("/foreign.json","http://www.easyvoa.com/foreign/index.html");














module.exports = router;
