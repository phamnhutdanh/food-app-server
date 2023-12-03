import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  //createProduct();
}

async function createProduct() {
  await prisma.product.createMany({
    data: [
      {
        title: "Avocado",
        description:
          "A tropical fruit with thick, dark green or purple skin, a large, round seed, and soft, pale green flesh that can be eaten.",
        fullPrice: 10000,
        subcategoryId: "clpgoueby000labazyqbv0kwn",
        imageUri:
          "https://res.cloudinary.com/dxz5uumy7/image/upload/v1701601476/Food_data/avocado.jpg",
      },
      {
        title: "Apple",
        description:
          "A round fruit with firm, white flesh and a green, red, or yellow skin.",
        fullPrice: 5000,
        subcategoryId: "clpgoueby000labazyqbv0kwn",
        imageUri:
          "https://res.cloudinary.com/dxz5uumy7/image/upload/v1701601476/Food_data/apple.jpg",
      },
      {
        title: "Apricot",
        description:
          "A small, round, soft fruit with a pale orange, furry skin.",
        fullPrice: 8000,
        subcategoryId: "clpgoueby000labazyqbv0kwn",
        imageUri:
          "https://res.cloudinary.com/dxz5uumy7/image/upload/v1701601476/Food_data/apricot.jpg",
      },
      {
        title: "Apple pie",
        description:
          "A sweet food made from apples cooked under or inside pastry.",
        fullPrice: 40000,
        subcategoryId: "clpgoueby000labazyqbv0kwn",
        imageUri:
          "https://res.cloudinary.com/dxz5uumy7/image/upload/v1701601476/Food_data/apple_pie.jpg",
      },
      {
        title: "Tomato",
        description:
          "A round, red fruit with a lot of seeds, eaten cooked or uncooked as a vegetable, for example in salads or sauces.",
        fullPrice: 7000,
        subcategoryId: "clpgoueby000mabazdsg4icog",
        imageUri:
          "https://res.cloudinary.com/dxz5uumy7/image/upload/v1701601476/Food_data/tomato.jpg",
      },
      {
        title: "Burger",
        description:
          "Meat or other food made into a round, fairly flat shape, fried and usually eaten between two halves of a bread roll.",
        fullPrice: 47000,
        subcategoryId: "clpgoueby000mabazdsg4icog",
        imageUri:
          "https://res.cloudinary.com/dxz5uumy7/image/upload/v1701601476/Food_data/burger.jpg",
      },
      {
        title: "Donut",
        description:
          "A small fried cake of sweetened dough, typically in the shape of a ball or ring.",
        fullPrice: 23000,
        subcategoryId: "clpgouebz000oabazygnsf5o0",
        imageUri:
          "https://res.cloudinary.com/dxz5uumy7/image/upload/v1701601476/Food_data/donut.jpg",
      },
      {
        title: "Taco",
        description:
          "A hard, folded tortilla (= thin flat bread) filled with meat, cheese, etc. and often a hot, spicy sauce.",
        fullPrice: 37000,
        subcategoryId: "clpgouebz000oabazygnsf5o0",
        imageUri:
          "https://res.cloudinary.com/dxz5uumy7/image/upload/v1701601476/Food_data/taco.jpg",
      },
      {
        title: "Coca-Cola",
        description:
          "Coca-Cola, or Coke, is a carbonated soft drink manufactured by the Coca-Cola Company.",
        fullPrice: 12000,
        subcategoryId: "clpgouebz000nabazi266qqjw",
        imageUri:
          "https://res.cloudinary.com/dxz5uumy7/image/upload/v1701601476/Food_data/coca-cola.jpg",
      },
      {
        title: "Pizza",
        description:
          "A large circle of flat bread baked with cheese, tomatoes, and sometimes meat and vegetables spread on top.",
        fullPrice: 120000,
        subcategoryId: "clpgouebz000nabazi266qqjw",
        imageUri:
          "https://res.cloudinary.com/dxz5uumy7/image/upload/v1701601476/Food_data/pizza.jpg",
      },
      {
        title: "Sausage",
        description:
          "A thin, tube-like case containing meat that has been cut into very small pieces and mixed with spices.",
        fullPrice: 15000,
        subcategoryId: "clpgouebz000pabazk6s6bcv5",
        imageUri:
          "https://res.cloudinary.com/dxz5uumy7/image/upload/v1701601476/Food_data/sausage.jpg",
      },
      {
        title: "Bacon",
        description:
          "Meat from the back or sides of a pig, often eaten fried in thin slices.",
        fullPrice: 31000,
        subcategoryId: "clpgouebz000pabazk6s6bcv5",
        imageUri:
          "https://res.cloudinary.com/dxz5uumy7/image/upload/v1701601476/Food_data/bacon.jpg",
      },
      {
        title: "French fries",
        description:
          "Long, thin pieces of potato that are fried and eaten hot.",
        fullPrice: 7000,
        subcategoryId: "clpgouebz000pabazk6s6bcv5",
        imageUri:
          "https://res.cloudinary.com/dxz5uumy7/image/upload/v1701601476/Food_data/french_fries.jpg",
      },
      {
        title: "Waffle",
        description:
          "A type of bread or cake made from batter (= a thin mixture of milk, flour, and egg) cooked in a special pan whose surface forms a pattern of raised squares.",
        fullPrice: 12000,
        subcategoryId: "clpgouebz000qabazpkt0notg",
        imageUri:
          "https://res.cloudinary.com/dxz5uumy7/image/upload/v1701601476/Food_data/waffle.jpg",
      },
      {
        title: "Tea",
        description:
          "(A drink made by pouring hot water onto) dried and cut leaves and sometimes flowers, especially the leaves of the tea plant.",
        fullPrice: 10000,
        subcategoryId: "clpgouebz000qabazpkt0notg",
        imageUri:
          "https://res.cloudinary.com/dxz5uumy7/image/upload/v1701601476/Food_data/tea.jpg",
      },
      {
        title: "Croissant",
        description:
          "A piece of light crescent-shaped pastry, usually eaten in the morning.",
        fullPrice: 13000,
        subcategoryId: "clpgouebz000qabazpkt0notg",
        imageUri:
          "https://res.cloudinary.com/dxz5uumy7/image/upload/v1701601476/Food_data/croissant.jpg",
      },
      {
        title: "Noodle",
        description:
          "A food in the form of long, thin strips made from flour or rice, water, and often egg, cooked in boiling liquid.",
        fullPrice: 14000,
        subcategoryId: "clpgouebz000rabaz2r9wo7ho",
        imageUri:
          "https://res.cloudinary.com/dxz5uumy7/image/upload/v1701601476/Food_data/noodle.jpg",
      },
      {
        title: "Popcorn",
        description:
          "Seeds of maize that are heated until they break open and become soft and light, usually flavoured with salt, butter, or sugar.",
        fullPrice: 16000,
        subcategoryId: "clpgouebz000rabaz2r9wo7ho",
        imageUri:
          "https://res.cloudinary.com/dxz5uumy7/image/upload/v1701601476/Food_data/popcorn.jpg",
      },
      {
        title: "Sandwich",
        description:
          "Two pieces of bread with food such as cheese, salad, or meat between them.",
        fullPrice: 10000,
        subcategoryId: "clpgouebz000rabaz2r9wo7ho",
        imageUri:
          "https://res.cloudinary.com/dxz5uumy7/image/upload/v1701601476/Food_data/sandwich.jpg",
      },
      {
        title: "Hotdog",
        description:
          "To make fast, skilful movements in particular sports, especially skiing, in order to make people notice you.",
        fullPrice: 12000,
        subcategoryId: "clpgouebz000rabaz2r9wo7ho",
        imageUri:
          "https://res.cloudinary.com/dxz5uumy7/image/upload/v1701601476/Food_data/hotdog.jpg",
      },
      {
        title: "Coffee",
        description:
          "A dark brown powder with a strong flavour and smell that is made by crushing dark beans from a tropical bush and used to make a drink.",
        fullPrice: 10000,
        subcategoryId: "clpgouebz000qabazpkt0notg",
        imageUri:
          "https://res.cloudinary.com/dxz5uumy7/image/upload/v1701601476/Food_data/coffee.jpg",
      },
    ],
  });
}

main()
  .then(async () => {
    console.log("Seed");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
