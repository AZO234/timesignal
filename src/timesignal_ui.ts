// インターネット時報 UI

import Timesignal, { timesignalOptions } from './timesignal/timesignal'

// インターネット時報
let timesignal: Timesignal | null = null;

document.addEventListener('DOMContentLoaded', function () {
  const chk24Hour = <HTMLInputElement>document.getElementById('chk24Hour');
  const chkMute = <HTMLInputElement>document.getElementById('chkMute');
  const chkStop = <HTMLInputElement>document.getElementById('chkStop');
  const rngVolume = <HTMLInputElement>document.getElementById('rngVolume');
  const txtVolume = <HTMLInputElement>document.getElementById('txtVolume');
  const rdoGoogle = <HTMLInputElement>document.getElementById('rdoGoogle');
  const rdoYukkuri = <HTMLInputElement>document.getElementById('rdoYukkuri');
  const rdoZunda = <HTMLInputElement>document.getElementById('rdoZunda');

	const edtDisplayTime = <HTMLInputElement>document.getElementById('display_time');
  const divAudios = <HTMLDivElement>document.getElementById('audios');

  // パラメータ＆初期設定
	const options: timesignalOptions = {
		b24Hour: false,
		bSummerTime: false,
		bMute: false,
		bStop: false,
		nVoice: 0,
		nVolume: 100,
		nInterval: 9
	};
	const param = new Map();
	const pair = location.search.substring(1).split('&');
	for(let i = 0; i < pair.length; i++) {
		const keyval = pair[i].split('=');
		param.set(keyval[0], keyval[1]);
	}
  if(param.get("h") === "24") {
		chk24Hour.checked = true;
		options.b24Hour = true;
	} else {
		chk24Hour.checked = false;
  }
	if(param.get("m") === "1") {
		chkMute.checked = true;
		options.bMute = true;
	} else {
		chkMute.checked = false;
  }
  switch(Number(param.get("v"))) {
    case 1:
      rdoYukkuri.checked = true;
  		options.nVoice = 1;
      break;
    case 2:
      rdoZunda.checked = true;
  		options.nVoice = 2;
      break;
    default:
      rdoGoogle.checked = true;
      break;
  }
	let volume = Number(param.get("vol"));
	if(isNaN(volume)) {
		volume = 100;
	}
	if(volume < 0 || volume >= 100) {
		volume = 100;
  }
	rngVolume.value = volume.toString();
	txtVolume.value = volume.toString();
	options.nVolume = volume;

	// インターネット時報 初期化
  timesignal = new Timesignal(divAudios, options, (strTime) => {
		edtDisplayTime.value = strTime;
	});

	// イベントリスナ
  chk24Hour.addEventListener('click', function () {
		options.b24Hour = chk24Hour.checked;
		if(timesignal) {
			timesignal.options = options;
		}
  });
  chkMute.addEventListener('click', function () {
		options.bMute = chkMute.checked;
		if(timesignal) {
			timesignal.options = options;
		}
  });
  chkStop.addEventListener('click', function () {
		options.bStop = chkStop.checked;
		if(timesignal) {
			timesignal.options = options;
		}
  });
  rdoGoogle.addEventListener('click', function () {
		options.nVoice = 0;
		if(timesignal) {
			timesignal.options = options;
		}
  });
  rdoYukkuri.addEventListener('click', function () {
		options.nVoice = 1;
		if(timesignal) {
			timesignal.options = options;
		}
  });
  rdoZunda.addEventListener('click', function () {
		options.nVoice = 2;
		if(timesignal) {
			timesignal.options = options;
		}
  });
	rngVolume.addEventListener('change', function() {
		txtVolume.value = rngVolume.value;
		options.nVolume = Number(rngVolume.value);
		if(timesignal) {
			timesignal.options = options;
		}
	});
});
