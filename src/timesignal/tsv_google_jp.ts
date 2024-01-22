// 時報音声（Google 日本語）

import TimesignalVoiceSet from "./tsv";

export default class tsvGoogle extends TimesignalVoiceSet {
  constructor() {
    super();

    // 音声ファイル
    const fileHead = "./sound_google/google_ja_";
    const fileExt = ".opus";
    this._voiceFiles.push(fileHead + "choudo" + fileExt); // 0:ちょうど
    this._voiceFiles.push(fileHead + "juubyou" + fileExt); // 1:じゅうびょう
    this._voiceFiles.push(fileHead + "nijuubyou" + fileExt); // 2:にじゅうびょう
    this._voiceFiles.push(fileHead + "sanjuubyou" + fileExt); // 3:さんじゅうびょう
    this._voiceFiles.push(fileHead + "yonjuubyou" + fileExt); // 4:よんじゅうびょう
    this._voiceFiles.push(fileHead + "yonjuubyou" + fileExt); // 5:よんじゅうびょう
    this._voiceFiles.push(fileHead + "gojuubyou" + fileExt); // 6:ごじゅうびょう
    this._voiceFiles.push(fileHead + "ippun" + fileExt); // 7:いっぷん
    this._voiceFiles.push(fileHead + "nifun" + fileExt); // 8:にふん
    this._voiceFiles.push(fileHead + "sanpun" + fileExt); // 9:さんぷん
    this._voiceFiles.push(fileHead + "yonpun" + fileExt); // 10:よんぷん
    this._voiceFiles.push(fileHead + "gofun" + fileExt); // 11:ごふん
    this._voiceFiles.push(fileHead + "roppun" + fileExt); // 12:ろっぷん
    this._voiceFiles.push(fileHead + "nanafun" + fileExt); // 13:ななふん
    this._voiceFiles.push(fileHead + "happun" + fileExt); // 14:はっぷん
    this._voiceFiles.push(fileHead + "kyuufun" + fileExt); // 15:きゅうふん
    this._voiceFiles.push(fileHead + "juppun" + fileExt); // 16:じゅっぷん
    this._voiceFiles.push(fileHead + "nijuu" + fileExt); // 17:にじゅう
    this._voiceFiles.push(fileHead + "sanjuu" + fileExt); // 18:さんじゅう
    this._voiceFiles.push(fileHead + "yonjuu" + fileExt); // 19:よんじゅう
    this._voiceFiles.push(fileHead + "gojuu" + fileExt); // 20:ごじゅう
    this._voiceFiles.push(fileHead + "nijuppun" + fileExt); // 21:にじゅっぷん
    this._voiceFiles.push(fileHead + "sanjuppun" + fileExt); // 22:さんじゅっぷん
    this._voiceFiles.push(fileHead + "yonjuppun" + fileExt); // 23:よんじゅっぷん
    this._voiceFiles.push(fileHead + "gojuppun" + fileExt); // 24:ごじゅっぷん
    this._voiceFiles.push(fileHead + "reiji" + fileExt); // 25:れいじ
    this._voiceFiles.push(fileHead + "itiji" + fileExt); // 26:いちじ
    this._voiceFiles.push(fileHead + "niji" + fileExt); // 27:にじ
    this._voiceFiles.push(fileHead + "sanji" + fileExt); // 28:さんじ
    this._voiceFiles.push(fileHead + "yoji" + fileExt); // 29:よじ
    this._voiceFiles.push(fileHead + "goji" + fileExt); // 30:ごじ
    this._voiceFiles.push(fileHead + "rokuji" + fileExt); // 31:ろくじ
    this._voiceFiles.push(fileHead + "shitiji" + fileExt); // 32:しちじ
    this._voiceFiles.push(fileHead + "hatiji" + fileExt); // 33:はちじ
    this._voiceFiles.push(fileHead + "kuji" + fileExt); // 34:くじ
    this._voiceFiles.push(fileHead + "juuji" + fileExt); // 35:じゅうじ
    this._voiceFiles.push(fileHead + "nijuuji" + fileExt); // 36:にじゅうじ
    this._voiceFiles.push(fileHead + "nijuu" + fileExt); // 37:にじゅう
    this._voiceFiles.push(fileHead + "juu" + fileExt); // 38:じゅう
    this._voiceFiles.push(fileHead + "nijuu" + fileExt); // 39:にじゅう
    this._voiceFiles.push(fileHead + "sanjuu" + fileExt); // 40:さんじゅう
    this._voiceFiles.push(fileHead + "yonjuu" + fileExt); // 41:よんじゅう
    this._voiceFiles.push(fileHead + "gojuu" + fileExt); // 42:ごじゅう
    this._voiceFiles.push(fileHead + "ni" + fileExt); // 43:に
    this._voiceFiles.push(fileHead + "san" + fileExt); // 44:さん
    this._voiceFiles.push(fileHead + "yon" + fileExt); // 45:よん
    this._voiceFiles.push(fileHead + "go" + fileExt); // 46:ご
    this._voiceFiles.push(fileHead + "gozen" + fileExt); // 47:ごぜん
    this._voiceFiles.push(fileHead + "gogo" + fileExt); // 48:ごご
    this._voiceFiles.push(fileHead + "osirase" + fileExt); // 49:を、おしらせします

    // エレメント作成
    this.makeEls();
  }

