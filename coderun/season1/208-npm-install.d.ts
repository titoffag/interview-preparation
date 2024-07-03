type PackageDependency = {
  packageName: string;
  version: number;
};

type PackageVersion = {
  version: number;
  dependencies?: PackageDependency[];
};

type AllDependencies = {
  [packageName: string]: {
    versions: PackageVersion[];
  };
};

type ResultDependencies = {
  [packageName: string]: number;
};
