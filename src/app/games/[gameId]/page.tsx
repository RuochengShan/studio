import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import gamesData from '@/data/games.json';
import { ArrowLeft } from 'lucide-react';

type Game = {
    id: string;
    name: string;
    rules: string;
}

const getGame = (gameId: string): Game | undefined => {
  return gamesData.games.find((game) => game.id === gameId);
};

export default function GamePage({ params }: { params: { gameId: string } }) {
  const game = getGame(params.gameId);

  if (!game) {
    notFound();
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background animate-fade-in">
        <header className="sticky top-0 z-10 flex h-20 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-8">
            <Link href="/games" aria-label="Back to games">
            <Button variant="outline" size="icon" className="h-10 w-10">
                <ArrowLeft className="h-5 w-5" />
            </Button>
            </Link>
            <h1 className="font-headline text-3xl font-semibold text-foreground">
                {game.name}
            </h1>
        </header>
        <main className="flex flex-1 items-center justify-center p-4 md:p-8">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-center font-headline text-4xl">游戏规则</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <CardDescription className="text-lg mb-8">{game.rules}</CardDescription>
                    <Link href={`/games/${game.id}/play`}>
                        <Button size="lg" className="bg-accent px-10 py-6 text-lg font-semibold text-accent-foreground shadow-lg transition-transform hover:scale-105 hover:bg-accent/90 focus:ring-4 focus:ring-accent/50">
                            进入游戏
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </main>
    </div>
  );
}
