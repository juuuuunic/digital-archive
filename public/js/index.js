var $gnb = $('#gnb') //기본 네비게이션
var $gnb_clone = $('#gnb').clone().attr('id','moGnb') //모바일용 네비게이션 복사

var $window = 0 //해상도 너비 구분 ex)0 = 해상도 1024 이상, 1 = 1024 이하
var $window2 = 0; //함수 중복 호출 방지

$(window).on('load resize', function(){

    ///////// gnb /////////
    setGnb();
    function setGnb() {
        var $wid = $(this).width();
        if($wid > 1023) { 
           //console.log('Window Width > 1023 now');
            if($window == 1){ 
                // 최초 가변영역 진입시 체크 및 setting
                //console.log($window)
                $window = 0;
                $window2 = 1;
                
                $('#gnb').mouseenter(function(){
                    $('.header_bg').css({"display":"block","height":"270px"});
                    $(".top_nav > li > ul").stop().slideDown(100);
                });
                $('#gnb').mouseleave(function() {
                    $('.header_bg').css({"height":"0","display":"none"});
                    $(".top_nav > li > ul").stop().slideUp(10);
                })
            }
            if($window == 0 && $window2 == 1){ 
                //console.log($window);
                // 최초 가변영역 진입시 관련함수 실행 체크
                $window2 = 1; //함수 한번만 실행후 중복실행 방지
                $('.header-box').prepend($gnb);
                $gnb_clone.detach();
    
            } else {
                //console.log($window)
                $('#gnb').mouseenter(function(){
                    $('.header_bg').css({"display":"block","height":"270px"});
                    $(".top_nav > li > ul").stop().slideDown(100);
                });
                $('#gnb').mouseleave(function() {
                    $('.header_bg').css({"height":"0","display":"none"});
                    $(".top_nav > li > ul").stop().slideUp(10);
                })
            }
        } else { 
            //console.log('Window Width > 1023 now');
            if($window2 == 0) {
                // 최초 가변영역 진입시 체크 및 setting
                $window = 1;
                $window2 = 0;
                //console.log($window2)
    
                $('.header-box > .sitemap').click(function(){
                    $('.header-box > #moGnb').css({"right":"0"});
                    $('#moGnb > .shadow_device').css({"display":"block"});
                });
    
               
            }
            if($window == 1 && $window2 == 0){ // 가변사이즈시 한번만 실행
                $window2 = 1;  //함수 한번만 실행후 중복실행 방지
                $('.header-box').prepend($gnb_clone);
                $gnb.detach();
                //console.log($window2)
                $('.close_device').click(function(){
                    $('.header-box > #moGnb').css({"right":"-100%"});
                    $('#moGnb > .shadow_device').css({"display":"none"});
                });
                
                $('#moGnb .top_nav > li').click(function() {
                    $('#moGnb .top_nav > li').removeClass('on');
                    $('#moGnb .top_nav > li > ul').css({'display': 'none'});
                    $(this).addClass('on');
                    $(this).children('ul').css({'display': 'block'});
                }) 
                $('#moGnb .top_nav > li:first-child').trigger('click');
            } else {
                //console.log($window)
                $('.header-box > .sitemap').click(function(){
                
                    $('.header-box > #moGnb').css({"right":"0"});
                    $('#moGnb > .shadow_device').css({"display":"block"});
                });
                $('.close_device').click(function(){
                    $('.header-box > #moGnb').css({"right":"-100%"});
                    $('#moGnb >.shadow_device').css({"display":"none"});
                })
                
                $('#moGnb .top_nav > li').click(function() {
                    $('#moGnb .top_nav > li').removeClass('on');
                    $('#moGnb .top_nav > li > ul').css({'display': 'none'});
                    $(this).addClass('on');
                    $(this).children('ul').css({'display': 'block'});
                }) 
                $('#moGnb .top_nav > li:first-child').trigger('click');
                
            }
        }
    }
    
    ///////// 공통사항 /////////
    var familySite = false;
    $(".family_site").click(function(){
        if(familySite) {
            //내려와 있다면
            $(".family_site").addClass('open');
            $(".family_site").find('i').removeClass('fa-angle-down');
            $(".family_site").find('i').addClass('fa-angle-down');
            familySite = false;
        }
        else {
            //올라가 있다면
            $(".family_site").removeClass('open');
            $(".family_site").find('i').removeClass('fa-angle-down');
            $(".family_site").find('i').addClass('fa-angle-up');
            familySite = true;
        }
    });


    
    var n = 0;
    var depth = 100;
    function vis_obj() {
        $(".vis_obj > li").eq(n).fadeOut(0).css({"z-index":depth++});
        $(".vis_obj > li").eq(n).delay(1000).fadeIn(700, function(){
            n++;
            if(n == 8) n = 0;
            vis_obj();
        });
    }
    vis_obj();

    var timerId = '';
    function timeline() {
        var n = 0;
        var lineLength = $('.line-obj > ul').length-2;
        timerId = setTimeout(function() {
            $("#bt_next").click(function(){
                console.log(lineLength)
                //console.log(n)
                if(n < lineLength) n++;
                else clearTimeout(timerId);
                timeMove();
            });
            $("#bt_prev").click(function(){
                //console.log(n)
                if(n > 0) n--;
                else clearTimeout(timerId);
                timeMove();
            });
            function timeMove() {
                $(".timeline > .line-obj").stop().animate({"left":(-n*233)+"px"}, 500);
            }
        });
        
    }; 
    timeline();

    $('.count').each(function() {
        var $this = $(this),
            countTo = $this.attr('data-count');
        
        $({ countNum: $this.text()}).animate({countNum: countTo},    
        {
        duration: 3000,
        easing:'linear',
        step: function() {
            $this.text(Math.floor(this.countNum));
        },
        complete: function() {
            $this.text(this.countNum);
            //alert('finished');
        }
    
        });  
        
    
    });
      
});
