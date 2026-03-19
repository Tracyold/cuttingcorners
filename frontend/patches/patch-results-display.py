import React
path = 'components/feasibility-test/ui/ResultsDisplay.tsx'
with open(path) as f:
    content = f.read()

# 1. Add imports
content = content.replace(
    "import ScoreBox from './ScoreBox'",
    "import ScoreBox from './ScoreBox'\nimport SaveToAccountButton from './SaveToAccountButton'\nimport { supabase } from '../../../lib/supabaseClient'"
)

# 2. Add isLoggedIn state + savePayload before handleExport
old = "  const handleExport = () => window.print()"
new = (
    "  const [isLoggedIn, setIsLoggedIn] = React.useState(false)\n\n"
    "  React.useEffect(() => {\n"
    "    supabase.auth.getUser().then(({ data }) => {\n"
    "      setIsLoggedIn(!!data.user && data.user.email !== process.env.NEXT_PUBLIC_GUEST_ACCOUNT_EMAIL)\n"
    "    })\n"
    "  }, [])\n\n"
    "  const savePayload = {\n"
    "    stoneInfo,\n"
    "    positiveSelections:    [],\n"
    "    limitingSelections:    [],\n"
    "    structuralSelections:  [],\n"
    "    correctableSelections: {},\n"
    "    results,\n"
    "  }\n\n"
    "  const handleExport = () => window.print()"
)
content = content.replace(old, new)

# 3. Add SaveToAccountButton before Export button
content = content.replace(
    "          <button type=\"button\" onClick={handleExport} className=\"btn-export\">",
    "          <SaveToAccountButton payload={savePayload} isLoggedIn={isLoggedIn} />\n          <button type=\"button\" onClick={handleExport} className=\"btn-export\">"
)

with open(path, 'w') as f:
    f.write(content)
print("Done.")
