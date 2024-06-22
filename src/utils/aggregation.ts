// src/utils/aggregation.ts

import agricultureData from '../data/agricultureData';

interface AggregatedData {
  Year: number;
  MaxCrop: string;
  MinCrop: string;
}

interface CropSummary {
  Crop: string;
  AvgYield: string;
  AvgArea: string;
}

// Function to aggregate data for Table 1
export const aggregateTable1Data = (): AggregatedData[] => {
  const aggregatedData: AggregatedData[] = [];

  const years = Array.from(new Set(agricultureData.map(entry => parseInt(entry.Year.split(', ')[1]))));

  years.forEach(year => {
    const cropsOfYear = agricultureData.filter(entry => parseInt(entry.Year.split(', ')[1]) === year);
    
    // Filter out entries with empty strings for production values
    const cropsWithProduction = cropsOfYear.filter(entry => entry['Crop Production (UOM:t(Tonnes))'] !== "");

    if (cropsWithProduction.length > 0) {
      const maxCrop = cropsWithProduction.reduce((prev, current) =>
        prev['Crop Production (UOM:t(Tonnes))'] > current['Crop Production (UOM:t(Tonnes))'] ? prev : current
      );
      const minCrop = cropsWithProduction.reduce((prev, current) =>
        prev['Crop Production (UOM:t(Tonnes))'] < current['Crop Production (UOM:t(Tonnes))'] ? prev : current
      );

      aggregatedData.push({
        Year: year,
        MaxCrop: maxCrop['Crop Name'],
        MinCrop: minCrop['Crop Name']
      });
    }
  });

  return aggregatedData;
};

// Function to aggregate data for Table 2
export const aggregateTable2Data = (): CropSummary[] => {
  const cropSummary: { [key: string]: { totalYield: number; totalArea: number; count: number } } = {};

  agricultureData.forEach(entry => {
    const crop = entry['Crop Name'];
    const yieldValue = parseInt(entry['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'] as string);
    const areaValue = parseFloat(entry['Area Under Cultivation (UOM:Ha(Hectares))'] as string);

    // Skip entries where yield or area is NaN
    if (!isNaN(yieldValue) && !isNaN(areaValue)) {
      if (!cropSummary[crop]) {
        cropSummary[crop] = {
          totalYield: 0,
          totalArea: 0,
          count: 0
        };
      }

      cropSummary[crop].totalYield += yieldValue;
      cropSummary[crop].totalArea += areaValue;
      cropSummary[crop].count++;
    }
  });

  const cropSummaryArray: CropSummary[] = [];

  Object.keys(cropSummary).forEach(crop => {
    const avgYield = cropSummary[crop].totalYield / cropSummary[crop].count;
    const avgArea = cropSummary[crop].totalArea / cropSummary[crop].count;

    cropSummaryArray.push({
      Crop: crop,
      AvgYield: avgYield.toFixed(3),
      AvgArea: avgArea.toFixed(3)
    });
  });

  return cropSummaryArray;
};
