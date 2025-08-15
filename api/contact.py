import json
import smtplib
from email.mime.text import MimeText
from email.mime.multipart import MimeMultipart
from http.server import BaseHTTPRequestHandler
import os

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        # Configurar CORS
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        
        try:
            # Ler dados do corpo da requisição
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            # Extrair dados do formulário
            name = data.get('name', '')
            email = data.get('email', '')
            subject = data.get('subject', '')
            message = data.get('message', '')
            
            # Validar dados
            if not all([name, email, subject, message]):
                self.wfile.write(json.dumps({
                    'success': False,
                    'message': 'Todos os campos são obrigatórios.'
                }).encode())
                return
            
            # Configurar e-mail
            smtp_server = "smtp.gmail.com"
            smtp_port = 587
            sender_email = os.environ.get('SMTP_EMAIL', 'gabrielmorgado0798@gmail.com')
            sender_password = os.environ.get('SMTP_PASSWORD', '')
            recipient_email = os.environ.get('RECIPIENT_EMAIL', 'gabrielmorgado0798@gmail.com')
            
            # Criar mensagem
            msg = MimeMultipart()
            msg['From'] = sender_email
            msg['To'] = recipient_email
            msg['Subject'] = f"Contato do Portfólio: {subject}"
            
            # Corpo do e-mail
            body = f"""
            Nova mensagem recebida através do portfólio:
            
            Nome: {name}
            E-mail: {email}
            Assunto: {subject}
            
            Mensagem:
            {message}
            
            ---
            Esta mensagem foi enviada através do formulário de contato do portfólio.
            """
            
            msg.attach(MimeText(body, 'plain'))
            
            # Enviar e-mail
            if sender_password:
                server = smtplib.SMTP(smtp_server, smtp_port)
                server.starttls()
                server.login(sender_email, sender_password)
                text = msg.as_string()
                server.sendmail(sender_email, recipient_email, text)
                server.quit()
                
                self.wfile.write(json.dumps({
                    'success': True,
                    'message': 'Mensagem enviada com sucesso!'
                }).encode())
            else:
                # Para desenvolvimento/teste - apenas simular o envio
                self.wfile.write(json.dumps({
                    'success': True,
                    'message': 'Mensagem recebida! (Modo de desenvolvimento)'
                }).encode())
                
        except Exception as e:
            self.wfile.write(json.dumps({
                'success': False,
                'message': f'Erro ao enviar mensagem: {str(e)}'
            }).encode())
    
    def do_OPTIONS(self):
        # Responder a requisições OPTIONS para CORS
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

