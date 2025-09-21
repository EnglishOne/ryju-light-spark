import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { CheckCircle, BookOpen, Users, MessageSquare, Clock, Award, Play, Volume2 } from "lucide-react";

interface Exercise {
  id: string;
  type: "multiple-choice" | "fill-blank" | "matching";
  question: string;
  options?: string[];
  answer: string;
  explanation?: string;
}

interface Topic {
  id: string;
  title: string;
  description: string;
  content: string;
  exercises: Exercise[];
  completed: boolean;
}

export default function EnglishGrammar() {
  const [currentTopic, setCurrentTopic] = useState<string>("nouns");
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [showResults, setShowResults] = useState<{ [key: string]: boolean }>({});
  const [progress, setProgress] = useState(25);

  const topics: Topic[] = [
    {
      id: "nouns",
      title: "Nouns (Substantivos)",
      description: "Aprenda sobre pessoas, lugares, coisas e ideias",
      content: `
        **Definição:** Substantivos são palavras que representam pessoas, lugares, coisas ou ideias.
        
        **Tipos de Substantivos:**
        - **Proper Nouns (Substantivos próprios):** London, John
        - **Common Nouns (Substantivos comuns):** city, man
        - **Countable Nouns (Substantivos contáveis):** apple, book
        - **Uncountable Nouns (Substantivos não contáveis):** water, information
        
        **Exemplos:**
        - Pessoas: teacher (professor), John (João)
        - Lugares: city (cidade), beach (praia)
        - Coisas: book (livro), car (carro)
        - Ideias: love (amor), freedom (liberdade)
      `,
      exercises: [
        {
          id: "noun1",
          type: "multiple-choice",
          question: "I saw a ____ at the park.",
          options: ["dog", "quickly", "beautiful", "running"],
          answer: "dog",
          explanation: "\"Dog\" é um substantivo (pessoa, lugar, coisa ou ideia)."
        },
        {
          id: "noun2",
          type: "fill-blank",
          question: "She loves reading ____ at the library.",
          answer: "books",
          explanation: "\"Books\" é um substantivo contável."
        },
        {
          id: "noun3",
          type: "multiple-choice",
          question: "____ is very important in life.",
          options: ["Love", "Quick", "Happily", "Running"],
          answer: "Love",
          explanation: "\"Love\" é um substantivo que representa uma ideia/sentimento."
        }
      ],
      completed: false
    },
    {
      id: "verbs",
      title: "Verbs (Verbos)",
      description: "Palavras que expressam ação, estado ou evento",
      content: `
        **Definição:** Verbos são palavras que expressam ação, estado ou evento.
        
        **Tipos de Verbos:**
        - **Action Verbs (Verbos de ação):** run, jump, eat
        - **State Verbs (Verbos de estado):** be, seem, feel
        - **Transitive Verbs (Verbos transitivos):** eat (She eats an apple)
        - **Intransitive Verbs (Verbos intransitivos):** sleep (He sleeps)
        
        **Exemplos:**
        - Ação: run (correr), eat (comer), write (escrever)
        - Estado: be (ser/estar), seem (parecer), feel (sentir)
        - Evento: happen (acontecer), occur (ocorrer)
      `,
      exercises: [
        {
          id: "verb1",
          type: "multiple-choice",
          question: "Which is an action verb?",
          options: ["beautiful", "run", "tall", "blue"],
          answer: "run",
          explanation: "\"Run\" é um verbo de ação."
        },
        {
          id: "verb2",
          type: "fill-blank",
          question: "She ____ very happy today.",
          answer: "is",
          explanation: "\"Is\" é um verbo de estado (state verb)."
        }
      ],
      completed: false
    },
    {
      id: "tenses",
      title: "Verb Tenses (Tempos Verbais)",
      description: "Present, Past e Future",
      content: `
        **Present Tense (Presente):**
        - Estrutura: Subject + Verb
        - Exemplo: I work every day.
        
        **Past Tense (Passado):**
        - Estrutura: Subject + Verb (past form)
        - Exemplo: I worked yesterday.
        
        **Future Tense (Futuro):**
        - Estrutura: Subject + will + Verb
        - Exemplo: I will work tomorrow.
      `,
      exercises: [
        {
          id: "tense1",
          type: "fill-blank",
          question: "I _______ (work) in a hospital.",
          answer: "work",
          explanation: "Presente simples - terceira pessoa do singular."
        },
        {
          id: "tense2",
          type: "multiple-choice",
          question: "They _______ the movie last night.",
          options: ["watched", "watch", "will watch"],
          answer: "watched",
          explanation: "\"Last night\" indica passado."
        },
        {
          id: "tense3",
          type: "fill-blank",
          question: "I _______ the report tomorrow.",
          answer: "will write",
          explanation: "\"Tomorrow\" indica futuro - use 'will'."
        }
      ],
      completed: false
    },
    {
      id: "articles",
      title: "Articles (Artigos)",
      description: "A, An, The - quando usar cada um",
      content: `
        **Artigos Indefinidos (A/An):**
        - Use "a" antes de sons de consoante: a dog, a car
        - Use "an" antes de sons de vogal: an apple, an umbrella
        
        **Artigo Definido (The):**
        - Use quando se referir a algo específico
        - Exemplo: I saw the movie (um filme específico)
        
        **Regras importantes:**
        - A/An é usado com substantivos contáveis no singular
        - The é usado com substantivos específicos (singular ou plural)
      `,
      exercises: [
        {
          id: "article1",
          type: "multiple-choice",
          question: "I need ___ apple from the fridge.",
          options: ["a", "an", "the"],
          answer: "an",
          explanation: "\"Apple\" começa com som de vogal, então use \"an\"."
        },
        {
          id: "article2",
          type: "multiple-choice",
          question: "She has ___ dog and ___ cat.",
          options: ["a, an", "an, a", "a, a"],
          answer: "a, an",
          explanation: "\"Dog\" usa \"a\", \"cat\" usa \"an\" (som de consoante vs vogal)."
        }
      ],
      completed: false
    }
  ];

  const currentTopicData = topics.find(t => t.id === currentTopic);
  const completedTopics = topics.filter(t => t.completed).length;

  const handleAnswer = (exerciseId: string, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [exerciseId]: answer }));
  };

  const checkAnswer = (exerciseId: string) => {
    const exercise = currentTopicData?.exercises.find(e => e.id === exerciseId);
    const userAnswer = userAnswers[exerciseId];
    
    if (!exercise || !userAnswer) {
      toast.error("Por favor, selecione uma resposta!");
      return;
    }

    const isCorrect = userAnswer.toLowerCase().trim() === exercise.answer.toLowerCase().trim();
    
    setShowResults(prev => ({ ...prev, [exerciseId]: true }));
    
    if (isCorrect) {
      toast.success("Correto! 🎉");
    } else {
      toast.error("Incorreto. Tente novamente!");
    }
  };

  const markTopicComplete = () => {
    const allExercisesCompleted = currentTopicData?.exercises.every(exercise => {
      const userAnswer = userAnswers[exercise.id];
      return userAnswer && userAnswer.toLowerCase().trim() === exercise.answer.toLowerCase().trim();
    });

    if (allExercisesCompleted) {
      toast.success("Tópico concluído! 🎯");
      setProgress(prev => Math.min(prev + 25, 100));
    } else {
      toast.error("Complete todos os exercícios corretamente primeiro!");
    }
  };

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    } else {
      toast.error("Áudio não suportado neste navegador");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          English Grammar Fundamentals
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Aprenda os fundamentos da gramática inglesa de forma interativa e prática
        </p>
        
        {/* Progress */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progresso do Curso</span>
              <span className="text-sm text-muted-foreground">{completedTopics}/{topics.length} tópicos</span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar - Topics Menu */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Tópicos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {topics.map((topic) => (
                <Button
                  key={topic.id}
                  variant={currentTopic === topic.id ? "default" : "ghost"}
                  className="w-full justify-start h-auto p-3 text-left"
                  onClick={() => setCurrentTopic(topic.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {topic.completed ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{topic.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {topic.description}
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {currentTopicData && (
            <div className="space-y-6">
              {/* Topic Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl flex items-center gap-3">
                        {currentTopicData.title}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => playAudio(currentTopicData.title)}
                          className="h-8 w-8 p-0"
                        >
                          <Volume2 className="h-4 w-4" />
                        </Button>
                      </CardTitle>
                      <CardDescription className="text-base mt-2">
                        {currentTopicData.description}
                      </CardDescription>
                    </div>
                    <Badge variant={currentTopicData.completed ? "default" : "secondary"}>
                      {currentTopicData.completed ? "Concluído" : "Em Progresso"}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>

              {/* Content and Exercises */}
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="content">Conteúdo</TabsTrigger>
                  <TabsTrigger value="exercises">Exercícios</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="prose max-w-none">
                        {currentTopicData.content.split('\n').map((line, index) => {
                          if (line.startsWith('**') && line.endsWith('**')) {
                            return (
                              <h3 key={index} className="text-lg font-semibold mt-4 mb-2 text-primary">
                                {line.slice(2, -2)}
                              </h3>
                            );
                          }
                          if (line.startsWith('- **') && line.includes(':**')) {
                            const [term, definition] = line.split(':**');
                            return (
                              <div key={index} className="mb-2">
                                <strong className="text-primary">{term.slice(3)}</strong>: {definition}
                              </div>
                            );
                          }
                          if (line.startsWith('- ')) {
                            return (
                              <li key={index} className="ml-4 mb-1">
                                {line.slice(2)}
                              </li>
                            );
                          }
                          if (line.trim()) {
                            return (
                              <p key={index} className="mb-3">
                                {line}
                              </p>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="exercises" className="space-y-4">
                  {currentTopicData.exercises.map((exercise, index) => (
                    <Card key={exercise.id}>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <MessageSquare className="h-5 w-5" />
                          Exercício {index + 1}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-base font-medium">
                          {exercise.question}
                        </div>

                        {exercise.type === "multiple-choice" && exercise.options && (
                          <RadioGroup
                            value={userAnswers[exercise.id] || ""}
                            onValueChange={(value) => handleAnswer(exercise.id, value)}
                          >
                            {exercise.options.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex items-center space-x-2">
                                <RadioGroupItem value={option} id={`${exercise.id}-${optionIndex}`} />
                                <Label htmlFor={`${exercise.id}-${optionIndex}`}>{option}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        )}

                        {exercise.type === "fill-blank" && (
                          <Input
                            placeholder="Digite sua resposta..."
                            value={userAnswers[exercise.id] || ""}
                            onChange={(e) => handleAnswer(exercise.id, e.target.value)}
                            className="max-w-md"
                          />
                        )}

                        <div className="flex gap-2">
                          <Button onClick={() => checkAnswer(exercise.id)}>
                            Verificar Resposta
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => playAudio(exercise.question)}
                          >
                            <Volume2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {showResults[exercise.id] && (
                          <Alert>
                            <AlertDescription>
                              <strong>Resposta correta:</strong> {exercise.answer}
                              <br />
                              <strong>Explicação:</strong> {exercise.explanation}
                            </AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  ))}

                  <Card>
                    <CardContent className="pt-6">
                      <Button onClick={markTopicComplete} className="w-full" size="lg">
                        <Award className="h-5 w-5 mr-2" />
                        Concluir Tópico
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}