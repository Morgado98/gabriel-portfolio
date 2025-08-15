import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Mail, CheckCircle, AlertCircle } from 'lucide-react'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success', 'error', null
  const [statusMessage, setStatusMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        setStatusMessage(result.message)
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        setSubmitStatus('error')
        setStatusMessage(result.message || 'Erro ao enviar mensagem.')
      }
    } catch (error) {
      setSubmitStatus('error')
      setStatusMessage('Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente.')
    } finally {
      setIsSubmitting(false)
      // Limpar status após 5 segundos
      setTimeout(() => {
        setSubmitStatus(null)
        setStatusMessage('')
      }, 5000)
    }
  }

  const isFormValid = formData.name && formData.email && formData.subject && formData.message

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nome
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              placeholder="Seu nome"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              placeholder="seu@email.com"
              required
            />
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Assunto
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              placeholder="Assunto da mensagem"
              required
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Mensagem
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none"
              placeholder="Sua mensagem"
              required
            ></textarea>
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-md text-green-700">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>{statusMessage}</span>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span>{statusMessage}</span>
            </div>
          )}

          <Button 
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Enviando...
              </div>
            ) : (
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Enviar Mensagem
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

