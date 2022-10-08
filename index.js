$('#simpan').click(() => {
  // alert("Click Simpan");
  // localStorage.clear();
  // console.log(localStorage);
  const simpanBuku = {
    id: Date.now(),
    judul: $('#judul').val(),
    author: $('#author').val(),
    year: $('#year').val(),
    finished: $('#finished').is(':checked')
  }
  console.log(simpanBuku)
  if (localStorage.length > 0) {
    console.log("Masuk 1");
    let allBook = JSON.parse(localStorage.getItem("allBook"));
    console.log("Check:", allBook);
    allBook.push(simpanBuku);
    localStorage.setItem("allBook", JSON.stringify(allBook));
    console.log("Ada:", localStorage.getItem("allBook"));
  } else {
    console.log("Masuk 2");
    const allBook = [simpanBuku];
    localStorage.setItem("allBook", JSON.stringify(allBook));
    console.log("Baru:", localStorage.getItem("allBook"));
  }
  document.getElementById("add").reset();
  unfinish("");
  finish("");
});

$('#btnSearch').click(() => {
  const judul = $('#search').val();
  const allBook = JSON.parse(localStorage.getItem("allBook"));
  console.log("Check search:", allBook)
  let result = [];
  if (allBook.length > 0) {
    allBook.forEach((item, idx) => {
      if ((item.judul).toLowerCase().includes(judul.toLowerCase())) {
        result.push(allBook[idx]);
      }
    })
  } else {
    $('#resultSearch').html('<h4 class="text-center title">DATABASE KOSONG</h4>')
  }
  $('#search').val('');
  unfinish(result);
  finish(result);
});

const finishRead = (id) => {
  console.log("id finishRead:", id);
  const allBook = JSON.parse(localStorage.getItem("allBook"));
  allBook.forEach((item, idx) => {
    if ((item.id).toString() === id) {
      allBook[idx].finished = true;
    }
  });
  localStorage.setItem("allBook", JSON.stringify(allBook));
  unfinish(allBook);
  finish(allBook);
}

const unfinishRead = (id) => {
  console.log("id unFinishRead:", id);
  const allBook = JSON.parse(localStorage.getItem("allBook"));
  allBook.forEach((item, idx) => {
    if ((item.id).toString() === id) {
      allBook[idx].finished = false;
    }
  });
  localStorage.setItem("allBook", JSON.stringify(allBook));
  unfinish(allBook);
  finish(allBook);
}

const remove = (id) => {
  const allBook = JSON.parse(localStorage.getItem("allBook"));
  const filter = allBook.filter(item => (item.id).toString() !== id);
  localStorage.setItem("allBook", JSON.stringify(filter));
  unfinish(filter);
  finish(filter);
}

const unfinish = (data) => {
  $("#listUnfinish").text('');
  const allBook = data === "" ? JSON.parse(localStorage.getItem("allBook")) : data;
  console.log(allBook);
  let unfinishBook = [];
  if (allBook.length > 0) {
    allBook.forEach((item, idx) => {
      if (item.finished === false) {
        unfinishBook.push(allBook[idx]);
        $("#listUnfinish").append(`<div class="box-list container">
        <h5>${item.judul}</h5>
        <p>Penulis: ${item.author}</p>
        <p>Tahun: ${item.year}</p>
        <div class="row align-items-center">
          <div class="col">
            <button type="button" class="btn btn-success btn-sm" idx="${item.id}" onClick="finishRead(this.getAttribute('idx'))">Selesai Dibaca</button>
            <button type="button" class="btn btn-danger btn-sm" idx="${item.id}" onClick="remove(this.getAttribute('idx'))">Hapus Buku</button>
          </div>    
        </div>
        </div>
      </div>`);
      }
    })
  }
  console.log("unfinishBook:", unfinishBook);
}

const finish = (data) => {
  $("#listFinish").text('');
  const allBook = data === "" ? JSON.parse(localStorage.getItem("allBook")) : data;
  let finishBook = [];
  if (allBook.length > 0) {
    allBook.forEach((item, idx) => {
      if (item.finished === true) {
        finishBook.push(allBook[idx]);
        $("#listFinish").append(`<div class="box-list container">
        <h5>${item.judul}</h5>
        <p>Penulis: ${item.author}</p>
        <p>Tahun: ${item.year}</p>
        <div class="row align-items-center">
          <div class="col">
            <button type="button" class="btn btn-success btn-sm" idx="${item.id}" onClick="unfinishRead(this.getAttribute('idx'))">Belum Selesai Dibaca</button>
            <button type="button" class="btn btn-danger btn-sm" idx="${item.id}" onClick="remove(this.getAttribute('idx'))">Hapus Buku</button>
          </div>    
        </div>
        </div>
      </div>`);
      }
    })
  }
  console.log("finishBook:", finishBook);
}