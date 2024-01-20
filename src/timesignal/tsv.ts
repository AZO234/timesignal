// TimesignalVoiceSetクラス

export interface tvsSettings {
	b24Hour: boolean;
	bMute: boolean;
	nVolume: number;
}

export default abstract class TimesignalVoiceSet {
  constructor() {}

	// 音声ファイル配列からエレメント配列を作成
	protected makeEls(): void {
    for(const file of this._voiceFiles) {
			const el = <HTMLAudioElement>document.createElement('audio');
			el.src = file;
			el.preload = 'auto';
			this._voiceEls.push(el);
		}
	}

	// 時刻（ms）からエレメント配列を取得
	abstract getSequence(time: Date): HTMLAudioElement[]

  set settings(settings: tvsSettings) {
		this._settings = settings;
    for(const el of this._voiceEls) {
			el.volume = settings.nVolume / 100.0;
		}
	}
	get voiceEls(): HTMLAudioElement[] {
		return this._voiceEls;
	}

	protected _settings: tvsSettings = {
		b24Hour: false,
		bMute: false,
		nVolume: 100
	};
	protected _voiceEls: HTMLAudioElement[] = [];
	protected _voiceFiles: string[] = [];
}
