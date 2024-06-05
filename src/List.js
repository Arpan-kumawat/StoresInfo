import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Card, Grid, TextField } from "@mui/material";
// import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@mui/icons-material/ClearOutlined";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const [visiblePasswords, setVisiblePasswords] = React.useState({});

  const handleTogglePassword = (emp_no) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [emp_no]: !prev[emp_no],
    }));
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.store_id}
        </TableCell>
        <TableCell>{row.store_name}</TableCell>
        <TableCell>{row.employee_details.length}</TableCell>
        <TableCell>{row.carbs}</TableCell>
        <TableCell>{row.status}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{ margin: 2, padding: 2 }}
              style={{ background: "#e7e7e7", borderRadius: "1rem" }}
            >
              <Typography variant="h6" gutterBottom component="div">
                Employee Details
              </Typography>
              {row?.employee_details.length ? (
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: "600" }}>
                        Emp Name
                      </TableCell>
                      <TableCell style={{ fontWeight: "600" }}>
                        Emp no.
                      </TableCell>

                      <TableCell style={{ fontWeight: "600" }}>
                        Password
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row?.employee_details?.map((emp, index) => (
                      <TableRow key={emp.emp_no}>
                        <TableCell>{emp.emp_fnm}</TableCell>
                        <TableCell>{emp.emp_no}</TableCell>

                        <TableCell>
                          <FormControl sx={{ m: 1, width: "25ch" }}>
                            <Input
                              value={emp.password}
                              disabled
                              type={
                                visiblePasswords[emp.emp_no]
                                  ? "text"
                                  : "password"
                              }
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() =>
                                      handleTogglePassword(emp.emp_no)
                                    }
                                  >
                                    {visiblePasswords[emp.emp_no] ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Typography>No Data Found</Typography>
              )}
            </Box>

            <Box
              sx={{ margin: 2, padding: 2 }}
              style={{ background: "#e7e7e7", borderRadius: "1rem" }}
            >
              <Typography variant="h6" gutterBottom component="div">
                Payment Gateway
              </Typography>
              {row?.payment_details.length ? (
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: "600" }}>
                        Device Id
                      </TableCell>
                      <TableCell style={{ fontWeight: "600" }}>
                        Payment Brand
                      </TableCell>
                      <TableCell style={{ fontWeight: "600" }}>
                        Merchant Id
                      </TableCell>
                      <TableCell style={{ fontWeight: "600" }}>
                        IP Address
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row?.payment_details?.map((payment) => (
                      <TableRow key={payment.device_id}>
                        <TableCell>{payment.device_id}</TableCell>
                        <TableCell>{payment.payment_brand}</TableCell>
                        <TableCell>{payment.merchant_id}</TableCell>
                        <TableCell>{payment.ip_address}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Typography>No Data Found</Typography>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function List() {
  const [data, setData] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredData, setFilteredData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [env, setEnv] = React.useState("QA");

  const handleChange = (event) => {
    setEnv(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSubmit = async () => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHBpcmVzSW4iOjE3MTU5Mjk2NzQ0ODAsImRhdGEiOnsiZW1wX25vIjoiMTMwMDAwMDEiLCJlbXBzY3J0IjoiMTIzNDU2NzgiLCJzdG9yZV9pZCI6IjEzMDAifX0.TDRFxgN1oMbEtiAVAj3DdtIXDzly7Opyusn5h_Un0HY"
    );
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/store/all-store-details",
        requestOptions
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();

      setData(result?.data?.Stores);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  console.log(data);

  React.useEffect(() => {
    handleSubmit();
  }, []);

  React.useEffect(() => {
    let filteredData = data.sort((a, b) => a?.store_id - b?.store_id);
    if (searchQuery) {
      filteredData = data
        ? data.filter(
            (data) =>
              data.store_name
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              data.store_id.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : "";
    }

    setFilteredData(filteredData);

    console.log(filteredData);
  }, [searchQuery, data]);

  return (
    <Grid container xs={12} sm={12} md={12} lg={12}>
      <Grid
        xs={12}
        sm={12}
        md={12}
        lg={12}
        style={{ padding: "2rem", paddingBottom: "0rem" }}
      >
        <Card>
          <Grid
            container
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{ padding: "1rem" }}
          >
            <Grid
              xs={12}
              sm={6}
              md={6}
              lg={6}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography style={{ textAlign: "left", fontWeight: "600" }}>
                Store List
              </Typography>
            </Grid>
            <Grid
              xs={12}
              sm={6}
              md={6}
              lg={6}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <TextField
                style={{ marginRight: "1rem" }}
                placeholder="Search Store"
                value={searchQuery}
                size="small"
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  // startAdornment: <SearchIcon />,
                  endAdornment: (
                    <IconButton
                      style={{
                        visibility: searchQuery ? "unset" : "hidden",
                      }}
                      onClick={() => console.log("click") + setSearchQuery("")}
                      edge="end"
                    >
                      <ClearIcon />
                    </IconButton>
                  ),
                }}
              />
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth size="small">
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={env}
                    onChange={handleChange}
                  >
                    <MenuItem value="Prod">Prod</MenuItem>
                    <MenuItem value="QA">QA</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Grid>

      <Grid xs={12} sm={12} md={12} lg={12} style={{ padding: "2rem" }}>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell style={{ fontWeight: "600" }}>Store Id</TableCell>
                <TableCell style={{ fontWeight: "600" }}>Name</TableCell>
                <TableCell style={{ fontWeight: "600" }}>No. Of Emp</TableCell>
                <TableCell style={{ fontWeight: "600" }}>Payment</TableCell>
                <TableCell style={{ fontWeight: "600" }}>Stauts</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row) => (
                  <Row key={row.store_id} row={row} />
                ))}
            </TableBody>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              count={filteredData?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
