// jQuery(document).ready(function ($) {});

let current_step = 1;
let countOfSides = 0;
let currentSide = 0;
let sides = [];

let maxHeight = 2000;
// const plates = [
//   { name: "Plate0", height: 1200, isDoubleSided: true, design: "design1", type: "flat", price: 3600 },
//   { name: "PlateA", height: 250, isDoubleSided: true, design: "design1", type: "flat", price: 1100 },
//   { name: "PlateB", height: 300, isDoubleSided: false, design: "design2", type: "curved", price: 2000 },
//   { name: "PlateC", height: 400, isDoubleSided: true, design: "design3", type: "flat", price: 4200 },
//   { name: "PlateD", height: 500, isDoubleSided: false, design: "designx", type: "flat", price: 1500 },
//   { name: "PlateE", height: 350, isDoubleSided: true, design: "modern", type: "flat", price: 3900 },
//   { name: "PlateF", height: 450, isDoubleSided: false, design: "classic", type: "curved", price: 4700 },
//   { name: "PlateG", height: 200, isDoubleSided: true, design: "minimal", type: "flat", price: 2300 },
//   { name: "PlateH", height: 200, isDoubleSided: false, design: "rustic", type: "flat", price: 800 },
//   { name: "PlateI", height: 150, isDoubleSided: true, design: "vintage", type: "curved", price: 2700 },
//   { name: "PlateJ", height: 600, isDoubleSided: false, design: "industrial", type: "flat", price: 4000 },
//   { name: "PlateK", height: 250, isDoubleSided: true, design: "eco", type: "flat", price: 1000 },
//   { name: "PlateL", height: 300, isDoubleSided: false, design: "urban", type: "curved", price: 1200 },
//   { name: "PlateM", height: 400, isDoubleSided: true, design: "fusion", type: "flat", price: 3100 },
//   { name: "PlateN", height: 500, isDoubleSided: false, design: "artdeco", type: "flat", price: 1700 },
//   { name: "PlateO", height: 350, isDoubleSided: true, design: "contemporary", type: "flat", price: 4400 },
//   { name: "PlateP", height: 450, isDoubleSided: false, design: "scandinavian", type: "curved", price: 2900 },
//   { name: "PlateQ", height: 200, isDoubleSided: true, design: "bohemian", type: "flat", price: 1400 },
//   { name: "PlateR", height: 550, isDoubleSided: false, design: "midcentury", type: "flat", price: 3400 },
//   { name: "PlateS", height: 150, isDoubleSided: true, design: "tropical", type: "curved", price: 2200 },
//   { name: "PlateT", height: 600, isDoubleSided: false, design: "mediterranean", type: "flat", price: 3200 },
// ];

const plates = [
    { name: "Plate1", height: 250, isDoubleSided: true, design: "designA", type: "flat", price: 150 },
    { name: "Plate2", height: 250, isDoubleSided: false, design: "designB", type: "curved", price: 170 },
    { name: "Plate3", height: 500, isDoubleSided: true, design: "designC", type: "flat", price: 250 },
    { name: "Plate4", height: 500, isDoubleSided: false, design: "designD", type: "curved", price: 270 },
    { name: "Plate5", height: 250, isDoubleSided: true, design: "designE", type: "curved", price: 180 },
    { name: "Plate6", height: 500, isDoubleSided: false, design: "designF", type: "flat", price: 240 },
    { name: "Plate7", height: 250, isDoubleSided: false, design: "designG", type: "flat", price: 160 },
    { name: "Plate8", height: 500, isDoubleSided: true, design: "designH", type: "curved", price: 280 },
  ];

const pillars = [
  { name: "y18", height: 1500, price: 100 },
  { name: "y20", height: 2000, price: 200 },
];

const fenceCovers = [
  { name: "fenceCover0", design: "design1", price: 100 },
  { name: "fenceCover1", design: "design2", price: 200 },
  { name: "none", design: "none", price: 0 },
];

const platesColors = [
  { name: "neutral", price: 0 },
  { name: "colored", price: 100 },
];

const fenceColors = [
  { name: "neutral", price: 0 },
  { name: "red", price: 100 },
];

function nextStep() {
  $(".step.current").hide();
  $(".step.current").removeClass("current");
  current_step++;
  $(".step-" + current_step)
    .show()
    .addClass("current");

  $(".calc-header__side")
    .fadeIn()
    .find(".current-side")
    .text(currentSide + 1);
  $(".step-counter").text(current_step);
}

