export type Copy = { en: string; es: string };

export type IconName =
  | "apple"
  | "banana"
  | "bean"
  | "beef"
  | "cake"
  | "candy"
  | "carrot"
  | "cherry"
  | "citrus"
  | "coffee"
  | "cookie"
  | "croissant"
  | "cup"
  | "drumstick"
  | "flame"
  | "grape"
  | "ham"
  | "leaf"
  | "milk"
  | "nut"
  | "pizza"
  | "popcorn"
  | "salad"
  | "sandwich"
  | "soup"
  | "sparkles"
  | "spray"
  | "utensils"
  | "water"
  | "wheat";

export type Aisle = {
  slug: string;
  icon: IconName;
  tint: string;
  ink: string;
  name: Copy;
  blurb: Copy;
};

export type Product = {
  id: string;
  aisle: string;
  icon: IconName;
  name: Copy;
  detail: Copy;
  unit: Copy;
  price: number;
  compareAt?: number;
  house?: boolean;
  course?: "taco" | "plato" | "dulce";
};

export type Meal = {
  id: string;
  name: Copy;
  pitch: Copy;
  serves: Copy;
  items: { id: string; qty: number }[];
};

export type Store = {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  tel: string;
  hours: Copy;
  note: Copy;
  primary?: boolean;
  maps: string;
};

export type Zone = {
  id: string;
  name: string;
  zips: string[];
  fee: number;
  minutes: string;
  freeOver: number;
};

export const aisles: Aisle[] = [
  {
    slug: "produce",
    icon: "carrot",
    tint: "#e7f6c8",
    ink: "#2f6b16",
    name: { en: "Produce", es: "Frutas y verduras" },
    blurb: {
      en: "Tomatillos, nopales, mangos, and the cilantro bunch you actually needed two of.",
      es: "Tomatillos, nopales, mangos y el manojo de cilantro que siempre se ocupa doble.",
    },
  },
  {
    slug: "carniceria",
    icon: "beef",
    tint: "#ffe0dc",
    ink: "#9d1222",
    name: { en: "Carnicería", es: "Carnicería" },
    blurb: {
      en: "Carne asada already seasoned, carnitas, chorizo, and the cut you ask for by name.",
      es: "Carne asada ya preparada, carnitas, chorizo y el corte que pides por su nombre.",
    },
  },
  {
    slug: "lacteos",
    icon: "milk",
    tint: "#fff1c2",
    ink: "#8a6408",
    name: { en: "Dairy", es: "Lácteos" },
    blurb: {
      en: "Queso fresco, Oaxaca that stretches, and crema for the taco that still looks dry.",
      es: "Queso fresco, Oaxaca que se estira y crema para el taco que todavía se ve seco.",
    },
  },
  {
    slug: "abarrotes",
    icon: "bean",
    tint: "#ffe4c4",
    ink: "#9a4510",
    name: { en: "Pantry", es: "Abarrotes" },
    blurb: {
      en: "The brands you grew up with, plus the chile, mole, and Maseca that never run out.",
      es: "Las marcas de siempre, más el chile, el mole y la Maseca que no pueden faltar.",
    },
  },
  {
    slug: "panaderia",
    icon: "croissant",
    tint: "#ffd9e6",
    ink: "#a12658",
    name: { en: "Bakery", es: "Panadería" },
    blurb: {
      en: "Conchas, cuernos, and bolillos baked here. The tray is warm if you arrive early.",
      es: "Conchas, cuernos y bolillos horneados aquí. La charola sale tibia si llegas temprano.",
    },
  },
  {
    slug: "aguas",
    icon: "cup",
    tint: "#d7f3ff",
    ink: "#0c6e96",
    name: { en: "Aguas frescas", es: "Aguas frescas" },
    blurb: {
      en: "Horchata, jamaica, tamarindo, and pepino, poured into a cold 32 oz bottle.",
      es: "Horchata, jamaica, tamarindo y pepino, en botella fría de 32 oz.",
    },
  },
  {
    slug: "cocina",
    icon: "utensils",
    tint: "#ffe3cc",
    ink: "#b34810",
    name: { en: "La Cocina", es: "La Cocina" },
    blurb: {
      en: "Tacos, tortas, carnitas, tamales, and chicharrón from the kitchen in the back.",
      es: "Tacos, tortas, carnitas, tamales y chicharrón de la cocina del fondo.",
    },
  },
  {
    slug: "hogar",
    icon: "sparkles",
    tint: "#e6e2ff",
    ink: "#4c3aa8",
    name: { en: "Household", es: "Hogar" },
    blurb: {
      en: "The cleaning aisle, the soap bar, and a veladora for the kitchen shelf.",
      es: "El pasillo de limpieza, el jabón de barra y una veladora para la cocina.",
    },
  },
];

