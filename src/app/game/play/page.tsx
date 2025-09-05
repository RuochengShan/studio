
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertDialogTrigger } from '@radix-ui/react-alert-dialog';
import { ArrowLeft, Lightbulb } from 'lucide-react';
import gameData from '@/data/game.json';
import questionsData from '@/data/all-questions.json';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type Hint = {
  type: string;
  content: string;
  'data-ai-hint'?: string;
};

type Question = {
  id: string;
  type: 'open-ended' | 'multichoice';
  question: string;
  image?: string | null;
  audio?: string | null;
  choices?: string[];
  hints: Hint[];
  answer: string;
  'data-ai-hint'?: string;
};

export default function GamePlayPage() {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setQuestions(questionsData.questions as Question[]);
    setLoading(false);
  }, []);
  
  const handleNextQuestion = () => {
    if (questions && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowAnswer(false);
      setSelectedChoice(null);
    }
  };

  const handleChoiceClick = (choice: string) => {
    if (showAnswer) return;
    setSelectedChoice(choice);
  };

  const isLastQuestion = questions ? currentQuestionIndex === questions.length - 1 : false;

  if (loading) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
            <div className="flex flex-col items-center space-y-8 w-full max-w-3xl">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-64 w-full" />
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
                <Skeleton className="h-12 w-32" />
            </div>
        </div>
      )
  }

  if (!questions || questions.length === 0) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-background animate-fade-in">
        <header className="sticky top-0 z-10 flex h-20 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-8">
          <Link href="/game/rules" aria-label="Back to rules">
            <Button variant="outline" size="icon" className="h-10 w-10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="font-headline text-3xl font-semibold text-foreground">
            {gameData.name}
          </h1>
        </header>
        <main className="flex flex-1 flex-col items-center justify-center p-4 text-center md:p-8">
            <h2 className="text-2xl font-semibold mb-4">No questions available for this game yet.</h2>
            <Link href={`/`}>
                <Button>Back to Home</Button>
            </Link>
        </main>
      </div>
    );
  }

  const question = questions[currentQuestionIndex];

  return (
    <div className="flex min-h-screen w-full flex-col bg-background animate-fade-in">
      <header className="sticky top-0 z-10 flex h-20 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-8">
        <Link href="/game/rules" aria-label="Back to rules">
          <Button variant="outline" size="icon" className="h-10 w-10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="font-headline text-3xl font-semibold text-foreground">
          {gameData.name}
        </h1>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle className="text-center font-body text-2xl md:text-3xl">{question.question}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            {question.image && (
              <div className="relative w-full max-w-md h-64">
                <Image
                  src={question.image}
                  alt={question.question}
                  fill
                  style={{objectFit: 'contain'}}
                  className="rounded-lg"
                  data-ai-hint={question['data-ai-hint']}
                />
              </div>
            )}
            {question.audio && (
              <audio controls src={question.audio} className="w-full max-w-md">
                Your browser does not support the audio element.
              </audio>
            )}

            {question.type === 'multichoice' && question.choices && (
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                    {question.choices.map((choice, index) => (
                        <Button 
                            key={index} 
                            variant={selectedChoice === choice ? "default" : "outline"}
                            size="lg"
                            onClick={() => handleChoiceClick(choice)}
                            className={cn("text-lg", {
                                "bg-green-500 text-white": showAnswer && choice === question.answer,
                                "bg-red-500 text-white": showAnswer && selectedChoice === choice && choice !== question.answer,
                            })}
                        >
                            {choice}
                        </Button>
                    ))}
                </div>
            )}

            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              {question.hints.map((hint, index) => (
                <AlertDialog key={index}>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="lg">
                      <Lightbulb className="mr-2 h-5 w-5" />
                      提示 {index + 1}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>提示 {index + 1}</AlertDialogTitle>
                      <AlertDialogDescription className="pt-4">
                        {hint.type === 'text' && <p className="text-lg text-foreground">{hint.content}</p>}
                        {hint.type === 'image' && (
                            <div className="relative w-full h-48 mt-2">
                                <Image
                                    src={hint.content}
                                    alt={`Hint image`}
                                    fill
                                    style={{objectFit: 'contain'}}
                                    className="rounded-lg"
                                    data-ai-hint={hint['data-ai-hint']}
                                />
                            </div>
                        )}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogAction>关闭</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ))}
            </div>

            <Button
              size="lg"
              className="bg-accent px-10 py-6 text-lg font-semibold text-accent-foreground shadow-lg transition-transform hover:scale-105 hover:bg-accent/90 focus:ring-4 focus:ring-accent/50"
              onClick={() => setShowAnswer(true)}
              disabled={showAnswer}
            >
              显示答案
            </Button>

            {showAnswer && (
              <div className="mt-6 rounded-lg bg-card p-6 text-center shadow-inner w-full max-w-md">
                <h3 className="font-headline text-2xl font-bold text-primary">答案</h3>
                <p className="mt-2 font-body text-xl">{question.answer}</p>
                {question.type === 'multichoice' && selectedChoice && selectedChoice !== question.answer && (
                    <p className="mt-2 font-body text-xl text-destructive">你的选择是: {selectedChoice}</p>
                )}
                <div className="mt-6">
                  {isLastQuestion ? (
                    <Link href="/">
                      <Button size="lg">返回主页</Button>
                    </Link>
                  ) : (
                    <Button size="lg" onClick={handleNextQuestion}>
                      下一题
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
