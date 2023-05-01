/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "duckduckgo"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"vKmrVmpAzowaF65s","label":"crypto","bookmarks":[{"id":"8BHYWYolj4rr1Nnu","label":"itc","url":"https://app.intothecryptoverse.com/dashboard"},{"id":"k5PbnvXG1AgKsD7j","label":"messari","url":"https://messari.io/"},{"id":"05Q80Y1uwEwidBYN","label":"st4ck3nws","url":"https://stacker.news/"}]},{"id":"2FnPTzUqwqVjB4EZ","label":"hpserver","bookmarks":[{"id":"lCBJGfJrf5GV734U","label":"heimdall","url":"http://192.168.1.7:50020/"},{"id":"sECxPPRm9T62FtGC","label":"transmission","url":"192.168.1.7:9091/transmission/web/"},{"id":"FxhVn0VSn6Us6g3W","label":"portainer","url":"https://192.168.1.7:9443/#!/2/docker/dashboard"},{"id":"tagkFvMJ90FZBols","label":"nc","url":"http://192.168.1.7:50002/"}]},{"id":"lNRrp6enwtu41fSd","label":"pr0dukt1v1tY","bookmarks":[{"id":"pXfuWLnWfDOFMKES","label":"zh","url":"https://www.zerohedge.com/"},{"id":"hkxBdAvIQhhsusTx","label":"chatGPT","url":"https://chat.openai.com/?model=text-davinci-002-render"},{"id":"w6sohggHCdCI0mEV","label":"git","url":"https://github.com/"},{"id":"fSOsHheEhENPNDzR","label":"w.alpha","url":"https://www.wolframalpha.com/"}]},{"id":"SdlIRWkKrDFogR2U","label":"mail","bookmarks":[{"id":"4VYhrkuyYHV4cpL8","label":"gmail","url":"https://mail.google.com/mail/u/0/#inbox"},{"id":"1jctHKaoTd3rjpTT","label":"proton","url":"https://mail.proton.me/u/0/inbox"},{"id":"HmQEdKg8JjkoF2oB","label":"cock.li","url":"https://mail.cock.li/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
