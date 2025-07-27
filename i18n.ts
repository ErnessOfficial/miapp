
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  es: {
    translation: {
      common: {
        appName: 'AnImiK',
        comingSoon: '¡Esta función estará disponible próximamente!',
        close: 'Cerrar',
        edit: 'Editar',
        delete: 'Eliminar',
        save: 'Guardar cambios',
        cancel: 'Cancelar'
      },
      header: {
        language: 'Idioma',
        epuLogoAlt: 'Logo de Entre Palabras Urgentes',
      },
      sidebar: {
        dashboard: 'Dashboard',
        myConsciousMovements: 'Mis Movimientos Conscientes',
        chat: 'Chat de Soporte',
        writingMyStory: 'Escribiendo mi Historia',
        wisdomDrops: 'Gotas de Sabiduría',
        braveSteps: 'Mis Pasos Valientes',
        profile: 'Perfil',
        logout: 'Cerrar Sesión',
      },
      registration: {
        title: 'Te damos la bienvenida',
        subtitle: 'Para hacer login, confirma tu dirección de correo electrónico y recibirás un código para continuar tu viaje con AnImik.',
        emailLabel: 'Dirección de correo electrónico',
        emailPlaceholder: 'tu.correo@ejemplo.com',
        codeLabel: 'Código de Acceso',
        codePlaceholder: 'Ingresa el código de 4 dígitos',
        submitButton: 'Continuar',
        verifyButton: 'Verificar y Entrar',
        sendingCode: 'Enviando...',
        fillFieldsError: 'Por favor, ingrese una dirección de correo válida.',
        codeSentSuccess: '¡Código enviado a tu correo!',
        invalidCodeError: 'Código incorrecto. Por favor, inténtalo de nuevo.',
        codeExpiredError: 'El código ha expirado. Por favor, solicita uno nuevo.',
        codeValidityInfo: 'El código es válido por 10 minutos. Tiempo restante: {{time}}',
        resendCode: 'Reenviar código',
        resendCountdown: 'Reenviar en {{seconds}}s',
      },
      dashboard: {
        greeting: '¡Hola, {{name}}!',
        defaultName: 'tú',
        welcomeBack: 'Bienvenido/a de nuevo. Nos alegra verte.',
        wisdomDropNotification: '💧 Tienes una nueva Gota de Sabiduría. Encuéntrala en tu colección.',
        readNow: 'Leer ahora',
      },
      recommendations: {
        title: 'Solo para Ti',
        welcomeMessage: 'Para poder brindarte el mejor soporte y las mejores herramientas que te permitan alcanzar un buen nivel de bienestar emocional, es necesario conocer un poco más sobre tu nivel actual de bienestar. Te invitamos a realizar el siguiente test para que AnImiK calibre y valore el camino más adecuado en este viaje para ti.',
        takeTestButton: 'Realizar el test',
        resultsTitle: 'Resultados del Test de Bienestar',
        yourScore: 'Tu nivel actual de bienestar emocional es del',
        lastTestLabel: 'Última evaluación realizada el',
        retakeTestButton: 'Repetir el Test',
        progressChartTitle: 'Tu evolución emocional',
        goToMyConsciousMovements: 'Ir a Mis Movimientos Conscientes',
        attentionLevels: {
          title: 'Nivel de atención requerido',
          low_title: 'BAJA',
          low_description: 'El usuario demuestra un buen nivel de bienestar emocional y posee herramientas sólidas para gestionar sus emociones. Pueden existir áreas puntuales en las que desee crecer o profundizar.',
          moderate_title: 'MODERADA',
          moderate_description: 'El usuario experimenta ciertos desafíos emocionales o estrés en áreas concretas. Tiene potencial para desarrollar nuevas habilidades de gestión emocional y fortalecer su resiliencia.',
          high_title: 'ALTA',
          high_description: 'El usuario está experimentando un nivel de malestar emocional significativo, con posibles dificultades para manejar el estrés, la ansiedad o la tristeza. Necesita un apoyo intensivo y herramientas fundamentales para empezar a construir su bienestar.'
        }
      },
      myConsciousMovements: {
        title: 'Mis Movimientos Conscientes',
        description: 'Aquí encontrarás un plan de movimientos conscientes personalizado para potenciar tu bienestar emocional.',
        noActionsMessage: 'Aún no has despertado tu ruta interior. Completa el test de bienestar para que podamos crear un plan de movimientos conscientes para ti.',
        goToTestButton: 'Hacer el Test de Bienestar',
        generalMessage: {
          p1: 'Los siguientes movimientos conscientes recomendados se basan en tus resultados y están diseñados para ayudarte a empezar a abordar tu bienestar emocional.',
          p2: 'Estos impulsos pueden cambiar si tu nivel de atención requerido se modifica. Al completar el plan de dos semanas, se te invitará a realizar un breve test para evaluar tu progreso, ajustar tu nivel de atención si es necesario y personalizar tu próximo plan de movimientos según tu estado emocional actual.'
        },
        plan: {
          purposeTitle: "El objetivo de este plan",
          objectivesTitle: "Índice de objetivos a lograr",
          instructionsTitle: "Instrucciones para llevar a cabo el plan",
          start: "Inicio",
          goal: "Meta",
          day: "Día {{day}}",
          completed: "Completado",
          locked: "Bloqueado",
          startHere: "Empieza tu plan aquí",
          youAreHere: "Estás aquí",
          finalDayMessage: "Has llegado a la meta. ¡Felicidades por tu compromiso!",
          journalEntryTitle: "Día {{day}} – Plan AnImiK14 Ciclo {{cycle}}",
          completionModalTitle: "¡Felicidades!",
          completionModalMessage: "Has completado tu plan de 14 días. ¡Es un gran paso en tu camino de bienestar! Ahora, vamos a reflexionar sobre tu progreso.",
          evaluateProgressButton: "Evaluar mi progreso",
          cycleLabel: "Ciclo {{cycleNumber}}",
          modal: {
            title: "Impulso del Día {{day}}",
            reflectionLabel: "‘Tus palabras urgentes’: Reflexionar sobre nuestros movimientos conscientes es lo que termina de darles sentido. Recuerda que solo tú puedes escribir tu historia. Deja 3 palabras, sensaciones o emociones que usarías para describir la experiencia de hoy.",
            readyButton: "Listo",
          }
        },
        highAttention: {
          geminiPrompt: `PREÁMBULO: Eres un asistente empático para una app de bienestar llamada AnImiK. Tu tono debe ser siempre de acompañamiento, nunca impositivo. Usa la siguiente terminología específica: en lugar de 'plan de acción', usa 'plan de movimientos conscientes'; en lugar de 'acción' o 'actividad', usa 'impulso del día' o 'semilla de avance'. Evita frases como 'debes comprometerte'. En su lugar, usa alternativas como 'hazte aliado de tu camino'.

---

Diseña un **plan de movimientos conscientes de dos semanas** para una persona que actualmente se encuentra en un estado de bienestar emocional bajo (rango alto de atención), con el objetivo de guiarla con impulsos del día sencillos que puede implementar para sentirse mejor. El plan debe ser una lista de 14 objetos JSON.

---

### 🎯 OBJETIVO DEL PLAN

- Proporcionar **semillas de avance simples, claras y específicas** para cada día (14 días).
- Cada impulso del día debe incluir una **explicación breve del propósito emocional**.
- El lenguaje debe ser cercano, empático y no técnico.
- El plan debe transmitir calma, cuidado y motivación.

---

### 📅 FORMATO SOLICITADO
Genera un objeto JSON con una única clave "plan", que contenga un array de 14 objetos. Cada objeto debe tener las siguientes claves: "day" (número), "action" (string, el título del impulso), y "explanation" (string, la descripción del impulso). No incluyas un test en el día 14.

---

### ✅ CONSIDERACIONES IMPORTANTES

- Incluye impulsos que puedan hacerse desde casa, sin recursos complejos.
- Ideas: ejercicios de respiración, tiempo de desconexión, autoobservación de emociones, autocuidado, contactar con alguien de confianza, semillas reconfortantes (música, escritura, descanso), reflexión personal.
- Al menos **un día debe sugerir**:
**“Dedícate un momento completando alguna de las lecturas recomendadas en tus Gotas de Sabiduría”**

---

### 🎨 TONO

- Acompañante, comprensivo, alentador.
- Que transmita: “Estoy contigo. Esto es un paso a la vez.”`,
          loadingPlan: 'Estamos creando tu ruta interior...',
          planError: 'No hemos podido cargar tu plan. Por favor, inténtalo de nuevo más tarde.',
        },
        moderateAttention: {
          geminiPrompt: `PREÁMBULO: Eres un asistente empático para una app de bienestar llamada AnImiK. Tu tono debe ser siempre de acompañamiento, nunca impositivo. Usa la siguiente terminología específica: en lugar de 'plan de acción', usa 'plan de movimientos conscientes'; en lugar de 'acción' o 'actividad', usa 'impulso del día' o 'semilla de avance'. Evita frases como 'debes comprometerte'. En su lugar, usa alternativas como 'hazte aliado de tu camino'.

---

Diseña un **plan de movimientos conscientes de dos semanas** para una persona con un estado de bienestar emocional medio (rango moderado de atención), para fortalecer su resiliencia y desarrollar nuevas habilidades. El plan debe ser una lista de 14 objetos JSON.

---

### 🎯 OBJETIVO DEL PLAN

- Proporcionar **impulsos del día claros y constructivos** para cada día (14 días).
- Foco en **construir hábitos y auto-reflexión**.
- Cada semilla de avance debe incluir una **explicación breve del propósito emocional**.
- Lenguaje cercano, empático y motivador.

---

### 📅 FORMATO SOLICITADO
Genera un objeto JSON con una única clave "plan", que contenga un array de 14 objetos. Cada objeto debe tener las siguientes claves: "day" (número), "action" (string, el título del impulso), y "explanation" (string, la descripción del impulso). No incluyas un test en el día 14.

---

### ✅ CONSIDERACIONES IMPORTANTES

- Mezcla de autoconocimiento, gestión del estrés y conexión social.
- Ideas: identificar un pequeño logro, practicar escucha activa, escribir sobre una emoción, planificar algo placentero, establecer un límite saludable.
- Al menos **un día debe sugerir**:
**“Dedícate un momento completando alguna de las lecturas recomendadas en tus Gotas de Sabiduría”**

---

### 🎨 TONO

- Alentador, proactivo y comprensivo.
- Que transmita: “Tienes la capacidad de fortalecerte. Vamos a explorar cómo.”`,
          loadingPlan: 'Estamos calibrando tus movimientos conscientes...',
          planError: 'No hemos podido cargar tu plan. Por favor, inténtalo de nuevo más tarde.',
        },
        lowAttention: {
          geminiPrompt: `PREÁMBULO: Eres un asistente empático para una app de bienestar llamada AnImiK. Tu tono debe ser siempre de acompañamiento, nunca impositivo. Usa la siguiente terminología específica: en lugar de 'plan de acción', usa 'plan de movimientos conscientes'; en lugar de 'acción' o 'actividad', usa 'impulso del día' o 'semilla de avance'. Evita frases como 'debes comprometerte'. En su lugar, usa alternativas como 'hazte aliado de tu camino'.

---

Diseña un **plan de movimientos conscientes de dos semanas** para una persona con un buen estado de bienestar emocional (rango bajo de atención), para ayudarla a mantener y profundizar en sus fortalezas. El plan debe ser una lista de 14 objetos JSON.

---

### 🎯 OBJETIVO DEL PLAN

- Proporcionar **impulsos de crecimiento y mantenimiento** para cada día (14 días).
- Foco en **profundización, gratitud y conexión con valores**.
- Cada semilla de avance debe incluir una **explicación breve del propósito emocional**.
- Lenguaje inspirador y expansivo.

---

### 📅 FORMATO SOLICITADO
Genera un objeto JSON con una única clave "plan", que contenga un array de 14 objetos. Cada objeto debe tener las siguientes claves: "day" (número), "action" (string, el título del impulso), y "explanation" (string, la descripción del impulso). No incluyas un test en el día 14.

---

### ✅ CONSIDERACIONES IMPORTANTES

- Fomentar autocompasión, propósito y generosidad.
- Ideas: acto de amabilidad, escribir tres gratitudes, reflexionar sobre valores, mentorizar a alguien, pasar tiempo en la naturaleza.
- Al menos **un día debe sugerir**:
**“Dedícate un momento completando alguna de las lecturas recomendadas en tus Gotas de Sabiduría”**

---

### 🎨 TONO

- Inspirador, celebratorio y de crecimiento.
- Que transmita: “Sigues floreciendo. Vamos a nutrir aún más tus raíces.”`,
          loadingPlan: 'Estamos preparando tus próximos pasos de crecimiento...',
          planError: 'No hemos podido cargar tu plan. Por favor, inténtalo de nuevo más tarde.',
        },
        recommendedReadings: {
          title: 'Mis Lecturas Recomendadas',
          description: 'Accede a una selección de lecturas que pueden ayudarte a reflexionar, entenderte mejor y avanzar en tu camino de bienestar emocional.',
          buttonText: 'Ir a mis lecturas',
        },
      },
      postPlanTest: {
        title: "Test de Evolución Emocional",
        progress: 'Pregunta {{current}} de {{total}}',
        submitButton: 'Finalizar y ver mi evolución',
        finalReflectionTitle: "Reflexión Final – Plan AnImiK14 Ciclo {{cycleNumber}}",
        geminiPrompt: `PREÁMBULO: Eres un asistente empático para una app de bienestar llamada AnImiK. Tu tono debe ser siempre de acompañamiento, nunca impositivo. Usa la siguiente terminología específica: en lugar de 'plan de acción', usa 'plan de movimientos conscientes'; en lugar de 'acción' o 'actividad', usa 'impulso del día' o 'semilla de avance'.

---
Evalúa las siguientes respuestas de una reflexión de un usuario que acaba de completar un plan de bienestar emocional de 14 días. El objetivo es ofrecerle un resumen de su evolución emocional, determinar si su bienestar ha mejorado, se ha mantenido estable o necesita más apoyo, y generar un nuevo plan de movimientos conscientes personalizado para los próximos 14 días, basado en su estado actual.

RESPUESTAS DEL USUARIO:
{{userAnswers}}

---
TAREAS:
1.  **Analiza la evolución:** Basado en las respuestas, escribe un breve resumen (2-3 frases) sobre la evolución emocional del usuario. Sé empático y destaca tanto fortalezas como áreas de oportunidad.
2.  **Determina el impacto:** Indica claramente si el bienestar del usuario ha 'mejorado', se ha 'mantenido' o 'empeorado'.
3.  **Genera un nuevo plan:** Crea un nuevo plan de movimientos conscientes de 14 días que responda a las necesidades actuales del usuario.

---
FORMATO DE SALIDA (JSON Exacto):
Genera un objeto JSON con tres claves: "summary" (string), "evolution" (string, solo 'mejorado', 'mantenido', o 'empeorado'), y "new_plan" (un array de 14 objetos, cada uno con "day", "action", y "explanation").`,
        questions: {
          q1: { question: "¿En los últimos 14 días, al enfrentar una emoción incómoda, ¿cómo has respondido generalmente?", options: { a: "Hice una pausa, reconocí mi emoción y la exploré con amabilidad.", b: "Intenté entenderla, pero a veces la ignoré o evité.", c: "A menudo me sentí abrumado/a y sin saber qué hacer.", d: "Me sentí impotente y normalmente me desconecté o me distraje." } },
          q2: { question: "¿Cómo describirías tu diálogo interno durante este período?", options: { a: "Mucho más compasivo y alentador que antes.", b: "Ha mejorado, aunque todavía soy crítico/a a veces.", c: "Sigue siendo mayormente autocrítico y negativo.", d: "No he notado ningún cambio en mi diálogo interno." } },
          q3: { question: "Al pensar en los 'impulsos del día', ¿cómo fue tu compromiso?", options: { a: "Me comprometí con la mayoría y los encontré útiles.", b: "Hice algunos, pero me costó mantener la constancia.", c: "Empecé con ganas, pero perdí la motivación rápidamente.", d: "Realmente no pude conectar o comprometerme con los impulsos." } },
          q4: { question: "Tu capacidad para identificar lo que necesitas emocionalmente (ej. descanso, conexión, espacio)...", options: { a: "Ha mejorado notablemente, soy más consciente de mis necesidades.", b: "Es un poco más clara, pero todavía me cuesta.", c: "Sigue siendo bastante confusa para mí.", d: "No siento que haya habido ningún cambio en este aspecto." } },
          q5: { question: "¿Sientes que tienes más herramientas para manejar el estrés diario que hace 14 días?", options: { a: "Definitivamente sí, me siento más equipado/a.", b: "Sí, he incorporado alguna herramienta nueva.", c: "Quizás un poco, pero no estoy seguro/a de su efectividad.", d: "No, sigo sintiéndome igual de abrumado/a por el estrés." } },
          q6: { question: "¿Cuando miras hacia las próximas dos semanas, cómo te sientes acerca de tu bienestar emocional?", options: { a: "Con esperanza y motivación para seguir creciendo.", b: "Con cautela, pero dispuesto/a a seguir intentándolo.", c: "Un poco desanimado/a, no estoy seguro/a de poder mejorar.", d: "Pesimista o indiferente sobre mi progreso futuro." } },
          q7: { question: "La reflexión diaria a través de 'Tus palabras urgentes' fue...", options: { a: "Muy reveladora y me ayudó a procesar mi día.", b: "Interesante, aunque a veces no sabía qué escribir.", c: "Un poco forzada o no sentí que me ayudara mucho.", d: "La evité la mayoría de los días, no me sentí cómodo/a." } },
          q8: { question: "En situaciones de incertidumbre o falta de control, ¿cómo te has sentido?", options: { a: "Más capaz de aceptar la incertidumbre y enfocarme en lo que puedo controlar.", b: "Todavía me genera mucha ansiedad, pero lo manejo un poco mejor.", c: "La incertidumbre sigue siendo una fuente importante de malestar.", d: "Me paraliza y me hace sentir extremadamente ansioso/a." } },
          q9: { question: "¿Has notado algún cambio en tu capacidad para establecer límites saludables con los demás?", options: { a: "Sí, he comunicado mis necesidades de forma más clara y respetuosa.", b: "Lo he intentado un par de veces, aunque todavía me cuesta.", c: "No he visto un cambio real en este aspecto.", d: "Me resulta aún más difícil que antes establecer límites." } },
          q10: { question: "En general, ¿cómo calificarías el impacto de los últimos 14 días en tu autoconocimiento?", options: { a: "Muy alto, he aprendido mucho sobre mí mismo/a.", b: "Moderado, he tenido algunas revelaciones importantes.", c: "Bajo, no siento haber descubierto mucho nuevo.", d: "Nulo, siento que sigo en el mismo punto de partida." } }
        }
      },
      newPlanSummary: {
        title: "Tu Evolución Emocional",
        subtitle: "Basado en tu reflexión, aquí tienes un resumen de tu camino y tus próximos pasos.",
        improvementTitle: "¡Felicidades por tu progreso!",
        improvementMessage: "Tu bienestar emocional ha mejorado. Estás construyendo un camino fuerte y consciente. Sigamos nutriendo ese crecimiento.",
        stabilityTitle: "Has mantenido tu fortaleza",
        stabilityMessage: "Tu nivel emocional se mantiene estable. A veces, la constancia es la mayor victoria. Sigamos explorando nuevas herramientas para dar un paso más.",
        declineTitle: "Un momento para la autocompasión",
        declineMessage: "Tu bienestar emocional ha bajado un poco. No te preocupes, esto también es parte del proceso. AnImiK adaptará tu nuevo plan para ayudarte a avanzar con más apoyo.",
        welcomeToNewCycle: "Tu nuevo camino ha sido diseñado especialmente para ti. Bienvenido/a al Ciclo {{cycleNumber}}. Un día a la vez.",
        aiSummaryTitle: "Resumen de AnImiK para ti:",
        startNewPlanButton: "Comenzar mi nuevo camino",
        newWellbeingLevel: "Nuevo Nivel de Bienestar:"
      },
      progressFeedback: {
        title: "Reflexión sobre tu progreso emocional",
        improvement: "¡Buen trabajo! Tu bienestar emocional ha mejorado desde la última evaluación. Sigue cultivando tus fortalezas. 😊",
        decline: "Hemos notado una bajada en tu bienestar emocional. Recuerda que AnImiK está aquí para apoyarte. Considera reforzar tus espacios de autocuidado. 💡",
        stability: "Tu bienestar se ha mantenido relativamente estable. A veces, mantenerse es también un signo de fortaleza. 🌱"
      },
      motivationalPrompt: {
        message1: "Cada paso que das hacia tu bienestar cuenta.",
        message2: "Tu historia emocional importa. Gracias por confiar en ti.",
        message3: "Recuerda que detenerte a sentir también es avanzar.",
        message4: "Hoy es un buen día para cuidar de ti.",
        message5: "Tus emociones merecen tu atención, no tu juicio.",
        retakePrompt: "¿Te gustaría ver cómo ha evolucionado tu bienestar? Puedes realizar el test nuevamente.",
        retakeButton: "Actualizar mi bienestar"
      },
      diagnosticTest: {
        title: 'Test de Bienestar Emocional',
        progress: 'Pregunta {{current}} de {{total}}',
        nextButton: 'Siguiente',
        selectAnswerError: 'Por favor, selecciona una respuesta.',
        resultsTitle: '¡Test completado!',
        resultsSubtitle: 'Gracias por responder con honestidad. Este resultado nos ayudará a personalizar tu experiencia en AnImiK.',
        yourResult: 'Tu nivel de bienestar emocional actual es:',
        backToDashboardButton: 'Ir al Dashboard',
        closingMessage: {
            line1: "Gracias por haber recorrido este camino de autoconocimiento.",
            line2: "Tus respuestas son importantes, y reflejan el valor de escucharte con honestidad.",
            line3: "No estás solo/a. AnImiK está aquí para acompañarte en tu camino de bienestar emocional.",
            line4: "Ahora, veamos cómo podemos ayudarte mejor…",
            button: "Ver mi resultado"
        },
        questions: { 
            q1: { question: "¿Cómo te sientes generalmente la mayor parte del tiempo últimamente?", options: { a: "Optimista y lleno/a de energía.", b: "Generalmente bien, con algunos altibajos.", c: "Apagado/a o con poca energía la mayor parte del día.", d: "Triste o desmotivado/a casi todo el tiempo." } }, 
            q2: { question: "Cuando te enfrentas a un contratiempo, ¿cómo sueles reaccionar?", options: { a: "Lo veo como una oportunidad para aprender y crecer.", b: "Me frustro un poco, pero busco soluciones.", c: "Suelo sentirme abrumado/a y me cuesta saber por dónde empezar.", d: "Me desanimo mucho y tiendo a rendirme." } }, 
            q3: { question: "¿Con qué frecuencia sientes que tus relaciones personales son satisfactorias y de apoyo?", options: { a: "Casi siempre, me siento muy conectado/a.", b: "A menudo, aunque a veces hay conflictos.", c: "A veces, pero a menudo me siento solo/a o incomprendido/a.", d: "Rara vez o nunca, me cuesta conectar con los demás." } }, 
            q4: { question: "¿Cómo manejas el estrés en tu vida diaria?", options: { a: "Tengo varias estrategias efectivas (ejercicio, meditación) que uso regularmente.", b: "Intento manejarlo, a veces con éxito, otras no tanto.", c: "Me siento estresado/a la mayor parte del tiempo y no sé bien cómo manejarlo.", d: "El estrés me paraliza y evito las situaciones que lo causan." } }, 
            q5: { question: "¿Duermes bien y te despiertas sintiéndote descansado/a?", options: { a: "Sí, la mayoría de las noches duermo profundamente.", b: "Tengo noches buenas y malas, pero en general es aceptable.", c: "A menudo me cuesta dormir o me despierto cansado/a.", d: "Casi nunca tengo un sueño reparador." } }, 
            q6: { question: "¿Sientes que tienes un propósito o algo que te motive en la vida?", options: { a: "Sí, tengo metas claras que me inspiran cada día.", b: "Tengo algunas ideas, pero no siempre me siento motivado/a.", c: "Me siento un poco perdido/a, sin una dirección clara.", d: "No siento que tenga ningún propósito o motivación." } }, 
            q7: { question: "¿Con qué frecuencia te permites sentir y expresar tus emociones, tanto positivas como negativas?", options: { a: "Regularmente, siento que gestiono mis emociones de forma saludable.", b: "Lo intento, aunque a veces reprimo lo que siento.", c: "Me cuesta mucho expresar lo que siento, especialmente si es negativo.", d: "Evito sentir o pensar en mis emociones a toda costa." } }, 
            q8: { question: "¿Cómo describirías tu nivel de autoestima y confianza en ti mismo/a?", options: { a: "Sólido y saludable.", b: "Generalmente bueno, pero fluctúa.", c: "Bajo, a menudo dudo de mis capacidades.", d: "Muy bajo, tengo una visión muy negativa de mí mismo/a." } }, 
            q9: { question: "Cuando cometes un error, ¿cómo te tratas a ti mismo/a?", options: { a: "Con compasión, entiendo que todos cometemos errores.", b: "Me critico un poco, pero intento seguir adelante.", c: "Soy muy duro/a conmigo mismo/a y me cuesta perdonarme.", d: "Me castigo mentalmente durante mucho tiempo." } }, 
            q10: { question: "¿Disfrutas de tus pasatiempos e intereses?", options: { a: "¡Sí! Dedico tiempo a ellos y me llenan de alegría.", b: "A veces, aunque no siempre tengo tiempo o ganas.", c: "He perdido el interés en las cosas que antes me gustaban.", d: "No tengo pasatiempos o nada que me interese." } }, 
            q11: { question: "¿Cómo es tu capacidad para concentrarte en tareas importantes?", options: { a: "Muy buena, puedo enfocarme sin problemas.", b: "Aceptable, aunque a veces me distraigo.", c: "Me cuesta mucho mantenerme concentrado/a.", d: "Mi mente está en todas partes, no puedo concentrarme en nada." } }, 
            q12: { question: "¿Sientes que tienes control sobre tu propia vida y tus decisiones?", options: { a: "Sí, me siento el/la capitán/a de mi propio barco.", b: "En la mayoría de las áreas sí, aunque en otras no tanto.", c: "A menudo siento que las circunstancias me controlan a mí.", d: "Siento que no tengo ningún control sobre lo que me pasa." } }, 
            q13: { question: "¿Con qué frecuencia sientes gratitud por las cosas buenas de tu vida?", options: { a: "Todos los días, practico la gratitud activamente.", b: "De vez en cuando, cuando algo bueno sucede.", c: "Rara vez, me cuesta ver el lado positivo.", d: "Nunca, siento que no hay nada por lo que estar agradecido/a." } },
            q14: { question: "¿Cómo describirías tu capacidad para mantenerte en el momento presente, sin obsesionarte con el pasado o preocuparte por el futuro?", options: { a: "Soy muy bueno/a para estar presente y consciente.", b: "Lo intento, pero mi mente a menudo divaga.", c: "Me resulta muy difícil mantenerme en el momento presente.", d: "Casi siempre estoy perdido/a en pensamientos sobre el pasado o el futuro." } },
            q15: { question: "Cuando te miras al espejo, ¿cuál es tu sentimiento general hacia ti mismo/a?", options: { a: "Siento amor y aceptación.", b: "En general estoy bien conmigo mismo/a, con algunos defectos.", c: "A menudo siento insatisfacción y crítica.", d: "Siento disgusto o aversión hacia mi reflejo." } }
        }
      },
      writingMyStory: {
        title: 'Escribiendo mi historia',
        motivationalQuotes: [
          "Tus palabras tienen el poder de sanar.",
          "Cada entrada es un paso hacia ti.",
          "Date permiso para sentir, y luego, para escribir.",
          "Tu historia es única y valiosa."
        ],
        empatheticMode: "Modo Empático",
        writeToday: "Escribir mi entrada de hoy",
        historyTitle: "Mi Archivo de Historias",
        emptyHistory: "Aún no has escrito ninguna historia. ¿Te animas a empezar hoy?",
        deleteConfirmMessage: "¿Estás seguro de que quieres eliminar esta entrada? Esta acción no se puede deshacer.",
        edited: "(editado)",
        back: "Atrás",
        next: "Siguiente",
        finish: "Finalizar",
        progress: "Paso {{current}} de {{total}}",
        allFeelingsValid: "Todos tus sentimientos son válidos. Gracias por compartirlos.",
        writingIsHealing: "La escritura es un acto de cuidado. Estás en un espacio seguro.",
        oneDayAtATime: "Un día a la vez. Una palabra a la vez.",
        noAnswersNeeded: "La confusión también es parte del camino. No necesitas tener todas las respuestas.",
        welcome: "Hola de nuevo, {{name}}",
        safeSpace: "Este es tu espacio seguro para explorar tus pensamientos y emociones.",
        notToday: "Quizás más tarde",
        comeBackLater: "Está bien tomarse una pausa. Tu diario te esperará cuando estés listo/a.",
        returnLater: "Entendido, volveré más tarde",
        summary: {
          title: "¡Entrada guardada!",
          registered: "Tu momento ha sido registrado. Aquí tienes un resumen.",
          chosenEmotion: "Emoción principal",
          keyFactors: "Factores clave",
          yourText: "Tus palabras",
          yourAction: "Tu pequeño paso",
          addColor: "Asocia un color a este recuerdo...",
          addImage: "Añade un enlace a una imagen...",
          addSong: "Añade un enlace a una canción...",
          save: "Guardar extras",
          saved: "¡Guardado!",
          viewHistory: "Ver mi historia"
        },
        lock: {
          title: "Diario Bloqueado",
          description: "Para proteger tu privacidad, introduce tu PIN para continuar.",
          unlockButton: "Desbloquear"
        },
        steps: {
          emotion: {
            title: "¿Qué emoción principal sientes ahora mismo?",
            neutral: "Neutral",
            sad: "Tristeza",
            frustrated: "Frustración",
            anxious: "Ansiedad",
            grateful: "Gratitud",
            calm: "Calma",
            confused: "Confusión"
          },
          influence: {
            title: "¿Qué ha influido en cómo te sientes?",
            conversation: "Una conversación",
            work: "Trabajo / Estudios",
            memory: "Un recuerdo",
            news: "Una noticia",
            loneliness: "La soledad",
            routine: "La rutina",
            meTime: "Un momento para mí",
            other: "Otro",
            otherPlaceholder: "Escribe aquí qué más..."
          },
          freewrite: {
            title: "Ahora, deja que tus palabras fluyan. ¿Qué quieres contarte?",
            placeholder: "No hay juicio, solo tus pensamientos. Escribe lo que necesites..."
          },
          reflection: {
            title: "¿Qué pequeño paso podrías dar ahora por ti?",
            breathe: "Respirar hondo 5 veces",
            talk: "Hablar con alguien",
            enjoy: "Disfrutar de una taza de té",
            pause: "Hacer una pausa de 10 min",
            writeLater: "Volver a escribir más tarde",
            notSure: "No estoy seguro/a"
          }
        }
      },
      wisdomDrops: {
        title: "Gotas de Sabiduría",
        description: "Colección de historias reflexivas basadas en tus ciclos de crecimiento.",
        emptyMessage: "Completa un ciclo de 'Mis Movimientos Conscientes' para recibir tu primera Gota de Sabiduría.",
        storyTitle: "Historia del Ciclo {{cycleNumber}}",
        newTag: "NUEVA",
        introMessage: "De tus palabras, nace una historia...",
        infographic: {
          title: "Gota de Sabiduría: Ciclo {{cycleNumber}}",
          subtitle: "Una reflexión inspirada en tu camino."
        },
        geminiPrompt: `PREÁMBULO: Eres un poeta y narrador de historias cortas, especializado en crear metáforas sobre el crecimiento personal para la app AnImiK. Tu tono es evocador, amable y simbólico. No eres un terapeuta, eres un artista de las palabras.

---
TAREA:
A partir de las siguientes palabras clave y sensaciones que un usuario ha escrito durante un plan de bienestar de 14 días, crea una **historia corta y metafórica (de 3 a 5 párrafos)** sobre su proceso. La historia debe ser abstracta y simbólica, no un análisis literal. Debe sentirse como una "Gota de Sabiduría".

PALABRAS DEL USUARIO:
{{userWords}}

---
INSTRUCCIONES:
1.  **Encuentra un tema central:** Identifica un hilo conductor en las palabras del usuario (ej: lucha y calma, confusión y claridad, soledad y conexión).
2.  **Crea una metáfora principal:** Usa una metáfora central para la historia (ej: un jardín, un viaje por el mar, la construcción de una casa, el vuelo de un pájaro).
3.  **Escribe la historia:** Narra el proceso del usuario a través de esa metáfora. Evita el lenguaje clínico o de autoayuda.
4.  **Finaliza con una imagen poderosa:** Concluye con una frase o imagen que inspire reflexión y esperanza.

---
FORMATO DE SALIDA:
Texto plano. Cada párrafo debe estar separado por un salto de línea.
`
      }
    }
  },
  en: {
    translation: {
      common: {
        appName: 'AnImiK',
        comingSoon: 'This feature will be available soon!',
        close: 'Close',
        edit: 'Edit',
        delete: 'Delete',
        save: 'Save changes',
        cancel: 'Cancel'
      },
      header: {
        language: 'Language',
        epuLogoAlt: 'Entre Palabras Urgentes Logo',
      },
      sidebar: {
        dashboard: 'Dashboard',
        myConsciousMovements: 'My Conscious Movements',
        chat: 'Support Chat',
        writingMyStory: 'Writing my Story',
        wisdomDrops: 'Drops of Wisdom',
        braveSteps: 'My Brave Steps',
        profile: 'Profile',
        logout: 'Log Out',
      },
      registration: {
        title: 'Welcome',
        subtitle: 'To log in, confirm your email address and you will receive a code to continue your journey with AnImik.',
        emailLabel: 'Email address',
        emailPlaceholder: 'your.email@example.com',
        codeLabel: 'Access Code',
        codePlaceholder: 'Enter the 4-digit code',
        submitButton: 'Continue',
        verifyButton: 'Verify and Enter',
        sendingCode: 'Sending...',
        fillFieldsError: 'Please enter a valid email address.',
        codeSentSuccess: 'Code sent to your email!',
        invalidCodeError: 'Incorrect code. Please try again.',
        codeExpiredError: 'The code has expired. Please request a new one.',
        codeValidityInfo: 'The code is valid for 10 minutes. Time remaining: {{time}}',
        resendCode: 'Resend code',
        resendCountdown: 'Resend in {{seconds}}s',
      },
      dashboard: {
        greeting: 'Hello, {{name}}!',
        defaultName: 'you',
        welcomeBack: 'Welcome back. We\'re glad to see you.',
        wisdomDropNotification: '💧 You have a new Drop of Wisdom. Find it in your collection.',
        readNow: 'Read now',
      },
      recommendations: {
        title: 'Just for You',
        welcomeMessage: 'To provide you with the best support and tools for your emotional well-being, we need to know a little more about your current state. We invite you to take the following test so AnImiK can calibrate and assess the most suitable path for you on this journey.',
        takeTestButton: 'Take the Test',
        resultsTitle: 'Wellbeing Test Results',
        yourScore: 'Your current emotional wellbeing level is',
        lastTestLabel: 'Last assessment on',
        retakeTestButton: 'Retake Test',
        progressChartTitle: 'Your emotional evolution',
        goToMyConsciousMovements: 'Go to My Conscious Movements',
        attentionLevels: {
          title: 'Required attention level',
          low_title: 'LOW',
          low_description: 'The user shows a good level of emotional well-being and has solid tools to manage their emotions. There may be specific areas where they wish to grow or deepen their understanding.',
          moderate_title: 'MODERATE',
          moderate_description: 'The user is experiencing certain emotional challenges or stress in specific areas. They have the potential to develop new emotional management skills and strengthen their resilience.',
          high_title: 'HIGH',
          high_description: 'The user is experiencing a significant level of emotional distress, with possible difficulties handling stress, anxiety, or sadness. They need intensive support and fundamental tools to begin building their well-being.'
        }
      },
      myConsciousMovements: {
        title: 'My Conscious Movements',
        description: 'Here you will find a personalized plan of conscious movements to enhance your emotional well-being.',
        noActionsMessage: 'You have not yet awakened your inner path. Complete the well-being test so we can create a plan of conscious movements for you.',
        goToTestButton: 'Take the Wellbeing Test',
        generalMessage: {
          p1: 'The following recommended conscious movements are based on your results and are designed to help you start addressing your emotional well-being.',
          p2: 'These impulses may change if your required attention level shifts. Upon completing the two-week plan, you will be invited to take a brief test to assess your progress, adjust your attention level if necessary, and personalize your next movement plan according to your current emotional state.'
        },
        plan: {
          purposeTitle: "The purpose of this plan",
          objectivesTitle: "Index of objectives to achieve",
          instructionsTitle: "Instructions for carrying out the plan",
          start: "Start",
          goal: "Goal",
          day: "Day {{day}}",
          completed: "Completed",
          locked: "Locked",
          startHere: "Start your plan here",
          youAreHere: "You are here",
          finalDayMessage: "You have reached the goal. Congratulations on your commitment!",
          journalEntryTitle: "Day {{day}} – AnImiK14 Plan Cycle {{cycle}}",
          completionModalTitle: "Congratulations!",
          completionModalMessage: "You have completed your 14-day plan. This is a huge step on your well-being journey! Now, let's reflect on your progress.",
          evaluateProgressButton: "Evaluate my progress",
          cycleLabel: "Cycle {{cycleNumber}}",
          modal: {
            title: "Day's Impulse {{day}}",
            reflectionLabel: "'Your urgent words': Reflecting on our conscious movements is what gives them meaning. Remember that only you can write your story. Leave 3 words, sensations, or emotions you would use to describe today's experience.",
            readyButton: "Done",
          }
        },
        highAttention: {
          geminiPrompt: `PREAMBLE: You are an empathetic assistant for a wellness app called AnImiK. Your tone should always be supportive, never imposing. Use the following specific terminology: instead of 'action plan', use 'conscious movement plan'; instead of 'action' or 'activity', use 'daily impulse' or 'seed of progress'. Avoid phrases like 'you must commit'. Instead, use alternatives like 'become an ally of your path'.

---

Design a **two-week conscious movement plan** for a person currently in a state of low emotional well-being (high attention range), with the goal of guiding them with simple daily impulses they can implement to feel better. The plan should be a list of 14 JSON objects.

---

### 🎯 PLAN OBJECTIVE

- Provide **simple, clear, and specific seeds of progress** for each day (14 days).
- Each daily impulse must include a **brief explanation of its emotional purpose**.
- The language should be relatable, empathetic, and non-technical.
- The plan should convey calm, care, and motivation.

---

### 📅 REQUESTED FORMAT
Generate a JSON object with a single key "plan", containing an array of 14 objects. Each object must have the following keys: "day" (number), "action" (string, the impulse title), and "explanation" (string, the impulse description). Do not include a test on day 14.

---

### ✅ IMPORTANT CONSIDERATIONS

- Include impulses that can be done from home, without complex resources.
- Ideas: breathing exercises, disconnection time, emotion self-observation, self-care, contacting someone trustworthy, comforting seeds (music, writing, rest), personal reflection.
- At least **one day must suggest**:
**"Take a moment to complete one of the recommended readings in your Drops of Wisdom."**

---

### 🎨 TONE

- Supportive, understanding, encouraging.
- Conveying: "I am with you. This is one step at a time."`,
          loadingPlan: 'Creating your inner path...',
          planError: 'We could not load your plan. Please try again later.',
        },
        moderateAttention: {
          geminiPrompt: `PREAMBLE: You are an empathetic assistant for a wellness app called AnImiK. Your tone should always be supportive, never imposing. Use the following specific terminology: instead of 'action plan', use 'conscious movement plan'; instead of 'action' or 'activity', use 'daily impulse' or 'seed of progress'. Avoid phrases like 'you must commit'. Instead, use alternatives like 'become an ally of your path'.

---

Design a **two-week conscious movement plan** for a person with a medium emotional well-being state (moderate attention range), to strengthen their resilience and develop new skills. The plan should be a list of 14 JSON objects.

---

### 🎯 PLAN OBJECTIVE

- Provide **clear and constructive daily impulses** for each day (14 days).
- Focus on **building habits and self-reflection**.
- Each seed of progress must include a **brief explanation of its emotional purpose**.
- Relatable, empathetic, and motivating language.

---

### 📅 REQUESTED FORMAT
Generate a JSON object with a single key "plan", containing an array of 14 objects. Each object must have the following keys: "day" (number), "action" (string, the impulse title), and "explanation" (string, the impulse description). Do not include a test on day 14.

---

### ✅ IMPORTANT CONSIDERATIONS

- A mix of self-awareness, stress management, and social connection.
- Ideas: identify a small achievement, practice active listening, write about an emotion, plan something pleasant, set a healthy boundary.
- At least **one day must suggest**:
**"Take a moment to complete one of the recommended readings in your Drops of Wisdom."**

---

### 🎨 TONE

- Encouraging, proactive, and understanding.
- Conveying: "You have the capacity to strengthen yourself. Let's explore how."`,
          loadingPlan: 'Calibrating your conscious movements...',
          planError: 'We could not load your plan. Please try again later.',
        },
        lowAttention: {
          geminiPrompt: `PREAMBLE: You are an empathetic assistant for a wellness app called AnImiK. Your tone should always be supportive, never imposing. Use the following specific terminology: instead of 'action plan', use 'conscious movement plan'; instead of 'action' or 'activity', use 'daily impulse' or 'seed of progress'. Avoid phrases like 'you must commit'. Instead, use alternatives like 'become an ally of your path'.

---

Design a **two-week conscious movement plan** for a person with a good emotional well-being state (low attention range), to help them maintain and deepen their strengths. The plan should be a list of 14 JSON objects.

---

### 🎯 PLAN OBJECTIVE

- Provide **growth and maintenance impulses** for each day (14 days).
- Focus on **deepening, gratitude, and connection with values**.
- Each seed of progress must include a **brief explanation of its emotional purpose**.
- Inspiring and expansive language.

---

### 📅 REQUESTED FORMAT
Generate a JSON object with a single key "plan", containing an array of 14 objects. Each object must have the following keys: "day" (number), "action" (string, the impulse title), and "explanation" (string, the impulse description). Do not include a test on day 14.

---

### ✅ IMPORTANT CONSIDERATIONS

- Foster self-compassion, purpose, and generosity.
- Ideas: act of kindness, write three gratitudes, reflect on values, mentor someone, spend time in nature.
- At least **one day must suggest**:
**"Take a moment to complete one of the recommended readings in your Drops of Wisdom."**

---

### 🎨 TONE

- Inspiring, celebratory, and growth-oriented.
- Conveying: "You continue to flourish. Let's nourish your roots even more."`,
          loadingPlan: 'Preparing your next steps for growth...',
          planError: 'We could not load your plan. Please try again later.',
        },
        recommendedReadings: {
          title: 'My Recommended Readings',
          description: 'Access a selection of readings that can help you reflect, understand yourself better, and advance on your path of emotional well-being.',
          buttonText: 'Go to my readings',
        },
      },
      postPlanTest: {
        title: "Emotional Evolution Test",
        progress: 'Question {{current}} of {{total}}',
        submitButton: 'Finish and see my evolution',
        finalReflectionTitle: "Final Reflection – AnImiK14 Plan Cycle {{cycleNumber}}",
        geminiPrompt: `PREAMBLE: You are an empathetic assistant for a wellness app called AnImiK. Your tone should always be supportive, never imposing. Use the following specific terminology: instead of 'action plan', use 'conscious movement plan'; instead of 'action' or 'activity', use 'daily impulse' or 'seed of progress'.

---
Evaluate the following reflection responses from a user who has just completed a 14-day emotional well-being plan. The goal is to offer them a summary of their emotional evolution, determine if their well-being has improved, stayed the same, or needs more support, and generate a new personalized 14-day conscious movement plan based on their current state.

USER RESPONSES:
{{userAnswers}}

---
TASKS:
1.  **Analyze evolution:** Based on the responses, write a brief summary (2-3 sentences) about the user's emotional evolution. Be empathetic and highlight both strengths and areas for opportunity.
2.  **Determine impact:** Clearly indicate if the user's well-being has 'improved', 'stayed the same', or 'worsened'.
3.  **Generate a new plan:** Create a new 14-day conscious movement plan that responds to the user's current needs.

---
OUTPUT FORMAT (Exact JSON):
Generate a JSON object with three keys: "summary" (string), "evolution" (string, only 'improved', 'stayed the same', or 'worsened'), and "new_plan" (an array of 14 objects, each with "day", "action", and "explanation").`,
        questions: {
          q1: { question: "In the last 14 days, when facing an uncomfortable emotion, how have you generally responded?", options: { a: "I paused, acknowledged my emotion, and explored it with kindness.", b: "I tried to understand it, but sometimes I ignored or avoided it.", c: "I often felt overwhelmed and unsure of what to do.", d: "I felt helpless and usually shut down or distracted myself." } },
          q2: { question: "How would you describe your inner dialogue during this period?", options: { a: "Much more compassionate and encouraging than before.", b: "It has improved, although I'm still critical at times.", c: "It remains mostly self-critical and negative.", d: "I haven't noticed any change in my inner dialogue." } },
          q3: { question: "When thinking about the 'daily impulses', how was your engagement?", options: { a: "I engaged with most of them and found them helpful.", b: "I did some, but struggled to maintain consistency.", c: "I started with enthusiasm but lost motivation quickly.", d: "I couldn't really connect or engage with the impulses." } },
          q4: { question: "Your ability to identify what you need emotionally (e.g., rest, connection, space)...", options: { a: "Has improved noticeably; I'm more aware of my needs.", b: "Is a bit clearer, but I still struggle.", c: "Remains quite confusing to me.", d: "I don't feel there has been any change in this aspect." } },
          q5: { question: "Do you feel you have more tools to manage daily stress than 14 days ago?", options: { a: "Definitely yes, I feel more equipped.", b: "Yes, I've incorporated a new tool.", c: "Maybe a little, but I'm not sure of its effectiveness.", d: "No, I still feel just as overwhelmed by stress." } },
          q6: { question: "When you look towards the next two weeks, how do you feel about your emotional well-being?", options: { a: "Hopeful and motivated to continue growing.", b: "Cautious, but willing to keep trying.", c: "A bit discouraged, I'm not sure I can improve.", d: "Pessimistic or indifferent about my future progress." } },
          q7: { question: "The daily reflection through 'Your urgent words' was...", options: { a: "Very revealing and helped me process my day.", b: "Interesting, although sometimes I didn't know what to write.", c: "A bit forced, or I didn't feel it helped much.", d: "I avoided it most days; I didn't feel comfortable." } },
          q8: { question: "In situations of uncertainty or lack of control, how have you felt?", options: { a: "More capable of accepting uncertainty and focusing on what I can control.", b: "It still causes a lot of anxiety, but I handle it a bit better.", c: "Uncertainty remains a significant source of distress.", d: "It paralyzes me and makes me feel extremely anxious." } },
          q9: { question: "Have you noticed any change in your ability to set healthy boundaries with others?", options: { a: "Yes, I've communicated my needs more clearly and respectfully.", b: "I've tried a couple of times, although it's still hard.", c: "I haven't seen a real change in this area.", d: "I find it even harder than before to set boundaries." } },
          q10: { question: "Overall, how would you rate the impact of the last 14 days on your self-awareness?", options: { a: "Very high, I've learned a lot about myself.", b: "Moderate, I've had some important revelations.", c: "Low, I don't feel I've discovered much new.", d: "None, I feel like I'm still at the starting point." } }
        }
      },
      newPlanSummary: {
        title: "Your Emotional Evolution",
        subtitle: "Based on your reflection, here is a summary of your journey and your next steps.",
        improvementTitle: "Congratulations on your progress!",
        improvementMessage: "Your emotional well-being has improved. You are building a strong and conscious path. Let's continue to nurture that growth.",
        stabilityTitle: "You've maintained your strength",
        stabilityMessage: "Your emotional level remains stable. Sometimes, consistency is the greatest victory. Let's continue exploring new tools to take another step.",
        declineTitle: "A moment for self-compassion",
        declineMessage: "Your emotional well-being has slightly decreased. Don't worry, this is also part of the process. AnImiK will adapt your new plan to help you move forward with more support.",
        welcomeToNewCycle: "Your new path has been designed especially for you. Welcome to Cycle {{cycleNumber}}. One day at a time.",
        aiSummaryTitle: "AnImiK's Summary for you:",
        startNewPlanButton: "Start my new path",
        newWellbeingLevel: "New Wellbeing Level:"
      },
      progressFeedback: {
        title: "Reflection on your emotional progress",
        improvement: "Good job! Your emotional well-being has improved since the last assessment. Keep cultivating your strengths. 😊",
        decline: "We've noticed a dip in your emotional well-being. Remember that AnImiK is here to support you. Consider reinforcing your self-care spaces. 💡",
        stability: "Your well-being has remained relatively stable. Sometimes, maintaining is also a sign of strength. 🌱"
      },
      motivationalPrompt: {
        message1: "Every step you take towards your well-being counts.",
        message2: "Your emotional story matters. Thank you for trusting yourself.",
        message3: "Remember that pausing to feel is also moving forward.",
        message4: "Today is a good day to take care of yourself.",
        message5: "Your emotions deserve your attention, not your judgment.",
        retakePrompt: "Would you like to see how your well-being has evolved? You can take the test again.",
        retakeButton: "Update my well-being"
      },
      diagnosticTest: {
        title: 'Emotional Wellbeing Test',
        progress: 'Question {{current}} of {{total}}',
        nextButton: 'Next',
        selectAnswerError: 'Please select an answer.',
        resultsTitle: 'Test Completed!',
        resultsSubtitle: 'Thank you for answering honestly. This result will help us personalize your experience in AnImiK.',
        yourResult: 'Your current emotional wellbeing level is:',
        backToDashboardButton: 'Go to Dashboard',
        closingMessage: {
            line1: "Thank you for walking this path of self-knowledge.",
            line2: "Your answers are important, and they reflect the value of listening to yourself honestly.",
            line3: "You are not alone. AnImiK is here to accompany you on your emotional well-being journey.",
            line4: "Now, let's see how we can best help you...",
            button: "See my result"
        },
        questions: { 
            q1: { question: "How have you generally been feeling most of the time lately?", options: { a: "Optimistic and full of energy.", b: "Generally well, with some ups and downs.", c: "Dull or with low energy most of the day.", d: "Sad or unmotivated almost all the time." } }, 
            q2: { question: "When you face a setback, how do you usually react?", options: { a: "I see it as an opportunity to learn and grow.", b: "I get a little frustrated, but I look for solutions.", c: "I usually feel overwhelmed and struggle to know where to start.", d: "I get very discouraged and tend to give up." } }, 
            q3: { question: "How often do you feel that your personal relationships are satisfying and supportive?", options: { a: "Almost always, I feel very connected.", b: "Often, although there are sometimes conflicts.", c: "Sometimes, but I often feel lonely or misunderstood.", d: "Rarely or never, I find it hard to connect with others." } }, 
            q4: { question: "How do you handle stress in your daily life?", options: { a: "I have several effective strategies (exercise, meditation) that I use regularly.", b: "I try to manage it, sometimes successfully, sometimes not so much.", c: "I feel stressed most of the time and don't know how to handle it well.", d: "Stress paralyzes me, and I avoid situations that cause it." } }, 
            q5: { question: "Do you sleep well and wake up feeling rested?", options: { a: "Yes, I sleep soundly most nights.", b: "I have good nights and bad nights, but overall it's acceptable.", c: "I often have trouble sleeping or wake up tired.", d: "I almost never get restful sleep." } }, 
            q6: { question: "Do you feel you have a purpose or something that motivates you in life?", options: { a: "Yes, I have clear goals that inspire me every day.", b: "I have some ideas, but I don't always feel motivated.", c: "I feel a bit lost, without a clear direction.", d: "I don't feel I have any purpose or motivation." } }, 
            q7: { question: "How often do you allow yourself to feel and express your emotions, both positive and negative?", options: { a: "Regularly, I feel I manage my emotions in a healthy way.", b: "I try, although I sometimes suppress what I feel.", c: "I find it very difficult to express what I feel, especially if it's negative.", d: "I avoid feeling or thinking about my emotions at all costs." } }, 
            q8: { question: "How would you describe your level of self-esteem and self-confidence?", options: { a: "Solid and healthy.", b: "Generally good, but it fluctuates.", c: "Low, I often doubt my abilities.", d: "Very low, I have a very negative view of myself." } }, 
            q9: { question: "When you make a mistake, how do you treat yourself?", options: { a: "With compassion, I understand that everyone makes mistakes.", b: "I criticize myself a bit, but I try to move on.", c: "I am very hard on myself and find it hard to forgive myself.", d: "I mentally punish myself for a long time." } }, 
            q10: { question: "Do you enjoy your hobbies and interests?", options: { a: "Yes! I dedicate time to them and they fill me with joy.", b: "Sometimes, although I don't always have the time or desire.", c: "I've lost interest in things I used to enjoy.", d: "I don't have hobbies or anything that interests me." } }, 
            q11: { question: "How is your ability to concentrate on important tasks?", options: { a: "Very good, I can focus without problems.", b: "Acceptable, although I sometimes get distracted.", c: "I find it very difficult to stay focused.", d: "My mind is all over the place, I can't concentrate on anything." } }, 
            q12: { question: "Do you feel you have control over your own life and your decisions?", options: { a: "Yes, I feel like the captain of my own ship.", b: "In most areas, yes, although not so much in others.", c: "I often feel that circumstances control me.", d: "I feel I have no control over what happens to me." } }, 
            q13: { question: "How often do you feel gratitude for the good things in your life?", options: { a: "Every day, I actively practice gratitude.", b: "From time to time, when something good happens.", c: "Rarely, I find it hard to see the positive side.", d: "Never, I feel there is nothing to be grateful for." } },
            q14: { question: "How would you describe your ability to stay in the present moment, without obsessing over the past or worrying about the future?", options: { a: "I'm very good at being present and mindful.", b: "I try, but my mind often wanders.", c: "I find it very difficult to stay in the present moment.", d: "I'm almost always lost in thoughts about the past or the future." } },
            q15: { question: "When you look in the mirror, what is your general feeling towards yourself?", options: { a: "I feel love and acceptance.", b: "I'm generally okay with myself, with some flaws.", c: "I often feel dissatisfaction and criticism.", d: "I feel disgust or aversion towards my reflection." } }
        }
      },
      writingMyStory: {
        title: 'Writing my Story',
        motivationalQuotes: [
          "Your words have the power to heal.",
          "Every entry is a step towards yourself.",
          "Give yourself permission to feel, and then, to write.",
          "Your story is unique and valuable."
        ],
        empatheticMode: "Empathetic Mode",
        writeToday: "Write my entry for today",
        historyTitle: "My Story Archive",
        emptyHistory: "You haven't written any stories yet. Care to start today?",
        deleteConfirmMessage: "Are you sure you want to delete this entry? This action cannot be undone.",
        edited: "(edited)",
        back: "Back",
        next: "Next",
        finish: "Finish",
        progress: "Step {{current}} of {{total}}",
        allFeelingsValid: "All your feelings are valid. Thank you for sharing them.",
        writingIsHealing: "Writing is an act of care. You are in a safe space.",
        oneDayAtATime: "One day at a time. One word at a time.",
        noAnswersNeeded: "Confusion is also part of the journey. You don't need to have all the answers.",
        welcome: "Hello again, {{name}}",
        safeSpace: "This is your safe space to explore your thoughts and emotions.",
        notToday: "Maybe later",
        comeBackLater: "It's okay to take a break. Your journal will be waiting when you're ready.",
        returnLater: "Understood, I'll come back later",
        summary: {
          title: "Entry Saved!",
          registered: "Your moment has been registered. Here is a summary.",
          chosenEmotion: "Main emotion",
          keyFactors: "Key factors",
          yourText: "Your words",
          yourAction: "Your small step",
          addColor: "Associate a color with this memory...",
          addImage: "Add an image link...",
          addSong: "Add a song link...",
          save: "Save extras",
          saved: "Saved!",
          viewHistory: "View my story"
        },
        lock: {
          title: "Journal Locked",
          description: "To protect your privacy, please enter your PIN to continue.",
          unlockButton: "Unlock"
        },
        steps: {
          emotion: {
            title: "What main emotion are you feeling right now?",
            neutral: "Neutral",
            sad: "Sadness",
            frustrated: "Frustration",
            anxious: "Anxiety",
            grateful: "Gratitude",
            calm: "Calm",
            confused: "Confusion"
          },
          influence: {
            title: "What has influenced how you feel?",
            conversation: "A conversation",
            work: "Work / Studies",
            memory: "A memory",
            news: "News",
            loneliness: "Loneliness",
            routine: "Routine",
            meTime: "A moment for myself",
            other: "Other",
            otherPlaceholder: "Write here what else..."
          },
          freewrite: {
            title: "Now, let your words flow. What do you want to tell yourself?",
            placeholder: "There is no judgment, only your thoughts. Write what you need to..."
          },
          reflection: {
            title: "What small step could you take for yourself right now?",
            breathe: "Take 5 deep breaths",
            talk: "Talk to someone",
            enjoy: "Enjoy a cup of tea",
            pause: "Take a 10-min break",
            writeLater: "Write more later",
            notSure: "I'm not sure yet"
          }
        }
      },
      wisdomDrops: {
        title: "Drops of Wisdom",
        description: "A collection of reflective stories based on your growth cycles.",
        emptyMessage: "Complete a 'My Conscious Movements' cycle to receive your first Drop of Wisdom.",
        storyTitle: "Story from Cycle {{cycleNumber}}",
        newTag: "NEW",
        introMessage: "From your words, a story is born...",
        infographic: {
          title: "Drop of Wisdom: Cycle {{cycleNumber}}",
          subtitle: "A reflection inspired by your path."
        },
        geminiPrompt: `PREAMBLE: You are a poet and short story narrator, specializing in creating metaphors about personal growth for the AnImiK app. Your tone is evocative, kind, and symbolic. You are not a therapist; you are an artist of words.

---
TASK:
From the following keywords and sensations that a user has written during a 14-day wellness plan, create a **short, metaphorical story (3 to 5 paragraphs)** about their process. The story should be abstract and symbolic, not a literal analysis. It should feel like a "Drop of Wisdom."

USER'S WORDS:
{{userWords}}

---
INSTRUCTIONS:
1.  **Find a central theme:** Identify a common thread in the user's words (e.g., struggle and calm, confusion and clarity, loneliness and connection).
2.  **Create a main metaphor:** Use a central metaphor for the story (e.g., a garden, a sea journey, building a house, a bird's flight).
3.  **Write the story:** Narrate the user's process through that metaphor. Avoid clinical or self-help language.
4.  **End with a powerful image:** Conclude with a phrase or image that inspires reflection and hope.

---
OUTPUT FORMAT:
Plain text. Each paragraph should be separated by a line break.
`
      }
    }
  }
};

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    debug: false,
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;