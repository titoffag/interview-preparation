class Band {
    constructor(name) {
        this.type = 'band';
        this.name = name;
        this.friends = [];
        this.genres = [];
    }
}

class Genre {
    constructor(name) {
        this.type = 'genre';
        this.name = name;
        this.bands = [];
        this.subgenres = [];
        this.parent = null;
    }
}

function collectData(data, bandsSet, genresSet) {
    const bandsQueue = [];
    const genresQueue = [];
    
    if (data.type === 'band') {
        bandsQueue.push(data);
    } else if (data.type === 'genre') {
        genresQueue.push(data);
    }

    while (bandsQueue.length > 0 || genresQueue.length > 0) {
        if (bandsQueue.length > 0) {
            const band = bandsQueue.shift();
            if (!bandsSet.has(band.name)) {
                bandsSet.set(band.name, band);
                for (const friend of band.friends) {
                    if (!bandsSet.has(friend.name)) {
                        bandsQueue.push(friend);
                    }
                }
                for (const genre of band.genres) {
                    if (!genresSet.has(genre.name)) {
                        genresQueue.push(genre);
                    }
                }
            }
        }

        if (genresQueue.length > 0) {
            const genre = genresQueue.shift();
            if (!genresSet.has(genre.name)) {
                genresSet.set(genre.name, genre);
                for (const band of genre.bands) {
                    if (!bandsSet.has(band.name)) {
                        bandsQueue.push(band);
                    }
                }
                for (const subgenre of genre.subgenres) {
                    if (!genresSet.has(subgenre.name)) {
                        genresQueue.push(subgenre);
                    }
                }
            }
        }
    }
}

function formatMarkdown(bandsSet, genresSet) {
    let markdown = '## Жанры\n\n';

    const rootGenres = Array.from(genresSet.values()).filter(genre => !genre.parent);
    rootGenres.sort((a, b) => a.name.localeCompare(b.name));

    for (const genre of rootGenres) {
        markdown += formatGenre(genre, 0, genresSet);
    }

    markdown += '\n## Группы\n\n';

    const bandNames = Array.from(bandsSet.keys()).sort();
    for (const bandName of bandNames) {
        const band = bandsSet.get(bandName);
        const friendsNames = band.friends.map(friend => friend.name).sort();
        if (friendsNames.length > 0) {
            markdown += `- ${band.name}, друзья: ${friendsNames.join(', ')}\n`;
        } else {
            markdown += `- ${band.name}\n`;
        }
    }

    return markdown;
}

function formatGenre(genre, level, genresSet) {
    let indent = '  '.repeat(level);
    let markdown = `${indent}- ${genre.name}`;
    const bandNames = genre.bands.map(band => band.name).sort();
    if (bandNames.length > 0) {
        markdown += `: ${bandNames.join(', ')}\n`;
    } else {
        markdown += `\n`;
    }
    const subgenres = genre.subgenres.slice().sort((a, b) => a.name.localeCompare(b.name));
    for (const subgenre of subgenres) {
        markdown += formatGenre(subgenre, level + 1, genresSet);
    }
    return markdown;
}

function solution(data) {
    const bandsSet = new Map();
    const genresSet = new Map();
    collectData(data, bandsSet, genresSet);
    return formatMarkdown(bandsSet, genresSet);
};


// Жанры в памяти
const Genre1 = { type: 'genre', name: 'Рок', bands: [], subgenres: [], parent: null };
const Genre1Sub1 = { type: 'genre', name: 'Классик-рок', bands: [], subgenres: [], parent: null };
const Genre1Sub2 = { type: 'genre', name: 'Акустик-рок', bands: [], subgenres: [], parent: null };
const Genre1Sub3 = { type: 'genre', name: 'Полурок', bands: [], subgenres: [], parent: null };
const Genre2 = { type: 'genre', name: 'Нерок', bands: [], subgenres: [], parent: null };

// Разбираемся с роком
Genre1.subgenres.push(Genre1Sub1, Genre1Sub2, Genre1Sub3);
Genre1Sub1.parent = Genre1Sub2.parent = Genre1Sub3.parent = Genre1;

// Группы в памяти
const Band1 = { type: 'band', name: 'Жёлтый мох', friends: [], genres: [] };
const Band2 = { type: 'band', name: 'Красный слой', friends: [], genres: [] };
const Band3 = { type: 'band', name: 'Бритый гриб', friends: [], genres: [] };

// И в жанрах
Band1.genres.push(Genre1Sub1);
Genre1Sub1.bands.push(Band1);

Band2.genres.push(Genre1Sub2);
Genre1Sub2.bands.push(Band2);

// А Бритый гриб лабает в двух жанрах
Band3.genres.push(Genre2);
Genre2.bands.push(Band3);
Band3.genres.push(Genre1Sub3);
Genre1Sub3.bands.push(Band3);

// Группы умеют дружить
Band1.friends.push(Band2);
Band2.friends.push(Band1);

// С некоторыми — по 2 раза, но это не взаимно
Band1.friends.push(Band3);

// Помнит Коля только про Бритый Гриб :-(
// module.exports = Band3;

console.log(solution(Band3));