export const products: Product[] = [
  {
    id: "avocado",
    aisle: "produce",
    icon: "salad",
    name: { en: "Hass avocados", es: "Aguacate Hass" },
    detail: {
      en: "A bag of four, ripe enough for tonight and one for tomorrow.",
      es: "Bolsa de cuatro, listos para hoy y uno para mañana.",
    },
    unit: { en: "bag of 4", es: "bolsa de 4" },
    price: 5.49,
  },
  {
    id: "tomatillo",
    aisle: "produce",
    icon: "apple",
    name: { en: "Tomatillos", es: "Tomatillo" },
    detail: {
      en: "Husked and firm. The start of a salsa verde that beats the jar.",
      es: "Firmes y con cáscara. El inicio de una salsa verde mejor que la de frasco.",
    },
    unit: { en: "per lb", es: "por lb" },
    price: 2.49,
  },
  {
    id: "jalapeno",
    aisle: "produce",
    icon: "flame",
    name: { en: "Jalapeños", es: "Jalapeños" },
    detail: {
      en: "Bright and snappy. Slice them for tortas or leave them whole for the grill.",
      es: "Crujientes. En rajas para la torta o enteros para la parrilla.",
    },
    unit: { en: "per lb", es: "por lb" },
    price: 1.79,
  },
  {
    id: "cilantro",
    aisle: "produce",
    icon: "leaf",
    name: { en: "Cilantro", es: "Cilantro" },
    detail: {
      en: "A full bunch, stems included. Chop it over asada and call it dinner.",
      es: "Manojo completo, con tallos. Pícalo sobre la asada y ya es cena.",
    },
    unit: { en: "bunch", es: "manojo" },
    price: 0.99,
  },
  {
    id: "lime",
    aisle: "produce",
    icon: "citrus",
    name: { en: "Limes", es: "Limones" },
    detail: {
      en: "The squeeze that finishes tacos, aguas, and a bowl of pozole.",
      es: "El chorrito que cierra tacos, aguas y un plato de pozole.",
    },
    unit: { en: "per lb", es: "por lb" },
    price: 1.59,
  },
  {
    id: "mango",
    aisle: "produce",
    icon: "cherry",
    name: { en: "Ataulfo mangos", es: "Mangos ataulfo" },
    detail: {
      en: "Honey-sweet and low on fiber. Eat them with Tajín and a napkin.",
      es: "Dulces y con poca hebra. Cómelos con Tajín y una servilleta.",
    },
    unit: { en: "3 count", es: "3 piezas" },
    price: 3.99,
    compareAt: 4.79,
  },
  {
    id: "nopal",
    aisle: "produce",
    icon: "leaf",
    name: { en: "Cleaned nopales", es: "Nopales limpios" },
    detail: {
      en: "Thorns already off. Grill them, or dice them into huevos.",
      es: "Ya sin espinas. Ásalos o pícalos con los huevos.",
    },
    unit: { en: "per lb", es: "por lb" },
    price: 2.29,
  },
  {
    id: "jicama",
    aisle: "produce",
    icon: "carrot",
    name: { en: "Jicama", es: "Jícama" },
    detail: {
      en: "Crunchy sticks for the agua-fresca picnic. Tajín lives next door.",
      es: "Palitos crujientes para el picnic de aguas. El Tajín está al lado.",
    },
    unit: { en: "each", es: "pieza" },
    price: 1.99,
  },
  {
    id: "tomato",
    aisle: "produce",
    icon: "apple",
    name: { en: "Roma tomatoes", es: "Jitomate saladet" },
    detail: {
      en: "For pico, caldos, and the torta that needs one more slice.",
      es: "Para pico de gallo, caldos y la torta que pide otra rebanada.",
    },
    unit: { en: "per lb", es: "por lb" },
    price: 1.69,
  },
  {
    id: "onion",
    aisle: "produce",
    icon: "salad",
    name: { en: "White onion", es: "Cebolla blanca" },
    detail: {
      en: "Sharp, sweet once it hits the comal, and mandatory with cilantro.",
      es: "Picante, dulce en el comal, y obligatoria con el cilantro.",
    },
    unit: { en: "per lb", es: "por lb" },
    price: 1.19,
  },
  {
    id: "cabbage",
    aisle: "produce",
    icon: "salad",
    name: { en: "Green cabbage", es: "Repollo" },
    detail: {
      en: "Shred it for pozole night or a quick curtido.",
      es: "Rállalo para la noche de pozole o un curtido rápido.",
    },
    unit: { en: "each", es: "pieza" },
    price: 1.49,
  },
  {
    id: "radish",
    aisle: "produce",
    icon: "carrot",
    name: { en: "Radishes", es: "Rábanos" },
    detail: {
      en: "Thin rounds, a pinch of salt, and the pozole looks finished.",
      es: "En rueditas, una pizca de sal, y el pozole ya se ve completo.",
    },
    unit: { en: "bunch", es: "manojo" },
    price: 1.29,
  },
  {
    id: "asada",
    aisle: "carniceria",
    icon: "beef",
    name: { en: "Carne asada, prepared", es: "Carne asada preparada" },
    detail: {
      en: "Seasoned in-house and ready for the grill. Our most-requested tray.",
      es: "Sazonada en tienda y lista para la parrilla. La charola que más piden.",
    },
    unit: { en: "per lb", es: "por lb" },
    price: 8.99,
    compareAt: 10.49,
    house: true,
  },
  {
    id: "arrachera",
    aisle: "carniceria",
    icon: "beef",
    name: { en: "Arrachera", es: "Arrachera" },
    detail: {
      en: "Skirt steak, thinly cut. Salt, lime, and a hot comal do the rest.",
      es: "Corte delgado. Sal, limón y un comal bien caliente hacen el resto.",
    },
    unit: { en: "per lb", es: "por lb" },
    price: 12.49,
  },
  {
    id: "chorizo",
    aisle: "carniceria",
    icon: "flame",
    name: { en: "Fresh chorizo", es: "Chorizo fresco" },
    detail: {
      en: "Loose and bright red. Breakfast potatoes, or a taco if you are honest.",
      es: "Sueltito y rojo. Con papas en el desayuno, o en taco si somos sinceros.",
    },
    unit: { en: "per lb", es: "por lb" },
    price: 4.99,
  },
  {
    id: "carnitas",
    aisle: "carniceria",
    icon: "ham",
    name: { en: "Carnitas", es: "Carnitas" },
    detail: {
      en: "Slow-cooked pork with the crispy edges still attached.",
      es: "Puerco lento, con los bordes dorados todavía pegados.",
    },
    unit: { en: "per lb", es: "por lb" },
    price: 7.49,
    house: true,
  },
  {
    id: "chicken",
    aisle: "carniceria",
    icon: "drumstick",
    name: { en: "Whole chicken", es: "Pollo entero" },
    detail: {
      en: "Priced by the pound. Ask the counter to cut it if the mole is waiting.",
      es: "Por libra. Pide en el mostrador que lo partan si el mole ya espera.",
    },
    unit: { en: "per lb", es: "por lb" },
    price: 1.89,
    compareAt: 2.29,
  },
  {
    id: "tripas",
    aisle: "carniceria",
    icon: "beef",
    name: { en: "Tripas", es: "Tripas" },
    detail: {
      en: "For the taco that crackles. Cook hot and finish with lime.",
      es: "Para el taco que truena. Fuego alto y un final de limón.",
    },
    unit: { en: "per lb", es: "por lb" },
    price: 6.49,
  },
  {
    id: "pastor",
    aisle: "carniceria",
    icon: "flame",
    name: { en: "Pork al pastor", es: "Puerco al pastor" },
    detail: {
      en: "Marinated and sliced for the skillet. Pineapple lives in produce.",
      es: "Marinado y en rebanadas para el sartén. La piña está en frutas.",
    },
    unit: { en: "per lb", es: "por lb" },
    price: 7.99,
  },
  {
    id: "ribs",
    aisle: "carniceria",
    icon: "beef",
    name: { en: "Beef short ribs", es: "Costilla de res" },
    detail: {
      en: "A Sunday pot of caldo, or the grill if the weather agrees.",
      es: "Para un caldo de domingo, o la parrilla si el clima se anima.",
    },
    unit: { en: "per lb", es: "por lb" },
    price: 6.99,
  },
  {
    id: "shoulder",
    aisle: "carniceria",
    icon: "ham",
    name: { en: "Pork shoulder", es: "Espaldilla de puerco" },
    detail: {
      en: "The cut for pozole. It falls apart after a long, quiet simmer.",
      es: "El corte del pozole. Se deshace después de un hervor largo y quieto.",
    },
    unit: { en: "per lb", es: "por lb" },
    price: 3.49,
  },
  {
    id: "fresco",
    aisle: "lacteos",
    icon: "milk",
    name: { en: "Queso fresco", es: "Queso fresco" },
    detail: {
      en: "Crumbles cleanly over beans, elote, and a plate that needs salt.",
      es: "Se desmorona sobre frijoles, elote y el plato que pide sal.",
    },
    unit: { en: "12 oz", es: "12 oz" },
    price: 4.49,
  },
  {
    id: "oaxaca",
    aisle: "lacteos",
    icon: "milk",
    name: { en: "Queso Oaxaca", es: "Queso Oaxaca" },
    detail: {
      en: "Pull it into strings for quesadillas. It melts like it means it.",
      es: "Deshiláchalo para quesadillas. Se funde de verdad.",
    },
    unit: { en: "12 oz", es: "12 oz" },
    price: 5.99,
  },
  {
    id: "crema",
    aisle: "lacteos",
    icon: "milk",
    name: { en: "Crema mexicana", es: "Crema mexicana" },
    detail: {
      en: "Thicker than sour cream and the correct finish for a tostada.",
      es: "Más espesa que la sour cream y el cierre correcto de una tostada.",
    },
    unit: { en: "15 oz", es: "15 oz" },
    price: 3.49,
  },
  {
    id: "panela",
    aisle: "lacteos",
    icon: "milk",
    name: { en: "Queso panela", es: "Queso panela" },
    detail: {
      en: "Slice and sear it. It holds its shape and picks up the salsa.",
      es: "En rebanadas y a la plancha. Mantiene forma y recoge la salsa.",
    },
    unit: { en: "12 oz", es: "12 oz" },
    price: 4.79,
  },
  {
    id: "butter",
    aisle: "lacteos",
    icon: "milk",
    name: { en: "Butter", es: "Mantequilla" },
    detail: {
      en: "For the bolillo, obviously, and for the comal if you are making rice.",
      es: "Para el bolillo, claro, y para el comal si vas a hacer arroz.",
    },
    unit: { en: "1 lb", es: "1 lb" },
    price: 4.29,
  },
  {
    id: "tortillas",
    aisle: "abarrotes",
    icon: "wheat",
    name: { en: "Corn tortillas", es: "Tortillas de maíz" },
    detail: {
      en: "A stack of thirty. Warm them until they freckle.",
      es: "Paquete de treinta. Caliéntalas hasta que se pinten.",
    },
    unit: { en: "30 count", es: "30 piezas" },
    price: 2.49,
  },
  {
    id: "beans",
    aisle: "abarrotes",
    icon: "bean",
    name: { en: "Black beans", es: "Frijol negro" },
    detail: {
      en: "A four-pound bag. Soak tonight, pot tomorrow, lunches all week.",
      es: "Bolsa de cuatro libras. Remojo hoy, olla mañana, lonches toda la semana.",
    },
    unit: { en: "4 lb", es: "4 lb" },
    price: 5.99,
    compareAt: 6.99,
  },
  {
    id: "rice",
    aisle: "abarrotes",
    icon: "wheat",
    name: { en: "Long-grain rice", es: "Arroz" },
    detail: {
      en: "The five-pound bag that disappears the week you make mole.",
      es: "La bolsa de cinco libras que se acaba la semana del mole.",
    },
    unit: { en: "5 lb", es: "5 lb" },
    price: 4.49,
  },
  {
    id: "valentina",
    aisle: "abarrotes",
    icon: "flame",
    name: { en: "Salsa Valentina", es: "Salsa Valentina" },
    detail: {
      en: "The red bottle. It belongs on fruit, chips, and anything grilled.",
      es: "La botella roja. Va en la fruta, las papas y todo lo asado.",
    },
    unit: { en: "12.5 oz", es: "12.5 oz" },
    price: 2.29,
  },
  {
    id: "tajin",
    aisle: "abarrotes",
    icon: "candy",
    name: { en: "Tajín clásico", es: "Tajín clásico" },
    detail: {
      en: "Chile, lime, and salt. Mango and jicama are not optional.",
      es: "Chile, limón y sal. El mango y la jícama ya no son opcionales.",
    },
    unit: { en: "5 oz", es: "5 oz" },
    price: 3.49,
  },
  {
    id: "mole",
    aisle: "abarrotes",
    icon: "soup",
    name: { en: "Mole paste", es: "Mole en pasta" },
    detail: {
      en: "A jar of Doña María-style paste. Thin it with the broth from the chicken.",
      es: "Pasta estilo Doña María. Disuélvela con el caldo del pollo.",
    },
    unit: { en: "8.25 oz", es: "8.25 oz" },
    price: 3.99,
  },
  {
    id: "guajillo",
    aisle: "abarrotes",
    icon: "flame",
    name: { en: "Chile guajillo", es: "Chile guajillo" },
    detail: {
      en: "Dried, smooth, and sweet-heat. Toast them before they hit the blender.",
      es: "Secos, lisos y de picor dulce. Tuéstalos antes de la licuadora.",
    },
    unit: { en: "4 oz", es: "4 oz" },
    price: 2.79,
  },
  {
    id: "maseca",
    aisle: "abarrotes",
    icon: "wheat",
    name: { en: "Maseca", es: "Maseca" },
    detail: {
      en: "Instant corn masa. Tortillas on a weeknight, tamales if you are brave.",
      es: "Masa de maíz instantánea. Tortillas entre semana, tamales si te animas.",
    },
    unit: { en: "4.4 lb", es: "4.4 lb" },
    price: 3.79,
  },
  {
    id: "hominy",
    aisle: "abarrotes",
    icon: "popcorn",
    name: { en: "White hominy", es: "Maíz cacahuazintle" },
    detail: {
      en: "A can of pozole corn. Rinse it, then let the pork do the talking.",
      es: "Lata de maíz para pozole. Enjuágalo y deja que el puerco hable.",
    },
    unit: { en: "29 oz", es: "29 oz" },
    price: 1.99,
  },
  {
    id: "tostadas",
    aisle: "abarrotes",
    icon: "cookie",
    name: { en: "Tostadas", es: "Tostadas" },
    detail: {
      en: "Crisp rounds for pozole, or beans and crema if the pot is already empty.",
      es: "Para el pozole, o frijoles con crema si la olla ya se acabó.",
    },
    unit: { en: "12 count", es: "12 piezas" },
    price: 2.49,
  },
  {
    id: "oregano",
    aisle: "abarrotes",
    icon: "leaf",
    name: { en: "Mexican oregano", es: "Orégano mexicano" },
    detail: {
      en: "Rub it between your palms over the bowl. That is the whole trick.",
      es: "Frótalo entre las palmas sobre el plato. Ese es todo el truco.",
    },
    unit: { en: "1 oz", es: "1 oz" },
    price: 1.49,
  },
  {
    id: "cafe",
    aisle: "abarrotes",
    icon: "coffee",
    name: { en: "Café de olla blend", es: "Café de olla" },
    detail: {
      en: "Ground for the pot with piloncillo and a stick of cinnamon.",
      es: "Molido para la olla, con piloncillo y una raja de canela.",
    },
    unit: { en: "12 oz", es: "12 oz" },
    price: 6.99,
  },
  {
    id: "concha",
    aisle: "panaderia",
    icon: "cookie",
    name: { en: "Concha", es: "Concha" },
    detail: {
      en: "Vanilla shell, soft crumb. Eat it before you reach the parking lot.",
      es: "Costra de vainilla, miga suave. Cómela antes del estacionamiento.",
    },
    unit: { en: "each", es: "pieza" },
    price: 1.25,
    house: true,
  },
  {
    id: "cuerno",
    aisle: "panaderia",
    icon: "croissant",
    name: { en: "Cuerno", es: "Cuerno" },
    detail: {
      en: "A horn of sweet bread with a sugar crust that flakes onto your shirt.",
      es: "Cuerno de pan dulce con costra de azúcar que se queda en la camisa.",
    },
    unit: { en: "each", es: "pieza" },
    price: 1.35,
  },
  {
    id: "empanada",
    aisle: "panaderia",
    icon: "cookie",
    name: { en: "Pineapple empanada", es: "Empanada de piña" },
    detail: {
      en: "A pocket of pineapple filling. The bakery's quiet bestseller.",
      es: "Bolsillo de piña. La favorita callada de la panadería.",
    },
    unit: { en: "each", es: "pieza" },
    price: 1.75,
  },
  {
    id: "tres-leches",
    aisle: "panaderia",
    icon: "cake",
    name: { en: "Tres leches slice", es: "Rebanada de tres leches" },
    detail: {
      en: "Soaked, cold, and finished with a plain ribbon of cream.",
      es: "Empapada, fría y con una cinta sencilla de crema.",
    },
    unit: { en: "slice", es: "rebanada" },
    price: 4.5,
  },
  {
    id: "bolillo",
    aisle: "panaderia",
    icon: "wheat",
    name: { en: "Bolillos", es: "Bolillos" },
    detail: {
      en: "Four rolls with a crackly crust. Tortas, or butter while they are warm.",
      es: "Cuatro piezas de costra crujiente. Para tortas, o mantequilla en caliente.",
    },
    unit: { en: "4 count", es: "4 piezas" },
    price: 1.99,
  },
  {
    id: "dozen",
    aisle: "panaderia",
    icon: "cake",
    name: { en: "Pan dulce dozen", es: "Docena de pan dulce" },
    detail: {
      en: "A mixed box from today's trays. We pack what just came out.",
      es: "Caja mixta de las charolas de hoy. Empacamos lo que acaba de salir.",
    },
    unit: { en: "12 pieces", es: "12 piezas" },
    price: 11.99,
    compareAt: 14,
    house: true,
  },
  {
    id: "horchata",
    aisle: "aguas",
    icon: "cup",
    name: { en: "Horchata", es: "Horchata" },
    detail: {
      en: "Rice, cinnamon, and a cold bottle. The house agua.",
      es: "Arroz, canela y botella fría. El agua de la casa.",
    },
    unit: { en: "32 oz", es: "32 oz" },
    price: 4.5,
    house: true,
  },
  {
    id: "jamaica",
    aisle: "aguas",
    icon: "cup",
    name: { en: "Jamaica", es: "Jamaica" },
    detail: {
      en: "Hibiscus, tart and ruby. It wakes a plate of carnitas up.",
      es: "Flor de jamaica, ácida y roja. Despierta un plato de carnitas.",
    },
    unit: { en: "32 oz", es: "32 oz" },
    price: 4.5,
  },
  {
    id: "tamarindo",
    aisle: "aguas",
    icon: "cup",
    name: { en: "Tamarindo", es: "Tamarindo" },
    detail: {
      en: "Sweet-sour and a little smoky. Shake it. The pulp settles.",
      es: "Agridulce y un poco ahumado. Agítala. La pulpa se asienta.",
    },
    unit: { en: "32 oz", es: "32 oz" },
    price: 4.5,
  },
  {
    id: "pepino",
    aisle: "aguas",
    icon: "water",
    name: { en: "Agua de pepino", es: "Agua de pepino" },
    detail: {
      en: "Cucumber, lime, and a cool finish after the salsa was honest.",
      es: "Pepino, limón y un final fresco después de una salsa sincera.",
    },
    unit: { en: "32 oz", es: "32 oz" },
    price: 4.5,
  },
  {
    id: "taco-asada",
    aisle: "cocina",
    icon: "sandwich",
    name: { en: "Taco de asada", es: "Taco de asada" },
    detail: {
      en: "Chopped steak, onion, cilantro, and a corn tortilla from the comal.",
      es: "Bistec picado, cebolla, cilantro y tortilla de maíz del comal.",
    },
    unit: { en: "each", es: "pieza" },
    price: 3.25,
    course: "taco",
  },
  {
    id: "taco-pastor",
    aisle: "cocina",
    icon: "sandwich",
    name: { en: "Taco al pastor", es: "Taco al pastor" },
    detail: {
      en: "Red pork, a flick of pineapple, and the salsa you point at.",
      es: "Puerco rojo, un toque de piña y la salsa que señales.",
    },
    unit: { en: "each", es: "pieza" },
    price: 3.25,
    course: "taco",
  },
  {
    id: "taco-tripa",
    aisle: "cocina",
    icon: "sandwich",
    name: { en: "Taco de tripa", es: "Taco de tripa" },
    detail: {
      en: "Crisped on the plancha. Ask for it dorada if you want the crunch.",
      es: "Dorada en la plancha. Pídela así si quieres el crunch.",
    },
    unit: { en: "each", es: "pieza" },
    price: 3.5,
    course: "taco",
  },
  {
    id: "torta",
    aisle: "cocina",
    icon: "pizza",
    name: { en: "Torta milanesa", es: "Torta milanesa" },
    detail: {
      en: "Bolillo, breaded cutlet, avocado, beans, jalapeño, and crema.",
      es: "Bolillo, milanesa, aguacate, frijoles, jalapeño y crema.",
    },
    unit: { en: "each", es: "pieza" },
    price: 9.5,
    course: "plato",
  },
  {
    id: "plato-carnitas",
    aisle: "cocina",
    icon: "utensils",
    name: { en: "Carnitas plate", es: "Plato de carnitas" },
    detail: {
      en: "A full plate with rice, beans, tortillas, and the crispy bits on top.",
      es: "Plato con arroz, frijoles, tortillas y los pedacitos dorados arriba.",
    },
    unit: { en: "plate", es: "plato" },
    price: 12.99,
    course: "plato",
  },
  {
    id: "tamal",
    aisle: "cocina",
    icon: "wheat",
    name: { en: "Pork tamal", es: "Tamal de puerco" },
    detail: {
      en: "Steamed in a corn husk. Saturday mornings disappear three at a time.",
      es: "Al vapor en hoja de maíz. Los sábados se van de tres en tres.",
    },
    unit: { en: "each", es: "pieza" },
    price: 2.75,
    course: "plato",
    house: true,
  },
  {
    id: "chicharron",
    aisle: "cocina",
    icon: "flame",
    name: { en: "Chicharrón preparado", es: "Chicharrón preparado" },
    detail: {
      en: "Pork rinds drowned in salsa, crema, and cheese. Eat it with a fork and courage.",
      es: "Cueritos bañados en salsa, crema y queso. Cuchara y valor.",
    },
    unit: { en: "order", es: "orden" },
    price: 8.99,
    course: "plato",
  },
  {
    id: "flan",
    aisle: "cocina",
    icon: "cake",
    name: { en: "Flan", es: "Flan" },
    detail: {
      en: "A caramel custard from the dessert counter. Cold, wobbly, done.",
      es: "Flan de caramelo del mostrador de postres. Frío, tembloroso, listo.",
    },
    unit: { en: "slice", es: "rebanada" },
    price: 3.5,
    course: "dulce",
  },
  {
    id: "fabuloso",
    aisle: "hogar",
    icon: "spray",
    name: { en: "Fabuloso lavender", es: "Fabuloso lavanda" },
    detail: {
      en: "The purple bottle. The floor smells like someone's grandmother won.",
      es: "La botella morada. El piso queda oliendo a casa de abuela.",
    },
    unit: { en: "16.9 oz", es: "16.9 oz" },
    price: 2.49,
  },
  {
    id: "zote",
    aisle: "hogar",
    icon: "sparkles",
    name: { en: "Zote soap", es: "Jabón Zote" },
    detail: {
      en: "The pink bar. Laundry, spots, and the stubborn pot.",
      es: "La barra rosa. Ropa, manchas y la olla necia.",
    },
    unit: { en: "bar", es: "barra" },
    price: 1.79,
  },
  {
    id: "veladora",
    aisle: "hogar",
    icon: "flame",
    name: { en: "Veladoras", es: "Veladoras" },
    detail: {
      en: "Two glass candles for the shelf above the fridge.",
      es: "Dos velas de vaso para la repisa de arriba del refri.",
    },
    unit: { en: "2 pack", es: "paquete de 2" },
    price: 3.49,
  },
];

