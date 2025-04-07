// Configurações globais
const config = {
  questionsPerGame: 10,
  baseTime: 30,
  pointsPerSecond: 10,
  maxHighScores: 5
};

// Estado do jogo
const state = {
  currentCategory: null,
  currentDifficulty: 'facil',
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  correctAnswers: 0,
  timeLeft: config.baseTime,
  timer: null,
  selectedAnswer: null,
  gameStarted: false,
  highScores: JSON.parse(localStorage.getItem('highScores')) || []
};

// Elementos DOM
const elements = {
  // Telas
  homeScreen: document.getElementById('homeScreen'),
  quizScreen: document.getElementById('quizScreen'),
  resultsScreen: document.getElementById('resultsScreen'),
  
  // Categorias
  categoryCards: document.querySelectorAll('.category-card'),
  
  // Dificuldade
  difficultyBtns: document.querySelectorAll('.difficulty-btn'),
  
  // Quiz
  quizCategory: document.querySelector('.quiz-category'),
  quizDifficulty: document.querySelector('.quiz-difficulty'),
  timeCounter: document.querySelector('.time-value'),
  scoreCounter: document.querySelector('.score-value'),
  progressFill: document.querySelector('.progress-fill'),
  currentQuestionEl: document.querySelector('.current-question'),
  totalQuestionsEl: document.querySelector('.total-questions'),
  questionText: document.querySelector('.question-text'),
  answersGrid: document.querySelector('.answers-grid'),
  quizFeedback: document.querySelector('.quiz-feedback'),
  
  // Resultados
  resultsScore: document.querySelector('.results-score .score-value'),
  correctAnswersEl: document.querySelector('.stat-item:nth-child(1) .stat-value'),
  wrongAnswersEl: document.querySelector('.stat-item:nth-child(2) .stat-value'),
  totalScoreEl: document.querySelector('.stat-item:nth-child(3) .stat-value'),
  leaderboardList: document.querySelector('.leaderboard-list'),
  
  // Botões
  startBtn: document.querySelector('.start-btn'),
  nextQuestionBtn: document.querySelector('.next-question-btn'),
  retryBtn: document.querySelector('.retry-btn'),
  newQuizBtn: document.querySelector('.new-quiz-btn'),
  shareBtn: document.querySelector('.share-btn'),
  themeToggle: document.getElementById('themeToggle')
};