function firstStepValidator(countOfSides) {
  if (countOfSides == 0) {
    alert("Please choose the number of sides");
    return false;
  }
  for (let i = 0; i < countOfSides; i++) {
    sides[i] = [];
  }

  i = currentSide;
  $(".step-2__inner").append(`
    <div class="side-general side-${i}" data-side="${i}">
      <h3>Side ${i + 1}</h3>
      Total length of side: 
      <input type="text" placeholder="side ${i + 1} length" name="side-length-${i}" value="2"><br/>
      <small>Only enter an EVEN NUMBER, please. The plates are always 2m long.<br/>
      If necessary, can be shortened on-site with a diamond grinding wheel</small>
      <br/><br/>
      
      <h4>Choose 1 or 2 side plate design</h4>
      <div class="sided-options">
        <label>
          <input type="radio" name="is-double-sided-${i}" value="false" checked>
          <img src="/img/1-zijde.png" alt="Single sided" title="1 structured side"><br/>
          1 structured side
        </label>
        <label>
          <input type="radio" name="is-double-sided-${i}" value="true">
          <img src="/img/1-zijde-1.png" alt="Double sided" title="2 structured sides"><br/>
          2 structured sides
        </label>
      </div>
    </div>
  `);

  nextStep();
}

function secondStepValidator() {
  let length = $('input[name="side-length-' + currentSide + '"]').val();
  if (length == "") {
    alert("Please enter the length of the side");
    return false;
  }
  // Check length need to be divided by 2
  if (length % 2 != 0) {
    alert("Length of the side should be even");
    return false;
  }

  sides[currentSide].length = length;
  sides[currentSide].isDoubleSided = $('input[name="is-double-sided-' + currentSide + '"]:checked').val() == "true";

  addPlateSelector(true); // Добавляем первый селект при переходе на шаг
  nextStep();
}

function addPlateSelector() {
  // Определяем, фильтруем ли плиты по isDoubleSided
  let isDoubleSided = sides[currentSide].isDoubleSided;

  // Фильтруем плиты по значению isDoubleSided
  let plateOptions = plates
    .filter((plate) => plate.isDoubleSided === isDoubleSided)
    .map(
      (plate) =>
        `<option value="${plate.name}" data-height="${plate.height}" data-design="${plate.design}" data-type="${plate.type}" style="background-image: url('path_to_design_images/${plate.design}.jpg');">${plate.name} - ${plate.height}mm - ${plate.design} - ${plate.type}</option>`
    )
    .join("");

  const plateSelectionHTML = `
          <div class="plate-selection" data-plate="">
              <select class="plate-select">
                  <option value="">Select Plate</option>
                  ${plateOptions}
              </select>
              <button class="js-remove-plate">Remove</button>
          </div>
      `;

  $(".step-3__inner").prepend(plateSelectionHTML);

  updatePlateSelectors();
}

function updatePlateSelectors() {
  $(".plate-select")
    .off("focusin") // Отслеживаем фокус для сохранения предыдущего значения
    .on("focusin", function () {
      $(this).data("prevValue", $(this).val()); // Сохраняем текущее значение перед изменением
    });

  $(".plate-select")
    .off("change")
    .on("change", function () {
      let selectedOption = $(this).find("option:selected");
      let plateHeight = parseInt(selectedOption.data("height")) || 0;
      let isCurved = selectedOption.data("type") === "curved";
      let isFirst = $(this).closest(".plate-selection").is(":first-child");

      // Проверка на выбор curved плиты не для первой позиции
      if (isCurved && !isFirst) {
        alert("Curved plate can only be the top plate.");
        $(this).val($(this).data("prevValue")); // Восстанавливаем предыдущее значение
        return; // Выходим из функции, чтобы не продолжать выполнение
      }

      // Предварительный пересчет высоты с учетом новой плиты
      let potentialTotalHeight = calculatePotentialTotalHeight() + plateHeight;

      if (potentialTotalHeight > maxHeight) {
        alert("Total height exceeds the allowed limit of 2000 mm");
        $(this).val($(this).data("prevValue")); // Восстанавливаем предыдущее значение
        recalculateTotalHeight(); // Пересчитываем общую высоту после сброса
      } else {
        recalculateTotalHeight(); // Пересчитываем общую высоту при корректном выборе
      }
    });
}

function calculatePotentialTotalHeight() {
  let totalHeight = 0;

  $(".plate-select").each(function (index) {
    if (index == 0) return;

    let selectedOption = $(this).find("option:selected");
    let plateHeight = parseInt(selectedOption.data("height")) || 0;

    totalHeight += plateHeight;
  });

  console.log({ totalHeight });

  return totalHeight;
}