export const meals: Meal[] = [
  {
    id: "taco-night",
    name: { en: "Weeknight tacos", es: "Tacos entre semana" },
    pitch: {
      en: "Prepared asada, a stack of tortillas, and the four things that make them taste like the taquería.",
      es: "Asada preparada, un paquete de tortillas y las cuatro cosas que las hacen saber a taquería.",
    },
    serves: { en: "Serves 4", es: "Para 4" },
    items: [
      { id: "asada", qty: 2 },
      { id: "tortillas", qty: 1 },
      { id: "cilantro", qty: 1 },
      { id: "onion", qty: 1 },
      { id: "lime", qty: 1 },
      { id: "valentina", qty: 1 },
      { id: "crema", qty: 1 },
    ],
  },
  {
    id: "pozole",
    name: { en: "Sunday pozole", es: "Pozole de domingo" },
    pitch: {
      en: "Pork shoulder, hominy, and the little plates of cabbage, radish, oregano, and tostadas.",
      es: "Espaldilla, maíz y los platitos de repollo, rábano, orégano y tostadas.",
    },
    serves: { en: "Serves 6", es: "Para 6" },
    items: [
      { id: "shoulder", qty: 3 },
      { id: "hominy", qty: 2 },
      { id: "cabbage", qty: 1 },
      { id: "radish", qty: 1 },
      { id: "oregano", qty: 1 },
      { id: "tostadas", qty: 1 },
      { id: "lime", qty: 1 },
    ],
  },
  {
    id: "parrilla",
    name: { en: "Backyard arrachera", es: "Arrachera de patio" },
    pitch: {
      en: "Skirt steak for the grill, plus avocado, tortillas, and a red bottle that will empty itself.",
      es: "Arrachera para la parrilla, más aguacate, tortillas y la botella roja que se vacía sola.",
    },
    serves: { en: "Serves 4", es: "Para 4" },
    items: [
      { id: "arrachera", qty: 2 },
      { id: "tortillas", qty: 1 },
      { id: "avocado", qty: 1 },
      { id: "onion", qty: 1 },
      { id: "cilantro", qty: 1 },
      { id: "lime", qty: 1 },
      { id: "valentina", qty: 1 },
    ],
  },
  {
    id: "morning",
    name: { en: "Pan dulce morning", es: "Mañana de pan dulce" },
    pitch: {
      en: "A warm dozen, café de olla, and a bottle of horchata for whoever claims they do not drink coffee.",
      es: "Una docena tibia, café de olla y horchata para quien dice que no toma café.",
    },
    serves: { en: "Serves a table", es: "Para la mesa" },
    items: [
      { id: "dozen", qty: 1 },
      { id: "cafe", qty: 1 },
      { id: "horchata", qty: 1 },
      { id: "butter", qty: 1 },
    ],
  },
  {
    id: "picnic",
    name: { en: "Agua fresca picnic", es: "Picnic de aguas" },
    pitch: {
      en: "All four house aguas, mango, jicama, Tajín, and enough limes to be serious.",
      es: "Las cuatro aguas de la casa, mango, jícama, Tajín y limones de verdad.",
    },
    serves: { en: "Serves 4", es: "Para 4" },
    items: [
      { id: "horchata", qty: 1 },
      { id: "jamaica", qty: 1 },
      { id: "tamarindo", qty: 1 },
      { id: "pepino", qty: 1 },
      { id: "mango", qty: 1 },
      { id: "jicama", qty: 1 },
      { id: "tajin", qty: 1 },
      { id: "lime", qty: 1 },
    ],
  },
  {
    id: "tamal-run",
    name: { en: "Tamal run", es: "Ida por tamales" },
    pitch: {
      en: "Six pork tamales, horchata, and the crema and salsa that turn them into a meal.",
      es: "Seis tamales de puerco, horchata, y la crema y salsa que los vuelven comida.",
    },
    serves: { en: "Serves 3", es: "Para 3" },
    items: [
      { id: "tamal", qty: 6 },
      { id: "horchata", qty: 1 },
      { id: "crema", qty: 1 },
      { id: "valentina", qty: 1 },
    ],
  },
  {
    id: "torta-kit",
    name: { en: "Chorizo torta kit", es: "Kit de torta de chorizo" },
    pitch: {
      en: "Bolillos, fresh chorizo, queso fresco, avocado, and jalapeño. The plancha does the cooking.",
      es: "Bolillos, chorizo fresco, queso fresco, aguacate y jalapeño. La plancha cocina.",
    },
    serves: { en: "Serves 4", es: "Para 4" },
    items: [
      { id: "bolillo", qty: 1 },
      { id: "chorizo", qty: 1 },
      { id: "fresco", qty: 1 },
      { id: "avocado", qty: 1 },
      { id: "jalapeno", qty: 1 },
      { id: "tomato", qty: 1 },
    ],
  },
  {
    id: "mole-night",
    name: { en: "Mole night", es: "Noche de mole" },
    pitch: {
      en: "Chicken, mole paste, rice, and tortillas. The pot smells like somebody's aunt is visiting.",
      es: "Pollo, pasta de mole, arroz y tortillas. La olla huele a tía de visita.",
    },
    serves: { en: "Serves 5", es: "Para 5" },
    items: [
      { id: "chicken", qty: 4 },
      { id: "mole", qty: 1 },
      { id: "rice", qty: 1 },
      { id: "tortillas", qty: 1 },
      { id: "onion", qty: 1 },
    ],
  },
];

