['header','#side-navi','#dm-footer-wrapper','h1','.global-header','div.search-box-area','div.tab-box','#tabs','.list-capt'].forEach(function(s){
  document.querySelectorAll(s).forEach(function(el){
    el.style.setProperty('display','none','important');
  });
});
var list = document.getElementById('searchTeacherList');
if (list) list.style.cssText = 'margin:0;padding:0;';
