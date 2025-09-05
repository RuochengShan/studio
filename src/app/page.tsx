import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8 text-center animate-fade-in">
      <div className="flex flex-col items-center justify-center space-y-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-6xl lg:text-7xl">
          紀念中國人民抗日戰爭暨世界反法西斯戰爭勝利80周年联欢晚会
        </h1>
        <Link href="/game/rules">
          <Button size="lg" className="bg-accent px-10 py-6 text-lg font-semibold text-accent-foreground shadow-lg transition-transform hover:scale-105 hover:bg-accent/90 focus:ring-4 focus:ring-accent/50">
            开始游戏
          </Button>
        </Link>
      </div>
    </main>
  );
}
