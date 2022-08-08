import { gradesObj } from './grades';
const grades = gradesObj();
export function calcRoutesAndDifficulty(item: any, type: string) {
  let numberOfRoutes = 0;
  let rating = 0;
  switch (type) {
    case 'crags':
      let difficulties: Difficulty = { high: 0, low: 1000 };
      item.sectors.forEach((sector: Sector) => {
        let sectorDifficulties = sector.routes.reduce(
          (prev, curr) => {
            if (prev.high < parseInt(curr.grade_id)) {
              prev.high = curr.grade_id;
            }
            if (prev.low > parseInt(curr.grade_id)) {
              prev.low = curr.grade_id;
            }
            return prev;
          },
          { high: 0, low: 1000 }
        );
        if (!difficulties) {
          difficulties = { ...sectorDifficulties };
        } else {
          difficulties = {
            high: Math.max(difficulties.high, sectorDifficulties.high),
            low: Math.min(difficulties.low, sectorDifficulties.low),
          };
        }
        sector.routes.forEach((route) => {
          numberOfRoutes++;
          rating += parseInt(route.rating);
        });
      });
      return {
        routes: item.sectors.length,
        rating: (rating / numberOfRoutes).toFixed(1),
        difficulties: stringifyDifficulties(difficulties),
      };
    case 'sectors':
      let sectorDifficulties = item.routes.reduce(
        (prev: Difficulty, curr: Route) => {
          if (prev.high < parseInt(curr.grade_id)) {
            prev.high = parseInt(curr.grade_id);
          }
          if (prev.low > parseInt(curr.grade_id)) {
            prev.low = parseInt(curr.grade_id);
          }
          return prev;
        },
        { high: 0, low: 1000 }
      );
      item.routes.forEach((route: Route) => {
        numberOfRoutes++;
        rating += parseInt(route.rating);
      });
      return {
        routes: item.routes.length + '+',
        rating: (rating / numberOfRoutes).toFixed(1),
        difficulties: stringifyDifficulties(sectorDifficulties),
      };
    default:
      return {};
  }
}

function stringifyDifficulties(difficulties: Difficulty) {
  return `${getFrGrade(difficulties.low)} - ${getFrGrade(difficulties.high)}`;
}

export function getFrGrade(grade: number) {
  return grades[grade][0];
}