function recalculateTotalHeight() {
  let totalHeight = 0;
  let hasCurvedPlate = false;

  $(".plate-select").each(function () {
    let selectedOption = $(this).find("option:selected");
    let plateHeight = parseInt(selectedOption.data("height")) || 0;
    let plateType = selectedOption.data("type");

    if (plateType === "curved") {
      hasCurvedPlate = true;
    }

    totalHeight += plateHeight;

    // Apply background based on design
    let design = selectedOption.data("design");
    if (design) {
      $(this).css("background-image", `url('path_to_design_images/${design}.jpg')`);
    }
  });

  $(".total-height").text(totalHeight);

  // Если выбрана curved плита, не добавляем новый селектор
  if (!hasCurvedPlate && $(".plate-select").first().val() !== "" && totalHeight < maxHeight) {
    addPlateSelector(); // Добавляем новый селектор только если последний уже заполнен
  }
}

// Event listener to remove a plate selector
$("body").on("click", ".js-remove-plate", function () {
  $(this).closest(".plate-selection").remove();
  recalculateTotalHeight(); // Пересчитываем общую высоту после удаления селектора

  // Если больше нет селекторов, добавляем пустой
  if ($(".plate-select").length === 0) {
    addPlateSelector();
  }
});

// Event listener to add a new plate selector
$("body").on("click", ".js-add-plate", function () {
  addPlateSelector();
});

$("body").on("click", ".js-choose-count-of-sides", function () {
  countOfSides = $(this).data("side");
  firstStepValidator(countOfSides);
});

function thridStepValidator() {
  let totalHeight = 0;
  let selectedPlates = [];
  let hasCurvedPlate = false;

  $(".plate-select").each(function () {
    let selectedOption = $(this).find("option:selected");

    if (selectedOption.val() === "") {
      //   alert("Please select a plate for each selector.");
      return;
    }

    let plateName = selectedOption.val();
    let plateHeight = parseInt(selectedOption.data("height")) || 0;
    let plateType = selectedOption.data("type");

    totalHeight += plateHeight;

    // Добавляем плиту в список с информацией снизу вверх
    selectedPlates.unshift(plates.find((plate) => plate.name === plateName));
    console.log({ selectedPlates });

    if (plateType === "curved") {
      hasCurvedPlate = true;
    }
  });

  if (totalHeight <= 0) {
    alert("Please select a plate for each selector.");
    return false;
  }

  if (totalHeight > maxHeight) {
    alert("Total height exceeds the allowed limit of 2000 mm");
    return false; // Прерываем выполнение, если высота превышена
  }

  // Записываем плиты для текущей стороны
  sides[currentSide].plates = selectedPlates;

  nextStep(4); // Переход на шаг 4, если верхняя плита не curved

  $(".step-4__inner").append(`
          <h4>Chose your fence cover:</h4>          
        `);

  if (!hasCurvedPlate) {
    fenceCovers.forEach((cover) => {
      $(".step-4__inner").append(`
            <button class="choose-fence-cover" data-cover="${cover.name}" > ${cover.name} </button>
          `);
    });
  }
  if (hasCurvedPlate) {
    $(".step-4__inner").append(`
        <button class="choose-fence-cover" data-cover="none" > Without fence cover </button>
      `);
  }
}

$("body").on("click", ".choose-fence-cover", function () {
  let cover = $(this).data("cover");
  let coverPrice = fenceCovers.find((c) => c.name === cover).price;
  sides[currentSide].fence = cover;
  nextStep(5);

  $(".step-5__inner").html(`
    <h3>Choose color for plates: </h3>
  `);

  let i = 0;
  platesColors.forEach((color) => {
    $(".step-5__inner").append(
      `
        <input type="radio" name="plates_color" class="choose-plates-color" value="${color.name}" ${i === 0 ? "checked" : ""} />${color.name}<br/>
      `
    );
    i++;
  });

  if (cover !== "none") {
    $(".step-5__inner").append(`
    <h3>Choose fence color: </h3>
    `);

    let i = 0;
    fenceColors.forEach((color) => {
      $(".step-5__inner").append(`
          <input type="radio" name="fence_color" class="choose-fence-color" value="${color.name}" ${i === 0 ? "checked" : ""} />${color.name}<br/>
        `);
      i++;
    });
  }
});

$("body").on("click", ".js-next-5", function () {
  let platesColor = $('input[name="plates_color"]:checked').val();
  let fenceColor = $('input[name="fence_color"]:checked').val();
  sides[currentSide].platesColor = platesColor;
  sides[currentSide].fenceColor = fenceColor;
  calculateSummary();
});

