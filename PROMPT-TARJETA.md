Trabaja con el MCP Vultron de este proyecto y reutiliza lo que ya está creado. No construyas la animación desde cero.

1. Lee AGENTS.md/CLAUDE.md si existen y consulta vultron_status, vultron_editing_context, vultron_animation_workflow y vultron_library_catalog.
2. Usa el ejemplo aprobado `tarjeta-con-mano`, correspondiente a la tarjeta de Josh Allen con mano, sombras y datos. Consulta su ficha y la receta original.
3. Esta prueba es UNA animación HORIZONTAL, de 16 segundos, a 768 × 432, sin voz ni música. Mantén exactamente las imágenes, textos, movimientos, tiempos, sombras, tipografías y colores guardados. El objetivo es comprobar que reutilizas la plantilla, no rediseñarla.
4. Usa vultron_prepare_example con un UUID nuevo para esta creación. No modifiques la referencia original. Comprueba vultron_ensure_hosts para After Effects y exige ready=true antes de enviar la escena a vultron_create_motion.
5. Consulta la operación hasta conocer el resultado. No repitas una acción si su resultado es incierto. Verifica en AE las fuentes, los recursos, la colocación de la mano y los textos.
6. Para esta animación independiente usa After Effects. Renderiza UNA prueba de baja resolución, verifica duración, reproducción y ausencia de audio, y muéstramela. No hace falta importar esta prueba en Premiere.
7. Conserva la plantilla original y sus dependencias. Entrega únicamente el video de prueba en la carpeta de animaciones finales indicada por Vultron, con un nombre distinto que incluya CLAUDE. No sobrescribas las pruebas de Codex.
8. Si falta una herramienta, recurso o conexión, informa el bloqueo concreto; no inventes resultados ni sustituyas la plantilla por una animación nueva.
