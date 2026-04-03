(function(){
const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
const isFromExt = new URLSearchParams(location.search).get('_from') === 'dmme_ext';
if (!isStandalone && !isFromExt) return;

var SELECTORS =['header','#side-navi','#dm-footer-wrapper','h1','.global-header','div.search-box-area','div.tab-box','#tabs','.list-capt','.banner-container.top-banner'];
var hidden = true;

function setVisibility(hide) {
  SELECTORS.forEach(function(s){
    document.querySelectorAll(s).forEach(function(el){
      if (hide) {
        el.style.setProperty('display','none','important');
      } else {
        el.style.removeProperty('display');
      }
    });
  });
  var list = document.getElementById('searchTeacherList');
  if (list) list.style.cssText = hide ? 'margin:0;padding:0;' : '';
}

setVisibility(true);

var btn = document.createElement('button');
btn.textContent = '表示';
btn.style.cssText = 'position:fixed;bottom:16px;right:16px;z-index:2147483647;padding:6px 12px;background:#333;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:12px;opacity:0.7;';
btn.addEventListener('mouseenter', function(){ btn.style.opacity = '1'; });
btn.addEventListener('mouseleave', function(){ btn.style.opacity = '0.7'; });
btn.addEventListener('click', function(){
  hidden = !hidden;
  setVisibility(hidden);
  btn.textContent = hidden ? '表示' : '非表示';
});
document.body.appendChild(btn);
})();
