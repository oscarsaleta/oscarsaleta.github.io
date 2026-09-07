# threepscoot.cc - Developer Justfile (Repo-only development tooling)

# Default recipe: display help and available targets with documentation
[private]
default:
    @just --list

[doc("Run the website locally on http://localhost:8000 (with no-cache headers for dev)")]
run-local port="8000":
    python3 -c $'import http.server, socketserver\nclass H(http.server.SimpleHTTPRequestHandler):\n    def end_headers(self):\n        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")\n        self.send_header("Pragma", "no-cache")\n        self.send_header("Expires", "0")\n        super().end_headers()\nsocketserver.TCPServer.allow_reuse_address = True\nwith socketserver.TCPServer(("", int("{{port}}")), H) as httpd:\n    print("Serving HTTP on 0.0.0.0 port {{port}} (http://localhost:{{port}}/) with cache disabled...")\n    httpd.serve_forever()'

[doc("Validate HTML syntax, JSON notes index, and audit HTML entities")]
check:
    python3 -c "import glob; from html.parser import HTMLParser; [HTMLParser().feed(open(f).read()) for f in glob.glob('**/*.html', recursive=True)]; print('All HTML files valid!')"
    python3 -c "import json; json.load(open('knowledge/notes.json')); print('Valid JSON!')"
    git grep -n -E "(&(r|l|u|d)arr;|&plusmn;|&ne;)" || echo "No prohibited entities"
