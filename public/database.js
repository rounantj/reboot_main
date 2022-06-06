getPeoples()
async function request(textSQL) {
  return await $.ajax({
    type: 'POST',
    //url: 'http://localhost:9090/query2',
    url: '/query',
    data: { querySQL: textSQL },

    success: function (data) {
      console.log(textSQL)
      console.log(data)
    },
    error: function (data) {
      console.log(data)
    },
    complete: function () {
      // ao final da requisição...
    },
  })
}

function getPeoples() {
  $.ajax({
    type: 'POST',
    //url: 'http://localhost:9090/query2',
    url: '/query',
    data: { querySQL: 'select * from pessoas2 order by registro asc' },

    success: function (data) {
      console.log(data)
      showPeoples(data)
      localStorage.PEOPLES = JSON.stringify(data)
    },
    error: function (data) {
      console.log(data)
    },
    complete: function () {},
  })
}

function createPeople(people) {
  request(
    `insert into pessoas2 (registro, nome, cargo, time, ferro, aluminio, molas, foto) values (
            '${people.registro}',
            '${people.nome}', 
            '${people.cargo}', 
            '${people.time}',         
            '${JSON.stringify({
              seg: false,
              ter: false,
              qua: false,
              qui: false,
              sex: false,
              sab: false,
              dom: false,
            })}',
            '${JSON.stringify({
              seg: false,
              ter: false,
              qua: false,
              qui: false,
              sex: false,
              sab: false,
              dom: false,
            })}',
            '${JSON.stringify({
              seg: false,
              ter: false,
              qua: false,
              qui: false,
              sex: false,
              sab: false,
              dom: false,
            })}',
            '${people.foto}'
           )`
  )
  setTimeout(() => {
    location.reload()
  }, 1000)
}
function atualizaPessoa(elemento) {
  let reg = elemento.attr('registro')
  let peoples = JSON.parse(localStorage.PEOPLES)
  let thisPeople = null
  for (const k in peoples) {
    if (peoples[k].registro == reg) {
      thisPeople = peoples[k]
    }
  }
  console.log('a pessoa', thisPeople)

  thisPeople.nome = $('#nome').val()
  thisPeople.cargo = $('#cargo').val()
  thisPeople.time = $('#time').val()
  thisPeople.foto = $('#foto').val()

  updatePeople(thisPeople)
}

function updatePeople(people) {
  console.log(people)
  let query = `update pessoas2 set nome ='${people.nome}',cargo ='${
    people.cargo
  }',foto ='${people.foto}',time ='${people.time}',ferro ='${JSON.stringify(
    people.ferro
  )}',aluminio ='${JSON.stringify(people.aluminio)}',molas ='${JSON.stringify(
    people.molas
  )}' where registro = ${JSON.stringify(people.registro)} `
  console.log(query)
  request(query)

  setTimeout(() => {
    location.reload()
  }, 1000)
}

