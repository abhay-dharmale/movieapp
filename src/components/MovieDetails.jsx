import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { asyncloadmovie, removemovie } from "../store/actions/movieActions";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const MovieDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, []);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.8), rgba(0,0,0,0.9), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original/${info.details.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "70% 30%",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen overflow-y-auto text-zinc-100"
    >
      <nav
        style={{
          background: `linear-gradient(rgba(0,0,0,.1), rgba(0,0,0,0.1), rgba(0,0,0,0.7))`,
        }}
        className="w-full flex h-14 items-center justify-between text-white gap-10 text-md lg:text-xl px-4"
      >
        <Link
          onClick={() => navigate(-1)}
          className="hover: text-[#6556CD] text-2xl lg:text-md font-bold lg:font-normal ri-arrow-left-line"
        ></Link>
        <div className="flex gap-5 lg:gap-10 mr-0 lg:mr-[10vw]">
          <a target="_blank" href={info.details.homepage}>
            <i className="ri-external-link-fill"></i>
          </a>
          <a
            target="_blank"
            href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          >
            <i className="ri-earth-fill"></i>
          </a>
          <a
            target="_blank"
            href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
          >
            imdb
          </a>
        </div>
      </nav>

      <div className="w-full py-8 px-4 lg:px-8">
        <div className="w-full flex flex-col lg:flex-row">
          <div className="">
            <img
              className="shadow-[8px_17px_38px 2px rgba(0,0,0,.5)] h-[60vh] w-full lg:w-[30vw] rounded-md object-cover"
              src={`https://image.tmdb.org/t/p/original/${
                info.details.poster_path || info.details.backdrop_path
              }`}
              alt=""
            />
            <div>
              {info.watchprovider && info.watchprovider.flatrate && (
                <div className="w-full mt-5">
                  <div>
                    <h1>Watch it On </h1>
                  </div>
                  <div className="w-full flex gap-3 items-center mt-1">
                    {info.watchprovider.flatrate.map((w, i) => (
                      <img
                        title={w.provider_name}
                        className="w-[7vh] h-[7vh] object-cover rounded-md"
                        key={i}
                        src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                        alt=""
                      />
                    ))}
                  </div>
                </div>
              )}

              {info.watchprovider && info.watchprovider.rent && (
                <div className="w-full mt-5">
                  <div>
                    <h1>Available on rent </h1>
                  </div>
                  <div className="w-full flex gap-3 items-center mt-1">
                    {info.watchprovider.rent.map((w, i) => (
                      <img
                        title={w.provider_name}
                        className="w-[7vh] h-[7vh] object-cover rounded-md"
                        key={i}
                        src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                        alt=""
                      />
                    ))}
                  </div>
                </div>
              )}

              {info.watchprovider && info.watchprovider.buy && (
                <div className="w-full mt-5">
                  <div>
                    <h1>Available to Buy on </h1>
                  </div>
                  <div className="w-full flex gap-3 items-center mt-1">
                    {info.watchprovider.buy.map((w, i) => (
                      <img
                        title={w.provider_name}
                        className="w-[7vh] h-[7vh] object-cover rounded-md"
                        key={i}
                        src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                        alt=""
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-full h-fit ml-0 mt-[7vh] lg:mt-0 lg:ml-10 relative">
            <h1 className="text-2xl lg:text-4xl font-semibold lg:font-extrabold text-white line-clamp-2">
              {info.details.name ||
                info.details.original_title ||
                info.details.original_name ||
                info.details.title}

              <span className="text-sm lg:text-lg font-bold text-zinc-200">
                {" "}
                ({info.details.release_date.split("-")[0]})
              </span>
            </h1>
            <div className=" lg:h-[70vh]">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-x-3 mt-2">
                <div>
                  <span className="h-10 w-10 lg:h-10 lg:w-10 bg-yellow-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {(info.details.vote_average * 10).toFixed()}
                    <sup>%</sup>
                  </span>
                  <h1 className="text-xs lg:text-sm text-zinc-200 my-2 lg:my-0">
                    {info.details.release_date}
                  </h1>
                </div>
                <div>
                  <h1 className="text-sm text-zinc-200">
                    <span className="text-blue-500">Genres: </span>
                    {info.details.genres.map((g) => g.name).join(", ")}
                  </h1>
                  <h1 className="text-yellow-600 text-sm mt-2 lg:mt-0">
                    <span className="inline-block lg:hidden text-white">
                      Runtime:
                    </span>{" "}
                    {info.details.runtime} min
                  </h1>
                </div>
              </div>
              <h1 className="text-2xl font-semibold italic text-zinc-200 mt-3">
                {info.details.tagline}
              </h1>
              <h1 className="text-2x1 mb-1 mt-4 font-semibold">Overview :</h1>
              <p className="text-sm">{info.details.overview}</p>

              <h1 className="text-2x1 mb-3 mt-5">Available in Languages</h1>
              <p className="text-xs mb-7">{info.translations.join(", ")}</p>

              <Link
                to={`${pathname}/trailer`}
                className="px-5 py-3 lg:py-2 bg-[#6e61c7] rounded text-white text-md md:text-md hover:bg-[#473c91] font-semibold transition-all"
              >
                Play Trailer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;