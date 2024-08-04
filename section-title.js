window.onload = () => {
  let sectionTitle = document.getElementById('section-title');
  const sections = document.querySelectorAll('.accordion-item');
  const sectionsHeader = document.querySelectorAll('.accordion-button');
  
  let percentage = document.getElementById('percentage');
  let progress = 0;
  let myChart = null;
  
  const createChart = (completed, remaining) => {
    const ctx = document.getElementById('myChart').getContext('2d');

    if (myChart !== null) {
      myChart.destroy();
    }

    myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          label: '',    
          data: [completed, remaining],
          borderWidth: 0,
          backgroundColor: [
            'rgb(255, 255, 255)',
            'rgb(157, 157, 157)',
          ],
        }]
      },
      options: {
        cutout: 22,
        tooltips: {enabled: false},
        hover: {mode: null},
      }
    });
  }

  const updateChart = (chart, progress, remaining) => {
    const prev = chart.data.datasets[0].data
    if (prev[0][0] === sections.length) return;
    
    chart.data.datasets[0].data = [progress, remaining];
    chart.update();
  }


  function scrollToTarget(target) {
    var targetPosition = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: targetPosition - 100,
      behavior: 'smooth',
    });
  }

  const sidebarAnchors = document.querySelectorAll('.nav-link');
  sidebarAnchors.forEach(s => {
    s.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = s.getAttribute('href')
      const section = document.getElementById(targetId.substring(1));
      scrollToTarget(section);
    })
  })

  function getActiveSection() {
    let visibleSection = null;
    let toggle = null;
    sections.forEach((section, index) => {
        const rects = section.getBoundingClientRect();
        if (rects.top < 250 && rects.bottom > 250) {
          visibleSection = section;
          if (progress !== sections.length) {
            progress = index + 1;
          }
        }
    });

    if (visibleSection) {
      
      sectionTitle.innerHTML = visibleSection.querySelector('.accordion-button').textContent;
      ;
      percentage.innerHTML = Math.round((progress / sections.length) * 100) + '%';
    }
    updateChart(myChart, progress, sections.length - progress);
  }

  window.addEventListener('scroll', getActiveSection);
  
  createChart(0, sections.length)
  getActiveSection();
}
