import { useState } from "react";

function App() {
  const [location, setLocation] = useState();
  const [hospital, setHospital] = useState();
  const [locationloading, setlocationLoading] = useState(false);
  const [hospitalloading, sethospitalLoading] = useState(false);

  const detectNow = async () => {
    try {
      setLocation(null);
      setHospital(null);
      setlocationLoading(true);
      const res1 = await fetch(import.meta.env.VITE_LOCATION_SOURCE);
      const locationn = await res1.json();
      setlocationLoading(false);
      setLocation(locationn);

      sethospitalLoading(true);
      const res2 = await fetch(import.meta.env.VITE_HOSPITAL_SOURCE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          latitude: locationn.latitude,
          longitude: locationn.longitude
        })
      });
      const hospitalData = await res2.json();
      sethospitalLoading(false);
      setHospital(hospitalData);
      console.log(hospitalData);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="w-screen h-screen overflow-hidden">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <img src="/Images/phone.png" className="w-150 hidden sm:block"/>
          <div className="absolute hidden sm:block">
            <div className="flex flex-col justify-center items-center">
              <h1 className="font-heavy-garet text-[40px]">
                  <span className="text-[#19141A]">CITY</span>
                  <span className="text-[#19141A]">AID</span>
              </h1>
              <h1 className="text-[13px] mt-5 font-bold text-[#19141A]">PHONE COMPATIBLE ONLY</h1>
            </div>
          </div>
          <div className="w-80 flex flex-col justify-center items-center sm:hidden">
            <div className="flex justify-center items-center">
              <img src="/Images/logo.png" className="w-10 mr-0.5" />
              <h1 className="font-heavy-garet text-6xl">
                <span className="text-light-red">CITY</span>
                <span className="text-mid-red">AID</span>
              </h1>
            </div>
            <div className="font-bold text-[10px]">
              <p>
                <span className="text-light-red">Your City,</span>{" "}
                <span className="text-mid-red">Your Hospital,</span>{" "}
                <span className="text-dark-red">One Click</span>
              </p>
            </div>
            <div className="mt-10 flex justify-center items-center">
              <div
                className={`h-4 w-4 rounded-full ${!location ? "bg-red-500" : "bg-green-500"} border border-black`}
              ></div>
              <h3 className="ml-2 font-bold text-xs text-gray-200">
                City Detected
              </h3>
            </div>
            <div className="mt-5">
              <p
                className={`text-[10px] font-light text-gray-200 ${locationloading && "hidden"}`}
              >
                {!location
                  ? "Offline"
                  : `${location.city}, ${location.region}, ${location.country}`}
              </p>
              {locationloading && (
                <div className="w-10 h-10 border-10 border-red-500 border-dashed rounded-full animate-spin"></div>
              )}
            </div>
            {hospital && (
              <div className="w-76 mt-9 text-xs font-bold text-gray-300">
                <h1> {`Hospital: ${hospital.length}`}</h1>
              </div>
            )}
            {hospitalloading && (
              <div className="w-10 h-10 border-10 border-red-500 border-dashed rounded-full animate-spin mt-9"></div>
            )}
            <div
              className={`w-76 h-[30vh] mt-2 overflow-x-hidden overflow-y-scroll no-scrollbar ${!hospital ? "hidden" : "block"}`}
            >
              {hospital &&
                hospital.map((hospitals, index) => (
                  <div
                    className={`w-full h-16 rounded-lg bg-hospital-rows flex justify-between items-center ${index > 0 ? "mt-3" : ""}`}
                    key={index}
                  >
                    <div className="ml-3 w-53 h-full flex flex-col items-start justify-evenly">
                      <div className="h-4 overflow-hidden">
                        <h1 className="text-[9px]">
                          <span className="font-bold">Hospital Name: </span>
                          <span>{hospitals.tags.name}</span>
                        </h1>
                      </div>
                      <div className="h-4 overflow-hidden">
                        <h1 className="text-[9px]">
                          <span className="font-bold">Hospital Number: </span>
                          {!hospitals.tags["contact:phone"] &&
                            !hospitals.tags.phone && (
                              <span className="text-yellow-300 font-bold italic">
                                Not Available
                              </span>
                            )}
                          {!hospitals.tags["contact:phone"] &&
                          hospitals.tags.phone
                            ? hospitals.tags.phone
                            : hospitals.tags["contact:phone"]}{" "}
                          {hospitals.tags["contact:phone"] &&
                          !hospitals.tags.phone
                            ? hospitals.tags["contact:phone"]
                            : hospitals.tags.phone}
                        </h1>
                      </div>
                    </div>
                    <a href={!hospitals.tags["contact:phone"] && hospitals.tags.phone ? "tel:" + String(hospitals.tags.phone) : "tel:" + String(hospitals.tags["contact:phone"])} className={`${!hospitals.tags.phone && !hospitals.tags["contact:phone"] ? "hidden" : "block"}`}>
                      <button
                        className={`w-12 h-12 mr-3 bg-green-500 rounded-md cursor-pointer flex justify-center items-center hover:bg-green-600 transition-colors duration-200 ease-out ${hospitals.tags.phone || hospitals.tags["contact:phone"] ? "opacity-100" : "opacity-40"}`}
                      >
                        <img src="/Images/white-call-logo.png" className="w-8" />
                      </button>
                    </a>
                  </div>
                ))}
            </div>

            <button
              onClick={detectNow}
              className="mt-10 bg-mid-red w-76 h-16 rounded-lg shadow-xl font-heavy-garet text-lg hover:bg-dark-red transition-colors duration-200 ease-out cursor-pointer"
            >
              {hospital ? "DETECT AGAIN" : "DETECT NOW"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