// Banco de Perguntas (15 por categoria/dificuldade)
const questionBank = {
  geral: {
    facil: [
      {
        pergunta: "Qual é a capital do Brasil?",
        respostas: [
          { texto: "Rio de Janeiro", correta: false },
          { texto: "Brasília", correta: true },
          { texto: "São Paulo", correta: false },
          { texto: "Salvador", correta: false }
        ]
      },
      {
        pergunta: "Quantos continentes existem no mundo?",
        respostas: [
          { texto: "5", correta: false },
          { texto: "6", correta: false },
          { texto: "7", correta: true },
          { texto: "8", correta: false }
        ]
      },
      {
        pergunta: "Qual é o maior planeta do Sistema Solar?",
        respostas: [
          { texto: "Terra", correta: false },
          { texto: "Júpiter", correta: true },
          { texto: "Saturno", correta: false },
          { texto: "Marte", correta: false }
        ]
      },
      {
        pergunta: "Qual idioma é o mais falado no mundo?",
        respostas: [
          { texto: "Inglês", correta: false },
          { texto: "Mandarim", correta: true },
          { texto: "Espanhol", correta: false },
          { texto: "Hindi", correta: false }
        ]
      },
      {
        pergunta: "Qual é o símbolo químico do ouro?",
        respostas: [
          { texto: "Au", correta: true },
          { texto: "Ag", correta: false },
          { texto: "Fe", correta: false },
          { texto: "Pb", correta: false }
        ]
      },
      {
        pergunta: "Quantos dias tem um ano bissexto?",
        respostas: [
          { texto: "365", correta: false },
          { texto: "366", correta: true },
          { texto: "364", correta: false },
          { texto: "367", correta: false }
        ]
      },
      {
        pergunta: "Qual é o maior mamífero do mundo?",
        respostas: [
          { texto: "Elefante", correta: false },
          { texto: "Baleia-azul", correta: true },
          { texto: "Girafa", correta: false },
          { texto: "Hipopótamo", correta: false }
        ]
      },
      {
        pergunta: "Qual país é conhecido como 'terra do sol nascente'?",
        respostas: [
          { texto: "China", correta: false },
          { texto: "Japão", correta: true },
          { texto: "Coreia do Sul", correta: false },
          { texto: "Tailândia", correta: false }
        ]
      },
      {
        pergunta: "Quantos ossos tem o corpo humano adulto?",
        respostas: [
          { texto: "206", correta: true },
          { texto: "300", correta: false },
          { texto: "150", correta: false },
          { texto: "254", correta: false }
        ]
      },
      {
        pergunta: "Qual é o oceano mais extenso da Terra?",
        respostas: [
          { texto: "Atlântico", correta: false },
          { texto: "Índico", correta: false },
          { texto: "Pacífico", correta: true },
          { texto: "Ártico", correta: false }
        ]
      }
    ],
    medio: [
      {
        pergunta: "Qual país tem o formato de uma bota?",
        respostas: [
          { texto: "França", correta: false },
          { texto: "Itália", correta: true },
          { texto: "Espanha", correta: false },
          { texto: "Portugal", correta: false }
        ]
      },
      {
        pergunta: "Qual é o menor país do mundo?",
        respostas: [
          { texto: "Mônaco", correta: false },
          { texto: "Vaticano", correta: true },
          { texto: "San Marino", correta: false },
          { texto: "Malta", correta: false }
        ]
      },
      {
        pergunta: "Qual é o animal nacional da Austrália?",
        respostas: [
          { texto: "Canguru", correta: true },
          { texto: "Coala", correta: false },
          { texto: "Diabo-da-Tasmânia", correta: false },
          { texto: "Emu", correta: false }
        ]
      },
      {
        pergunta: "Qual é o rio mais longo do mundo?",
        respostas: [
          { texto: "Amazonas", correta: false },
          { texto: "Nilo", correta: true },
          { texto: "Yangtzé", correta: false },
          { texto: "Mississipi", correta: false }
        ]
      },
      {
        pergunta: "Qual é a montanha mais alta do mundo?",
        respostas: [
          { texto: "Monte Everest", correta: true },
          { texto: "K2", correta: false },
          { texto: "Monte Kilimanjaro", correta: false },
          { texto: "Monte Fuji", correta: false }
        ]
      },
      {
        pergunta: "Qual destes não é um país?",
        respostas: [
          { texto: "Groenlândia", correta: true },
          { texto: "Islândia", correta: false },
          { texto: "Madagáscar", correta: false },
          { texto: "Filipinas", correta: false }
        ]
      },
      {
        pergunta: "Qual é a capital da Islândia?",
        respostas: [
          { texto: "Oslo", correta: false },
          { texto: "Reykjavik", correta: true },
          { texto: "Helsinque", correta: false },
          { texto: "Estocolmo", correta: false }
        ]
      },
      {
        pergunta: "Quantos planetas do Sistema Solar têm anéis?",
        respostas: [
          { texto: "1", correta: false },
          { texto: "2", correta: false },
          { texto: "4", correta: true },
          { texto: "Todos", correta: false }
        ]
      },
      {
        pergunta: "Qual é o metal mais condutor de eletricidade?",
        respostas: [
          { texto: "Ouro", correta: false },
          { texto: "Prata", correta: true },
          { texto: "Cobre", correta: false },
          { texto: "Alumínio", correta: false }
        ]
      },
      {
        pergunta: "Qual destes países não faz parte da União Europeia?",
        respostas: [
          { texto: "Noruega", correta: true },
          { texto: "Alemanha", correta: false },
          { texto: "França", correta: false },
          { texto: "Itália", correta: false }
        ]
      }
    ],
    dificil: [
      {
        pergunta: "Qual é o único mamífero capaz de voar?",
        respostas: [
          { texto: "Morcego", correta: true },
          { texto: "Esquilo-voador", correta: false },
          { texto: "Pterodáctilo (extinto)", correta: false },
          { texto: "Ave-do-paraíso", correta: false }
        ]
      },
      {
        pergunta: "Qual é o país com mais fusos horários?",
        respostas: [
          { texto: "Rússia", correta: false },
          { texto: "Estados Unidos", correta: false },
          { texto: "França", correta: true },
          { texto: "China", correta: false }
        ]
      },
      {
        pergunta: "Qual é o único planeta que gira de lado?",
        respostas: [
          { texto: "Saturno", correta: false },
          { texto: "Urano", correta: true },
          { texto: "Netuno", correta: false },
          { texto: "Vênus", correta: false }
        ]
      },
      {
        pergunta: "Quantos cromossomos tem uma célula humana saudável?",
        respostas: [
          { texto: "23", correta: false },
          { texto: "46", correta: true },
          { texto: "64", correta: false },
          { texto: "32", correta: false }
        ]
      },
      {
        pergunta: "Qual é a velocidade do som no ar?",
        respostas: [
          { texto: "1235 km/h", correta: true },
          { texto: "500 km/h", correta: false },
          { texto: "1000 km/h", correta: false },
          { texto: "800 km/h", correta: false }
        ]
      },
      {
        pergunta: "Qual é a profundidade média dos oceanos?",
        respostas: [
          { texto: "1.200 metros", correta: false },
          { texto: "3.688 metros", correta: true },
          { texto: "5.000 metros", correta: false },
          { texto: "2.500 metros", correta: false }
        ]
      },
      {
        pergunta: "Quantas estrelas tem a bandeira do Brasil?",
        respostas: [
          { texto: "26", correta: false },
          { texto: "27", correta: true },
          { texto: "28", correta: false },
          { texto: "25", correta: false }
        ]
      },
      {
        pergunta: "Qual é o elemento mais abundante na crosta terrestre?",
        respostas: [
          { texto: "Ferro", correta: false },
          { texto: "Oxigênio", correta: true },
          { texto: "Silício", correta: false },
          { texto: "Alumínio", correta: false }
        ]
      },
      {
        pergunta: "Qual é a temperatura do Sol em sua superfície?",
        respostas: [
          { texto: "1.000°C", correta: false },
          { texto: "5.500°C", correta: true },
          { texto: "15.000°C", correta: false },
          { texto: "100.000°C", correta: false }
        ]
      },
      {
        pergunta: "Quantas vértebras tem a coluna vertebral humana?",
        respostas: [
          { texto: "24", correta: false },
          { texto: "33", correta: true },
          { texto: "28", correta: false },
          { texto: "30", correta: false }
        ]
      }
    ]
  },
  historia: {
    facil: [
      {
        pergunta: "Quem descobriu o Brasil?",
        respostas: [
          { texto: "Cristóvão Colombo", correta: false },
          { texto: "Pedro Álvares Cabral", correta: true },
          { texto: "Fernão de Magalhães", correta: false },
          { texto: "Vasco da Gama", correta: false }
        ]
      },
      {
        pergunta: "Em que ano começou a Segunda Guerra Mundial?",
        respostas: [
          { texto: "1914", correta: false },
          { texto: "1939", correta: true },
          { texto: "1945", correta: false },
          { texto: "1920", correta: false }
        ]
      },
      {
        pergunta: "Quem foi o primeiro presidente dos EUA?",
        respostas: [
          { texto: "Thomas Jefferson", correta: false },
          { texto: "George Washington", correta: true },
          { texto: "Abraham Lincoln", correta: false },
          { texto: "John Adams", correta: false }
        ]
      },
      {
        pergunta: "Qual civilização construiu as pirâmides do Egito?",
        respostas: [
          { texto: "Astecas", correta: false },
          { texto: "Maias", correta: false },
          { texto: "Egípcios", correta: true },
          { texto: "Romanos", correta: false }
        ]
      },
      {
        pergunta: "Em que ano o Brasil declarou independência?",
        respostas: [
          { texto: "1808", correta: false },
          { texto: "1822", correta: true },
          { texto: "1840", correta: false },
          { texto: "1889", correta: false }
        ]
      },
      {
        pergunta: "Quem pintou a Mona Lisa?",
        respostas: [
          { texto: "Van Gogh", correta: false },
          { texto: "Leonardo da Vinci", correta: true },
          { texto: "Picasso", correta: false },
          { texto: "Michelangelo", correta: false }
        ]
      },
      {
        pergunta: "Qual foi o último imperador do Brasil?",
        respostas: [
          { texto: "Dom Pedro I", correta: false },
          { texto: "Dom Pedro II", correta: true },
          { texto: "Dom João VI", correta: false },
          { texto: "Dom Miguel I", correta: false }
        ]
      },
      {
        pergunta: "Em que século o Brasil foi descoberto?",
        respostas: [
          { texto: "XV", correta: true },
          { texto: "XIV", correta: false },
          { texto: "XVI", correta: false },
          { texto: "XVII", correta: false }
        ]
      },
      {
        pergunta: "Qual foi a primeira capital do Brasil?",
        respostas: [
          { texto: "Rio de Janeiro", correta: false },
          { texto: "Salvador", correta: true },
          { texto: "São Paulo", correta: false },
          { texto: "Brasília", correta: false }
        ]
      },
      {
        pergunta: "Quem escreveu 'Os Lusíadas'?",
        respostas: [
          { texto: "Fernando Pessoa", correta: false },
          { texto: "Luís de Camões", correta: true },
          { texto: "Eça de Queirós", correta: false },
          { texto: "Machado de Assis", correta: false }
        ]
      }
    ],
    medio: [
      {
        pergunta: "Qual foi o primeiro presidente do Brasil?",
        respostas: [
          { texto: "Dom Pedro II", correta: false },
          { texto: "Deodoro da Fonseca", correta: true },
          { texto: "Getúlio Vargas", correta: false },
          { texto: "Prudente de Morais", correta: false }
        ]
      },
      {
        pergunta: "Em que ano caiu o Muro de Berlim?",
        respostas: [
          { texto: "1985", correta: false },
          { texto: "1989", correta: true },
          { texto: "1991", correta: false },
          { texto: "1979", correta: false }
        ]
      },
      {
        pergunta: "Quem foi o líder da Revolução Russa de 1917?",
        respostas: [
          { texto: "Joseph Stalin", correta: false },
          { texto: "Vladimir Lenin", correta: true },
          { texto: "Leon Trotsky", correta: false },
          { texto: "Karl Marx", correta: false }
        ]
      },
      {
        pergunta: "Qual era o nome da primeira constituição brasileira?",
        respostas: [
          { texto: "Constituição da República", correta: false },
          { texto: "Constituição Imperial", correta: false },
          { texto: "Constituição da Mandioca", correta: true },
          { texto: "Constituição Federalista", correta: false }
        ]
      },
      {
        pergunta: "Quem foi o principal líder da Inconfidência Mineira?",
        respostas: [
          { texto: "Dom Pedro I", correta: false },
          { texto: "Tiradentes", correta: true },
          { texto: "José Bonifácio", correta: false },
          { texto: "Marquês de Pombal", correta: false }
        ]
      },
      {
        pergunta: "Qual foi o período da Ditadura Militar no Brasil?",
        respostas: [
          { texto: "1954-1964", correta: false },
          { texto: "1964-1985", correta: true },
          { texto: "1930-1945", correta: false },
          { texto: "1985-1990", correta: false }
        ]
      },
      {
        pergunta: "Quem foi o primeiro homem a pisar na Lua?",
        respostas: [
          { texto: "Yuri Gagarin", correta: false },
          { texto: "Neil Armstrong", correta: true },
          { texto: "Buzz Aldrin", correta: false },
          { texto: "Alan Shepard", correta: false }
        ]
      },
      {
        pergunta: "Qual era o nome da esposa de Napoleão Bonaparte?",
        respostas: [
          { texto: "Maria Antonieta", correta: false },
          { texto: "Josephine", correta: true },
          { texto: "Luísa de Prússia", correta: false },
          { texto: "Isabel da Baviera", correta: false }
        ]
      },
      {
        pergunta: "Em que ano foi proclamada a República no Brasil?",
        respostas: [
          { texto: "1822", correta: false },
          { texto: "1889", correta: true },
          { texto: "1900", correta: false },
          { texto: "1840", correta: false }
        ]
      },
      {
        pergunta: "Quem foi o autor da obra 'O Príncipe'?",
        respostas: [
          { texto: "Maquiavel", correta: true },
          { texto: "Dante Alighieri", correta: false },
          { texto: "Giovanni Boccaccio", correta: false },
          { texto: "Petrarca", correta: false }
        ]
      }
    ],
    dificil: [
      {
        pergunta: "Qual civilização construiu Machu Picchu?",
        respostas: [
          { texto: "Astecas", correta: false },
          { texto: "Maias", correta: false },
          { texto: "Incas", correta: true },
          { texto: "Olmecas", correta: false }
        ]
      },
      {
        pergunta: "Quem foi o último czar da Rússia?",
        respostas: [
          { texto: "Alexandre II", correta: false },
          { texto: "Nicolau II", correta: true },
          { texto: "Pedro, o Grande", correta: false },
          { texto: "Alexandre III", correta: false }
        ]
      },
      {
        pergunta: "Em que ano ocorreu a Revolução Francesa?",
        respostas: [
          { texto: "1776", correta: false },
          { texto: "1789", correta: true },
          { texto: "1804", correta: false },
          { texto: "1750", correta: false }
        ]
      },
      {
        pergunta: "Qual foi a primeira dinastia imperial chinesa?",
        respostas: [
          { texto: "Han", correta: false },
          { texto: "Qin", correta: true },
          { texto: "Tang", correta: false },
          { texto: "Ming", correta: false }
        ]
      },
      {
        pergunta: "Quem fundou a cidade de São Petersburgo?",
        respostas: [
          { texto: "Catarina, a Grande", correta: false },
          { texto: "Pedro, o Grande", correta: true },
          { texto: "Ivan, o Terrível", correta: false },
          { texto: "Alexandre Nevsky", correta: false }
        ]
      },
      {
        pergunta: "Qual foi o primeiro país a reconhecer a independência do Brasil?",
        respostas: [
          { texto: "Portugal", correta: false },
          { texto: "Inglaterra", correta: false },
          { texto: "Estados Unidos", correta: true },
          { texto: "França", correta: false }
        ]
      },
      {
        pergunta: "Quem foi o líder da Revolta da Armada no Brasil?",
        respostas: [
          { texto: "Deodoro da Fonseca", correta: false },
          { texto: "Floriano Peixoto", correta: false },
          { texto: "Custódio de Melo", correta: true },
          { texto: "Benjamin Constant", correta: false }
        ]
      },
      {
        pergunta: "Qual foi o tratado que dividiu o mundo entre Portugal e Espanha em 1494?",
        respostas: [
          { texto: "Tratado de Paris", correta: false },
          { texto: "Tratado de Tordesilhas", correta: true },
          { texto: "Tratado de Versalhes", correta: false },
          { texto: "Tratado de Utrecht", correta: false }
        ]
      },
      {
        pergunta: "Quem foi o primeiro europeu a chegar à Índia por via marítima?",
        respostas: [
          { texto: "Cristóvão Colombo", correta: false },
          { texto: "Fernão de Magalhães", correta: false },
          { texto: "Vasco da Gama", correta: true },
          { texto: "Pedro Álvares Cabral", correta: false }
        ]
      },
      {
        pergunta: "Qual foi o nome do primeiro jornal publicado no Brasil?",
        respostas: [
          { texto: "Correio Braziliense", correta: false },
          { texto: "Gazeta do Rio de Janeiro", correta: true },
          { texto: "Diário de Pernambuco", correta: false },
          { texto: "Jornal do Commercio", correta: false }
        ]
      }
    ]
  },
  ciencia: {
    facil: [
      {
        pergunta: "Qual é a fórmula da água?",
        respostas: [
          { texto: "H2O", correta: true },
          { texto: "CO2", correta: false },
          { texto: "NaCl", correta: false },
          { texto: "O2", correta: false }
        ]
      },
      {
        pergunta: "Quantos planetas existem no Sistema Solar?",
        respostas: [
          { texto: "7", correta: false },
          { texto: "8", correta: true },
          { texto: "9", correta: false },
          { texto: "10", correta: false }
        ]
      },
      {
        pergunta: "Qual é o gás mais abundante na atmosfera terrestre?",
        respostas: [
          { texto: "Oxigênio", correta: false },
          { texto: "Nitrogênio", correta: true },
          { texto: "Dióxido de Carbono", correta: false },
          { texto: "Hidrogênio", correta: false }
        ]
      },
      {
        pergunta: "Qual é o maior osso do corpo humano?",
        respostas: [
          { texto: "Fêmur", correta: true },
          { texto: "Tíbia", correta: false },
          { texto: "Úmero", correta: false },
          { texto: "Crânio", correta: false }
        ]
      },
      {
        pergunta: "O que a fotossíntese produz?",
        respostas: [
          { texto: "Oxigênio e glicose", correta: true },
          { texto: "Dióxido de carbono e água", correta: false },
          { texto: "Nitrogênio e proteínas", correta: false },
          { texto: "Metano e sais minerais", correta: false }
        ]
      },
      {
        pergunta: "Qual é a velocidade da luz no vácuo?",
        respostas: [
          { texto: "300.000 km/h", correta: false },
          { texto: "300.000 m/s", correta: false },
          { texto: "300.000 km/s", correta: true },
          { texto: "1 milhão de km/h", correta: false }
        ]
      },
      {
        pergunta: "Qual é o processo de divisão celular?",
        respostas: [
          { texto: "Fotossíntese", correta: false },
          { texto: "Mitose", correta: true },
          { texto: "Respiração", correta: false },
          { texto: "Digestão", correta: false }
        ]
      },
      {
        pergunta: "Qual é o pH da água pura?",
        respostas: [
          { texto: "5", correta: false },
          { texto: "7", correta: true },
          { texto: "10", correta: false },
          { texto: "0", correta: false }
        ]
      },
      {
        pergunta: "Qual destes não é um estado da matéria?",
        respostas: [
          { texto: "Sólido", correta: false },
          { texto: "Líquido", correta: false },
          { texto: "Gasoso", correta: false },
          { texto: "Energia", correta: true }
        ]
      },
      {
        pergunta: "Qual é a unidade básica da vida?",
        respostas: [
          { texto: "Átomo", correta: false },
          { texto: "Molécula", correta: false },
          { texto: "Célula", correta: true },
          { texto: "Gene", correta: false }
        ]
      }
    ],
    medio: [
      {
        pergunta: "Qual partícula tem carga positiva?",
        respostas: [
          { texto: "Elétron", correta: false },
          { texto: "Nêutron", correta: false },
          { texto: "Próton", correta: true },
          { texto: "Fóton", correta: false }
        ]
      },
      {
        pergunta: "Qual é a camada mais externa da Terra?",
        respostas: [
          { texto: "Núcleo", correta: false },
          { texto: "Manto", correta: false },
          { texto: "Crosta", correta: true },
          { texto: "Litosfera", correta: false }
        ]
      },
      {
        pergunta: "Qual destes é um gás nobre?",
        respostas: [
          { texto: "Oxigênio", correta: false },
          { texto: "Hidrogênio", correta: false },
          { texto: "Hélio", correta: true },
          { texto: "Nitrogênio", correta: false }
        ]
      },
      {
        pergunta: "O que mede um sismógrafo?",
        respostas: [
          { texto: "Ventos", correta: false },
          { texto: "Terremotos", correta: true },
          { texto: "Chuvas", correta: false },
          { texto: "Temperatura", correta: false }
        ]
      },
      {
        pergunta: "Qual é o elemento químico com símbolo 'Fe'?",
        respostas: [
          { texto: "Flúor", correta: false },
          { texto: "Fósforo", correta: false },
          { texto: "Ferro", correta: true },
          { texto: "Frâncio", correta: false }
        ]
      },
      {
        pergunta: "Qual é a fórmula do dióxido de carbono?",
        respostas: [
          { texto: "CO", correta: false },
          { texto: "CO2", correta: true },
          { texto: "C2O", correta: false },
          { texto: "CO3", correta: false }
        ]
      },
      {
        pergunta: "Quantos elétrons tem um átomo de hidrogênio?",
        respostas: [
          { texto: "0", correta: false },
          { texto: "1", correta: true },
          { texto: "2", correta: false },
          { texto: "3", correta: false }
        ]
      },
      {
        pergunta: "Qual é a função da clorofila?",
        respostas: [
          { texto: "Transportar água", correta: false },
          { texto: "Absorver luz solar", correta: true },
          { texto: "Produzir proteínas", correta: false },
          { texto: "Armazenar nutrientes", correta: false }
        ]
      },
      {
        pergunta: "O que causa as marés?",
        respostas: [
          { texto: "Rotação da Terra", correta: false },
          { texto: "Gravidade da Lua", correta: true },
          { texto: "Ventos oceânicos", correta: false },
          { texto: "Correntes marítimas", correta: false }
        ]
      },
      {
        pergunta: "Qual é o maior órgão do corpo humano?",
        respostas: [
          { texto: "Coração", correta: false },
          { texto: "Fígado", correta: false },
          { texto: "Pele", correta: true },
          { texto: "Cérebro", correta: false }
        ]
      }
    ],
    dificil: [
      {
        pergunta: "Qual partícula é conhecida como 'a partícula de Deus'?",
        respostas: [
          { texto: "Elétron", correta: false },
          { texto: "Bóson de Higgs", correta: true },
          { texto: "Quark", correta: false },
          { texto: "Neutrino", correta: false }
        ]
      },
      {
        pergunta: "Qual é a temperatura do zero absoluto?",
        respostas: [
          { texto: "0°C", correta: false },
          { texto: "-100°C", correta: false },
          { texto: "-273,15°C", correta: true },
          { texto: "-500°C", correta: false }
        ]
      },
      {
        pergunta: "Quantas vértebras cervicais tem um humano?",
        respostas: [
          { texto: "5", correta: false },
          { texto: "7", correta: true },
          { texto: "12", correta: false },
          { texto: "15", correta: false }
        ]
      },
      {
        pergunta: "Qual é a fórmula da relatividade de Einstein?",
        respostas: [
          { texto: "F=ma", correta: false },
          { texto: "E=mc²", correta: true },
          { texto: "PV=nRT", correta: false },
          { texto: "V=IR", correta: false }
        ]
      },
      {
        pergunta: "Qual é o único metal líquido em temperatura ambiente?",
        respostas: [
          { texto: "Ferro", correta: false },
          { texto: "Ouro", correta: false },
          { texto: "Mercúrio", correta: true },
          { texto: "Sódio", correta: false }
        ]
      },
      {
        pergunta: "Quantos elementos tem a tabela periódica atualmente?",
        respostas: [
          { texto: "92", correta: false },
          { texto: "118", correta: true },
          { texto: "150", correta: false },
          { texto: "200", correta: false }
        ]
      },
      {
        pergunta: "Qual é a velocidade do som no ar?",
        respostas: [
          { texto: "343 m/s", correta: true },
          { texto: "500 m/s", correta: false },
          { texto: "1000 m/s", correta: false },
          { texto: "200 m/s", correta: false }
        ]
      },
      {
        pergunta: "Qual é o ácido presente no estômago?",
        respostas: [
          { texto: "Sulfúrico", correta: false },
          { texto: "Clorídrico", correta: true },
          { texto: "Nítrico", correta: false },
          { texto: "Acético", correta: false }
        ]
      },
      {
        pergunta: "Qual é o maior órgão interno do corpo humano?",
        respostas: [
          { texto: "Cérebro", correta: false },
          { texto: "Fígado", correta: true },
          { texto: "Pulmão", correta: false },
          { texto: "Coração", correta: false }
        ]
      },
      {
        pergunta: "Quantos pares de costelas tem um ser humano?",
        respostas: [
          { texto: "10", correta: false },
          { texto: "12", correta: true },
          { texto: "14", correta: false },
          { texto: "16", correta: false }
        ]
      }
    ]
  },
  geografia: {
    facil: [
      {
        pergunta: "Qual é o maior oceano do mundo?",
        respostas: [
          { texto: "Atlântico", correta: false },
          { texto: "Pacífico", correta: true },
          { texto: "Índico", correta: false },
          { texto: "Ártico", correta: false }
        ]
      },
      {
        pergunta: "Qual é o rio mais longo do mundo?",
        respostas: [
          { texto: "Amazonas", correta: false },
          { texto: "Nilo", correta: true },
          { texto: "Yangtzé", correta: false },
          { texto: "Mississipi", correta: false }
        ]
      },
      {
        pergunta: "Qual país é conhecido como 'terra do sol nascente'?",
        respostas: [
          { texto: "China", correta: false },
          { texto: "Japão", correta: true },
          { texto: "Coreia do Sul", correta: false },
          { texto: "Tailândia", correta: false }
        ]
      },
      {
        pergunta: "Qual é a capital da Austrália?",
        respostas: [
          { texto: "Sydney", correta: false },
          { texto: "Melbourne", correta: false },
          { texto: "Canberra", correta: true },
          { texto: "Perth", correta: false }
        ]
      },
      {
        pergunta: "Qual desses países não faz parte da Europa?",
        respostas: [
          { texto: "Suíça", correta: false },
          { texto: "Marrocos", correta: true },
          { texto: "Áustria", correta: false },
          { texto: "Bélgica", correta: false }
        ]
      },
      {
        pergunta: "Qual é o maior deserto do mundo?",
        respostas: [
          { texto: "Deserto do Saara", correta: true },
          { texto: "Deserto de Gobi", correta: false },
          { texto: "Deserto da Arábia", correta: false },
          { texto: "Deserto do Atacama", correta: false }
        ]
      },
      {
        pergunta: "Qual montanha é a mais alta do mundo?",
        respostas: [
          { texto: "Monte Everest", correta: true },
          { texto: "K2", correta: false },
          { texto: "Monte Kilimanjaro", correta: false },
          { texto: "Monte Fuji", correta: false }
        ]
      },
      {
        pergunta: "Qual é o menor país do mundo?",
        respostas: [
          { texto: "Mônaco", correta: false },
          { texto: "Vaticano", correta: true },
          { texto: "San Marino", correta: false },
          { texto: "Malta", correta: false }
        ]
      },
      {
        pergunta: "Qual país tem o formato de uma bota?",
        respostas: [
          { texto: "França", correta: false },
          { texto: "Itália", correta: true },
          { texto: "Espanha", correta: false },
          { texto: "Portugal", correta: false }
        ]
      },
      {
        pergunta: "Qual é a capital do Canadá?",
        respostas: [
          { texto: "Toronto", correta: false },
          { texto: "Vancouver", correta: false },
          { texto: "Ottawa", correta: true },
          { texto: "Montreal", correta: false }
        ]
      }
    ],
    medio: [
      {
        pergunta: "Qual é o país mais populoso do mundo?",
        respostas: [
          { texto: "Índia", correta: false },
          { texto: "China", correta: true },
          { texto: "Estados Unidos", correta: false },
          { texto: "Indonésia", correta: false }
        ]
      },
      {
        pergunta: "Qual é o maior lago de água doce do mundo?",
        respostas: [
          { texto: "Lago Vitória", correta: false },
          { texto: "Lago Superior", correta: true },
          { texto: "Lago Baikal", correta: false },
          { texto: "Lago Tanganica", correta: false }
        ]
      },
      {
        pergunta: "Qual é a capital da Nova Zelândia?",
        respostas: [
          { texto: "Auckland", correta: false },
          { texto: "Wellington", correta: true },
          { texto: "Christchurch", correta: false },
          { texto: "Queenstown", correta: false }
        ]
      },
      {
        pergunta: "Qual desses países não faz parte do G8?",
        respostas: [
          { texto: "Canadá", correta: false },
          { texto: "Rússia", correta: false },
          { texto: "Brasil", correta: true },
          { texto: "Alemanha", correta: false }
        ]
      },
      {
        pergunta: "Qual é o ponto mais baixo da Terra?",
        respostas: [
          { texto: "Vale da Morte", correta: false },
          { texto: "Fossa das Marianas", correta: false },
          { texto: "Mar Morto", correta: true },
          { texto: "Gruta de Voronya", correta: false }
        ]
      },
      {
        pergunta: "Qual país tem o maior número de fusos horários?",
        respostas: [
          { texto: "Rússia", correta: false },
          { texto: "Estados Unidos", correta: false },
          { texto: "França", correta: true },
          { texto: "China", correta: false }
        ]
      },
      {
        pergunta: "Qual é o maior arquipélago do mundo?",
        respostas: [
          { texto: "Japão", correta: false },
          { texto: "Filipinas", correta: false },
          { texto: "Indonésia", correta: true },
          { texto: "Maldivas", correta: false }
        ]
      },
      {
        pergunta: "Qual é o único país banhado pelo Mar Cáspio e Mar Negro?",
        respostas: [
          { texto: "Turquia", correta: false },
          { texto: "Rússia", correta: true },
          { texto: "Irã", correta: false },
          { texto: "Azerbaijão", correta: false }
        ]
      },
      {
        pergunta: "Qual é o rio que atravessa Paris?",
        respostas: [
          { texto: "Tâmisa", correta: false },
          { texto: "Danúbio", correta: false },
          { texto: "Sena", correta: true },
          { texto: "Reno", correta: false }
        ]
      },
      {
        pergunta: "Qual é a capital da África do Sul?",
        respostas: [
          { texto: "Cidade do Cabo", correta: false },
          { texto: "Pretória", correta: false },
          { texto: "Bloemfontein", correta: false },
          { texto: "Todas as anteriores", correta: true }
        ]
      }
    ],
    dificil: [
      {
        pergunta: "Qual é o único país do mundo localado em todos os hemisférios?",
        respostas: [
          { texto: "Indonésia", correta: false },
          { texto: "Quênia", correta: false },
          { texto: "Kiribati", correta: true },
          { texto: "Maldivas", correta: false }
        ]
      },
      {
        pergunta: "Qual é o ponto mais distante do centro da Terra?",
        respostas: [
          { texto: "Monte Everest", correta: false },
          { texto: "Chimborazo", correta: true },
          { texto: "Monte Kilimanjaro", correta: false },
          { texto: "Aconcágua", correta: false }
        ]
      },
      {
        pergunta: "Qual país tem a maior costa litorânea?",
        respostas: [
          { texto: "Rússia", correta: false },
          { texto: "Canadá", correta: true },
          { texto: "Austrália", correta: false },
          { texto: "Estados Unidos", correta: false }
        ]
      },
      {
        pergunta: "Qual é o único continente sem desertos?",
        respostas: [
          { texto: "Ásia", correta: false },
          { texto: "Europa", correta: true },
          { texto: "América do Sul", correta: false },
          { texto: "Oceania", correta: false }
        ]
      },
      {
        pergunta: "Qual país não faz fronteira com o Brasil?",
        respostas: [
          { texto: "Chile", correta: true },
          { texto: "Argentina", correta: false },
          { texto: "Peru", correta: false },
          { texto: "Colômbia", correta: false }
        ]
      },
      {
        pergunta: "Qual é a capital da Groenlândia?",
        respostas: [
          { texto: "Reykjavik", correta: false },
          { texto: "Nuuk", correta: true },
          { texto: "Ilulissat", correta: false },
          { texto: "Qaqortoq", correta: false }
        ]
      },
      {
        pergunta: "Qual desses países não está na Península Ibérica?",
        respostas: [
          { texto: "Portugal", correta: false },
          { texto: "Espanha", correta: false },
          { texto: "Andorra", correta: false },
          { texto: "Itália", correta: true }
        ]
      },
      {
        pergunta: "Qual é o único país da América do Sul banhado pelo Caribe e Pacífico?",
        respostas: [
          { texto: "Venezuela", correta: false },
          { texto: "Colômbia", correta: true },
          { texto: "Equador", correta: false },
          { texto: "Panamá", correta: false }
        ]
      },
      {
        pergunta: "Qual é o maior país sem litoral?",
        respostas: [
          { texto: "Mongólia", correta: false },
          { texto: "Cazaquistão", correta: true },
          { texto: "Paraguai", correta: false },
          { texto: "Bolívia", correta: false }
        ]
      },
      {
        pergunta: "Qual é a única capital estadual brasileira sem praia?",
        respostas: [
          { texto: "Belo Horizonte", correta: false },
          { texto: "São Paulo", correta: true },
          { texto: "Brasília", correta: false },
          { texto: "Curitiba", correta: false }
        ]
      }
    ]
  },
  entretenimento: {
    facil: [
      {
        pergunta: "Qual é o filme mais assistido da história?",
        respostas: [
          { texto: "Avatar", correta: false },
          { texto: "Vingadores: Ultimato", correta: false },
          { texto: "Titanic", correta: false },
          { texto: "E o Vento Levou (1939)", correta: true }
        ]
      },
      {
        pergunta: "Qual cantora é conhecida como 'Rainha do Pop'?",
        respostas: [
          { texto: "Beyoncé", correta: false },
          { texto: "Madonna", correta: true },
          { texto: "Lady Gaga", correta: false },
          { texto: "Rihanna", correta: false }
        ]
      },
      {
        pergunta: "Qual é o nome do ator que interpreta Homem de Ferro nos filmes da Marvel?",
        respostas: [
          { texto: "Chris Evans", correta: false },
          { texto: "Robert Downey Jr.", correta: true },
          { texto: "Chris Hemsworth", correta: false },
          { texto: "Mark Ruffalo", correta: false }
        ]
      },
      {
        pergunta: "Qual série detém o recorde de maior número de Emmys?",
        respostas: [
          { texto: "Game of Thrones", correta: true },
          { texto: "Friends", correta: false },
          { texto: "Breaking Bad", correta: false },
          { texto: "The Office", correta: false }
        ]
      },
      {
        pergunta: "Qual destes não é um serviço de streaming?",
        respostas: [
          { texto: "Netflix", correta: false },
          { texto: "Disney+", correta: false },
          { texto: "Spotify", correta: true },
          { texto: "HBO Max", correta: false }
        ]
      },
      {
        pergunta: "Qual cantor é conhecido como 'Rei do Pop'?",
        respostas: [
          { texto: "Elvis Presley", correta: false },
          { texto: "Michael Jackson", correta: true },
          { texto: "Prince", correta: false },
          { texto: "Justin Timberlake", correta: false }
        ]
      },
      {
        pergunta: "Qual destes filmes ganhou o Oscar de Melhor Filme em 2020?",
        respostas: [
          { texto: "Parasita", correta: true },
          { texto: "1917", correta: false },
          { texto: "Joker", correta: false },
          { texto: "Coringa", correta: false }
        ]
      },
      {
        pergunta: "Qual é o nome do protagonista de 'Breaking Bad'?",
        respostas: [
          { texto: "Saul Goodman", correta: false },
          { texto: "Walter White", correta: true },
          { texto: "Jesse Pinkman", correta: false },
          { texto: "Hank Schrader", correta: false }
        ]
      },
      {
        pergunta: "Qual banda lançou o álbum 'The Dark Side of the Moon'?",
        respostas: [
          { texto: "The Beatles", correta: false },
          { texto: "Led Zeppelin", correta: false },
          { texto: "Pink Floyd", correta: true },
          { texto: "Rolling Stones", correta: false }
        ]
      },
      {
        pergunta: "Qual destes não é um personagem da Disney?",
        respostas: [
          { texto: "Mickey Mouse", correta: false },
          { texto: "Pica-Pau", correta: true },
          { texto: "Pato Donald", correta: false },
          { texto: "Pateta", correta: false }
        ]
      }
    ],
    medio: [
      {
        pergunta: "Qual atriz interpretou Hermione em 'Harry Potter'?",
        respostas: [
          { texto: "Emma Stone", correta: false },
          { texto: "Emma Watson", correta: true },
          { texto: "Emma Roberts", correta: false },
          { texto: "Emmy Rossum", correta: false }
        ]
      },
      {
        pergunta: "Qual destes filmes NÃO faz parte do MCU (Universo Cinematográfico Marvel)?",
        respostas: [
          { texto: "Homem de Ferro", correta: false },
          { texto: "Homem-Aranha: Longe de Casa", correta: false },
          { texto: "Os Incríveis", correta: true },
          { texto: "Capitão América: O Primeiro Vingador", correta: false }
        ]
      },
      {
        pergunta: "Qual cantor brasileiro é conhecido como 'Rei do Rock Brasileiro'?",
        respostas: [
          { texto: "Roberto Carlos", correta: false },
          { texto: "Raul Seixas", correta: true },
          { texto: "Cazuza", correta: false },
          { texto: "Renato Russo", correta: false }
        ]
      },
      {
        pergunta: "Qual série é conhecida pelo episódio 'The Red Wedding'?",
        respostas: [
          { texto: "The Walking Dead", correta: false },
          { texto: "Game of Thrones", correta: true },
          { texto: "Stranger Things", correta: false },
          { texto: "Breaking Bad", correta: false }
        ]
      },
      {
        pergunta: "Qual destes filmes é baseado em um livro de Stephen King?",
        respostas: [
          { texto: "O Silêncio dos Inocentes", correta: false },
          { texto: "O Iluminado", correta: true },
          { texto: "Psicose", correta: false },
          { texto: "O Exorcista", correta: false }
        ]
      },
      {
        pergunta: "Qual ator interpreta o Doutor Estranho no MCU?",
        respostas: [
          { texto: "Benedict Cumberbatch", correta: true },
          { texto: "Tom Hiddleston", correta: false },
          { texto: "Martin Freeman", correta: false },
          { texto: "Idris Elba", correta: false }
        ]
      },
      {
        pergunta: "Qual destes NÃO é um filme de Quentin Tarantino?",
        respostas: [
          { texto: "Pulp Fiction", correta: false },
          { texto: "Cães de Aluguel", correta: false },
          { texto: "Bastardos Inglórios", correta: false },
          { texto: "Drive", correta: true }
        ]
      },
      {
        pergunta: "Qual cantora lançou o álbum 'Lemonade' em 2016?",
        respostas: [
          { texto: "Rihanna", correta: false },
          { texto: "Beyoncé", correta: true },
          { texto: "Taylor Swift", correta: false },
          { texto: "Adele", correta: false }
        ]
      },
      {
        pergunta: "Qual destes é um filme de animação da Pixar?",
        respostas: [
          { texto: "Shrek", correta: false },
          { texto: "Frozen", correta: false },
          { texto: "Toy Story", correta: true },
          { texto: "Madagascar", correta: false }
        ]
      },
      {
        pergunta: "Qual atriz interpretou a Princesa Leia em 'Star Wars'?",
        respostas: [
          { texto: "Carrie Fisher", correta: true },
          { texto: "Sigourney Weaver", correta: false },
          { texto: "Meryl Streep", correta: false },
          { texto: "Glenn Close", correta: false }
        ]
      }
    ],
    dificil: [
      {
        pergunta: "Qual diretor brasileiro dirigiu 'Cidade de Deus'?",
        respostas: [
          { texto: "Walter Salles", correta: false },
          { texto: "Fernando Meirelles", correta: true },
          { texto: "José Padilha", correta: false },
          { texto: "Bruno Barreto", correta: false }
        ]
      },
      {
        pergunta: "Qual ator interpretou o Coringa no filme de 2019?",
        respostas: [
          { texto: "Heath Ledger", correta: false },
          { texto: "Jared Leto", correta: false },
          { texto: "Joaquin Phoenix", correta: true },
          { texto: "Jack Nicholson", correta: false }
        ]
      },
      {
        pergunta: "Qual é o único filme de animação a ser indicado ao Oscar de Melhor Filme?",
        respostas: [
          { texto: "Toy Story 3", correta: false },
          { texto: "Up - Altas Aventuras", correta: false },
          { texto: "A Bela e a Fera", correta: false },
          { texto: "Beauty and the Beast (1991)", correta: true }
        ]
      },
      {
        pergunta: "Qual cantor compôs a música 'Bohemian Rhapsody'?",
        respostas: [
          { texto: "John Lennon", correta: false },
          { texto: "Freddie Mercury", correta: true },
          { texto: "Elton John", correta: false },
          { texto: "David Bowie", correta: false }
        ]
      },
      {
        pergunta: "Qual destes filmes NÃO ganhou o Oscar de Melhor Filme?",
        respostas: [
          { texto: "O Poderoso Chefão", correta: false },
          { texto: "Tubarão", correta: true },
          { texto: "Forrest Gump", correta: false },
          { texto: "O Senhor dos Anéis: O Retorno do Rei", correta: false }
        ]
      },
      {
        pergunta: "Qual atriz ganhou mais Oscars de Melhor Atriz?",
        respostas: [
          { texto: "Meryl Streep", correta: false },
          { texto: "Katharine Hepburn", correta: true },
          { texto: "Ingrid Bergman", correta: false },
          { texto: "Bette Davis", correta: false }
        ]
      },
      {
        pergunta: "Qual destes filmes foi o primeiro longa-metragem totalmente em computação gráfica?",
        respostas: [
          { texto: "Toy Story", correta: true },
          { texto: "Shrek", correta: false },
          { texto: "Procurando Nemo", correta: false },
          { texto: "Os Incríveis", correta: false }
        ]
      },
      {
        pergunta: "Qual série tem o episódio mais caro já produzido (US$ 15 milhões)?",
        respostas: [
          { texto: "Game of Thrones", correta: false },
          { texto: "The Crown", correta: false },
          { texto: "Stranger Things", correta: false },
          { texto: "Senhor dos Anéis: Os Anéis de Poder", correta: true }
        ]
      },
      {
        pergunta: "Qual destes filmes NÃO foi dirigido por Steven Spielberg?",
        respostas: [
          { texto: "Jurassic Park", correta: false },
          { texto: "ET - O Extraterrestre", correta: false },
          { texto: "Cidadão Kane", correta: true },
          { texto: "Indiana Jones", correta: false }
        ]
      },
      {
        pergunta: "Qual cantora brasileira foi a primeira a se apresentar no Rock in Rio?",
        respostas: [
          { texto: "Rita Lee", correta: false },
          { texto: "Elis Regina", correta: false },
          { texto: "Gal Costa", correta: false },
          { texto: "Baby do Brasil", correta: true }
        ]
      }
    ]
  },
  esportes: {
    facil: [
      {
        pergunta: "Quantos jogadores tem um time de futebol?",
        respostas: [
          { texto: "10", correta: false },
          { texto: "11", correta: true },
          { texto: "12", correta: false },
          { texto: "9", correta: false }
        ]
      },
      {
        pergunta: "Qual país ganhou a Copa do Mundo de 2018?",
        respostas: [
          { texto: "Alemanha", correta: false },
          { texto: "Brasil", correta: false },
          { texto: "França", correta: true },
          { texto: "Argentina", correta: false }
        ]
      },
      {
        pergunta: "Qual esporte é conhecido como 'esporte rei'?",
        respostas: [
          { texto: "Basquete", correta: false },
          { texto: "Futebol", correta: true },
          { texto: "Tênis", correta: false },
          { texto: "Vôlei", correta: false }
        ]
      },
      {
        pergunta: "Quantos sets tem uma partida de tênis em Grand Slams masculinos?",
        respostas: [
          { texto: "3", correta: false },
          { texto: "5", correta: true },
          { texto: "7", correta: false },
          { texto: "4", correta: false }
        ]
      },
      {
        pergunta: "Qual time de futebol é conhecido como 'La Pulga'?",
        respostas: [
          { texto: "Cristiano Ronaldo", correta: false },
          { texto: "Lionel Messi", correta: true },
          { texto: "Neymar", correta: false },
          { texto: "Ronaldinho Gaúcho", correta: false }
        ]
      },
      {
        pergunta: "Quantas medalhas de ouro o Brasil tem nos Jogos Olímpicos?",
        respostas: [
          { texto: "10", correta: false },
          { texto: "37", correta: true },
          { texto: "25", correta: false },
          { texto: "50", correta: false }
        ]
      },
      {
        pergunta: "Qual esporte usa um shuttlecock?",
        respostas: [
          { texto: "Tênis", correta: false },
          { texto: "Badminton", correta: true },
          { texto: "Squash", correta: false },
          { texto: "Vôlei", correta: false }
        ]
      },
      {
        pergunta: "Qual time venceu a Libertadores em 2022?",
        respostas: [
          { texto: "Palmeiras", correta: false },
          { texto: "Flamengo", correta: true },
          { texto: "Atlético-MG", correta: false },
          { texto: "Corinthians", correta: false }
        ]
      },
      {
        pergunta: "Quantos jogadores tem um time de basquete em quadra?",
        respostas: [
          { texto: "4", correta: false },
          { texto: "5", correta: true },
          { texto: "6", correta: false },
          { texto: "7", correta: false }
        ]
      },
      {
        pergunta: "Qual nadador tem mais medalhas olímpicas?",
        respostas: [
          { texto: "Michael Phelps", correta: true },
          { texto: "Mark Spitz", correta: false },
          { texto: "Ian Thorpe", correta: false },
          { texto: "César Cielo", correta: false }
        ]
      }
    ],
    medio: [
      {
        pergunta: "Qual país sediou as Olimpíadas de 2016?",
        respostas: [
          { texto: "Japão", correta: false },
          { texto: "Brasil", correta: true },
          { texto: "Inglaterra", correta: false },
          { texto: "China", correta: false }
        ]
      },
      {
        pergunta: "Qual jogador brasileiro é conhecido como 'Fenômeno'?",
        respostas: [
          { texto: "Ronaldo", correta: true },
          { texto: "Ronaldinho Gaúcho", correta: false },
          { texto: "Romário", correta: false },
          { texto: "Pelé", correta: false }
        ]
      },
      {
        pergunta: "Qual time tem mais títulos da Champions League?",
        respostas: [
          { texto: "Barcelona", correta: false },
          { texto: "Real Madrid", correta: true },
          { texto: "Bayern de Munique", correta: false },
          { texto: "Liverpool", correta: false }
        ]
      },
      {
        pergunta: "Quantos Grand Slams Roger Federer venceu?",
        respostas: [
          { texto: "15", correta: false },
          { texto: "20", correta: true },
          { texto: "25", correta: false },
          { texto: "30", correta: false }
        ]
      },
      {
        pergunta: "Qual país inventou o futebol?",
        respostas: [
          { texto: "Brasil", correta: false },
          { texto: "Estados Unidos", correta: false },
          { texto: "Inglaterra", correta: true },
          { texto: "Alemanha", correta: false }
        ]
      },
      {
        pergunta: "Qual esporte usa um bastão e uma bola pequena?",
        respostas: [
          { texto: "Beisebol", correta: true },
          { texto: "Críquete", correta: false },
          { texto: "Hóquei", correta: false },
          { texto: "Golfe", correta: false }
        ]
      },
      {
        pergunta: "Qual atleta tem o recorde mundial dos 100m rasos?",
        respostas: [
          { texto: "Usain Bolt", correta: true },
          { texto: "Carl Lewis", correta: false },
          { texto: "Asafa Powell", correta: false },
          { texto: "Justin Gatlin", correta: false }
        ]
      },
      {
        pergunta: "Qual time brasileiro tem mais títulos mundiais?",
        respostas: [
          { texto: "Flamengo", correta: false },
          { texto: "São Paulo", correta: false },
          { texto: "Santos", correta: false },
          { texto: "Corinthians", correta: true }
        ]
      },
      {
        pergunta: "Quantos jogadores tem um time de vôlei em quadra?",
        respostas: [
          { texto: "5", correta: false },
          { texto: "6", correta: true },
          { texto: "7", correta: false },
          { texto: "8", correta: false }
        ]
      },
      {
        pergunta: "Qual país ganhou mais Copas do Mundo?",
        respostas: [
          { texto: "Alemanha", correta: false },
          { texto: "Brasil", correta: true },
          { texto: "Itália", correta: false },
          { texto: "Argentina", correta: false }
        ]
      }
    ],
    dificil: [
      {
        pergunta: "Qual jogador tem mais gols em Copas do Mundo?",
        respostas: [
          { texto: "Pelé", correta: false },
          { texto: "Miroslav Klose", correta: true },
          { texto: "Ronaldo", correta: false },
          { texto: "Gerd Müller", correta: false }
        ]
      },
      {
        pergunta: "Qual tenista tem o recorde de semanas como número 1 do ranking ATP?",
        respostas: [
          { texto: "Roger Federer", correta: false },
          { texto: "Rafael Nadal", correta: false },
          { texto: "Novak Djokovic", correta: true },
          { texto: "Pete Sampras", correta: false }
        ]
      },
      {
        pergunta: "Qual país venceu o primeiro Mundial de Clubes da FIFA?",
        respostas: [
          { texto: "Brasil", correta: true },
          { texto: "Espanha", correta: false },
          { texto: "Itália", correta: false },
          { texto: "Inglaterra", correta: false }
        ]
      },
      {
        pergunta: "Qual nadador brasileiro ganhou ouro nos 50m livre em 2016?",
        respostas: [
          { texto: "César Cielo", correta: false },
          { texto: "Bruno Fratus", correta: false },
          { texto: "Nicholas Santos", correta: false },
          { texto: "Nenhum, foi em 2012", correta: true }
        ]
      },
      {
        pergunta: "Qual jogador fez o gol do título brasileiro na Copa de 2002?",
        respostas: [
          { texto: "Ronaldo", correta: true },
          { texto: "Rivaldo", correta: false },
          { texto: "Ronaldinho Gaúcho", correta: false },
          { texto: "Cafu", correta: false }
        ]
      },
      {
        pergunta: "Qual time venceu a primeira edição da Libertadores?",
        respostas: [
          { texto: "Peñarol", correta: true },
          { texto: "Santos", correta: false },
          { texto: "Independiente", correta: false },
          { texto: "Boca Juniors", correta: false }
        ]
      },
      {
        pergunta: "Qual atleta tem o recorde mundial do salto triplo?",
        respostas: [
          { texto: "Mike Powell", correta: false },
          { texto: "Jonathan Edwards", correta: true },
          { texto: "Carl Lewis", correta: false },
          { texto: "Usain Bolt", correta: false }
        ]
      },
      {
        pergunta: "Qual país sediou a primeira Copa do Mundo?",
        respostas: [
          { texto: "Brasil", correta: false },
          { texto: "Uruguai", correta: true },
          { texto: "Itália", correta: false },
          { texto: "França", correta: false }
        ]
      },
      {
        pergunta: "Qual jogador fez mais gols em uma única edição da Champions League?",
        respostas: [
          { texto: "Lionel Messi", correta: false },
          { texto: "Cristiano Ronaldo", correta: true },
          { texto: "Robert Lewandowski", correta: false },
          { texto: "Karim Benzema", correta: false }
        ]
      },
      {
        pergunta: "Qual time tem mais títulos do Campeonato Brasileiro?",
        respostas: [
          { texto: "Flamengo", correta: false },
          { texto: "Palmeiras", correta: true },
          { texto: "Santos", correta: false },
          { texto: "São Paulo", correta: false }
        ]
      }
    ]
  },
  tecnologia: {
    facil: [
      {
        pergunta: "Qual empresa criou o iPhone?",
        respostas: [
          { texto: "Microsoft", correta: false },
          { texto: "Samsung", correta: false },
          { texto: "Apple", correta: true },
          { texto: "Google", correta: false }
        ]
      },
      {
        pergunta: "Qual destes não é um sistema operacional?",
        respostas: [
          { texto: "Windows", correta: false },
          { texto: "Linux", correta: false },
          { texto: "Android", correta: false },
          { texto: "Firefox", correta: true }
        ]
      },
      {
        pergunta: "Qual empresa criou o Windows?",
        respostas: [
          { texto: "Apple", correta: false },
          { texto: "Microsoft", correta: true },
          { texto: "Google", correta: false },
          { texto: "IBM", correta: false }
        ]
      },
      {
        pergunta: "O que significa 'www' em um site?",
        respostas: [
          { texto: "World Wide Web", correta: true },
          { texto: "World Web Wide", correta: false },
          { texto: "Web World Wide", correta: false },
          { texto: "Wide World Web", correta: false }
        ]
      },
      {
        pergunta: "Qual destes não é um navegador de internet?",
        respostas: [
          { texto: "Chrome", correta: false },
          { texto: "Firefox", correta: false },
          { texto: "Edge", correta: false },
          { texto: "WhatsApp", correta: true }
        ]
      },
      {
        pergunta: "Qual empresa comprou o WhatsApp em 2014?",
        respostas: [
          { texto: "Google", correta: false },
          { texto: "Facebook", correta: true },
          { texto: "Microsoft", correta: false },
          { texto: "Apple", correta: false }
        ]
      },
      {
        pergunta: "Qual linguagem de programação é usada para estilizar páginas web?",
        respostas: [
          { texto: "HTML", correta: false },
          { texto: "JavaScript", correta: false },
          { texto: "CSS", correta: true },
          { texto: "Python", correta: false }
        ]
      },
      {
        pergunta: "Qual destes é um sistema operacional móvel?",
        respostas: [
          { texto: "Windows", correta: false },
          { texto: "iOS", correta: true },
          { texto: "Linux", correta: false },
          { texto: "macOS", correta: false }
        ]
      },
      {
        pergunta: "O que significa 'PDF'?",
        respostas: [
          { texto: "Portable Document Format", correta: true },
          { texto: "Personal Data File", correta: false },
          { texto: "Printable Document Format", correta: false },
          { texto: "Public Document File", correta: false }
        ]
      },
      {
        pergunta: "Qual empresa desenvolveu o Android?",
        respostas: [
          { texto: "Apple", correta: false },
          { texto: "Microsoft", correta: false },
          { texto: "Google", correta: true },
          { texto: "Samsung", correta: false }
        ]
      }
    ],
    medio: [
      {
        pergunta: "Qual foi o primeiro vírus de computador?",
        respostas: [
          { texto: "ILOVEYOU", correta: false },
          { texto: "Creeper", correta: true },
          { texto: "Melissa", correta: false },
          { texto: "WannaCry", correta: false }
        ]
      },
      {
        pergunta: "Qual linguagem de programação foi criada por Guido van Rossum?",
        respostas: [
          { texto: "Java", correta: false },
          { texto: "Python", correta: true },
          { texto: "C++", correta: false },
          { texto: "JavaScript", correta: false }
        ]
      },
      {
        pergunta: "Qual empresa criou o primeiro computador pessoal?",
        respostas: [
          { texto: "Apple", correta: false },
          { texto: "IBM", correta: true },
          { texto: "Microsoft", correta: false },
          { texto: "HP", correta: false }
        ]
      },
      {
        pergunta: "O que significa 'HTTP'?",
        respostas: [
          { texto: "HyperText Transfer Protocol", correta: true },
          { texto: "High Transfer Text Protocol", correta: false },
          { texto: "Hyper Transfer Text Protocol", correta: false },
          { texto: "High Text Transfer Protocol", correta: false }
        ]
      },
      {
        pergunta: "Qual destes não é um banco de dados?",
        respostas: [
          { texto: "MySQL", correta: false },
          { texto: "PostgreSQL", correta: false },
          { texto: "MongoDB", correta: false },
          { texto: "Node.js", correta: true }
        ]
      },
      {
        pergunta: "Qual foi o primeiro smartphone com Android?",
        respostas: [
          { texto: "HTC Dream", correta: true },
          { texto: "Samsung Galaxy", correta: false },
          { texto: "Motorola Droid", correta: false },
          { texto: "Google Pixel", correta: false }
        ]
      },
      {
        pergunta: "Qual empresa criou o processador Ryzen?",
        respostas: [
          { texto: "Intel", correta: false },
          { texto: "AMD", correta: true },
          { texto: "NVIDIA", correta: false },
          { texto: "Qualcomm", correta: false }
        ]
      },
      {
        pergunta: "O que significa 'AI' em tecnologia?",
        respostas: [
          { texto: "Artificial Intelligence", correta: true },
          { texto: "Automated Interface", correta: false },
          { texto: "Advanced Internet", correta: false },
          { texto: "Algorithmic Integration", correta: false }
        ]
      },
      {
        pergunta: "Qual destes é um framework JavaScript?",
        respostas: [
          { texto: "Django", correta: false },
          { texto: "React", correta: true },
          { texto: "Flask", correta: false },
          { texto: "Laravel", correta: false }
        ]
      },
      {
        pergunta: "Qual linguagem é usada para desenvolver apps Android nativos?",
        respostas: [
          { texto: "Swift", correta: false },
          { texto: "Kotlin", correta: true },
          { texto: "C#", correta: false },
          { texto: "Ruby", correta: false }
        ]
      }
    ],
    dificil: [
      {
        pergunta: "Qual foi o primeiro domínio registrado na internet?",
        respostas: [
          { texto: "google.com", correta: false },
          { texto: "symbolics.com", correta: true },
          { texto: "apple.com", correta: false },
          { texto: "ibm.com", correta: false }
        ]
      },
      {
        pergunta: "Qual linguagem foi usada para criar o sistema operacional Unix?",
        respostas: [
          { texto: "C", correta: true },
          { texto: "Assembly", correta: false },
          { texto: "Fortran", correta: false },
          { texto: "Pascal", correta: false }
        ]
      },
      {
        pergunta: "Quantos bits tem um IPv6?",
        respostas: [
          { texto: "32", correta: false },
          { texto: "64", correta: false },
          { texto: "128", correta: true },
          { texto: "256", correta: false }
        ]
      },
      {
        pergunta: "Qual algoritmo é usado no Bitcoin?",
        respostas: [
          { texto: "SHA-256", correta: true },
          { texto: "RSA", correta: false },
          { texto: "AES", correta: false },
          { texto: "Blowfish", correta: false }
        ]
      },
      {
        pergunta: "Qual foi o primeiro vírus a infectar um smartphone?",
        respostas: [
          { texto: "Cabir", correta: true },
          { texto: "Skulls", correta: false },
          { texto: "Commwarrior", correta: false },
          { texto: "Ikee", correta: false }
        ]
      },
      {
        pergunta: "Qual empresa desenvolveu o primeiro SSD comercial?",
        respostas: [
          { texto: "Intel", correta: false },
          { texto: "Samsung", correta: false },
          { texto: "SanDisk", correta: true },
          { texto: "Western Digital", correta: false }
        ]
      },
      {
        pergunta: "Qual protocolo é usado para emails seguros?",
        respostas: [
          { texto: "SMTP", correta: false },
          { texto: "POP3", correta: false },
          { texto: "IMAP", correta: false },
          { texto: "SSL/TLS", correta: true }
        ]
      },
      {
        pergunta: "Qual linguagem foi usada para criar o Facebook original?",
        respostas: [
          { texto: "Java", correta: false },
          { texto: "Python", correta: false },
          { texto: "PHP", correta: true },
          { texto: "Ruby", correta: false }
        ]
      },
      {
        pergunta: "Qual foi o primeiro computador com mouse?",
        respostas: [
          { texto: "Apple Lisa", correta: true },
          { texto: "Macintosh", correta: false },
          { texto: "IBM PC", correta: false },
          { texto: "Commodore 64", correta: false }
        ]
      },
      {
        pergunta: "Qual destes não é um paradigma de programação?",
        respostas: [
          { texto: "Orientação a Objetos", correta: false },
          { texto: "Funcional", correta: false },
          { texto: "Lógico", correta: false },
          { texto: "Binário", correta: true }
        ]
      }
    ]
  }
};

