// Current custom-build offers. Historical service copy stays in the original audit.
export const signatureServices = [
  {
    id: 'automation', need: 'automation', number: '01', title: 'Flowback',
    category: 'Workflow automation', icon: 'workflow', visual: '/assets/analytics-dial.png',
    tagline: 'Keep the work moving. Recover the part that stopped.',
    description: 'Connected workflows with a recovery desk: see what completed, isolate what failed, and approve a safe next step.',
    detailParagraphs: [
      'We build lead routing, onboarding, document processing and reporting around your existing tools. Flowback adds a recovery desk that shows the completed steps, the failed handoff and the person responsible for getting it moving again.',
      'A delayed invoice sync should not restart a paid order. We design each supported recovery path to check what already happened, then resume only the unfinished work. Uncertain actions go to your team for review.'
    ],
    signature: {
      name: 'Safe Replay Desk',
      description: 'A receipt for every step, with a recovery path your team can inspect before it runs.',
      steps: [
        ['Trace the run', 'See the input, result and completion status of each connected step.'],
        ['Check the next move', 'Review the failed step and check for an existing result before retrying.'],
        ['Resume with a receipt', 'Approve supported retries; route uncertain cases to an owner.']
      ],
      example: 'An order is paid, but the invoice sync fails. The desk checks for an existing invoice and queues the missing sync for approval.',
      preview: ['Payment · completed', 'Invoice sync · needs review', 'Recovery · awaiting approval']
    },
    details: [
      {label: 'WHAT WE BUILD', items: ['Workflow map and connected integrations', 'Step receipts and exception ownership', 'Supported recovery paths and team handover']},
      {label: 'WHERE IT FITS', items: ['Lead routing and onboarding', 'Invoices, documents and reconciliation', 'Teams with repeatable work across tools']},
      {label: 'YOUR BUILD PLAN', items: ['Recovery rules tested on your tools', 'Actions without a safe retry stay in review', 'Custom scope, quote and support plan']}
    ]
  },
  {
    id: 'voice', need: 'voice', number: '02', title: 'Carryline',
    category: 'Voice & conversation systems', icon: 'voice', visual: '/assets/process-hands.png',
    tagline: 'The conversation changes channel. The context comes along.',
    description: 'Voice, chat and WhatsApp connected by a shared handoff brief: what was asked, what was agreed, and who takes over.',
    detailParagraphs: [
      'We build Hindi and English agents for enquiries, qualification and booking. Carryline connects the channels you choose to the same conversation brief, so an approved handoff carries useful context into the next interaction.',
      'The brief separates confirmed facts, unresolved questions and promised next steps. A human handoff gets a named owner, an acceptance status and a fallback if nobody picks it up. Customer records are linked through verified details or a continuation link.'
    ],
    signature: {
      name: 'Context Passport',
      description: 'A compact, source-linked brief that travels with the enquiry and stays open until someone accepts the next step.',
      steps: [
        ['Keep confirmed context', 'Capture the request, agreed details and questions still unanswered.'],
        ['Carry it forward', 'Connect the next channel through verified identity or a continuation link.'],
        ['Confirm the handoff', 'Name the next owner and trigger the agreed fallback if they cannot accept.']
      ],
      example: 'A buyer asks on WhatsApp, calls later and needs an agent. The agent receives the property, preferred time and unanswered question before accepting the handoff.',
      preview: ['WhatsApp · enquiry captured', 'Phone · context carried', 'Agent · handoff accepted']
    },
    details: [
      {label: 'WHAT WE BUILD', items: ['Tone-trained voice and chat agents', 'Shared enquiry brief and calendar wiring', 'Human handoff, ownership and fallback rules']},
      {label: 'WHERE IT FITS', items: ['Bookings and appointment enquiries', 'Property, fitness and service businesses', 'Teams answering across phone and messaging']},
      {label: 'YOUR BUILD PLAN', items: ['Channels and languages agreed together', 'Identity checks and retention rules scoped', 'Custom scope, quote and support plan']}
    ]
  },
  {
    id: 'web', need: 'website', number: '03', title: 'IntentPath',
    category: 'Websites & guided enquiries', icon: 'globe', visual: '/assets/growth-chart.png',
    tagline: 'Turn “I’m interested” into a brief worth answering.',
    description: 'A carefully designed website that helps visitors choose a route, build an editable brief, and reach the right person.',
    detailParagraphs: [
      'We bring copy, design, development and measurement into one build. IntentPath adds a guided enquiry journey that helps visitors describe their goal, constraints and next step without navigating a wall of services.',
      'Their answers become a Decision Brief they can check and edit before sending. Your team receives the need, the relevant route and the questions still open. Suggestions follow your approved service rules; quotes remain yours to prepare.'
    ],
    signature: {
      name: 'Decision Brief',
      description: 'A visitor-approved brief that connects the website journey to the first useful sales conversation.',
      steps: [
        ['Ask what matters', 'Collect a few relevant answers about the goal and constraints.'],
        ['Build the brief', 'Show an editable summary and a suggested route based on your offers.'],
        ['Send with context', 'Route the approved brief to your team with a clear next step.']
      ],
      example: 'A visitor wants to reduce missed enquiries. The site helps them explain their channels, hours and bottleneck, then sends a brief for a scoped conversation build.',
      preview: ['Goal · fewer missed enquiries', 'Brief · visitor reviewed', 'Next step · scoped consultation']
    },
    details: [
      {label: 'WHAT WE BUILD', items: ['Brand, copy and responsive development', 'Guided enquiry and editable Decision Brief', 'CMS, analytics and CRM routing as scoped']},
      {label: 'WHERE IT FITS', items: ['Service businesses with complex enquiries', 'Brands with several customer journeys', 'Teams needing useful context before a call']},
      {label: 'YOUR BUILD PLAN', items: ['Routes based on your actual services', 'Visitor reviews the brief before sending', 'Custom scope, quote and support plan']}
    ]
  },
  {
    id: 'software', need: 'software', number: '04', title: 'PreviewOps',
    category: 'Custom software & business tools', icon: 'code', visual: '/assets/about-sculpture.png',
    tagline: 'See the change before your team commits to it.',
    description: 'Portals and internal tools with an approval preview: inspect affected records, review the change, then commit with a receipt.',
    detailParagraphs: [
      'We build the member apps, dashboards, portals and internal tools your team actually needs. PreviewOps gives selected business actions a Change Rehearsal: the records involved, the proposed changes and the checks required before approval.',
      'An operator can review a bulk update or scheduling change before it reaches live records. The system checks permissions and whether the data has changed since the preview, then saves a before-and-after receipt for the approved action.'
    ],
    signature: {
      name: 'Change Rehearsal',
      description: 'A preview and approval step for the business actions where a wrong click creates expensive cleanup.',
      steps: [
        ['Preview the impact', 'Show affected records and proposed changes for the scoped action.'],
        ['Review and approve', 'Check permissions, required approvals and any conflicting edits.'],
        ['Commit with a receipt', 'Apply the approved change and retain its before-and-after record.']
      ],
      example: 'An operator changes a trainer’s roster. The preview lists the affected bookings and conflicts before an authorized manager applies the update.',
      preview: ['Roster change · previewed', 'Booking conflicts · flagged', 'Manager · approval required']
    },
    details: [
      {label: 'WHAT WE BUILD', items: ['Portals, dashboards and fixed-scope MVPs', 'Roles, permissions and action previews', 'Change receipts, documentation and handover']},
      {label: 'WHERE IT FITS', items: ['Bulk edits and scheduling operations', 'Member, vendor and customer portals', 'Teams outgrowing spreadsheets']},
      {label: 'YOUR BUILD PLAN', items: ['Preview coverage defined per action', 'External effects shown where measurable', 'Custom scope, quote and support plan']}
    ]
  },
  {
    id: 'crm', need: 'crm', number: '05', title: 'PledgeDesk',
    category: 'CRM & customer follow-through', icon: 'chart', visual: '/assets/analytics-dial.png',
    tagline: 'Every customer promise gets an owner and a next step.',
    description: 'A CRM that tracks the commitments inside conversations, with source evidence, confirmed deadlines and follow-up ownership.',
    detailParagraphs: [
      'We connect your pipeline, enquiries and follow-up around how you sell. PledgeDesk adds a Commitment Radar for the small promises that disappear into call notes: send the quote, confirm availability, arrange the demo or call back on Friday.',
      'From the notes and messages you approve, it drafts a commitment with a source excerpt, owner and proposed due date. Your team confirms ambiguous details. Reminders follow the agreed rules, and the item closes when completion is recorded.'
    ],
    signature: {
      name: 'Commitment Radar',
      description: 'Turn an agreed next step into an accountable CRM item, with the original conversation attached.',
      steps: [
        ['Find the promise', 'Draft a commitment from approved notes or messages, with its source.'],
        ['Confirm the details', 'Assign an owner and deadline; ask for review when either is unclear.'],
        ['Follow it through', 'Track completion and remind the owner before the agreed deadline.']
      ],
      example: '“I’ll send the revised quote on Friday” becomes a source-linked task. The sales owner confirms the date and closes it when the quote is sent.',
      preview: ['Revised quote · promised', 'Friday · deadline confirmed', 'Sales owner · follow-up assigned']
    },
    details: [
      {label: 'WHAT WE BUILD', items: ['Pipelines, lead routing and nurture', 'Source-linked commitments and review queue', 'Owner reminders and completion tracking']},
      {label: 'WHERE IT FITS', items: ['Sales teams juggling active enquiries', 'Quotes, demos and callback promises', 'Businesses with long follow-up cycles']},
      {label: 'YOUR BUILD PLAN', items: ['Source access and retention agreed', 'Ambiguous promises require confirmation', 'Custom scope, quote and support plan']}
    ]
  }
];