export const stores: Store[] = [
  {
    id: "grande",
    name: "La Villa Grande",
    address: "6158 Highway 92",
    city: "Acworth, GA 30102",
    phone: "(770) 926-3711",
    tel: "+17709263711",
    hours: {
      en: "Mon–Fri 9:00 AM – 9:00 PM · Sat–Sun 8:00 AM – 9:00 PM",
      es: "Lun–vie 9:00 AM – 9:00 PM · Sáb–dom 8:00 AM – 9:00 PM",
    },
    note: {
      en: "The pin you shared. Panadería, carnicería, La Cocina, and aguas frescas under one roof in Parkside Village.",
      es: "El pin que compartiste. Panadería, carnicería, La Cocina y aguas frescas en Parkside Village.",
    },
    primary: true,
    maps: "https://www.google.com/maps/search/?api=1&query=6158+Highway+92+Acworth+GA+30102",
  },
  {
    id: "dos",
    name: "La Villa #2",
    address: "6501 Highway 92",
    city: "Acworth, GA 30102",
    phone: "(678) 540-3279",
    tel: "+16785403279",
    hours: {
      en: "Mon–Fri 8:30 AM – 8:30 PM · Sat–Sun 8:00 AM – 8:30 PM",
      es: "Lun–vie 8:30 AM – 8:30 PM · Sáb–dom 8:00 AM – 8:30 PM",
    },
    note: {
      en: "The second Acworth market, a short ride up Highway 92.",
      es: "El segundo mercado de Acworth, un corto trecho por la Highway 92.",
    },
    maps: "https://www.google.com/maps/search/?api=1&query=6501+Highway+92+Acworth+GA+30102",
  },
  {
    id: "tres",
    name: "La Villa #3",
    address: "2851 Cobb Pkwy NW #202",
    city: "Kennesaw, GA 30152",
    phone: "(770) 575-0803",
    tel: "+17705750803",
    hours: {
      en: "Every day 9:00 AM – 9:00 PM",
      es: "Todos los días 9:00 AM – 9:00 PM",
    },
    note: {
      en: "The Kennesaw store, for the days Highway 92 is the long way home.",
      es: "La tienda de Kennesaw, para cuando la Highway 92 se siente larga.",
    },
    maps: "https://www.google.com/maps/search/?api=1&query=2851+Cobb+Pkwy+NW+Kennesaw+GA+30152",
  },
];

