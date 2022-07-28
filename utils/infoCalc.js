import { gradesObj } from '../utils/realmApp';
export function calcRoutesAndDifficulty(item, type) {
  switch (type) {
    case 'crags':
      let numberOfRoutes = 0;
      let rating = 0;
      let difficulties;
      item.sectors.forEach((sector) => {
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
          { high: 0, low: 1000 },
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
      const grades = gradesObj();
      const stringDifficulties = `${grades[parseInt(difficulties.low)][0]} - ${
        grades[parseInt(difficulties.high)][0]
      }`;
      return {
        routes: item.sectors.length,
        rating: (rating / numberOfRoutes).toFixed(1),
        difficulties: stringDifficulties,
      };
    case 'sectors':
      return { routes: item.routes.length, rating: 0, difficulties: { high: '', low: '' } };
    default:
      return {};
  }
}
