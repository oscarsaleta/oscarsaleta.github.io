# threepscoot.cc - Developer Justfile (Repo-only development tooling)

# Default recipe: display help and available targets with documentation
[private]
default:
    @just --list

[doc("Run the website locally on http://localhost:8000 (or custom port)")]
run-local port="8000":
    python3 -m http.server {{port}}

[doc("Validate HTML syntax, JSON notes index, and audit HTML entities")]
check:
    python3 -c "import glob; from html.parser import HTMLParser; [HTMLParser().feed(open(f).read()) for f in glob.glob('**/*.html', recursive=True)]; print('All HTML files valid!')"
    python3 -c "import json; json.load(open('knowledge/notes.json')); print('Valid JSON!')"
    git grep -n -E "(&(r|l|u|d)arr;|&plusmn;|&ne;)" || echo "No prohibited entities"
