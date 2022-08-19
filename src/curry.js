function curry(fun,save=true){
    const summon=(args,rest)=>(rest?arg=>summon([...args, arg],rest-1):fun(...args));
    const result=summon([],fun.length);
    if(save)result.origin=fun;
    return result;
}
function curry_any(fun,save=true){
    let args="",i=0,s=fun.toString(),result,flag=0,head="";
    if(s.substring(0,8)=='function'){
        while(s[i]!='(')++i;
        for(++i;s[i]!='{';++i)args+=s[i];
    }else{
        while(!(('a'<=s[i]&&s[i]<='z')||('A'<=s[i]&&s[i]<='Z')))++i;
        for(;s[i]!='>';++i)args+=s[i];
        while(++i){
            if(s[i]=='{')break;
            if(s[i]!='{'&&s[i]!=' '){
                flag=1;
                break;
            }
        }
    }
    args=args.replace(/[^_^,|^\[a-zA-Z0-9\]]/g,'').split(',');
    args.forEach(v=>head+=`${v}=${v}[0];`);
    if(flag==0)result=new Function(`...${args[args.length-1]}`,head+`arguments=Object.assign({},[${args.toString()}]);`+s.substring(i+1,s.length-1));
    else result=new Function(`...${args[args.length-1]}`,`${head}arguments=Object.assign({},[${args.toString()}]);return ${s.substring(i,s.length)}`);
    for(let j=args.length-2;j>=0;--j)result=new Function(`...${args[j]}`,`let _u=${result.toString()},_t=${args[j]};if(_t.length>1)for(let i=1;i<_t.length;++i)_u=_u(_t[i]);return _u;`);
    if(save)result.origin=fun;
    return result;
}
function uncurry(fun){
    return fun.origin;
}
export { curry,curry_any,uncurry };