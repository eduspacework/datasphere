// Navbar background on scroll
    const nav = document.querySelector('.navbar');
    const onScroll = () => {
      if (window.scrollY > 10) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    document.addEventListener('scroll', onScroll);
    onScroll();

    // Year
    document.getElementById('year').textContent = new Date().getFullYear();



