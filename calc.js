// jQuery(document).ready(function ($) {});

let current_step = 1;
let countOfSides = 0;
let currentSide = 0;
let currentVisualSide = 0;
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
  { name: "Plate1", height: 250, isDoubleSided: true, design: "designA", image: "1", type: "flat", price: 30 },
  { name: "Plate2", height: 250, isDoubleSided: false, design: "designB", image: "2", type: "curved", price: 30 },
  { name: "Plate3", height: 500, isDoubleSided: true, design: "designC", image: "3", type: "flat", price: 60 },
  { name: "Plate4", height: 500, isDoubleSided: false, design: "designD", image: "5", type: "curved", price: 40 },
  { name: "Plate5", height: 250, isDoubleSided: true, design: "designE", image: "4", type: "curved", price: 30 },
  { name: "Plate6", height: 500, isDoubleSided: false, design: "designF", image: "6", type: "flat", price: 40 },
  { name: "Plate7", height: 250, isDoubleSided: false, design: "designG", image: "7", type: "flat", price: 30 },
];

const pillars = [
  { name: "y18", height: 1500, price: 20 },
  { name: "y20", height: 2000, price: 20 },
];

const fenceCovers = [
  { name: "fenceCover0", design: "design1", img: "img/cover/1.jpg", price: 30 },
  { name: "fenceCover1", design: "design2", img: "img/cover/2.jpg", price: 30 },
  { name: "none", design: "none", price: 0 },
];

const platesColors = [
  { name: "neutral", price: 0, img: "img/platesColors/plate1.jpg" },
  { name: "antracite", price: 5, img: "img/platesColors/plate2.jpg" },
  { name: "white", price: 5, img: "img/platesColors/plate3.jpg" },
];

const fenceColors = [
  { name: "neutral", price: 0 },
  { name: "red", price: 10 },
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

function prevStep() {
  $(".step.current").hide();
  $(".step.current").removeClass("current");
  current_step--;
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

  for (let i = currentSide; i < countOfSides; i++) {
    sides[i] = [];
  }

  renderStep2();
  nextStep();
}

function renderStep2() {
  i = currentSide;

  let isDoubleSided = "";
  let isSingleSided = "checked";

  let sideLength = 2;

  if (sides && sides[i]) {
    if (sides[i].isDoubleSided) {
      isDoubleSided = "checked";
      isSingleSided = "";
    }
    if (sides[i].length) {
      sideLength = sides[i].length;
    }
  }

  $(".step-2__inner").html(
    `
    <div class="side-general side-${i}" data-side="${i}">
      <h3>Side ${i + 1}</h3>
      <strong>Total length of side, m:</strong> 
      <input type="text" placeholder="side ${i + 1} length" name="side-length-${i}" value="${sideLength}">
      <small>The length of the plates is always 2 m. <br/>
Odd values will be rounded upwards</small>
      <br/><br/>
      
      <h4>Choose 1 or 2 side plate design</h4>
      <div class="sided-options">
        <label>
          <input type="radio" name="is-double-sided-${i}" value="false" ` +
      isSingleSided +
      `  >
          <img src="img/1-zijde.png" alt="Single sided" title="1 structured side"><br/>
          1 structured side
        </label>
        <label>
          <input type="radio" name="is-double-sided-${i}" value="true" ` +
      isDoubleSided +
      `>
          <img src="img/1-zijde-1.png" alt="Double sided" title="2 structured sides"><br/>
          2 structured sides
        </label>
      </div>
    </div>
  `
  );
}

function secondStepValidator() {
  let length = $('input[name="side-length-' + currentSide + '"]').val();
  if (length == "") {
    alert("Please enter the length of the side");
    return false;
  }
  // Check length need to be divided by 2
  if (length % 2 != 0) {
    length = parseInt(length) + 1;
    // alert("Length of the side should be even");
    // return false;
  }

  sides[currentSide].length = length;
  sides[currentSide].isDoubleSided = $('input[name="is-double-sided-' + currentSide + '"]:checked').val() == "true";

  // addPlateSelector(true); // Добавляем первый селект при переходе на шаг
  // renderStep3();
  recalculateTotalHeight();
  if (currentSide > 0) {
    displayPreviousSidesInfo();
  }
  nextStep();
}

function renderStep3() {
  console.log({ sides });
  $(".step-3__inner").html("");
  if (sides && sides[currentSide] && sides[currentSide].plates) {
    let hasCurvedPlate = false;
    sides[currentSide].plates.forEach((plate) => {
      addPlateSelector(plate);

      if (plate.type === "curved") {
        hasCurvedPlate = true;
      }
    });

    if (!hasCurvedPlate) {
      addPlateSelector();
    }
  }
  // if (currentSide > 0) {
    displayPreviousSidesInfo();
  // }
}

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

  renderStep4();
  nextStep(4); // Переход на шаг 4, если верхняя плита не curved
  // Start by appending the title and the div container for the fence covers
}

