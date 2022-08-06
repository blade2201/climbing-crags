import { gradesObj } from "./grades";
import { Grade, Crag, Sector } from "../types/mattTypes";

const grades: Grade[] = gradesObj();

export function calcRoutesAndDifficulty(
  item: Crag | Sector,
  type: string
): { routes: string; rating: string; difficulties: string } {
  let numberOfRoutes: number = 0;
  let rating: number = 0;
  switch (type) {
    case "crags":
      if ("sectors" in item) {
        let difficulties: { high: number; low: number } | undefined;

        item.sectors.forEach((sector) => {
          let sectorDifficulties = sector.routes.reduce(
            (prev, curr) => {
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
          routes: item.sectors.length + "",
          rating: (rating / numberOfRoutes).toFixed(1),
          difficulties: stringifyDifficulties(difficulties),
        };
      }
    case "sectors":
      if ("sector_id" in item) {
        let sectorDifficulties = item.routes.reduce(
          (prev, curr) => {
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
        item.routes.forEach((route) => {
          numberOfRoutes++;
          rating += parseInt(route.rating);
        });
        return {
          routes: item.routes.length + "+",
          rating: (rating / numberOfRoutes).toFixed(1),
          difficulties: stringifyDifficulties(sectorDifficulties),
        };
      }
    default:
      return {
        routes: "",
        rating: "",
        difficulties: "",
      };
  }
}

function stringifyDifficulties(difficulty): string {
  return `${getFrGrade(difficulty.low)} - ${getFrGrade(difficulty.high)}`;
}

export function getFrGrade(grade: string): string {
  return (grades[parseInt(grade)] as [string])[0];
}
