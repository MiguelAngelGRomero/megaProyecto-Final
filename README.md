# 🎬 megaProyecto - Sprint 2 Hubes  
**by Miguel Angel Gómez Romero**

Este es un proyecto web que simula una plataforma de streaming con navegación entre secciones como **Películas**, **Series**, **Favoritos** y **Configuración**.

---

## 📊 Sprint Review

Aquí está la presentación del Sprint 2, donde se muestran las tareas completadas y los próximos pasos. Puedes ver el documento completo a continuación:

[🔗 Ver presentación Sprint 2 (Google Slides)](https://docs.google.com/document/d/1jvX2du60K6qKAHkLOrE8So7O4oBX9OYkmCtNh-Hy7k0/edit?usp=sharing)

### ✅ Resumen breve del Sprint 2
- Migración a Angular 18 iniciada
- Uso de TypeScript en componentes clave
- Primeras implementaciones de login y consumo de base de datos
- Tareas pendientes: completar login, seguridad y responsividad

---

## 🚀 Características

Este proyecto fue generado con la versión **18.2.18** de Angular usando el [Angular CLI](https://github.com/angular/angular-cli).

- Navegación entre diferentes componentes
- Visualización de series y películas con imágenes
- Separación del contenido por tipo en archivos JSON
- Estilo limpio y responsivo

---

## 📸 Vista previa - Mockups

- **Login**  
  ![Login](./public/img/login.png)

- **Inicio**  
  ![Inicio](./public/img/hubes.png)

- **Favoritos**  
  ![Favoritos](./public/img/favoritos.png)

- **Películas**  
  ![Peliculas](./public/img/peliculas.png)

- **Series**  
  ![Series](./public/img/series.png)

- **Configuración**  
  ![Configuración](./public/img/configuracion.png)

---

## ❌ ¿Qué hice mal?
- Manejar los cambios directamente en la rama `main` ❎  
- No implementar correctamente la vista de las películas ❎

---

## ✔️ ¿Qué hice bien?
- Implementar una vista agradable para las películas ✅  
- Implementar botones reactivos ✅  
- Seguir buenas prácticas de desarrollo ✅

---

## ⚙️ Tecnologías usadas
- Angular 18  
- HTML  
- CSS  
- TypeScript  
- JSON

---

## 📁 Contenido JSON

El contenido multimedia se divide en tres archivos:
- `contenido.json`: Contiene un listado mixto de contenido.
- `series.json`: Contiene un listado exclusivo de series.
- `peliculas.json`: Contiene un listado exclusivo de películas.