function renderStep4() {
  $(".step-4__inner").html("");
  $(".step-4__inner").append(`
    <h4>Choose your top cover:</h4>          
    <div class="step-selects --cover">
  `);

  let hasCurvedPlate = false;
  sides[currentSide].plates.forEach((plate) => {
    if (plate.type === "curved") {
      hasCurvedPlate = true;
    }
  });

  // Append the fence cover buttons only if hasCurvedPlate is false
  if (!hasCurvedPlate) {
    fenceCovers.forEach((cover, index) => {
      if (cover.name === "none") return;
      $(".step-selects.--cover").append(`
        <button class="choose-fence-cover btn-img" data-cover="fenceCover${index}"> 
          <img src="${cover.img}" />
        </button>
      `);
    });
  }

  // Always append the "No fence cover" button
  $(".step-selects.--cover").append(`
    <button class="choose-fence-cover btn-img --empty" data-cover="none"><span>No top cover</span></button>
  `);

  // Finally, close the div container
  $(".step-4__inner").append(`</div>`);
}

$("body").on("click", ".choose-fence-cover", function () {
  let cover = $(this).data("cover");
  let coverPrice = fenceCovers.find((c) => c.name === cover).price;
  sides[currentSide].fence = cover;
  nextStep(5);
  renderStep5();
});

function renderStep5() {
  $(".step-5__inner").html("");

  cover = sides[currentSide].fence;

  $(".step-5__inner").html(`
    <h3>Choose color for plates: </h3>
  `);

  let i = 0;
  platesColors.forEach((color) => {
    $(".step-5__inner").append(
      `
      <label class="radio-label --bg">
        <input type="radio" name="plates_color" class="choose-plates-color input-radio" value="${color.name}" ${i === 0 ? "checked" : ""} />
        <span>${color.name}</span>
        <img src="${color.img}" />
        </label>
      `
    );
    i++;
  });

  if (cover !== "none") {
    $(".step-5__inner").append(`
      <br/><br/>
    <h3>Choose top cover color: </h3>
    `);

    let i = 0;
    fenceColors.forEach((color) => {
      $(".step-5__inner").append(`
        <label class="radio-label">
          <input type="radio" name="fence_color" class="choose-fence-color input-radio" value="${color.name}" ${i === 0 ? "checked" : ""} />
          <span>${color.name}</span>
          </label>
        `);
      i++;
    });
  }
}

$("body").on("click", ".js-next-5", function () {
  let platesColor = $('input[name="plates_color"]:checked').val();
  let fenceColor = $('input[name="fence_color"]:checked').val();
  sides[currentSide].platesColor = platesColor;
  sides[currentSide].fenceColor = fenceColor;
  calculateSummary();
});

