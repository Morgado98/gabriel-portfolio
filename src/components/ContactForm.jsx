import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [statusMessage, setStatusMessage] = useState('');

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = 'Nome é obrigatório.';
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório.';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(formData.email)) {
      newErrors.email = 'Email inválido.';
    }
    if (!formData.subject) newErrors.subject = 'Assunto é obrigatório.';
    if (!formData.message) newErrors.message = 'Mensagem é obrigatória.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for the field as user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulação de envio de e-mail no frontend (sem backend)
    try {
      // Aqui você integraria com um serviço como EmailJS, Formspree, etc.
      // Por enquanto, apenas simula um sucesso
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simula delay de rede

      setSubmitStatus('success');
      setStatusMessage('Mensagem enviada com sucesso! Em breve entrarei em contato.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage('Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitStatus(null);
        setStatusMessage('');
      }, 5000);
    }
  };

  const isFormValid = formData.name && formData.email && formData.subject && formData.message && Object.keys(errors).length === 0;

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
              className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              placeholder="Seu nome"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
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
              className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              placeholder="seu@email.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
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
              className={`w-full px-3 py-2 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              placeholder="Assunto da mensagem"
            />
            {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
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
              className={`w-full px-3 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none`}
              placeholder="Sua mensagem"
            ></textarea>
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
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
  );
}

