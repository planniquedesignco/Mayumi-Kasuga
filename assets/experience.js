(()=>{const db=window.Mayumi?.db;if(!db)return;const s=db.settings||{};const entry=document.getElementById('entry');if(entry){const bg=document.getElementById('entryBg');bg.style.backgroundImage="none";const videoUrl=s.introVideo||'';if(videoUrl){let id=window.MayumiMedia?.ytId(videoUrl);let video;if(id){video=document.createElement('iframe');video.src='https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&mute=1&controls=0&loop=1&playlist='+id+'&playsinline=1&rel=0';video.allow='autoplay; encrypted-media';video.tabIndex=-1;}else if(/^https:\/\//i.test(videoUrl)&&/\.(mp4|webm)(?:[?#]|$)/i.test(videoUrl)){video=document.createElement('video');video.src=videoUrl;video.autoplay=true;video.muted=true;video.loop=true;video.playsInline=true;}if(video){video.className='mayumi-intro-video';video.setAttribute('aria-hidden','true');entry.insertBefore(video,entry.firstChild);}}document.getElementById('entryTitle').innerHTML=(s.heroTitle||'MAYUMI KASUGA').replace(/ /,'<br><i>')+'</i>';document.getElementById('entrySub').textContent=s.introSubtitle||'';const close=()=>{if(entry.classList.contains('cinematic-exit'))return;sessionStorage.setItem('mayumi_entered','1');entry.classList.add('cinematic-exit');document.body.classList.add('mayumi-opening');const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;setTimeout(()=>{entry.remove();document.body.classList.remove('intro-open');},reduced?200:1750);setTimeout(()=>document.body.classList.remove('mayumi-opening'),reduced?250:2050)};if(sessionStorage.getItem('mayumi_entered'))entry.remove();else{document.body.classList.add('intro-open');document.getElementById('enterSite').onclick=()=>{window.mayumiEntranceAudio?.play().catch(()=>{});close()};/* Entrance remains until visitor explicitly selects Enter */}}const hero=document.querySelector('.hero');if(hero&&s.heroImage){hero.style.backgroundImage=`linear-gradient(90deg,rgba(24,8,31,.83) 0%,rgba(24,8,31,.3) 75%),url("${s.heroImage}")`;hero.style.backgroundSize='cover';hero.style.backgroundPosition='center'}document.querySelectorAll('.hero .wrap h1').forEach(el=>el.innerHTML=(s.heroTitle||'MAYUMI KASUGA').replace(' ','<br><em>')+'</em>');document.querySelectorAll('.hero .wrap p').forEach(el=>el.textContent=s.heroText||el.textContent);document.querySelectorAll('a[href=""],a[href="#"]').forEach(a=>a.removeAttribute('href'));})();
;(()=>{
 const entry=document.getElementById('entry'); if(!entry)return;
 const db=window.Mayumi?.db; if(!db)return;
 const track=db.tracks?.find(t=>String(t.id)===String(db.settings?.entranceTrack));
 const raw=db.settings?.entranceAudioUrl||track?.audio||'assets/preview-one.wav';
 const isYoutube=/youtu\.be|youtube\.com/i.test(raw);
 const source=isYoutube?'':window.Mayumi.asset(raw);
 const audio=new Audio(source);audio.loop=true;audio.preload='auto';audio.volume=.35;
 window.mayumiEntranceAudio=audio;
 const btn=document.getElementById('entrySound');
 function sync(){if(btn){btn.textContent=audio.paused?'♫  PLAY MUSIC':'♫  PAUSE MUSIC';btn.setAttribute('aria-pressed',String(!audio.paused));}}
 async function toggle(e){e?.stopPropagation();try{if(audio.paused){if(isYoutube){window.open(raw,'_blank','noopener');return;}if(!source&&db.settings?.entranceSpotify){window.open(db.settings.entranceSpotify,'_blank','noopener');return;}await audio.play()}else audio.pause();}catch(err){if(btn)btn.textContent='♫  TAP TO PLAY';}sync();}
 btn?.addEventListener('click',toggle);
 audio.addEventListener('play',sync);audio.addEventListener('pause',sync);
 if(sessionStorage.getItem('mayumi_entered')){audio.pause();return;}
 // Browser policies may block sound until the first user gesture.
 if(source)audio.play().catch(()=>{if(btn)btn.textContent='♫  PLAY MUSIC';});
 entry.addEventListener('pointerdown',e=>{if(e.target.closest('#enterSite,#entrySound'))return;if(audio.paused&&source)audio.play().catch(()=>{});},{once:true});
 const enter=document.getElementById('enterSite');enter?.addEventListener('click',()=>audio.pause());
 window.addEventListener('pagehide',()=>audio.pause());
})();
