import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import gameData from '@/data/game.json';
import { ArrowLeft } from 'lucide-react';

export default function GameRulesPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background animate-fade-in">
        <header className="sticky top-0 z-10 flex h-20 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-8">
            <Link href="/" aria-label="Back to home">
            <Button variant="outline" size="icon" className="h-10 w-10">
                <ArrowLeft className="h-5 w-5" />
            </Button>
            </Link>
            <h1 className="font-headline text-3xl font-semibold text-foreground">
                {gameData.name}
            </h1>
        </header>
        <main className="flex flex-1 items-center justify-center p-4 md:p-8">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-center font-headline text-4xl">游戏规则</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <CardDescription asChild className="text-lg mb-8">
                      <div>
                        {gameData.rules.map((rule, index) => (
                          <p key={index}>{rule}</p>
                        ))}
                      </div>
                    </CardDescription>
                    <Link href="/game/play">
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
