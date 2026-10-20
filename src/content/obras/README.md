# Galería de obras

Cada obra publicada es una carpeta aquí. El nombre de la carpeta es la URL:
`2025-08-surco-excavacion-sotano/` → `https://mrxcontratistas.pe/obras/2025-08-surco-excavacion-sotano/`

La ficha completa (con documentos y originales) vive fuera del repo, en
`01-activos/02-obras/` del proyecto MRX. Aquí solo se copia **lo que se publica**.

## Añadir una obra

```
src/content/obras/2025-08-surco-excavacion-sotano/
├── index.md
├── 01-antes.jpg
├── 02-durante.jpg
└── 03-despues.jpg
```

`index.md`:

```markdown
---
titulo: Excavación de sótano para edificio multifamiliar
fecha: 2025-08
distrito: Santiago de Surco
servicio: excavacion   # excavacion | movimiento-tierras | demolicion | proteccion-contencion | eliminacion-desmonte | alquiler-maquinaria | obras-civiles
resumen: Excavación de 1,200 m³ para dos sótanos, con eliminación de desmonte en botadero autorizado.
volumen: 1,200 m³
duracion: 12 días
maquinaria: Excavadora 20 t, 2 volquetes 15 m³
# cliente: Constructora XYZ   ← solo si autorizó mostrar su nombre
portada: ./03-despues.jpg
portadaAlt: Sótano excavado y perfilado listo para cimentar
fotos:
  - { src: ./01-antes.jpg, alt: Terreno antes de la excavación, etapa: antes }
  - { src: ./02-durante.jpg, alt: Excavadora cargando volquete, etapa: durante }
  - { src: ./03-despues.jpg, alt: Sótano terminado, etapa: despues }
videos:
  - { youtube: dQw4w9WgXcQ, titulo: Timelapse de la excavación }
publicar: true
---

## Reto
## Qué hicimos
## Resultado
```

## Reglas

- **Fotos:** JPG o WebP, máx. ~2500 px de ancho y < 1 MB cada una. Astro genera
  las versiones optimizadas; no subir originales de 8 MB.
- **Videos:** se suben a YouTube (pueden ser "no listados") y aquí va solo el ID.
  Los videos no van en el repo: GitHub limita el tamaño de los archivos y del repositorio.
- **Permisos:** sin nombre del cliente salvo autorización; sin placas ni caras de terceros.
- `publicar: false` deja la obra fuera de la web sin borrarla.
- El build falla si falta un campo obligatorio o una foto no existe: es intencional.
