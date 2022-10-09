function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const prerequisitesMap = new Map();
  for (const [source, destination] of prerequisites) {
    if (prerequisitesMap.has(source)) {
      prerequisitesMap.get(source).push(destination);
    } else {
      prerequisitesMap.set(source, [destination]);
    }
  }

  const visitSet = new Set();
  function hasCycle(course) {
    if (visitSet.has(course)) {
      return true;
    }

    if (prerequisitesMap.get(course)?.length == 0) {
      return false;
    }

    visitSet.add(course);
    for (const pre of prerequisitesMap?.get(course) ?? []) {
      if (hasCycle(pre)) {
        return true;
      }
    }
    visitSet.delete(course);
    prerequisitesMap.set(course, []);

    return false;
  }

  for (let course = 1; course <= numCourses; course++) {
    if (hasCycle(course)) {
      return false;
    }
  }

  return true;
}
