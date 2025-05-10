# 🧠 NeuroCheck – Frontend

**NeuroCheck** es una plataforma web de evaluación cognitiva asistida por IA, diseñada para contextos rurales y urbanos de Bolivia. Este repositorio contiene el frontend de la aplicación, desarrollado con tecnologías modernas y preparado para integrar módulos como reconocimiento por voz, predicción de Alzheimer, Demencia y Deterioro Cognitivo leve mediante lecturas EEG y evaluación en idioma aymara.

---

## 🚀 Tecnologías utilizadas

- [Vite](https://vitejs.dev/) – Bundler ultrarrápido
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) – Interfaz robusta y tipada
- [Tailwind CSS](https://tailwindcss.com/) – Estilizado utility-first
- [shadcn/ui](https://ui.shadcn.com/) – Componentes accesibles y personalizables
- [Firebase](https://firebase.google.com/) – Almacenamiento, Firestore y autenticación (opcional)
- [FastAPI](https://fastapi.tiangolo.com/) – Backend REST (conectado externamente)

---

## 🧩 Estructura del proyecto
| Carpeta           | Descripción                                     |
|-------------------|-------------------------------------------------|
| `components/`     | 🧩 Componentes reutilizables de UI              |
| `pages/`          | 📄 Vistas principales                           |
| `hooks/`          | 🧠 Hooks personalizados (e.g., resultados)      |
| `contexts/`       | 🌐 Contextos globales (idioma, estado, etc.)    |
| `assets/`         | 🖼️ Recursos estáticos (imágenes, sonidos, etc.)|
| `utils/`          | 🧰 Funciones auxiliares                         |


---

## 🧪 Funcionalidades clave

- Registro de pacientes y consentimiento digital
- Formularios inteligentes para datos demográficos y clínicos
- Subida de archivos EEG (.set, .edf)
- Visualización de resultados: Índice de Riesgo Cognitivo (IRC), gráfico semafórico
- Soporte para idioma **español y aymara**
- Interacción por voz (Whisper STT + ElevenLabs TTS)
- Preparado para PWA y despliegue en contextos offline

---
## 🧩 Módulos del Proyecto

| Módulo         | Descripción                                                                                 | Enlace                                                              |
| -------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| 🧠 Backend API | Servidor FastAPI con endpoints de evaluación, datos clínicos, y LLM                         | [neurocheck-server](https://github.com/Jhuly1215/neurocheck-server) |
| ⚡ EEG Engine   | Código de preprocesamiento y modelos de IA EEG multimodal                                   | [neurocheck\_eeg](https://github.com/cesarveraa/neurocheck_eeg)     |
| 💻 Frontend    | (este repositorio) Aplicación web con interfaz conversacional y visualización de resultados | Este repositorio                                                    |

## 📊 Datasets Utilizados

El proyecto se desarrolló utilizando múltiples datasets clínicos y lingüísticos, detallados a continuación:

| Dataset                                                                                                     | Descripción                                                                                      |
|-------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| [Alzheimer's Disease Dataset](https://www.kaggle.com/datasets/rabieelkharoua/alzheimers-disease-dataset)   | Datos clínicos de pacientes con enfermedad de Alzheimer.                                         |
| [Dementia Dataset](https://www.kaggle.com/datasets/fatemehmehrparvar/dementia)                              | Conjunto de datos sobre demencia que incluye varias características clínicas y cognitivas.       |
| [OpenNeuro EEG - ds004504](https://openneuro.org/datasets/ds004504/versions/1.0.7)                          | Datos EEG públicos para evaluación cognitiva, usado en el módulo de procesamiento de señales EEG.|
| [Aymara-Spanish Translation Dataset](https://github.com/AmericasNLP/americasnlp2021/tree/main/data/aymara-spanish) | Usado para la traducción al idioma aymara, facilitando la accesibilidad multilingüe del sistema.|

## ⚙️ Instalación local

```bash
# 1. Clonar el repositorio
git clone https://github.com/tuusuario/neurocheck-frontend.git
cd neurocheck-frontend
# 2. Instalar dependencias
npm install
# 3. Ejecutar el entorno de desarrollo
npm run dev
