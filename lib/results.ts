import type { Scenario } from "./types";

type ResultData = {
  summary: string;
  benefits: string[];
  harms: string[];
};

// Comprehensive results mapping for all scenarios
const RESULTS_MAP: Record<string, Record<'A'|'B'|'C', ResultData>> = {
  "L1-S1": {
    A: {
      summary: "As a result of your decision (A), hospitals and transit remain stable during the transition period.",
      benefits: [
        "Hospitals and transit remain stable",
        "Teams gain time to replace vendors safely",
        "Transition milestones are predictable"
      ],
      harms: [
        "The city continues to benefit from coerced labor during the transition",
        "Public trust declines",
        "Advocacy groups may file formal complaints"
      ]
    },
    B: {
      summary: "As a result of your decision (B), exploitative labor is no longer part of city services.",
      benefits: [
        "Exploitative labor is no longer part of city services",
        "The action signals clear ethical leadership",
        "Vendors face urgent pressure to reform"
      ],
      harms: [
        "Short-term outages risk clinical delays and missed rides",
        "Emergency procurement costs rise",
        "If mutual-aid capacity lags, public confidence drops sharply"
      ]
    },
    C: {
      summary: "As a result of your decision (C), direct financial and oversight support reaches affected workers immediately.",
      benefits: [
        "Direct financial and oversight support reaches affected workers immediately",
        "Core services remain uninterrupted"
      ],
      harms: [
        "Funding can be viewed as 'paying to continue harm'",
        "If remediation lags or is poorly verified, legal and reputational risks intensify"
      ]
    }
  },
  "L1-S2": {
    A: {
      summary: "As a result of your decision (A), smooth cutover occurs with minimal service disruption.",
      benefits: [
        "Smooth cutover with minimal service disruption",
        "Future contracts reflect fair labor standards"
      ],
      harms: [
        "Underpayment persists during the phase-out",
        "Whistleblowers can escalate",
        "Leadership appears slow to act"
      ]
    },
    B: {
      summary: "As a result of your decision (B), complicity ends now with clear external signals.",
      benefits: [
        "Complicity ends now",
        "Clear external signal accelerates vendor compliance",
        "Credibility with labor advocates rises"
      ],
      harms: [
        "Residents lose app functionality",
        "Call centers and in-person services face surges",
        "Elected officials face pressure to restore access"
      ]
    },
    C: {
      summary: "As a result of your decision (C), workers receive near-term relief while users keep access.",
      benefits: [
        "Workers receive near-term relief",
        "Public audit increases pressure for rapid reform",
        "Users keep access to services"
      ],
      harms: [
        "Relief may not reach all workers equally",
        "If the audit confirms abuse, continued operation appears unjustifiable"
      ]
    }
  },
  "L1-S3": {
    A: {
      summary: "As a result of your decision (A), exposure to traumatic content decreases per moderator.",
      benefits: [
        "Exposure to traumatic content decreases per moderator",
        "Retention improves",
        "Insurers view risk controls more favorably"
      ],
      harms: [
        "Harmful content is still reviewed by humans",
        "Operating costs increase",
        "Critics argue root causes remain"
      ]
    },
    B: {
      summary: "As a result of your decision (B), volume of abusive content drops immediately.",
      benefits: [
        "Volume of abusive content drops immediately",
        "Moderator injury and burnout decline",
        "Advertiser confidence recovers faster"
      ],
      harms: [
        "Engagement falls",
        "Users may migrate to competitors",
        "Abusers probe alternative channels"
      ]
    },
    C: {
      summary: "As a result of your decision (C), human exposure decreases while response times improve.",
      benefits: [
        "Human exposure decreases",
        "Response times improve at scale",
        "Coverage hours expand globally"
      ],
      harms: [
        "Misclassification harms creators and communities",
        "Appeals queues grow",
        "Speech impacts fall unevenly across groups"
      ]
    }
  },
  "L1-S4": {
    A: {
      summary: "As a result of your decision (A), most residents see lower bills with targeted relief.",
      benefits: [
        "Most residents see lower bills",
        "Targeted transfers soften harms for medically vulnerable households",
        "Budget targets remain achievable"
      ],
      harms: [
        "The same areas still face more outages",
        "Heat/cold events carry higher medical risk",
        "Allegations of inequitable impact increase"
      ]
    },
    B: {
      summary: "As a result of your decision (B), no single community bears repeated outages.",
      benefits: [
        "No single community bears repeated outages",
        "Measured health risks spread rather than concentrate",
        "Fairness perceptions improve"
      ],
      harms: [
        "Average costs rise citywide",
        "Public support declines among unaffected districts",
        "Enforcement and monitoring add overhead"
      ]
    },
    C: {
      summary: "As a result of your decision (C), transparent, publicly vetted criteria are established.",
      benefits: [
        "Transparent, publicly vetted criteria",
        "Fewer course-corrections post-launch",
        "Stronger mandate for final design"
      ],
      harms: [
        "Savings are deferred",
        "Budget adjustments hit other services",
        "Public patience drops if rulemaking is slow"
      ]
    }
  },
  "L1-S5": {
    A: {
      summary: "As a result of your decision (A), recycling throughput is maintained while safety upgrades occur.",
      benefits: [
        "Recycling throughput is maintained",
        "Safety upgrades occur where harms are highest",
        "International partners stay engaged"
      ],
      harms: [
        "Upgrades take time",
        "Toxic exposure continues during the gap",
        "Accountability across borders is difficult to enforce"
      ]
    },
    B: {
      summary: "As a result of your decision (B), stronger safety oversight is established with local green jobs.",
      benefits: [
        "Stronger safety oversight",
        "Creation of local green jobs",
        "Long-term circular economy benefits"
      ],
      harms: [
        "Short-term backlogs and storage",
        "Higher unit costs",
        "Risk of informal or illegal dumping during capacity build-out"
      ]
    },
    C: {
      summary: "As a result of your decision (C), highest-risk flows stop immediately.",
      benefits: [
        "Highest-risk flows stop immediately",
        "Compliance is easier to verify and explain"
      ],
      harms: [
        "Total recycling decreases",
        "Inventory backlog grows",
        "Climate and waste reduction targets slip"
      ]
    }
  },
  "L2-S1": {
    A: {
      summary: "As a result of your decision (A), hiring stays fast with clear appeals process.",
      benefits: [
        "Hiring stays fast",
        "Clear cases move quickly",
        "Appeals provide a corrective path"
      ],
      harms: [
        "Group disparities persist",
        "Appeals advantage applicants with time and resources",
        "Regulators may open a review"
      ]
    },
    B: {
      summary: "As a result of your decision (B), error rates converge across groups with measurable progress.",
      benefits: [
        "Error rates converge across groups",
        "Legitimacy improves",
        "External auditors report measurable progress"
      ],
      harms: [
        "Hiring delays",
        "Precision and throughput may drop",
        "More human review is needed"
      ]
    },
    C: {
      summary: "As a result of your decision (C), rapid relief occurs where bias is worst.",
      benefits: [
        "Rapid relief where bias is worst",
        "Resources focus on problematic roles"
      ],
      harms: [
        "Inconsistent experience by role",
        "Documentation must clearly justify different processes"
      ]
    }
  },
  "L2-S2": {
    A: {
      summary: "As a result of your decision (A), faster credit decisions are made with documented consent.",
      benefits: [
        "Faster credit decisions",
        "Thin-file borrowers gain access"
      ],
      harms: [
        "Inferences feel intrusive",
        "Opting out may reduce credit access",
        "Complaints and appeals increase"
      ]
    },
    B: {
      summary: "As a result of your decision (B), strong consent and oversight improve trust.",
      benefits: [
        "Strong consent and oversight",
        "Higher trust from regulators and advocates"
      ],
      harms: [
        "Lower participation rate",
        "Potential selection bias complicates evaluation",
        "Costs per decision rise"
      ]
    },
    C: {
      summary: "As a result of your decision (C), limited exposure allows evidence to inform policy.",
      benefits: [
        "Limited exposure",
        "Evidence informs policy before scale-up"
      ],
      harms: [
        "Risk shifts to lower-income borrowers",
        "Findings may not generalize to larger loans"
      ]
    }
  },
  "L2-S3": {
    A: {
      summary: "As a result of your decision (A), some misflags are corrected with continuity maintained.",
      benefits: [
        "Some misflags are corrected",
        "Continuity for integrity enforcement"
      ],
      harms: [
        "Disparities remain",
        "Stress and complaints increase among affected groups",
        "Trust in proctoring declines"
      ]
    },
    B: {
      summary: "As a result of your decision (B), intrusion decreases while fairness improves.",
      benefits: [
        "Intrusion decreases",
        "Fairness and accessibility improve",
        "Students can demonstrate learning in multiple ways"
      ],
      harms: [
        "Scoring comparability is harder",
        "Graders need training",
        "Scheduling becomes more complex"
      ]
    },
    C: {
      summary: "As a result of your decision (C), unfair flagging stops immediately.",
      benefits: [
        "Unfair flagging stops immediately",
        "Vendors must deliver verified improvements"
      ],
      harms: [
        "Cheating risk may rise temporarily",
        "Deadlines tighten for deploying fixes"
      ]
    }
  },
  "L2-S4": {
    A: {
      summary: "As a result of your decision (A), throughput improves with human judgment as safety net.",
      benefits: [
        "Throughput improves",
        "Human judgment remains a safety net for edge cases"
      ],
      harms: [
        "Overrides vary by clinician",
        "Patients with sparse histories still face delays"
      ]
    },
    B: {
      summary: "As a result of your decision (B), safer triage occurs for limited histories.",
      benefits: [
        "Safer triage for limited histories",
        "Fewer missed severe cases"
      ],
      harms: [
        "Average wait times increase",
        "Conservative defaults can overload priority queues"
      ]
    },
    C: {
      summary: "As a result of your decision (C), access improves for under-documented patients.",
      benefits: [
        "Access improves for under-documented patients",
        "Measured trust gains in underserved communities"
      ],
      harms: [
        "Perceived queue unfairness",
        "Requires strict criteria and continuous monitoring to withstand audit"
      ]
    }
  },
  "L2-S5": {
    A: {
      summary: "As a result of your decision (A), root causes are addressed with transparency.",
      benefits: [
        "Addresses root causes",
        "Transparency reduces bias concerns",
        "Civic partners co-own outcomes"
      ],
      harms: [
        "Violence reduction is slower",
        "Political criticism focuses on diverted funds"
      ]
    },
    B: {
      summary: "As a result of your decision (B), credible causal evidence is produced.",
      benefits: [
        "Produces credible causal evidence",
        "Ineffective tactics can be retired quickly"
      ],
      harms: [
        "Uneven coverage during trials",
        "Residents may feel experimented upon without clear consent"
      ]
    },
    C: {
      summary: "As a result of your decision (C), fewer stops and searches occur with improved trust.",
      benefits: [
        "Fewer stops and searches",
        "Trust improves",
        "Prevention capacity grows"
      ],
      harms: [
        "Emergency response gaps if coordination lags",
        "Crime can shift locations"
      ]
    }
  },
  "L3-S1": {
    A: {
      summary: "As a result of your decision (A), rapid blocking occurs without centralizing personal photos.",
      benefits: [
        "Rapid blocking without centralizing personal photos",
        "Stronger default privacy"
      ],
      harms: [
        "False positives on personal devices create acute harm",
        "Public backlash if private content is misclassified"
      ]
    },
    B: {
      summary: "As a result of your decision (B), quality control is centralized with embedded resources.",
      benefits: [
        "Quality control is centralized",
        "Survivor resources are embedded",
        "Auditability improves"
      ],
      harms: [
        "Centralized scanning increases breach impact",
        "Responses can slow during peak loads"
      ]
    },
    C: {
      summary: "As a result of your decision (C), detection matches risk level with reduced unnecessary scanning.",
      benefits: [
        "Detection matches risk level",
        "Unnecessary scanning is reduced"
      ],
      harms: [
        "Users may not understand when each method applies",
        "Gaps appear in ambiguous cases"
      ]
    }
  },
  "L3-S2": {
    A: {
      summary: "As a result of your decision (A), clear usage boundaries are established with traceability.",
      benefits: [
        "Clear usage boundaries",
        "Traceability accelerates takedowns",
        "Creators have a repair path"
      ],
      harms: [
        "Evasion tools spread",
        "Appeals require significant staffing",
        "Public expects near-zero failures"
      ]
    },
    B: {
      summary: "As a result of your decision (B), harmful outputs are rarer with increased regulator confidence.",
      benefits: [
        "Harmful outputs are rarer",
        "Regulator confidence increases",
        "Internal safety culture strengthens"
      ],
      harms: [
        "Feature velocity slows",
        "Competitive position may weaken",
        "Compute and review costs rise"
      ]
    },
    C: {
      summary: "As a result of your decision (C), mass misuse is reduced with higher-quality safety feedback.",
      benefits: [
        "Reduces mass misuse",
        "Yields higher-quality safety feedback"
      ],
      harms: [
        "Small organizations lose access",
        "Accusations of gatekeeping",
        "Innovation diffuses more slowly"
      ]
    }
  },
  "L3-S3": {
    A: {
      summary: "As a result of your decision (A), faster removal of verified threats occurs with human-centered process.",
      benefits: [
        "Faster removal of verified threats",
        "Abusive reporting is throttled",
        "Process remains human-centered"
      ],
      harms: [
        "Reviewer workload and trauma risk increase",
        "Agencies may challenge limits during urgent cases"
      ]
    },
    B: {
      summary: "As a result of your decision (B), wrongful flags decline with clearer evidentiary thresholds.",
      benefits: [
        "Wrongful flags decline",
        "Clearer evidentiary thresholds improve fairness"
      ],
      harms: [
        "Some real cases are missed",
        "Survivors' groups may view thresholds as too cautious"
      ]
    },
    C: {
      summary: "As a result of your decision (C), standards are applied consistently with reduced political pressure.",
      benefits: [
        "Standards are applied consistently",
        "Political pressure on the platform decreases"
      ],
      harms: [
        "Added delay before action",
        "Smaller agencies may lack capacity to participate effectively"
      ]
    }
  },
  "L3-S4": {
    A: {
      summary: "As a result of your decision (A), baseline protections and limits are established across the district.",
      benefits: [
        "Baseline protections and limits across the district",
        "Clearer rights for students and parents"
      ],
      harms: [
        "Compliance costs grow",
        "Beneficial tools deploy more slowly"
      ]
    },
    B: {
      summary: "As a result of your decision (B), meaningful consent and opt-outs improve trust.",
      benefits: [
        "Meaningful consent and opt-outs",
        "Trust improves",
        "Misuse is reported earlier"
      ],
      harms: [
        "Transparency alone does not prevent harmful surveillance",
        "Engagement varies by school resources"
      ]
    },
    C: {
      summary: "As a result of your decision (C), conflict prevention and mental-health capacity increase.",
      benefits: [
        "Conflict prevention and mental-health capacity increase",
        "Surveillance risks decrease"
      ],
      harms: [
        "Limited capability for rapid detection of acute threats",
        "Staffing needs rise"
      ]
    }
  },
  "L3-S5": {
    A: {
      summary: "As a result of your decision (A), exposure declines quickly with verifiable evidence.",
      benefits: [
        "Exposure declines quickly",
        "Verifiable evidence remains for legal follow-up"
      ],
      harms: [
        "Some investigations need more than hashes",
        "Disputes arise if accused parties challenge integrity"
      ]
    },
    B: {
      summary: "As a result of your decision (B), survivor control is respected with clear chain-of-custody.",
      benefits: [
        "Survivor control is respected",
        "Chain-of-custody is clear for courts"
      ],
      harms: [
        "Harmful content persists longer",
        "Abusers can repost faster than processes conclude"
      ]
    },
    C: {
      summary: "As a result of your decision (C), clear authority and timelines enable rapid action in severe cases.",
      benefits: [
        "Clear authority and timelines",
        "Rapid action in severe cases"
      ],
      harms: [
        "Survivors without legal support face barriers",
        "Misuse risk if standards are not narrowly defined"
      ]
    }
  },
  "L4-S1": {
    A: {
      summary: "As a result of your decision (A), services scale quickly with improved reliability.",
      benefits: [
        "Services scale quickly",
        "Reliability improves under SLAs",
        "Oversight offers some safeguards"
      ],
      harms: [
        "Dependence increases",
        "Policy changes by the vendor can affect public services",
        "Exiting later is costly"
      ]
    },
    B: {
      summary: "As a result of your decision (B), public value is retained with privacy terms set by the city.",
      benefits: [
        "Public value is retained",
        "Privacy terms are set by the city",
        "Model for other jurisdictions"
      ],
      harms: [
        "Early reliability issues are likely",
        "Sustained capital and operating funding are required"
      ]
    },
    C: {
      summary: "As a result of your decision (C), vendor power is balanced with improved resilience.",
      benefits: [
        "Vendor power is balanced",
        "Resilience improves",
        "Audits support incident forensics"
      ],
      harms: [
        "Operational complexity rises",
        "Specialized skills are needed",
        "Incident ownership can become fragmented"
      ]
    }
  },
  "L4-S2": {
    A: {
      summary: "As a result of your decision (A), immediate reach is achieved through existing channels.",
      benefits: [
        "Immediate reach",
        "Seamless updates through existing channels"
      ],
      harms: [
        "Fees consume program funds",
        "Store policies shape product choices",
        "Dependence deepens"
      ]
    },
    B: {
      summary: "As a result of your decision (B), distribution control improves with faster iteration.",
      benefits: [
        "Distribution control",
        "Faster iteration without store reviews"
      ],
      harms: [
        "Loss of native features and notifications",
        "User adoption and retention decline on mobile"
      ]
    },
    C: {
      summary: "As a result of your decision (C), prospect of lasting policy change emerges.",
      benefits: [
        "Prospect of lasting policy change",
        "Reputation as a sector advocate"
      ],
      harms: [
        "Slow timeline",
        "Distribution challenges persist in the interim"
      ]
    }
  },
  "L4-S3": {
    A: {
      summary: "As a result of your decision (A), models improve using real-world data with public review.",
      benefits: [
        "Models improve using real-world data",
        "The public can review agreements"
      ],
      harms: [
        "Most value accrues to the vendor",
        "Competitors are disadvantaged",
        "Transparency without sharing appears hollow"
      ]
    },
    B: {
      summary: "As a result of your decision (B), public data yields public benefit with improved competition.",
      benefits: [
        "Public data yields public benefit",
        "Market competition improves"
      ],
      harms: [
        "Vendors may delay or walk away",
        "Negotiations extend timelines",
        "Enforcement requires legal capacity"
      ]
    },
    C: {
      summary: "As a result of your decision (C), top vendors invest with faster feature delivery.",
      benefits: [
        "Attracts top vendors with stronger investment",
        "Faster feature delivery"
      ],
      harms: [
        "Long-term dependence",
        "Oversight and replication become harder"
      ]
    }
  },
  "L4-S4": {
    A: {
      summary: "As a result of your decision (A), resources reach classrooms quickly with independent oversight.",
      benefits: [
        "Resources reach classrooms quickly",
        "Independent oversight reduces bias"
      ],
      harms: [
        "Perception of influence remains",
        "Oversight must be continuous and resourced"
      ]
    },
    B: {
      summary: "As a result of your decision (B), academic integrity is unambiguous with increased trust.",
      benefits: [
        "Academic integrity is unambiguous",
        "Community trust increases"
      ],
      harms: [
        "Programs stall or shrink",
        "Alternative funding must be identified quickly"
      ]
    },
    C: {
      summary: "As a result of your decision (C), influence is diversified with improved alignment.",
      benefits: [
        "Influence is diversified",
        "Alignment with community priorities improves"
      ],
      harms: [
        "Funding is fragmented and less predictable",
        "Administrative effort increases"
      ]
    }
  },
  "L4-S5": {
    A: {
      summary: "As a result of your decision (A), personalization accelerates growth with improved product tuning.",
      benefits: [
        "Personalization accelerates growth",
        "Product tuning improves"
      ],
      harms: [
        "Privacy risks and regulatory exposure rise",
        "Trust erodes after any incident"
      ]
    },
    B: {
      summary: "As a result of your decision (B), durable trust is built with lower compliance risk.",
      benefits: [
        "Durable trust",
        "Lower compliance risk",
        "Steadier long-term growth"
      ],
      harms: [
        "Optimization is slower",
        "Some product questions remain unanswered"
      ]
    },
    C: {
      summary: "As a result of your decision (C), user privacy and experience are preserved with clear mission alignment.",
      benefits: [
        "User privacy and experience are preserved",
        "Mission alignment is clear"
      ],
      harms: [
        "Revenue variability increases",
        "Roadmap pacing depends on external funding cycles"
      ]
    }
  },
  "L5-S1": {
    A: {
      summary: "As a result of your decision (A), seamless personalization occurs across sessions.",
      benefits: [
        "Seamless personalization across sessions",
        "Faster support and troubleshooting"
      ],
      harms: [
        "Users self-censor",
        "Breach or misuse has large impact",
        "Deletion tools may be hard to discover or use"
      ]
    },
    B: {
      summary: "As a result of your decision (B), meaningful consent improves trust among sensitive users.",
      benefits: [
        "Meaningful consent",
        "Legal risk declines",
        "Trust improves among sensitive users"
      ],
      harms: [
        "Datasets are smaller",
        "Some features feel limited",
        "Pressure to relax defaults can re-emerge"
      ]
    },
    C: {
      summary: "As a result of your decision (C), strongest privacy is achieved with minimal server compromise risk.",
      benefits: [
        "Strongest privacy",
        "Minimal risk from server compromise"
      ],
      harms: [
        "Cross-device continuity and historical insights are unavailable",
        "Low-end devices may struggle"
      ]
    }
  },
  "L5-S2": {
    A: {
      summary: "As a result of your decision (A), households can make informed trade-offs with documented consent.",
      benefits: [
        "Households can make informed trade-offs",
        "Documented consent supports accountability"
      ],
      harms: [
        "Financial pressure still nudges participation",
        "Downstream data resale remains a risk"
      ]
    },
    B: {
      summary: "As a result of your decision (B), people can tailor sharing to comfort level.",
      benefits: [
        "People tailor sharing to comfort level",
        "Civil-liberties groups view the approach favorably"
      ],
      harms: [
        "Complex settings reduce real control",
        "Default states effectively determine outcomes"
      ]
    },
    C: {
      summary: "As a result of your decision (C), simple, predictable options are available.",
      benefits: [
        "Simple, predictable options",
        "Easier to explain and administer"
      ],
      harms: [
        "Creates unequal treatment based on data surrender",
        "Social comparisons fuel complaints"
      ]
    }
  },
  "L5-S3": {
    A: {
      summary: "As a result of your decision (A), legitimacy improves with co-designed safeguards.",
      benefits: [
        "Legitimacy improves",
        "Harmful uses are identified early",
        "Safeguards can be co-designed"
      ],
      harms: [
        "Timeline extends",
        "Some communities remain under-represented",
        "Broker opacity persists"
      ]
    },
    B: {
      summary: "As a result of your decision (B), scope is constrained with clear success metrics.",
      benefits: [
        "Scope is constrained",
        "Programs can be ended if harms outweigh benefits"
      ],
      harms: [
        "Narrow metrics miss side effects",
        "'Efficiency' arguments can expand surveillance over time"
      ]
    },
    C: {
      summary: "As a result of your decision (C), opaque surveillance is prevented with built public trust.",
      benefits: [
        "Prevents opaque surveillance",
        "Builds public trust"
      ],
      harms: [
        "Loses potential analytic insights",
        "Requires investment in ethical, first-party data"
      ]
    }
  },
  "L5-S4": {
    A: {
      summary: "As a result of your decision (A), re-identification pathways are reduced with credible notices.",
      benefits: [
        "Re-identification pathways are reduced",
        "User notices are more credible",
        "Research continues"
      ],
      harms: [
        "Added cost and time",
        "Residual risk remains even after mitigation"
      ]
    },
    B: {
      summary: "As a result of your decision (B), research value persists with public transparency.",
      benefits: [
        "Research value persists",
        "Public dashboards discourage misuse"
      ],
      harms: [
        "Transparency without enforcement may be seen as insufficient",
        "Opt-out behavior may lag awareness"
      ]
    },
    C: {
      summary: "As a result of your decision (C), people understand risks and choices with adaptive policies.",
      benefits: [
        "People understand risks and choices",
        "Policies adapt to lived experience"
      ],
      harms: [
        "Information alone does not prevent misuse",
        "Under-resourced users are least likely to participate"
      ]
    }
  },
  "L5-S5": {
    A: {
      summary: "As a result of your decision (A), autonomy is respected with maintained operations.",
      benefits: [
        "Respects autonomy",
        "Reduces complaints",
        "Continuity of operations maintained"
      ],
      harms: [
        "Maintaining parallel systems adds cost",
        "Social pressure to conform persists"
      ]
    },
    B: {
      summary: "As a result of your decision (B), ongoing monitoring occurs for bias and scope creep.",
      benefits: [
        "Ongoing monitoring for bias and scope creep",
        "Corrective actions are documented"
      ],
      harms: [
        "If authority is weak, oversight becomes symbolic",
        "Change cycles slow"
      ]
    },
    C: {
      summary: "As a result of your decision (C), real user concerns are captured with early edge case detection.",
      benefits: [
        "Captures real user concerns",
        "Reveals edge cases early"
      ],
      harms: [
        "Not enforceable",
        "Response bias under-represents some teams",
        "Technical risks remain"
      ]
    }
  },
  "L6-S1": {
    A: {
      summary: "As a result of your decision (A), productivity increases while backlogs shrink.",
      benefits: [
        "Productivity increases",
        "Backlogs shrink",
        "A share of workers transition to higher-value roles"
      ],
      harms: [
        "Some roles still disappear",
        "Morale suffers if wage growth lags efficiency gains",
        "Managers need training to use outputs responsibly"
      ]
    },
    B: {
      summary: "As a result of your decision (B), fewer adverse surprises occur with frontline input.",
      benefits: [
        "Fewer adverse surprises",
        "Frontline experience shapes safe use",
        "Measurable harms are addressed early"
      ],
      harms: [
        "Benefits arrive more slowly",
        "Coordination and facilitation require dedicated staff",
        "Stakeholders may become fatigued"
      ]
    },
    C: {
      summary: "As a result of your decision (C), incentives align with workers with increased trust.",
      benefits: [
        "Incentives align with workers",
        "Trust in automation rises",
        "Churn decreases once launched"
      ],
      harms: [
        "Vendors may withdraw",
        "Opportunities are missed",
        "Shadow use of unsecured tools emerges"
      ]
    }
  },
  "L6-S2": {
    A: {
      summary: "As a result of your decision (A), fatigue and absenteeism decline with improved retention.",
      benefits: [
        "Fatigue and absenteeism decline",
        "Schedule swaps become easier",
        "Retention improves"
      ],
      harms: [
        "Initial configuration is complex",
        "Managers need training",
        "Early errors can undermine confidence"
      ]
    },
    B: {
      summary: "As a result of your decision (B), real performance data is gathered for quick iteration.",
      benefits: [
        "Real performance data",
        "Quick iteration",
        "Clear go/no-go decision points"
      ],
      harms: [
        "Early mistakes harm specific teams",
        "Perceptions of unfairness grow without a strong appeal process"
      ]
    },
    C: {
      summary: "As a result of your decision (C), human judgment remains central with familiar policies.",
      benefits: [
        "Human judgment remains central",
        "Policies are transparent and familiar"
      ],
      harms: [
        "Persistent inefficiencies",
        "Manager bias and inconsistency remain unaddressed"
      ]
    }
  },
  "L6-S3": {
    A: {
      summary: "As a result of your decision (A), service quality becomes more consistent with faster staff ramp.",
      benefits: [
        "Service quality becomes more consistent",
        "New staff ramp faster",
        "Compliance improves"
      ],
      harms: [
        "Perceived surveillance reduces morale",
        "Training requires time away from queues",
        "Strict targets can narrow judgment"
      ]
    },
    B: {
      summary: "As a result of your decision (B), agent autonomy is preserved with targeted support.",
      benefits: [
        "Preserves agent autonomy",
        "Targeted support on high-impact scenarios",
        "Lower surveillance burden"
      ],
      harms: [
        "Uneven results across call types",
        "Harder to measure global impact",
        "Pressure to expand usage later"
      ]
    },
    C: {
      summary: "As a result of your decision (C), immediate coverage is achieved with rapid telemetry.",
      benefits: [
        "Immediate coverage",
        "Rapid telemetry on usage patterns"
      ],
      harms: [
        "Misuse increases error rates",
        "Frustration and attrition rise",
        "Unions or works councils may intervene"
      ]
    }
  },
  "L6-S4": {
    A: {
      summary: "As a result of your decision (A), predictable quality is maintained with clear pathways.",
      benefits: [
        "Predictable quality for clients",
        "Clear pathway to higher earnings",
        "Disputes resolved faster"
      ],
      harms: [
        "Lower-tier workers receive fewer jobs",
        "Ratings reflect historical bias",
        "Mobility is constrained for some groups"
      ]
    },
    B: {
      summary: "As a result of your decision (B), equal access to tasks is guaranteed.",
      benefits: [
        "Equal access to tasks",
        "Entry barriers drop",
        "Early careers accelerate"
      ],
      harms: [
        "Client satisfaction and retention may fall",
        "Quality control requires new tools",
        "Revenue can decline"
      ]
    },
    C: {
      summary: "As a result of your decision (C), baseline income stability is achieved with due-process protections.",
      benefits: [
        "Baseline income stability",
        "Due-process protections",
        "Lower churn"
      ],
      harms: [
        "Slower product changes",
        "Negotiations consume time",
        "Legal disputes over terms may occur"
      ]
    }
  },
  "L6-S5": {
    A: {
      summary: "As a result of your decision (A), respectful exits occur with goodwill toward the workforce.",
      benefits: [
        "Respectful exits",
        "Goodwill with the workforce",
        "Some employees return with new skills"
      ],
      harms: [
        "Loss of institutional knowledge",
        "Short-term service levels decline",
        "Rehiring plans must be funded"
      ]
    },
    B: {
      summary: "As a result of your decision (B), upward mobility increases with retained experienced staff.",
      benefits: [
        "Upward mobility increases",
        "The organization retains experienced staff in new capacities"
      ],
      harms: [
        "Not all trainees place quickly",
        "Service is interrupted during training periods",
        "Program costs are significant"
      ]
    },
    C: {
      summary: "As a result of your decision (C), income continues while learning with gradual transition.",
      benefits: [
        "Income continues while learning",
        "Transition feels gradual and manageable",
        "Service delivery persists"
      ],
      harms: [
        "Complex scheduling",
        "Managers juggle coverage and training",
        "Savings arrive more slowly"
      ]
    }
  },
  "L7-S1": {
    A: {
      summary: "As a result of your decision (A), overtly dehumanizing AI content is removed from government channels, but legitimacy hinges on narrow scope and fair appeals.",
      benefits: [
        "Faster protection for targeted groups",
        "Clear standard for official digital spaces",
        "Signals city's ethical stance on AI use"
      ],
      harms: [
        "Censorship concerns if scope expands",
        "Migration of harmful content to shadow forums",
        "Appeals and review workload increase"
      ]
    },
    B: {
      summary: "As a result of your decision (B), norms shift through transparency and education, but relief is slower for those harmed right now.",
      benefits: [
        "Builds public capacity to contest AI harms",
        "Protects broader speech values",
        "Produces evidence for future policy"
      ],
      harms: [
        "Harmful content lingers longer",
        "Requires sustained facilitation and funding",
        "Harder to show quick wins"
      ]
    },
    C: {
      summary: "As a result of your decision (C), tensions cool and shared rules emerge, but process quality determines legitimacy.",
      benefits: [
        "Immediate cooling-off period",
        "Shared ownership improves compliance",
        "Clear mandate post-vote"
      ],
      harms: [
        "Short-term uncertainty and gaps",
        "If process feels biased, opposition hardens",
        "Administration and facilitation costs rise"
      ]
    }
  },
  "L7-S2": {
    A: {
      summary: "As a result of your decision (A), harms are contained quickly, but due-process pressure rises.",
      benefits: [
        "Faster protection for targeted users",
        "Clear, predictable response windows",
        "Strong deterrence for repeat abuse"
      ],
      harms: [
        "Wrongful removals provoke appeals and scrutiny",
        "Reviewer stress + staffing needs increase",
        "Perceived bias if SLAs vary by group"
      ]
    },
    B: {
      summary: "As a result of your decision (B), accuracy improves, but harmful content may linger longer.",
      benefits: [
        "Fewer wrongful removals; more trust",
        "Transparent stats build legitimacy",
        "Better training data for future calls"
      ],
      harms: [
        "Exposure window for harms increases",
        "Higher coordination + tooling costs",
        "Bad actors may exploit delays"
      ]
    },
    C: {
      summary: "As a result of your decision (C), legitimacy rises with shared enforcement, but quality can vary by reporter.",
      benefits: [
        "Wider buy-in across communities",
        "Some repeat offenders reform",
        "Local knowledge improves context"
      ],
      harms: [
        "Inconsistent case quality and pace",
        "Training + oversight overhead",
        "Risk of factional capture without audits"
      ]
    }
  },
  "L7-S3": {
    A: {
      summary: "As a result of your decision (A), safety is immediate, but reintegration and learning are not modeled.",
      benefits: [
        "Clear boundary; fast reassurance for survivors",
        "Simpler enforcement going forward",
        "Deterrence visible to others"
      ],
      harms: [
        "No demonstration of repair",
        "Evasion attempts drive costs",
        "Harsh for borderline cases"
      ]
    },
    B: {
      summary: "As a result of your decision (B), some offenders reform under structure, but trust is conditional on strict enforcement.",
      benefits: [
        "Measured reintegration; behavior can improve",
        "Evidence on which guardrails work",
        "Survivors see visible compliance checks"
      ],
      harms: [
        "Risk of relapse under lighter controls",
        "Monitoring overhead and complexity",
        "Survivors may feel unsafe if violations slip"
      ]
    },
    C: {
      summary: "As a result of your decision (C), community healing increases, but time and skill demands are high.",
      benefits: [
        "Survivor agency and closure",
        "Deeper norm change; lower recidivism",
        "Public model for digital repair"
      ],
      harms: [
        "High emotional/time investment",
        "Limited capacity; not for all cases",
        "Failure can retraumatize if mishandled"
      ]
    }
  },
  "L7-S4": {
    A: {
      summary: "As a result of your decision (A), deterrence stays strong, but trust depends on audits and opt-outs.",
      benefits: [
        "Ongoing reduction in harassment",
        "Metrics enable oversight and tuning",
        "Clear rules for data handling"
      ],
      harms: [
        "Misidentifications persist (though fewer)",
        "Community skepticism remains",
        "Compliance and auditing costs increase"
      ]
    },
    B: {
      summary: "As a result of your decision (B), dignity improves, but peak coverage may thin.",
      benefits: [
        "Fewer profiling incidents",
        "Stronger resident–steward relationships",
        "Better prevention and reporting"
      ],
      harms: [
        "Limited night/peak capacity",
        "Higher training/staffing costs",
        "Slower response in rare high-risk cases"
      ]
    },
    C: {
      summary: "As a result of your decision (C), policy gains a clear mandate, but incidents can rise during the pause.",
      benefits: [
        "Democratic legitimacy and clarity",
        "Stronger acceptance post-vote",
        "Enables reset with community norms"
      ],
      harms: [
        "Short-term safety dip possible",
        "Voting fatigue/low turnout risks",
        "Administration burden to run the process"
      ]
    }
  },
  "L7-S5": {
    A: {
      summary: "As a result of your decision (A), public pressure rises, but clients lose insider protection now.",
      benefits: [
        "Strong external signal and scrutiny",
        "Clear stance and focus for reform",
        "New coalitions mobilize quickly"
      ],
      harms: [
        "Short-term service gaps for vulnerable users",
        "Less day-to-day influence on fixes",
        "Risk of politicizing the issue"
      ]
    },
    B: {
      summary: "As a result of your decision (B), clients keep services while reforms advance, but personal risk increases.",
      benefits: [
        "Service continuity for vulnerable groups",
        "Measurable, steady reforms",
        "Institutional learning sticks"
      ],
      harms: [
        "Burnout and retaliation risks",
        "Slower reputation repair",
        "Requires strong oversight partners"
      ]
    },
    C: {
      summary: "As a result of your decision (C), leverage is clear and clients have a safety net if exit occurs.",
      benefits: [
        "Focused timelines drive action",
        "Binary outcome clarifies accountability",
        "Reduced harm if departure happens"
      ],
      harms: [
        "Negotiation may stall or dilute terms",
        "Monitoring/reporting overhead",
        "Risk of abrupt transition at deadline"
      ]
    }
  }
};