function showPeoples(data) {
  for (const k in data) {
    var ferro = JSON.parse(data[k].ferro)
    var aluminio = JSON.parse(data[k].aluminio)
    var molas = JSON.parse(data[k].molas)

    try {
      console.log('molas', molas)
      console.log('aluminio', aluminio)
      console.log('ferro', ferro)
      ferro = JSON.parse(ferro)
      aluminio = JSON.parse(aluminio)
      molas = JSON.parse(molas)

      var html = `
        <tr class="busca">
                <td>
                  <div class="d-flex align-items-center">
                    <img src="${data[k].foto}" class="rounded-circle" alt=""
                      style="width: 45px; height: 45px" />
                    <div class="ms-3">
                      <p class="fw-bold mb-1">${data[k].nome}</p>
                      <p class="text-muted mb-0">Registro: ${
                        data[k].registro
                      }</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p class="fw-normal mb-1">CARGO (${data[k].cargo})</p>
                  <p class="text-muted mb-0">Time (${data[k].time})</p>
                </td>
             
                <td>
                  <table class="table table-striped">
                    <thead>
                      <th>Item</th>
                      <th>Seg</th>
                      <th>ter</th>
                      <th>qua</th>
                      <th>qui</th>
                      <th>sex</th>
                      <th>sab</th>
                      <th>dom</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="titulo">
                          Molas
                        </td>
                        <td>
                          <input item="molas" onchange="changeMe($(this))" ${
                            molas.seg ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="seg" id="seg" class=" dia molas">
                        </td>
                        <td>
                          <input item="molas" onchange="changeMe($(this))" ${
                            molas.ter ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="ter" id="ter" class=" dia molas">
                        </td>
                        <td>
                          <input item="molas" onchange="changeMe($(this))" ${
                            molas.qua ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="qua" id="qua" class=" dia molas">
                        </td>
                        <td>
                          <input item="molas" onchange="changeMe($(this))" ${
                            molas.qui ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="qui" id="qui" class=" dia molas">
                        </td>
                        <td>
                          <input item="molas" onchange="changeMe($(this))" ${
                            molas.sex ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="sex" id="sex" class=" dia molas">
                        </td>
                        <td>
                          <input item="molas" onchange="changeMe($(this))" ${
                            molas.sab ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="sab" id="sab" class=" dia molas">
                        </td>
                        <td>
                          <input item="molas" onchange="changeMe($(this))" ${
                            molas.dom ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="dom" id="dom" class=" dia molas">
                        </td>
                      </tr>
                      <tr class="aluminio">
                        <td class="titulo">
                          Alumínio
                        </td>
                        <td>
                          <input item="aluminio" onchange="changeMe($(this))" ${
                            aluminio.seg ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="seg" id="seg" class=" dia aluminio">
                        </td>
                        <td>
                          <input item="aluminio" onchange="changeMe($(this))" ${
                            aluminio.ter ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="ter" id="ter" class=" dia aluminio">
                        </td>
                        <td>
                          <input item="aluminio" onchange="changeMe($(this))" ${
                            aluminio.qua ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="qua" id="qua" class=" dia aluminio">
                        </td>
                        <td>
                          <input item="aluminio" onchange="changeMe($(this))" onchange="changeMe($(this))" ${
                            aluminio.qui ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="qui" id="qui" class=" dia aluminio">
                        </td>
                        <td>
                          <input item="aluminio" onchange="changeMe($(this))" ${
                            aluminio.sex ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="sex" id="sex" class=" dia aluminio">
                        </td>
                        <td>
                          <input item="aluminio" onchange="changeMe($(this))" ${
                            aluminio.sab ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="sab" id="sab" class=" dia aluminio">
                        </td>
                        <td>
                          <input item="aluminio" onchange="changeMe($(this))" ${
                            aluminio.dom ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="dom" id="dom" class=" dia aluminio">
                        </td>
                      </tr>
                      <tr>
                        <td class="titulo">
                          Ferro
                        </td>
                        <td>
                          <input item="ferro" onchange="changeMe($(this))" ${
                            ferro.seg ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="seg" id="seg" class=" dia ferro">
                        </td>
                        <td>
                          <input item="ferro" onchange="changeMe($(this))" ${
                            ferro.ter ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="ter" id="ter" class=" dia ferro">
                        </td>
                        <td>
                          <input item="ferro" onchange="changeMe($(this))" ${
                            ferro.qua ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="qua" id="qua" class=" dia ferro">
                        </td>
                        <td>
                          <input item="ferro" onchange="changeMe($(this))" ${
                            ferro.qui ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="qui" id="qui" class=" dia ferro">
                        </td>
                        <td>
                          <input item="ferro" onchange="changeMe($(this))" ${
                            ferro.sex ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="sex" id="sex" class=" dia ferro">
                        </td>
                        <td>
                          <input item="ferro" onchange="changeMe($(this))" ${
                            ferro.sab ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="sab" id="sab" class=" dia ferro">
                        </td>
                        <td>
                          <input item="ferro" onchange="changeMe($(this))" onchange="changeMe($(this))" ${
                            ferro.dom ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="dom" id="dom" class=" dia ferro">
                        </td>
                      </tr>
  
                    </tbody>
  
                  </table>
                </td>
                <td>
                  <button registro="${
                    data[k].registro
                  }" style="    min-height: 100px;
      border-radius: 10px;" onclick="editPeople($(this))" type="button" class="btn btn-default btn-action btn-rounded btn-sm fw-bold" data-mdb-ripple-color="dark">
                    Editar Pessoa
                  </button>
                   <button registro="${
                     data[k].registro
                   }" style="    min-height: 100px;
                  border-radius: 10px;" onclick="modalConfirma($(this))" type="button" class="btn btn-danger btn-action btn-rounded btn-sm fw-bold" data-mdb-ripple-color="dark">
                                Demitir Pessoa
                              </button>
                </td>
              </tr>
        `
      $('.listaPessoas').append(html)
    } catch (er) {
      console.log('molas', molas)
      console.log('aluminio', aluminio)
      console.log('ferro', ferro)

      var html = `
        <tr>
                <td>
                  <div class="d-flex align-items-center">
                    <img src="${data[k].foto}" class="rounded-circle" alt=""
                      style="width: 45px; height: 45px" />
                    <div class="ms-3">
                      <p class="fw-bold mb-1">${data[k].nome}</p>
                      <p class="text-muted mb-0">Registro: ${
                        data[k].registro
                      }</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p class="fw-normal mb-1">CARGO (${data[k].cargo})</p>
                  <p class="text-muted mb-0">Time (${data[k].time})</p>
                </td>
             
                <td>
                  <table class="table table-striped">
                    <thead>
                      <th>Item</th>
                      <th>Seg</th>
                      <th>ter</th>
                      <th>qua</th>
                      <th>qui</th>
                      <th>sex</th>
                      <th>sab</th>
                      <th>dom</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="titulo">
                          Molas
                        </td>
                        <td>
                          <input item="molas" onchange="changeMe($(this))" ${
                            molas.seg ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="seg" id="seg" class=" dia molas">
                        </td>
                        <td>
                          <input item="molas" onchange="changeMe($(this))" ${
                            molas.ter ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="ter" id="ter" class=" dia molas">
                        </td>
                        <td>
                          <input item="molas" onchange="changeMe($(this))" ${
                            molas.qua ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="qua" id="qua" class=" dia molas">
                        </td>
                        <td>
                          <input item="molas" onchange="changeMe($(this))" ${
                            molas.qui ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="qui" id="qui" class=" dia molas">
                        </td>
                        <td>
                          <input item="molas" onchange="changeMe($(this))" ${
                            molas.sex ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="sex" id="sex" class=" dia molas">
                        </td>
                        <td>
                          <input item="molas" onchange="changeMe($(this))" ${
                            molas.sab ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="sab" id="sab" class=" dia molas">
                        </td>
                        <td>
                          <input item="molas" onchange="changeMe($(this))" ${
                            molas.dom ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="dom" id="dom" class=" dia molas">
                        </td>
                      </tr>
                      <tr class="aluminio">
                        <td class="titulo">
                          Alumínio
                        </td>
                        <td>
                          <input item="aluminio" onchange="changeMe($(this))" ${
                            aluminio.seg ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="seg" id="seg" class=" dia aluminio">
                        </td>
                        <td>
                          <input item="aluminio" onchange="changeMe($(this))" ${
                            aluminio.ter ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="ter" id="ter" class=" dia aluminio">
                        </td>
                        <td>
                          <input item="aluminio" onchange="changeMe($(this))" ${
                            aluminio.qua ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="qua" id="qua" class=" dia aluminio">
                        </td>
                        <td>
                          <input item="aluminio" onchange="changeMe($(this))" onchange="changeMe($(this))" ${
                            aluminio.qui ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="qui" id="qui" class=" dia aluminio">
                        </td>
                        <td>
                          <input item="aluminio" onchange="changeMe($(this))" ${
                            aluminio.sex ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="sex" id="sex" class=" dia aluminio">
                        </td>
                        <td>
                          <input item="aluminio" onchange="changeMe($(this))" ${
                            aluminio.sab ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="sab" id="sab" class=" dia aluminio">
                        </td>
                        <td>
                          <input item="aluminio" onchange="changeMe($(this))" ${
                            aluminio.dom ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="dom" id="dom" class=" dia aluminio">
                        </td>
                      </tr>
                      <tr>
                        <td class="titulo">
                          Ferro
                        </td>
                        <td>
                          <input item="ferro" onchange="changeMe($(this))" ${
                            ferro.seg ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="seg" id="seg" class=" dia ferro">
                        </td>
                        <td>
                          <input item="ferro" onchange="changeMe($(this))" ${
                            ferro.ter ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="ter" id="ter" class=" dia ferro">
                        </td>
                        <td>
                          <input item="ferro" onchange="changeMe($(this))" ${
                            ferro.qua ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="qua" id="qua" class=" dia ferro">
                        </td>
                        <td>
                          <input item="ferro" onchange="changeMe($(this))" ${
                            ferro.qui ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="qui" id="qui" class=" dia ferro">
                        </td>
                        <td>
                          <input item="ferro" onchange="changeMe($(this))" ${
                            ferro.sex ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="sex" id="sex" class=" dia ferro">
                        </td>
                        <td>
                          <input item="ferro" onchange="changeMe($(this))" ${
                            ferro.sab ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="sab" id="sab" class=" dia ferro">
                        </td>
                        <td>
                          <input item="ferro" onchange="changeMe($(this))" onchange="changeMe($(this))" ${
                            ferro.dom ? 'checked="true"' : ''
                          } registro="${
        data[k].registro
      }" type="checkbox" name="dom" id="dom" class=" dia ferro">
                        </td>
                      </tr>
  
                    </tbody>
  
                  </table>
                </td>
                <td>
                  <button registro="${
                    data[k].registro
                  }" style="    min-height: 100px;
      border-radius: 10px;" onclick="editPeople($(this))" type="button" class="btn btn-default btn-action btn-rounded btn-sm fw-bold" data-mdb-ripple-color="dark">
                    Editar Pessoa
                  </button>
                  <hr>
              
                  <button registro="${
                    data[k].registro
                  }" style="    min-height: 100px;
                  border-radius: 10px;" onclick="modalConfirma($(this))" type="button" class="btn btn-danger btn-action btn-rounded btn-sm fw-bold" data-mdb-ripple-color="dark">
                                Demitir Pessoa
                              </button>
                </td>
              </tr>
        `
      $('.listaPessoas').append(html)
    }
  }
}
function modalConfirma(element) {
  $('modalConfirma').find('button').attr('registro', element.attr('registro'))
  $('modalConfirma').slideToggle()
}
function demiPeople(element) {
  if (element.attr('registro') != '') {
    request(
      `delete from pessoas2 where registro = '${element.attr('registro')}'`
    )
    setTimeout(() => {
      location.reload()
    }, 1000)
  }
}

function editPeople(element) {
  let peoples = JSON.parse(localStorage.PEOPLES)
  console.log(peoples)
  let thisPeople = null
  let registro = element.attr('registro')
  for (const k in peoples) {
    if (registro == peoples[k].registro) {
      thisPeople = peoples[k]
    }
  }
  for (const k in thisPeople) {
    $('#' + k).val(thisPeople[k])
  }

  console.log(thisPeople)
  $('#registroButton').attr('registro', thisPeople.registro)
  $('modal').slideToggle()
}