// Inicialização
function init() {
  console.log("Inicializando o quiz...");
  
  // Verifica se todos os elementos necessários existem
  if (!elements.startBtn) {
    console.error("Botão 'Começar Quiz' não encontrado!");
    return;
  }

  setupEventListeners();
  loadHighScores();
  checkThemePreference();
  
  // Seleciona a primeira categoria e dificuldade por padrão
  if (elements.categoryCards.length > 0) {
    elements.categoryCards[0].click();
  }
  if (elements.difficultyBtns.length > 0) {
    elements.difficultyBtns[0].click();
  }
  
  console.log("Quiz inicializado com sucesso!");
}

// Configura eventos
function setupEventListeners() {
  // Categorias
  elements.categoryCards.forEach(card => {
    card.addEventListener('click', () => selectCategory(card));
  });

  // Dificuldade
  elements.difficultyBtns.forEach(btn => {
    btn.addEventListener('click', () => selectDifficulty(btn));
  });

  // Botão Começar Quiz - Versão reforçada
  elements.startBtn.addEventListener('click', function(e) {
    console.log("Botão Começar Quiz clicado");
    e.preventDefault();
    startQuiz();
  });

  // Outros botões
  elements.nextQuestionBtn.addEventListener('click', nextQuestion);
  elements.retryBtn.addEventListener('click', retryQuiz);
  elements.newQuizBtn.addEventListener('click', newQuiz);
  elements.shareBtn.addEventListener('click', shareResults);
  elements.themeToggle.addEventListener('click', toggleTheme);

  // Fallback para event delegation
  document.body.addEventListener('click', function(e) {
    if (e.target.closest('.start-btn')) {
      e.preventDefault();
      console.log("Botão Começar Quiz clicado via event delegation");
      startQuiz();
    }
  });
}

