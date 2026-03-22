// sw.js (Service Worker)
const CACHE_NAME = 'timesignal-v1';

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/icons/clock.png',
  '/icons/clock16.ico',
  '/icons/clock16.png',
  '/icons/clock32.ico',
  '/icons/clock32.png',
  '/icons/clock48.png',
  '/icons/clock128.png',
  '/sound/chime.opus',
  '/sound/tick.opus',
  '/sound/tick2.opus',
  '/sound_google/google_ja_ato.opus',
  '/sound_google/google_ja_choudo.opus',
  '/sound_google/google_ja_go.opus',
  '/sound_google/google_ja_gofun.opus',
  '/sound_google/google_ja_gogo.opus',
  '/sound_google/google_ja_goji.opus',
  '/sound_google/google_ja_gojuppun.opus',
  '/sound_google/google_ja_gojuu.opus',
  '/sound_google/google_ja_gojuubyou.opus',
  '/sound_google/google_ja_gozen.opus',
  '/sound_google/google_ja_happun.opus',
  '/sound_google/google_ja_hatiji.opus',
  '/sound_google/google_ja_ippun.opus',
  '/sound_google/google_ja_itiji.opus',
  '/sound_google/google_ja_juppun.opus',
  '/sound_google/google_ja_juu.opus',
  '/sound_google/google_ja_juubyou.opus',
  '/sound_google/google_ja_juuji.opus',
  '/sound_google/google_ja_kuji.opus',
  '/sound_google/google_ja_kyuufun.opus',
  '/sound_google/google_ja_nanafun.opus',
  '/sound_google/google_ja_ni.opus',
  '/sound_google/google_ja_nifun.opus',
  '/sound_google/google_ja_niji.opus',
  '/sound_google/google_ja_nijuppun.opus',
  '/sound_google/google_ja_nijuu.opus',
  '/sound_google/google_ja_nijuu_ji.opus',
  '/sound_google/google_ja_nijuubyou.opus',
  '/sound_google/google_ja_nijuuji.opus',
  '/sound_google/google_ja_osirase.opus',
  '/sound_google/google_ja_reiji.opus',
  '/sound_google/google_ja_rokuji.opus',
  '/sound_google/google_ja_roppun.opus',
  '/sound_google/google_ja_san.opus',
  '/sound_google/google_ja_sanji.opus',
  '/sound_google/google_ja_sanjuppun.opus',
  '/sound_google/google_ja_sanjuu.opus',
  '/sound_google/google_ja_sanjuubyou.opus',
  '/sound_google/google_ja_sanpun.opus',
  '/sound_google/google_ja_sitiji.opus',
  '/sound_google/google_ja_yoji.opus',
  '/sound_google/google_ja_yon.opus',
  '/sound_google/google_ja_yonjuppun.opus',
  '/sound_google/google_ja_yonjuu.opus',
  '/sound_google/google_ja_yonjuubyou.opus',
  '/sound_google/google_ja_yonpun.opus',
  '/sound_yukkuri/yukkuri_ja_0.opus',
  '/sound_yukkuri/yukkuri_ja_1.opus',
  '/sound_yukkuri/yukkuri_ja_1_2.opus',
  '/sound_yukkuri/yukkuri_ja_2.opus',
  '/sound_yukkuri/yukkuri_ja_3.opus',
  '/sound_yukkuri/yukkuri_ja_4.opus',
  '/sound_yukkuri/yukkuri_ja_4_2.opus',
  '/sound_yukkuri/yukkuri_ja_5.opus',
  '/sound_yukkuri/yukkuri_ja_6.opus',
  '/sound_yukkuri/yukkuri_ja_6_2.opus',
  '/sound_yukkuri/yukkuri_ja_7.opus',
  '/sound_yukkuri/yukkuri_ja_7_2.opus',
  '/sound_yukkuri/yukkuri_ja_8.opus',
  '/sound_yukkuri/yukkuri_ja_9.opus',
  '/sound_yukkuri/yukkuri_ja_9_2.opus',
  '/sound_yukkuri/yukkuri_ja_10.opus',
  '/sound_yukkuri/yukkuri_ja_afternoon.opus',
  '/sound_yukkuri/yukkuri_ja_hour.opus',
  '/sound_yukkuri/yukkuri_ja_just.opus',
  '/sound_yukkuri/yukkuri_ja_min.opus',
  '/sound_yukkuri/yukkuri_ja_min_2.opus',
  '/sound_yukkuri/yukkuri_ja_morning.opus',
  '/sound_yukkuri/yukkuri_ja_sec.opus',
  '/sound_yukkuri/yukkuri_ja_signal.opus',
  '/sound_zunda/zunda_ja_choudo.opus',
  '/sound_zunda/zunda_ja_gofun.opus',
  '/sound_zunda/zunda_ja_gogo.opus',
  '/sound_zunda/zunda_ja_goji.opus',
  '/sound_zunda/zunda_ja_gojuppun.opus',
  '/sound_zunda/zunda_ja_gojuu.opus',
  '/sound_zunda/zunda_ja_gojuubyou.opus',
  '/sound_zunda/zunda_ja_gozen.opus',
  '/sound_zunda/zunda_ja_hachiji.opus',
  '/sound_zunda/zunda_ja_happun.opus',
  '/sound_zunda/zunda_ja_ichiji.opus',
  '/sound_zunda/zunda_ja_ippun.opus',
  '/sound_zunda/zunda_ja_juppun.opus',
  '/sound_zunda/zunda_ja_juu.opus',
  '/sound_zunda/zunda_ja_juubyou.opus',
  '/sound_zunda/zunda_ja_juuichiji.opus',
  '/sound_zunda/zunda_ja_juuji.opus',
  '/sound_zunda/zunda_ja_kuji.opus',
  '/sound_zunda/zunda_ja_kyuufun.opus',
  '/sound_zunda/zunda_ja_nanafun.opus',
  '/sound_zunda/zunda_ja_nifun.opus',
  '/sound_zunda/zunda_ja_niji.opus',
  '/sound_zunda/zunda_ja_nijuppun.opus',
  '/sound_zunda/zunda_ja_nijuu.opus',
  '/sound_zunda/zunda_ja_nijuubyou.opus',
  '/sound_zunda/zunda_ja_nijuuji.opus',
  '/sound_zunda/zunda_ja_reiji.opus',
  '/sound_zunda/zunda_ja_rokuji.opus',
  '/sound_zunda/zunda_ja_roppun.opus',
  '/sound_zunda/zunda_ja_sanji.opus',
  '/sound_zunda/zunda_ja_sanjuppun.opus',
  '/sound_zunda/zunda_ja_sanjuu.opus',
  '/sound_zunda/zunda_ja_sanjuubyou.opus',
  '/sound_zunda/zunda_ja_sanpun.opus',
  '/sound_zunda/zunda_ja_shitiji.opus',
  '/sound_zunda/zunda_ja_signal.opus',
  '/sound_zunda/zunda_ja_yoji.opus',
  '/sound_zunda/zunda_ja_yonjuppun.opus',
  '/sound_zunda/zunda_ja_yonjuu.opus',
  '/sound_zunda/zunda_ja_yonjuubyou.opus',
  '/sound_zunda/zunda_ja_yonpun.opus',
];

// インストール時に全部まとめてキャッシュ
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// フェッチ時はキャッシュ優先、なければネットワーク
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
  );
});

// 古いキャッシュを削除
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys
        .filter(k => k !== CACHE_NAME)
        .map(k => caches.delete(k))
      )
    )
  );
});