// Simple scroll animation or interactivity
window.addEventListener('scroll', () => {
  document.querySelectorAll('.project-card').forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      card.style.opacity = 1;
      card.style.transform = 'translateY(0)';
    }
  });
});

// Optional animation on project cards
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.6s ease-out';
  });
});
