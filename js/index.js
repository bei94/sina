// REM
~function($){
    let computed = ()=>{
        let $HTML = $(document.documentElement),
            winW = $HTML[0].clientWidth,
            value = 100;
        value = winW < 640 ? winW / 640 * 100 : value;
        $HTML.css('fontSize',value);
    };
    computed();
    $(window).on('resize',computed);
}(Zepto);

// HEADER
let headerRender = (function($){
    let $headerBox = $('.headerBox'),
        $menu = $headerBox.find('.menu'),
        $navBox = $headerBox.find('.navBox'),
        flag = false;
    return {
        init:function(){
            $menu.tap(()=>{
                if(flag === false){
                    $navBox.css({
                        padding: '.16rem 0',
                        height: '1.28rem'
                    });
                    flag = true;
                    return;
                }
                $navBox.css({
                    padding: '0',
                    height: '0'
                });
                flag = false;
            });
        }
    }
})(Zepto);
headerRender.init();

//BANNER
let bannerRender = (function($){
    let bannerExample = null,
        $bannerBox = $('.bannerBox'),
        $wrapper = $bannerBox.find('.swiper-wrapper'),
        $plan = $.Callbacks();
    // 数据绑定
    $plan.add(result=>{
        $bannerBox.css('display','block');
        let str = ``;
        result.forEach(item=>{
            str += `<div class="swiper-slide">
                    <a href="${item.link}">
                        <img data-src="${item.img}" class="swiper-lazy" alt="">
                        <p>${item.desc}</p>
                    </a>
                </div>`;
        });
        $wrapper.html(str);
    });
    //初始化SWIPER
    $plan.add(()=>{
        bannerExample = new Swiper('.bannerBox',{
            autoplay:3000,
            autoplayDisableOnInteraction:false,
            loop:true,
            pagination : '.swiper-pagination',
            paginationType : 'fraction',
            //关于图片延迟加载
            lazyLoading : true,
            lazyLoadingInPrevNext : true
        });
    });
    return {
        init:function(){
            $.ajax({
                url:'banner.json',
                method:'get',
                dataType:'json',
                cache:false,
                success:$plan.fire
            });
        }
    }
})(Zepto);
bannerRender.init();

//LIVE
let liveRender = (function($){
    let liveExample = null,
        $liveBox = $('.liveBox'),
        $wrapper = $liveBox.find('.swiper-wrapper'),
        $plan = $.Callbacks();
    // 数据绑定
    $plan.add(result=>{
        $liveBox.css('display','block');
        let str = ``;
        result.forEach(item=>{
            str += `<div class="swiper-slide">
                        <a href="${item.link}">${item.title}</a>
                    </div>`;
        });
        $wrapper.html(str);
    });
    //初始化SWIPER
    $plan.add(()=>{
        liveExample = new Swiper('.liveCon',{
            direction : 'vertical',
            autoplay:3000,
            loop:true,
            // slide无法拖动
            onlyExternal:true
        });
    });
    return {
        init:function(){
            $.ajax({
                url:'aside.json',
                method:'get',
                dataType:'json',
                cache:false,
                success:$plan.fire
            });
        }
    }
})(Zepto);
liveRender.init();