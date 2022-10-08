$('#simpan').click(() => {
  // alert("Click Simpan");
  const simpanBuku = {
    id: Date.now(),
    judul: $('#judul').val(),
    author: $('#author').val(),
    year: $('#year').val(),
    finished: $('#finished').val()
  }
  console.log(simpanBuku)
  if (localStorage.length > 0) {
    let allBook = localStorage.getItem("allBook", allBook);
    allBook.push(simpanBuku);
    localStorage.setItem("allBook", allBook);
  } else {
    const allBook = [simpanBuku];
    localStorage.setItem("allBook", allBook);
  }
  unfinish();
  finish();
});

const unfinish = () => {
  const allBook = localStorage.getItem("allBook", allBook);
    
}

const finish = () => {
}