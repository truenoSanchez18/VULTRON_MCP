import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const connector=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const [projectArg,homeArg]=process.argv.slice(2);
if(!projectArg||!homeArg)throw Error('Usage: node scripts/configure.mjs <project-folder> <existing-vultron-folder>');
const project=fs.realpathSync(projectArg),home=fs.realpathSync(homeArg);
if(!fs.statSync(project).isDirectory()||JSON.parse(fs.readFileSync(path.join(home,'package.json'),'utf8')).name!=='vultron-mcp')throw Error('Invalid project or Vultron installation');
const file=path.join(project,'.mcp.json');const before=fs.existsSync(file)?fs.readFileSync(file,'utf8'):null;
const config=before?JSON.parse(before.replace(/^\uFEFF/,'')):{};config.mcpServers??={};
const desired={type:'stdio',command:process.execPath,args:[path.join(connector,'bin','vultron.mjs')],env:{VULTRON_HOME:home,VULTRON_MCP_CLIENT:'claude-code'}};
if(config.mcpServers.vultron&&JSON.stringify(config.mcpServers.vultron)!==JSON.stringify(desired))throw Error('Existing Vultron configuration differs. Keep it or review it before replacing; no changes made.');
config.mcpServers.vultron=desired;const after=JSON.stringify(config,null,2)+'\n';
if(before!==after){if(before)fs.writeFileSync(file+'.backup-'+Date.now(),before);fs.writeFileSync(file,after);}
console.log('Configured '+file+'; open this folder locally in Claude Code and check /mcp. Trust settings were not changed.');