function calculateSummary() {
  let totalCost = 0;

  $(".step-6__inner").html(`
      <h3>Summary for side ${currentSide + 1}:</h3>
    `);

  // Рассчитываем количество столбиков
  let length = sides[currentSide].length;
  let sections = Math.ceil(length / 2); // количество секций по 2 метра
  let pillarsCount = sections + 1; // количество столбиков

  // Определяем высоту столбиков
  let totalHeight = sides[currentSide].plates.reduce((acc, plate) => acc + plate.height, 0);
  let pillar = totalHeight <= 1500 ? pillars.find((p) => p.height === 1500) : pillars.find((p) => p.height === 2000);

  let pillarsCost = pillarsCount * pillar.price;
  totalCost += pillarsCost;

  $(".step-6__inner").append(`
      <p>Pillars (${pillar.height}mm): ${pillarsCount} x ${pillar.price} = ${pillarsCost}</p>
    `);

  // Рассчитываем стоимость и детали плит
  $(".step-6__inner").append(`
      <h4>Plates details:</h4>
    `);

  sides[currentSide].plates.forEach((plate) => {
    // Количество плит, необходимое для покрытия одной стороны
    let platesCount = Math.ceil(length / plate.height);
    if(sides[currentSide].isDoubleSided) platesCount *= 2;

    let platesCost = platesCount * plate.price;
    totalCost += platesCost;

    $(".step-6__inner").append(`
        <p>${plate.name} (${plate.height}mm, ${plate.type}, ${plate.design} design): ${platesCount} x ${plate.price} = ${platesCost}</p>
      `);
  });

  // Рассчитываем стоимость крыши, если есть
  if (sides[currentSide].fence && sides[currentSide].fence !== "none") {
    let fenceCover = fenceCovers.find((c) => c.name === sides[currentSide].fence);
    totalCost += fenceCover.price;

    $(".step-6__inner").append(`
        <p>Fence cover (${fenceCover.name}): ${fenceCover.price}</p>
      `);
  }

  // Рассчитываем стоимость покраски плит, если выбрано
  if (sides[currentSide].platesColor && sides[currentSide].platesColor !== "neutral") {
    let platesColor = platesColors.find((c) => c.name === sides[currentSide].platesColor);
    totalCost += platesColor.price;

    $(".step-6__inner").append(`
        <p>Plates color (${platesColor.name}): ${platesColor.price}</p>
      `);
  }

  // Рассчитываем стоимость покраски забора, если выбрано
  if (sides[currentSide].fenceColor && sides[currentSide].fenceColor !== "neutral") {
    let fenceColor = fenceColors.find((c) => c.name === sides[currentSide].fenceColor);
    totalCost += fenceColor.price;

    $(".step-6__inner").append(`
        <p>Fence color (${fenceColor.name}): ${fenceColor.price}</p>
      `);
  }

  // Добавляем итоговую стоимость
  $(".step-6__inner").append(`
      <h4>Total cost: ${totalCost}</h4>
    `);

  nextStep(6);
}

$("body").on("click", ".js-next-2", function () {
  secondStepValidator();
  //   addPlateSelector(); // Добавляем первый пустой селектор сразу после перехода на шаг 3
});

$("body").on("click", ".js-next-3", function () {
  thridStepValidator();
});



$(document).ready(function () {
    // Создаем контейнер для отладочной информации
    let debugInfo = $('<div id="debug-info"><h3>Debug Pricing Information</h3></div>');
  
    // Добавляем цены для плит (plates)
    debugInfo.append('<h4>Plates Prices:</h4>');
    plates.forEach(plate => {
      debugInfo.append(`<p>${plate.name}: Height ${plate.height}mm, ${plate.isDoubleSided ? 'Double-sided' : 'Single-sided'}, Design: ${plate.design}, Type: ${plate.type} - Price: ${plate.price}</p>`);
    });
  
    // Добавляем цены для столбиков (pillars)
    debugInfo.append('<h4>Pillars Prices:</h4>');
    pillars.forEach(pillar => {
      debugInfo.append(`<p>${pillar.name}: Height ${pillar.height}mm - Price: ${pillar.price}</p>`);
    });
  
    // Добавляем цены для крыш (fenceCovers)
    debugInfo.append('<h4>Fence Covers Prices:</h4>');
    fenceCovers.forEach(cover => {
      debugInfo.append(`<p>${cover.name}: Design: ${cover.design} - Price: ${cover.price}</p>`);
    });
  
    // Добавляем цены для цветов плит (platesColors)
    debugInfo.append('<h4>Plates Colors Prices:</h4>');
    platesColors.forEach(color => {
      debugInfo.append(`<p>${color.name}: Price: ${color.price}</p>`);
    });
  
    // Добавляем цены для цветов забора (fenceColors)
    debugInfo.append('<h4>Fence Colors Prices:</h4>');
    fenceColors.forEach(color => {
      debugInfo.append(`<p>${color.name}: Price: ${color.price}</p>`);
    });
  
    // Вставляем контейнер после блока #calc
    $('#calc').after(debugInfo);
  });