export function describeResult(opts:{
  scenario: Scenario;
  choice: 'A'|'B'|'C';
  p3:{people:boolean; planet:boolean; parity:boolean};
}): ResultData {
  const {scenario, choice} = opts;
  
  // Look up the specific result for this scenario and choice
  const scenarioResults = RESULTS_MAP[scenario.scenario_id];
  if (scenarioResults && scenarioResults[choice]) {
    return scenarioResults[choice];
  }
  
  // Fallback to generic result if not found
  const pick = scenario.choices[choice] || "";
  const benefits:string[] = [];
  const harms:string[] = [];

  // Lightweight heuristics for live feedback (fallback only)
  if (pick.toLowerCase().includes("transition") || pick.toLowerCase().includes("audit")) {
    benefits.push("Introduces accountability and a path to improvement");
  }
  if (pick.toLowerCase().includes("shutdown") || pick.toLowerCase().includes("pause")) {
    harms.push("Service disruption risk increases in the short term");
    benefits.push("Halts ongoing harms while protections are built");
  }
  if (pick.toLowerCase().includes("immediate") || pick.toLowerCase().includes("restrict")) {
    benefits.push("Reduces exposure to known risks quickly");
  }

  if (!benefits.length) benefits.push("Maintains continuity for current users");
  if (!harms.length && pick.toLowerCase().includes("keep")) harms.push("Continues existing risks and inequities");

  const summary = `As a result of your decision (${choice}), ${benefits[0]?.toLowerCase() || 'some impacts follow'}.`;

  return { summary, benefits, harms };
}
