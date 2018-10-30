mui('.mui-scroll-wrapper').scroll({
    indicators: false, //是否显示滚动条
});
// var gallery = mui('.mui-slider');
// gallery.slider({
//   interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
// });

$(function(){
  var mySwiper = new Swiper ('.swiper-container', {

    loop: true, // 循环模式选项
    autoplay:true,//等同于以下设置
    
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
  })        
})