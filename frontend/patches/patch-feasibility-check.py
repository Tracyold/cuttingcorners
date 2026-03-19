path = 'pages/feasibility-check.tsx'
with open(path) as f:
    content = f.read()

# 1. Add import
content = content.replace(
    "import { autoSelectAll } from '../components/feasibility-test/logic/autoSelect'",
    "import { autoSelectAll } from '../components/feasibility-test/logic/autoSelect'\nimport { trackWizardAnalytics } from '../lib/wizardResultsService'"
)

# 2. Add disclaimer timestamp state
content = content.replace(
    "  const [check1,     setCheck1]     = useState(false)\n  const [check2,     setCheck2]     = useState(false)",
    "  const [check1,     setCheck1]     = useState(false)\n  const [check2,     setCheck2]     = useState(false)\n  const [disc1ConfirmedAt, setDisc1ConfirmedAt] = useState<string | null>(null)\n  const [disc2ConfirmedAt, setDisc2ConfirmedAt] = useState<string | null>(null)"
)

# 3. Capture disc1 timestamp
content = content.replace(
    "onConfirmDisc1={() => { if (check1) setIntroPhase('disc1exit') }}",
    "onConfirmDisc1={(ts) => { if (check1) { setDisc1ConfirmedAt(ts); setIntroPhase('disc1exit') } }}"
)

# 4. Capture disc2 timestamp
content = content.replace(
    "onConfirmDisc2={() => { if (check2) setIntroPhase('disc2exit') }}",
    "onConfirmDisc2={(ts) => { if (check2) { setDisc2ConfirmedAt(ts); setIntroPhase('disc2exit') } }}"
)

# 5. Fire analytics on results
old_results = "    if (nextStep?.type === 'results') {\n      setResults(calculateAll(positiveChecked, limitingChecked, structuralChecked, correctableSelections))\n    }"
new_results = (
    "    if (nextStep?.type === 'results') {\n"
    "      const r = calculateAll(positiveChecked, limitingChecked, structuralChecked, correctableSelections)\n"
    "      setResults(r)\n"
    "      const sessionId = sessionStorage.getItem('wiz_session') ?? (() => {\n"
    "        const id = Math.random().toString(36).slice(2)\n"
    "        sessionStorage.setItem('wiz_session', id)\n"
    "        return id\n"
    "      })()\n"
    "      trackWizardAnalytics({\n"
    "        stoneInfo,\n"
    "        positiveSelections:    Array.from(positiveChecked),\n"
    "        limitingSelections:    Array.from(limitingChecked),\n"
    "        structuralSelections:  Array.from(structuralChecked),\n"
    "        correctableSelections: correctableSelections as Record<string, string | null>,\n"
    "        results: r,\n"
    "        disclaimer1ConfirmedAt: disc1ConfirmedAt,\n"
    "        disclaimer2ConfirmedAt: disc2ConfirmedAt,\n"
    "      }, sessionId, true, 'results')\n"
    "    }"
)
content = content.replace(old_results, new_results)

with open(path, 'w') as f:
    f.write(content)
print("Done.")