function calculateSummary() {
  let totalCost = 0;

  // Проверяем, есть ли еще не заполненные стороны
  if (currentSide + 1 < countOfSides) {
    currentSide++;
    currentVisualSide++;

    current_step = 1; // Возвращаемся к шагу 2 для следующей стороны
    $(".step-2__inner").html("");
    $(".step-3__inner").html("");
    $(".step-4__inner").html("");
    $(".step-5__inner").html("");

    // recalculateTotalHeight();
    firstStepValidator(countOfSides);

    // nextStep(); // Возвращаемся к шагу 2
  } else {
    // Если все стороны заполнены, переход к итоговому результату или другой завершающей логике
    $(".step-6__inner").append(`
        <h3>All sides are filled. Final calculation is done.</h3>
      `);
    nextStep();
  }
  $(".step-6__inner").html("");
  $(".js-prev-6").hide();
  sides.forEach((side, i) => {
    console.log({ side, i });
    $(".step-6__inner").append(`
      <h3>Summary for side ${i + 1}:</h3>
    `);

    // Рассчитываем количество столбиков
    let length = sides[i].length;
    let sectionsCount = Math.ceil(length / 2); // количество секций по 2 метра
    console.log({ sectionsCount });
    let pillarsCount = sectionsCount + 1; // количество столбиков

    // Определяем высоту столбиков
    let totalHeight = sides[i].plates.reduce((acc, plate) => acc + plate.height, 0);
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

    sides[i].plates.forEach((plate) => {
      // Количество плит, необходимое для покрытия одной стороны
      let platesCount = Math.ceil(length / plate.height);
      if (sides[i].isDoubleSided) platesCount *= 2;

      platesCount *= sectionsCount;

      let platesCost = platesCount * plate.price;
      totalCost += platesCost;

      $(".step-6__inner").append(`
        <p>${plate.name} (${plate.height}mm): ${platesCount} x ${plate.price} = ${platesCost}</p>
      `);
    });

    // Рассчитываем стоимость крыши, если есть
    if (sides[i].fence && sides[i].fence !== "none") {
      let fenceCover = fenceCovers.find((c) => c.name === sides[i].fence);
      totalCost += fenceCover.price * sectionsCount;

      $(".step-6__inner").append(`
        <p>Top cover (${fenceCover.name}): ${sectionsCount} x ${fenceCover.price}</p>
      `);
    }

    // Рассчитываем стоимость покраски плит, если выбрано
    if (sides[i].platesColor && sides[i].platesColor !== "neutral") {
      let platesColor = platesColors.find((c) => c.name === sides[i].platesColor);
      totalCost += platesColor.price * sectionsCount;

      $(".step-6__inner").append(`
        <p>Plates color (${platesColor.name}): ${sides[i].plates.length} x ${platesColor.price}</p>
      `);
    }

    // Рассчитываем стоимость покраски забора, если выбрано
    if (sides[i].fenceColor && sides[i].fenceColor !== "neutral") {
      let fenceColor = fenceColors.find((c) => c.name === sides[i].fenceColor);
      totalCost += fenceColor.price * sectionsCount;

      $(".step-6__inner").append(`
        <p>Fence color (${fenceColor.name}): ${sectionsCount} x ${fenceColor.price}</p>
      `);
    }

    $(".step-6__inner").append(`<hr/>`);
  });

  // Добавляем итоговую стоимость
  $(".step-6__inner").append(`
      <h2>Total cost: ${totalCost}</h2>
    `);

  $(".js-next-6").hide();
}

$("body").on("click", ".js-next-2", function () {
  secondStepValidator();
  //   addPlateSelector(); // Добавляем первый пустой селектор сразу после перехода на шаг 3
});

$("body").on("click", ".js-next-3", function () {
  thridStepValidator();
});

