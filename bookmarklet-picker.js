javascript:(function(){
  var hl = document.createElement('div');
  hl.style.cssText = 'position:fixed;pointer-events:none;background:rgba(0,120,255,0.25);border:2px solid #0078ff;box-sizing:border-box;z-index:2147483647;transition:none;';
  document.body.appendChild(hl);

  function getSelector(el) {
    if (el.id) return '#' + el.id;
    var classes = Array.from(el.classList).filter(Boolean);
    if (classes.length) return el.tagName.toLowerCase() + '.' + classes.join('.');
    return el.tagName.toLowerCase();
  }

  function onMove(e) {
    var r = e.target.getBoundingClientRect();
    hl.style.left   = r.left + window.scrollX + 'px';
    hl.style.top    = r.top  + window.scrollY + 'px';
    hl.style.width  = r.width  + 'px';
    hl.style.height = r.height + 'px';
  }

  function onClick(e) {
    e.preventDefault();
    e.stopPropagation();
    document.removeEventListener('mouseover', onMove, true);
    document.removeEventListener('click',     onClick, true);
    document.body.removeChild(hl);
    alert('selector:\n' + getSelector(e.target));
  }

  document.addEventListener('mouseover', onMove, true);
  document.addEventListener('click',     onClick, true);
})();
