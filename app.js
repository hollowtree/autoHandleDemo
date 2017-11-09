
/**
 * Module dependencies.
 */

const logger = require('koa-logger');
const serve = require('koa-static');
const koaBody = require('koa-body');
const Koa = require('koa');
const fs = require('fs');
const app = new Koa();
const os = require('os');
const path = require('path');

const unzipper = require('unzipper');
const shell = require('shelljs');

// log requests

app.use(logger());

app.use(koaBody({ multipart: true }));

// custom 404

app.use(async function (ctx, next) {
    await next();
    if (ctx.body || !ctx.idempotent) return;
    ctx.redirect('/404.html');
});

// serve files from ./public

app.use(serve(path.join(__dirname, '/public')));

// handle uploads

app.use(async function (ctx, next) {
    // ignore non-POSTs
    if ('POST' != ctx.method) return await next();
    const file = ctx.request.body.files.file;
    const fileNameArr = file.name.split('.');
    const unzipFileExt = path.extname(file.name);
    const unzipFileName = path.basename(file.name, unzipFileExt);
    // console.log(unzipFileName, unzipFileExt)

    const reader = fs.createReadStream(file.path);
    //   const stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()));
    const now = new Date(),
        nowMonth = now.getMonth() + 1,
        nowDate = now.getDate();
    const zipFilePath = path.join(
        __dirname,
        'storage',
        unzipFileName + '_' + now.getFullYear() + '_' + (nowMonth < 10 ? '0' + nowMonth : nowMonth) + '_' + (nowDate < 10 ? '0' + nowDate : nowDate) + '_' + Math.floor(Math.random() * 10000) + unzipFileExt
    );
    const stream = fs.createWriteStream(zipFilePath);
    reader.pipe(stream).on('close', function () {
        if (unzipFileExt == '.zip') {
            unzipFile(zipFilePath, unzipFileName)
        }
    });
    console.log('uploading %s -> %s', file.name, stream.path);
    ctx.redirect('/');
});

async function unzipFile(filePath, unzipFileName) {
    shell.rm('-rf', path.join(__dirname, 'public', unzipFileName))
    fs.createReadStream(filePath)
        .pipe(unzipper.Extract({ path: 'public/' + unzipFileName }));
}

app.listen(3000);
console.log('listening on port 3000');