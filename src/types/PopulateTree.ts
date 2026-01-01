type PopulateTree = {
    [key: string]: string | boolean | PopulateTree | (string | PopulateTree)[];
};

export default PopulateTree;