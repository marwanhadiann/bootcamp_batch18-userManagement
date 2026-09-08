const http = require('http');
const fs = require('fs')

const server = http.createServer((req, res) => {
    const url = new URL(
        req.url,
        `http://${req.headers.host}`
    )

    console.log('Requested Path:', url.pathname)

    if (url.pathname === '/') {
        fs.readFile('./index.html', 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                })
                res.end('Server tidak ditemukan')
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(data)
        })
    } else if (url.pathname === '/user') {
        fs.readFile('./user.html', 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                })

                res.end('Server tidak ditemukan')
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(data)
        })
    } else if (url.pathname === '/about') {
        fs.readFile('./about.html', 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                })
                res.end('Server tidak ditemukan')
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(data)
        })
    } else if (url.pathname === '/contact') {
        fs.readFile('./contact.html', 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                })
                res.end('Server tidak ditemukan')
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(data)
        })
    } else {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(`
        <h1>404 - Server Not Found</h1>
        `)
    }
});

server.listen(3000)