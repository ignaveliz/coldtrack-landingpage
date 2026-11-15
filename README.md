# ColdTrack · Landing page

Landing de ColdTrack hecha con Vite, React y Tailwind CSS 4. Los colores de los temas
claro y oscuro, la tipografía (Montserrat, Inter y JetBrains Mono) y los estilos
`glass-panel` son los mismos que usa el dashboard (`ColdTrack-Gateway-Front`).
La preferencia de tema se guarda en `localStorage` con la misma clave (`coldtrack-theme`).

La mascota 3D es "Tracky", una heladera hecha con react-three-fiber: saluda al
cargar la página, sigue el cursor con la mirada y vuelve a saludar si le hacés clic.
Se carga de forma diferida para que no frene la primera pintura.

```bash
npm install
npm run dev
npm run build
```

Para que los botones "Ingresar" apunten al dashboard, creá un `.env` con
`VITE_DASHBOARD_URL=https://tu-dashboard`.
