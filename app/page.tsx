import Link from "next/link";
import HowToPlay from "@/components/HowToPlay";

export default function Home(){
  return (
    <section className="py-10 space-y-6">
      <h1 className="text-3xl font-bold">Ethics-Tech-Policy Decisions Sandbox</h1>
      <p className="text-lg max-w-2xl">
        Short, playable scenarios at the intersection of technology, policy, and society—guided by the Stanford Ethics Toolkit and People + Planet + Parity.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/play/individual/1" className="btn">Start Your Journey</Link>
        <a href="#how" className="btn-ghost">How to Play</a>
        <Link href="/about" className="btn-ghost">About</Link>
      </div>
      <div id="how" className="card">
        <HowToPlay />
      </div>
    </section>
  );
}
