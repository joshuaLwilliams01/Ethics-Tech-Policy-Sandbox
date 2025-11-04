import Link from "next/link";
export default function Modes(){
  return (
    <div className="space-y-3">
      <p className="kicker">Begin</p>
      <h2 className="text-2xl font-semibold">Start Your Journey</h2>
      <p>Move through scenarios, save progress anytime, and see the result(s) of each decision.</p>
      <Link href="/play/individual/1" className="btn px-6 py-3 text-base font-semibold">Start Your Journey</Link>
    </div>
  );
}
