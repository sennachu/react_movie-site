import Navbar from "./components/Navbar";// Navbar bileşenini içeri aktarıyoruz
import React, { useEffect, useState } from 'react'; // React ve gerekli hooks'ları içeri aktarıyoruz
import './style/Videos.css'; // CSS dosyasını içeri aktarıyoruz
import "./style/card.css"; // CSS dosyasını içeri aktarıyoruz
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";  // Yükleme göstergesi için Skeleton bileşenini içeri aktarıyoruz


const ProtectedPage = () => {

  const [MovieList, setMovieList] = useState([]) // Filmlerin listesini ve durumunu tutacak state'i tanımlıyoruz
  const [searchParam, setSearchParam] = useState(""); // Arama parametresini tutacak state'i tanımlıyoruz

  const handleSearch = (e) => {//Bu fonksiyon, arama çubuğuna girilen değeri yakalar ve searchParam adlı state'i günceller.
    //e.target.value ile kullanıcının arama çubuğuna girdiği değeri alır ve setSearchParam ile searchParam state'ini günceller.
    e.preventDefault();
    setSearchParam(e.target.value);
  };

  const handleClick = () => {
    alert("Favorilere eklendi")
  } // Bu fonksiyon, bir filme tıklandığında tetiklenir ve bir bildirim penceresiyle "Favorilere eklendi" uyarısı gösterir.

  // TODO: Use .env for secret protection
  const getMovie = ()=>{ //Bu fonksiyon, popüler filmleri almak için MovieDB API'sini kullanır.
    //fetch ile MovieDB API'sinden popüler filmleri getirir.
    //Gelen veriyi JSON'a dönüştürür ve setMovieList ile MovieList state'ini günceller.
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=652d7557737c971359605b6e2080fac2")
    .then(res => res.json())
    .then (json => setMovieList(json.results))
  }

  const getSearchMovie = ()=>{//Bu fonksiyon, kullanıcının arama kutusuna girdiği terime göre film araması yapar.
    //fetch ile MovieDB API'sine kullanıcının arama terimini gönderir ve ilgili filmleri getirir.
    //Gelen veriyi JSON'a dönüştürür ve setMovieList ile MovieList state'ini günceller.
    fetch(`https://api.themoviedb.org/3/search/movie?query=${searchParam}&api_key=652d7557737c971359605b6e2080fac2`)
    .then(res => res.json())
    .then (json => setMovieList(json.results))
  }
  
  useEffect(()=>{//Bu hook, bileşenin her render edilmesinden sonra çalışır. searchParam state'i izlenir ve bu değer değiştiğinde (yani arama yapıldığında),  getSearchMovie veya getMovie fonksiyonları çalışır.
    searchParam === "" ? getMovie() : getSearchMovie()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[searchParam]);
  
  return (
  //Navbar bileşeni, searchParam ve handleSearch props'larıyla kullanılır.
  //MovieList içindeki her bir film için bir kart oluşturulur ve yükleme göstergesi (Skeleton) ve film kartı (cards) gösterilir.
  //Her bir film için filmin resmi, başlığı, çıkış tarihi, IMDB puanı ve kısa açıklaması yer alır.
  //Film başlığı, uzunluğuna bağlı olarak farklı bir stile sahip olabilir (id={movie.title.length > 28 ? 'smaller-Text' : 'yazi'}) length 28'den büyükse yazıyı küçült gibi.
    <>
      <Navbar searchParam={searchParam} handleSearch={handleSearch} />
      <div className='movies-container'>
      
      {MovieList.map((movie) => {
        return(
          <>

        <div className="cards">
            <SkeletonTheme color="#202020" highlightColor="#444">
                <Skeleton height={300} duration={2} />
            </SkeletonTheme>
        </div>
        <div id='container'>
            <div className="cards">
                <img onClick={handleClick} className="cards__img" src={`https://image.tmdb.org/t/p/original${movie?movie.poster_path:""}`} alt=""/>
                <div className="cards__overlay">
                    <div className="card__title">{movie?movie.original_title:""}</div>
                    <div className="card__runtime">
                      Çıkış Tarihi: {movie?movie.release_date:""}
                      <span className="card__rating">IMDB Puanı:{movie?movie.vote_average:""}<i className="fas fa-star" /></span>
                    </div>
                    <div className="card__description">{movie ? movie.overview.slice(0,118)+"..." : ""}</div>
                </div>
            </div>
            <h3 id={movie.title.length > 28 ? 'smaller-Text': 'yazi'}>{movie.title}</h3>
            </div>

          </>
        )
      })}
      </div>
    </>
  )  
}
export default ProtectedPage