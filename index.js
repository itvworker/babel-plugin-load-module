



module.exports = function ({ types: t }) {
    return {
        visitor: {
            ImportDeclaration(path, { opts }) {
                //判断是否引入了pix组件
                if(path.node.source.value!==opts.name) return;

                //判断是否为按需引入
                let node = path.node;
                let spc = node.specifiers;
                if(spc[0].type ==='ImportDefaultSpecifier') return;
                let arr = [];

                if(opts.public) {
                    arr.push(t.ImportDeclaration([],t.stringLiteral(opts.public)));
                }

                spc.forEach((item,index)=>{
                    let jsPath = t.stringLiteral(opts.jsPath.replace(/\{key\}/ig, item.imported.name));
                    let cssPath = t.stringLiteral(opts.cssPath.replace(/\{key\}/ig, item.imported.name));
                    arr.push(t.importDeclaration([], cssPath));
                    let jsData = t.importDeclaration([
                        t.importDefaultSpecifier(
                            t.identifier(item.imported.name)
                        )
                    ], jsPath)
                    arr.push(jsData);
                })

                path.replaceWithMultiple(arr);

            }
        }
    }
}