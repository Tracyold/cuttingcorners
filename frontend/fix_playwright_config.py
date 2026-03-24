f = "playwright.config.ts"
s = open(f).read()

s = s.replace(
    "    // baseURL: 'http://localhost:3000',", "    baseURL: 'http://localhost:3000',"
)

s = s.replace(
    "  // webServer: {\n  //   command: 'npm run start',\n  //   url: 'http://localhost:3000',\n  //   reuseExistingServer: !process.env.CI,\n  // },",
    "  webServer: {\n    command: 'yarn dev',\n    url: 'http://localhost:3000',\n    reuseExistingServer: true,\n  },",
)

open(f, "w").write(s)
print("✓ Done")
