import React, { useEffect, useReducer, useRef } from "react";
import DataTable from "react-data-table-component";
import SearchField from "../Common/SearchField";
import { debounce } from "../helpers/SearchData";
import { Link } from "react-router-dom";
import reducer from "../helpers/EnqAction";
import BeatLoader from "react-spinners/BeatLoader";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const initialState = {
  data: [],
  totalData: 0,
  loading: true,
  searchInput: "",
  perPage: 10,
  pageNo: 1,
};

function Enquiries() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const debounceFunction = useRef(debounce(dispatch));

  let localData = localStorage.getItem("loginInfo");
  if (localData) localData = JSON.parse(localData);

  const loadData = async function () {
    const requestEnq = await fetch(
      `https://fulfilurdream.howtogetridofspiderveins.net/fulfillDream/api/enquiries/?p=${state.pageNo}&records=${state.perPage}&search=${state.searchInput}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localData.token.access}`,
        },
      }
    );

    const responseEnq = await requestEnq.json();
    dispatch({ type: "SET_DATA", payload: responseEnq.results });
    dispatch({ type: "SET_TOTAL_DATA", payload: responseEnq.count });
    dispatch({ type: "LOADING", payload: false });
  };

  useEffect(() => {
    loadData();
  }, [state.pageNo, state.perPage, state.searchInput]);

  const handlePageChange = (page) => {
    dispatch({ type: "SET_PAGE_NO", payload: page });
    dispatch({ type: "LOADING", payload: true });
  };

  const handlePerRowsChange = (newPerPage, page) => {
    dispatch({ type: "SET_PER_PAGE", payload: newPerPage });
    dispatch({ type: "SET_PAGE_NO", payload: page });
    dispatch({ type: "LOADING", payload: true });
  };

  const deleteData = async function (id) {
    fetch(
      `https://fulfilurdream.howtogetridofspiderveins.net/fulfillDream/api/enquiries/${id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localData.token.access}`,
        },
      }
    )
      .then(() => {
        loadData();
      })
      .catch((err) => console.log(err.message));
  };

  const columns = [
    {
      name: "Student Name",
      selector: (row) => row.student_name,
      cell: (row) => {
        return (
          <Link to={`/images/${row.id}`} target="_blank">
            {row.student_name}
          </Link>
        );
      },
    },
    {
      name: "Email",
      selector: (row) => row.student_email,
    },
    {
      name: "Address",
      selector: (row) => row.student_address,
    },
    {
      name: "Nationality",
      selector: (row) => row.nationality,
    },
    {
      name: "Education",
      selector: (row) => row.current_education?.current_education,
    },
    {
      name: "Status",
      selector: (row) => row.enquiry_status?.status,
    },
    {
      name: "edit",
      selector: null,
      cell: (row) => [
        <EditIcon />,
        <DeleteIcon className="cursor-pointer" onClick={deleteData.bind(null, row.id)} />,
      ],
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
        backgroundColor: "#e5e7eb",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    },
  };
  return (
    <div>
      <SearchField
        setSearchInput={(e) =>
          debounceFunction.current({
            type: "SEARCH_DATA",
            payload: e.target.value,
          })
        }
        searchInput={state.searchInput}
      />

      <DataTable
        columns={columns}
        data={state.data}
        pagination
        paginationTotalRows={state.totalData}
        progressPending={state.loading}
        paginationServer
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        progressComponent={<BeatLoader color="#998f8f" size={25} />}
        customStyles={customStyles}
        highlightOnHover
      />
    </div>
  );
}

export default Enquiries;
