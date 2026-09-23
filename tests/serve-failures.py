"""Serve a local-only test site: first workbench fetch fails; clipboard is denied."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
class Handler(SimpleHTTPRequestHandler):
    failed = False
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(Path(__file__).resolve().parents[1]/"dist"), **kwargs)
    def do_GET(self):
        if self.path == "/assets/workbench-data.json" and not Handler.failed:
            Handler.failed=True
            self.send_error(503,"Intentional one-time QA failure")
            return
        super().do_GET()
    def end_headers(self):
        self.send_header("Permissions-Policy", "clipboard-write=()")
        super().end_headers()
ThreadingHTTPServer(("127.0.0.1",5174),Handler).serve_forever()
