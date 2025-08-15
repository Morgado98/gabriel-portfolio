import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Database, Code, Server, BarChart3, Users, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import { ContactForm } from './components/ContactForm.jsx'
import './App.css'

// Importando assets
import gabrielProfile from './assets/gabriel-profile.jpeg'
import sqlServerIcon from './assets/sql-server-icon.png'
import oracleIcon from './assets/oracle-icon.jpg'
import mysqlIcon from './assets/mysql-icon.png'
import pythonIcon from './assets/python-icon.png'
import gitIcon from './assets/git-icon.png'
import azureIcon from './assets/azure-icon.png'
import linuxIcon from './assets/linux-icon.png'
import awsIcon from './assets/aws-icon.png'
import htmlIcon from './assets/html-icon.png'
import cssIcon from './assets/css-icon.png'
import jsIcon from './assets/js-icon.png'
import zabbixIcon from './assets/zabbix-icon.png'
import windowsServerIcon from './assets/windows-server-icon.png'

// Importando imagens de preview dos projetos
// Os caminhos foram corrigidos para referenciar a pasta public diretamente
import valluEngenhariaPreview from '/images/vallu_engenharia_preview.webp'
import abelFutsalPreview from '/images/abel_futsal_preview.jpg'

function App() {
  const [activeSection, setActiveSection] = useState('inicio')

  // Scroll suave para seções
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
  }

  // Detectar seção ativa durante o scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'sobre', 'habilidades', 'projetos', 'contato']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const skillsWithIcons = [
    { name: 'SQL Server', icon: sqlServerIcon, category: 'Bancos de Dados' },
    { name: 'Oracle', icon: oracleIcon, category: 'Bancos de Dados' },
    { name: 'MariaDB/MySQL', icon: mysqlIcon, category: 'Bancos de Dados' },
    { name: 'Python', icon: pythonIcon, category: 'Linguagens & Scripts' },
    { name: 'HTML', icon: htmlIcon, category: 'Linguagens & Scripts' },
    { name: 'CSS', icon: cssIcon, category: 'Linguagens & Scripts' },
    { name: 'JavaScript', icon: jsIcon, category: 'Linguagens & Scripts' },
    { name: 'Linux', icon: linuxIcon, category: 'Infraestrutura & Redes' },
    { name: 'AWS', icon: awsIcon, category: 'Cloud' },
    { name: 'Zabbix', icon: zabbixIcon, category: 'Infraestrutura & Redes' },
    { name: 'Windows Server', icon: windowsServerIcon, category: 'Infraestrutura & Redes' },
  ];

  const categorizedSkills = {
    'Bancos de Dados': [
      'SQL Server',
      'Oracle',
      'MariaDB',
      'MySQL',
      'NoSQL',
    ],
    'Business Intelligence & ETL': [
      'SSIS, SSAS, SSRS',
      'Metabase BI',
      'Power BI',
      'Redash',
      'Apache Superset',
      'ETL',
    ],
    'Linguagens & Scripts': [
      'SQL',
      'Transact-SQL',
      'PL/SQL',
      'Python',
      'Shell Script',
      'PowerShell',
      'HTML, CSS e JavaScript',
    ],
    'Desenvolvimento & Ferramentas': [
      'Visual Studio',
      'Git',
      'Microsoft Azure',
      'Amazon AWS',
      'Docker',
    ],
    'Infraestrutura & Redes': [
      'Windows Server',
      'Linux (Ubuntu, Debian e Oracle Linux)',
      'Zabbix',
      'Grafana',
    ],
    'Suporte & Gestão': [
      'HelpDesk GLPI',
      'Análise de Falhas',
      'Microsoft Office',
      'Troubleshooting Avançado',
    ],
  };

  const experiences = [
    {
      title: 'Database Administrator Pleno',
      company: 'Entroosto',
      period: 'Agosto 2021 - Presente',
      description: 'Administração de bancos SQL Server e MariaDB, desenvolvimento de dashboards com Metabase BI, otimização de performance e suporte a sistemas ERP.',
      achievements: [
        'Implementação de rotinas eficientes de backup',
        'Desenvolvimento de dashboards estratégicos',
        'Administração do sistema HelpDesk GLPI'
      ]
    },
    {
      title: 'Analista de Suporte de Sistemas',
      company: 'Pacaembu Autopeças Ltda',
      period: 'Fevereiro 2019 - Junho 2021',
      description: 'Suporte N1 a usuários, mapeamento de processos, troubleshooting de redes e geração de relatórios via sistema ERP.',
      achievements: [
        'Mapeamento de processos empresariais',
        'Troubleshooting avançado de redes',
        'Análise e debug de sistemas ERP'
      ]
    }
  ]

  const projects = [
    {
      title: 'Otimização de Performance de Banco de Dados',
      description: 'Implementação de rotinas eficientes de backup e melhorias contínuas de performance em ambiente SQL Server.',
      technologies: ['SQL Server', 'T-SQL', 'Performance Tuning'],
      icon: Database,
      link: null,
      image: null
    },
    {
      title: 'Sistema HelpDesk GLPI',
      description: 'Implementação e administração completa do sistema HelpDesk GLPI, melhorando significativamente o suporte técnico.',
      technologies: ['GLPI', 'Linux', 'MySQL'],
      icon: Users,
      link: null,
      image: null
    },
    {
      title: 'Dashboards Estratégicos com Metabase BI',
      description: 'Desenvolvimento de dashboards integrados com sistema ERP e GLPI para análise de dados e suporte à decisão.',
      technologies: ['Metabase BI', 'SQL', 'Business Intelligence'],
      icon: BarChart3,
      link: null,
      image: null
    },
    {
      title: 'Vallu Engenharia e Topografia',
      description: 'Website institucional desenvolvido para a empresa Vallu Engenharia e Topografia.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Web Design'],
      icon: ExternalLink,
      link: 'https://valluengenhariaetopografia.com.br/',
      image: valluEngenhariaPreview
    },
    {
      title: 'Abel Futsal Brusque',
      description: 'Website para o time de futsal Abel Futsal Brusque, com informações sobre o time, jogos e notícias.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Web Design'],
      icon: ExternalLink,
      link: 'https://abelfutsalbrusque.vercel.app/',
      image: abelFutsalPreview
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navegação */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold text-blue-600"
            >
              Gabriel Morgado
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'inicio', label: 'Início' },
                { id: 'sobre', label: 'Sobre' },
                { id: 'habilidades', label: 'Habilidades' },
                { id: 'projetos', label: 'Projetos' },
                { id: 'contato', label: 'Contato' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Seção Início */}
      <section id="inicio" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-blue-600 font-medium mb-4">Olá, eu sou</p>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Gabriel Morgado
              </h1>
              <h2 className="text-xl lg:text-2xl text-blue-600 font-medium mb-6">
                Database Administrator & Data Engineer
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Profissional de TI com mais de 4 anos de experiência como Database Administrator Pleno, 
                especializado em SQL Server, Oracle e MariaDB/MySQL. Transformo dados em soluções estratégicas para negócios e desenvolvo sites para clientes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => scrollToSection('projetos')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                >
                  Ver Projetos
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => scrollToSection('contato')}
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3"
                >
                  Entre em Contato
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-blue-200 shadow-2xl">
                  <img 
                    src={gabrielProfile} 
                    alt="Gabriel Morgado" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <Database className="w-8 h-8 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Seção Sobre */}
      <section id="sobre" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Sobre Mim
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Conheça um pouco da minha trajetória profissional
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Minha História</h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  Sou um profissional de Tecnologia da Informação com sólida experiência em administração 
                  de bancos de dados, especializado em SQL Server e MariaDB. Ao longo de mais de 4 anos 
                  de carreira, desenvolvi expertise em SQL Tuning, modelagem e desenvolvimento de estruturas 
                  de banco de dados.
                </p>
                <p>
                  Minha experiência abrange Business Intelligence (SSIS, SSAS, SSRS, Metabase BI), 
                  com foco na criação de dashboards estratégicos integrados ao ERP e GLPI para apoio 
                  à tomada de decisões empresariais.
                </p>
                <p>
                  Atualmente, estou cursando Pós-graduação em Ciência de Dados e Inteligência Artificial, 
                  expandindo meus conhecimentos para acompanhar as tendências tecnológicas mais atuais.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Experiência Profissional</h3>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-600">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold text-gray-900">{exp.title}</h4>
                      <p className="text-blue-600 font-medium">{exp.company}</p>
                      <p className="text-sm text-gray-500 mb-3">{exp.period}</p>
                      <p className="text-gray-600 mb-3">{exp.description}</p>
                      <div className="space-y-1">
                        {exp.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-center text-sm text-gray-600">
                            <Award className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Seção Habilidades */}
      <section id="habilidades" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Habilidades
            </h2>
            <p className="text-lg text-gray-600">
              Minhas áreas de expertise técnica
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            {skillsWithIcons.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-between skill-card"
              >
                <div className="flex flex-col items-center text-center flex-grow">
                  <img 
                    src={skill.icon} 
                    alt={skill.name}
                    className="w-12 h-12 object-contain mb-3"
                  />
                  <h3 className="font-semibold text-gray-900 text-sm">{skill.name}</h3>
                </div>
                <Badge variant="secondary" className="mt-2 text-xs flex-shrink-0">
                  {skill.category === 'Desenvolvimento & Ferramentas' && (skill.name === 'AWS' || skill.name === 'Azure') ? 'Cloud' : skill.category}
                </Badge>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-md skill-category"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Database className="w-6 h-6 text-blue-600 mr-2" />
                Bancos de Dados
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>SQL Server</li>
                <li>Oracle</li>
                <li>MariaDB</li>
                <li>MySQL</li>
                <li>NoSQL</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.30 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-md skill-category"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <BarChart3 className="w-6 h-6 text-blue-600 mr-2" />
                Business Intelligence & ETL
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>SSIS, SSAS, SSRS</li>
                <li>Metabase BI</li>
                <li>Power BI</li>
                <li>Redash</li>
                <li>Apache Superset</li>
                <li>ETL</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-md skill-category"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Code className="w-6 h-6 text-blue-600 mr-2" />
                Linguagens & Scripts
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>SQL</li>
                <li>Transact-SQL</li>
                <li>PL/SQL</li>
                <li>Python</li>
                <li>Shell Script</li>
                <li>PowerShell</li>
                <li>HTML, CSS e JavaScript</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.60 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-md skill-category"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Server className="w-6 h-6 text-blue-600 mr-2" />
                Desenvolvimento & Ferramentas
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Visual Studio</li>
                <li>Git</li>
                <li>Microsoft Azure</li>
                <li>Amazon AWS</li>
                <li>Docker</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-md skill-category"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Server className="w-6 h-6 text-blue-600 mr-2" />
                Infraestrutura & Redes
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Windows Server</li>
                <li>Linux (Ubuntu, Debian e Oracle Linux)</li>
                <li>Zabbix</li>
                <li>Grafana</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.90 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-md skill-category"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="w-6 h-6 text-blue-600 mr-2" />
                Suporte & Gestão
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>HelpDesk GLPI</li>
                <li>Análise de Falhas</li>
                <li>Microsoft Office</li>
                <li>Troubleshooting Avançado</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Seção Projetos */}
      <section id="projetos" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Projetos
            </h2>
            <p className="text-lg text-gray-600">
              Alguns dos meus principais trabalhos e conquistas
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-md overflow-hidden card-enhanced"
              >
                {project.image && (
                  <div className="h-48 w-full overflow-hidden flex items-center justify-center">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-contain project-image"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                    {project.icon && <project.icon className="w-5 h-5 text-blue-600 mr-2" />}
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <Badge key={i} variant="outline" className="text-blue-600 border-blue-200">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {project.link && (
                    <Button 
                      variant="outline" 
                      className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                      onClick={() => window.open(project.link, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" /> Ver Projeto
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Contato */}
      <section id="contato" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Entre em Contato
            </h2>
            <p className="text-lg text-gray-600">
              Vamos trabalhar juntos!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Vamos conversar</h3>
              <p className="text-gray-600 mb-6">
                Estou sempre aberto a novas oportunidades e projetos interessantes. Entre 
                em contato e vamos criar algo incrível juntos!
              </p>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-600 mr-3" />
                  gabrielmorgado0798@gmail.com
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-blue-600 mr-3" />
                  (11) 99110-5517
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                  Brusque, SC
                </div>
              </div>
              <div className="flex space-x-4 mt-6">
                <a href="https://www.linkedin.com/in/gabriel-morgado-s-merchor/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-8 h-8 text-blue-600 hover:text-blue-800 transition-colors" />
                </a>
                <a href="https://github.com/Morgado98" target="_blank" rel="noopener noreferrer">
                  <Github className="w-8 h-8 text-blue-600 hover:text-blue-800 transition-colors" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-gray-800 text-white py-8 text-center text-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} Gabriel Morgado. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default App


