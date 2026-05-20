let currentIndex = -1;

function openImage(s) {
  document.getElementById('imageModal').classList.add('active');
  document.getElementById('fullImage').src = s;
}

function closeImage() {
  document.getElementById('imageModal').classList.remove('active');
}

function nextStep() {
  if (currentIndex < workflowData.length - 1) {
    currentIndex++;
    updateUI();
  }
}

function prevStep() {
  if (currentIndex >= 0) {
    currentIndex--;
    updateUI();
  }
}

function updateUI() {
  const fc = document.getElementById('flowContainer');
  const sl = document.getElementById('stepsList');
  const st = document.getElementById('statusList');
  const em = document.getElementById('emptyMsg');

  if (currentIndex === -1) {
    resetWorkflow();
    return;
  }

  if (em) em.style.display = 'none';
  fc.innerHTML = '';

  for (let i = 0; i <= currentIndex; i++) {
    const n = document.createElement('div');
    n.className = 'node-box ' + (i === currentIndex ? 'active' : '');
    n.innerText = workflowData[i].title;
    fc.appendChild(n);
    if (i < currentIndex) {
      const l = document.createElement('div');
      l.className = 'connector';
      fc.appendChild(l);
    }
  }

  sl.innerHTML = '';
  for (let i = 0; i <= currentIndex; i++) {
    const it = document.createElement('div');
    it.className = 'step-item';
    it.innerHTML = `<div class="step-dot" style="${i < currentIndex ? 'background:var(--primary)' : ''}"></div>
                    <div class="step-content">
                      <h4>${workflowData[i].title}</h4>
                      <p>${workflowData[i].desc}</p>
                    </div>`;
    sl.prepend(it);
  }

  st.innerHTML = '';
  const s = workflowData[currentIndex];
  const a = document.createElement('div');
  a.className = 'alert ' + (s.isError ? 'alert-error' : 'alert-success');
  a.innerHTML = `<i data-lucide="${s.isError ? 'alert-triangle' : 'check-circle'}" size="18"></i>
                 <div>
                   <strong style="display:block;font-size:.8rem">${s.isError ? 'تنبيه' : 'تم بنجاح'}</strong>
                   <span style="font-size:.75rem">${s.alert}</span>
                 </div>`;
  st.prepend(a);

  const an = fc.querySelector('.node-box.active');
  if (an) an.scrollIntoView({ behavior: 'smooth', block: 'center' });

  updateButtons();
  lucide.createIcons();
}

function resetWorkflow() {
  currentIndex = -1;
  document.getElementById('flowContainer').innerHTML = `<div id="emptyMsg" style="margin:auto;text-align:center;color:var(--slate-400)">
                                                           <i data-lucide="play-circle" size="48" style="margin-bottom:10px"></i>
                                                           <p>جاهز لبدء المحاكاة</p>
                                                         </div>`;
  document.getElementById('stepsList').innerHTML = '';
  document.getElementById('statusList').innerHTML = '';
  updateButtons();
  lucide.createIcons();
}

function updateButtons() {
  document.getElementById('backBtn').disabled = currentIndex < 0;
  document.getElementById('nextBtn').disabled = currentIndex >= workflowData.length - 1;
}

let playInterval = null;
let isPlaying = false;

function playAllSteps() {
  // إذا كان التشغيل قيد التنفيذ، نوقف
  if (isPlaying) {
    stopPlayback();
    return;
  }

  // إذا كنا في البداية أو انتهينا من جميع الخطوات
  if (currentIndex === -1 || currentIndex >= workflowData.length - 1) {
    resetWorkflow();
    currentIndex = -1;
    nextStep(); // نبدأ أول خطوة فوراً
  }

  // نبدأ التشغيل التلقائي
  isPlaying = true;
  playInterval = setInterval(() => {
    if (currentIndex < workflowData.length - 1) {
      nextStep();
    } else {
      // انتهى العرض
      if (playInterval) {
        clearInterval(playInterval);
        playInterval = null;
      }
      isPlaying = false;
      changeStopButtonToPlay();
    }
  }, 3000);

  changePlayButtonToStop();
}

function stopPlayback() {
  if (playInterval) {
    clearInterval(playInterval);
    playInterval = null;
  }
  isPlaying = false;
  changeStopButtonToPlay();
}

function changePlayButtonToStop() {
  const playBtn = document.querySelector('.btn-playall');
  if (playBtn) {
    playBtn.innerHTML = '<i data-lucide="square" size="16"></i> إيقاف العرض';
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
}

function changeStopButtonToPlay() {
  const playBtn = document.querySelector('.btn-playall');
  if (playBtn) {
    playBtn.innerHTML = '<i data-lucide="play" size="16"></i> تشغيل الكل';
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
}
