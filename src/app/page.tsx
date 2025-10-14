'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckCircle, MessageCircle, Heart, Zap, Target, Phone, Video } from 'lucide-react'

interface QuizAnswer {
  question: number
  answer: string
}

export default function WhatsAppFunnel() {
  const [currentStep, setCurrentStep] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [userProfile, setUserProfile] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const steps = [
    'welcome',
    'quiz',
    'result',
    'transition',
    'final'
  ]

  const questions = [
    {
      text: "Quando pensa em emagrecer, qual é a sua maior dificuldade hoje?",
      options: [
        { value: 'A', text: 'Falta de tempo pra cuidar da alimentação' },
        { value: 'B', text: 'Ansiedade e compulsão por doces' },
        { value: 'C', text: 'Falta de foco e desistência rápida' },
        { value: 'D', text: 'Já tentei de tudo, mas nada funciona comigo' }
      ]
    },
    {
      text: "Você costuma fazer atividade física quantas vezes por semana?",
      options: [
        { value: 'A', text: 'Nenhuma — não consigo manter uma rotina' },
        { value: 'B', text: '1 a 2 vezes — mas sem regularidade' },
        { value: 'C', text: '3 ou mais — mas não vejo grandes resultados' },
        { value: 'D', text: 'Faço exercícios e sigo dieta, mas o corpo não muda' }
      ]
    },
    {
      text: "Como está sua alimentação atualmente?",
      options: [
        { value: 'A', text: 'Como de tudo, mas sem controle' },
        { value: 'B', text: 'Tento comer saudável, mas acabo escapando' },
        { value: 'C', text: 'Como bem durante a semana, e exagero no fim de semana' },
        { value: 'D', text: 'Tenho uma boa alimentação, mas o peso não muda' }
      ]
    },
    {
      text: "Você sente que suas emoções influenciam seu peso?",
      options: [
        { value: 'A', text: 'Sim, como mais quando estou ansiosa(o)' },
        { value: 'B', text: 'Às vezes, especialmente quando estou estressada(o)' },
        { value: 'C', text: 'Não muito, acho que o problema é outro' },
        { value: 'D', text: 'Não sei identificar' }
      ]
    },
    {
      text: "Qual dessas frases mais combina com você?",
      options: [
        { value: 'A', text: '"Eu sei o que preciso fazer, só não consigo manter."' },
        { value: 'B', text: '"Não sei mais em quem acreditar, já tentei de tudo."' },
        { value: 'C', text: '"Quero algo prático e rápido pra ver resultado."' },
        { value: 'D', text: '"Preciso de motivação e acompanhamento."' }
      ]
    }
  ]

  const profiles = {
    A: {
      title: 'Você é o perfil "Emocional"',
      description: 'Você sabe o que precisa fazer, mas a ansiedade e o estresse acabam sabotando seus resultados. O segredo está em **controlar suas emoções e seguir um plano leve e guiado**.',
      solution: 'É exatamente o que o **Método Secar em 20 Dias 3.0** ensina — com suporte diário no aplicativo.',
      icon: <Heart className="w-6 h-6 text-pink-500" />
    },
    B: {
      title: 'Você é o perfil "Desorganizada"',
      description: 'Você até quer mudar, mas falta constância. O problema não é falta de vontade — é **não ter um plano simples e pronto pra seguir**.',
      solution: 'No app **Secar em 20 Dias 3.0**, você tem cardápios, treinos curtos e acompanhamento diário.',
      icon: <Target className="w-6 h-6 text-blue-500" />
    },
    C: {
      title: 'Você é o perfil "Impaciente"',
      description: 'Quer resultado rápido, mas acaba desistindo antes de ver o progresso. Com o método certo, **os resultados aparecem já nos primeiros dias**.',
      solution: 'E o **Método Secar em 20 Dias 3.0** foi criado exatamente pra isso.',
      icon: <Zap className="w-6 h-6 text-yellow-500" />
    },
    D: {
      title: 'Você é o perfil "Impaciente"',
      description: 'Quer resultado rápido, mas acaba desistindo antes de ver o progresso. Com o método certo, **os resultados aparecem já nos primeiros dias**.',
      solution: 'E o **Método Secar em 20 Dias 3.0** foi criado exatamente pra isso.',
      icon: <Zap className="w-6 h-6 text-yellow-500" />
    }
  }

  const simulateTyping = (callback: () => void, delay = 2000) => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      callback()
    }, delay)
  }

  const handleAnswer = (answer: string) => {
    const newAnswer: QuizAnswer = {
      question: currentQuestion,
      answer: answer
    }
    
    setAnswers([...answers, newAnswer])
    
    if (currentQuestion < questions.length - 1) {
      simulateTyping(() => {
        setCurrentQuestion(currentQuestion + 1)
      }, 1500)
    } else {
      // Calcular perfil baseado nas respostas
      const answerCounts = { A: 0, B: 0, C: 0, D: 0 }
      answers.concat(newAnswer).forEach(ans => {
        answerCounts[ans.answer as keyof typeof answerCounts]++
      })
      
      const dominantProfile = Object.entries(answerCounts).reduce((a, b) => 
        answerCounts[a[0] as keyof typeof answerCounts] > answerCounts[b[0] as keyof typeof answerCounts] ? a : b
      )[0]
      
      setUserProfile(dominantProfile)
      
      simulateTyping(() => {
        setCurrentStep(2) // result
      }, 2000)
    }
  }

  const nextStep = () => {
    simulateTyping(() => {
      setCurrentStep(currentStep + 1)
    }, 1500)
  }

  const WhatsAppMessage = ({ children, isBot = true, delay = 0 }: { 
    children: React.ReactNode, 
    isBot?: boolean, 
    delay?: number 
  }) => {
    const [visible, setVisible] = useState(delay === 0)
    
    useEffect(() => {
      if (delay > 0) {
        const timer = setTimeout(() => setVisible(true), delay)
        return () => clearTimeout(timer)
      }
    }, [delay])

    if (!visible) return null

    return (
      <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
        <div className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-3 ${
          isBot 
            ? 'bg-white text-gray-800 rounded-bl-md shadow-md' 
            : 'bg-[#25D366] text-white rounded-br-md'
        }`}>
          {children}
        </div>
      </div>
    )
  }

  const TypingIndicator = () => (
    <div className="flex justify-start mb-4">
      <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-md">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#128C7E] to-[#25D366] p-4">
      <div className="max-w-md mx-auto">
        {/* Header estilo WhatsApp */}
        <div className="bg-[#075E54] text-white p-4 rounded-t-lg flex items-center gap-3 mb-1">
          <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-semibold">Método Secar em 20 Dias 3.0</h1>
            <p className="text-xs text-green-200">online</p>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-[#E5DDD5] min-h-[600px] p-4 rounded-b-lg" 
             style={{ backgroundImage: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"chat-bg\" x=\"0\" y=\"0\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\"><circle cx=\"10\" cy=\"10\" r=\"1\" fill=\"%23ffffff\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23chat-bg)\"/></svg>')" }}>
          
          {/* ETAPA 1 - Apresentação inicial */}
          {currentStep === 0 && (
            <>
              <WhatsAppMessage>
                <div className="space-y-2">
                  <p>👋 Oi, tudo bem?</p>
                  <p>Aqui é da equipe do <strong>Método Secar em 20 Dias 3.0</strong> 💚</p>
                </div>
              </WhatsAppMessage>
              
              <WhatsAppMessage delay={1500}>
                <div className="space-y-2">
                  <p>Você sente que tenta emagrecer, mas o resultado nunca vem?</p>
                  <p>Faça este teste rápido e descubra <strong>o que realmente está travando seu emagrecimento</strong> 👇</p>
                </div>
              </WhatsAppMessage>

              <div className="mt-6 flex justify-center">
                <Button 
                  onClick={() => setCurrentStep(1)}
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Fazer o Quiz Agora ✅
                </Button>
              </div>
            </>
          )}

          {/* ETAPA 2 - Quiz */}
          {currentStep === 1 && (
            <>
              {isTyping && <TypingIndicator />}
              
              {!isTyping && (
                <>
                  <WhatsAppMessage>
                    <div className="space-y-3">
                      <p className="font-semibold text-[#075E54]">
                        Pergunta {currentQuestion + 1} de {questions.length}
                      </p>
                      <p>{questions[currentQuestion].text}</p>
                    </div>
                  </WhatsAppMessage>

                  <div className="space-y-2 mt-4">
                    {questions[currentQuestion].options.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => handleAnswer(option.value)}
                        variant="outline"
                        className="w-full text-left justify-start p-4 h-auto bg-white hover:bg-gray-50 border-gray-200 text-gray-800"
                      >
                        <span className="font-semibold text-[#25D366] mr-2">{option.value})</span>
                        {option.text}
                      </Button>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* ETAPA 3 - Resultado */}
          {currentStep === 2 && userProfile && (
            <>
              <WhatsAppMessage>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {profiles[userProfile as keyof typeof profiles].icon}
                    <p className="font-bold text-[#075E54]">
                      🔹 {profiles[userProfile as keyof typeof profiles].title}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed">
                    {profiles[userProfile as keyof typeof profiles].description}
                  </p>
                  <p className="text-sm font-semibold text-[#25D366]">
                    👉 {profiles[userProfile as keyof typeof profiles].solution}
                  </p>
                </div>
              </WhatsAppMessage>

              <div className="mt-6 flex justify-center">
                <Button 
                  onClick={nextStep}
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-2 rounded-full"
                >
                  Continuar 💚
                </Button>
              </div>
            </>
          )}

          {/* ETAPA 4 - Transição para Oferta */}
          {currentStep === 3 && (
            <>
              {isTyping && <TypingIndicator />}
              
              {!isTyping && (
                <>
                  <WhatsAppMessage>
                    <div className="space-y-2">
                      <p>Agora que você entendeu o que está te impedindo de emagrecer, é hora de agir 💥</p>
                    </div>
                  </WhatsAppMessage>

                  <WhatsAppMessage delay={1000}>
                    <div className="space-y-2">
                      <p>O <strong>Método Secar em 20 Dias 3.0</strong> é um aplicativo prático que te guia passo a passo, com cardápios, treinos rápidos e acompanhamento diário.</p>
                    </div>
                  </WhatsAppMessage>

                  <WhatsAppMessage delay={2000}>
                    <div className="space-y-2">
                      <p>💚 Centenas de pessoas já transformaram o corpo e a autoestima em poucas semanas!</p>
                    </div>
                  </WhatsAppMessage>

                  <div className="mt-6 flex justify-center">
                    <Button 
                      onClick={nextStep}
                      className="bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-2 rounded-full"
                    >
                      Ver como funciona 👀
                    </Button>
                  </div>
                </>
              )}
            </>
          )}

          {/* ETAPA 5 - Chamada Final */}
          {currentStep === 4 && (
            <>
              {isTyping && <TypingIndicator />}
              
              {!isTyping && (
                <>
                  <WhatsAppMessage>
                    <div className="space-y-2">
                      <p className="font-semibold">💳 <strong>Quer ver como funciona na prática?</strong></p>
                      <p>Escolha uma opção abaixo 👇</p>
                    </div>
                  </WhatsAppMessage>

                  <div className="space-y-3 mt-6">
                    <Button 
                      className="w-full bg-[#FF6B6B] hover:bg-[#FF5252] text-white py-4 rounded-2xl text-left justify-start gap-3 h-auto"
                      onClick={() => window.open('#', '_blank')}
                    >
                      <Video className="w-5 h-5" />
                      <div>
                        <p className="font-semibold">🎥 Assistir Depoimentos Reais</p>
                        <p className="text-xs opacity-90 lasy-highlight">Veja transformações reais</p>
                      </div>
                    </Button>

                    <Button 
                      className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-2xl text-left justify-start gap-3 h-auto"
                      onClick={() => window.open('https://wa.me/5511999999999?text=Oi!%20Vim%20do%20quiz%20e%20quero%20saber%20mais%20sobre%20o%20Método%20Secar%20em%2020%20Dias%203.0', '_blank')}
                    >
                      <Phone className="w-5 h-5" />
                      <div>
                        <p className="font-semibold">💬 Falar no WhatsApp para Tirar Dúvidas</p>
                        <p className="text-xs opacity-90">Atendimento personalizado</p>
                      </div>
                    </Button>
                  </div>

                  <WhatsAppMessage delay={2000}>
                    <div className="bg-gradient-to-r from-orange-100 to-red-100 p-3 rounded-lg border-l-4 border-orange-500">
                      <p className="text-sm font-semibold text-orange-800">⚠️ Promoção válida apenas hoje!</p>
                      <p className="text-xs text-orange-700 mt-1">
                        Garante agora seu acesso ao app com <strong>desconto especial de lançamento</strong> e comece a secar em poucos dias!
                      </p>
                    </div>
                  </WhatsAppMessage>
                </>
              )}
            </>
          )}
        </div>

        {/* Progress Bar */}
        {currentStep <= 2 && (
          <div className="mt-4 bg-white rounded-full p-1">
            <div 
              className="bg-[#25D366] h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / 3) * 100}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  )
}