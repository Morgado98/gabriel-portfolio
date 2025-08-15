import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog.jsx'
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Database, Code, Server, BarChart3, Users, Award, Moon, Sun, Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { ContactForm } from './components/ContactForm.jsx'
import './App.css'

// Importando assets
import gabrielProfile from './assets/gabriel-profile.png'
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
import abelFutsalLogo from '/images/abel_futsal_logo.png'

function App() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [isLoading, setIsLoading] = useState(true); // Novo estado para carregamento
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado para menu mobile
  const [theme, setTheme] = useState(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  // Definindo projetos antes de usar
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
      image: valluEngenhariaPreview,
      loading: "lazy"
    },
    {
      title: 'Abel Futsal Brusque',
      description: 'Website para o time de futsal Abel Futsal Brusque, com informações sobre o time, jogos e notícias.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Web Design'],
      icon: ExternalLink,
      link: 'https://abelfutsalbrusque.vercel.app/',
      image: abelFutsalLogo,
      loading: "lazy"
    },
    {
      title: 'Meu Perfil no LinkedIn',
      description: 'Conecte-se comigo no LinkedIn para ver minha experiência profissional completa e minhas conexões.',
      technologies: ['Redes Sociais', 'Networking'],
      icon: Linkedin,
      link: 'https://www.linkedin.com/in/gabriel-morgado-s-merchor/',
      image: null
    },
    {
      title: 'Meu GitHub',
      description: 'Explore meus projetos de código aberto e contribuições no GitHub.',
      technologies: ['Desenvolvimento', 'Versionamento', 'Código Aberto'],
      icon: Github,
      link: 'https://github.com/Morgado98',
      image: null
    }
  ]

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    // Simula um tempo de carregamento para demonstrar o spinner
    setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Carrega após 1.5 segundos
  }, []);

  const allTechnologies = [
    ...new Set(projects.flatMap((project) => project.technologies)),
  ];
  const categories = ["Todos", ...allTechnologies];

  const filteredProjects = projects.filter((project) =>
    selectedCategory === "Todos"
      ? true
      : project.technologies.includes(selectedCategory)
  );

  // Scroll suave para seções
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
      setIsMobileMenuOpen(false) // Fechar menu mobile automaticamente
    }
  }

  // Alternar menu mobile
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
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

  // Fechar menu mobile ao clicar fora ou pressionar Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('nav')) {
        setIsMobileMenuOpen(false)
      }
    }

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscapeKey)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isMobileMenuOpen])

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-600"></div>
        </div>
      ) : (
        <>
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
                
                {/* Menu Desktop */}
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

                {/* Botões de ação */}
                <div className="flex items-center space-x-2">
                  <button
                    id="theme-toggle"
                    aria-label="Alternar tema"
                    onClick={toggleTheme}
                    className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                  >
                    {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  </button>
                  
                  {/* Botão Menu Mobile */}
                  <button
                    onClick={toggleMobileMenu}
                    className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                    aria-label="Menu de navegação"
                  >
                    {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Menu Mobile */}
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg"
                >
                  <div className="px-4 py-2 space-y-1">
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
                        className={`w-full text-left px-3 py-3 rounded-md text-sm font-medium transition-colors border-b border-gray-100 last:border-b-0 ${
                          activeSection === item.id
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
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
                      onClick={() => scrollToSection("projetos")}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 hover-lift"
                    >
                      Ver Projetos
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => scrollToSection("contato")}
                      className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 hover-lift"
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
                        loading="lazy"
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
                      de bancos de dados, especializado em SQL Server e MariaDB. 
                    </p>
                    <p>
                      Ao longo de mais de 4 anos de carreira, desenvolvi expertise em SQL Tuning, 
                      modelagem e desenvolvimento de estruturas de banco de dados, sempre focando 
                      em soluções eficientes e escaláveis.
                    </p>
                    <p>
                      Minha experiência abrange Business Intelligence com ferramentas como SSIS, SSAS, 
                      SSRS e Metabase BI. Tenho foco especial na criação de dashboards estratégicos 
                      integrados ao ERP e GLPI para apoio à tomada de decisões empresariais.
                    </p>
                    <p>
                      Atualmente, estou cursando Pós-graduação em Ciência de Dados e Inteligência Artificial, 
                      expandindo meus conhecimentos para acompanhar as tendências tecnológicas mais atuais 
                      e agregar ainda mais valor aos projetos em que atuo.
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
                  </motion.div>
                ))}
              </div>

              {Object.entries(categorizedSkills).map(([category, skills]) => (
                <div key={category} className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">{category}</h3>
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="px-4 py-2 text-base">{skill}</Badge>
                    ))}
                  </div>
                </div>
              ))}
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
                  Meus Projetos
                </h2>
                <p className="text-lg text-gray-600">
                  Explore alguns dos meus trabalhos e contribuições
                </p>
              </motion.div>

              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600 hover:bg-blue-50"}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-lg shadow-md overflow-hidden card-enhanced"
                  >
                    <div className="p-6">
                      {project.image ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <div className="relative cursor-pointer group mb-4">
                              <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-48 object-cover rounded-md transition-transform group-hover:scale-105"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-md flex items-center justify-center">
                                <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </div>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-auto rounded-md"
                            />
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-md mb-4 flex items-center justify-center">
                          <project.icon className="w-16 h-16 text-blue-600" />
                        </div>
                      )}

                      <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge 
                            key={techIndex} 
                            variant="secondary"
                            className="bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors hover-lift"
                        >
                          Ver Projeto <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
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
                  Ficarei feliz em discutir novas oportunidades e projetos.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Informações de Contato</h3>
                  <div className="flex items-center text-gray-700">
                    <Mail className="w-6 h-6 text-blue-600 mr-3" />
                    <span>gabriel.morgado@example.com</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Phone className="w-6 h-6 text-blue-600 mr-3" />
                    <a href="https://wa.me/5547999999999" target="_blank" rel="noopener noreferrer" className="hover:underline">(47) 99999-9999</a>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MapPin className="w-6 h-6 text-blue-600 mr-3" />
                    <span>Brusque, Santa Catarina, Brasil</span>
                  </div>

                  <div className="flex space-x-4 mt-6">
                    <a href="https://github.com/Morgado98" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 transition-colors">
                      <Github className="w-8 h-8" />
                    </a>
                    <a href="https://www.linkedin.com/in/gabriel-morgado-s-merchor/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 transition-colors">
                      <Linkedin className="w-8 h-8" />
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <ContactForm />
                </motion.div>
              </div>
            </div>
          </section>

          <footer className="bg-gray-800 text-white py-8 px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-6xl mx-auto">
              <p>&copy; {new Date().getFullYear()} Gabriel Morgado. Todos os direitos reservados.</p>
            </div>
          </footer>
        </>
      )}
    </div>
  );


