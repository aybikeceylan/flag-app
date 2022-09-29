const select = document.querySelector(".form-select");
// console.log(select)

const url = `https://restcountries.com/v3.1/all`;
fetch(url)
  .then((res) => {
    if (!res.ok) {
      renderError(`Something went wrong: ${res.status}`);
      throw new Error();
    }
    return res.json();
  })
  .then((data) => renderCountries(data))
  .catch((err) => console.log(err));

const renderError = () => {
  const countryDiv = document.querySelector(".countries");
  countryDiv.innerHTML += `
    <h2>Countries can not fetched</h2>
    <img src="./img/404.png" alt="" />
  `;
};


const renderCountries = (data) => {
  console.log(data);
  data.map((item) => {
    const { name: { common } } = item
    // console.log(common);
    select.innerHTML += `
    <option style="width: 300px">${common}</option>`;
  })
  select.addEventListener("change", (e) => {
    data.filter((data) => {
      const {
        capital,
        currencies,
        flags: { svg },
        languages,
        name: { common },
        region }
        = data;
      // console.log(svg);
      // console.log(capital)
      // console.log(currencies);
      // console.log(languages)
      // console.log(common)
      // console.log(region);
      if (common == e.target.value) {
        const countryDiv = document.querySelector(".flags");
        countryDiv.innerHTML = `
        <div class="card mx-auto m-3 shadow-lg" style="width: 18rem;">
          <img src="${svg}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${common}</h5>
            <p class="card-text">${region}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <i class="fas fa-lg fa-landmark"></i> ${capital}
            </li>
            <li class="list-group-item">
              <i class="fas fa-lg fa-comments"></i> ${Object.values(languages)}
            </li>
            <li class="list-group-item">
              <i class="fas fa-lg fa-money-bill-wave"></i>
              ${Object.values(currencies).map((item) => Object.values(item) + " ")}
           </li>
          </ul>
        </div>
      `;

      }

    })

  })


}

