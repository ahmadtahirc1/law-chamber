// Mobile Navigation Toggle
const navToggle = document.querySelector(".nav-toggle")
const navMenu = document.querySelector(".nav-menu")

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Header background on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(15, 20, 25, 0.98)"
  } else {
    header.style.background = "rgba(15, 20, 25, 0.95)"
  }
})

// Contact Form Handling
const contactForm = document.getElementById("contactForm")
contactForm.addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const data = Object.fromEntries(formData)

  // Simple validation
  if (!data.name || !data.email || !data.message || !data.service) {
    alert("Please fill in all required fields.")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    alert("Please enter a valid email address.")
    return
  }

  // Simulate form submission
  const submitBtn = this.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent
  submitBtn.textContent = "Sending..."
  submitBtn.disabled = true

  setTimeout(() => {
    alert("Thank you for your message! We will contact you soon.")
    this.reset()
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }, 2000)
})

// AI Chat Widget
const chatToggle = document.getElementById("chatToggle")
const chatWindow = document.getElementById("chatWindow")
const chatClose = document.getElementById("chatClose")
const chatInput = document.getElementById("chatInput")
const chatSend = document.getElementById("chatSend")
const chatMessages = document.getElementById("chatMessages")

// Toggle chat window
chatToggle.addEventListener("click", () => {
  chatWindow.style.display = chatWindow.style.display === "flex" ? "none" : "flex"
})

chatClose.addEventListener("click", () => {
  chatWindow.style.display = "none"
})

// Send message function
function sendMessage() {
  const message = chatInput.value.trim()
  if (!message) return

  // Add user message
  addMessage(message, "user")
  chatInput.value = ""

  // Simulate AI response
  setTimeout(() => {
    const responses = [
      "Thank you for your question. Our legal experts will review your case and provide guidance.",
      "I understand your concern. Let me connect you with one of our specialized lawyers.",
      "Based on your query, this falls under our expertise. Would you like to schedule a consultation?",
      "Our AI system has analyzed your question. For detailed legal advice, please contact our office.",
      "This is an important legal matter. I recommend speaking directly with Advocate Ali Abbas Sheikh.",
    ]
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    addMessage(randomResponse, "bot")
  }, 1000)
}

// Add message to chat
function addMessage(text, sender) {
  const messageDiv = document.createElement("div")
  messageDiv.className = `message ${sender}-message`
  messageDiv.innerHTML = `<p>${text}</p>`
  chatMessages.appendChild(messageDiv)
  chatMessages.scrollTop = chatMessages.scrollHeight
}

// Chat input events
chatSend.addEventListener("click", sendMessage)
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage()
  }
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up")
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".service-card, .ai-feature, .testimonial, .stat").forEach((el) => {
  observer.observe(el)
})

// Stats counter animation
function animateStats() {
  const stats = document.querySelectorAll(".stat h3")
  stats.forEach((stat) => {
    const target = Number.parseInt(stat.textContent)
    const increment = target / 100
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        stat.textContent = target + (stat.textContent.includes("%") ? "%" : "+")
        clearInterval(timer)
      } else {
        stat.textContent = Math.floor(current) + (stat.textContent.includes("%") ? "%" : "+")
      }
    }, 20)
  })
}

// Trigger stats animation when stats section is visible
const statsSection = document.querySelector(".stats")
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateStats()
        statsObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

if (statsSection) {
  statsObserver.observe(statsSection)
}

// Service selection in contact form
const serviceSelect = document.getElementById("service")
serviceSelect.addEventListener("change", function () {
  const messageTextarea = document.getElementById("message")
  const serviceMessages = {
    civil: "I need assistance with a civil litigation matter...",
    corporate: "I require corporate legal services for my business...",
    property: "I have a property law issue that needs attention...",
    family: "I need help with a family law matter...",
    criminal: "I require criminal defense representation...",
    contract: "I need assistance with contract law...",
  }

  if (this.value && serviceMessages[this.value]) {
    messageTextarea.placeholder = serviceMessages[this.value]
  } else {
    messageTextarea.placeholder = "Describe your legal matter"
  }
})

// Preload critical images
function preloadImages() {
  const images = ["/pakistani-law-office-with-scales-of-justice.jpg", "/pakistani-high-court-advocate-in-traditional-legal.jpg"]

  images.forEach((src) => {
    const img = new Image()
    img.src = src
  })
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  preloadImages()

  // Add loading class to body
  document.body.classList.add("loaded")
})

// Handle form validation with better UX
function validateForm(form) {
  const inputs = form.querySelectorAll("input[required], select[required], textarea[required]")
  let isValid = true

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.style.borderColor = "#e53e3e"
      isValid = false
    } else {
      input.style.borderColor = "#2d3748"
    }
  })

  return isValid
}

// Add real-time validation
document.querySelectorAll("input, select, textarea").forEach((input) => {
  input.addEventListener("blur", function () {
    if (this.hasAttribute("required") && !this.value.trim()) {
      this.style.borderColor = "#e53e3e"
    } else {
      this.style.borderColor = "#2d3748"
    }
  })

  input.addEventListener("input", function () {
    if (this.style.borderColor === "rgb(229, 62, 62)" && this.value.trim()) {
      this.style.borderColor = "#2d3748"
    }
  })
})