  // 時刻からエレメント配列を取得
  public getSequence(time: Date): HTMLAudioElement[] {
    const res: HTMLAudioElement[] = [];

    let temp = 0;

    // 時
    temp = time.getHours();
    // 時間制が12時間の場合
    if (!this._settings.b24Hour) {
      // 12時より前の場合
      if (temp < 12) {
        // 「午前」を追加
        res.push(this._voiceEls[47]);
      } else {
        // 「午後」を追加
        res.push(this._voiceEls[48]);
        // 12時間減らす
        temp -= 12;
      }
    }
    // 10の桁
    // 21以上の場合
    if (temp >= 21) {
      // 「20（時）」を追加
      res.push(this._voiceEls[39]);
      // 20の場合
    } else if (temp === 20) {
      // 「20時」を追加
      res.push(this._voiceEls[36]);
      // 11以上19未満の場合
    } else if (temp >= 11 && temp <= 19) {
      // 「10」を追加
      res.push(this._voiceEls[38]);
      // 10の場合
    } else if (temp === 10) {
      // 「10時」を追加
      res.push(this._voiceEls[35]);
    }
    // 1の桁
    switch (temp % 10) {
      case 0:
        // 「0時」
        if (temp === 0) {
          res.push(this._voiceEls[25]);
        }
        break;
      case 1:
        // 「1時」
        res.push(this._voiceEls[26]);
        break;
      case 2:
        // 「2時」
        res.push(this._voiceEls[27]);
        break;
      case 3:
        // 「3時」
        res.push(this._voiceEls[28]);
        break;
      case 4:
        // 「4時」
        res.push(this._voiceEls[29]);
        break;
      case 5:
        // 「5時」
        res.push(this._voiceEls[30]);
        break;
      case 6:
        // 「6時」
        res.push(this._voiceEls[31]);
        break;
      case 7:
        // 「7時」
        res.push(this._voiceEls[32]);
        break;
      case 8:
        // 「8時」
        res.push(this._voiceEls[33]);
        break;
      case 9:
        // 「9時」
        res.push(this._voiceEls[34]);
        break;
    }

    // 分
    temp = time.getMinutes();
    // 10の桁
    switch (Math.floor(temp / 10)) {
      case 1:
        if (temp == 10) {
          // 「10分」
          res.push(this._voiceEls[16]);
        } else {
          // 「10」
          res.push(this._voiceEls[38]);
        }
        break;
      case 2:
        if (temp == 20) {
          // 「20分」
          res.push(this._voiceEls[21]);
        } else {
          // 「20」
          res.push(this._voiceEls[39]);
        }
        break;
      case 3:
        if (temp == 30) {
          // 「30分」
          res.push(this._voiceEls[22]);
        } else {
          // 「30」
          res.push(this._voiceEls[40]);
        }
        break;
      case 4:
        if (temp == 40) {
          // 「40分」
          res.push(this._voiceEls[23]);
        } else {
          // 「40」
          res.push(this._voiceEls[41]);
        }
        break;
      case 5:
        if (temp == 50) {
          // 「50分」
          res.push(this._voiceEls[24]);
        } else {
          // 「50」を追加
          res.push(this._voiceEls[42]);
        }
        break;
    }
    // 1の桁
    switch (temp % 10) {
      case 1:
        // 「1分」
        res.push(this._voiceEls[7]);
        break;
      case 2:
        // 「2分」
        res.push(this._voiceEls[8]);
        break;
      case 3:
        // 「3分」
        res.push(this._voiceEls[9]);
        break;
      case 4:
        // 「4分」
        res.push(this._voiceEls[10]);
        break;
      case 5:
        // 「5分」
        res.push(this._voiceEls[11]);
        break;
      case 6:
        // 「6分」
        res.push(this._voiceEls[12]);
        break;
      case 7:
        // 「7分」
        res.push(this._voiceEls[13]);
        break;
      case 8:
        // 「8分」
        res.push(this._voiceEls[14]);
        break;
      case 9:
        // 「9分」
        res.push(this._voiceEls[15]);
        break;
    }

    // 秒
    temp = time.getSeconds();
    // 10の桁
    switch (Math.floor(temp / 10)) {
      case 0:
        // 「丁度」
        res.push(this._voiceEls[0]);
        break;
      case 1:
        // 「10秒」
        res.push(this._voiceEls[1]);
        break;
      case 2:
        // 「20秒」
        res.push(this._voiceEls[2]);
        break;
      case 3:
        // 「30秒」を追加
        res.push(this._voiceEls[3]);
        break;
      case 4:
        // 「40秒」
        res.push(this._voiceEls[4]);
        break;
      case 5:
        // 「50秒」
        res.push(this._voiceEls[5]);
        break;
    }

    // 「を、お知らせします」
    res.push(this._voiceEls[49]);

    return res;
  }
}
