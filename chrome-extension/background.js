/**
 * DMM英会話 今すぐ予約 - Chrome拡張
 * ブックマークレットからの移植版
 *
 * ロジック:
 *   現在時刻 + 15分 を計算し、分が30未満なら :30、30以上なら翌時 :00 にスナップ
 *   日付は now ベース（midnight をまたいでも today 固定）
 *   DMM英会話 /list/ エンドポイントへ遷移
 */

chrome.action.onClicked.addListener(() => {
  const url = buildSearchUrl();
  chrome.tabs.create({ url }, (tab) => {
    chrome.windows.update(tab.windowId, { focused: true });
  });
});

function buildSearchUrl() {
  const now = new Date();

  // 現在時刻 + 15分
  const target = new Date(now.getTime() + 15 * 60 * 1000);

  // 30分刻みにスナップ（ブックマークレットと同一ロジック）
  const m = target.getMinutes() < 30 ? 30 : 0;
  const h = m === 0 ? target.getHours() + 1 : target.getHours();
  const time = String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");

  // 日付は now ベース（ブックマークレットと同一）
  const today =
    now.getFullYear() +
    "-" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(now.getDate()).padStart(2, "0");

  // 対象国リスト（ブックマークレットと同一）
  const country =
    "40,104,78,64,65,112,118,177,5,91,1,139,72,175,49,56,43,39,149,28,35,211,70,24,16,21,50,53,4,22,138,32,27,85,97,52,3,14,31,12,93,80,103,94,105,90,101,86,38,214,36,83,79,124,132,136,88,29,10,106,98,77,158,140,37,133,18,209,61,120,205,63,108,134,123,100,44,131,95,47,159,156,62,157,6,117,57,81,197,192,128,23,17,60,178,142,59,166,111,174,115,116,107,113,121";

  // DMM英会話 /list/ エンドポイント（ブックマークレットと同一）
  const url =
    "https://eikaiwa.dmm.com/list/" +
    "?_from=dmme_ext" +
    "&data%5Btab1%5D%5Blesson_language%5D=en" +
    "&data%5Btab1%5D%5Bstart_time%5D=" + time +
    "&data%5Btab1%5D%5Bend_time%5D=" + time +
    "&data%5Btab1%5D%5Bstandard_teachers%5D=on" +
    "&data%5Btab1%5D%5Bcountry%5D=" + country +
    "&data%5Btab1%5D%5Bgender%5D=0" +
    "&data%5Btab1%5D%5Bage%5D=%E5%B9%B4%E9%BD%A2" +
    "&data%5Btab1%5D%5Bfree_word%5D=" +
    "&date=" + today;

  return url;
}
