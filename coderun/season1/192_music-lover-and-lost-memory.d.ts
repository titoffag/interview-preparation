class Band {
    name: string;
    friends: Band[];
    genres: Genre[];
}

class Genre {
    name: string;
    bands: Band[];
    subgenres: Genre[];
    parent: Genre | null;
}
