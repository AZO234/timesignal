/*****
日本標準時(JST)取得 getjst.cgi使用
Written by AZO

getjst.cgiは、日本標準時(JST)を、
NICT(情報通信研究機構)が配信している
NTPによる時刻情報を取得し、
修正したサーバ時刻をJSON形式にて返答するAPIである。
URL: https://domisan.sakura.ne.jp/getjst.cgi

// getjst.cgiが返答するJSONデータ
{
  "result": int 0:失敗/1:成功、NTP取得にて時刻修正/2:成功、キャッシュにて時刻修正,
  "rth": 32bit 受信UNIX時刻 整数部,
  "rtl": 32bit 受信UNIX時刻 小数部,
  "tth": 32bit 送信UNIX時刻 整数部,
  "ttl": 32bit 送信UNIX時刻 小数部
},

// 時刻補正方法
lt1 ローカル側送信時刻
rt  サーバ側受信時刻
tt  サーバ側送信時刻
lt2 ローカル側受信時刻
delta ローカルの遅延 = ((rt + tt) - (lt1 + lt2)) / 2
fixlt = lt + delta
*****/

// 日本標準時(JST)取得クラス
export default class getjst {
  constructor() {
    const gj = this;
    const lt1 = (new Date()).getTime();
    fetch('https://domisan.sakura.ne.jp/getjst.cgi')
      .then((res) => {
        if(res.status === 200) {
          const lt2 = (new Date()).getTime();
          res.json()
            .then((json) => {
              let rtl = json.rtl;
              let ttl = json.ttl;
              for(var i = 0; i < 32; i++) {
                rtl /= 2;
                ttl /= 2;
              }
              const rth = (json.rth + rtl) * 1000;
              const tth = (json.tth + ttl) * 1000;
              gj._delta = ((rth + tth) - (lt1 + lt2)) / 2;
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
