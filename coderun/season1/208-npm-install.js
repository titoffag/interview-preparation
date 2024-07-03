function getLastCompatibleDependencies(data, packageA, packageB) {
  function getDependencies(pkg, version) {
    return (
      data[pkg].versions.find((v) => v.version === version).dependencies || []
    );
  }

  function isCompatible(pkgVersion, depPkg, depVersion) {
    const depVersions = data[depPkg].versions;
    for (let i = depVersions.length - 1; i >= 0; i--) {
      if (depVersions[i].version === depVersion) {
        const dependencies = getDependencies(depPkg, depVersion);
        return dependencies.every((dep) => {
          return isCompatible(depPkg, dep.packageName, dep.version);
        });
      }
    }
    return false;
  }

  function areCompatible(pkgAVersion, pkgBVersion) {
    const pkgADependencies = getDependencies(packageA, pkgAVersion);
    const pkgBDependencies = getDependencies(packageB, pkgBVersion);

    const pkgAIsCompatible = pkgADependencies.every((dep) => {
      return isCompatible(packageA, dep.packageName, dep.version);
    });

    const pkgBIsCompatible = pkgBDependencies.every((dep) => {
      return isCompatible(packageB, dep.packageName, dep.version);
    });

    const pkgADepOnB = pkgADependencies.find(
      (dep) => dep.packageName === packageB
    );
    const pkgBDepOnA = pkgBDependencies.find(
      (dep) => dep.packageName === packageA
    );

    if (pkgADepOnB && pkgBDepOnA) {
      return (
        pkgAIsCompatible &&
        pkgBIsCompatible &&
        pkgADepOnB.version === pkgBVersion &&
        pkgBDepOnA.version === pkgAVersion
      );
    } else if (pkgADepOnB) {
      return (
        pkgAIsCompatible &&
        pkgBIsCompatible &&
        pkgADepOnB.version === pkgBVersion
      );
    } else if (pkgBDepOnA) {
      return (
        pkgAIsCompatible &&
        pkgBIsCompatible &&
        pkgBDepOnA.version === pkgAVersion
      );
    } else {
      return pkgAIsCompatible && pkgBIsCompatible;
    }
  }

  const pkgAVersions = data[packageA].versions
    .map((v) => v.version)
    .sort((a, b) => b - a);
  const pkgBVersions = data[packageB].versions
    .map((v) => v.version)
    .sort((a, b) => b - a);

  for (let i = 0; i < pkgAVersions.length; i++) {
    for (let j = 0; j < pkgBVersions.length; j++) {
      if (areCompatible(pkgAVersions[i], pkgBVersions[j])) {
        const result = {};
        result[packageA] = pkgAVersions[i];
        result[packageB] = pkgBVersions[j];
        return { result };
      }
    }
  }
}

exports.getLastCompatibleDependencies = getLastCompatibleDependencies;
