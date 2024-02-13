const FetchData = async function (url, method, reqBody = null) {
  let localData = localStorage.getItem("loginInfo");
  if (localData) localData = JSON.parse(localData);

  try {
    const requestConfig = {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localData.token.access}`,
      },
    };

    if (method === "POST") {
      requestConfig.body = JSON.stringify(reqBody);
    }

    const response = await fetch(url, requestConfig);

    if (method === "DELETE") {
      return;
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default FetchData;