// Controle de tema
function checkThemePreference() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    document.body.dataset.theme = savedTheme;
  } else if (prefersDark) {
    document.body.dataset.theme = 'dark';
  }
}

function toggleTheme() {
  const newTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  document.body.dataset.theme = newTheme;
  localStorage.setItem('theme', newTheme);
}

// Seleção de categoria
function selectCategory(card) {
  console.log(`Selecionando categoria: ${card.dataset.category}`);
  elements.categoryCards.forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  state.currentCategory = card.dataset.category;
}

// Seleção de dificuldade
function selectDifficulty(btn) {
  console.log(`Selecionando dificuldade: ${btn.dataset.difficulty}`);
  elements.difficultyBtns.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.currentDifficulty = btn.dataset.difficulty;
}

// Inicia o quiz (versão com validação reforçada)
function startQuiz() {
  console.log("Iniciando quiz... Estado atual:", state);
  
  // Validações
  if (!state.currentCategory) {
    console.error("Nenhuma categoria selecionada!");
    alert("Por favor, selecione uma categoria antes de começar!");
    return;
  }

  if (!state.currentDifficulty) {
    console.error("Nenhuma dificuldade selecionada!");
    alert("Por favor, selecione uma dificuldade!");
    return;
  }

  // Verifica se existem perguntas para a categoria/dificuldade selecionada
  if (!questionBank[state.currentCategory] || !questionBank[state.currentCategory][state.currentDifficulty]) {
    console.error(`Nenhuma pergunta encontrada para ${state.currentCategory} - ${state.currentDifficulty}`);
    alert("Configuração de perguntas não encontrada para esta combinação!");
    return;
  }

  const availableQuestions = questionBank[state.currentCategory][state.currentDifficulty].length;
  if (availableQuestions < config.questionsPerGame) {
    console.error(`Perguntas insuficientes: ${availableQuestions} disponíveis`);
    alert(`Não há perguntas suficientes (${availableQuestions}) para esta combinação!`);
    return;
  }

  // Prepara o jogo
  state.questions = [...questionBank[state.currentCategory][state.currentDifficulty]]
    .sort(() => Math.random() - 0.5)
    .slice(0, config.questionsPerGame);
  
  state.currentQuestionIndex = 0;
  state.score = 0;
  state.correctAnswers = 0;
  state.gameStarted = true;

  console.log(`Perguntas carregadas: ${state.questions.length}`);

  // Atualiza UI
  elements.quizCategory.textContent = state.currentCategory;
  elements.quizDifficulty.textContent = state.currentDifficulty;
  elements.totalQuestionsEl.textContent = config.questionsPerGame;
  elements.scoreCounter.textContent = "0";
  
  // Transição entre telas
  try {
    elements.homeScreen.classList.remove('active');
    elements.quizScreen.classList.add('active');
    elements.resultsScreen.classList.remove('active');
    console.log("Transição de telas realizada com sucesso");
  } catch (e) {
    console.error("Erro na transição de telas:", e);
  }

  // Carrega primeira pergunta
  loadQuestion();
}

