import http.server
import socketserver
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

socketserver.TCPServer.allow_reuse_address = True
try:
    with socketserver.TCPServer(("", PORT), NoCacheHandler) as httpd:
        print(f"Serving Negus Consultants at http://localhost:{PORT}")
        httpd.serve_forever()
except Exception as e:
    print(f"Port {PORT} busy or error: {e}")
    PORT = 8081
    with socketserver.TCPServer(("", PORT), NoCacheHandler) as httpd:
        print(f"Serving Negus Consultants fallback at http://localhost:{PORT}")
        httpd.serve_forever()
