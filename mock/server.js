let http = require('http');
let fs = require('fs')
let url = require('url')

let sliders = require('./sliders.js')
function read(callback){
    fs.readFile('./book.json','utf8',function(err,data){
        if(err || data.length == 0){
            callback([])
        }else{
            callback(JSON.parse(data))
        }
    })
}
function write(data,cb){
    fs.writeFile('./book.json',JSON.stringify(data),cb)
}
http.createServer((req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control","no-cache");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") return res.end();

    let {pathname,query} = url.parse(req.url,true)

    if(pathname === '/page'){
        let offset = parseInt(query.offset) || 0;
        read(function(books){
           let result =  books.reverse().slice(offset,offset+5);
           let hasMore = true;
           if(books.length <= offset+5){
               hasMore = false;
           }
           res.setHeader('Content-Type','application/json;charset=utf8')
           res.end(JSON.stringify({hasMore:hasMore,books:result}))
        });
        return;
    }
        
    if(pathname === '/sliders'){
        res.setHeader('Content-Type','application/json;charset=utf8')
        return res.end(JSON.stringify(sliders))
    }
    if(pathname === '/hot'){
        res.setHeader('Content-Type','application/json;charset=utf8')
        read(function(books){
            let hot = books.reverse().slice(0,6)
            res.end(JSON.stringify(hot))
        })
        return
    }
    if(pathname === '/book'){
        let id = parseInt(query.id)
        switch(req.method){
            case 'GET':
            if(!isNaN(id)){
                read(function (books){
                    let book = books.find(item=>item.bookId === id)
                    if(!book) book = {}
                    res.setHeader('Content-Type','application/json;charset=utf8');
                    res.end(JSON.stringify(book))
                })
            }else{
                read(function(books){
                    res.setHeader('Content-Type','application/json;charset=utf8');
                    res.end(JSON.stringify(books.reverse()))
                })
            }
            break;
            case 'POST':
            let str =''
            req.on('data',chunk =>{
                str += chunk
            })
            req.on('end',()=>{
                let book = JSON.parse(str)
                read(function(books){
                    book.bookId = books.length ? books[books.length - 1].bookId +1 : 1
                    books.push(book)
                    write(books,function(){
                        res.end(JSON.stringify(book))
                    })
                })
            })
            break;
            case 'PUT':
            if(id){
                let str = '';
                req.on('data',chunk => {
                    str += chunk;
                })
                req.on('end',()=>{
                    let book = JSON.parse(str)
                    read(function(books){
                        books = books.map(item => {
                            if(item.bookId === id){
                                return book
                            }
                            return item
                        })
                        write(books,function(){
                            res.end(JSON.stringify(book))
                        })
                    }) 
                })
            }
            break;
            case 'DELETE':
            read(function(books){
                books = books.filter(item => item.bookId !== id)
                write(books,function(){
                    res.end(JSON.stringify({}))
                });
            });
            break;
        }
        return
    }

    fs.stat('.'+pathname,function(err,stats){
        if(err){
            fs.createReadStream('index.html').pipe(res)
        }else{
            if(stats.isDirectory()){
                let p = require('path').join('.' + pathname,'./index.html')
                fs.createReadStream(p).pipe(res) 
            }else{
                fs.createReadStream('.' + pathname).pipe(res)
            }
        }
    })
}).listen(3000);