// Carrega pergunta atual
function loadQuestion() {
  console.log(`Carregando pergunta ${state.currentQuestionIndex + 1}`);
  
  clearInterval(state.timer);
  state.timeLeft = config.baseTime;
  state.selectedAnswer = null;
  
  const question = state.questions[state.currentQuestionIndex];
  
  // Atualiza UI
  elements.currentQuestionEl.textContent = state.currentQuestionIndex + 1;
  elements.questionText.textContent = question.pergunta;
  elements.progressFill.style.width = `${((state.currentQuestionIndex) / config.questionsPerGame) * 100}%`;
  elements.timeCounter.textContent = state.timeLeft;
  
  // Limpa respostas anteriores
  elements.answersGrid.innerHTML = '';
  
  // Adiciona novas respostas
  question.respostas.forEach((resposta, index) => {
    const answerElement = document.createElement('button');
    answerElement.className = 'answer-option';
    answerElement.innerHTML = `
      <span class="option-letter">${String.fromCharCode(65 + index)}</span>
      <span class="option-text">${resposta.texto}</span>
    `;
    
    answerElement.addEventListener('click', () => selectAnswer(answerElement, resposta.correta));
    elements.answersGrid.appendChild(answerElement);
  });
  
  // Esconde feedback
  elements.quizFeedback.style.display = 'none';
  
  // Inicia timer
  startTimer();
}