export const zones: Zone[] = [
  { id: "acworth", name: "Acworth", zips: ["30101", "30102"], fee: 3.99, minutes: "45–70", freeOver: 75 },
  { id: "kennesaw", name: "Kennesaw", zips: ["30144", "30152"], fee: 4.99, minutes: "50–80", freeOver: 85 },
  { id: "woodstock", name: "Woodstock", zips: ["30188", "30189"], fee: 5.99, minutes: "55–90", freeOver: 90 },
  { id: "dallas", name: "Dallas", zips: ["30132", "30157"], fee: 5.99, minutes: "55–90", freeOver: 90 },
  { id: "west", name: "Austell & Powder Springs", zips: ["30106", "30168", "30127"], fee: 5.49, minutes: "50–85", freeOver: 90 },
  { id: "marietta", name: "Marietta", zips: ["30060", "30062", "30064", "30066", "30067", "30068"], fee: 6.49, minutes: "60–95", freeOver: 95 },
  { id: "smyrna", name: "Smyrna", zips: ["30080", "30082"], fee: 6.99, minutes: "65–100", freeOver: 100 },
];

export const MIN_ORDER = 25;

export function aisleBySlug(slug: string) {
  return aisles.find((aisle) => aisle.slug === slug);
}

export function productById(id: string) {
  return products.find((product) => product.id === id);
}

export function productsIn(slug: string) {
  return products.filter((product) => product.aisle === slug);
}

export function specials() {
  return products.filter((product) => product.compareAt);
}

export function mealTotal(meal: Meal) {
  return meal.items.reduce((sum, item) => {
    const product = productById(item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
}

export function findZone(zip: string) {
  const clean = zip.trim();
  return zones.find((zone) => zone.zips.includes(clean));
}

export function deliveryFee(subtotal: number, zone: Zone) {
  if (subtotal >= zone.freeOver) return 0;
  return zone.fee;
}

export const SHARE_URL = "https://share.google/ZPtPk6EmkaqwNCgSb";
export const PRIMARY = stores[0];
