export default function About(){
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">About the Project</h2>
      <p>
        The <em>Ethics-Tech-Policy Decisions Sandbox</em>, created by Joshua Williams, is a web-based simulator that presents real-world dilemmas
        at the intersection of technology, policy, and society through short, playable scenarios. Utilizing Stanford's Ethics Toolkit, created by
        Manuela Travaglianti, PhD, and Thomas Both at the McCoy Family Center for Ethics in Society at Stanford University, players explore tradeoffs,
        test options, and clearly explain their decisions. Designed with privacy, accessibility, and adaptability in mind, it serves as both a teaching tool
        and a portfolio-ready demo for responsible technology.
      </p>
      <div className="space-y-1 text-sm">
        <div><strong>Course:</strong> <a target="_blank" rel="noreferrer" href="https://online.stanford.edu/courses/soe-xetech0001-ethics-technology-public-policy-practitioners">Ethics, Technology + Public Policy for Practitioners</a></div>
        <div><strong>Stanford Ethics Toolkit:</strong> <a target="_blank" rel="noreferrer" href="https://ethicsinsociety.stanford.edu/tech-ethics/ethics-toolkit">Link</a></div>
        <div><strong>People + Planet + Parity Framework:</strong> <a target="_blank" rel="noreferrer" href="https://apartresearch.com/project/people-planet-parity-governance-framework-h3ks">Link</a></div>
      </div>
    </div>
  );
}