// Inicia contagem regressiva
function startTimer() {
  console.log("Iniciando temporizador...");
  state.timer = setInterval(() => {
    state.timeLeft--;
    elements.timeCounter.textContent = state.timeLeft;
    
    if (state.timeLeft <= 0) {
      clearInterval(state.timer);
      handleTimeOut();
    }
  }, 1000);
}

// Seleciona resposta
function selectAnswer(element, isCorrect) {
  if (state.selectedAnswer !== null) return;
  
  console.log(`Resposta selecionada: ${isCorrect ? "Correta" : "Incorreta"}`);
  clearInterval(state.timer);
  state.selectedAnswer = isCorrect;
  
  // Estiliza resposta selecionada
  element.classList.add(isCorrect ? 'correct' : 'wrong');
  
  // Se errada, mostra a correta
  if (!isCorrect) {
    const options = elements.answersGrid.querySelectorAll('.answer-option');
    options.forEach(opt => {
      if (opt.querySelector('.option-text').textContent === 
          state.questions[state.currentQuestionIndex].respostas.find(r => r.correta).texto) {
        opt.classList.add('correct');
      }
    });
  }
  
  // Atualiza pontuação
  if (isCorrect) {
    state.score += state.timeLeft * config.pointsPerSecond;
    state.correctAnswers++;
    elements.scoreCounter.textContent = state.score;
    console.log(`Pontuação atualizada: ${state.score}`);
  }
  
  // Mostra feedback e botão de próxima pergunta
  elements.quizFeedback.style.display = 'block';
}

