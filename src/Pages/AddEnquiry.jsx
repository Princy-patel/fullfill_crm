import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import FetchData from "../Common/FetchData";
import { useParams } from "react-router-dom";

function AddEnquiry() {
  const [formValue, setFormValue] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    country: "",
    countryIso: "",
    state: "",
    stateIso: "",
    city: "",
    cityIso: "",
    zip: "",
    passport: "",
    nationality: "",
    married: false,
    birthDate: "",
    current_education: "",
    countryInterested: "",
    visa: true,
    // documents: "",
  });

  const [selectOption, setSelectOption] = useState({
    currentEducation: [],
    interestedCountry: [],
    stateData: [],
    cityData: [],
  });

  // get country data
  const getCountries = Country.getAllCountries();

  // get cities data
  const getCities = City.getAllCities();

  const getId = useParams().studentId;

  const updateData = async function () {
    if (getId) {
      const getAllData = await FetchData(
        `https://fulfilurdream.howtogetridofspiderveins.net/fulfillDream/api/enquiries/${getId}`,
        "GET"
      );

      const {
        student_name,
        student_phone,
        student_email,
        student_address,
        country,
        countryIso,
        state,
        stateIso,
        city,
        cityIso,
        zipcode,
        passport_number,
        nationality,
        married,
        dob,
        current_education,
        country_interested,
      } = getAllData;

      setFormValue({
        ...formValue,
        name: student_name,
        phone: student_phone,
        email: student_email,
        address: student_address,
        country: country,
        countryIso: countryIso,
        state: state,
        stateIso: stateIso,
        city: city,
        cityIso: cityIso,
        zip: zipcode,
        passport: passport_number,
        nationality: nationality,
        married: married,
        birthDate: dob,
        current_education: current_education,
        countryInterested: country_interested,
      });

      console.log("getAllData", getAllData);
    }
  };
  useEffect(() => {
    updateData();
  }, [getId]);

  const updateUser = async function () {
    const {
      name,
      phone,
      email,
      address,
      country,
      countryIso,
      state,
      stateIso,
      city,
      cityIso,
      zip,
      passport,
      nationality,
      married,
      birthDate,
      current_education,
      countryInterested,
      visa,
    } = formValue;

    console.log("update", formValue);

    // need to add through object and pass as a object
    const updatedBodyData = {
      application: [],
      added_by: { username: "Hello" },
      assigned_users: { username: "Admin" },
      enquiry_status: { status: "lkdj" },
      student_name: name,
      student_phone: phone,
      student_email: email,
      student_address: address,
      country: country,
      countryIso: countryIso,
      state: state,
      stateIso: stateIso,
      city: city,
      cityIso: cityIso,
      zipcode: zip,
      passport_number: passport,
      nationality: nationality,
      married: married,
      dob: birthDate,
      current_education: {
        id: current_education.id,
        current_education: formValue?.current_education?.current_education,
      },
      country_interested: {
        id: countryInterested.id,
        country_name: countryInterested.country_name,
      },
      visa: visa,
      // visa_file: formValue.documents,
    };

    console.log("UpdatedBody", JSON.stringify(updatedBodyData));

    try {
      const jsonString = JSON.stringify(updatedBodyData);
      console.log("JSON String:", jsonString);
    } catch (error) {
      console.log("Error while stringifying JSON:", error);
    }

    const editRequestData = await fetch(
      `https://fulfilurdream.howtogetridofspiderveins.net/fulfillDream/api/enquiries/${getId}/`,
      {
        method: "PUT",
        body: JSON.stringify(updatedBodyData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localData.token.access}`,
        },
      }
    );

    if (!editRequestData.ok) {
      // If response is not OK, log the status text and response
      const errorText = await editRequestData.text();
      console.log("Error response text:", errorText);
      // throw new Error(editRequestData.statusText);
    }

    try {
      const responseData = await editRequestData.json();
      console.log("response data", responseData);
    } catch (error) {
      console.log("responseData", error);
    }
  };

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

  const handleCountryData = function (e) {
    const countryCode = e.target.value;

    const countryName = getCountries.find(
      (country) => country.isoCode === countryCode
    )?.name;

    setFormValue({
      ...formValue,
      countryIso: countryCode,
      country: countryName,
    });

    const stateDataOfCountry = State.getStatesOfCountry(countryCode);

    setSelectOption((prevState) => ({
      ...prevState,
      stateData: stateDataOfCountry,
    }));
  };

  const handleStateData = function (e) {
    const stateCode = e.target.value;
    const stateName = selectOption.stateData.find(
      (state) => state.isoCode === stateCode
    )?.name;

    setFormValue({ ...formValue, state: stateName, stateIso: stateCode });

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

    const {
      name,
      phone,
      email,
      address,
      country,
      countryIso,
      state,
      stateIso,
      city,
      zip,
      passport,
      nationality,
      married,
      birthDate,
      current_education,
      countryInterested,
      visa,
    } = formValue;

    const reqBody = {
      student_name: name,
      student_phone: phone,
      student_email: email,
      student_address: address,
      country: country,
      countryIso: countryIso,
      state: state,
      stateIso: stateIso,
      city: city,
      zipcode: zip,
      passport_number: passport,
      nationality: nationality,
      married: married,
      dob: birthDate,
      current_education: current_education,
      country_interested: countryInterested,
      visa_refusal: visa,
      // visa_file: formValue.documents,
    };

    await FetchData(
      `https://fulfilurdream.howtogetridofspiderveins.net/fulfillDream/api/add-enquiry/`,
      "POST",
      reqBody
    );
  };

  return (
    <>
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
                    value={formValue?.countryIso}
                  >
                    <option value="">Select Country</option>
                    {getCountries.map((country, index) => (
                      <option
                        key={index}
                        label={country.name}
                        value={country.isoCode}
                      >
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
                    {selectOption.cityData.map((city, index) => (
                      <option
                        key={index}
                        value={city.isoCode}
                        label={city.name}
                      >
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
                      setFormValue({
                        ...formValue,
                        nationality: e.target.value,
                      })
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
                    value={formValue.current_education.id}
                  >
                    <option value="">Current Education</option>
                    {selectOption.currentEducation.map((education) => (
                      <option
                        key={education.id}
                        label={education.current_education}
                        value={education.id}
                      >
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
                    <option value="True">Yes</option>
                    <option value="False">no</option>
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
                    value={formValue?.stateIso}
                  >
                    <option>Select State</option>
                    {selectOption.stateData.map((data, index) => (
                      <option
                        key={index}
                        value={data.isoCode}
                        label={data.name}
                      >
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
                    value={formValue.countryInterested.id}
                  >
                    <option value="">Select Country</option>
                    {selectOption.interestedCountry.map((country) => (
                      <option
                        key={country.id}
                        label={country.country_name}
                        value={country.id}
                      >
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
            {/* <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button> */}
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={updateUser}
            >
              Update
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
    </>
  );
}

export default AddEnquiry;
