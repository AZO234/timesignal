// 時報音声（ゆっくり 日本語）

import TimesignalVoiceSet from "./tsv";

export default class tsvYukkuri extends TimesignalVoiceSet {
  constructor() {
    super();

    // 音声ファイル
    const fileHead = "/sound_yukkuri/yukkuri_ja_";
    const fileExt = ".opus";
    this._voiceFiles.push(fileHead + "0" + fileExt); // 0:れい
    this._voiceFiles.push(fileHead + "1" + fileExt); // 1:いち
    this._voiceFiles.push(fileHead + "2" + fileExt); // 2:に
    this._voiceFiles.push(fileHead + "3" + fileExt); // 3:さん
    this._voiceFiles.push(fileHead + "4" + fileExt); // 4:よん
    this._voiceFiles.push(fileHead + "5" + fileExt); // 5:ご
    this._voiceFiles.push(fileHead + "6" + fileExt); // 6:ろく
    this._voiceFiles.push(fileHead + "7" + fileExt); // 7:なな
    this._voiceFiles.push(fileHead + "8" + fileExt); // 8:はち
    this._voiceFiles.push(fileHead + "9" + fileExt); // 9:きゅう
    this._voiceFiles.push(fileHead + "10" + fileExt); // 10:じゅう
    this._voiceFiles.push(fileHead + "1_2" + fileExt); // 11:いっ
    this._voiceFiles.push(fileHead + "6_2" + fileExt); // 12:ろっ
    this._voiceFiles.push(fileHead + "4_2" + fileExt); // 13:よ
    this._voiceFiles.push(fileHead + "7_2" + fileExt); // 14:しち
    this._voiceFiles.push(fileHead + "9_2" + fileExt); // 15:く
    this._voiceFiles.push(fileHead + "sec" + fileExt); // 16:びょう
    this._voiceFiles.push(fileHead + "min" + fileExt); // 17:ふん
    this._voiceFiles.push(fileHead + "min_2" + fileExt); // 18:ぷん
    this._voiceFiles.push(fileHead + "hour" + fileExt); // 19:じ
    this._voiceFiles.push(fileHead + "morning" + fileExt); // 20:ごぜん
    this._voiceFiles.push(fileHead + "afternoon" + fileExt); // 21:ごご
    this._voiceFiles.push(fileHead + "just" + fileExt); // 22:ちょうど
    this._voiceFiles.push(fileHead + "signal" + fileExt); // 23:を、おしらせします

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
        res.push(this._voiceEls[20]);
      } else {
        // 「午後」を追加
        res.push(this._voiceEls[21]);
        // 12時間減らす
        temp -= 12;
      }
    }
    // 10の桁
    // 20以上の場合
    if (temp >= 20) {
      // 「2」を追加
      res.push(this._voiceEls[2]);
      // 「10」を追加
      res.push(this._voiceEls[10]);
      // 10以上19未満の場合
    } else if (temp >= 10 && temp <= 19) {
      // 「10」を追加
      res.push(this._voiceEls[10]);
    }
    // 1の桁
    switch (temp % 10) {
      case 0:
        // 「0」
        if (temp === 0) {
          res.push(this._voiceEls[0]);
        }
        break;
      case 1:
        // 「1」
        res.push(this._voiceEls[1]);
        break;
      case 2:
        // 「2」
        res.push(this._voiceEls[2]);
        break;
      case 3:
        // 「3」
        res.push(this._voiceEls[3]);
        break;
      case 4:
        // 「よ」
        res.push(this._voiceEls[13]);
        break;
      case 5:
        // 「5」
        res.push(this._voiceEls[5]);
        break;
      case 6:
        // 「6」
        res.push(this._voiceEls[6]);
        break;
      case 7:
        // 「しち」
        res.push(this._voiceEls[14]);
        break;
      case 8:
        // 「8」
        res.push(this._voiceEls[8]);
        break;
      case 9:
        // 「く」
        res.push(this._voiceEls[15]);
        break;
    }
    // 「時」
    res.push(this._voiceEls[19]);

    // 分
    temp = time.getMinutes();
    // 10の桁
    switch (Math.floor(temp / 10)) {
      case 1:
        // 「10」
        res.push(this._voiceEls[10]);
        break;
      case 2:
        // 「2」
        res.push(this._voiceEls[2]);
        // 「10」
        res.push(this._voiceEls[10]);
        break;
      case 3:
        // 「3」
        res.push(this._voiceEls[3]);
        // 「10」
        res.push(this._voiceEls[10]);
        break;
      case 4:
        // 「4」
        res.push(this._voiceEls[4]);
        // 「10」
        res.push(this._voiceEls[10]);
        break;
      case 5:
        // 「5」
        res.push(this._voiceEls[5]);
        // 「10」
        res.push(this._voiceEls[10]);
        break;
    }
    // 1の桁
    switch (temp % 10) {
      case 0:
        if(temp !== 0) {
          // 「ぷん」
          res.push(this._voiceEls[18]);
        }
        break;
      case 1:
        // 「いっ」
        res.push(this._voiceEls[11]);
        // 「ぷん」
        res.push(this._voiceEls[18]);
        break;
      case 2:
        // 「2」
        res.push(this._voiceEls[2]);
        // 「ふん」
        res.push(this._voiceEls[17]);
        break;
      case 3:
        // 「3」
        res.push(this._voiceEls[2]);
        // 「ぷん」
        res.push(this._voiceEls[18]);
        break;
      case 4:
        // 「4」
        res.push(this._voiceEls[4]);
        // 「ふん」
        res.push(this._voiceEls[17]);
        break;
      case 5:
        // 「5」
        res.push(this._voiceEls[5]);
        // 「ふん」
        res.push(this._voiceEls[17]);
        break;
      case 6:
        // 「ろっ」
        res.push(this._voiceEls[12]);
        // 「ぷん」
        res.push(this._voiceEls[18]);
        break;
      case 7:
        // 「7」
        res.push(this._voiceEls[7]);
        // 「ふん」
        res.push(this._voiceEls[17]);
        break;
      case 8:
        // 「8」
        res.push(this._voiceEls[8]);
        // 「ふん」
        res.push(this._voiceEls[17]);
        break;
      case 9:
        // 「9」
        res.push(this._voiceEls[9]);
        // 「ふん」
        res.push(this._voiceEls[17]);
        break;
    }

    // 秒
    temp = time.getSeconds();
    // 10の桁
    switch (Math.floor(temp / 10)) {
      case 0:
        // 「丁度」
        res.push(this._voiceEls[22]);
        break;
      case 1:
        // 「10」
        res.push(this._voiceEls[10]);
        // 「秒」
        res.push(this._voiceEls[16]);
        break;
      case 2:
        // 「2」
        res.push(this._voiceEls[2]);
        // 「10」
        res.push(this._voiceEls[10]);
        // 「秒」
        res.push(this._voiceEls[16]);
        break;
      case 3:
        // 「3」
        res.push(this._voiceEls[3]);
        // 「10」
        res.push(this._voiceEls[10]);
        // 「秒」
        res.push(this._voiceEls[16]);
        break;
      case 4:
        // 「4」
        res.push(this._voiceEls[4]);
        // 「10」
        res.push(this._voiceEls[10]);
        // 「秒」
        res.push(this._voiceEls[16]);
        break;
      case 5:
        // 「5」
        res.push(this._voiceEls[5]);
        // 「10」
        res.push(this._voiceEls[10]);
        // 「秒」
        res.push(this._voiceEls[16]);
        break;
    }

    // 「を、お知らせします」
    res.push(this._voiceEls[23]);

    return res;
  }
}
