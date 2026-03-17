    const text = document.getElementById('moving-text');
    let pos = window.innerWidth;

    function animateBanner() {
      pos -= 2; // speed
      if(pos < -text.offsetWidth) pos = window.innerWidth;
      text.style.transform = `translateX(${pos}px)`;
      requestAnimationFrame(animateBanner);
    }

    animateBanner();