// Tempo esgotado
function handleTimeOut() {
  console.log("Tempo esgotado!");
  const options = elements.answersGrid.querySelectorAll('.answer-option');
  options.forEach(opt => {
    if (opt.querySelector('.option-text').textContent === 
        state.questions[state.currentQuestionIndex].respostas.find(r => r.correta).texto) {
      opt.classList.add('correct');
    }
  });
  
  elements.quizFeedback.style.display = 'block';
}

// Próxima pergunta
function nextQuestion() {
  console.log("Indo para próxima pergunta...");
  state.currentQuestionIndex++;
  
  if (state.currentQuestionIndex < config.questionsPerGame) {
    loadQuestion();
  } else {
    endGame();
  }
}

// Finaliza o jogo
function endGame() {
  console.log("Finalizando jogo...");
  // Calcula resultados
  const percentage = Math.round((state.correctAnswers / config.questionsPerGame) * 100);
  
  // Atualiza UI
  elements.resultsScore.textContent = percentage;
  elements.correctAnswersEl.textContent = state.correctAnswers;
  elements.wrongAnswersEl.textContent = config.questionsPerGame - state.correctAnswers;
  elements.totalScoreEl.textContent = state.score;
  
  console.log(`Resultados: ${percentage}% de acertos, ${state.score} pontos`);
  
  // Atualiza ranking
  updateHighScores();
  
  // Mostra tela de resultados
  elements.quizScreen.classList.remove('active');
  elements.resultsScreen.classList.add('active');
  
  // Renderiza gráfico (opcional)
  renderResultsChart();
}

