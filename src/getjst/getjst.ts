/*****
日本標準時(JST)取得 getjst.php使用
Written by AZO

getjst.phpは、日本標準時(JST)を、
NICT(情報通信研究機構)が配信している
NTPによる時刻情報を取得し、
修正したサーバ時刻をJSON形式にて返答するAPIである。
URL: https://domisan.sakura.ne.jp/getjst.php

// getjst.cgiが返答するJSONデータ
{
  "result": int 0:失敗/1:成功、NTP取得にて時刻修正/2:成功、キャッシュにて時刻修正,
  "t2h": 32bit サーバ受信UNIX時刻 整数部,
  "t2l": 32bit サーバ受信UNIX時刻 小数部,
  "t3h": 32bit サーバ返信UNIX時刻 整数部,
  "t3l": 32bit サーバ返信UNIX時刻 小数部,
}

// 時刻補正方法
// t1 クライアント計測
// サーバ取得(t2, t3)
// t4 クライアント計測

// 時刻補正方法
delta = ((t2 + t3) - (t1 + t4)) / 2
fix_time = localtime + delta
*****/

// 日本標準時(JST)取得クラス
export default class getjst {
  constructor() {
    const gj = this;
    const t1 = (new Date()).getTime();
    fetch('https://domisan.sakura.ne.jp/getjst.php')
      .then((res) => {
        if(res.status === 200) {
          const t4 = (new Date()).getTime();
          res.json()
            .then((json) => {
              let t2l = json.t2l;
              let t3l = json.t3l;
              for(var i = 0; i < 32; i++) {
                t2l /= 2;
                t3l /= 2;
              }
              const t2 = (json.t2h + t2l) * 1000;
              const t3 = (json.t3h + t3l) * 1000;
              gj._delta = ((t2 + t3) - (t1 + t4)) / 2;
            });
        }
      });
  }

  // 時刻差異取得（ms、小数点以下含む）
  get delta() {
    return this._delta;
  }

  // 修正済み日時取得
  getDate(): Date {
    var dt = new Date();
    dt.setTime((new Date()).getTime() + Math.floor(this._delta));
    return dt;
  }

  private _delta: number = 0;
}
