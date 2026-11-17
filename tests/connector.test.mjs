import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const run=(env={},args=[])=>spawnSync(process.execPath,[root+'/bin/vultron.mjs',...args],{env:{...process.env,VULTRON_HOME:'',...env},encoding:'utf8',windowsHide:true,timeout:5000});
test('missing installation fails on stderr, never pollutes MCP stdout',()=>{const r=run();assert.equal(r.status,1);assert.equal(r.stdout,'');assert.match(r.stderr,/VULTRON_HOME/);});
test('connector forwards stdin/stdout to an installation in a path with spaces',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'vultron connector '));
 try{fs.mkdirSync(dir+'/src');fs.writeFileSync(dir+'/package.json',JSON.stringify({name:'vultron-mcp',type:'module'}));fs.writeFileSync(dir+'/src/mcp.ts','process.stdin.pipe(process.stdout);');
 const r=spawnSync(process.execPath,[root+'/bin/vultron.mjs'],{env:{...process.env,VULTRON_HOME:dir},input:'{"jsonrpc":"2.0","id":1}\n',encoding:'utf8',windowsHide:true,timeout:5000});assert.equal(r.status,0);assert.equal(r.stdout,'{"jsonrpc":"2.0","id":1}\n');assert.equal(r.stderr,'');
 }finally{const resolved=fs.realpathSync(dir),temp=fs.realpathSync(os.tmpdir());if(path.dirname(resolved)!==temp||!path.basename(resolved).startsWith('vultron connector '))throw Error('Unsafe fixture cleanup');fs.rmSync(resolved,{recursive:true});}
});
test('wrong installation is rejected before launching anything',()=>{const r=run({VULTRON_HOME:root});assert.equal(r.status,1);assert.equal(r.stdout,'');assert.match(r.stderr,/not a Vultron/);});
