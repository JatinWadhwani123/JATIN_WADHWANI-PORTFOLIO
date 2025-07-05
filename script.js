// script.js

// Typing Effect
new TypeIt("#typing", {
  strings: ["Full Stack Developer", "YouTuber", "GATE Qualified"],
  speed: 100,
  breakLines: false,
  loop: true
}).go();

// ScrollReveal Animations
ScrollReveal({
  reset: false,
  distance: "50px",
  duration: 800,
  delay: 100
});
// Animate skills on scroll
ScrollReveal().reveal(".skill-card", {
  origin: "bottom",
  distance: "30px",
  duration: 800,
  interval: 100
});
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value
    };

    try {
      fetch("https://portfolio-backend-f9uv.onrender.com/contact", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: name,
    email: email,
    subject: subject,
    message: message,
  }),
})

      const data = await res.json();

      if (res.ok) {
        alert('✅ Message sent successfully!');
        form.reset();
      } else {
        alert('❌ Error: ' + data.error);
      }
    } catch (err) {
      console.error(err);
      alert('❌ Failed to send message. Try again later.');
    }
  });
});


ScrollReveal().reveal("section h2", { origin: "top" });
ScrollReveal().reveal("section p, .badge, .form-control, .btn", { origin: "bottom", interval: 100 });
ScrollReveal().reveal(".project-card", { origin: "bottom", interval: 200 });