$("body").on("click", ".js-prev-2", function () {
  if (currentSide > 0) {
    currentSide--;
    renderStep5();

    $(".step.current").hide();
    $(".step.current").removeClass("current");
    current_step = 5;
    $(".step-" + current_step)
      .show()
      .addClass("current");

    $(".calc-header__side")
      .fadeIn()
      .find(".current-side")
      .text(currentSide + 1);
    $(".step-counter").text(current_step);
  } else {
    prevStep();
    $(".step-2__inner").html("");
  }
});
$("body").on("click", ".js-prev-3", function () {
  prevStep();
  renderStep2();
});

$("body").on("click", ".js-prev-4", function () {
  prevStep();
  renderStep3();
});
$("body").on("click", ".js-prev-5", function () {
  prevStep();
  renderStep4();
});

function displayPreviousSidesInfo() {
  $(".previous-sides-info").remove(); // Очищаємо блок з інформацією, щоб уникнути дублювання

  console.log('displayPreviousSidesInfo()');
  console.log({currentSide});
  if (currentSide > 0) {
    // Виводимо інформацію тільки якщо є попередні сторони
    let previousInfoHTML = `<div class="previous-sides-info">`;

    for (let i = 0; i < currentSide; i++) {
      let side = sides[i];
      previousInfoHTML += `<div class="side-info">
        <h3>Side ${i + 1}:</h3>
        <div class="side-details">
          <div class="plates-visual">`;

      //reverse side.plates
      let plates = side.plates.reverse();
      // Відображаємо картинки плит для цієї сторони
      plates.forEach((plate) => {
        previousInfoHTML += `
        <div class="plates-visual__item">
          <img src="img/b/${plate.image}.png" alt="${plate.name}" title="${plate.name}" style="height:auto;width:300px;margin-right:10px;">
          <p>${plate.height}mm</p>
          </div>
        `;
      });

      previousInfoHTML += `</div>`;

      // Виводимо загальну висоту для цієї сторони
      let totalHeight = side.plates.reduce((sum, plate) => sum + plate.height, 0);
      previousInfoHTML += `<p><strong>Total Height:</strong> ${totalHeight}mm</p>`;

      previousInfoHTML += `</div></div><hr>`;
    }

    previousInfoHTML += `</div>`;

    // Додаємо інформацію перед блоком вибору плит
    $(".step-3__prev").append(previousInfoHTML);
  }
}
function addPlateSelector(plateData = false) {
  // Определяем, фильтруем ли плиты по isDoubleSided
  let isDoubleSided = sides[currentSide].isDoubleSided;
  console.log({ plateData });

  let plateOptions = "";

  // Фильтруем плиты по значению isDoubleSided
  plateOptions = plates
    .filter((plate) => plate.isDoubleSided === isDoubleSided)
    .map((plate) => {
      // Определяем, является ли плита выбранной, если передан plateData
      let selected = plateData && plateData.name === plate.name ? "selected" : "";
      return `
          <option value="${plate.name}" data-height="${plate.height}" data-design="${plate.design}" data-type="${plate.type}" data-image="img/b/${plate.image}.png" ${selected}>
            ${plate.height}mm
          </option>
        `;
    })
    .join("");

  const plateSelectionHTML = `
    <div class="plate-selection" data-plate="">
      <select class="plate-select" style="width: 100%;">
        <option value="" disabled ${plateData ? "" : "selected"}>+ Add Plate</option>
        ${plateOptions}
      </select>
      <button class="js-remove-plate"><i class="icon-trash"></i></button>
    </div>
  `;

  $(".step-3__inner").prepend(plateSelectionHTML);

  // Инициализация select2 с шаблоном для изображений
  $(".plate-select").select2({
    templateResult: formatOptionWithImage,
    templateSelection: formatOptionWithImage,
    minimumResultsForSearch: -1, // Отключаем поиск
  });

  updatePlateSelectors();
}

function formatOptionWithImage(opt) {
  if (!opt.id) {
    return opt.text;
  }

  var imgUrl = $(opt.element).data("image");
  if (imgUrl) {
    var $opt = $(`<span><img src="${imgUrl}" style="width: 100%; height: 100%;" /> <span class="opt_text">${opt.text}</span></span>`);
    return $opt;
  } else {
    return opt.text;
  }
}