// Atualiza recordes
function updateHighScores() {
  console.log("Atualizando recordes...");
  state.highScores.push({
    category: state.currentCategory,
    difficulty: state.currentDifficulty,
    score: state.score,
    date: new Date().toLocaleDateString()
  });
  
  // Ordena e mantém apenas os melhores
  state.highScores.sort((a, b) => b.score - a.score);
  state.highScores = state.highScores.slice(0, config.maxHighScores);
  
  // Salva no localStorage
  localStorage.setItem('highScores', JSON.stringify(state.highScores));
  
  // Atualiza UI
  renderHighScores();
}

// Renderiza ranking
function renderHighScores() {
  console.log("Renderizando ranking...");
  elements.leaderboardList.innerHTML = '';
  
  state.highScores.forEach((score, index) => {
    const scoreElement = document.createElement('li');
    scoreElement.className = 'leaderboard-item';
    scoreElement.innerHTML = `
      <span class="player-name">${index + 1}. ${score.category} (${score.difficulty})</span>
      <span class="player-score">${score.score} pts</span>
    `;
    elements.leaderboardList.appendChild(scoreElement);
  });
}

// Renderiza gráfico de resultados (opcional)
function renderResultsChart() {
  console.log("Renderizando gráfico de resultados...");
  const ctx = document.getElementById('resultsChart')?.getContext('2d');
  if (!ctx) {
    console.warn("Canvas do gráfico não encontrado");
    return;
  }
  
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Acertos', 'Erros'],
      datasets: [{
        data: [state.correctAnswers, config.questionsPerGame - state.correctAnswers],
        backgroundColor: ['#4cc9f0', '#f72585'],
        borderWidth: 0
      }]
    },
    options: {
      cutout: '70%',
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

// Reinicia o quiz
function retryQuiz() {
  console.log("Reiniciando quiz...");
  elements.resultsScreen.classList.remove('active');
  elements.quizScreen.classList.add('active');
  
  state.currentQuestionIndex = 0;
  state.score = 0;
  state.correctAnswers = 0;
  
  elements.scoreCounter.textContent = '0';
  loadQuestion();
}

// Novo quiz
function newQuiz() {
  console.log("Iniciando novo quiz...");
  elements.resultsScreen.classList.remove('active');
  elements.homeScreen.classList.add('active');
}

// Compartilha resultados
function shareResults() {
  console.log("Compartilhando resultados...");
  if (navigator.share) {
    navigator.share({
      title: 'Meus resultados no Super Quiz',
      text: `Acabei de fazer ${state.correctAnswers}/${config.questionsPerGame} no quiz de ${state.currentCategory} (${state.currentDifficulty})! Pontuação: ${state.score}`,
      url: window.location.href
    }).catch(err => {
      console.log('Erro ao compartilhar:', err);
      fallbackShare();
    });
  } else {
    fallbackShare();
  }
}

// Fallback para compartilhamento
function fallbackShare() {
  const shareText = `Meus resultados no Super Quiz: ${state.correctAnswers}/${config.questionsPerGame} acertos no quiz de ${state.currentCategory} (${state.currentDifficulty})! Pontuação: ${state.score}`;
  alert('Copie o texto para compartilhar:\n\n' + shareText);
}

// Carrega recordes
function loadHighScores() {
  console.log("Carregando recordes...");
  renderHighScores();
}

// Inicia a aplicação
document.addEventListener('DOMContentLoaded', init);

// Debug: Exibe estado global no console
window.debugState = function() {
  console.log("Estado atual:", state);
};

particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 100,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#000000",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        }
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });