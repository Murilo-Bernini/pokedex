import express from 'express';
import axios from 'axios';
import path from 'path';

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Rota para a Pokédex
app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
    const pokemons = response.data.results;
    res.render('index', { pokemons });
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    res.status(500).send('Erro no servidor');
  }
});

// Rota para pesquisa de Pokémon
app.get('/search', async (req, res) => {
  const query = req.query.query as string;
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
    const pokemon = response.data;
    res.render('pokemon', {
      pokemon: {
        id: pokemon.id,
        name: pokemon.name,
        stats: pokemon.stats,
      },
    });
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    res.status(404).send('Pokémon não encontrado');
  }
});

// Rota para exibir um Pokémon específico
app.get('/pokemon/:name', async (req, res) => {
  const name = req.params.name;
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    const pokemon = response.data;
    res.render('pokemon', {
      pokemon: {
        id: pokemon.id,
        name: pokemon.name,
        stats: pokemon.stats,
      },
    });
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    res.status(404).send('Pokémon não encontrado');
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Server rodando na porta http://localhost:${port}`);
});
