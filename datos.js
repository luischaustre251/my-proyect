<<<<<<< HEAD
const ITEMS_DATA = [
    {
        id: 1,
        codigo: "Y-1025",
        nombre: "Yokes de Transmisión Reforzados (Yugo)",
        categoria: "transmision",
        imagen: "images/Yokes.PNG",
        descripcion: "Yokes de transmisión de alta resistencia, fabricados con acero forjado de grado automotriz. Diseñados para mitigar la vibración y soportar altas cargas de torque en el árbol de transmisión.",
        compatibilidad: "Camiones Chevrolet Silverado, C3500, Ford F-350, y camiones de carga ligera."
    },
    {
        id: 2,
        codigo: "C-4580",
        nombre: "Corona y Piñón de Diferencial",
        categoria: "transmision",
        imagen: "images/corona.PNG",
        descripcion: "Kit de corona y piñón para diferencial trasero. El maquinado de alta precisión garantiza un acoplamiento perfecto de los engranajes, reduciendo el ruido operativo y maximizando la transferencia de fuerza.",
        compatibilidad: "Chevrolet Silverado V8, C1500, Tahoe y vehículos rústicos 4x4."
    },
    {
        id: 3,
        codigo: "CR-885",
        nombre: "Cruceta de Transmisión de Cardán",
        categoria: "transmision",
        imagen: "images/crucetas.PNG",
        descripcion: "Crucetas de transmisión con rodamientos de agujas sellados de alta durabilidad. Diseñadas para resistir la fricción extrema y las severas cargas de torsión en rutas nacionales.",
        compatibilidad: "Ford, Chevrolet C2500, C3500 HD, Rey Camión y vehículos de carga."
    },
    {
        id: 4,
        codigo: "R-30206",
        nombre: "Rodamiento Cónico de Rueda y Transmisión",
        categoria: "rodamientos",
        imagen: "images/rodamiento.PNG",
        descripcion: "Rodamiento de rodillos cónicos de precisión milimétrica. Capaz de soportar cargas radiales y axiales simultáneamente en ejes delanteros y componentes internos de transmisión.",
        compatibilidad: "Chevrolet Corsa, Optra, Palio 1.8, Meriva, Montana y aplicaciones universales."
    },
    {
        id: 5,
        codigo: "S-509",
        nombre: "Engranaje Satélite y Planetario de Diferencial",
        categoria: "transmision",
        imagen: "images/satelite.PNG",
        descripcion: "Kit de engranajes satélites y planetarios para núcleo de diferencial. Fabricados con acero aleado cementado de alta tenacidad que previene fracturas bajo torque pesado.",
        compatibilidad: "Diferenciales tipo Dana 44, Dana 60, Chevrolet 6.0 LTS y camiones medianos."
    },
    {
        id: 6,
        codigo: "CH-19207929",
        nombre: "Bomba de Aceite V8 6.0 LTS",
        categoria: "bombas",
        imagen: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=400&q=80",
        descripcion: "Bomba de aceite de alto volumen y alta presión para motores Chevrolet V8. Diseñada para mantener un flujo lubricante constante en condiciones extremas de carga y temperatura de motores pesados.",
        compatibilidad: "Chevrolet 6.0 LTS (19207929) V8 5967 CC / 364 CID / C2500, C3500 HD, Rey Camión."
    },
    {
        id: 7,
        codigo: "CH-CORSA-OPTRA",
        nombre: "Kit de Tiempo Sincronizado Chevrolet 1.8",
        categoria: "motor",
        imagen: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=400&q=80",
        descripcion: "Kit completo de correa de distribución y polea tensora para la sincronización precisa de las válvulas del motor. Fabricado con goma reforzada resistente al calor y fricción.",
        compatibilidad: "Chevrolet Corsa todos (96/05), Optra 1.8, Palio 1.8, Meriva, Montana."
    },
    {
        id: 8,
        codigo: "CH-TAHOE-5.3",
        nombre: "Bomba de Agua Motor 5.3 LT V8",
        categoria: "bombas",
        imagen: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=400&q=80",
        descripcion: "Bomba de agua de aluminio con sello mecánico mejorado. Diseñada para proporcionar una óptima refrigeración del bloque motor y prevenir el recalentamiento en condiciones severas.",
        compatibilidad: "Chevrolet 5.3 LT C1500, C2500, C3500, Silverado, Avalanche, Tahoe (2002 a 2013)."
    },
    {
        id: 9,
        codigo: "CY-ORIN-1.8H",
        nombre: "Collarín Hidráulico de Embrague Chery",
        categoria: "suspension",
        imagen: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=400&q=80",
        descripcion: "Collarín hidráulico (cilindro esclavo concéntrico) para embrague. Asegura cambios de marcha suaves y precisos, con sellos de alta tolerancia química al fluido de embrague.",
        compatibilidad: "Chery Orinoco 1.8 LT y modelos compatibles."
    },
=======
const ITEMS_DATA = [
    {
        id: 1,
        codigo: "Y-1025",
        nombre: "Yokes de Transmisión Reforzados (Yugo)",
        categoria: "transmision",
        imagen: "images/Yokes.PNG",
        descripcion: "Yokes de transmisión de alta resistencia, fabricados con acero forjado de grado automotriz. Diseñados para mitigar la vibración y soportar altas cargas de torque en el árbol de transmisión.",
        compatibilidad: "Camiones Chevrolet Silverado, C3500, Ford F-350, y camiones de carga ligera."
    },
    {
        id: 2,
        codigo: "C-4580",
        nombre: "Corona y Piñón de Diferencial",
        categoria: "transmision",
        imagen: "images/corona.PNG",
        descripcion: "Kit de corona y piñón para diferencial trasero. El maquinado de alta precisión garantiza un acoplamiento perfecto de los engranajes, reduciendo el ruido operativo y maximizando la transferencia de fuerza.",
        compatibilidad: "Chevrolet Silverado V8, C1500, Tahoe y vehículos rústicos 4x4."
    },
    {
        id: 3,
        codigo: "CR-885",
        nombre: "Cruceta de Transmisión de Cardán",
        categoria: "transmision",
        imagen: "images/crucetas.PNG",
        descripcion: "Crucetas de transmisión con rodamientos de agujas sellados de alta durabilidad. Diseñadas para resistir la fricción extrema y las severas cargas de torsión en rutas nacionales.",
        compatibilidad: "Ford, Chevrolet C2500, C3500 HD, Rey Camión y vehículos de carga."
    },
    {
        id: 4,
        codigo: "R-30206",
        nombre: "Rodamiento Cónico de Rueda y Transmisión",
        categoria: "rodamientos",
        imagen: "images/rodamiento.PNG",
        descripcion: "Rodamiento de rodillos cónicos de precisión milimétrica. Capaz de soportar cargas radiales y axiales simultáneamente en ejes delanteros y componentes internos de transmisión.",
        compatibilidad: "Chevrolet Corsa, Optra, Palio 1.8, Meriva, Montana y aplicaciones universales."
    },
    {
        id: 5,
        codigo: "S-509",
        nombre: "Engranaje Satélite y Planetario de Diferencial",
        categoria: "transmision",
        imagen: "images/satelite.PNG",
        descripcion: "Kit de engranajes satélites y planetarios para núcleo de diferencial. Fabricados con acero aleado cementado de alta tenacidad que previene fracturas bajo torque pesado.",
        compatibilidad: "Diferenciales tipo Dana 44, Dana 60, Chevrolet 6.0 LTS y camiones medianos."
    },
    {
        id: 6,
        codigo: "CH-19207929",
        nombre: "Bomba de Aceite V8 6.0 LTS",
        categoria: "bombas",
        imagen: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=400&q=80",
        descripcion: "Bomba de aceite de alto volumen y alta presión para motores Chevrolet V8. Diseñada para mantener un flujo lubricante constante en condiciones extremas de carga y temperatura de motores pesados.",
        compatibilidad: "Chevrolet 6.0 LTS (19207929) V8 5967 CC / 364 CID / C2500, C3500 HD, Rey Camión."
    },
    {
        id: 7,
        codigo: "CH-CORSA-OPTRA",
        nombre: "Kit de Tiempo Sincronizado Chevrolet 1.8",
        categoria: "motor",
        imagen: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=400&q=80",
        descripcion: "Kit completo de correa de distribución y polea tensora para la sincronización precisa de las válvulas del motor. Fabricado con goma reforzada resistente al calor y fricción.",
        compatibilidad: "Chevrolet Corsa todos (96/05), Optra 1.8, Palio 1.8, Meriva, Montana."
    },
    {
        id: 8,
        codigo: "CH-TAHOE-5.3",
        nombre: "Bomba de Agua Motor 5.3 LT V8",
        categoria: "bombas",
        imagen: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=400&q=80",
        descripcion: "Bomba de agua de aluminio con sello mecánico mejorado. Diseñada para proporcionar una óptima refrigeración del bloque motor y prevenir el recalentamiento en condiciones severas.",
        compatibilidad: "Chevrolet 5.3 LT C1500, C2500, C3500, Silverado, Avalanche, Tahoe (2002 a 2013)."
    },
    {
        id: 9,
        codigo: "CY-ORIN-1.8H",
        nombre: "Collarín Hidráulico de Embrague Chery",
        categoria: "suspension",
        imagen: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=400&q=80",
        descripcion: "Collarín hidráulico (cilindro esclavo concéntrico) para embrague. Asegura cambios de marcha suaves y precisos, con sellos de alta tolerancia química al fluido de embrague.",
        compatibilidad: "Chery Orinoco 1.8 LT y modelos compatibles."
    },
    {
        id: 10,
        codigo: "Pingu",
        nombre: "Pingu de peluche",
        categoria: "peluches",
        imagen: "https://www.google.com/imgres?q=pingu%20de%20peluche&imgurl=https%3A%2F%2Fstatic.bookscovers.es%2FimagenesP%2F8435776%2F843577600436.JPG&imgrefurl=https%3A%2F%2Fwww.librerialamistral.es%2Fes%2Fobjeto%2Fpeluche-pingu-25-cm_DI90510001&docid=7lkmv6lYJD9EgM&tbnid=TCT43wVZIQORoM&vet=12ahUKEwjMgoeh3eaWAxXYSzABHcf8Ia0QnPAOegUIlAEQAA..i&w=1000&h=1000&hcb=2&ved=2ahUKEwjMgoeh3eaWAxXYSzABHcf8Ia0QnPAOegUIlAEQAA",
        descripcion: "peluchito de pingu",
        compatibilidad: "lindo"
    }
>>>>>>> 3ccfd4df0bbc448b97b0cb2e5313d3ef2d4367be
];