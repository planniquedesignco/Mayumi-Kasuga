(()=>{const db=window.Mayumi?.db;if(!db)return;const s=db.settings||{};const entry=document.getElementById('entry');if(entry){const bg=document.getElementById('entryBg');bg.style.backgroundImage="none";document.getElementById('entryTitle').innerHTML=(s.heroTitle||'MAYUMI KASUGA').replace(/ /,'<br><i>')+'</i>';document.getElementById('entrySub').textContent=s.introSubtitle||'';const close=()=>{if(entry.classList.contains('cinematic-exit'))return;sessionStorage.setItem('mayumi_entered','1');entry.classList.add('cinematic-exit');document.body.classList.add('mayumi-opening');const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;setTimeout(()=>{entry.remove();document.body.classList.remove('intro-open');},reduced?200:1750);setTimeout(()=>document.body.classList.remove('mayumi-opening'),reduced?250:2050)};if(sessionStorage.getItem('mayumi_entered'))entry.remove();else{document.body.classList.add('intro-open');document.getElementById('enterSite').onclick=()=>{window.mayumiEntranceAudio?.play().catch(()=>{});close()};/* Entrance remains until visitor explicitly selects Enter */}}const hero=document.querySelector('.hero');if(hero&&s.heroImage){hero.style.backgroundImage=`linear-gradient(90deg,rgba(24,8,31,.83) 0%,rgba(24,8,31,.3) 75%),url("${s.heroImage}")`;hero.style.backgroundSize='cover';hero.style.backgroundPosition='center'}document.querySelectorAll('.hero .wrap h1').forEach(el=>el.innerHTML=(s.heroTitle||'MAYUMI KASUGA').replace(' ','<br><em>')+'</em>');document.querySelectorAll('.hero .wrap p').forEach(el=>el.textContent=s.heroText||el.textContent);document.querySelectorAll('a[href=""],a[href="#"]').forEach(a=>a.removeAttribute('href'));})();
;(()=>{
 const entry=document.getElementById('entry'); if(!entry)return;
 const db=window.Mayumi?.db; if(!db)return;
 const track=db.tracks?.find(t=>String(t.id)===String(db.settings?.entranceTrack));
 const raw=track?.audio||'assets/preview-one.wav';
 const isYoutube=/youtu\.be|youtube\.com/i.test(raw);
 const source=isYoutube?'assets/preview-one.wav':window.Mayumi.asset(raw);
 const audio=new Audio(source);audio.loop=true;audio.preload='auto';audio.volume=.35;
 window.mayumiEntranceAudio=audio;
 const btn=document.getElementById('entrySound');
 function sync(){if(btn){btn.textContent=audio.paused?'♫  PLAY MUSIC':'♫  PAUSE MUSIC';btn.setAttribute('aria-pressed',String(!audio.paused));}}
 async function toggle(e){e?.stopPropagation();try{if(audio.paused)await audio.play();else audio.pause();}catch(err){if(btn)btn.textContent='♫  TAP TO PLAY';}sync();}
 btn?.addEventListener('click',toggle);
 audio.addEventListener('play',sync);audio.addEventListener('pause',sync);
 if(sessionStorage.getItem('mayumi_entered')){audio.pause();return;}
 // Browser policies may block sound until the first user gesture.
 audio.play().catch(()=>{if(btn)btn.textContent='♫  PLAY MUSIC';});
 entry.addEventListener('pointerdown',e=>{if(e.target.closest('#enterSite,#entrySound'))return;if(audio.paused)audio.play().catch(()=>{});},{once:true});
 const enter=document.getElementById('enterSite');enter?.addEventListener('click',()=>audio.pause());
 window.addEventListener('pagehide',()=>audio.pause());
})();
