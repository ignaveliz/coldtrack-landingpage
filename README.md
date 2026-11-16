# ColdTrack · Landing page

Landing de ColdTrack hecha con Vite, React y Tailwind CSS 4. Colores, logos y tipografía salen del
brand board de Canva: azul `#004aad`, navy `#0b1b3d`, el amarillo de la estrella del isotipo
(`#ffe476`) y Montserrat Negrita para títulos (Geist para texto). El hero tiene a Tracky y
una vista del dashboard armada en HTML. Los logos están en `public/logos` (`mark-*`, `icon-*`). Tiene tema claro y oscuro; la preferencia se guarda en `localStorage`
con la clave `coldtrack-theme`, la misma que usa el dashboard.

La mascota 3D es "Tracky", una heladera hecha con react-three-fiber: aparece en el
hero, saluda al cargar, sigue el cursor con la mirada y vuelve a saludar si le hacés clic.
Se carga de forma diferida para que no frene la primera pintura.

```bash
npm install
npm run dev
npm run build
```

Para que los botones "Ingresar" apunten al dashboard, creá un `.env` con
`VITE_DASHBOARD_URL=https://tu-dashboard`.
