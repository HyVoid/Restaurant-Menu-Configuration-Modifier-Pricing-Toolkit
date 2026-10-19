[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Restaurant-Menu-Configuration-Modifier-Pricing-Toolkit

## Excel Decision-Support Toolkit for Restaurant Menu Configuration, Modifier Pricing & POS Menu Governance

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-success)
![Tool](https://img.shields.io/badge/Tool-Menu%20Configuration%20%26%20Decision%20Support-orange)

**Build and maintain a single source of truth for restaurant menus, modifier pricing, and POS configuration—directly in a browser or Excel workbook, with no installation, no signup, and no manual pricing calculations.**

**No signup. No installation. Free in your browser.**

Prueba gratis la versión en navegador. Si necesitas la versión de Excel, puedes comprarla con una garantía de devolución de dinero de 30 días, sin preguntas.
>
> 🌐 **Abrir en el navegador** → [Versión en navegador (demo en vivo en HTML)](https://hyvoid.github.io/Restaurant-Menu-Configuration-Modifier-Pricing-Toolkit/)
>
> 📥 **Descargar Excel**
>
> [Libro de Excel](https://www.theseusworkshop.com/) (última versión)

---

## Qué te ayuda a controlar

- La jerarquía completa de la carta, desde categorías, productos, tamaños y grupos de modificadores, a partir de una única fuente coherente.
- Precios base, precios de modificadores, precios de mitad y mitad y cargos por porción adicional, sin tablas de precios contradictorias.
- Ingredientes predeterminados frente a modificadores que añade el cliente, para evitar cobros excesivos involuntarios.
- Configuraciones de carta listas para importar al TPV, en lugar de reconstruir manualmente las tablas de precios.
- Precios faltantes, relaciones rotas y errores de configuración antes de que las actualizaciones de la carta lleguen a los clientes.
- Validación de precios de extremo a extremo mediante simulaciones de pedidos realistas, en lugar de revisar cientos de combinaciones individuales de la carta.

---

## Flujo de inicio rápido

1. **Configura una sola vez los parámetros de precios del restaurante**

   Abre la hoja **System Parameters** y define las reglas operativas que rara vez cambian, como los factores de precio de media pizza, los multiplicadores de ingredientes extra, la tasa de impuestos, la moneda predeterminada u otras políticas de precios. Estos valores se convierten en la base de todos los cálculos posteriores y pueden ajustarse de forma centralizada sin editar fórmulas.

2. **Importa o mantén los datos actuales de la carta**

   Rellena las hojas maestras designadas con la información actual de la carta. Las categorías, los artículos, los tamaños, los ingredientes, los grupos de modificadores y los precios se pueden copiar directamente de una hoja de cálculo existente o exportar desde una plataforma de TPV. No se requiere reestructuración ni recálculo manual, porque cada hoja tiene un propósito empresarial concreto.

3. **Revisa los resultados de inmediato**

   Cambia a la hoja del panel de control o a la hoja de prueba de pedidos para revisar los precios generados automáticamente, la validación de relaciones, las comprobaciones de integridad de la carta y los cálculos completos de pedidos de clientes. Los cambios realizados en los datos maestros se propagan por todo el libro sin reconstruir los informes.

4. **Actualiza cada vez que cambie la carta**

   Los nuevos artículos, las promociones de temporada, los ajustes de precios o las actualizaciones de modificadores solo requieren cambios en las tablas de entrada correspondientes. Los cálculos existentes, la lógica de validación, los paneles y las estructuras de exportación al TPV siguen funcionando automáticamente sin reconfiguración.

**Configura unos pocos parámetros clave. Incorpora los datos actuales de la carta. Revisa el análisis. Actualiza cuando cambie la carta.**

---

## Por qué construí esto

La gestión de la carta de un restaurante parece sencilla hasta que la carta crece más allá de un puñado de productos.

Un restaurante de pizza típico puede ofrecer varios tamaños, decenas de ingredientes, pizzas especiales con ingredientes predeterminados, personalización de mitad y mitad, modificadores premium, porciones adicionales y distintas reglas de precios según dónde se aplique cada ingrediente. Cada regla, por separado, parece manejable. Pero juntas generan cientos —o incluso miles— de combinaciones de precio posibles.

Muchos restaurantes siguen manteniendo estas relaciones manualmente en hojas de cálculo separadas, back offices de TPV y plataformas de pedidos en línea. Con el tiempo, esas copias se separan. Los precios dejan de coincidir. Los ingredientes predeterminados se cobran dos veces. El precio de la media pizza se vuelve inconsistente. El personal dedica horas a verificar combinaciones individuales en lugar de mejorar la propia carta.

Construí este libro como un marco operativo reutilizable, en lugar de como una tabla de precios más.

En lugar de comprobar manualmente cada combinación posible de la carta, el libro modela las relaciones que hay detrás de la propia carta. Las reglas de modificadores, los ingredientes predeterminados, la lógica de precios y la validación se convierten en datos estructurados en vez de supuestos ocultos.

Por ejemplo, antes de usar este marco, añadir un ingrediente premium solo a la mitad de una pizza especial solía exigir comprobar manualmente si ese ingrediente ya estaba incluido por defecto y si solo debía aplicarse el cargo incremental. Una vez configurado el motor de precios, el mismo escenario se calcula de forma coherente cada vez, usando las reglas de negocio subyacentes en lugar de la memoria humana.

El resultado no es simplemente un mantenimiento más rápido: es un sistema de apoyo a la decisión repetible que reduce los errores de precio antes de que un cliente llegue a pedir.

---

## Problemas comunes de cartas de restaurantes que esto resuelve

| Problema | Sin esta herramienta | Con esta herramienta |
|----------|------------------|----------------|
| Los precios de los modificadores se vuelven inconsistentes entre tamaños | Varias tablas de precios se separan gradualmente, lo que genera disputas con clientes y correcciones manuales. | Los precios de modificadores se generan a partir de reglas de precios centralizadas y parámetros compartidos. |
| Los ingredientes predeterminados se cobran dos veces por error | Las pizzas especiales obligan al personal a recordar qué ingredientes ya están incluidos. | Los modificadores predeterminados se reconocen automáticamente, de modo que solo se aplican cargos incrementales válidos. |
| Las actualizaciones de la carta requieren editar muchas hojas | Cada cambio de precio debe copiarse en múltiples tablas desconectadas. | Los precios centrales se mantienen una sola vez y se propagan automáticamente por todos los cálculos dependientes. |
| Las importaciones al TPV contienen relaciones de precio incompletas | Las asignaciones de modificadores que faltan crean errores después del despliegue de la carta. | Las relaciones se validan antes de la exportación, lo que reduce los fallos de configuración. |
| Las pruebas manuales pasan por alto los casos límite de precios | El personal solo verifica una pequeña muestra de combinaciones por falta de tiempo. | La hoja de simulación de pedidos reproduce pedidos reales de clientes para una validación de precios completa. |
| Los errores de configuración permanecen ocultos hasta que los clientes los señalan | Las relaciones rotas suelen descubrirse solo después de que la carta esté operativa. | La validación del panel de control resalta precios faltantes, modificadores huérfanos y estructuras de carta incompletas antes del despliegue. |

---

## A quién va dirigido

Este libro está diseñado para propietarios de restaurantes, administradores de cartas, operadores de franquicias, consultores de implementación de TPV, analistas de hostelería y equipos de operaciones responsables de mantener cartas de restaurantes complejas con productos configurables y precios de modificadores.

Es especialmente valioso para empresas que gestionan pizzas especiales, comidas personalizables, varios tamaños de producto, añadidos premium e integraciones con TPV, donde la coherencia de precios es crítica.

**No** está pensado para sustituir una plataforma de TPV empresarial ni un sistema ERP de restaurantes. En su lugar, ofrece una capa de apoyo a la decisión estructurada para organizar la lógica de la carta, validar reglas de precios y preparar datos de carta fiables antes del despliegue.

No se requiere experiencia en hojas de cálculo. Abre la versión en navegador para un acceso rápido o usa el libro de Excel para la gestión completa de la carta y el mantenimiento continuo.

---

## Sobre mí

Construyo herramientas ligeras de apoyo a la decisión basadas en Excel y en el navegador para problemas operativos que se vuelven difíciles cuando hay que gestionar demasiadas piezas móviles a la vez.

En lugar de sustituir los sistemas de negocio existentes, estas herramientas organizan la información necesaria para tomar la siguiente decisión operativa con confianza. **Restaurant Menu Master Workbook** es un ejemplo de ese enfoque: convierte relaciones complejas de carta en un marco reutilizable, más fácil de mantener, verificar y mejorar con el tiempo.
## Detalles técnicos

<details>
<summary><strong>Para revisores técnicos, practicantes de Excel y colaboradores</strong></summary>

---

## Arquitectura del libro

El libro sigue una arquitectura por capas que separa los datos maestros, la lógica de precios, la gestión de relaciones, la validación, la simulación y la exportación. Cada hoja tiene una única responsabilidad, lo que permite actualizar la carta sin reconstruir los cálculos posteriores.

```text
                 SYSTEM PARAMETERS
                        │
                        ▼
             Sys_Params (Global Rules)
                        │
                        ▼
──────────────────────────────────────────────
        MASTER DATA (Single Source of Truth)
──────────────────────────────────────────────
Menu_Categories
Menu_Subcategories
Menu_Items
Item_Sizes
Modifier_Groups
Modifiers
                        │
                        ▼
──────────────────────────────────────────────
      RELATIONSHIP & PRICING LAYER
──────────────────────────────────────────────
Modifier_Pricing
Default_Modifiers
Group_Assignment
Selection_Rules
                        │
                        ▼
──────────────────────────────────────────────
      VALIDATION & CALCULATION
──────────────────────────────────────────────
Order_Test
Dashboard
                        │
                        ▼
──────────────────────────────────────────────
             OUTPUT
──────────────────────────────────────────────
POS_Export
```

| Capa | Hojas de cálculo | Propósito |
|---------|------------|---------|
| Parámetros globales | Sys_Params | Multiplicadores de precio centralizados, tipos impositivos, moneda y constantes de cálculo |
| Datos maestros | Categories, Subcategories, Items, Sizes, Modifier Groups, Modifiers | Mantener entidades de carta reutilizables |
| Capa de relaciones | Group Assignment, Default Modifiers, Selection Rules | Definir cómo interactúan los artículos con los modificadores |
| Capa de precios | Modifier Pricing | Generar precios de modificadores automáticamente con reglas centralizadas |
| Capa de validación | Dashboard, Order Test | Detectar problemas de configuración y validar los resultados de precio |
| Capa de salida | POS Export | Producir estructuras planas adecuadas para la importación al TPV |

### Flujo de datos

```
Restaurant Menu
        │
        ▼
Master Data Tables
        │
        ▼
Relationship Validation
        │
        ▼
Pricing Engine
        │
        ▼
Order Simulation
        │
        ▼
Integrity Validation
        │
        ▼
POS Export
```

Cada cálculo depende de datos maestros estructurados en lugar de tablas de precios duplicadas, lo que reduce el esfuerzo de mantenimiento y mejora la coherencia.

---

## Tres trampas que engañan incluso a operadores con experiencia

### Trampa 1 — Cobrar dos veces por ingredientes predeterminados

Se toma una decisión de precio para una pizza especial.

El operador asume que añadir Pepperoni siempre debería generar un cargo de modificador.

Sin embargo, la pizza seleccionada ya incluye Pepperoni como ingrediente predeterminado.

El resultado es un cargo adicional innecesario que los clientes notan de inmediato.

| Lógica incorrecta | Lógica correcta |
|-----------------|---------------|
| Cada modificador seleccionado genera ingresos. | Determine si el modificador ya pertenece a la receta predeterminada del producto antes de cobrar. |

Sin identificar los ingredientes predeterminados, los precios de la carta se vuelven inconsistentes entre las pizzas especiales y los productos «hazlo tú mismo».

El libro comprueba primero la relación **Default_Modifiers**. Si el ingrediente ya está incluido, solo las porciones adicionales como **Extra** o **Double** generan ingresos adicionales.

La recomendación cambia de:

```text
Normal Pepperoni
→ Charge: $2.49
```

a

```text
Normal Pepperoni
Already Included
→ Charge: $0.00
```

<details>
<summary>Lógica de fórmula</summary>

```excel
IF(
 Is_Default="Y",
 IF(
   Portion="Normal",
   0,
   ExtraPrice-NormalPrice
 ),
 FullModifierPrice
)
```

</details>

---

### Trampa 2 — El precio de la media pizza se vuelve inconsistente

El restaurante introduce ingredientes para la mitad izquierda y la mitad derecha.

El personal estima manualmente que «media» debería ser aproximadamente la mitad del precio.

Meses después, distintos modificadores usan supuestos distintos.

Algunos cobran el 50 %.

Algunos cobran el 60 %.

Otros se olvidan por completo.

El precio se vuelve inconsistente entre productos idénticos.

| Lógica incorrecta | Lógica correcta |
|-----------------|---------------|
| Almacenar los precios de media porción por separado. | Calcular el precio de la mitad a partir de un parámetro global. |

El libro almacena solo el precio completo del modificador.

El precio de la mitad se genera automáticamente con un multiplicador centralizado.

Actualizar un solo parámetro actualiza de inmediato todos los modificadores afectados.

Ejemplo:

```text
Whole Pepperoni
$2.40
```

se convierte en

```text
Half Pricing Factor
0.50

Left Half
$1.20

Right Half
$1.20
```

en lugar de mantener manualmente cientos de valores duplicados.

<details>
<summary>Lógica de fórmula</summary>

```excel
Final Price =
Base Price *
Half Factor *
Portion Multiplier
```

</details>

---

### Trampa 3 — Las actualizaciones de la carta rompen las importaciones al TPV

Un restaurante lanza varios artículos de temporada.

Se añaden modificadores nuevos.

Se olvida un grupo de modificadores durante la asignación.

La carta parece completa dentro de Excel, pero falla tras importarla en el sistema de TPV.

El problema subyacente no es el precio.

Es la integridad de las relaciones.

| Lógica incorrecta | Lógica correcta |
|-----------------|---------------|
| Verificar solo los precios. | Verificar tanto los precios como las relaciones antes de exportar. |

El libro valida:

- grupos de modificadores huérfanos
- tamaños de artículos faltantes
- asignaciones de categoría incompletas
- reglas de precio ausentes
- referencias de modificadores no válidas

El panel de control expone estos problemas antes de la exportación en lugar de después del despliegue.

<details>
<summary>Lógica de fórmula</summary>

```excel
FILTER(
 MissingItems,
 ISNA(
   MATCH(...)
 )
)
```

</details>

---

## Escenario de ejemplo

Un restaurante de pizzas lanza una nueva **BBQ Chicken Pizza** disponible en tamaños Small, Medium y Large.

El producto incluye:

- BBQ Sauce
- Chicken
- Mozzarella
- Red Onion

Un cliente realiza el siguiente pedido:

| Elemento | Selección |
|------|-----------|
| Producto | BBQ Chicken Pizza |
| Tamaño | Large |
| Default Chicken | Keep |
| Pepperoni | Add Extra |
| Mushroom | Left Half |
| BBQ Sauce | Normal |

El motor de precios ejecuta la siguiente secuencia.

1. Obtener el precio base de la pizza tamaño Large.
2. Identificar Chicken y BBQ Sauce como ingredientes predeterminados.
3. No aplicar ningún cargo por los predeterminados sin cambios.
4. Obtener el precio del modificador para Pepperoni.
5. Aplicar el multiplicador de Extra.
6. Obtener el precio de Mushroom.
7. Aplicar el multiplicador de media pizza.
8. Sumar todos los componentes para obtener el precio final del pedido.

Ejemplo de cálculo:

| Componente | Importe |
|-----------|--------|
| Large Pizza | $18.99 |
| Pepperoni (Extra) | $5.24 |
| Mushroom (Left Half) | $0.88 |
| Default Ingredients | $0.00 |
| **Total** | **$25.11** |

En términos operativos, el restaurante ya no depende de que el personal recuerde las excepciones de precio.

Cada pedido de cliente sigue una lógica de precios idéntica, sin importar quién mantenga la carta.

---

## Referencia de fórmulas

<details>
<summary>Busquedas en datos maestros</summary>

| Función | Propósito |
|----------|---------|
| XLOOKUP | Obtener nombres de artículos, categorías, nombres de modificadores y precios base |
| MATCH | Validar la existencia de una relación |
| IFERROR | Devolver valores predeterminados seguros cuando faltan referencias |

Ejemplo:

```excel
=XLOOKUP(
 Item_ID,
 tbl_Items[Item_ID],
 tbl_Items[Item_Name]
)
```

</details>

<details>
<summary>Motor de precios</summary>

| Función | Propósito |
|----------|---------|
| SWITCH | Seleccionar precios específicos por tamaño |
| LET | Simplificar una lógica de precios compleja |
| IF | Aplicar condiciones de precio |
| XLOOKUP | Obtener registros de precios |

Ejemplo:

```excel
LET(
 BasePrice,
 PositionFactor,
 PortionFactor,
 FinalPrice
)
```

</details>

<details>
<summary>Validación y panel de control</summary>

| Función | Propósito |
|----------|---------|
| FILTER | Mostrar registros incompletos |
| COUNTA | Totales de KPI |
| ROWS | Contar reglas de precio generadas |
| MATCH | Validación de relaciones |

Ejemplo:

```excel
FILTER(
 tbl_Items[Item_Name],
 ISNA(MATCH(...))
)
```

</details>

---

## Reglas de validación

| Campo | Regla de validación | Comportamiento ante el error |
|-------|-----------------|----------------|
| Category_ID | Debe existir en la tabla de categorías | Se rechaza la categoría |
| Subcategory_ID | Debe referenciar una categoría existente | Advertencia de relación |
| Item_ID | Identificador único | Advertencia de duplicado |
| SKU_ID | Combinación única de artículo y tamaño | Se evita el duplicado |
| Modifier_ID | Debe existir antes de las reglas de precio | El precio no está disponible |
| Modifier Group | Debe existir antes de la asignación | Alerta en el panel de control |
| Portion Level | Solo Normal, Light, Extra o Xxtra | Selección no válida |
| Position | Solo Whole, Left o Right | Regla de precio no válida |
| Half Pricing Factor | Decimal positivo | Error de precio global |
| Extra Multiplier | Mayor que cero | Error en el precio del modificador |
| Default Modifier | Debe referenciar un artículo y un modificador válidos | Se evita el cobro duplicado |
| POS Export | Todas las asignaciones obligatorias completas | Fallo de validación en la exportación |

El libro valida deliberadamente las relaciones antes de los cálculos siempre que es posible. Las referencias ausentes se señalan mediante alertas del panel de control en lugar de permitir fallos de cálculo silenciosos.

</details>


---

## Otras herramientas de esta serie

Estas herramientas comparten la misma filosofía: marcos ligeros y reutilizables de apoyo a la decisión, creados para problemas operativos recurrentes, no sustitutos de sistemas ERP o plataformas empresariales.

- **Inventory Planning & Purchasing Toolkit** — Equilibra la inversión en inventario, los niveles de servicio y las decisiones de reposición ante una demanda cambiante.
- **Manufacturing Labor Cost & Capacity Planning Toolkit** — Conecta la utilización de mano de obra, la producción y los costes unitarios de fabricación.
- **Construction Estimate & Cost Tracking Toolkit** — Estandariza la estimación de proyectos, el seguimiento del presupuesto y la vigilancia del progreso.
- **Retail & Maquila Inventory Ledger** — Rastrea el inventario desde la compra a granel hasta la fabricación por contrato y la venta de SKU terminados.
- **Residential Transitional Loan Sizer & Pricer** — Evalúa el dimensionamiento, el precio, el apalancamiento y el riesgo de los préstamos puente.
- **Marketing Budget Allocation Simulator** — Compara escenarios de campaña, utilización del presupuesto y rendimiento esperado entre canales.

Se añaden continuamente más herramientas de apoyo a la decisión operativa a esta colección.

---

## Licencia

Este proyecto se licencia bajo la **Licencia Apache 2.0**.

Eres libre de:

- Usar el libro con fines personales o comerciales.
- Modificar y ampliar el libro para adaptarlo a tus propias requisitos operativos.
- Distribuir versiones derivadas de acuerdo con la Licencia Apache 2.0.

Conserva el aviso de licencia original y la atribución donde lo exija la licencia.

Para consultar el texto completo de la licencia, consulta el archivo **LICENSE** incluido en este repositorio.

---

## Contribuir

Siempre son bienvenidas las sugerencias para mejorar la lógica de precios, el modelado de la carta, los flujos de validación o la compatibilidad con el TPV.

Las contribuciones pueden incluir:

- Soporte para plataformas de TPV adicionales
- Reglas de validación mejoradas
- Nuevos modelos de precios
- Optimización de fórmulas
- Mejoras en la documentación
- Ejemplos de configuración específicos de restaurantes

Abre un Issue o envía un Pull Request con una descripción clara del problema operativo que se aborda.

---

## Versión

**Versión actual**

- Versión: **v1.0.0**
- Licencia: **Apache License 2.0**
- Plataforma: **Browser + Microsoft Excel 365 / Excel 2021+**
- Estado: **Production Ready**

---

> Herramientas ligeras de apoyo a la decisión operativa para empresas que necesitan mejores decisiones, no programas más grandes.
