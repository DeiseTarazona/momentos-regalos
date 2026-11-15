# Momentos & Regalos – Tienda virtual

*Pequeños detalles, grandes emociones.* Huancayo, Junín, Perú.

Catálogo de boxes personalizados y regalos digitales. Cada producto se solicita
directamente por WhatsApp (sin carrito ni pasarela de pago).

## Estructura

```
momentos-regalos/
├── index.html        Página principal (estructura y SEO)
├── css/estilos.css   Estilos y colores de marca
├── js/app.js         Datos de productos y lógica (catálogo, filtros, WhatsApp)
└── img/              Fotos de los boxes (WebP optimizado)
```

## Verla en tu computadora

Doble clic en `index.html`.

## Qué editar (todo al inicio de `js/app.js`)

| Qué | Dónde |
|---|---|
| Número de WhatsApp | `CONFIG.whatsapp` (`'51935007861'`) |
| Instagram y TikTok | `CONFIG.instagram`, `CONFIG.tiktok` (si están vacíos, no se muestran) |
| Boxes, precios y contenido | lista `BOXES` |
| Marcar un box como agotado | en ese box, cambia `stock: 'ok'` por `stock: 'out'` |
| Regalos digitales, precios y videos | lista `DIGITAL` (campos `video` y `poster`) |
| Costo de delivery | textos en `index.html` (busca "S/ 6.00") |

### Agregar un box nuevo
1. Guarda la foto en `img/` (ej.: `box-cumpleanero-7.webp` o `.jpg`).
2. En `js/app.js`, copia un bloque de `BOXES`, pégalo debajo y cambia nombre, precio, contenido y la ruta de la foto.

## Publicar con GitHub Pages

1. Sube **todo el contenido** de esta carpeta (incluidas `img/` y `video/`) a tu repositorio.
2. **Settings → Pages → Deploy from a branch → main → / (root) → Save**.
3. Tu tienda queda en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.
