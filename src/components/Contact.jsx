import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
  const formRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  useGSAP(() => {
    gsap.from(formRef.current, {
      opacity: 0,
      y: 50,
      scrollTrigger: {
        trigger: formRef.current,
        start: 'top center+=100',
        end: 'center center',
        scrub: 0.5,
      },
      duration: 1,
      ease: 'power2.out',
    })
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add your form submission logic here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }

  return (
      <section id="contact" className="min-h-screen w-screen bg-gradient-to-b from-transparent to-slate-200/60 py-20">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In <span className="text-yellow-400">Touch</span>
          </h2>
          <p className="text-slate-400 text-lg">Let's work together on your next project</p>
        </div>

        {/* Contact Form */}
        <form 
          ref={formRef}
          onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-8 shadow-2xl border border-slate-200"
        >
          {/* Name Field */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-slate-300 font-semibold mb-2">
              Ad
            </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-100 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
                placeholder="Adınız"
              />
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-slate-300 font-semibold mb-2">
              Email
            </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-100 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
                placeholder="email@example.com"
              />
          </div>

          {/* Subject Field */}
          <div className="mb-6">
            <label htmlFor="subject" className="block text-slate-300 font-semibold mb-2">
              Mövzu
            </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-100 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
                placeholder="Layihə mövzusu"
              />
          </div>

          {/* Message Field */}
          <div className="mb-6">
            <label htmlFor="message" className="block text-slate-300 font-semibold mb-2">
              Mesaj
            </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 bg-slate-100 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 resize-none"
                placeholder="Mesajınızı yazın..."
              />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-demo w-full py-3 px-6 text-center"
          >
            <span>Göndər</span>
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact
