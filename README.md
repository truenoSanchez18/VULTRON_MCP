# Vultron MCP Connector

Conecta Claude Code u otro cliente MCP local al motor Vultron ya instalado, su puente Adobe y su biblioteca de animaciones.

Este repositorio contiene el **conector**, no una copia de Adobe ni de la biblioteca privada. El motor existente conserva los trabajos, operaciones y recursos. No hay endpoint remoto ni ejecución de Adobe en GitHub.

## Requisitos

- Windows con Node.js 24 o superior.
- Instalación existente de `vultron-mcp`, con `src/mcp.ts` y biblioteca configurada.
- Para editar: Adobe instalado y su panel Vultron Bridge operativo.
- Cliente MCP ejecutándose localmente en esa computadora, por ejemplo Claude Code.

## Conectar

Si el proyecto ya tiene una entrada `vultron` funcional en `.mcp.json`, úsala; no dupliques la conexión.

Para un proyecto nuevo, desde esta carpeta:

```powershell
node scripts/configure.mjs "C:/ruta/a/tu/proyecto" "C:/ruta/a/vultron-mcp"
```

El configurador escribe `.mcp.json`, conserva otros servidores y no reemplaza una configuración distinta de Vultron. Registra la ruta del Node utilizado y la del motor. No cambia permisos ni aprobaciones de Claude.

Abre esa carpeta en una sesión **local** de Claude Code. Revisa los avisos de confianza/MCP y usa `/mcp` para comprobar `vultron`.

Referencia oficial: https://code.claude.com/docs/en/mcp

## Probar sin empezar desde cero

Pega el contenido de `PROMPT-TARJETA.md`. Las recetas están en el motor existente, no en este repositorio. La versión preparada del motor ofrece `vultron_library_catalog`, `vultron_get_template`, `vultron_references`, `vultron_animation_workflow` y `vultron_prepare_example`.

- `tarjeta-con-mano`: referencia horizontal de 16 segundos, mano y tarjeta con datos.
- `textos-inter-serif`: referencia horizontal de 6 segundos, textos Inter Black e Instrument Serif.

`prepare_example` devuelve una escena validada y no ejecuta Adobe. La creación se realiza mediante `create_motion`, con un UUID estable. La aprobación de una muestra no garantiza el resultado de cualquier cambio de texto, imagen o formato.

## Comprobaciones

```powershell
$env:VULTRON_HOME = 'C:/ruta/a/vultron-mcp'
node bin/vultron.mjs --check
npm test
```

`--check` verifica la instalación, no afirma que Adobe o Claude estén conectados. La prueba real usa `vultron_status`, `vultron_ensure_hosts` y operaciones verificadas.

## Límites y trabajo compartido

Una sola IA debe editar un proyecto Adobe a la vez. Usa trabajos y UUID distintos para comparar clientes. No vuelvas a ejecutar una mutación incierta: consulta su operación. No cierres Adobe a la fuerza sin autorización.

El motor, fuentes y medios permanecen locales. No subas `data/connection.json`, claves, videos privados ni recursos de referencia a GitHub. Copiar este conector a otra computadora no instala el motor ni relinka los AEP.
