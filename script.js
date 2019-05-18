window.onload = function() {
  // もし Portal が利用できるプラットフォームであれば...
  if (!'HTMLPortalElement' in window) return alert('portalが無効です。')

  setTimeout(main, 500)
}

function main() {
  // portalをページに追加
  nextPagePortal = document.createElement('portal')
  nextPagePortal.classList.add('portal')
  nextLink = document.getElementsByClassName('cur')[0].nextElementSibling
  nextPagePortal.src = nextLink.getElementsByTagName('a')[0].href

  // portalとemptyAreaをwrapする、スクロール領域
  scrollArea = document.createElement('div')
  scrollArea.classList.add('scroll')

  // portalの表示を下にずらすためのempty領域
  emptyArea = document.createElement('div')
  emptyArea.classList.add('empty')

  // 一番下までスクロールしたらportalがappendされる
  window.onscroll = function() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    if (scrollTop >= document.body.offsetHeight - window.outerHeight) {
      document.body.appendChild(scrollArea)
      scrollArea.appendChild(emptyArea)
      scrollArea.appendChild(nextPagePortal)
    }
  }

  scrollArea.onscroll = function() {
    // console.log(this.scrollTop, window.innerHeight)

    // 上に戻ったらportal非表示
    if (this.scrollTop <= 0) {
      this.style.display = 'none'
    }
    // スクロールし終えたらactivate
    if (this.scrollTop >= window.innerHeight) {
      nextPagePortal.activate()
    }
  }
}
