
'use client';

import { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ArrowLeft, Lightbulb } from 'lucide-react';
import gamesData from '@/data/games.json';

type Hint = {
  type: string;
  content: string;
};

type Question = {
  id: string;
  question: string;
  image?: string | null;
  audio?: string | null;
  hints: Hint[];
  answer: string;
  'data-ai-hint'?: string;
};

type Game = {
  id: string;
  name: string;
  rules: string;
  questions: Question[];
};

const getGame = (gameId: string): Game | undefined => {
  return gamesData.games.find((game) => game.id === gameId);
};

export default function GamePlayPage() {
  const params = useParams();
  const gameId = Array.isArray(params.gameId) ? params.gameId[0] : params.gameId;
  const game = getGame(gameId);
  
  const [showAnswer, setShowAnswer] = useState(false);

  if (!game || !game.questions.length) {
    notFound();
  }

  // For simplicity, we'll use the first question of each game.
  const question = game.questions[0];

  return (
    <div className="flex min-h-screen w-full flex-col bg-background animate-fade-in">
      <header className="sticky top-0 z-10 flex h-20 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-8">
        <Link href={`/games/${game.id}`} aria-label="Back to rules">
          <Button variant="outline" size="icon" className="h-10 w-10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="font-headline text-3xl font-semibold text-foreground">
          {game.name}
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
                        {/* More hint types can be handled here */}
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
            >
              显示答案
            </Button>

            {showAnswer && (
              <div className="mt-6 rounded-lg bg-card p-6 text-center shadow-inner w-full max-w-md">
                <h3 className="font-headline text-2xl font-bold text-primary">答案</h3>
                <p className="mt-2 font-body text-xl">{question.answer}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
