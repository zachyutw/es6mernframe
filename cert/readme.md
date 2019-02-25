- PEM pass:qwer1234
- ref[https://justmarkup.com/log/2018/05/https-valid-certificate-local-domain/]
### Create the root.cnf
```
openssl req -x509 -new -keyout root.key -out root.cer -config root.cnf
```
The script will ask for a PEM pass phrase – enter something – it should be secure and you should remember it.

### Create the server.cnf
```
openssl req -nodes -new -keyout server.key -out server.csr -config server.cnf
```
### Generate the certificate
```
openssl x509 -req -in server.csr -CA root.cer -CAkey root.key -set_serial 123 -out server.cer -extfile server.cnf -extensions x509_ext
```
### server.js

add 
```
const sslOptions = {
    key: fs.readFileSync("./cert/server.key"),
    cert: fs.readFileSync("./cert/server.cer")
};

https.createServer(sslOptions, app).listen(3001);
```