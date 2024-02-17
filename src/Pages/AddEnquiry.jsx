import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import FetchData from "../Common/FetchData";

function AddEnquiry() {
  const [formValue, setFormValue] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zip: "",
    passport: "",
    nationality: "",
    married: false,
    birthDate: "",
    current_education: "",
    countryInterested: "",
    visa: "",
    // documents: "",
  });

  const [selectOption, setSelectOption] = useState({
    currentEducation: [],
    interestedCountry: [],
    stateData: [],
    cityData: [],
  });

  const apiEndpoint = async function () {
    const currentEducation = await FetchData(
      `https://fulfilurdream.howtogetridofspiderveins.net/fulfillDream/api/currenteducation/`,
      "GET"
    );
    setSelectOption((prevState) => ({ ...prevState, currentEducation }));

    const interestedCountry = await FetchData(
      `https://fulfilurdream.howtogetridofspiderveins.net/fulfillDream/api/countries/`,
      "GET"
    );
    setSelectOption((prevState) => ({ ...prevState, interestedCountry }));
  };

  useEffect(() => {
    apiEndpoint();
  }, []);

  let localData = localStorage.getItem("loginInfo");
  if (localData) localData = JSON.parse(localData);

  // get country data
  const getCountries = Country.getAllCountries();

  // get cities data
  const getCities = City.getAllCities();

  const handleCountryData = function (e) {
    setFormValue({ ...formValue, country: e.target.value });

    const stateDataOfCountry = State.getStatesOfCountry(e.target.value);

    setSelectOption((prevState) => ({
      ...prevState,
      stateData: stateDataOfCountry,
    }));
  };

  const handleStateData = function (e) {
    setFormValue({ ...formValue, state: e.target.value });

    const cityOfState = getCities.filter(
      (city) => city.stateCode === e.target.value
    );

    setSelectOption((prevState) => ({
      ...prevState,
      cityData: cityOfState,
    }));
  };

  const handleSubmit = async function (e) {
    e.preventDefault();
    const reqBody = {
      student_name: formValue.name,
      student_phone: formValue.phone,
      student_email: formValue.email,
      student_address: formValue.address,
      country: formValue.country,
      state: formValue.state,
      city: formValue.city,
      zipcode: formValue.zip,
      passport_number: formValue.passport,
      nationality: formValue.nationality,
      married: formValue.married,
      dob: formValue.birthDate,
      current_education: formValue.current_education,
      country_interested: formValue.countryInterested,
      visa_refusal: formValue.visa,
      // visa_file: formValue.documents,
    };

    await FetchData(
      `https://fulfilurdream.howtogetridofspiderveins.net/fulfillDream/api/add-enquiry/`,
      "POST",
      reqBody
    );
  };

  return (
    <div className="m-7">
      <form onSubmit={handleSubmit}>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Personal Information
        </h2>
        <div className="flex">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Student name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  value={formValue.name}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    setFormValue({ ...formValue, name: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Student Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formValue.email}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    setFormValue({ ...formValue, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Student Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={handleCountryData}
                >
                  <option>Select Country</option>
                  {getCountries.map((country, index) => (
                    <option key={index} value={country.isoCode}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                City
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    setFormValue({ ...formValue, city: e.target.value })
                  }
                >
                  <option>Select City</option>
                  {selectOption.cityData.map((city) => (
                    <option key={city.isoCode} value={city.isoCode}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="passport"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Student Passport
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="passport"
                  id="passport"
                  autoComplete="address-level2"
                  value={formValue.passport}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    setFormValue({ ...formValue, passport: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="nationality"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nationality
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="nationality"
                  id="nationality"
                  autoComplete="address-level2"
                  value={formValue.nationality}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    setFormValue({ ...formValue, nationality: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="current_education"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Current Education
              </label>
              <div className="mt-2">
                <select
                  id="current_education"
                  name="current_education"
                  autoComplete="current_education"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    setFormValue({
                      ...formValue,
                      current_education: e.target.value,
                    })
                  }
                >
                  <option value="">Current Education</option>
                  {selectOption.currentEducation.map((education) => (
                    <option key={education.id} value={education.id}>
                      {education.current_education}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="visaRefusal"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Do you have any previous visa refusal?
              </label>
              <div className="mt-2">
                <select
                  id="visaRefusal"
                  name="visaRefusal"
                  autoComplete="visaRefusal"
                  value={formValue.visa}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    setFormValue({ ...formValue, visa: e.target.value })
                  }
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Student Phone
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  autoComplete="given-name"
                  value={formValue.phone}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    setFormValue({ ...formValue, phone: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="student-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Student address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="student-address"
                  id="student-address"
                  autoComplete="student-address"
                  value={formValue.address}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    setFormValue({ ...formValue, address: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="state"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Student State
              </label>
              <div className="mt-2">
                <select
                  id="state"
                  name="state"
                  autoComplete="state-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={handleStateData}
                >
                  <option>Select State</option>
                  {selectOption.stateData.map((data, index) => (
                    <option key={index} value={data.isoCode}>
                      {data.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="zip-code"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Student ZIP
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="zip-code"
                  id="zip-code"
                  autoComplete="zip-code"
                  value={formValue.zip}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    setFormValue({ ...formValue, zip: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="married"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Married
              </label>
              <div className="mt-2">
                <select
                  id="married"
                  name="married"
                  autoComplete="married-name"
                  value={formValue.married}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    setFormValue({ ...formValue, married: e.target.value })
                  }
                >
                  <option value="True">Yes</option>
                  <option value="False">no</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="date-of-birth"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Date of Birth
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  name="date-of-birth"
                  id="date-of-birth"
                  autoComplete="address-level2"
                  value={formValue.birthDate}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    setFormValue({ ...formValue, birthDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="country-interested"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Country Interested
              </label>
              <div className="mt-2">
                <select
                  id="country-interested"
                  name="country-interested"
                  autoComplete="country-interested"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    setFormValue({
                      ...formValue,
                      countryInterested: e.target.value,
                    })
                  }
                >
                  <option value="">Select Country</option>
                  {selectOption.interestedCountry.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.country_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* <div className="sm:col-span-4">
              <label
                htmlFor="documents"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Upload Document
              </label>
              <div className="mt-2">
                <input
                  type="file"
                  name="documents"
                  id="documents"
                  autoComplete="documents"
                  value={formValue.documents}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    setFormValue({ ...formValue, documents: e.target.value })
                  }
                />
              </div>
            </div> */}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEnquiry;
