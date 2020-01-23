let counter = 0;
let chart;
let intervalId;

startAnimation();

async function startAnimation() {
  plotLayout();
  const { line1, line2, noise } = await fetchData();

  intervalId = setInterval(() => {
    // const data = get
    chart.data = getNextData(line1, line2, noise);
    chart.update();
  }, 100);

}

function getNextData(line1, line2, noise) {
  const data = { series: [] };

  // console.log(counter)
  let dataNoise = { name: "noise", data: noise };
  let dataLine1 = { name: "line1", data: line1 };
  let dataLine2 = { name: "line2", data: line2 };

  if (counter < noise.length) {
    // Add noise to data
    data.series.push({ name: "noise", data: noise.slice(0, counter) });
  } 
  else if (counter < noise.length + line1.length) {
    data.series.push(dataNoise);
    data.series.push({name: "line1", data: line1.slice(0, counter - noise.length)});
  }
  else if (counter < noise.length + line1.length + line2.length) {
    const c = -1*(counter - noise.length - line1.length+1);
    data.series.push(dataNoise);
    data.series.push(dataLine1);
    data.series.push({name: "line2", data: line2.slice(c)})
  }
  else if (counter < 200 + noise.length + line1.length + line2.length) {
    data.series = [dataNoise, dataLine1, dataLine2];
  }
  else {
    counter = 0;
  }
  counter++;
  return data;
}

async function fetchData() {
  const line1 = await fetch("/static/main/science/plot_line_1.json").then(resp => resp.json());
  const line2 = await fetch("/static/main/science/plot_line_2.json").then(resp => resp.json());
  const noise = await fetch("/static/main/science/plot_noise.json").then(resp => resp.json());

  console.log(line1, line2, noise);
  return { line1, line2, noise };
}

async function plotLayout() {
  const data = {
    // labels: line.x,
    series: [
      // { name: "line1", data: line1 },
      // { name: "line2", data: line2 },
      // { name: "noise", data: noise },
    ]
  };

  const options = {
    axisY: {
      type: Chartist.FixedScaleAxis,
      ticks: [-0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75],
      high: 0.75,
      low: -0.75,
      onlyInteger: true,
      offset: 20
    },
    axisX: {
      high: 1,
      low: -1,
      type: Chartist.FixedScaleAxis,
      ticks: [-1, -0.5, 0, 0.5, 1]
    },
    showline: false,
    series: {
      noise: {
        showLine: false
      },
      line1: {
        showPoint: false,
      },
      line2: {
        showPoint: false,
      },
    }
  };

  chart = new Chartist.Line('#ct-expertise', {}, options);
  console.log(chart);
}