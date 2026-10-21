import http.server
import socketserver
import sys

PORT = 8089

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

socketserver.TCPServer.allow_reuse_address = True
try:
    with socketserver.TCPServer(("", PORT), NoCacheHandler) as httpd:
        print(f"Serving no-cache on port {PORT}")
        httpd.serve_forever()
except Exception as e:
    print(f"Port {PORT} busy, trying 8090: {e}")
    PORT = 8090
    with socketserver.TCPServer(("", PORT), NoCacheHandler) as httpd:
        print(f"Serving no-cache on port {PORT}")
        httpd.serve_forever()
