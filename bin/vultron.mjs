#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {spawn} from 'node:child_process';
try {
  if(Number(process.versions.node.split('.')[0])<24)throw Error('Vultron requires Node.js 24 or newer.');
  if(!process.env.VULTRON_HOME)throw Error('Set VULTRON_HOME to the existing vultron-mcp installation.');
  const root=fs.realpathSync(path.resolve(process.env.VULTRON_HOME));
  const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
  if(pkg.name!=='vultron-mcp')throw Error('VULTRON_HOME is not a Vultron installation.');
  const entry=path.join(root,'src','mcp.ts');
  if(!fs.statSync(entry).isFile())throw Error('Vultron MCP entry point is missing.');
  if(process.argv.includes('--check')){
    console.log(JSON.stringify({installationFound:true,version:pkg.version,mcpEntryPresent:true,libraryPresent:fs.existsSync(path.join(root,'knowledge','library-index.json')),adobeConnected:'not checked',claudeConnected:'not checked'}));
  }else{
    if(process.argv.length!==2)throw Error('Unsupported arguments. Use no arguments for MCP or --check for diagnostics.');
    const child=spawn(process.execPath,[entry],{cwd:root,env:process.env,stdio:'inherit',windowsHide:true,shell:false});
    child.on('error',e=>{console.error('Unable to start Vultron: '+e.message);process.exitCode=1;});
    child.on('exit',code=>{process.exitCode=code??1;});
    for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>child.kill(signal));
  }
}catch(e){console.error('Vultron connector: '+e.message);process.exitCode=1;}
