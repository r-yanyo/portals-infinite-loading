window.onload = function() {
  if (!'HTMLPortalElement' in window) {
    return alert('portalが無効です。')
  }

  setTimeout(main, 500)
}

function main() {
  // もし Portal が利用できるプラットフォームであれば...
  nextPagePortal = document.createElement('portal')
  nextPagePortal.classList.add('portal')
  nextLink = document.getElementsByClassName('cur')[0].nextElementSibling
  nextPagePortal.src = nextLink.getElementsByTagName('a')[0].href

  scrollArea = document.createElement('div')
  scrollArea.classList.add('scroll')

  emptyArea = document.createElement('div')
  emptyArea.classList.add('empty')

  window.onscroll = function() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    if (scrollTop >= document.body.offsetHeight - window.outerHeight) {
      document.body.appendChild(scrollArea)
      scrollArea.appendChild(emptyArea)
      scrollArea.appendChild(nextPagePortal)
    }
  }

  scrollArea.onscroll = function() {
    console.log(this.scrollTop, window.innerHeight)
    if (this.scrollTop <= 0) {
      this.style.display = 'none'
    }
    if (this.scrollTop >= window.innerHeight) {
      nextPagePortal.activate()
    }
  }
}
