// インターネット時報

import getjst from '../getjst/getjst'
import TimesignalVoiceSet from './tsv'
import tsvGoogle from './tsv_google_jp'
import tsvYukkuri from './tsv_yukkuri_jp'
import tsvZunda from './tsv_zunda_jp'

// 時報設定
export interface timesignalOptions {
  b24Hour: boolean;  // 24時間制（falseで12時間制）
	bSummerTime: boolean;  // サマータイム制（4〜10月は1時間進める）
  bMute: boolean;  // ミュート
	bStop: boolean;  // 時刻表示停止（＝コールバック呼ばない）
  nVoice: number;  // 0：Google、1：ゆっくり、2：ずんだもん
	nVolume: number;  // 音量 0〜100
	nInterval: number;  // インターバル（ms） 10ms付近推奨
}

// コールバック関数の型
type callback = (strTime: string) => void;

// インターネット時報
export default class Timesignal {
	constructor(mountpoint: HTMLDivElement, options: timesignalOptions, callback: callback) {
		// チック
		this._tick.src = './sound/tick.opus';
		this._tick.preload = 'auto';
		mountpoint.appendChild(this._tick);
		// チック2
		this._tick2.src = './sound/tick_2.opus';
		this._tick2.preload = 'auto';
		mountpoint.appendChild(this._tick2);
		// チャイム
		this._chime.src = './sound/chime.opus';
		this._chime.preload = 'auto';
		mountpoint.appendChild(this._chime);

		// 音声エレメントを書き出す
		for(const voiceSets of this._voiceSets) {
			for(const el of voiceSets.voiceEls) {
				mountpoint.appendChild(el);
			}
		}

    // 時刻文字列を出力するコールバック関数を格納
		this._callback = callback;

		// オプションを格納
		this.options = options;

    // getjstクラスを初期化
		this._getjst = new getjst();

    // インターバル開始
		this._interval();
	}

	// インターバル
	private _interval() {
		// 補正済み時刻を取得
		const date = this._getjst.getDate()
    let mstime = date.getTime();
		if(this._options.bSummerTime) {
			const m = date.getMonth()
			// 4月〜10月はサマータイム
			if(m >= 3 && m <= 9) {
				mstime += 3600000;
			}
		}

		// チック時間がすぎればチック＆チャイムを鳴らす
		if(mstime >= this._nexttick) {
			let s = date.getSeconds();
			// チック
			switch(s) {
				case 57:
				case 58:
				case 59:
					this._playel(this._tick2);
					break;
				default:
					this._playel(this._tick);
					break;
			}
			// チャイム
			if(s % 10 === 0) {
        this._playel(this._chime);
			}

			// 次回のチックは1秒後にセット
      this._nexttick = Math.floor(mstime / 1000) * 1000 + 1000;
		}

		// コール時間がすぎればコールを鳴らす
		if(mstime >= this._nextcall) {
			const ts = this;
			var calldate = new Date();
			calldate.setTime(Math.floor(mstime / 10000) * 10000 + 10000);
			const seq = this._voiceSets[this._options.nVoice].getSequence(calldate);
			this._seq = [];
			for(let i = 0; i < seq.length; i++) {
				const el = <HTMLAudioElement>document.createElement('audio');
				el.src = seq[i].src;
				this._seq.push(el);
				this._seq[i].pause();
				if(i < seq.length - 1) {
					this._seq[i].onended = function () {
						ts._playel(ts._seq[i + 1]);
					}
  			}
  		}
			this._playel(this._seq[0]);

			// 次回のコールは10秒後にセット
      this._nextcall = Math.floor(mstime / 10000) * 10000 + 11500;
		}
		
		// 停止中でなければコールバックを呼ぶ
		if(!this._options.bStop) {
			let h = date.getHours();
			let hours = '';
			if(!this._options.b24Hour) {
				if(h < 12) {
					hours = 'AM ' + date.getHours().toString().padStart(2, '0');
				} else {
					hours = 'PM ' + (date.getHours() - 12).toString().padStart(2, '0');
				}
			}
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
			this._callback(`${hours}:${minutes}:${seconds}.${milliseconds}`);
		}

		// 次回のインターバル
		setTimeout(() => {
			this._interval();
		}, this._options.nInterval);
	}

	private _playel(audio: HTMLAudioElement): void {
		if(!this._options.bMute) {
			audio.volume = this._options.nVolume / 100.0;
			audio.play();
		}
	}

  set options(options: timesignalOptions) {
		this._options = options;
		this._tick.volume = options.nVolume / 100.0;
		this._tick2.volume = options.nVolume / 100.0;
		this._chime.volume = options.nVolume / 100.0;
		for(const voiceSet of this._voiceSets) {
			voiceSet.settings = {
				b24Hour: this._options.b24Hour,
				bMute: this._options.bMute,
				nVolume: this._options.nVolume
			}
		}
	}

	private _options: timesignalOptions = {
		b24Hour: false,
		bSummerTime: false,
		bMute: false,
		bStop: false,
		nVoice: 0,
		nVolume: 100,
		nInterval: 9
	};
	private _voiceSets: TimesignalVoiceSet[] = [
		new tsvGoogle(),
		new tsvYukkuri(),
		new tsvZunda()
	];

	private _tick: HTMLAudioElement = <HTMLAudioElement>document.createElement('audio');
	private _tick2: HTMLAudioElement = <HTMLAudioElement>document.createElement('audio');
	private _chime: HTMLAudioElement = <HTMLAudioElement>document.createElement('audio');

	private _nexttick = 0;
	private _nextcall = 0;

	private _seq: HTMLAudioElement[] = [];

	private _getjst: getjst;
	private _callback: callback;
}
