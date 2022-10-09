const simpan = () => {
  const simpanBuku = {
    id: Date.now(),
    judul: document.getElementById("judul").value,
    author: document.getElementById("author").value,
    year: document.getElementById("year").value,
    finished: document.querySelector('#finished').checked,
  }
  console.log(simpanBuku)
  if (localStorage.length > 0) {
    let allBook = JSON.parse(localStorage.getItem("allBook"));
    allBook.push(simpanBuku);
    localStorage.setItem("allBook", JSON.stringify(allBook));
  } else {
    const allBook = [simpanBuku];
    localStorage.setItem("allBook", JSON.stringify(allBook));
  }
  document.getElementById("add").reset();
  unfinish("");
  finish("");
};

const search = () => {
  const judul = document.getElementById("search").value;
  const allBook = JSON.parse(localStorage.getItem("allBook"));
  let result = [];
  if (allBook.length > 0) {
    document.getElementById("resultSearch").innerText= '';
    allBook.forEach((item, idx) => {
      if ((item.judul).toLowerCase().includes(judul.toLowerCase())) {
        result.push(allBook[idx]);
      }
    })
  } else {
    let h4 = document.createElement("h4");
    h4.innerText = 'DATABASE KOSONG';
  }
  document.getElementById("search").value = '';
  unfinish(result);
  finish(result);
};

const finishRead = (id) => {
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
  document.getElementById("listUnfinish").innerText = '';
  const allBook = data === "" ? JSON.parse(localStorage.getItem("allBook")) : data;
  console.log(allBook);
  let unfinishBook = [];
  if (allBook.length > 0) {
    allBook.forEach((item, idx) => {
      if (item.finished === false) {
        unfinishBook.push(allBook[idx]);
        document.getElementById("listUnfinish").insertAdjacentHTML('beforeend', `<div class="box-list container">
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
  document.getElementById("listFinish").innerText = '';
  const allBook = data === "" ? JSON.parse(localStorage.getItem("allBook")) : data;
  let finishBook = [];
  if (allBook.length > 0) {
    allBook.forEach((item, idx) => {
      if (item.finished === true) {
        finishBook.push(allBook[idx]);
        document.getElementById("listFinish").insertAdjacentHTML('beforeend', `<div class="box-list container">
        <h5>${item.judul}</h5>
        <p>Penulis: ${item.author}</p>
        <p>Tahun: ${item.year}</p>
        <div class="row align-items-center">
          
            <button type="button" class="btn-success" idx="${item.id}" onClick="unfinishRead(this.getAttribute('idx'))">Belum Selesai Dibaca</button>
            <button type="button" class="btn-danger" idx="${item.id}" onClick="remove(this.getAttribute('idx'))">Hapus Buku</button>
          
        </div>
        </div>
      </div>`);
      }
    })
  }
  console.log("finishBook:", finishBook);
}