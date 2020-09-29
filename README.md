# react express template

## はじめに

自分用のテンプレートファイル群です。
自身の趣味もりもり

## 必要環境

- bash
- docker

## 使用ライブラリ (npm でインストールされる)

### 稼働に必要なもの

- react.js (UI components)
- express (http server)
- morgan (express logger)
- winston (logger)
- typeorm (orm)
- mysql (DB, use mariadb)

### 稼働には不要だが、開発やコンパイルにいるもの

- typescript
- webpack
- gulp
- jest
- stylus
- browser-sync

## import alias

`@/*` 系がサーバサイド、 `^/*` 系がフロントサイドになっている。
それぞれ分かているのは、双方のコードが混ざらないため。

## 初期状態での実行について

そのまま動かすと、とりあえずのサンプルページが出ます。
また、初期状態では docker 不使用での実行も可のですが、あくまでサンプル程度にしてください。
以下その場合の実行方法です。

```bash
npm i
npm run start:dev
```

実行後、以下のコマンドで作成したファイルを削除しておいたほうが、 docker 実行時にトラブルが少ないと思います。

```bash
rm -fv config.json
rm -rfv dist
rm -rfv gulpfile.js
rm -rfv node_modules
```

DB接続は `@/modeule/dbConnection.ts` で行えます。
Proxy を用いているのでわかりにくいですが、シングルトンのように使えるはずです。

## 実行

すべて `newgrp docker` 実行後を想定

### 初期設定

```bash
bash setup.sh
```

初期状態ではマイグレーションで失敗します。

### 開発実行

```bash
bash start.dev.sh
```

各ボートは以下のとおり
|port|   |
|----|---|
|3000|express 直つなぎ|
|3001|browser-sync 管理画面|
|4000|browser-sync 経由でのアプリ画面 (多分メインの開発環境)|

### 本番実行

今のところなし

## このテンプレートの問題点

- 設定ファイルがごちゃごちゃ
