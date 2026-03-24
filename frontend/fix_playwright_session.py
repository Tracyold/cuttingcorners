f = "playwright.config.ts"
s = open(f).read()

s = s.replace(
    "    baseURL: 'http://localhost:3000',",
    "    baseURL: 'http://localhost:3000',\n    storageState: 'tests/session.json',",
)

open(f, "w").write(s)
print("✓ Done")
