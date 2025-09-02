import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Swords, Shield, Gamepad2, Puzzle, Dice5 } from 'lucide-react';

const games = [
  { name: 'game1', icon: <Swords className="h-12 w-12 text-primary" />, href: '#' },
  { name: 'game2', icon: <Shield className="h-12 w-12 text-primary" />, href: '#' },
  { name: 'game3', icon: <Gamepad2 className="h-12 w-12 text-primary" />, href: '#' },
  { name: 'game4', icon: <Puzzle className="h-12 w-12 text-primary" />, href: '#' },
  { name: 'game5', icon: <Dice5 className="h-12 w-12 text-primary" />, href: '#' },
];

export default function GamesPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background animate-fade-in">
      <header className="sticky top-0 z-10 flex h-20 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-8">
        <Link href="/" aria-label="Back to home">
          <Button variant="outline" size="icon" className="h-10 w-10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="font-headline text-3xl font-semibold text-foreground">
          选择游戏
        </h1>
      </header>
      <main className="flex-1 p-4 md:p-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {games.map((game) => (
            <Link key={game.name} href={game.href} className="group outline-none">
              <Card className="flex h-full flex-col items-center justify-center p-6 text-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:bg-card/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                <CardHeader className="flex flex-col items-center gap-4">
                  {game.icon}
                  <CardTitle className="font-body text-2xl font-semibold tracking-wide text-foreground">
                    {game.name}
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
