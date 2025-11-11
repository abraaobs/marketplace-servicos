const { sequelize, User, Service } = require('./db');

async function seed() {
  try {
    await sequelize.sync({ force: true });
    console.log('✅ Banco recriado com sucesso.');

    const [joao] = await User.findOrCreate({
  where: { email: 'joao@example.com' },
  defaults: {
    name: 'João Silva',
    password: 'senha123',
    role: 'prestador',
  },
});

const [ana] = await User.findOrCreate({
  where: { email: 'ana@example.com' },
  defaults: {
    name: 'Ana Pereira',
    password: 'senha123',
    role: 'cliente',
  },
});


    await Service.bulkCreate([
      {
        title: 'Instalação elétrica',
        description: 'Serviço completo de instalação e manutenção elétrica residencial.',
        price: 250,
        providerId: joao.id,
        image: 'https://i.imgur.com/8tmQKpC.jpg',
      },
      {
        title: 'Pintura de apartamento',
        description: 'Pintura interna e externa com materiais de alta qualidade.',
        price: 400,
        providerId: joao.id,
        image: 'https://i.imgur.com/qwzcbAM.jpg',
      },
      {
        title: 'Aulas de inglês online',
        description: 'Aulas dinâmicas e personalizadas com foco em conversação.',
        price: 120,
        providerId: joao.id,
        image: 'https://i.imgur.com/1yGE9Ms.jpg',
      },
      {
        title: 'Jardinagem residencial',
        description: 'Manutenção e poda de jardins, gramados e plantas ornamentais.',
        price: 180,
        providerId: joao.id,
        image: 'https://i.imgur.com/b3Z9YdP.jpg',
      },
      {
        title: 'Montagem de móveis',
        description: 'Montagem rápida, segura e profissional de móveis planejados.',
        price: 150,
        providerId: joao.id,
        image: 'https://i.imgur.com/7h08N2U.jpg',
      },
    ]);

    console.log('🌱 Seed executado com sucesso.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro ao executar seed:', err);
    process.exit(1);
  }
}

seed();
