# DMM英会話 レッスンガチャ

今から予約できる直近の講師一覧をワンクリックで開くツール。  
**ブックマークレット**と**PWAリダイレクト**の2種類を収録。

## 仕組み

- DMM英会話は15分前まで予約可能、スロットは30分刻み
- 現在時刻 + 15分 を30分刻みに切り上げた `start_time` を自動計算
- DMM英会話の講師検索URLを生成して遷移するだけ

---

## 1. ブックマークレット（`bookmarklet.js`）

### 使い方

1. Chromeのブックマークを新規作成
2. URLに `bookmarklet.js` の内容を貼り付けて保存
3. DMM英会話を開いた状態でブックマークをクリック

> ⚠️ PWAウィンドウ（スタンドアロンモード）では動作しません

---

## 2. PWAリダイレクト（`index.html`）

Dockのアイコンをクリックするだけで即座にDMM英会話の検索結果へ遷移するPWA。  
ブックマークレットが使えないPWA環境向けの代替手段。

### ファイル構成

```
index.html      ← 開いた瞬間にリダイレクト
manifest.json   ← PWA設定
sw.js           ← Service Worker（PWA化に必要）
icon192.png
icon512.png
```

### インストール手順

1. GitHub Pagesを有効化（Settings → Pages → main branch）
2. `https://keikmobile.github.io/dmmenglish/` をChromeで開く
3. アドレスバーのインストールアイコン、またはメニュー →「アプリをインストール」
4. macOSのDockに追加される

### 動作

Dockのアイコンをクリック → 即座にDMM英会話の講師検索結果へ遷移

### Service Worker（`sw.js`）について

PWAとしてインストール可能にするためにService Workerが必要。`index.html` のロード時に自動で登録される。

動作は3段階。初回アクセス時（install）にHTML・manifest・アイコンをブラウザにキャッシュする。更新時（activate）には古いキャッシュを削除して新しいバージョンに切り替える。以降のアクセス（fetch）ではキャッシュがあればそこから返し、なければネットワークへ取りに行く。

今回のアプリは即リダイレクトするだけなので、オフライン動作の実益はほぼない。Service WorkerはPWAインストール要件を満たすための役割がメイン。

> DevToolsで確認: Application → Service Workers → `activated` と表示されれば正常

---

## 開発メモ

- テンプレートリテラルはコピペで文字化けするため文字列結合を使用
- Chromeコンソールでの段階的デバッグで動作確認
- PWAスタンドアロンでは `chrome.action.onClicked` が発火しないため、リダイレクトページで対応
- `location.replace()` を使用することで、ブラウザ履歴に中間ページを残さない
