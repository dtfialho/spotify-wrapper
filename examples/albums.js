global.fetch = require('node-fetch');

import { searchAlbums } from '../src/main';

const albums = searchAlbums('AC/DC');

albums.then(data => data.albums.items.map( item => console.log(item.name)));