function updatePlateSelectors() {
  $(".plate-select")
    .off("focusin") // Отслеживаем фокус для сохранения предыдущего значения
    .on("focusin", function () {});

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

        $(this).val($(this).parent(".plate-selection").data("prevValue")); // Восстанавливаем предыдущее значение
        return; // Выходим из функции, чтобы не продолжать выполнение
      }

      $(this).parent(".plate-selection").data("prevValue", $(this).val());
      console.log($(this).val());

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
    console.log({ selectedOption });
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
    let plateSelect = $(this);
    let selectedOption = $(this).find("option:selected");
    if (selectedOption.val() === "") {
      console.log("Empty plate selected");
      plateSelect.closest(".plate-selection").remove();
      return;
    }
    let plateHeight = parseInt(selectedOption.data("height")) || 0;
    let plateType = selectedOption.data("type");

    if (plateType === "curved") {
      hasCurvedPlate = true;
    }

    totalHeight += plateHeight;

    // Apply background based on design
    let design = selectedOption.data("design");
    if (design) {
      // $(this).css("background-image", `url('path_to_design_images/${design}.jpg')`);
    }
  });

  $(".total-height").text(totalHeight);

  // Если выбрана curved плита, не добавляем новый селектор
  if (!hasCurvedPlate && $(".plate-select").first().val() !== "" && totalHeight < maxHeight) {
    addPlateSelector(); // Добавляем новый селектор только если последний уже заполнен
  } else {
    $(".plate-select").select2({
      templateResult: formatOptionWithImage,
      templateSelection: formatOptionWithImage,
      minimumResultsForSearch: -1, // Отключаем поиск
    });
  }
}

// Event listener to remove a plate selector
$("body").on("click", ".js-remove-plate", function () {
  console.log("remove");
  $(this).closest(".plate-selection").remove();
  recalculateTotalHeight(); // Пересчитываем общую высоту после удаления селектора

  // Если больше нет селекторов, добавляем пустой
  if ($(".plate-select").length === 0) {
    // addPlateSelector();
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

$(document).ready(function () {
  // Создаем контейнер для отладочной информации
  let debugInfo = $('<div id="debug-info"><h3>Debug Pricing Information</h3></div>');

  // Добавляем цены для плит (plates)
  debugInfo.append("<h4>Plates Prices:</h4>");
  plates.forEach((plate) => {
    debugInfo.append(`<p>${plate.name}: Height ${plate.height}mm, ${plate.isDoubleSided ? "Double-sided" : "Single-sided"}, Design: ${plate.design}, Type: ${plate.type} - Price: ${plate.price}</p>`);
  });

  // Добавляем цены для столбиков (pillars)
  debugInfo.append("<h4>Pillars Prices:</h4>");
  pillars.forEach((pillar) => {
    debugInfo.append(`<p>${pillar.name}: Height ${pillar.height}mm - Price: ${pillar.price}</p>`);
  });

  // Добавляем цены для крыш (fenceCovers)
  debugInfo.append("<h4>Top Covers Prices:</h4>");
  fenceCovers.forEach((cover) => {
    debugInfo.append(`<p>${cover.name}: Design: ${cover.design} - Price: ${cover.price}</p>`);
  });

  // Добавляем цены для цветов плит (platesColors)
  debugInfo.append("<h4>Plates Colors Prices:</h4>");
  platesColors.forEach((color) => {
    debugInfo.append(`<p>${color.name}: Price: ${color.price}</p>`);
  });

  // Добавляем цены для цветов забора (fenceColors)
  debugInfo.append("<h4>Top Cover Colors Prices:</h4>");
  fenceColors.forEach((color) => {
    debugInfo.append(`<p>${color.name}: Price: ${color.price}</p>`);
  });

  // Вставляем контейнер после блока #calc
  $("#calc").after(debugInfo);
});
