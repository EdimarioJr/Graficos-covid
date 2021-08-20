const json = {
  version: 4,
  sourceUrl: "https://covid.saude.gov.br/",
  country: "Brazil",
  lastUpdatedAtApify: "2021-08-19T23:00:18.881Z",
  historyData:
    "https://api.apify.com/v2/datasets/3S2T1ZBxB9zhRJTBB/items?format=json&clean=1",
  readMe: "https://apify.com/pocesar/covid-brazil",
  tested: "N/A",
  recovered: 19393047,
  lastUpdatedAtSource: "2021-08-19T21:36:35.057Z",
  infected: 20494212,
  deceased: 572641,
  infectedByRegion: [
    {
      state: "SP",
      count: 4195466,
    },
    {
      state: "PR",
      count: 1433191,
    },
    {
      state: "RS",
      count: 1395995,
    },
    {
      state: "BA",
      count: 1212603,
    },
    {
      state: "SC",
      count: 1139900,
    },
    {
      state: "RJ",
      count: 1097935,
    },
    {
      state: "CE",
      count: 928016,
    },
    {
      state: "GO",
      count: 791823,
    },
    {
      state: "PE",
      count: 602507,
    },
    {
      state: "PA",
      count: 579487,
    },
    {
      state: "ES",
      count: 554543,
    },
    {
      state: "MT",
      count: 507065,
    },
    {
      state: "DF",
      count: 461925,
    },
    {
      state: "PB",
      count: 429430,
    },
    {
      state: "AM",
      count: 422517,
    },
    {
      state: "MS",
      count: 364563,
    },
    {
      state: "RN",
      count: 363231,
    },
    {
      state: "MA",
      count: 345154,
    },
    {
      state: "PI",
      count: 314151,
    },
    {
      state: "SE",
      count: 277009,
    },
    {
      state: "RO",
      count: 261632,
    },
    {
      state: "AL",
      count: 233601,
    },
    {
      state: "TO",
      count: 215780,
    },
    {
      state: "RR",
      count: 122373,
    },
    {
      state: "AP",
      count: 122199,
    },
    {
      state: "AC",
      count: 87638,
    },
    {
      state: "MG",
      count: 20344,
    },
  ],
  deceasedByRegion: [
    {
      state: "SP",
      count: 143752,
    },
    {
      state: "MG",
      count: 52248,
    },
    {
      state: "PR",
      count: 36769,
    },
    {
      state: "RS",
      count: 33887,
    },
    {
      state: "BA",
      count: 26226,
    },
    {
      state: "SC",
      count: 18453,
    },
    {
      state: "RJ",
      count: 61090,
    },
    {
      state: "CE",
      count: 23921,
    },
    {
      state: "GO",
      count: 21974,
    },
    {
      state: "PE",
      count: 19224,
    },
    {
      state: "PA",
      count: 16324,
    },
    {
      state: "ES",
      count: 12113,
    },
    {
      state: "MT",
      count: 13036,
    },
    {
      state: "DF",
      count: 9878,
    },
    {
      state: "PB",
      count: 9123,
    },
    {
      state: "AM",
      count: 13645,
    },
    {
      state: "MS",
      count: 9224,
    },
    {
      state: "RN",
      count: 7237,
    },
    {
      state: "MA",
      count: 9892,
    },
    {
      state: "PI",
      count: 6915,
    },
    {
      state: "SE",
      count: 5958,
    },
    {
      state: "RO",
      count: 6450,
    },
    {
      state: "AL",
      count: 5990,
    },
    {
      state: "TO",
      count: 3637,
    },
    {
      state: "RR",
      count: 1924,
    },
    {
      state: "AP",
      count: 1943,
    },
    {
      state: "AC",
      count: 1808,
    },
  ],
};

const svgContainer = document.getElementById("base");
const svgDeceasedContainer = document.getElementById("baseDeceased");

function getData(json_data) {
  const { infectedByRegion, deceasedByRegion } = json_data;

  putDataOnGraph(infectedByRegion, svgContainer, "Infectados");
  putDataOnGraph(deceasedByRegion, svgDeceasedContainer, "Mortos");
}

function putDataOnGraph(data, container, tooltipSub) {
  const ordenatedData = orderData(data);
  let svgRects = "";
  let svgSubtitle = "";
  const init = 130;

  const maxInfected = getMaxValue(ordenatedData);

  ordenatedData.forEach(({ state, count }, index) => {
    const heightRect = (count / maxInfected) * 465;
    svgRects += `<rect 
      x=${init + (index - 1) * 50} 
      y=${490 - heightRect} width="30" 
      height=${heightRect} class="graph_hist" title="${tooltipSub}: ${count} " />`;

    svgSubtitle += `<text x=${init + (index - 1) * 50} y="515">${state}</text>`;
  });
  container.innerHTML += svgRects;
  container.innerHTML += `<g class="x_axis">${svgSubtitle} </g>`;
}

function getMaxValue(infectedByRegion) {
  let maxInfected = 0;
  infectedByRegion.forEach(({ count }) => {
    if (count > maxInfected) maxInfected = count;
  });
  return maxInfected;
}

function orderData(data) {
  return data.sort((a, b) => b.count - a.count);
}

getData(json);
